# Address Activity Record — 0x33D2443Bf16e48012D520c9ced7467814F9F8AEF

## Source
User-provided Etherscan account view, 2026-08-23.

## Address
`0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`

## Etherscan observations
- ETH balance shown: `0 ETH`.
- Token holdings shown: `$1.20` across 8 tokens.
- Total transactions shown: 15.
- Etherscan shows `FUNDED BY: MxML 9/25` and identifies the first funding as approximately 2 years 6 days ago.
- Etherscan shows the first transaction as approximately 2 years 6 days ago and the latest as approximately 1 year 279 days ago.
- Etherscan shows `No addresses found` under Multichain Info for this address.

## Transaction evidence supplied by user
### Initial funding
`0x985d9f796b811a2b9aa03c360732c7b76c7268daec09c6655a7beeb3293b35f8`
- From: `0x264bd8291fAE1D75DB2c5F573b07faA6715997B5`
- To: `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`
- Value: `0.00190382 ETH`

### Reservoir Relay
`0x1423190f6d4cf0934ae98e7db07494ba5a5e19821fd5c467783339556c56f7c4`
- From: `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`
- To: `Reservoir: Relay Receiver`
- Value shown in the address transaction list: `0.00012116 ETH`
- Method selector shown: `0x044089a5`

### Other activity
The supplied Etherscan view shows subsequent activity involving:
- Etherscan 10th Anniversary Badge
- PYUSD approvals/transfers
- `0x357c6Fd2cEE77bA5de49e0bB9d49444781A8f0cc`
- Socket Gateway
- MetaMask Third Party Staking
- Kiln staking shares
- `0x8Ff41C89FF1bb740358E1DDa6bE764d133e8910a`
- MetaMask Swap Router

## Forensic significance
The address is behaving as an externally controlled wallet in the supplied transaction history: it initiates transfers, approvals, swaps, staking operations, and a Reservoir interaction. This is evidence of wallet activity, but it does **not by itself prove who controls the private key**.

The Etherscan `FUNDED BY` label identifies the funding relationship shown by Etherscan; it should not be treated as proof that the funding source and recipient share an owner.

## Ownership status
**UNPROVEN.**

The strongest direct test remains a fresh cryptographic signature from the address. If the address is an EOA, verify a fresh EIP-191/EIP-712 signature recovers to this exact address. If it is a contract wallet, test its EIP-1271 `isValidSignature()` behavior and require the appropriate magic value.

## Next investigation targets
1. Verify whether the address is EOA or contract at the relevant historical blocks.
2. Reconstruct the exact first-funding transaction and all subsequent outbound transactions.
3. Decode `0x1423190f6d4cf0934ae98e7db07494ba5a5e19821fd5c467783339556c56f7c4` and identify the actual Reservoir destination/receiver flow.
4. Compare this address's activity with the June 2024 Base deployment cluster.
5. Preserve transaction hashes and full addresses in all future evidence records.
