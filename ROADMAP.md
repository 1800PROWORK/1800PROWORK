# Investigation Roadmap

Objective: Document, verify, and track blockchain identity, wallet ownership, contract provenance, and forensic attribution claims across on-chain systems.

Scope: Ethereum Mainnet, Base, TON, EAS, and related systems
Owner: MxM
Status: Phase 1, Casefile Foundation

---

## Phase 1: Casefile Foundation and Verification Setup

Timeline: In progress
Status: Active — Draft PR open

### Objectives

- Establish clear casefile structure
- Separate verified facts from correlations and hypotheses
- Define proof-of-ownership workflow
- Document identity verification methodology

### Deliverables

- MxM sole ownership statement
- Proof-of-ownership workflow guide
- SIMBASE provenance verification
- TON contract verification analysis
- Finalize casefile PR #1 for submission
- Published casefile document

### Evidence collected so far

- Verified: MxM sole attribution and control verified
- Correlated: SIMBASE provenance mechanics confirmed
- Correlated: CoinMarketCap wallet enrichment integrated
- Investigating: TON contract structure analyzed; state queries pending
- Hypothesis: EAS attestation ownership — proof pending

### Blockers

- PR #1 draft awaiting final review and integration

### Next step

Complete casefile PR review and merge. Move to Phase 2.

---

## Phase 2: Verification and Proof Collection

Timeline: Estimated 2026-10-07 to 2026-10-20
Status: Planned

### Objectives

- Execute proof-of-ownership workflow
- Query contract state across target addresses
- Validate signature ownership and control
- Correlate provenance across chains
- Verify all claimed attributes on-chain

### Deliverables

- Proof-of-ownership execution report
- TON contract state query results
- Ethereum/Base address correlation matrix
- EAS attestation verification
- Updated investigation findings
- Evidence summary document

### Key verification steps

1. TON contract state
   - Call get_n_k() to retrieve signer count and threshold
   - Call get_public_keys() to retrieve public key dictionary
   - Compare returned state with recorded data hash

2. Ethereum/Base address correlation
   - Query deployed contract addresses
   - Verify matching code hashes
   - Trace wallet funding paths
   - Confirm signature ownership

3. EAS attestations
   - Query EAS contract for attestations
   - Verify signer identity
   - Validate timestamp and chain provenance

4. Wallet ownership
   - Execute proof-of-ownership workflow
   - Document control chain
   - Cross-reference with identity claims

### Success criteria

- All claimed on-chain facts verified or rejected
- Evidence status updated with findings
- No unexplained discrepancies
- Proof-of-control chain clear

### Blockers and dependencies

- Requires Phase 1 casefile completion
- Requires contract state queries (read-only, no keys needed)
- May require external data for correlations

### Next step

Begin Phase 2 upon Phase 1 completion.

---

## Phase 3: Reporting and Closure

Timeline: Estimated 2026-10-21 to 2026-11-03
Status: Planned

### Objectives

- Produce verified findings brief
- Document conclusive proof or open questions
- Create final attribution statement
- Archive investigation record

### Deliverables

- Verified findings report
- Final attribution statement
- Evidence archive summary
- Investigation closure document

### Reporting format

Each finding will include:
- Claim
- Evidence collected
- Verification method
- Status (Verified, Open, or Blocked)
- Next action or closure note

### Success criteria

- All claims addressed with evidence or explanation
- Clear separation of verified fact from hypothesis
- Public record of investigation methodology
- Reproducible verification steps

---

## Weekly Status Format

Every update includes:
- What changed: New evidence, progress
- What is verified: Facts confirmed on-chain
- What is pending: Next verification steps
- What is blocked: Impediments and escalations
- What decision is needed: Questions for resolution

---

## Evidence Status Reference

| Status | Meaning | Action |
|--------|---------|--------|
| Verified | On-chain fact confirmed by direct proof or cryptographic validation | Close item or reference in findings |
| Correlated | Strong pattern match; naming, code, and funding paths align | Continue investigation toward proof |
| Investigating | Lead documented; proof pending or in progress | Execute next verification step |
| Hypothesis | Theory or claim without verification | Define proof test and add to work list |
| Blocked | Blocked awaiting external data, chain state, or decision | Note blocker and escalate |

---

Key contact and ownership
Investigation owner: MxM
Sole attribution: MxM (artist, author, owner)
Technical collaborator: Vesper (Leumas) — naming, curation, documentation only

---

Last updated: 2026-10-06
See also: README.md | CHANGELOG.md | PR #1
