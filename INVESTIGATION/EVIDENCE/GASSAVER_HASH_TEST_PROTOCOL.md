# Evidence Record — `gasSaver()` Hash Test Protocol

**Target supplied during investigation:**

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

**Observed Solidity construction:**

```solidity
address a0 = msg.sender;
uint256 n0 = 100;
bytes memory bb = abi.encode(a0, n0);
if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
    // conditional branch supplied in the investigation
}
```

## Deterministic encoding

Because `address` and `uint256` are static ABI types, `abi.encode(a0, n0)` produces two 32-byte words: the address represented as a 160-bit value padded to 32 bytes, followed by `n0` as a 256-bit big-endian integer padded to 32 bytes. Solidity's ABI specification defines these static encodings. The resulting preimage is therefore exactly 64 bytes long.

For `n0 = 100`, the second word is:

`0x0000000000000000000000000000000000000000000000000000000000000064`

## Required reproduction

For every candidate address `A`:

1. Normalize `A` to its 20-byte hexadecimal address value.
2. Left-pad it to 32 bytes.
3. Append the 32-byte encoding of integer `100`.
4. Compute Ethereum **Keccak-256** over the resulting 64 bytes.
5. Compare the 32-byte digest byte-for-byte with the supplied target.
6. Record the exact candidate, preimage, digest, source transaction/address evidence, and result.

## Important distinction

Do not substitute NIST SHA3-256 for Ethereum Keccak-256. They are different hash functions.

Do not use `abi.encodePacked(a0, n0)` for this test. The supplied Solidity uses `abi.encode`, which has different padding semantics.

## Current result

**NOT YET REPRODUCED.** The supplied target hash is preserved exactly, but no candidate-address match is asserted in this record.

A match would establish that a candidate address is a preimage of the supplied hash under the specified deterministic construction. It would **not automatically prove ownership of the broader investigation's addresses**. Ownership/control would still require an independently established bridge.

## Next evidence required

- Candidate `msg.sender` addresses from actual transactions containing the relevant function call.
- Contract address and network for the observed `gasSaver()` implementation.
- Transaction hashes containing the invocation.
- Exact calldata where available.
- Runtime bytecode/source verification of the function implementation.
- Reproducible Keccak-256 output for each candidate.
