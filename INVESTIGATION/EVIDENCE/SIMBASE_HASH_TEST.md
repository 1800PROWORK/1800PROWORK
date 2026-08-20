# SIMBASE / `gasSaver()` Hash Test

## Candidate contract

- Network: Base Mainnet
- Address: `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`
- Public market-data source identifies this address as the Base SIMBASE (SIMBA) contract.
- Base chain ID: `8453`.

## Hash under investigation

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

The supplied Solidity logic computes:

`keccak256(abi.encode(a0, 100))`

where `a0 = msg.sender` and `100` is a `uint256`.

## Deterministic encoding

For a candidate address, `abi.encode(address,uint256)` consists of two 32-byte ABI words:

1. The 20-byte address, left-padded with zero bytes to 32 bytes.
2. The integer `100`, encoded as a 32-byte big-endian unsigned integer.

The resulting 64-byte value is the exact preimage supplied to Keccak-256.

## Current result

**UNPROVEN.** The supplied target hash has not been independently reproduced for `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` in this evidence pass.

This is deliberate: the contract address is not automatically equivalent to `msg.sender`. The relevant candidate for the hash is the transaction caller that executes `gasSaver()`, not necessarily the token contract itself.

## Required next evidence

1. Identify every transaction invoking `gasSaver()` on the relevant contract.
2. Extract the actual transaction `from` address for each invocation.
3. Recompute `keccak256(abi.encode(from,100))` for each candidate.
4. Record exact transaction hashes and results.
5. If a candidate reproduces the target hash, determine whether that address is itself controlled by, funded by, or cryptographically linked to the investigated origin.

## Interpretation rule

A reproduced hash would establish a deterministic relationship between the supplied hash and a specific address/input pair. It would **not by itself prove human ownership or identity**. Ownership requires an additional independent control or provenance bridge.

## Source notes

Base documentation identifies Blockscout as an available Base explorer and states that explorer/API data can provide transaction, address, contract, and decoded interaction information. The Coinbase market-data page independently associates the candidate address with Base SIMBASE.
