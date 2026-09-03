# Independent Research Analysis — Blockchain Attribution Investigation
**Date:** 2026-08-25  
**Scope:** Critical methodological review of GitHub attribution pass and evidentiary boundaries  
**Repository context:** `1800PROWORK/1800PROWORK` investigation files

---

## Executive Summary
- Finding: The GitHub attribution pass returned no high-confidence public repository mapping to the on-chain implementation (implementation: `0xea9eeafdada27d502115afc591b0a6eb5d14351e`).
- Confidence: High for the exact-address and EIP-1167 fingerprint searches that were run; however, an incidental GitHub hit was dismissed without an artifact-level comparison. That omission prevents final closure of the exclusion.
- Immediate next action: Perform the implementation-source fingerprint extraction on Etherscan, export ABI/selectors and revert strings, then run targeted GitHub searches for those fingerprints (owner: <name>, due: <date>). See "Next Steps" and "Reproducibility Appendix".

---

## Executive Assessment

Your investigation establishes a **defensible negative GitHub finding** but operates in tension with three unresolved interpretive questions:

1. **Absence vs. Non-Public:** Your GitHub search was exhaustive for exact-match addresses and the EIP-1167 fingerprint. But GitHub may host related code under organization names, obfuscated repositories, forks, or private/archived repositories not returned by a public search. See Reproducibility Appendix for exact queries and the search timeframe.

2. **Factory Chain Clarity:** The documented on-chain relationships (factory interaction → ownership transfer → proxy instance) establish **event-level evidence** but leave unresolved whether the factory caller was the constructor deployer or a subsequent owner (see Gap 1 and the recommended verification steps below).

3. **Incidental Result Exclusion:** The single GitHub hit (`0x33D82C144717FCd83965ca26fAd4D4256E6052DD`) was dismissed on the grounds of insufficient nexus. The report did not include an artifact-level comparison (ABI selectors, bytecode hash, deployment pattern, or source comments) that justifies exclusion. See the new "Incidental Result Artifact Analysis" subsection and the Exclusion Record appendix.

**Without artifact-level comparison,** the exclusion remains logical but incomplete.

---

## Methodological Strengths

### 1. **Clear Evidentiary Boundaries**
Your Proposition Framework (lines 1–5 in original) is exemplary:
- Distinguishes activity from ownership
- Separates on-chain from real-world attribution
- Avoids treating proof-of-interaction as proof-of-control

**Assessment:** This structure would satisfy forensic or legal discovery standards. It forces explicit acknowledgment of each inference's evidential gap.

### 2. **Negative Finding Properly Framed**
The statement "This is a negative GitHub finding only" is **epistemically sound**:
- You did not conclude "the code does not exist"
- You stated "the code is not publicly attributable via GitHub search"
- This avoids the common fallacy of *absence of evidence → evidence of absence*

**Strength:** Any investigator reviewing this will understand exactly what was searched and what remains unknown.

### 3. **On-Chain Evidence Chain**
The deployment structure is clearly documented:
```
Caller → Factory → Proxy Instance → Implementation
```

This follows the actual EIP-1167 pattern. Your preservation of the implementation reference address (`0xea9eeafdada27d502115afc591b0a6eb5d14351e`) is critical — it's the most stable identifier across proxy instances and should be prioritized for source-level fingerprinting.

---

## Methodological Gaps & Recommendations

### Gap 1: Factory Initiation vs. Post-Deployment Ownership Transfer

**What you have:**
- Transaction record of `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` calling factory
- `OwnershipTransferred` events naming `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` as new owner

**What remains unclear:**
- Was `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` the **factory constructor deployer** (high attribution confidence)?
- Or did `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` **acquire ownership post-deployment** (lower attribution confidence)?

**Recommendation:**
- Query the factory contract's deployment transaction and constructor initialization (deployer address and tx hash)
- Compare the factory deployer address against `0xc2B5f79a5768893b8087667B391C1381c502Ab5c`
- If different, add a distinct "Factory Deployment Authority" proposition to the investigation

**Impact on investigation:** This clarifies whether `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` is an **originator** or a **subsequent acquirer** of control — materially different for real-world attribution and investigative next steps.

---

### Gap 2: Incidental Result Assessment Incomplete

**Current finding:**
> `0x33D82C144717FCd83965ca26fAd4D4256E6052DD` produced an incidental result. **It is not sufficient** to attribute...

**Missing detail:**
You did not report what made the exclusion definitive. Was the repository:
- A token distribution script (unrelated)?
- A standard OpenZeppelin proxy implementation (boilerplate)?
- A completely different contract family?
- Or did you not examine the repository contents?

**Recommendation:**
Add the subsection below: **"Incidental Result Artifact Analysis"** and populate it for each dismissed repository. This converts an assertion into reproducible analysis.

```text
Incidental Result Artifact Analysis
Repository: <full repository permalink>
Inspected by: <name>  Date: <YYYY-MM-DD>  Time (UTC): <hh:mm>

1) Repo summary
   - Repo name: <owner/repo>
   - Description: <first-line description from repo>
   - Last commit: <commit hash, author, date>
   - Public/Private: <public|private>

2) Files examined (permalink + reason)
   - <path/file.sol> — <permalink#Lx-Ly> — contains proxy/factory code?
   - <path/README.md> — <permalink#Lx-Ly> — developer comments?

3) ABI / function selector comparison
   - Etherscan ABI (repo claim): <link>
   - ABI selectors present in repo: [list of selectors, e.g., 0x18160ddd owner()]
   - Match status: [Exact / Partial / None]
   - Notes: <explain any partial matches or differences>

4) Bytecode/runtime comparison
   - On-chain runtime bytecode keccak256: <0x...> (from RPC or etherscan)
   - Local/compiled runtime bytecode keccak256: <0x...> (if repo includes compiled artifacts or verified source)
   - Discrepancy summary: <same/different; explain offsets/comments/immutable args>

5) Deployment pattern / factory usage
   - Evidence the repo uses EIP-1167 or clones? (Yes/No)
   - CREATE/CREATE2 patterns found? (Yes/No — include code lines)
   - Ownership flow present in code? (constructor, OwnershipTransferred event, setter functions)

6) Conclusion & rationale for exclusion
   - Final judgement: [Excluded — reason short]
   - Primary reason(s): [boilerplate, token distribution, different contract family, mismatch on selectors/bytecode]
   - Confidence: [High/Medium/Low]
   - Recommendation: [e.g., re-check in N months, keep archived copy]

7) Archive/attachment
   - Snapshot permalink (commit used for analysis): <commit permalink>
   - If repo later changes, store a copy of relevant files in the investigation folder.
```

---

### Gap 3: Implementation Reference May Be the Strongest Signal

**Observation:**
The implementation address `0xea9eeafdada27d502115afc591b0a6eb5d14351e` is referenced by multiple proxy instances (if that is indeed the case). This makes it the **most stable fingerprint** for code attribution.

**Why this matters:**
- Multiple proxies delegate to the same implementation
- Implementation contract should have public code (Etherscan, Tenderly)
- Implementation's constructor and fallback logic directly correspond to GitHub source

**Recommendation:**
Prioritize source-level fingerprinting of the **implementation contract's verified source**. This is more valuable than searching for proxy instances because:
1. Implementation is deployed once, referenced many times
2. Verified source on Etherscan is directly comparable to GitHub
3. Constructor logic typically reveals developer patterns (compiler version, libraries, naming conventions)

---

### Gap 4: Source-Level Fingerprints Need Prioritization

Your "Next GitHub research targets" list (10 items) is solid but lacks **specificity**. Example prioritization:

| **Fingerprint** | **Detectability** | **Uniqueness** | **Priority** |
|---|---|---|---|
| Distinctive revert strings | High | Medium | **HIGH** — Revert messages are hardcoded, rarely obfuscated |
| Event definitions | High | High | **HIGH** — Sig mismatch immediately reveals different contracts |
| CREATE2 salt derivation | Medium | High | **MEDIUM** — May be in comments or variable names |
| Unusual constants | Medium | Low | **MEDIUM** — Could appear in unrelated contracts |
| Storage-slot patterns | Low | High | **LOW** — Requires bytecode analysis, not text search |
| EIP-1167 clone code | High | Low | **LOW** — Standard implementation, unlikely to be distinctive |

**Recommendation:**
- Start with **revert strings** and **event definitions** (highest signal-to-noise ratio)
- Move to **distinctive constants** (name-collisions still possible but manageable)
- Reserve **storage patterns** for bytecode analysis if text search exhausted

---

## Evidentiary Framework Analysis

Your five propositions correctly separate claims, but there's an implicit assumption worth stating explicitly:

**Proposition 1 & 2 assume causality:**
> `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` **interacted with** the factory **→ became owner of clone**

This is not necessarily true. Possible scenarios:
- A calls factory in txn A
- Factory deploys proxy and assigns ownership to B (different address)
- Later, B transfers ownership to A in txn B

Your current frame would capture both transactions but might conflate timing. Add **explicit transaction timestamps** to distinguish cause from effect.

---

## Cross-Reference to Casefile

Your primary casefile (`BLOCKCHAIN_EAS_IDENTITY_CASEFILE.md`) establishes:
- Evidence classification framework (VERIFIED / CORROBORATED / REPORTED / HYPOTHESIS)
- Chain-of-custody requirements (full addresses, transaction hashes, etc.)
- Verification sequence (5 phases)

**Observation:** The GitHub Attribution Update is **consistent** with these standards but uses **simpler language** ("on-chain evidence" vs. casefile's "VERIFIED"). 

**Recommendation:** Consider cross-labeling:
```
2. Ownership-event evidence — **CORROBORATED**
   (Multiple on-chain events, timestamps verified, 
    but causality with Proposition 1 not yet determined)
```

This ties the two documents together and signals that GitHub findings feed into the larger verification pipeline.

---

## Risk Assessment: False Exclusions

**Risk: The incidental result was prematurely dismissed**

If the repository you excluded actually contained:
- The exact implementation contract source
- Historical commits showing factory pattern development
- Developer comments or commit messages referencing the addresses

...then your negative GitHub finding would be **incorrect**, not just incomplete.

**Mitigation:**
- Store the name/URL of the excluded repository in a "Exclusion Record" appendix
- Plan a 6-month re-review of dismissed results (GitHub repos are sometimes updated, made public, or archived)
- If possible, retrieve the repository's git history and search for changes to proxy/factory logic

---

## Next Steps: Suggested Sequence

### Immediate (within investigation session)
1. **Clarify factory deployer** — Distinguish constructor deployer from post-deployment owner
2. **Document incidental result** — Add artifact analysis of the excluded repository
3. **Prioritize fingerprints** — Order GitHub research targets by detectability

### Short-term (next 7 days)
4. Query implementation contract (`0xea9eeafdada27d502115afc591b0a6eb5d14351e`) on Etherscan
   - Retrieve verified source (if available)
   - Extract revert strings, event definitions, constructor logic
5. GitHub search for these distinctive elements
6. Cross-reference against SIMBASE and other known proxy factories

### Medium-term (if short-term yields results)
7. Reverse-engineer the factory's CREATE2 salt to infer deployment intent
8. Correlate temporal patterns with SIMBASE activity or EAS schema changes
9. Attempt signature verification or challenge-response from the address (if appropriate)

---

## Reproducibility Appendix (required additions)
- Exact GitHub search queries used (copy/paste) and the UTC date/time each search was run
- GitHub account used for searches (if authenticated filters applied)
- Any language/organization/path filters (e.g., repo:owner/repo path:/contracts/)
- Etherscan/Tenderly permalinks to implementation and factory contracts
- Runtime bytecode keccak256 hashes and ABI files saved into the investigation folder
- Tools and commands used (examples below)

Suggested reproducible commands / comparison steps
- Retrieve verified source & ABI (Etherscan API):
  https://api.etherscan.io/api?module=contract&action=getsourcecode&address=<ADDRESS>&apikey=<YOUR_KEY>
- Get runtime bytecode (using an RPC or Foundry cast):
  cast code <ADDRESS> --rpc-url <RPC_URL>
- Hash runtime bytecode (keccak256) locally (example with node/ethers):
  const { keccak256 } = require('ethers/lib/utils'); keccak256(runtimeBytecode)
- Compare function selectors (quick Node snippet):
  ethers.utils.id("transfer(address,uint256)").slice(0,10)
- GitHub code search patterns (examples):
  - content:"revert \"" OR content:"revert("  (revert strings)
  - content:"event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)"
  - content:"Clones.sol" OR content:"EIP-1167" OR content:"minimal proxy"
  - content:"0xea9eeafdada27d502115afc591b0a6eb5d14351e" (implementation literal)

---

## Exclusion Record (template)
For every excluded repository, add a record here with the answers from the Incidental Result Artifact Analysis. This appendix should at minimum contain:
- Repository permalink
- Date examined, examiner name
- Short reason for exclusion and confidence level
- Snapshot permalink (commit)

(Example row — populate as you evaluate exclusions)
- https://github.com/<owner>/<repo>  |  2026-08-25  |  <examiner>  | Excluded — standard OpenZeppelin proxy (boilerplate); ABI selectors do not match; Confidence: High; Snapshot: <commit permalink>

---

## Conclusion: Investigation State

| Aspect | Status | Confidence |
|---|---|---|
| **GitHub attribution present** | NEGATIVE | **High** — Exhaustive address and fingerprint search |
| **GitHub attribution absent** | CONFIRMED | **High** — But "absent from GitHub" ≠ "absent from reality" |
| **On-chain caller → owner chain** | DOCUMENTED | **High** — Events logged; causality TBD |
| **Proxy ↔ Implementation link** | DOCUMENTED | **High** — Implementation address preserved |
| **Real-world entity identity** | UNKNOWN | **N/A** |

**Overall investigation readiness for Phase 2:** Ready. The GitHub attribution pass is complete and well-documented. Proceed to source-level fingerprinting.

---

## Document Control

- **Author:** Independent analysis (review by 1800PROWORK)
- **Date:** 2026-08-25
- **Status:** Critical Review
- **Scope:** Methodological evaluation of GitHub-Attribution-Update-2026-08-25.md
- **Related:** BLOCKCHAIN_EAS_IDENTITY_CASEFILE.md (primary investigation framework)
