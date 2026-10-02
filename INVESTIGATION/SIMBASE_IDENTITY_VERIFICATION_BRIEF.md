# SIMBASE / SimBase Identity & GasSaver Verification Brief

## Executive Summary

The repository currently contains substantial blockchain-evidence material for SIMBASE/SimBase and a candidate `gasSaver()` hash test, but the evidence does not yet establish identity, ownership, or control.

The strongest verified facts are limited to:

- The Base contract `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` is publicly associated with SIMBASE / SIMBA.
- Coinbase market data identifies the address as the SIMBASE Base contract.
- The investigation record shows a funding path from `0x15CaA83766b20261f5c30E074056FA83261d9418` into a wallet that later created and removed SIMBASE liquidity, including a 15 WETH transfer and SIMBASE liquidity creation/removal flow.
- The repository explicitly warns that collection tools gather observations and do not establish wallet ownership.

The unresolved status is:

- No reproduced `gasSaver()` hash match has been proven against a verified address.
- No ownership or common-control proof has been established linking SIMBASE deployers, operators, or related wallets to the broader investigation.
- Any identity linkage remains a hypothesis pending primary-chain reconstruction.

## Current Status

### Verified

- Base contract address identified as SIMBASE / SIMBA.
- Contract appears in public Base market-data context.
- Funding and liquidity events are documented in the investigation record.
- Repository notes explicitly distinguish observation from proof.

### Not Proved

- Identity of the contract deployer/controller.
- Ownership of the SIMBASE wallet or creator address.
- The supplied `gasSaver()` hash matching any real address.
- A direct relationship between SIMBASE activity and the subject of the broader investigation.

## Source Basis in This Repository

The repo includes the following relevant files:

- `INVESTIGATION/CASE_INDEX.md`
- `INVESTIGATION/SIMBASE_ADDRESS_EVIDENCE.md`
- `INVESTIGATION/EVIDENCE/SIMBASE_HASH_CHECK.md`
- `INVESTIGATION/EVIDENCE/SIMBASE_CONTRACT_0x1e4d2113.md`
- `INVESTIGATION/EVIDENCE/BASE_SIMBASE_0x1e4d2113.md`
- `INVESTIGATION/EVIDENCE/BASE_SIMBASE_ADDRESS.md`
- `INVESTIGATION/EVIDENCE/BASE_SIMBASE_0xCE8820_CURRENT_2026-10-01.md`

These files repeatedly state the same core limitation: a public address association, token identity, or indicator of activity is not the same as proof of ownership or identity.

## Key Evidence Summary

### 1. SIMBASE / SimBase Contract Identity

The address in question is:

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

The repo states that:

- Coinbase public market data identifies it as a Base contract for SIMBASE / SIMBA.
- This confirms a token-address association.
- It does not prove custody, deployment by a specific person, or relationship to the broader investigation.

### 2. Funding and Liquidity Events

The investigation record states that:

- On or about June 8, 2024, a 15 WETH transfer occurred.
- A wallet linked to the current SIMBASE creator path then created liquidity for SIMBASE.
- The same wallet later removed liquidity.

This is meaningful because it gives transaction-level evidence that the wallet is connected to SIMBASE liquidity creation flows. However, it still does not prove that the wallet belongs to the person or entity under investigation.

### 3. GasSaver Hash Test

The repository includes this candidate construction:

```solidity
address a0 = msg.sender;
uint256 n0 = 100;
bytes memory bb = abi.encode(a0, n0);
if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
    // ...
}
```

The repo records that:

- no independent reproduction of the hash match has been established;
- no address has been verified to produce the supplied hash under the exact `abi.encode(address, uint256(100))` rule;
- therefore, this is currently an unproven candidate and cannot be treated as identity proof.

## What Counts as Proof

The repo has established a reasonable standard for proof. The required sequence is:

1. Recover the full deployer/creator address from BaseScan or RPC data.
2. Identify the exact creation transaction and block.
3. Trace the creator's funding source(s).
4. Compare any candidate wallet against the target contract and transaction graph.
5. Recompute the exact Keccak-256 hash for candidate addresses using the same ABI encoding.
6. Verify whether any function selector or on-chain pattern matches the supplied gasSaver logic.
7. Only then treat identity or control linkage as evidence.

## Proof Checklist for SIMBASE / SimBase

### Required proof elements

- [ ] Full deployer address recovered without truncation
- [ ] Deployment transaction hash and block recorded
- [ ] Contract source or bytecode retrieved
- [ ] Funding path for deployer established
- [ ] Relevant wallet cluster mapped to the created liquidity flow
- [ ] `keccak256(abi.encode(candidateAddress, 100))` computed for candidate addresses
- [ ] Exact match against `0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1` checked
- [ ] Function selector or runtime code compared against any supplied `gasSaver()` implementation
- [ ] Independent explorer / RPC confirmation recorded for each step

## Conclusion

At the current state of the repository, the evidence supports a cautious conclusion:

- SIMBASE is a real Base token/contract association.
- There are relevant transaction patterns and funding pathways.
- There are candidate hash-based correlations.
- But there is not yet enough verified evidence to state that SIMBASE or the gasSaver implementation proves a specific person's identity or ownership.

Any claim of ownership, identity, or control must be backed by primary-chain proof, not by token naming, public market data, similar patterns, or unverified hash candidates.

## Recommended Status Label

`PROVISIONAL CORRELATION — NOT IDENTITY PROOF`

---

## Printable PDF instruction

Open this file in a browser and choose:

`Print > Save as PDF`

This file is intentionally structured for clean print output.

