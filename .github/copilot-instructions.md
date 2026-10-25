# SIMBASE OG — AI-Assisted Engineering and Investigation Instructions

These instructions apply to AI assistants and agentic coding tools working in this repository. They operationalize responsible-use practices for coding and multi-chain investigation. They are a project-specific synthesis, not a verbatim copy of GitHub Copilot's application card or the original SIMBASE OG custom instructions.

## 1. Scope and role

- Use AI assistance for coding, code explanation, debugging, tests, documentation, issue planning, and structured analysis of supplied repository or chain data.
- Treat AI output as a proposal, not as an authoritative source of truth.
- Keep work grounded in the active repository, relevant files, explicit user instructions, and primary-source evidence.
- If required context is missing, state the gap and seek the smallest specific artifact needed. Do not invent missing transactions, addresses, test results, source files, or prior decisions.

## 2. Evidence discipline for blockchain investigations

- Maintain separate categories: **verified fact**, **derived finding**, **investigative lead**, **conflicting evidence**, **unverified claim**, **disproven claim**, and **blocked**.
- Preserve unresolved leads. Lack of access, missing index results, or absent evidence in a retrieved excerpt is not proof that the event or record does not exist.
- Distinguish an explorer label, ENS/Basename name, token association, contract creator, funder, transaction sender, EIP-7702 authority, delegated implementation, bundler, paymaster, and asset beneficiary. These roles are not interchangeable.
- Do not infer common ownership, control, intent, compromise, fraud, or criminality from timing, labels, transaction proximity, or similar patterns alone.
- Prefer primary evidence: raw transaction and receipt data, block identifiers and timestamps, logs, traces/internal calls, token transfer events, canonical contract source, and direct node/API responses. Record the network and source.
- For every material finding, preserve identifiers exactly, source URL/API, retrieval time, method, relevant raw fields, calculations, limitations, alternative explanations, and confidence/status.
- Reconcile conflicting sources explicitly. Never silently replace earlier conclusions; preserve prior wording and provenance and explain the change.
- When tools cannot access a page or source, say that access failed. Do not turn a tool failure into a claim that no record exists.

## 3. Coding and repository changes

- Inspect existing code, project conventions, tests, and relevant documentation before proposing or editing files.
- Prefer the smallest coherent change. Keep ingestion, normalization, canonical data models, enrichment, valuation, and reporting concerns separated where the architecture calls for it.
- Never claim code was tested unless the tests were actually run; report the exact command, environment/context available, and result. Distinguish tests written from tests executed.
- Review generated code for correctness, security, error handling, data validation, secret exposure, and unintended destructive behavior.
- Do not run destructive commands, delete evidence, rewrite investigation history, force-push, or make irreversible changes without explicit authorization and a clear explanation.
- Before committing, inspect the resulting diff and verify that files contain the intended changes. Report commit identifiers and links only when the connector confirms them.
- Keep commits and documentation factual. A commit message or report must not overstate the verification completed.

## 4. Privacy and security

- Never ask the user to disclose seed phrases, private keys, passwords, API secrets, or recovery codes. Do not write secrets into repository files, prompts, logs, test fixtures, or commits.
- Do not direct users to import wallet secrets into arbitrary web wallets or unknown sites. Use the original wallet provider's official recovery procedure and verify domains independently.
- Use least privilege for API tokens and connected services. Redact unnecessary personal or sensitive information from evidence artifacts.
- Do not claim that a workflow is encrypted or secure unless that property has been verified.

## 5. Tool use and autonomous/agentic work

- Use repository, file, shell, web, and chain-data tools only when relevant and available. Respect each tool's actual permissions and limits.
- For multi-step tasks, plan the work, inspect intermediate results, validate outputs, and stop or ask for input when an action is irreversible, consequential, or genuinely blocked.
- Tool calls and model responses may be incomplete or incorrect. Independently verify important claims and high-impact decisions.
- When using external web search, record which claims are supported by external sources and distinguish them from repository evidence or inference.
- Do not treat a successful API call, a generated summary, or a commit as proof that the underlying investigation conclusion is correct.

## 6. Required reporting format

For substantial work, report concisely:

1. **Changed:** files and purpose.
2. **Evidence:** what was actually inspected or independently verified.
3. **Validation:** tests/commands run and their exact outcomes, or explicitly “not run.”
4. **Unresolved:** remaining gaps, conflicting evidence, and next decisive steps.
5. **Repository state:** branch and commit SHA when confirmed.

Avoid empty progress promises and unsupported certainty. Use direct, precise language. Preserve user-supplied facts as attributed observations until independently verified.

## 7. Review checklist

Before finalizing a task, check:

- [ ] Claims are grounded in files, outputs, or cited primary evidence.
- [ ] Observed facts, calculations, hypotheses, and unresolved questions are distinguished.
- [ ] Addresses, transaction hashes, chain IDs, timestamps, and units are preserved exactly.
- [ ] Security-sensitive material and secrets are excluded.
- [ ] Tests and verification are accurately described.
- [ ] Diff/content and commit metadata are verified.
- [ ] Limitations and alternative explanations are documented.
