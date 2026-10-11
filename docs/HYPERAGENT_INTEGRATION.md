# HyperAgent Integration Proposal

**Status:** Proposal only — not installed or executed  
**Target repository:** `1800PROWORK/1800PROWORK`  
**Purpose:** Use HyperAgent as an optional, sandboxed orchestration layer for repeatable evidence collection and report generation.

## Decision summary

Evaluate [`hyperlight-dev/hyperagent`](https://github.com/hyperlight-dev/hyperagent) as a separate research runner, not as a replacement for the casefile or the existing verification scripts. HyperAgent is pre-release software and its upstream documentation explicitly warns against production use. It requires Node.js 22+ and hardware virtualization (Linux/KVM, Windows/WHP, Azure Linux/MSHV, or supported WSL2); it currently does not run natively on macOS.

## Proposed architecture

1. **Evidence inputs** — explicit target addresses, chain IDs, transaction hashes, and case IDs supplied from a reviewed case manifest.
2. **Read-only collection** — approved explorer/API endpoints and approved MCP tools only. No wallet signing, transaction submission, or private-key access.
3. **Deterministic verification** — ordinary scripts validate transaction hashes, block timestamps, bytecode hashes, ABI encodings, and exact funding paths. AI summaries cannot change verification status by themselves.
4. **Evidence ledger** — write structured JSON/CSV plus a Markdown summary containing source URL, retrieval time (UTC), chain ID, full identifiers, method, raw-response hash, confidence class, and alternative explanations.
5. **Human review** — proposed findings remain `REPORTED`, `HYPOTHESIS`, or `CORRELATED` until a deterministic check passes and a reviewer promotes them.

## Suggested repository layout

```text
INVESTIGATION/
  cases/
    simbase/
      targets.json
      evidence-ledger.jsonl
      reports/
  schemas/
    evidence-record.schema.json
scripts/
  verify_evidence.py
  collect_chain_data.py
reports/
  generated/        # generated output; never the source of truth
```

Do not move or delete existing evidence during the initial integration. Preserve the current uppercase/lowercase directory history until a separate migration is reviewed.

## Security boundaries

- Treat HyperAgent as an optional local tool; this repository does not currently prove that HyperAgent is installed or connected.
- Do not pass API keys, GitHub tokens, wallet secrets, seed phrases, or private keys into prompts, casefiles, generated handlers, or reports.
- Keep all blockchain collection read-only. Disable transaction-writing and signing capabilities.
- Allowlist only the required API domains; use read-only API credentials with minimal scope.
- Review every MCP server before enabling it. Upstream documentation states MCP servers execute outside the Hyperlight sandbox, so the VM boundary does not sandbox those external processes.
- Do not use `--auto-approve` during initial evaluation; review plugin/MCP permission requests individually.
- Store raw evidence and generated summaries separately. Record provenance so summaries can be reproduced from raw responses.
- Run in an isolated container/VM and review upstream `SECURITY.md` before handling sensitive material.

## Initial proof of concept

1. Install HyperAgent in a disposable supported environment following upstream instructions.
2. Start with a public, read-only GitHub API query against this repository and generate a local Markdown report.
3. Add one public EVM address query using an allowlisted explorer API.
4. Compare generated output against a deterministic script and manually inspect all source identifiers.
5. Only after this passes, consider wiring the runner into scheduled jobs or CI. Do not add automatic merges or automatic evidence-status promotion.

## Acceptance criteria

- No write-capable blockchain actions are exposed.
- No secrets appear in prompts, logs, transcripts, artifacts, or Git history.
- Every factual claim links to a raw source record and includes retrieval time and chain/network.
- Re-running the same input produces equivalent normalized evidence, excluding expected live-state changes.
- Any AI-generated relationship is marked as a lead until independently reproduced.
- Tests cover malformed API responses, pagination, rate limits, duplicate events, and chain-ID mismatches.

## Upstream references

- HyperAgent source and README: https://github.com/hyperlight-dev/hyperagent
- Development setup: https://github.com/hyperlight-dev/hyperagent/blob/main/docs/DEVELOPMENT.md
- HyperAgent project page and platform limitations: https://hyperlight.org/resources/projects/hyperagent/

**No software was installed and no live blockchain query was executed by adding this proposal.**