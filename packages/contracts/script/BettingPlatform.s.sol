// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {BettingPlatform} from "../src/BettingPlatform.sol";

contract BettingPlatformScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        BettingPlatform bettingPlatform = new BettingPlatform();
        console.log("BettingPlatform deployed to:", address(bettingPlatform));

        // Write address to a file
        string memory addressString = vm.toString(address(bettingPlatform));
        vm.writeFile("./deployed_address.txt", addressString);

        vm.stopBroadcast();
    }
}
