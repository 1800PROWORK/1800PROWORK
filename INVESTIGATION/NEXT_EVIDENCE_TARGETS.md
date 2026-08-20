# Next Evidence Targets

## Priority 1 — CRASH deployment provenance

Recover the complete deployment transaction for:

`0x5136691Bd7826eBa653A81AbDCfD86494448C280`

Required fields:

- Full deployer address
- Deployment transaction hash
- Block number
- Timestamp
- Contract creation input / init code where available
- Factory address, if deployed through a factory
- Immediate funding transaction(s)

## Priority 2 — `gasSaver()` callers

Identify transactions invoking the relevant function and extract `msg.sender` for each invocation. Test each caller address against:

`keccak256(abi.encode(caller, uint256(100)))`

## Priority 3 — SIMBASE

For:

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

recover:

- Exact creation transaction
- Creator/deployer
- First funding source
- First outbound transactions
- Relevant function selectors
- Whether `gasSaver()` exists in the deployed bytecode/source

## Priority 4 — Cross-chain comparison

Compare the CRASH/SIMBASE/Base artifacts with the previously identified Ethereum Mainnet architecture using exact bytecode, selectors, calldata patterns, funding relationships, and timing—not naming similarity.

## Decision points

A hash match to a candidate address is a deterministic cryptographic finding. A common funding source or deployment pattern is a behavioral/transactional correlation. Neither should automatically be described as proof of common human ownership.
