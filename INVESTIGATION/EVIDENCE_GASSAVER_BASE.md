# Evidence Record — `gasSaver()` on Base

**Evidence class:** STRONG CORRELATION for code reuse; **UNPROVEN** for common ownership.

## Primary observation

A web search of BaseScan's verified contract-source records located the exact supplied `gasSaver(uint256 n)` implementation in at least two Base Mainnet ERC-20 contracts:

1. **CHAKRA** — `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7`
2. **CCONBASE / CC8 ON BASE** — `0x5f4d8c4f73db53c461987e60877386d4a259f590`

Both records expose `gasSaver(uint256)` in their verified ABI/source and contain the same hard-coded Keccak-256 comparison:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

The function computes `abi.encode(msg.sender, 100)`, hashes the resulting bytes, and only enters the assembly block when the hash equals that constant. The assembly then reads storage slot `n`, divides the value by 100, and writes the result back to slot `n`.

## Verified-source observations

### CHAKRA

- Contract: `CHAKRA`
- Token: Chakra / CHAKRA
- Address: `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7`
- Compiler shown by BaseScan: Solidity `v0.8.10+commit.fc410830`
- Optimization: enabled, 200 runs
- Constructor mints `225,000,000 * 10^18` to `msg.sender`
- Verified source contains the exact `gasSaver()` implementation and constant.

### CCONBASE

- Contract: `CCONBASE`
- Token: CC8 ON BASE / CC8
- Address: `0x5f4d8c4f73db53c461987e60877386d4a259f590`
- BaseScan source record states it was submitted for verification on **2024-05-08**.
- Source comments identify the project as Cotton Candy Coin / CC8.
- Constructor mints `690,000,000 * 10^18` to `msg.sender`.
- Verified source contains the exact `gasSaver()` implementation and constant.

## Important technical interpretation

The duplication is significant. The exact unusual function, including its hard-coded hash and assembly behavior, is present in multiple independently named Base token contracts. This is materially stronger than merely observing a similar ERC-20 implementation.

However, it **does not by itself prove that the same person controlled both contracts**. Possible explanations include:

- one developer reused the code;
- one source was copied from another;
- both contracts came from a common template or code distribution;
- one operator deployed both contracts;
- a third party intentionally reproduced the same mechanism.

Ownership/control therefore remains **UNPROVEN** until deployer, funding, transaction, nonce, or signature evidence supplies the missing bridge.

## Hash investigation status

The target hash is therefore now confirmed as a real constant embedded in multiple verified Base contracts. The next test is not blind preimage searching. Instead, candidate caller addresses should be extracted from the contracts' deployment and interaction histories and tested against the exact ABI construction:

`keccak256(abi.encode(candidateAddress, uint256(100)))`

A match would identify an address for which the `gasSaver()` condition is satisfied. The match must then be connected to an observed transaction calling `gasSaver()` to establish operational significance.

## Why this matters to the larger investigation

This finding directly strengthens the **cross-contract behavioral fingerprint** track. It provides a concrete, machine-testable artifact that can be compared across Base deployments rather than relying on superficial naming or token metadata.

The next evidence layer should establish:

1. deployment transaction for each contract;
2. deployer address;
3. first funding source;
4. owner address after deployment;
5. all `gasSaver()` calls, if any;
6. callers of those calls;
7. whether any caller satisfies the hard-coded hash;
8. whether deployers/funders/callers overlap with the Ethereum Mainnet entities under investigation.

## Sources

- BaseScan CHAKRA verified contract record: https://basescan.org/token/0x823ce23d648fe0c528c73b74bd20cf8e44427ed7
- BaseScan CC8 ON BASE verified contract record: https://basescan.org/token/0x5f4d8c4f73db53c461987e60877386d4a259f590
- Base documentation: `eth_getTransactionByHash` exposes sender, recipient, block, calldata, value, nonce, and signature fields needed for the next evidence layer.

## Current conclusion

**VERIFIED:** The exact `gasSaver()` mechanism and hard-coded hash occur in at least two verified Base token contracts.

**STRONG CORRELATION:** The unusual code pattern is a reproducible cross-contract fingerprint.

**UNPROVEN:** Common ownership, common deployer, or common private-key/master-seed origin.

**Next priority:** transaction/deployer/funding reconstruction and exact candidate-address hash testing.
