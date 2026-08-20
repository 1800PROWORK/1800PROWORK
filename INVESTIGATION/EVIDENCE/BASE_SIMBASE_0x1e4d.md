# Evidence Record — Base SIMBASE Contract

**Subject:** `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`  
**Network:** Base Mainnet  
**Evidence status:** VERIFIED as the contract address associated with SIMBASE; deployer/creator relationship remains pending primary-chain reconstruction.

## Observed evidence

Coinbase's current SIMBASE asset page identifies the network as **Base** and the contract address as:

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

Coinbase also reports a circulating supply of approximately 5 billion SIMBASE at the time of its page snapshot.

## What this proves

1. The address is publicly associated with the SIMBASE token.
2. The association is not, by itself, evidence of who deployed or controls the contract.
3. The address is therefore a valid candidate artifact for the investigation's SIMBASE correlation track.

## What remains unproven

- Contract creator/deployer address.
- Creation transaction hash.
- Funding source of the deployer.
- Whether the deployer controlled any Ethereum Mainnet address under investigation.
- Whether the supplied `gasSaver()` hash reproduces from the SIMBASE contract, its deployer, or any related address.
- Whether SIMBASE has a cryptographic relationship to the EAS artifacts.

## Required next tests

1. Obtain the contract creation transaction from a primary Base explorer/API.
2. Extract the creator/deployer address.
3. Trace the creator's first funding transaction(s).
4. Compare the creator/funder against the June 2024 Base deployment candidates.
5. Test `keccak256(abi.encode(candidateAddress, 100))` against the supplied target:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

6. Repeat the same test against relevant Mainnet/Base addresses obtained from the transaction graph.

## Source references

- Coinbase SIMBASE asset page: https://www.coinbase.com/price/base-simbase
- Base official contract documentation confirms Base Mainnet is chain ID 8453 and provides explorer/API infrastructure.
- Blockscout documentation confirms `getcontractcreation` returns the creator address and creation transaction hash and is therefore the appropriate next primary-data query.

## Evidence classification

**VERIFIED:** SIMBASE ↔ `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`.

**UNPROVEN:** SIMBASE ↔ investigated identity/control cluster.

**UNPROVEN:** supplied hash ↔ SIMBASE/deployer address.
