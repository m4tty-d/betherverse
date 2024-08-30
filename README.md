# betherverse

## Prerequisites

Install foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
```

## Run

### Start local network

```bash
anvil
```

### Configure MetaMask

Go to Settings -> Networks -> Localhost 8545

Modify the Chain ID from 1337 to 31337

If that's done copy the second private key from the anvil output and add it to MetaMask:
- Click on Account 1
- Click on Add account or hardware wallet
- Click on Import account
- Paste the private key
- Click on Import

### Start frontend

```bash
pnpm dev
```
