# `gasSaver()` Source-Reuse Finding

**Status:** STRONG CORRELATION for code-template reuse; **NOT** an ownership proof.  
**Date recorded:** 2026-08-20

## Finding

A web search of verified BaseScan source-code pages located the same distinctive `gasSaver(uint256 n)` implementation and the same hard-coded Keccak target in multiple independently named Base ERC-20 contracts.

The distinctive pattern is:

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

## Independently surfaced BaseScan examples

### 1. `0x5f4d8c4f73db53c461987e60877386d4a259f590`

BaseScan's verified source contains the complete `gasSaver()` implementation with the exact target hash. The page identifies it as an ERC-20 token contract.  
Source: https://basescan.org/token/0x5f4d8c4f73db53c461987e60877386d4a259f590

### 2. `0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450`

BaseScan likewise exposes the same `gasSaver()` function in the verified source.  
Source: https://basescan.org/token/0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450

### 3. `0x08ece4e41a690b3b4c5735f2f9a15d715e271dcd` — GIZA

BaseScan's verified source explicitly lists `gasSaver(uint256 n)` and contains the same implementation and hash.  
Source: https://basescan.org/token/0x08ece4e41a690b3b4c5735f2f9a15d715e271dcd

### 4. `0xF30b3961C9611dA8817119364099B3b3C449Dfaa` — DUCKPOOL

BaseScan's verified source explicitly lists `gasSaver(uint256 n)` and contains the same hard-coded hash. The search result states that the source was submitted for verification on 2024-07-01.  
Source: https://basescan.org/token/0xF30b3961C9611dA8817119364099B3b3C449Dfaa

### 5. Additional surfaced contracts

The same distinctive function signature is also surfaced in BaseScan verified-source results for:

- `0xe47434de787ff9d14f59400687167d7e06c888a3` — OMDC
- `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7` — CHAKRA
- `0x915c7900c7373e2222a705dd877afc6e6fa32d2f` — NAVY
- `0xb48d9c88c68bbf209783b6b6e3551b5a98fb842f`
- `0x98225185fed2ac9c824d79a8dd9da152bbcd5d21` — MAGASHIB

## Forensic interpretation

This materially changes the interpretation of the hard-coded hash.

The hash should **not** be treated as evidence that uniquely identifies one contract or one owner. The exact source pattern is demonstrably reused across multiple Base ERC-20 deployments.

What the evidence *does* support is a stronger proposition:

> A distinctive, unusual function containing a hard-coded address-dependent Keccak comparison and inline storage division was reused across multiple verified Base token contracts.

That is a reproducible code-reuse fingerprint. It can be useful for clustering deployments, especially when combined with deployment timing, deployer addresses, funding sources, compiler metadata, constructor behavior, ownership transfers, and transaction cadence.

## Important limitation

The existence of identical source code does not by itself establish that the same person or private key deployed all of these contracts. Possible explanations include:

1. one author/deployer reused the template;
2. multiple actors copied the same public source;
3. a common contract generator/template was distributed;
4. contracts were forked from an earlier implementation;
5. source verification preserved an identical template while deployment control differed.

Therefore this finding is **STRONG CORRELATION for source/template reuse**, but **UNPROVEN for common ownership**.

## Hash-specific consequence

The target hash remains:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

The code computes it from `abi.encode(msg.sender, 100)`. A valid match would identify a sender address satisfying the embedded predicate for that contract, but because the same predicate appears in multiple contracts, the match must be interpreted together with transaction-level evidence.

A standard NIST SHA-3 implementation must not be substituted for Ethereum's Keccak-256 when reproducing the hash. The investigation should use Ethereum-compatible Keccak-256 and record the exact 64-byte ABI preimage:

`bytes32(address) || uint256(100)`

## Next tests

1. Enumerate all BaseScan-verified contracts containing the exact target hash.
2. Retrieve each contract's creation transaction and deployer.
3. Compare deployer addresses across the cluster.
4. Compare first funding transactions for those deployers.
5. Compare deployment timestamps, nonce patterns, gas settings, and factory/proxy relationships.
6. Retrieve transactions invoking `gasSaver()` and identify actual `msg.sender` values.
7. For every observed caller, reproduce Ethereum Keccak-256 over `abi.encode(caller,100)`.
8. Determine whether the predicate ever evaluates true in an executed transaction; source-code presence alone does not prove execution.
9. Compare compiler version, optimizer settings, metadata, and bytecode similarity where available.
10. Only after those tests, evaluate whether the code-reuse cluster provides evidence of a common operational origin.
