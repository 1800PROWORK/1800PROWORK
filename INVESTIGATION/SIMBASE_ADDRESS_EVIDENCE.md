# SIMBASE Address Evidence — Preliminary Record

## Target

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

Network: Base Mainnet

## Independently observed evidence

Coinbase's current SIMBASE asset page identifies the Base-network contract/address as `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`. The same page reports a total supply of 5 billion SIMBA. This establishes an external market-data association between the token name SIMBASE/SIMBA and the address.

Source: https://www.coinbase.com/price/base-simbase

## What this does establish

- The address is associated publicly with SIMBASE/SIMBA on Base.
- The address is therefore a valid candidate for subsequent on-chain contract and transaction reconstruction.

## What this does NOT establish

- It does not establish who controls the address.
- It does not establish that the address is the origin of the wider investigation.
- It does not establish a relationship to the Ethereum Mainnet target(s).
- It does not reproduce the supplied `gasSaver()` hash.
- It does not establish an EAS identity linkage.

## Hash test status

Target supplied during the investigation:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

Candidate computation under investigation:

`keccak256(abi.encode(0x1e4d2113D8E304122f2ceAA20B194d7801a84984, 100))`

Status: **NOT VERIFIED** in this record. No claim of a hash match is made.

## Required next evidence

1. Identify the Base contract creation transaction.
2. Identify the transaction sender/deployer.
3. Identify the earliest funding source of that sender.
4. Extract the deployed bytecode and verify whether the supplied `gasSaver()` function exists in the relevant contract or implementation.
5. Enumerate transactions invoking the relevant function, if present.
6. Recompute the supplied Keccak target against the actual candidate addresses.
7. Compare the resulting provenance with the June 2024 Base deployments and the Ethereum Mainnet architecture.

## Evidence grade

**VERIFIED — address/token association only.**

Identity/control linkage remains **UNPROVEN**.
