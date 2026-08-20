# `gasSaver()` Hash Evidence Record

## Target under investigation

Supplied Solidity logic:

```solidity
function gasSaver(uint256 n) external {
    address a0 = msg.sender;
    uint256 n0 = 100;
    bytes memory bb = abi.encode(a0, n0);
    if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
        // subsequent assembly / logic supplied during the investigation
    }
}
```

## Deterministic computation

The tested preimage structure is:

`keccak256(abi.encode(candidate_address, uint256(100)))`

Because `address` and `uint256` are static ABI values, each occupies one 32-byte ABI word. The hash therefore has a deterministic 64-byte encoded input for every candidate address.

## Important evidence discovered during the investigation

The same `gasSaver()` implementation and target hash were observed in the investigation on the Base contract identified as **CRASH**, address:

`0x5136691Bd7826eBa653A81AbDCfD86494448C280`

The creator/deployer was displayed in truncated form as:

`0x542724cD...51A99A9d1`

The supplied target hash is:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

## Current interpretation

**STRONGER THAN A PURE HYPOTHESIS, BUT NOT AN IDENTITY PROOF.**

The presence of the exact deterministic hash construction in a deployed Base contract is an important artifact. It establishes that the code pattern existed on-chain. It does not by itself establish who controlled the contract, nor does it prove that the target hash corresponds to the deployer address.

## Required reproduction

For every candidate address obtained from deployment, funding, or invocation evidence:

1. Normalize the address to its 20-byte value.
2. ABI-encode `(address, uint256(100))` as two 32-byte words.
3. Compute Keccak-256.
4. Compare the result byte-for-byte with the target hash.
5. Record the candidate address, encoded preimage, hash, and source transaction.

A positive match would establish that the candidate address is the preimage for the supplied constant. It would **not**, standing alone, establish private-key control or ownership of every related address.

## Candidate addresses that require testing

### A. CRASH contract deployer
`0x542724cD...51A99A9d1` — exact full address must be recovered from the deployment record before computation.

### B. SIMBASE contract
`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

This address has been associated with SIMBASE in the investigation. It must be tested independently rather than assumed to be the hash preimage.

### C. Transaction callers
Any address shown to invoke the `gasSaver()` function should be tested separately. A caller match and a deployer match have different evidentiary significance.

## Evidence classification

**Current status: UNPROVEN HASH PREIMAGE / VERIFIED ON-CHAIN CODE ARTIFACT.**

The next decisive step is recovery of the exact CRASH deployment transaction/deployer address and enumeration of the relevant callers. Only then can the supplied hash be tested against concrete candidates.
