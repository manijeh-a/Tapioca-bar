// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@boringcrypto/boring-solidity/contracts/libraries/BoringERC20.sol";

import "./MagnetarData.sol";
import "./MagnetarActionsData.sol";

/*

__/\\\\\\\\\\\\\\\_____/\\\\\\\\\_____/\\\\\\\\\\\\\____/\\\\\\\\\\\_______/\\\\\_____________/\\\\\\\\\_____/\\\\\\\\\____        
 _\///////\\\/////____/\\\\\\\\\\\\\__\/\\\/////////\\\_\/////\\\///______/\\\///\\\________/\\\////////____/\\\\\\\\\\\\\__       
  _______\/\\\________/\\\/////////\\\_\/\\\_______\/\\\_____\/\\\_______/\\\/__\///\\\____/\\\/____________/\\\/////////\\\_      
   _______\/\\\_______\/\\\_______\/\\\_\/\\\\\\\\\\\\\/______\/\\\______/\\\______\//\\\__/\\\_____________\/\\\_______\/\\\_     
    _______\/\\\_______\/\\\\\\\\\\\\\\\_\/\\\/////////________\/\\\_____\/\\\_______\/\\\_\/\\\_____________\/\\\\\\\\\\\\\\\_    
     _______\/\\\_______\/\\\/////////\\\_\/\\\_________________\/\\\_____\//\\\______/\\\__\//\\\____________\/\\\/////////\\\_   
      _______\/\\\_______\/\\\_______\/\\\_\/\\\_________________\/\\\______\///\\\__/\\\_____\///\\\__________\/\\\_______\/\\\_  
       _______\/\\\_______\/\\\_______\/\\\_\/\\\______________/\\\\\\\\\\\____\///\\\\\/________\////\\\\\\\\\_\/\\\_______\/\\\_ 
        _______\///________\///________\///__\///______________\///////////_______\/////_____________\/////////__\///________\///__

*/

//TODO: decide if we should add whitelisted contracts or 'target' is always passed from outside
contract Magnetar is Ownable, MagnetarData, MagnetarActionsData {
    using BoringERC20 for IERC20;

    constructor(address _owner) {
        transferOwnership(_owner);
    }

    // ************************ //
    // *** PUBLIC FUNCTIONS *** //
    // ************************ //
    /// @notice Batch multiple calls together
    /// @param calls The list of actions to perform
    function burst(
        Call[] calldata calls
    ) external payable returns (Result[] memory returnData) {
        uint256 valAccumulator;

        uint256 length = calls.length;
        returnData = new Result[](length);

        for (uint256 i = 0; i < length; i++) {
            Call calldata _action = calls[i];
            if (!_action.allowFailure) {
                require(
                    _action.call.length > 0,
                    string.concat(
                        "Magnetar: Missing call for action with index",
                        string(abi.encode(i))
                    )
                );
            }

            if (_action.id == PERMIT_ALL) {
                _permit(
                    _action.target,
                    _action.call,
                    true,
                    _action.allowFailure
                );
            } else if (_action.id == PERMIT) {
                _permit(
                    _action.target,
                    _action.call,
                    false,
                    _action.allowFailure
                );
            } else if (_action.id == TOFT_WRAP) {
                WrapData memory data = abi.decode(_action.call[4:], (WrapData));
                _checkSender(data.from);
                if (_action.value > 0) {
                    unchecked {
                        valAccumulator += _action.value;
                    }
                    ITOFTOperations(_action.target).wrapNative{
                        value: _action.value
                    }(data.to);
                } else {
                    ITOFTOperations(_action.target).wrap(
                        msg.sender,
                        data.to,
                        data.amount
                    );
                }
            } else if (_action.id == TOFT_SEND_FROM) {
                (
                    address from,
                    uint16 dstChainId,
                    bytes32 to,
                    uint256 amount,
                    ISendFrom.LzCallParams memory lzCallParams
                ) = abi.decode(
                        _action.call[4:],
                        (
                            address,
                            uint16,
                            bytes32,
                            uint256,
                            (ISendFrom.LzCallParams)
                        )
                    );

                _checkSender(from);
                unchecked {
                    valAccumulator += _action.value;
                }
                ISendFrom(_action.target).sendFrom{value: _action.value}(
                    msg.sender,
                    dstChainId,
                    to,
                    amount,
                    lzCallParams
                );
            } else if (_action.id == YB_DEPOSIT_ASSET) {
                YieldBoxDepositData memory data = abi.decode(
                    _action.call[4:],
                    (YieldBoxDepositData)
                );
                _checkSender(data.from);
                (uint256 amountOut, uint256 shareOut) = IDepositAsset(
                    _action.target
                ).depositAsset(
                        data.assetId,
                        msg.sender,
                        data.to,
                        data.amount,
                        data.share
                    );
                returnData[i] = Result({
                    success: true,
                    returnData: abi.encode(amountOut, shareOut)
                });
            } else if (_action.id == SGL_ADD_COLLATERAL) {
                SGLAddCollateralData memory data = abi.decode(
                    _action.call[4:],
                    (SGLAddCollateralData)
                );
                _checkSender(data.from);
                ISingularityOperations(_action.target).addCollateral(
                    msg.sender,
                    data.to,
                    data.skim,
                    data.share
                );
            } else if (_action.id == SGL_BORROW) {
                SGLBorrowData memory data = abi.decode(
                    _action.call[4:],
                    (SGLBorrowData)
                );
                _checkSender(data.from);
                (uint256 part, uint256 share) = ISingularityOperations(
                    _action.target
                ).borrow(msg.sender, data.to, data.amount);
                returnData[i] = Result({
                    success: true,
                    returnData: abi.encode(part, share)
                });
            } else if (_action.id == SGL_WITHDRAW_TO) {
                (
                    address from,
                    uint16 dstChainId,
                    bytes32 receiver,
                    uint256 amount,
                    bytes memory adapterParams,
                    address payable refundAddress
                ) = abi.decode(
                        _action.call[4:],
                        (address, uint16, bytes32, uint256, bytes, address)
                    );

                _checkSender(from);
                unchecked {
                    valAccumulator += _action.value;
                }

                ISingularityOperations(_action.target).withdrawTo{
                    value: _action.value
                }(
                    msg.sender,
                    dstChainId,
                    receiver,
                    amount,
                    adapterParams,
                    refundAddress
                );
            } else if (_action.id == SGL_LEND) {
                SGLLendData memory data = abi.decode(
                    _action.call[4:],
                    (SGLLendData)
                );
                _checkSender(data.from);
                uint256 fraction = ISingularityOperations(_action.target)
                    .addAsset(msg.sender, data.to, data.skim, data.share);
                returnData[i] = Result({
                    success: true,
                    returnData: abi.encode(fraction)
                });
            } else if (_action.id == SGL_REPAY) {
                SGLRepayData memory data = abi.decode(
                    _action.call[4:],
                    (SGLRepayData)
                );
                _checkSender(data.from);

                uint256 amount = ISingularityOperations(_action.target).repay(
                    msg.sender,
                    data.to,
                    data.skim,
                    data.part
                );
                returnData[i] = Result({
                    success: true,
                    returnData: abi.encode(amount)
                });
            } else if (_action.id == TOFT_SEND_AND_BORROW) {
                (
                    address from,
                    address to,
                    uint16 lzDstChainId,
                    ITOFTOperations.IBorrowParams memory borrowParams,
                    ITOFTOperations.IWithdrawParams memory withdrawParams,
                    ITOFTOperations.ITOFTSendOptions memory options,
                    ITOFTOperations.ITOFTApproval[] memory approvals
                ) = abi.decode(
                        _action.call[4:],
                        (
                            address,
                            address,
                            uint16,
                            ITOFTOperations.IBorrowParams,
                            ITOFTOperations.IWithdrawParams,
                            ITOFTOperations.ITOFTSendOptions,
                            ITOFTOperations.ITOFTApproval[]
                        )
                    );
                _checkSender(from);

                unchecked {
                    valAccumulator += _action.value;
                }

                ITOFTOperations(_action.target).sendToYBAndBorrow{
                    value: _action.value
                }(
                    msg.sender,
                    to,
                    lzDstChainId,
                    borrowParams,
                    withdrawParams,
                    options,
                    approvals
                );
            } else if (_action.id == TOFT_SEND_AND_LEND) {
                (
                    address from,
                    address to,
                    uint16 dstChainId,
                    ITOFTOperations.ILendParams memory lendParams,
                    ITOFTOperations.IUSDOSendOptions memory options,
                    ITOFTOperations.IUSDOApproval[] memory approvals
                ) = abi.decode(
                        _action.call[4:],
                        (
                            address,
                            address,
                            uint16,
                            (ITOFTOperations.ILendParams),
                            (ITOFTOperations.IUSDOSendOptions),
                            (ITOFTOperations.IUSDOApproval[])
                        )
                    );

                _checkSender(from);

                unchecked {
                    valAccumulator += _action.value;
                }

                ITOFTOperations(_action.target).sendToYBAndLend{
                    value: _action.value
                }(msg.sender, to, dstChainId, lendParams, options, approvals);
            } else if (_action.id == TOFT_SEND_YB) {
                USDOSendToYBData memory data = abi.decode(
                    _action.call[4:],
                    (USDOSendToYBData)
                );
                _checkSender(data.from);

                unchecked {
                    valAccumulator += _action.value;
                }

                ITOFTOperations(_action.target).sendToYB{value: _action.value}(
                    msg.sender,
                    data.to,
                    data.amount,
                    data.assetId,
                    data.lzDstChainId,
                    data.options
                );
            } else if (_action.id == TOFT_RETRIEVE_YB) {
                (
                    address from,
                    uint256 amount,
                    uint256 assetId,
                    uint16 lzDstChainId,
                    address zroPaymentAddress,
                    bytes memory airdropAdapterParam,
                    bool strategyWithdrawal
                ) = abi.decode(
                        _action.call[4:],
                        (
                            address,
                            uint256,
                            uint256,
                            uint16,
                            address,
                            bytes,
                            bool
                        )
                    );
                _checkSender(from);

                unchecked {
                    valAccumulator += _action.value;
                }

                ITOFTOperations(_action.target).retrieveFromYB{
                    value: _action.value
                }(
                    msg.sender,
                    amount,
                    assetId,
                    lzDstChainId,
                    zroPaymentAddress,
                    airdropAdapterParam,
                    strategyWithdrawal
                );
            } else {
                revert("Magnetar: action not valid");
            }
        }

        require(msg.value == valAccumulator, "Magnetar: value mismatch");
    }

    // ********************** //
    // *** VIEW FUNCTIONS *** //
    // ********************** //
    /// @notice Returns the block hash for the given block number
    /// @param blockNumber The block number
    function getBlockHash(
        uint256 blockNumber
    ) public view returns (bytes32 blockHash) {
        blockHash = blockhash(blockNumber);
    }

    /// @notice Returns the block number
    function getBlockNumber() public view returns (uint256 blockNumber) {
        blockNumber = block.number;
    }

    /// @notice Returns the block coinbase
    function getCurrentBlockCoinbase() public view returns (address coinbase) {
        coinbase = block.coinbase;
    }

    /// @notice Returns the block difficulty
    function getCurrentBlockDifficulty()
        public
        view
        returns (uint256 difficulty)
    {
        difficulty = block.prevrandao;
    }

    /// @notice Returns the block gas limit
    function getCurrentBlockGasLimit() public view returns (uint256 gaslimit) {
        gaslimit = block.gaslimit;
    }

    /// @notice Returns the block timestamp
    function getCurrentBlockTimestamp()
        public
        view
        returns (uint256 timestamp)
    {
        timestamp = block.timestamp;
    }

    /// @notice Returns the (ETH) balance of a given address
    function getEthBalance(address addr) public view returns (uint256 balance) {
        balance = addr.balance;
    }

    /// @notice Returns the block hash of the last block
    function getLastBlockHash() public view returns (bytes32 blockHash) {
        unchecked {
            blockHash = blockhash(block.number - 1);
        }
    }

    /// @notice Gets the base fee of the given block
    /// @notice Can revert if the BASEFEE opcode is not implemented by the given chain
    function getBasefee() public view returns (uint256 basefee) {
        basefee = block.basefee;
    }

    /// @notice Returns the chain id
    function getChainId() public view returns (uint256 chainid) {
        chainid = block.chainid;
    }

    // ************************* //
    // *** PRIVATE FUNCTIONS *** //
    // ************************* //
    function _permit(
        address target,
        bytes calldata actionCalldata,
        bool permitAll,
        bool allowFailure
    ) private {
        if (permitAll) {
            PermitAllData memory permitData = abi.decode(
                actionCalldata[4:],
                (PermitAllData)
            );
            _checkSender(permitData.owner);
        } else {
            PermitData memory permitData = abi.decode(
                actionCalldata[4:],
                (PermitData)
            );
            _checkSender(permitData.owner);
        }

        (bool success, bytes memory returnData) = target.call(actionCalldata);
        if (!success && !allowFailure) {
            _getRevertMsg(returnData);
        }
    }

    function _checkSender(address sent) private view {
        require(msg.sender == sent, "Magnetar: unauthorized");
    }

    function _getRevertMsg(bytes memory _returnData) private pure {
        // If the _res length is less than 68, then
        // the transaction failed with custom error or silently (without a revert message)
        if (_returnData.length < 68) revert("Reason unknown");

        assembly {
            // Slice the sighash.
            _returnData := add(_returnData, 0x04)
        }
        revert(abi.decode(_returnData, (string))); // All that remains is the revert string
    }
}