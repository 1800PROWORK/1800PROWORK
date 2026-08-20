# `gasSaver()` Hash Investigation — Findings

**Date:** 2026-08-20  
**Status:** Active / caller-preimage unresolved

## Target

```text
0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1
```

The investigated function computes `keccak256(abi.encode(msg.sender, 100))` and compares it to that fixed value.

## Verified code reuse

The exact implementation is present in multiple BaseScan-verified Base contracts. Confirmed examples include:

- `0x5f4d8c4f73db53c461987e60877386d4a259f590` — CC8 ON BASE / CCONBASE
- `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7` — Chakra / CHAKRA
- `0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450` — Mint Blockchain / MINTB

BaseScan exposes the exact `gasSaver(uint256)` source, including the same hard-coded hash, in these verified contracts. citeturn0search0turn0search1turn0search2

## Important implication

The hash is **not unique to one deployed contract**. It is a recurring source-code artifact. Therefore:

- **Verified:** exact code/hash reuse across multiple Base contracts.
- **Not established:** that all contracts share one owner.
- **Not established:** that the hash identifies SIMBASE.
- **Not established:** that the hash itself proves private-key control.

This materially strengthens the code-provenance hypothesis while weakening the earlier idea that the hash alone could identify a particular contract.

## SIMBASE test

The previously investigated Base SIMBASE address is:

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

A direct Ethereum Keccak-256 calculation of `abi.encode(SIMBASE_address, 100)` does **not** equal the target hash.

Therefore the SIMBASE contract address itself is not a demonstrated preimage for the condition.

## What matters next

The decisive evidence is the **actual `from` address of calls to `gasSaver(uint256)`**.

For every contract containing this pattern, the investigation should:

1. Locate all `gasSaver(uint256)` transactions.
2. Extract each transaction's `from` address.
3. Recompute `keccak256(abi.encode(from,100))`.
4. Check for an exact match with the target.
5. Record the transaction hash, block, timestamp, caller, and contract.
6. Compare matched callers with deployers, funders, and the previously investigated Mainnet/Base addresses.

A caller/hash match would establish that the protected branch is reachable for that address. It would still require separate evidence before concluding that the same entity controls every related address.

## Current classification

**STRONG CODE CORRELATION / HASH PREIMAGE UNRESOLVED.**

The strongest present finding is not that SIMBASE owns the pattern. It is that an identical, unusual `gasSaver()` implementation with the same hard-coded Keccak target was reused across multiple Base token contracts. That makes the implementation itself a useful forensic fingerprint for clustering deployments and tracing their common provenance.

## Primary sources

- https://basescan.org/token/0x5f4d8c4f73db53c461987e60877386d4a259f590
- https://basescan.org/token/0x823ce23d648fe0c528c73b74bd20cf8e44427ed7
- https://basescan.org/token/0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450
