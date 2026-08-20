# `gasSaver()` Hash Findings

**Target hash**

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

## Verified observation

A BaseScan-verified ERC-20 contract at `0x5f4d8c4f73db53c461987e60877386d4a259f590` (CC8 ON BASE / CCONBASE) contains the exact `gasSaver(uint256)` implementation previously supplied in this investigation, including:

```solidity
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
```

Source: BaseScan verified contract source for `0x5f4d8c4f73db53c461987e60877386d4a259f590`.

## Additional corroborating observation

The same hard-coded hash and `gasSaver(uint256)` pattern also appear in BaseScan-verified source for other ERC-20 contracts, including:

- `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7`
- `0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450`
- `0x98225185fed2ac9c824d79a8dd9da152bbcd5d21`

This is significant because it changes the interpretation of the hash. The hash is demonstrably reused in multiple deployed contracts; it should therefore **not automatically be treated as a unique contract-identity fingerprint**.

## Important technical interpretation

The condition hashes:

`abi.encode(msg.sender, 100)`

and compares the result with the fixed 256-bit target. The contract therefore executes the storage division only for a sender whose encoded address paired with integer `100` produces the target hash.

The presence of the same target in multiple contracts establishes a **shared code-pattern artifact**, but does not by itself establish that the same person controlled every contract.

## SIMBASE comparison

The Base SIMBASE contract previously identified in the investigation is:

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

Public token data identifies this address as SIMBASE on Base. However, the evidence gathered here does **not** establish that this SIMBASE address is the source of the hard-coded hash, nor that it satisfies the hash condition as `msg.sender`.

## Evidence classification

- Exact `gasSaver()` code pattern in multiple Base contracts: **VERIFIED**
- Hard-coded hash reused across multiple contracts: **VERIFIED**
- Hash is unique to SIMBASE: **DISPROVED / unsupported**
- SIMBASE controls the contracts containing the pattern: **UNPROVEN**
- Hash proves a common owner: **UNPROVEN**
- Hash is useful as a code/provenance correlation indicator: **STRONG CORRELATION**

## Next test

The next decisive test is not to search for the hash in more source code. It is to identify the actual callers of `gasSaver()` and compare their addresses, funding paths, deployment relationships, and transaction timing across the contracts containing this pattern.

A successful match between a caller address and the hash would establish that the condition is operationally reachable for that address. It still would not, by itself, establish private-key ownership of every related address.
