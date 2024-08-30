// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { IMockH1PriceFeed } from "./IMockH1PriceFeed.sol";

/// @title MockH1PriceFeed
///
/// @dev A very minimal mock H1 price feed that implements the core Redstone
/// interface. To be used purely for testing.
contract MockH1PriceFeed is AccessControl, IMockH1PriceFeed {
    uint80 private constant DEFAULT_ROUND = 1;
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    int256 private _answer;

    error GetRoundDataCanBeOnlyCalledWithLatestRound(uint80 requestedRoundId);

    /// @dev Note the default decimal place used by Redstone feeds is 8 (eight).
    constructor(address association_, int256 answer_) {
        _grantRole(DEFAULT_ADMIN_ROLE, association_);
        _grantRole(OPERATOR_ROLE, association_);
        _answer = answer_;
    }

    // -------------------------------------------------------------------------

    /// @dev Note the default decimal place used by Redstone feeds is 8 (eight).
    /// Ensure any updates to the answer are also eight decimals of precision.
    function updateAnswer(int256 v) external onlyRole(OPERATOR_ROLE) {
        _answer = v;
    }

    // -------------------------------------------------------------------------
    // Mock Implementations

    function getRoundData(
        uint80 requestedRoundId
    )
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        if (requestedRoundId != latestRound()) {
            revert GetRoundDataCanBeOnlyCalledWithLatestRound(requestedRoundId);
        }

        return latestRoundData();
    }

    function latestRoundData()
        public
        view
        virtual
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        roundId = latestRound();
        answer = _answer;

        startedAt = block.timestamp;
        updatedAt = block.timestamp;
        answeredInRound = roundId;
    }

    function latestRound() public pure returns (uint80) {
        return DEFAULT_ROUND;
    }

    function latestAnswer() external view returns (int256) {
        return _answer;
    }

    /// @dev Default decimals in Redstone feeds is eight (8).
    function decimals() external pure returns (uint8) {
        return 8;
    }

    function description() external pure returns (string memory) {
        return "Mock H1 Price Feeed";
    }

    function version() external pure returns (uint256) {
        return 1;
    }
}
