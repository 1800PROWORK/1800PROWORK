# `gasSaver()` Hash Reproduction — Evidence Record

**Date:** 2026-08-20  
**Status:** Candidate testing completed; target hash not reproduced for tested contract addresses.

## Target implementation

The investigated function contains:

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

## Deterministic test

For each candidate sender address, the input tested was:

`abi.encode(address, uint256(100))`

Ethereum ABI encoding represents both static values as 32-byte words. The resulting 64-byte value was hashed using Ethereum Keccak-256.

### Results

| Candidate address | Keccak-256 result | Target match |
|---|---|---|
| `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` | `0x599116af7f2e65df9a2bb046a7ce5d7a228e5e36aa7051f3df8cde6d1747aff0` | **NO** |
| `0x5f4d8c4f73db53c461987e60877386d4a259f590` | `0x5656f4f452f90703000d019fc86466e3d8376a25b07f1fa4fa9fcb1e71211855` | **NO** |
| `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7` | `0x4ff098ddc65784f686768ed39659fc4784ba3248d790fd4dd8a66509dcae79c2` | **NO** |

The Keccak implementation was independently sanity-checked against the canonical Ethereum Keccak-256 empty-string digest (`c5d246...a470`) and `keccak256("abc")` (`4e0365...6c45`).

## Important new observation

The exact same `gasSaver()` source fragment and exact same hard-coded target hash appears in multiple verified Base token contracts, including:

- `0x5f4d8c4f73db53c461987e60877386d4a259f590` — **CC8 / Cotton Candy Coin**
- `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7` — **Chakra**

BaseScan presents both contracts as verified source-code matches and exposes the `gasSaver(uint256)` function containing the same hash. This is significant because it demonstrates that the code/hash combination is **not unique to SIMBASE**.

## Investigative implication

The hard-coded hash should therefore be treated as a **shared code artifact / candidate operational fingerprint**, not an identity proof by itself.

A stronger linkage would require evidence such as:

1. The same deployer or controlling address across the contracts;
2. Common funding provenance;
3. Repeated calls to `gasSaver()` from the same address;
4. Identical deployment bytecode or factory provenance;
5. A reproducible relationship to the Ethereum Mainnet contracts under investigation;
6. A cryptographic signature or other direct control evidence.

## Current classification

**`gasSaver()` hash as an ownership identifier: UNPROVEN.**

**Reuse of the exact source/hash across multiple Base contracts: VERIFIED from publicly indexed verified source code.**

This finding materially changes the investigative path: instead of searching only for the address whose ABI encoding produces the target hash, the next priority is to identify the common deployment/funding/control infrastructure behind the contracts that reuse the fragment.
