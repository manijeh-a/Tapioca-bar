// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@boringcrypto/boring-solidity/contracts/BoringOwnable.sol';

import '../yieldbox/contracts/YieldBox.sol';
import './singularity/interfaces/ISingularity.sol';
import './IPenrose.sol';

import 'hardhat/console.sol';

// TODO: Permissionless market deployment
///     + asset registration? (toggle to renounce ownership so users can call)
/// @title Global market registry
/// @notice Singularity management
contract Penrose is BoringOwnable {
    // ************ //
    // *** VARS *** //
    // ************ //
    /// @notice returns the Conservator address
    address public conservator;
    /// @notice returns the pause state of the contract
    bool public paused;

    /// @notice returns the YieldBox contract
    YieldBox public immutable yieldBox;

    /// @notice returns the TAP contract
    IERC20 public immutable tapToken;
    /// @notice returns TAP asset id registered in the YieldBox contract
    uint256 public immutable tapAssetId;

    /// @notice returns USD0 contract
    IUSD0 public usdoToken;

    /// @notice returns USD0 asset id registered in the YieldBox contract
    uint256 public usdoAssetId;

    /// @notice returns the WETH contract
    IERC20 public immutable wethToken;

    /// @notice returns WETH asset id registered in the YieldBox contract
    uint256 public immutable wethAssetId;

    /// @notice master contracts registered
    IPenrose.MasterContract[] public singularityMasterContracts;
    IPenrose.MasterContract[] public bingbangMasterContracts;

    // Used to check if a master contract is registered
    mapping(address => bool) isSingularityMasterContractRegistered;
    mapping(address => bool) isBingBangMasterContractRegistered;

    /// @notice protocol fees
    address public feeTo;

    /// @notice whitelisted swappers
    mapping(ISwapper => bool) public swappers;

    address public bingBangEthMarket;

    /// @notice creates a Penrose contract
    /// @param _yieldBox YieldBox contract address
    /// @param tapToken_ TapOFT contract address
    constructor(
        YieldBox _yieldBox,
        IERC20 tapToken_,
        IERC20 wethToken_
    ) {
        yieldBox = _yieldBox;
        tapToken = tapToken_;
        tapAssetId = uint96(
            _yieldBox.registerAsset(
                TokenType.ERC20,
                address(tapToken_),
                IStrategy(address(0)),
                0
            )
        );

        wethToken = wethToken_;
        wethAssetId = uint96(
            _yieldBox.registerAsset(
                TokenType.ERC20,
                address(wethToken_),
                IStrategy(address(0)),
                0
            )
        );
    }

    // **************//
    // *** EVENTS *** //
    // ************** //
    event ProtocolWithdrawal(IFee[] markets, uint256 timestamp);
    event RegisterSingularityMasterContract(
        address location,
        IPenrose.ContractType risk
    );
    event RegisterBingBangMasterContract(
        address location,
        IPenrose.ContractType risk
    );
    event RegisterSingularity(address location, address masterContract);
    event RegisterBingBang(address location, address masterContract);
    event FeeToUpdate(address newFeeTo);
    event FeeVeTapUpdate(address newFeeVeTap);
    event SwapperUpdate(address swapper, bool isRegistered);
    event UsdoTokenUpdated(address indexed usdoToken, uint256 assetId);
    event ConservatorUpdated(address indexed old, address indexed _new);
    event PausedUpdated(bool oldState, bool newState);

    // ******************//
    // *** MODIFIERS *** //
    // ***************** //
    modifier registeredSingularityMasterContract(address mc) {
        require(
            isSingularityMasterContractRegistered[mc] == true,
            'Penrose: MC not registered'
        );
        _;
    }

    modifier registeredBingBangMasterContract(address mc) {
        require(
            isBingBangMasterContractRegistered[mc] == true,
            'Penrose: MC not registered'
        );
        _;
    }

    modifier notPaused() {
        require(!paused, 'Penrose: paused');
        _;
    }

    // ********************** //
    // *** VIEW FUNCTIONS *** //
    // ********************** //

    /// @notice Get all the Singularity contract addresses
    /// @return markets list of available markets
    function singularityMarkets()
        public
        view
        returns (address[] memory markets)
    {
        markets = _getMasterContractLength(singularityMasterContracts);
    }

    /// @notice Get all the BingBang contract addresses
    /// @return markets list of available markets
    function bingBangMarkets() public view returns (address[] memory markets) {
        markets = _getMasterContractLength(bingbangMasterContracts);
    }

    /// @notice Get the length of `singularityMasterContracts`
    function singularityMasterContractLength() public view returns (uint256) {
        return singularityMasterContracts.length;
    }

    /// @notice Get the length of `bingbangMasterContracts`
    function bingBangMasterContractLength() public view returns (uint256) {
        return bingbangMasterContracts.length;
    }

    // ************************ //
    // *** PUBLIC FUNCTIONS *** //
    // ************************ //

    /// @notice Loop through the master contracts and call `depositFeesToYieldBox()` to each one of their clones.
    /// @dev `swappers_` can have one element that'll be used for all clones. Or one swapper per MasterContract.
    /// @dev Fees are withdrawn in TAP and sent to the FeeDistributor contract
    /// @param swappers_ One or more swappers to convert the asset to TAP.
    function withdrawAllSingularityFees(
        IFee[] calldata markets_,
        ISwapper[] calldata swappers_,
        IPenrose.SwapData[] calldata swapData_
    ) public notPaused {
        require(
            markets_.length == swappers_.length &&
                swappers_.length == swapData_.length,
            'Penrose: length mismatch'
        );
        require(address(swappers_[0]) != address(0), 'Penrose: zero address');
        require(address(markets_[0]) != address(0), 'Penrose: zero address');

        _withdrawAllProtocolFees(swappers_, swapData_, markets_);
        emit ProtocolWithdrawal(markets_, block.timestamp);
    }

    /// @notice Loop through the master contracts and call `depositFeesToYieldBox()` to each one of their clones.
    /// @dev `swappers_` can have one element that'll be used for all clones. Or one swapper per MasterContract.
    /// @dev Fees are withdrawn in TAP and sent to the FeeDistributor contract
    /// @param swappers_ One or more swappers to convert the asset to TAP.
    function withdrawAllBingBangFees(
        IFee[] calldata markets_,
        ISwapper[] calldata swappers_,
        IPenrose.SwapData[] calldata swapData_
    ) public notPaused {
        require(
            markets_.length == swappers_.length &&
                swappers_.length == swapData_.length,
            'Penrose: length mismatch'
        );
        require(address(swappers_[0]) != address(0), 'Penrose: zero address');

        _withdrawAllProtocolFees(swappers_, swapData_, markets_);
        emit ProtocolWithdrawal(markets_, block.timestamp);
    }

    // *********************** //
    // *** OWNER FUNCTIONS *** //
    // *********************** //
    function setBingBangEthMarket(address _market) external onlyOwner {
        bingBangEthMarket = _market;
    }

    /// @notice updates the pause state of the contract
    /// @param val the new value
    function updatePause(bool val) external {
        require(msg.sender == conservator, 'Penrose: unauthorized');
        require(val != paused, 'Penrose: same state');
        emit PausedUpdated(paused, val);
        paused = val;
    }

    /// @notice Set the Conservator address
    /// @dev Conservator can pause the contract
    /// @param _conservator The new address
    function setConservator(address _conservator) external onlyOwner {
        require(_conservator != address(0), 'Penrose: address not valid');
        emit ConservatorUpdated(conservator, _conservator);
        conservator = _conservator;
    }

    /// @notice Set the USD0 token
    /// @dev sets usdoToken and usdoAssetId
    /// @param _usdoToken the USD0 token address
    function setUsdoToken(address _usdoToken) external onlyOwner {
        usdoToken = IUSD0(_usdoToken);
        usdoAssetId = uint96(
            yieldBox.registerAsset(
                TokenType.ERC20,
                _usdoToken,
                IStrategy(address(0)),
                0
            )
        );
        emit UsdoTokenUpdated(_usdoToken, usdoAssetId);
    }

    /// @notice Register a Singularity master contract
    /// @param mcAddress The address of the contract
    /// @param contractType_ The risk type of the contract
    function registerSingularityMasterContract(
        address mcAddress,
        IPenrose.ContractType contractType_
    ) external onlyOwner {
        require(
            isSingularityMasterContractRegistered[mcAddress] == false,
            'Penrose: MC registered'
        );

        IPenrose.MasterContract memory mc;
        mc.location = mcAddress;
        mc.risk = contractType_;
        singularityMasterContracts.push(mc);
        isSingularityMasterContractRegistered[mcAddress] = true;

        emit RegisterSingularityMasterContract(mcAddress, contractType_);
    }

    /// @notice Register a BingBang master contract
    /// @param mcAddress The address of the contract
    /// @param contractType_ The risk type of the contract
    function registerBingBangMasterContract(
        address mcAddress,
        IPenrose.ContractType contractType_
    ) external onlyOwner {
        require(
            isBingBangMasterContractRegistered[mcAddress] == false,
            'Penrose: MC registered'
        );

        IPenrose.MasterContract memory mc;
        mc.location = mcAddress;
        mc.risk = contractType_;
        bingbangMasterContracts.push(mc);
        isBingBangMasterContractRegistered[mcAddress] = true;

        emit RegisterBingBangMasterContract(mcAddress, contractType_);
    }

    /// @notice Registers a Singularity market
    /// @param mc The address of the master contract which must be already registered
    /// @param data The init data of the Singularity
    /// @param useCreate2 Whether to use create2 or not
    function registerSingularity(
        address mc,
        bytes calldata data,
        bool useCreate2
    )
        external
        payable
        onlyOwner
        registeredSingularityMasterContract(mc)
        returns (address _contract)
    {
        _contract = yieldBox.deploy(mc, data, useCreate2);
        emit RegisterSingularity(_contract, mc);
    }

    /// @notice Registers a BingBang market
    /// @param mc The address of the master contract which must be already registered
    /// @param data The init data of the BingBang contract
    /// @param useCreate2 Whether to use create2 or not
    function registerBingBang(
        address mc,
        bytes calldata data,
        bool useCreate2
    )
        external
        payable
        onlyOwner
        registeredBingBangMasterContract(mc)
        returns (address _contract)
    {
        _contract = yieldBox.deploy(mc, data, useCreate2);
        emit RegisterBingBang(_contract, mc);
    }

    /// @notice Execute an only owner function inside of a Singularity or a BingBang market
    function executeMarketFn(
        address[] calldata mc,
        bytes[] memory data,
        bool forceSuccess
    )
        external
        onlyOwner
        notPaused
        returns (bool[] memory success, bytes[] memory result)
    {
        uint256 len = mc.length;
        success = new bool[](len);
        result = new bytes[](len);
        for (uint256 i = 0; i < len; ) {
            require(
                isSingularityMasterContractRegistered[
                    yieldBox.masterContractOf(mc[i])
                ] ||
                    isBingBangMasterContractRegistered[
                        yieldBox.masterContractOf(mc[i])
                    ],
                'Penrose: MC not registered'
            );
            (success[i], result[i]) = mc[i].call(data[i]);
            if (forceSuccess) {
                require(success[i], _getRevertMsg(result[i]));
            }
            ++i;
        }
    }

    /// @notice Set protocol fees address
    function setFeeTo(address feeTo_) external onlyOwner {
        feeTo = feeTo_;
        emit FeeToUpdate(feeTo_);
    }

    /// @notice Used to register and enable or disable swapper contracts used in closed liquidations.
    /// MasterContract Only Admin function.
    /// @param swapper The address of the swapper contract that conforms to `ISwapper`.
    /// @param enable True to enable the swapper. To disable use False.
    function setSwapper(ISwapper swapper, bool enable) external onlyOwner {
        swappers[swapper] = enable;
        emit SwapperUpdate(address(swapper), enable);
    }

    // ************************* //
    // *** PRIVATE FUNCTIONS *** //
    // ************************* //
    function _getRevertMsg(bytes memory _returnData)
        private
        pure
        returns (string memory)
    {
        // If the _res length is less than 68, then the transaction failed silently (without a revert message)
        if (_returnData.length < 68) return 'SGL: no return data';
        // solhint-disable-next-line no-inline-assembly
        assembly {
            // Slice the sighash.
            _returnData := add(_returnData, 0x04)
        }
        return abi.decode(_returnData, (string)); // All that remains is the revert string
    }

    function _withdrawAllProtocolFees(
        ISwapper[] calldata swappers_,
        IPenrose.SwapData[] calldata swapData_,
        IFee[] memory markets_
    ) private {
        uint256 length = markets_.length;
        unchecked {
            for (uint256 i = 0; i < length; ) {
                markets_[i].depositFeesToYieldBox(swappers_[i], swapData_[i]);
                ++i;
            }
        }
    }

    function _getMasterContractLength(IPenrose.MasterContract[] memory array)
        public
        view
        returns (address[] memory markets)
    {
        uint256 _masterContractLength = array.length;
        uint256 marketsLength = 0;

        unchecked {
            // We first compute the length of the markets array
            for (uint256 i = 0; i < _masterContractLength; ) {
                marketsLength += yieldBox.clonesOfCount(array[i].location);

                ++i;
            }
        }

        markets = new address[](marketsLength);

        uint256 marketIndex;
        uint256 clonesOfLength;

        unchecked {
            // We populate the array
            for (uint256 i = 0; i < _masterContractLength; ) {
                address mcLocation = array[i].location;
                clonesOfLength = yieldBox.clonesOfCount(mcLocation);

                // Loop through clones of the current MC.
                for (uint256 j = 0; j < clonesOfLength; ) {
                    markets[marketIndex] = yieldBox.clonesOf(mcLocation, j);
                    ++marketIndex;
                    ++j;
                }
                ++i;
            }
        }
    }
}
