// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Event} from "./Event.sol";

contract BettingPlatform {
    address public owner;
    uint256 public platformFee = 1; // 1% platform fee
    mapping(uint256 => Event) public events;
    uint256 public eventCount;

    constructor() {
        owner = msg.sender;
    }

    function createEvent(string memory _question, string[] memory _options, uint256 _deadline)
        public
        returns (uint256)
    {
        eventCount++;
        events[eventCount] = new Event(msg.sender, _question, _options, _deadline, platformFee);
        return eventCount;
    }
}
