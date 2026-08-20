# `gasSaver()` Discovery — 2026-08-20

## New primary-source discovery

A public BaseScan indexed search result exposes the exact `gasSaver(uint256 n)` implementation previously supplied during this investigation in at least two Base ERC-20 contract pages.

### Contract A

`0x5f4d8c4f73db53c461987e60877386d4a259f590`

BaseScan's indexed source contains:

```solidity
function gasSaver(uint256 n) external {
    address a0 = msg.sender;
    uint256 n0 = 100;
    bytes memory bb = abi.encode(a0, n0);
    if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
        assembly {
            let a := sload(n)
            let b := div(a, n0)
            sstore(n, b)
        }
    }
}
```

### Contract B

`0x823ce23d648fe0c528c73b74bd20cf8e44427ed7`

The indexed BaseScan source contains the same `gasSaver()` implementation and the same hard-coded Keccak target.

## Significance

This is materially stronger than the previous state of the investigation because the exact code is independently visible in public indexed contract-source results for multiple Base contracts. It demonstrates that the code fragment is not merely a conversational artifact.

However, **the matching code does not establish common ownership** of these contracts or of SIMBASE. It establishes a code-level reuse/correlation candidate.

## Critical next test

For each contract above, independently establish:

1. contract creation transaction;
2. creator/deployer address;
3. creation timestamp and block;
4. first funding source of the creator;
5. whether the creator or another transaction sender is a candidate `msg.sender` for `gasSaver()`;
6. whether `keccak256(abi.encode(candidateAddress, uint256(100)))` equals the hard-coded target;
7. whether the same creator/funder appears in the other investigated Base deployments;
8. whether any relationship exists to the SIMBASE address `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`.

## Current evidence grade

**STRONG CORRELATION for code reuse; UNPROVEN for common control.**

The exact hash preimage remains unresolved until candidate addresses derived from primary transaction evidence are tested.

## Source

BaseScan indexed contract-source search results for:

- `0x5f4d8c4f73db53c461987e60877386d4a259f590`
- `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7`

Search result also confirms that BaseScan provides a contract-creation endpoint capable of returning a contract's deployer address and creation transaction hash.
