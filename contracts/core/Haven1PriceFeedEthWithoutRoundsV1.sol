// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import { PriceFeedWithoutRoundsForMultiFeedAdapter } from "@redstone-finance/on-chain-relayer/contracts/price-feeds/without-rounds/PriceFeedWithoutRoundsForMultiFeedAdapter.sol";
import { IRedstoneAdapter } from "@redstone-finance/on-chain-relayer/contracts/core/IRedstoneAdapter.sol";

contract Haven1PriceFeedEthWithoutRoundsV1 is
    PriceFeedWithoutRoundsForMultiFeedAdapter
{
    function getDataFeedId() public view virtual override returns (bytes32) {
        return bytes32("ETH");
    }

    function getPriceFeedAdapter()
        public
        view
        virtual
        override
        returns (IRedstoneAdapter)
    {
        return IRedstoneAdapter(0x5FbDB2315678afecb367f032d93F642f64180aa3);
    }
}
