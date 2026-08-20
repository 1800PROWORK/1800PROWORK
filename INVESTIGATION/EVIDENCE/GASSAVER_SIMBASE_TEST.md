# `gasSaver()` — SIMBASE Candidate Test

**Date:** 2026-08-20  
**Network:** Base  
**Candidate contract:** `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`  
**Reported token:** SIMBASE / SIMBA

## Question

Does the supplied hard-coded hash equal:

`keccak256(abi.encode(0x1e4d2113D8E304122f2ceAA20B194d7801a84984, 100))`?

## Result

**NO.**

The independently implemented Keccak-256 calculation produced:

`0x599116af7f2e65df9a2bb046a7ce5d7a228e5e36aa7051f3df8cde6d1747aff0`

The supplied target was:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

Therefore the SIMBASE **contract address itself is not a preimage candidate** for the supplied hash when paired with `n0 = 100`.

## Important Solidity interpretation

The investigated function uses:

```solidity
address a0 = msg.sender;
uint256 n0 = 100;
bytes memory bb = abi.encode(a0, n0);
if (keccak256(bb) == TARGET) { ... }
```

Consequently, the relevant address is **the caller (`msg.sender`)**, not automatically the contract's own address. A mismatch against the SIMBASE contract address therefore does **not** disprove that the target hash could correspond to a caller address.

## Evidence classification

**SIMBASE contract address as hash preimage:** DISPROVED for this exact input construction.

**SIMBASE caller/deployer relationship:** UNPROVEN.

## Next test

Obtain the actual transactions invoking the relevant function and extract their `from` addresses. Those addresses become the legitimate candidate preimages. For each candidate:

`candidate = keccak256(abi.encode(tx.from, uint256(100)))`

A match to the target hash would be reproducible cryptographic evidence that the corresponding caller address was intended by the conditional. It would still not, by itself, prove ultimate human ownership of that address.

## Source context

Coinbase's public asset page identifies SIMBASE/SIMBA on Base at the candidate contract address. citeturn0search0

Blockscout documentation confirms that its contract API can retrieve a contract's creator address and creation transaction hash, which is the next provenance artifact to obtain for this contract. citeturn4search1
