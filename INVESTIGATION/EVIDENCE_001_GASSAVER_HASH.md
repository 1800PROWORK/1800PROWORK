# Evidence 001 — `gasSaver()` hard-coded hash

**Status:** STRONG CODE CORRELATION / IDENTITY UNPROVEN  
**Network:** Base  
**Target hash:** `0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

## Observed implementation

The investigated Solidity pattern defines:

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

## Independent observations

Public BaseScan-indexed source/bytecode results show this exact hard-coded hash and the same `gasSaver(uint256)` logic in multiple Base token contracts. Examples include contracts indexed at `0x5f4d8c4f...4a259f590`, `0xe47434de...e06c888a3`, `0xb6006893...1f16d8450`, `0x98225185...2bbcd5d21`, and `0x5136691b...94448c280`. This demonstrates that the hash/function pattern is **not unique to one contract**. 

## Critical interpretation

The hash is calculated from `abi.encode(msg.sender, 100)`. Consequently, if the condition is satisfied, it identifies a particular caller address for the fixed value `100`. However, finding the same literal hash embedded in multiple contracts does **not** establish that those contracts share an owner or that their deployers are the address encoded by the hash.

A valid ownership/caller linkage requires:

1. Candidate caller address obtained independently from transaction history or another primary source.
2. Exact ABI encoding of that address and integer `100`.
3. Keccak-256 computation reproducing the target hash.
4. Evidence that the candidate address actually called `gasSaver()` or otherwise controlled the relevant execution path.

## Current finding

**The repeated code/hash is verified as a cross-contract code artifact. The identity encoded by the hash remains unverified.**

This is important because it changes the investigative question from “which contract contains this hash?” to “which externally owned account, if any, produces this hash and can that account be tied to the investigated deployments?”

## Next verification target

Reconstruct all known `gasSaver(uint256)` calls on the relevant Base contracts, identify their transaction `from` addresses, and test those addresses against the fixed hash condition. The resulting candidate set should then be compared with deployment funders, contract deployers, and the June 2024 Base addresses under investigation.

## Primary references

- BaseScan source result for `0x5f4d8c4f...4a259f590` — exact `gasSaver()` implementation and target hash.
- BaseScan source result for `0xe47434de...e06c888a3` — exact `gasSaver()` implementation and target hash.
- BaseScan source result for `0xb6006893...1f16d8450` — matching deployed bytecode containing the target hash.
- BaseScan source result for `0x98225185...2bbcd5d21` — matching deployed bytecode containing the target hash.
- BaseScan source result for `0x5136691b...94448c280` — exact function and verified ABI entry.
