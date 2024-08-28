// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import { PriceFeedWithoutRoundsForMultiFeedAdapter } from "@redstone-finance/on-chain-relayer/contracts/price-feeds/without-rounds/PriceFeedWithoutRoundsForMultiFeedAdapter.sol";
import { IRedstoneAdapter } from "@redstone-finance/on-chain-relayer/contracts/core/IRedstoneAdapter.sol";

contract Haven1DevnetPriceFeedWbtcWithoutRoundsV1 is
    PriceFeedWithoutRoundsForMultiFeedAdapter
{
    function getDataFeedId() public view virtual override returns (bytes32) {
        return bytes32("WBTC");
    }

    function getPriceFeedAdapter()
        public
        view
        virtual
        override
        returns (IRedstoneAdapter)
    {
        return IRedstoneAdapter(0x8bdd76E874a1563e1453065B4Bc9522F073365fb);
    }
}
