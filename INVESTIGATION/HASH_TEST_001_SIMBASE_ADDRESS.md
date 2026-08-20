# Hash Test 001 — SIMBASE Contract Address / `n0 = 100`

**Status:** VERIFIED NEGATIVE RESULT  
**Test date:** 2026-08-20  
**Network context:** Base  
**Candidate address:** `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`  
**Candidate asset:** SIMBASE / SIMBA

## Question

Does the supplied Solidity expression

```solidity
keccak256(abi.encode(a0, n0))
```

produce the previously observed target hash when:

```solidity
a0 = 0x1e4d2113D8E304122f2ceAA20B194d7801a84984
n0 = 100
```

and `a0` is an `address` while `n0` is a `uint256`?

## ABI construction

The Solidity ABI specification defines `address` as a 20-byte value and static ABI values are encoded into 32-byte words. `uint256` is likewise encoded as a 32-byte big-endian value. Therefore `abi.encode(address,uint256)` for these two static arguments is exactly 64 bytes: the zero-left-padded address word followed by the 32-byte integer word.

For this candidate:

```text
address word:
0000000000000000000000001e4d2113d8e304122f2ceaa20b194d7801a84984

uint256(100) word:
0000000000000000000000000000000000000000000000000000000000000064
```

Combined ABI payload:

```text
0000000000000000000000001e4d2113d8e304122f2ceaa20b194d7801a84984
0000000000000000000000000000000000000000000000000000000000000064
```

## Computed result

Keccak-256 of the 64-byte ABI payload:

```text
0x599116af7f2e65df9a2bb046a7ce5d7a228e5e36aa7051f3df8cde6d1747aff0
```

Previously supplied target:

```text
0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1
```

### Result

**NO MATCH.**

The SIMBASE contract address `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` with `n0 = 100` does **not** reproduce the supplied target hash under standard Solidity `abi.encode(address,uint256)` semantics.

## What this proves

1. The candidate address is eliminated for this exact `(address, uint256=100)` preimage test.
2. The supplied target hash cannot currently be attributed to this SIMBASE contract address on the basis of this test.
3. This is a useful negative result: it narrows the candidate set without implying that the hash is erroneous.
4. The test does **not** rule out the same address with another integer value, another encoding construction, or another variable being hashed.
5. The test does **not** establish or disprove ownership/control relationships between SIMBASE and any other investigated address.

## Important distinction

`abi.encode(...)` and `abi.encodePacked(...)` are not interchangeable. The supplied Solidity fragment uses `abi.encode`, so the 64-byte standard ABI encoding above is the relevant construction. The Solidity documentation explicitly distinguishes standard ABI encoding from packed encoding.

## Reproduction

The result was independently computed using a Keccak-256 implementation over the exact 64-byte payload above. The computation can be reproduced with any Ethereum-compatible Keccak-256 implementation.

## External corroboration

Public market metadata currently identifies `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` as the Base address for SIMBASE/SIMBA. This corroborates the identity of the candidate being tested, but it does not establish ownership or authorship.

## Evidence classification

**VERIFIED — NEGATIVE HASH MATCH**

This classification applies only to the proposition tested here:

> `keccak256(abi.encode(0x1e4d2113D8E304122f2ceAA20B194d7801a84984, uint256(100))) == supplied target`

That proposition is false.

## Next tests

- Test other candidate addresses already identified in the investigation with `n0 = 100`.
- If the original contract logic permits `n` to vary, test only values supported by observed calls or source code rather than performing an unconstrained search.
- Recover the exact transaction containing the suspected `gasSaver()` invocation, if available.
- Compare the transaction's calldata against the ABI encoding predicted by the source.
- Determine whether the target hash occurs in bytecode, calldata, storage, logs, or another on-chain artifact.
