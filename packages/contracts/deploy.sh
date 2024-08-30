#!/bin/bash

# Load environment variables from the root .env file
set -a
source "$(dirname "$0")/../../.env"
set +a

# Run the Forge script
forge script script/Counter.s.sol:CounterScript --rpc-url $RPC_URL --broadcast

# Read the deployed address from the file
DEPLOYED_ADDRESS=$(cat deployed_address.txt)

# Write the deployed address to the .env file (overwrite existing value)
sed -i.bak "s|CONTRACT_ADDRESS=.*|CONTRACT_ADDRESS=$DEPLOYED_ADDRESS|" ../../.env
rm -f ../../.env.bak

