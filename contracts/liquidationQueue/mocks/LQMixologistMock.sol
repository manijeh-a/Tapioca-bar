// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ILiquidationQueue.sol';
import '../../IBeachBar.sol';

contract LQMixologistMock {
    IBeachBar immutable beachBar;

    uint256 immutable assetId;

    uint256 constant EXCHANGE_RATE_PRECISION = 1e18;

    constructor(IBeachBar _beachBar, uint256 _assetId) {
        beachBar = _beachBar;
        assetId = _assetId;
    }

    function initLq(
        ILiquidationQueue liquidationQueue,
        ILiquidationQueue.LiquidationQueueMeta calldata lqMeta
    ) external {
        liquidationQueue.init(lqMeta, address(this));
    }
}
