# Hash Test — SIMBASE Candidate 001

**Status:** Completed deterministic negative test  
**Evidence class:** DISPROVES this specific candidate; does not disprove the broader identity hypothesis  
**Network:** Base  
**Candidate contract/address:** `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`  
**Token context:** SIMBASE / SIMBA

## Question

Does the supplied Solidity construction

```solidity
address a0 = msg.sender;
uint256 n0 = 100;
bytes memory bb = abi.encode(a0, n0);
keccak256(bb)
```

produce the previously supplied target hash when `a0` is the SIMBASE contract address and `n0 = 100`?

Target supplied during the investigation:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

## Encoding tested

For static ABI values `address` and `uint256`, `abi.encode(a0, n0)` produces two 32-byte words:

1. The 20-byte address is left-padded with twelve zero bytes.
2. The integer `100` is represented as a 32-byte big-endian unsigned integer.
3. The two words are concatenated and hashed with Ethereum Keccak-256.

The exact byte sequence tested was therefore:

```text
0000000000000000000000001e4d2113d8e304122f2ceaa20b194d7801a84984
0000000000000000000000000000000000000000000000000000000000000064
```

## Result

Computed Keccak-256:

`0x599116af7f2e65df9a2bb046a7ce5d7a228e5e36aa7051f3df8cde6d1747aff0`

Supplied target:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

**They do not match.**

## Interpretation

This is a reproducible negative result for the specific hypothesis:

> `msg.sender == 0x1e4d2113D8E304122f2ceAA20B194d7801a84984` and `n0 == 100` produce the supplied target hash.

That hypothesis is therefore **DISPROVED for this candidate**.

This result does **not** establish that the target hash is meaningless, nor does it identify the address that produced it. It only removes this specific address/value pair from the candidate set under the exact `abi.encode(address,uint256)` interpretation.

## Why this matters

The test materially narrows the investigation. The target hash cannot be used as evidence linking the SIMBASE contract address to the supplied Solidity condition merely because the address appeared elsewhere in the investigation.

Future candidate tests should prioritize:

- actual `msg.sender` addresses observed in transactions invoking the relevant function;
- deployer addresses;
- transaction origin/funding addresses where independently justified;
- addresses appearing in verified source-code execution traces;
- exact values of `n` if the function was called with a value other than the hard-coded `100`.

A successful hash match would establish that a candidate address/value pair is consistent with the hard-coded condition. It would **not by itself prove private-key ownership or common identity**; that would require a separate control/ownership bridge.

## Source context

A current public market-data source identifies the address above as the Base SIMBASE contract address. This repository record treats that as contextual evidence only; the hash computation itself is independent of the market-data source.

## Evidence grade

**DISPROVED — Candidate 001 only.**

The broader SIMBASE relationship remains **UNPROVEN** until transaction-level and cryptographic evidence establishes a concrete bridge.
