// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import { MultiFeedAdapterWithoutRoundsPrimaryProd } from "@redstone-finance/on-chain-relayer/contracts/price-feeds/data-services/MultiFeedAdapterWithoutRoundsPrimaryProd.sol";

contract Haven1DevnetMultiFeedAdapterWithoutRoundsV1 is
    MultiFeedAdapterWithoutRoundsPrimaryProd
{
    address internal constant MAIN_UPDATER_ADDRESS =
        0xAd45c555Ea9D752EDe754105ad4664fB028a3b6d;

    function _validateBlockTimestamp(
        uint256 lastBlockTimestamp
    ) internal view virtual override returns (bool) {
        if (msg.sender == MAIN_UPDATER_ADDRESS) {
            // For whitelisted addresses we only require a newer block
            return block.timestamp > lastBlockTimestamp;
        } else {
            // For non-whitelisted addresses we require some time to pass after the latest update
            return block.timestamp > lastBlockTimestamp + 40 seconds;
        }
    }
}
