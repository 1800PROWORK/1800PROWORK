# Evidence Record — `gasSaver()` Hash Test

**Target hash:**

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

**Known construction from the investigation:**

```solidity
address a0 = msg.sender;
uint256 n0 = 100;
bytes memory bb = abi.encode(a0, n0);
keccak256(bb)
```

## Deterministic interpretation

For a candidate address `a0`, the tested preimage is the canonical ABI encoding of:

`(address a0, uint256 100)`

The address occupies one 32-byte ABI word and the integer occupies a second 32-byte ABI word. The resulting 64-byte value is hashed with Keccak-256.

## Current result

**NOT REPRODUCED.**

No candidate address has yet been established from primary transaction evidence that produces the supplied target hash. Therefore the target cannot currently be used as an identity linkage.

## Required candidate sources

Candidate `a0` values should come from:

- Base contract deployment senders;
- Base transaction senders interacting with the relevant contract;
- funding addresses immediately preceding those deployments/interactions;
- Ethereum Mainnet addresses already established as relevant by primary evidence.

## Interpretation rule

A successful hash match would prove that the tested address and integer pair generate the supplied digest. It would **not by itself prove private-key ownership**, because the address would still need to be connected to the actor through the surrounding transaction/control evidence.

## Status

**UNPROVEN — candidate-address reconstruction required.**
