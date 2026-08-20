# `gasSaver()` Hash Investigation

**Status:** UNPROVEN — candidate reconstruction required  
**Target hash:** `0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`  
**Observed construction:** `keccak256(abi.encode(a0, n0))`  
**Observed constant:** `n0 = 100`

## 1. Supplied Solidity construction

The investigation supplied the following relevant logic:

```solidity
function gasSaver(uint256 n) external {
    address a0 = msg.sender;
    uint256 n0 = 100;
    bytes memory bb = abi.encode(a0, n0);
    if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
        // subsequent assembly / execution logic was supplied separately
    }
}
```

The important observation is that the hash input is **not** `n`. It is the ABI encoding of `msg.sender` and the constant integer `100`.

## 2. ABI interpretation

For two static ABI values, `address` and `uint256`, `abi.encode(a0, n0)` produces two 32-byte ABI words:

1. The address is represented as a 32-byte word with the 20-byte address right-aligned and zero-padded on the left.
2. The integer `100` is represented as a 32-byte big-endian unsigned integer.

Therefore the preimage is exactly:

`bytes32(address) || bytes32(100)`

and the expected comparison is:

`keccak256(preimage) == target_hash`

## 3. What this can prove

If an independently identified address `A` produces the target hash when evaluated with `100`, then the following proposition is **VERIFIED**:

`keccak256(abi.encode(A, uint256(100))) == target_hash`

That does **not**, by itself, prove that the owner of `A` authored the contract or controlled every related address. It proves only that the supplied deterministic condition is satisfied by `A`.

A stronger identity inference would require an additional independently verifiable bridge, such as:

- a transaction signed by the same key;
- a deployment/funding relationship;
- an EIP-712 or ECDSA signature;
- an explicit on-chain ownership/control operation;
- or another cryptographically attributable artifact.

## 4. Candidate-address discipline

The investigation must not search arbitrary address space and then treat an accidental or computationally selected match as proof of identity.

Candidates should first come from independently established evidence, including:

- `msg.sender` observed in the relevant transaction;
- contract deployer;
- transaction origin where technically relevant;
- funding source;
- addresses repeatedly interacting with the target contract;
- addresses linked through verified on-chain operations.

Only then should each candidate be tested against the deterministic hash condition.

## 5. Current search result

The public web search performed during this evidence pass located the Base SIMBASE token at:

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

A public Coinbase asset page identifies this address as the Base-network SIMBASE/SIMBA contract. This establishes the address/token association but does **not** establish that the address is the `msg.sender` used in the `gasSaver()` condition or that it satisfies the supplied hash. See the accompanying case notes for source references.

The exact target hash did not produce an independently attributable public search result in the indexed sources used for this pass. Therefore no hash match is being claimed.

## 6. Current evidence grade

**Target hash:** UNPROVEN as an identity linkage.

**SIMBASE contract address:** VERIFIED as the Base SIMBASE address from the independently indexed asset record, but this is only an asset/address association.

**SIMBASE → target hash linkage:** UNPROVEN.

**SIMBASE → `gasSaver()` caller linkage:** UNPROVEN.

**Common ownership/control:** UNPROVEN.

## 7. Required next evidence

The decisive next step is to obtain the actual transaction(s) containing the `gasSaver()` call or otherwise identify the candidate `msg.sender` values. For every candidate, record:

- chain;
- contract address;
- transaction hash;
- block number;
- timestamp;
- transaction `from` address;
- calldata;
- decoded function arguments;
- exact ABI preimage;
- computed Keccak-256 digest;
- comparison with the target hash;
- resulting evidence grade.

No ownership conclusion should be made until these fields are reproducibly documented.

## 8. Investigative conclusion at this stage

The hash condition is technically precise and potentially useful, but it is **not yet an identity proof**. The investigation should now pivot from the hash itself to the transaction history needed to identify the legitimate candidate `msg.sender` values. That is the point at which the hash can become an evidentiary discriminator rather than a speculative identifier.
