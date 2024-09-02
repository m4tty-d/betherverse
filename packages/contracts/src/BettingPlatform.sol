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

    function getLatestEvents(uint256 _startIndex, uint256 _endIndex) public view returns (Event[] memory) {
        require(_startIndex > 0 && _startIndex <= eventCount, "Invalid start index");
        require(_endIndex >= _startIndex && _endIndex <= eventCount, "Invalid end index");

        uint256 length = _endIndex - _startIndex + 1;
        Event[] memory result = new Event[](length);
        for (uint256 i = 0; i < length; i++) {
            result[i] = events[eventCount - (_startIndex + i) + 1];
        }
        return result;
    }
}
