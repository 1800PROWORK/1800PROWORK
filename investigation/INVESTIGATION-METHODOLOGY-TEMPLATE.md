# Investigation Methodology Template
**Pattern:** Forensic Attribution & Evidentiary Analysis Framework  
**Derived from:** Blockchain/GitHub attribution investigation (commit b0956c7e)  
**Status:** Reusable template for multi-source attribution research  
**Date created:** 2026-08-26

---

## Overview

This methodology provides a structured approach to **attribution investigations** across domains (blockchain, code, identity, financial, etc.) by:

1. **Separating evidence sources** (on-chain vs. public-source vs. off-chain)
2. **Establishing clear evidentiary boundaries** (distinct, non-transitive propositions)
3. **Framing negative findings** epistemically (absence from source X ≠ absence in reality)
4. **Prioritizing research targets** (high signal-to-noise fingerprints)
5. **Documenting chain of custody** (full identifiers, timestamps, source URLs)
6. **Planning multi-phase verification** (rough → corroborated → verified)

---

## Phase 1: Investigation Scope & Framework

### 1.1 Define the Core Question
**Template:**
```
Primary objective: [Specific binary claim to resolve]
Scope: [What is IN scope? What is NOT in scope?]
Not primarily a [Domain X] investigation: 
  → [Domain X] is treated only as a correlation target
Falsifiability: What evidence would prove this false?
```

**Example (blockchain):**
> Determine whether apparently separate deployments can be tied to a common controlling entity through independently verifiable cryptographic evidence.

**Example (other domain):**
> Determine whether a code pattern/library can be linked to a specific author through commit history and distinctive implementation fingerprints.

---

### 1.2 Evidence Classification Framework
**Use consistent labels across all findings:**

| Classification | Meaning | Chain-of-Custody Requirement |
|---|---|---|
| **VERIFIED** | Independently reproduced from primary source data | Full identifier, method, timestamp, source URL |
| **CORROBORATED** | Supported by multiple independent records; not yet cryptographically conclusive | Cross-reference at least 2 sources |
| **REPORTED** | Supplied during investigation; awaiting independent verification | Attribute source; note verification date |
| **HYPOTHESIS** | Plausible investigative theory requiring testing | Explicit conditions for test; falsification criteria |
| **DISPROVED** | Contradicted by independently verified evidence | Evidence link + explanation |

---

### 1.3 Establish Evidentiary Boundaries
**Template: Create a propositions table that separates distinct claims**

| # | Proposition | Evidence Type | Status | Gap |
|---|---|---|---|---|
| 1 | [Claim A: Activity] | [source type] | [status] | [what would verify?] |
| 2 | [Claim B: Ownership] | [source type] | [status] | [what would verify?] |
| 3 | [Claim C: Relationship] | [source type] | [status] | [what would verify?] |
| 4 | [Claim D: Control] | [source type] | [status] | [what would verify?] |
| 5 | [Claim E: Real-world ID] | [source type] | [status] | [what would verify?] |

**Key principle:** A does not prove B, and B does not prove C. Each row is analytically distinct.

**Example (blockchain):**
1. Address X interacted with contract Y — **on-chain transaction record**
2. Address X was made owner of contract Z — **on-chain event log**
3. Contract Z is a proxy instance from the same factory — **structural/bytecode analysis**
4. Address X **specifically controls** proxy Z (not just one clone) — **instance-specific ownership event**
5. Address X identifies a real-world person/entity — **real-world registry or cryptographic proof**

---

## Phase 2: Search & Negative Finding Documentation

### 2.1 Define Search Strategy
**For each evidence source (GitHub, Etherscan, WHOIS, etc.):**

```
Source: [Platform/database name]
Search method: [API, text search, reverse lookup, bytecode analysis, etc.]
Search terms: [Exact queries used]
Scope: [Time period, geographic region, account type, etc.]
Exclusions: [What was NOT searched and why]
```

**Example:**
```
Source: GitHub
Search method: Code search API (lexical + regex)
Search terms: 
  - Direct address match: 0xf5279440e1da8fc1bf27eA7D64dB90373E2559C0
  - EIP-1167 fingerprint containing implementation reference
Search scope: All public repositories
Exclusions: Private GitHub accounts (not searchable); archived repos not re-indexed
```

---

### 2.2 Frame Negative Findings Correctly
**Template:**

```
## [Source Name] Conclusion

**Finding:** No direct [type of] attribution identified for [specific identifiers].

**This is a negative finding ONLY.**
- Interpretation: [Identifiers] do not appear in [Source] publicly accessible records.
- Non-interpretation: This does not prove [identifiers] do not exist in [Source] at all.
- Reasons for absence:
  - Code is not public
  - Code is under organization name, not individual name
  - Code is in private forks or archived repositories
  - [Source] has not indexed the code
  - [Source] has indexed but result is not text-searchable

**Causation vs. Correlation:**
Negative GitHub findings are NOT transitive to:
  - Non-public code sources
  - Real-world identity
  - On-chain control (if researching blockchain)
```

---

### 2.3 Incidental Results & Exclusion Template
**If a search returns one-off hits that don't satisfy attribution:**

```
## Incidental Result — [Identifier/Query]

**Finding:** [Repository/Account/Record] appeared in search results.

**Artifact analysis:**
- Repository/account content summary: [What is it?]
- Comparison to target:
  - Code structure: [Same/different/unclear]
  - ABI/interface match: [Yes/no/partial]
  - Deployment pattern: [Same/different]
  - Bytecode signature: [Match/no match]
  - Temporal correlation: [Related/unrelated]
  - Developer patterns: [Distinctive/common]
  
**Exclusion reasoning:**
[Why is this result insufficient to attribute the target?]
  - Does not share critical fingerprints
  - Deployment authority unclear
  - Code pattern is boilerplate/standard
  - [Other]

**Reversion protocol:**
- Result archived for 6-month re-review (code updates may occur)
- If repository is updated, re-run artifact analysis
```

---

## Phase 3: Fingerprint Prioritization

### 3.1 Create Detectability Matrix
**Rank research targets by likelihood of discovery vs. uniqueness:**

| Fingerprint Type | Detectability | Uniqueness | Priority | Rationale |
|---|---|---|---|---|
| [Type 1] | High | High | **CRITICAL** | Both discoverable and distinctive |
| [Type 2] | High | Medium | **HIGH** | Easy to find; some false positives |
| [Type 3] | Medium | High | **MEDIUM** | Distinctive but harder to search |
| [Type 4] | Medium | Low | **LOW** | Effort-to-signal ratio unfavorable |
| [Type 5] | Low | High | **RESERVE** | Only pursue if higher priorities exhaust |

**Example (code/blockchain):**

| Fingerprint | Detectability | Uniqueness | Priority | Rationale |
|---|---|---|---|---|
| Distinctive revert strings | High | Medium | **CRITICAL** | Hardcoded, rarely obfuscated, text-searchable |
| Event definitions | High | High | **CRITICAL** | Signature mismatch reveals different contracts immediately |
| CREATE2 salt patterns | Medium | High | **HIGH** | May appear in comments; reveals intent |
| Unusual constants | Medium | Low | **MEDIUM** | Could appear in unrelated code |
| Storage-slot patterns | Low | High | **LOW** | Requires bytecode analysis; slow |
| Standard EIP-1167 code | High | Low | **LOW** | Boilerplate; too common to be distinctive |

---

## Phase 4: Multi-Phase Verification Sequence

### 4.1 Phase Structure Template
```
### Phase [N] — [Objective]

**Timeline:** [Estimated duration]
**Prerequisite:** [What must be complete first?]
**Entry criteria:** [When do we start this?]

**Tasks:**
- [ ] [Specific, verifiable action]
- [ ] [Specific, verifiable action]
- [ ] [Record results in evidence format]

**Exit criteria (success):**
  - [Measurable finding] OR
  - [Measurable finding]

**Exit criteria (inconclusive):**
  - [What indicates we should move to next phase despite gaps?]

**Failure mode:**
  - If [condition], then [pivot to Phase X / revise hypothesis / close investigation]
```

**Example: Blockchain investigation Phase 2**

```
### Phase 2 — Source-Level Fingerprinting

**Timeline:** 7–14 days
**Prerequisite:** Phase 1 GitHub address search complete (negative finding)

**Tasks:**
- [ ] Retrieve implementation contract verified source from Etherscan
- [ ] Extract 5 most distinctive revert strings and event definitions
- [ ] GitHub search for each revert string + event definition pair
- [ ] Document any repositories found
- [ ] Cross-reference against SIMBASE and known proxy factories
- [ ] Record source URLs and search methodology in evidence log

**Exit criteria (success):**
  - Implementation contract source found on GitHub with matching fingerprints

**Exit criteria (inconclusive):**
  - Multiple fingerprint searches yield no results
  - Proceed to Phase 3 (reverse bytecode analysis)

**Failure mode:**
  - If implementation contract is not verified on Etherscan, 
    → use bytecode decompiler (Etherscan, Tenderly) 
    → extract revert strings from bytecode
    → continue fingerprint search
```

---

## Phase 5: Cross-Reference & Integration

### 5.1 Relate to Primary Framework
**Template:**

```
## Cross-Reference to [Primary Investigation Document]

Your primary framework (`[FILENAME]`) establishes:
- Evidence classification: [VERIFIED / CORROBORATED / REPORTED / HYPOTHESIS]
- Chain-of-custody: [Required fields]
- Verification phases: [Phase descriptions]

**Observation:** This [secondary analysis] is CONSISTENT with primary standards but uses 
SIMPLER LANGUAGE / DIFFERENT LABELS.

**Recommendation:** Adopt cross-labeling:
```
- Claim X — **CORROBORATED** [multiple sources verified, but causality TBD]
```

This ties documents together and signals that findings feed into the larger pipeline.
```

---

## Phase 6: Risk Assessment & Mitigation

### 6.1 False Positive / False Negative Template
```
## Risk Assessment

### Risk 1: False Positive (we exclude valid evidence)

**Scenario:** [Incidental result / excluded fingerprint] was prematurely dismissed

**Consequence:** 
- Negative finding becomes incorrect
- Investigation stalls
- Real attribution remains undiscovered

**Mitigation:**
- Store excluded result URL in "Exclusion Record" appendix
- Plan 6-month re-review (code is updated, contexts change)
- Before final closure, retrieve git history of excluded results

### Risk 2: False Negative (we miss valid sources)

**Scenario:** [Source X] contains relevant evidence but was not searched

**Consequence:**
- Attribution incomplete or incorrect
- Investigation appears conclusive but has blind spots

**Mitigation:**
- Enumerate all potential evidence sources upfront
- Explicitly list which were searched and why
- For sources NOT searched, document why and flag for future
```

---

## Phase 7: Documentation & Output

### 7.1 Investigation Record Structure
```
# [Domain] Investigation Update — [Date]

## Scope
[Concise objective; evidence source distinctions]

## Repository under investigation / Primary source
[Name, URL, version control branch if applicable]

## Search methodology
[For each evidence source: search method, terms, scope, exclusions]

## Exact identifiers/queries searched
[Complete list with no abbreviations]

## Findings by source
[One section per evidence source]
  - Positive findings
  - Negative findings (framed epistemically)
  - Incidental results (with artifact analysis)

## Evidentiary boundary
[Propositions table: distinct, non-transitive claims]

## [Domain]-specific conclusion
[Negative finding framed correctly; no false transpositions]

## Next research targets
[Prioritized fingerprints or sources from Phase 3]

## Investigation history context
[Recent commits/actions in this investigation line]

## Status
[Current state; readiness for next phase; any blockers]

## Document Control
[Version, author, date, related documents]
```

---

## Phase 8: Independent Analysis & Peer Review

### 8.1 Peer Review Template
```
# Independent Research Analysis — [Investigation Name]
**Date:** [Date]  
**Scope:** Critical methodological review  
**Repository context:** [Link to primary investigation]

## Executive Assessment
[Concise summary of what the primary investigation found well + what remains unclear]

## Methodological Strengths
[3–5 areas where the investigation's approach is sound or exemplary]

## Methodological Gaps & Recommendations
[Numbered gaps with specific, actionable recommendations]

## Evidentiary Framework Analysis
[Does the propositions table avoid conflating distinct claims?]

## Cross-Reference to Casefile / Primary Framework
[Alignment with established evidence standards]

## Risk Assessment: False Exclusions
[What if the dismissed evidence was actually valid?]

## Next Steps: Suggested Sequence
- Immediate (this session)
- Short-term (7 days)
- Medium-term (if short-term yields results)

## Conclusion: Investigation State
[Summary table of what's established, what's pending, confidence levels]

## Document Control
[Version, author, scope, relation to primary document]
```

---

## Application to Other Domains

### Example 1: Software Attribution
```
Primary question: Is library X derived from or attributed to project Y?

Propositions:
1. Code in library X matches code in project Y repository — textual comparison
2. Git commits show X forked from Y — version control history
3. Author of X credited Y in documentation — social attribution
4. Same developer controlled both X and Y — cryptographic proof (signed commits)
5. Developer is a real-world person with known identity — out-of-band verification
```

### Example 2: Financial Attribution
```
Primary question: Did funds in account X originate from source Y?

Propositions:
1. Transaction hash shows transfer from Y to X — ledger record
2. Timing aligns with Y's known distribution events — temporal correlation
3. Same wallet address controls both X and Y — address linkage
4. Address belongs to the same entity across multiple transactions — behavioral pattern
5. Entity is identifiable in real-world records — KYC/AML data
```

### Example 3: Content Attribution
```
Primary question: Does written content Z come from author W?

Propositions:
1. Content Z appears in W's published works — direct record
2. Stylometric analysis shows consistent authorship — statistical fingerprint
3. Metadata/timestamps align with W's known activity — temporal correlation
4. W has publicly claimed authorship — self-attribution
5. Real-world person W is verifiable — identity verification
```

---

## Reusable Checklists

### Pre-Investigation Checklist
- [ ] Primary objective defined (binary question)
- [ ] Scope explicitly bounded (in/out)
- [ ] Evidence classification framework adopted
- [ ] Evidentiary boundary propositions drafted (5+ distinct claims)
- [ ] Evidence sources enumerated (what WILL be searched)
- [ ] Search strategy documented for each source
- [ ] Chain-of-custody requirements established (full identifiers, URLs, timestamps)
- [ ] Phases outlined with entry/exit criteria
- [ ] Falsifiability criteria stated (what would disprove each proposition)

### Mid-Investigation Checkpoint
- [ ] Negative findings framed epistemically (not transposed to absence in reality)
- [ ] Incidental results documented with artifact analysis (not dismissed without reasoning)
- [ ] Fingerprint prioritization complete (detectability matrix)
- [ ] Evidence log kept (classification, source, verification date)
- [ ] No propositions conflated (each remains analytically separate)
- [ ] Causality assumptions made explicit (A → B not assumed without evidence)

### Pre-Closure Checklist
- [ ] All Phase entry/exit criteria reviewed
- [ ] Cross-reference to primary framework complete
- [ ] Risk assessment & mitigation documented
- [ ] False positive / false negative scenarios addressed
- [ ] Next steps sequence provided (immediate, short-term, medium-term)
- [ ] Independent peer review performed
- [ ] All files have document control metadata
- [ ] Investigation state summary accurate and up-to-date

---

## Related Documents

- `[Primary Investigation Record]` — The specific investigation this methodology was derived from
- `[Casefile / Framework Document]` — Overarching evidence standards and verification sequence
- `[Peer Review / Analysis]` — Critical evaluation of investigation methodology
- `[Evidence Log]` — Complete chain-of-custody for all findings

---

## Document Control

- **Version:** 1.0
- **Date created:** 2026-08-26
- **Derived from:** b0956c7e (GitHub Attribution Investigation Update)
- **Status:** Template / Reusable Framework
- **Use case:** Multi-domain attribution & forensic investigations
- **Recommended adoption:** 
  - Blockchain/crypto attribution
  - Software code attribution & plagiarism detection
  - Financial flow tracing
  - Content/authorship verification
  - Identity attribution & linkage
