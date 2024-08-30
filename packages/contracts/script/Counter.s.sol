// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is Script {
    Counter public counter;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        counter = new Counter();
        console.log("Counter deployed to:", address(counter));

        // Write address to a file
        string memory addressString = vm.toString(address(counter));
        vm.writeFile("./deployed_address.txt", addressString);

        vm.stopBroadcast();
    }
}
