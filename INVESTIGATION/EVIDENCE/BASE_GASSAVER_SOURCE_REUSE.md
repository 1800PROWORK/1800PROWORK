# Evidence Record — Base `gasSaver()` Source Reuse

**Classification:** STRONG CORRELATION (code-reuse evidence; not ownership proof)  
**Network:** Base  
**Primary artifact:** Solidity source verified on BaseScan  
**Target hash:** `0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

## Executive finding

Two independently identified Base ERC-20 contracts contain the same unusual `gasSaver(uint256 n)` implementation, including the same `abi.encode(msg.sender, 100)` construction, the same hard-coded Keccak-256 comparison value, and the same inline assembly storage transformation.

The two confirmed contracts are:

- `0x5f4d8c4f73db53c461987e60877386d4a259f590` — **CC8 ON BASE (CC8)** / contract name `CCONBASE`.
- `0xe47434de787ff9d14f59400687167d7e06c888a3` — **1MDC (1MDC)** / contract name `OMDC`.

BaseScan reports exact-match verified source for both contracts. The CC8 source was submitted for verification on 2024-05-08. The OMDC source is verified with Solidity `0.8.10`, optimization enabled with 200 runs. citeturn1search0turn1search1

## Exact code pattern

Both contracts contain the following logic:

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

BaseScan's published source for CC8 explicitly contains the function and target hash. citeturn1search0 The OMDC source contains the same function, target hash, and assembly sequence. citeturn1search1turn2search0

## Why this matters

This is substantially stronger than merely observing that two tokens are ERC-20s or have similar transfer functions. The `gasSaver()` function is a nonstandard addition to otherwise conventional ERC-20/Ownable-style contracts.

The function has four distinctive components appearing together:

1. `msg.sender` is captured as `a0`.
2. A fixed value `n0 = 100` is used.
3. `keccak256(abi.encode(a0, n0))` is compared against one specific 32-byte constant.
4. A successful match causes an arbitrary storage slot `n` to be divided by 100 and rewritten with `sstore`.

The exact repetition of all four components across the two verified contracts is therefore a meaningful code-reuse fingerprint.

## Important limitation

This does **not** establish that the same person or private key controls both contracts.

Possible explanations include:

- one developer copied the code into multiple projects;
- one template/source package was reused by unrelated deployers;
- a token-generation service used the same hidden or optional function;
- one actor deployed both contracts;
- one actor supplied code to another actor;
- the contracts derive from a common upstream source.

The blockchain evidence must distinguish among these possibilities.

## Transaction chronology observed so far

The OMDC address page reports a contract creator beginning `0xD21d5126...414f3bfCe` and shows incoming transactions on June 26, 2024, including transactions from `0xDd629C33...BEaE9bCE9` and `0x6b03b0f5...431716b76`. citeturn2search0

This is particularly relevant to the investigation because June 2024 is already one of the target periods in the cross-chain behavioral analysis. However, the visible explorer evidence alone does not establish that these counterparties are controlled by the same actor as any Mainnet address.

## Hash investigation

The hard-coded value is:

`5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

The input being hashed is not ordinary packed encoding. The Solidity expression is `abi.encode(a0, n0)`, meaning the two static arguments are ABI-encoded as 32-byte words. For `address` and `uint256`, the preimage is therefore 64 bytes:

```text
[32-byte ABI address word][32-byte big-endian uint256 word for 100]
```

The investigation target is consequently a deterministic preimage problem over candidate addresses, not a generic search for a visually similar hash.

A successful reproduction for a known address would establish that the address is the address encoded into the condition. It would **not**, by itself, prove private-key ownership of any other address.

## Current interpretation

**VERIFIED:** The unusual `gasSaver()` implementation and target hash occur in at least the two identified Base contracts.

**STRONG CORRELATION:** The identical nonstandard code is evidence of a common code lineage or reuse mechanism.

**UNPROVEN:** Common ownership/control of the two contracts.

**UNPROVEN:** That the target hash corresponds to a particular investigated address.

**UNPROVEN:** That the `gasSaver()` mechanism connects the Base contracts to the Ethereum Mainnet legacy contract.

## Next tests

1. Obtain the complete creation transaction for each contract.
2. Identify the exact deployer/creator address rather than relying on truncated explorer display.
3. Compare creator addresses across all known Base contracts containing this exact function.
4. Enumerate all transactions calling `gasSaver(uint256)` on the identified contracts.
5. Extract each caller address from those transactions.
6. Recompute `keccak256(abi.encode(caller, 100))` for each caller.
7. Determine whether any caller reproduces the hard-coded constant.
8. Compare callers and deployers against the Mainnet investigation address set.
9. Compare creation bytecode and metadata to determine whether the source reuse reflects an identical compiler/template pipeline.
10. Record every positive and negative result in separate evidence entries.

## Primary sources

- BaseScan CC8 contract/source: https://basescan.org/token/0x5f4d8c4f73db53c461987e60877386d4a259f590
- BaseScan OMDC contract/source: https://basescan.org/address/0xe47434de787ff9d14f59400687167d7e06c888a3

## Reproduction standard

An investigator should be able to start with the two contract addresses, retrieve their verified source, locate `gasSaver(uint256)`, and independently confirm that the complete function—including the constant and assembly body—is identical before accepting this finding.
