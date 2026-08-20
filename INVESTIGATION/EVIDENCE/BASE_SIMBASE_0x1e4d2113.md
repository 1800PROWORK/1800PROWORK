# Evidence Record — Base SIMBASE

## Target

- Network: Base Mainnet
- Contract: `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`
- Asset: SIMBASE / SIMBA

## Independently observed public evidence

A current public market-data page identifies SIMBASE as a Base-network asset and lists the contract address above. This establishes the address/asset association, but the source explicitly notes that its data comes from third parties.

## Important distinction

This record does **not** establish that the contract deployer, token creator, or controller is the person/entity under investigation. Asset identification and ownership attribution are separate propositions.

## `gasSaver()` test status

The investigation previously supplied the following construction:

```solidity
address a0 = msg.sender;
uint256 n0 = 100;
bytes memory bb = abi.encode(a0, n0);
if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
    // ...
}
```

The candidate address `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` has **not** been promoted to a hash match. No independent reproduction of the supplied target hash for this address has been established in the current evidence set.

## Required next evidence

1. Obtain the contract-creation transaction for the SIMBASE address.
2. Record the deployer/creator address and exact creation transaction hash.
3. Recover the creation input and deployed bytecode.
4. Determine whether the supplied `gasSaver()` function exists in the deployed code/source or in an associated implementation.
5. Enumerate candidate `msg.sender` addresses from relevant transactions.
6. Recompute the exact ABI encoding and Ethereum Keccak-256 hash for each candidate.
7. Record any match with exact input bytes, hash, transaction, block, and source reference.
8. Trace the candidate's funding and deployment relationships to the other investigation targets.

## Evidence grade

**VERIFIED:** The public asset/address association.  
**UNPROVEN:** Any identity/control relationship.  
**UNPROVEN:** The supplied hash as a fingerprint of this address.

## Methodological note

BaseScan documents a contract-creation endpoint that returns a contract's deployer address and creation transaction hash, and a source-code endpoint for verified contracts. These are the appropriate primary-indexed fields to obtain before drawing conclusions about SIMBASE provenance.
