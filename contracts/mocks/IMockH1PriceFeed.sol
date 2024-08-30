// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMockH1PriceFeed {
    function getRoundData(
        uint80 roundId
    ) external view returns (uint80, int256, uint256, uint256, uint80);

    function latestRoundData()
        external
        view
        returns (uint80, int256, uint256, uint256, uint80);

    function latestAnswer() external view returns (int256);

    function latestRound() external view returns (uint80);

    function decimals() external view returns (uint8);

    function description() external pure returns (string memory);

    function version() external pure returns (uint256);
}
