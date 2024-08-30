// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Event {
    address public creator;
    string public question;
    string[] public options;
    uint256 public deadline;
    uint256 public platformFee;

    mapping(uint256 => uint256) public optionTotalBets;
    mapping(address => mapping(uint256 => uint256)) public playerBets;

    uint256 public totalBets;
    bool public outcomePublished;
    uint256 public winningOption;

    constructor(
        address _creator,
        string memory _question,
        string[] memory _options,
        uint256 _deadline,
        uint256 _platformFee
    ) {
        creator = _creator;
        question = _question;
        options = _options;
        deadline = _deadline;
        platformFee = _platformFee;
    }

    function placeBet(uint256 _option) public payable {
        require(block.timestamp < deadline, "Betting period has ended");
        require(_option < options.length, "Invalid option");

        optionTotalBets[_option] += msg.value;
        playerBets[msg.sender][_option] += msg.value;
        totalBets += msg.value;
    }

    function publishOutcome(uint256 _winningOption) public {
        require(msg.sender == creator, "Only creator can publish outcome");
        require(block.timestamp >= deadline, "Cannot publish outcome before deadline");
        require(!outcomePublished, "Outcome already published");
        require(_winningOption < options.length, "Invalid option");

        outcomePublished = true;
        winningOption = _winningOption;
    }

    function claimPrize() public {
        require(outcomePublished, "Outcome not yet published");
        require(playerBets[msg.sender][winningOption] > 0, "No winning bets");

        uint256 winningAmount = playerBets[msg.sender][winningOption];
        uint256 totalWinningBets = optionTotalBets[winningOption];
        uint256 prizeShare = (winningAmount * totalBets) / totalWinningBets;
        uint256 fee = (prizeShare * platformFee) / 100;
        uint256 payout = prizeShare - fee;

        playerBets[msg.sender][winningOption] = 0;
        payable(msg.sender).transfer(payout);
    }
}
