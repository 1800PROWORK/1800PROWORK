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

## Fresh provenance and contract-mechanics verification

Blockscout independently identifies the creator of this older SIMBASE contract as:

`0x31C0282Fa6D0A82aD22ab63BbaCd87F62B2a9bfD`

Creation transaction:

`0x9096b5be538743d2d2c44b327719de7c3d5372ec7d6f5010d89eaa538a8f0b85`

- Creation block: `15380173`
- Time: June 5, 2024 at 01:08:13 UTC
- Creation call target: `0x31C0282Fa6D0A82aD22ab63BbaCd87F62B2a9bfD`
- Creation transaction sender: `0x9db64303c5d07f7eF68d18b370BE1BDc0EcC3AeF`

The creation receipt records `TokenCreated` with SIMBASE/SIMBA metadata, token deployer `0x31C0282F...`, creator/socials address `0x9db64303...`, and an initial supply of `5,000,000,000` tokens.

The verified source does not contain `gasSaver(uint256)`. Its relevant control system is different:

- `renounceDeployerOwnership()` clears the deployer role when called by the role holder.
- `setPair()` and `setJumpBlock()` require the deployer role.
- Social metadata setters require the socials role.
- While the deployer role remains active, transfers require either the sender or recipient to be the token deployer.
- Transfer behavior also checks the configured jump block.

The creation transaction also established a Base Uniswap V3 pool at `0x7fD8a1e3ef5baD65254713aedfe705b6c6243534` through the BaseJump route and transferred approximately 4.95 billion SIMBASE into the pool.

### Evidence classification

- VERIFIED: older SIMBASE contract creator/deployer path.
- VERIFIED: `0x9db64303...` initiated the BaseJump token-creation call.
- VERIFIED: the older contract uses deployer/socials roles, not the current contract's `gasSaver` implementation.
- VERIFIED: initial Base liquidity was created in the deployment transaction.
- UNPROVEN: common human control between `0x9db64303...`, `0x31C0282F...`, the current `0xcE8820...` creator, and the 0x15CaA incident cluster.

This older contract must remain analytically separate from `0xcE8820F5F6d4bE63Ed171f09a0b48571FFFB014D`.
