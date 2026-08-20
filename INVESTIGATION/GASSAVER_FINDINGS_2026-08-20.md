# `gasSaver()` Investigation — Evidence Finding

**Date:** 2026-08-20  
**Classification:** STRONG CORRELATION for code reuse; UNPROVEN for identity/control linkage

## Target

The investigated Solidity fragment contains:

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

## New primary-source observation

BaseScan search results independently expose the same distinctive `gasSaver()` implementation and the same 32-byte Keccak constant in multiple verified Base ERC-20 contracts.

Confirmed examples:

- `0x5f4d8c4f73db53c461987e60877386d4a259f590` — CC8 ON BASE (CC8 / contract name `CCONBASE`). BaseScan identifies the source as an exact verified match and includes the complete `gasSaver()` implementation.
- `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7` — Chakra (CHAKR...), contract name `CHAKRA`. BaseScan likewise shows the same `gasSaver()` implementation and constant.

## Significance

This materially changes the interpretation of the hard-coded hash.

The constant is **not unique to a single observed contract**. At minimum, it appears in multiple independently identified Base token source-code records. Therefore the presence of this constant alone cannot establish ownership of SIMBASE, a particular deployer, or a single master identity.

The more defensible inference is that the code fragment represents a **reused source-code pattern/template** or a family of contracts sharing the same implementation.

## SIMBASE comparison

The Base SIMBASE token is publicly associated with:

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

The current evidence does **not** establish that this SIMBASE address is the preimage address represented by the `gasSaver()` Keccak comparison. A direct candidate computation has not yet produced a verified match.

## Important distinction

There are now two separate questions:

1. **Was the `gasSaver()` code reused across Base contracts?**
   - Current assessment: **STRONG CORRELATION / effectively established from multiple verified source-code records.**

2. **Does the embedded Keccak constant encode a specific address controlled by the same actor who deployed the investigated contracts?**
   - Current assessment: **UNPROVEN.**

A code-template relationship can be useful forensic evidence, but it is not equivalent to a cryptographic ownership proof.

## Next verification targets

1. Identify all Base contracts containing the exact hash and `gasSaver()` implementation.
2. Record deployment timestamps and deployer addresses for each.
3. Compare deployer/funder relationships.
4. Determine whether the contracts share compiler settings, source/IPFS metadata, constructor patterns, or bytecode lineage.
5. Search for actual `gasSaver(uint256)` calls and identify their `msg.sender` values.
6. For every observed caller, compute `keccak256(abi.encode(caller, uint256(100)))` and compare it with the embedded constant.
7. Determine whether any verified caller actually satisfies the conditional.
8. Only then evaluate whether the matching caller has a reproducible relationship to the investigated identity cluster.

## Current conclusion

**The hash is presently more useful as a code-family fingerprint than as an identity fingerprint.** The discovery of multiple Base contracts containing the identical constant substantially weakens any claim that the constant alone uniquely identifies SIMBASE or its deployer, while strengthening the hypothesis that a common contract template or copied implementation propagated across multiple token deployments.
