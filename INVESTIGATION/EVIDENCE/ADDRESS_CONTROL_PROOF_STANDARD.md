# Address Control / Ownership Proof Standard

## Purpose

Establish whether a person or entity controls an Ethereum/EVM address without confusing behavioral correlation with cryptographic proof.

## Target

`0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`

## Evidence hierarchy

### Level 1 — Cryptographic control proof

The strongest evidence is a fresh challenge-response signature produced by the private key controlling the target address. Use a unique nonce and a clearly worded message, preferably EIP-4361 / SIWE where appropriate. Verify the signature against the exact target address and preserve the original message, signature, recovered address, timestamp, and verification method.

For contract accounts, use an appropriate EIP-1271 signature-validation path rather than assuming ECDSA ownership.

### Level 2 — On-chain control evidence

Strong supporting evidence includes:

- The address deploying contracts and later exercising privileged functions.
- The address signing transactions that require its private key.
- Consistent nonce progression and transaction authorization.
- Control of multiple addresses demonstrated by coordinated signed actions.
- A known owner address explicitly set by a contract and cryptographically supported.

This demonstrates control of the keys/accounts involved, but does not by itself identify the human or legal entity behind them.

### Level 3 — Cross-chain behavioral correlation

Useful but not conclusive:

- Same funding source.
- Repeated coordinated transfers.
- Identical deployment/funding scripts.
- Shared operational timing and gas patterns.
- Common interaction with the same contracts or infrastructure.
- Ethereum/Base transaction fingerprints.
- Shared Reservoir or other relay infrastructure.

These establish association, not necessarily common ownership.

### Level 4 — Attribution evidence

To connect an address to a real-world person/entity, lawful external evidence is generally required, such as:

- Exchange/KYC records obtained through the proper process.
- A published address-control statement from the owner.
- Signed ownership statement tied to a verifiable identity.
- Corporate records or other authoritative records linking the controlling party to the address.

Do not infer identity from an explorer label alone.

## Current investigation evidence

### August 16, 2024

`0x264bd8291fAE1D75DB2c5F573b07faA6715997B5` transferred `0.00190382 ETH` to `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF` in transaction `0x985d9f796b811a2b9aa03c360732c7b76c7268daec09c6655a7beeb3293b35f8` at block `20544132`.

### November 15, 2024

The supplied screenshot shows `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF` sending `0.031211 ETH` through Reservoir Relay in transaction `0x1423190f6d4cf0934ae98e7db07494ba5a5e19821fd5c467783339556c56f7c4`.

These establish transaction activity, not human ownership.

## gasSaver() hypothesis

If the suspected mechanism is `keccak256(abi.encode(address, uint256(100)))`, test candidate addresses deterministically. A matching hash would establish that the address is a valid preimage candidate for that exact construction. It would not independently prove that a particular person owns the address.

## Required preservation package

For every ownership/control claim preserve:

1. Full address — never truncate.
2. Full transaction hash.
3. Chain ID.
4. Block number and timestamp.
5. Raw transaction/calldata where available.
6. Contract address and event logs where applicable.
7. Exact source URL/API response and retrieval date.
8. Signature/message and verification output for cryptographic proof.
9. Computation code and exact inputs for deterministic hash tests.
10. Evidence grade: PROOF / STRONG / MODERATE / CORRELATION / UNPROVEN.

## Conclusion standard

Do not label an address as "owned by" a person/entity unless there is cryptographic control evidence or authoritative attribution evidence. Multiple behavioral correlations should remain explicitly classified as correlation until independently verified.
