# `gasSaver()` Code-Reuse Finding

**Date documented:** 2026-08-20  
**Evidence class:** STRONG CORRELATION for code/template reuse; UNPROVEN for common ownership.

## Executive finding

The distinctive `gasSaver(uint256)` implementation supplied during the investigation is not isolated to a single Base token. Publicly indexed BaseScan records show the same unusual construction appearing in multiple verified ERC-20 contracts:

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

This is significant because the function combines several highly specific choices: a fixed `n0 = 100`, `msg.sender` as the address input, standard `abi.encode`, a fixed Keccak-256 target, and raw storage manipulation using `sload`, integer division, and `sstore`.

## Publicly observed instances

### 1. UAHg / UAHG

- Contract: `0xf532AdD7455ECE8F9d88964a3bEA4Eaf673d902F`
- Network: Base
- Token: UAHg (UAHG)
- Contract creator shown by BaseScan: `0xBEeDc8f2...5c26e35Bd`
- Creation/activity evidence shown: June 6, 2024
- BaseScan source is verified exact match.
- The verified source contains the `gasSaver()` implementation and the exact target hash.

Source: BaseScan search result `turn6search1`.

### 2. Pi Squared / PIS

- Contract: `0xdFAd7bb6a818De483d383aa60Bc675e5DE393Fbd`
- Network: Base
- Token: Pi Squared (PIS)
- Contract creator shown by BaseScan: `0x7c545657...Ed275365e`
- Source verification date shown: July 3, 2024
- BaseScan source contains the same `gasSaver()` implementation and target hash.

Source: BaseScan search result `turn6search0`.

### 3. nfinityAI / NFNT

- Contract: `0xB4452c3F49C6fA30B6D67579dc8552F599Bb6288`
- Network: Base
- Token: nfinityAI (NFNT)
- Contract creator shown by BaseScan: `0x15B34980...7306B56ea`
- Source verification date shown: July 6, 2024
- Compiler shown: Solidity `v0.8.20+commit.a1b79de6`
- BaseScan exposes the same `gasSaver(uint256)` ABI entry and source implementation.

Sources: BaseScan search results `turn6search2`, `turn6search5`, and `turn6search7`.

### 4. CC8 ON BASE / CCONBASE

- Contract: `0x5f4d8c4f73db53c461987e60877386d4a259f590`
- Network: Base
- Token: CC8 ON BASE (CC8)
- Source verification date shown: May 8, 2024
- Verified source contains the same `gasSaver()` code and target hash.

Source: BaseScan search result `turn2search4`.

## Why the hash matters — and why it is not yet an identity proof

The Solidity ABI specification defines `address` and `uint256` as static ABI types. Static values are encoded in 32-byte words; an address is encoded according to the `uint160` representation and a `uint256` is left-padded to 32 bytes. Therefore `abi.encode(a0, 100)` deterministically produces 64 bytes before the Keccak-256 operation.

The critical implication is that the hard-coded target can be tested against a candidate `msg.sender` exactly. It is not necessary to guess about Solidity's encoding semantics.

However, the function does **not** hash the contract address. It hashes `msg.sender`. Consequently, finding the target hash in the bytecode proves that the contract author inserted or inherited that target value, but does not by itself identify the address whose call would satisfy the condition.

## Important behavioral observation

The function is externally callable, but the privileged branch is gated by the hash of `msg.sender`. If a caller does not satisfy the preimage condition, the function simply reaches the end without changing storage. If a caller does satisfy it, the function divides storage slot `n` by 100 and writes the result back.

Thus there are two separate forensic questions:

1. **Code provenance:** Why does this exact unusual function/hash appear in multiple Base contracts?
2. **Preimage provenance:** Which address, if any, actually produces the hard-coded hash under `keccak256(abi.encode(address, uint256(100)))`?

These questions must not be conflated.

## Current assessment

### What is now supported

**STRONG CORRELATION — code/template reuse.**

The same distinctive implementation is independently visible in multiple Base ERC-20 contracts created/verified in 2024. This materially strengthens the conclusion that the function is a reused code/template artifact rather than an isolated feature of one investigated contract.

### What remains unproven

**UNPROVEN — common ownership/control.**

The observed code reuse does not establish that all contract creators are the same person, control the same wallet, or share a master seed. Public source-code reuse, copied templates, or common deployment tooling remain alternative explanations.

### What would materially strengthen the ownership hypothesis

The following would be substantially stronger than source-code similarity:

- identical or linked deployer/funder addresses;
- a common funding transaction or funding chain;
- the same externally owned account deploying multiple contracts;
- the same address calling `gasSaver()` across multiple contracts;
- a reproducible hash preimage associated with an investigated address;
- identical deployment bytecode plus linked constructor arguments and provenance;
- signed messages or attestations tying the relevant addresses together;
- a private-key/control proof supplied by the legitimate controller.

## Reproduction specification

For a candidate address `A`, compute:

```text
ENC(A,100) = bytes32(uint160(A)) || bytes32(100)
H = keccak256(ENC(A,100))
```

Then compare `H` byte-for-byte with:

```text
0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1
```

A successful match is a **verified mathematical match for that address**. It is not, by itself, proof that the address belongs to the person under investigation.

## Next investigative priority

Obtain the actual transaction-level callers for `gasSaver()` on the identified Base contracts and test those `from` addresses against the target hash. This is more probative than testing contract creators alone because the Solidity expression explicitly uses `msg.sender`.

## Source references

- Solidity ABI specification: `https://docs.solidity.org/en/latest/abi-spec.html`
- BaseScan UAHg: `https://basescan.org/address/0xf532AdD7455ECE8F9d88964a3bEA4Eaf673d902F`
- BaseScan PIS: `https://basescan.org/address/0xdfad7bb6a818de483d383aa60bc675e5de393fbd`
- BaseScan NFNT: `https://basescan.org/address/0xb4452c3f49c6fa30b6d67579dc8552f599bb6288`
- BaseScan CC8: `https://basescan.org/token/0x5f4d8c4f73db53c461987e60877386d4a259f590`
