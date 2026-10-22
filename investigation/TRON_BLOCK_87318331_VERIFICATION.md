# TRON Block Candidate — Verification Note

**Prepared:** 2026-10-21  
**Workstream:** SW-06 / TRON-TRX  
**Status:** Investigative lead; canonical block identity and transactions not yet verified.

## Candidate identifiers supplied during the investigation

- Candidate block ID: `0000000005345f3be4895b35cf28b3669d8f5b94547ca4f40a5af50a0fcce089`
- Claimed parent block ID: `0000000005345f3a4cbb12a6dfb8e51786c109f2f291a5d5a1d83487b0267cf6`
- Interpreting the leading 8-byte block-number field gives candidate height **87,318,331** and parent height **87,318,330**. These are consecutive heights, which is structurally consistent with a parent-child pair, but does not authenticate either full ID or prove the candidate's `parentHash` equals the supplied parent ID.

## User-reported explorer observation

The investigator reports that the candidate was initially displayed as **UNCONFIRMED**, that an explorer prompt indicated approximately **19 blocks were needed for confirmation**, and that the displayed confirmation depth later exceeded **200 blocks**. This is recorded as a user observation, not an independently reproduced explorer state. “19 blocks” is understood as confirmation depth required, not an account or validator count.

## Independent checks attempted

1. Exact-ID web searches did not return a matching canonical block record.
2. The TRONSCAN block page could be fetched only as generic single-page application content; the extracted response did not expose the requested block's fields or transaction list.
3. TRON's official GetBlockById documentation specifies a **POST** request to `/wallet/getblockbyid` with JSON body `{"value":"<block ID>"}`. The available fetch interface did not successfully submit that body, so the prior empty response is not evidence that the block is invalid.
4. A TRONSCAN search result displayed a site-summary latest height of **87,180,165**. If that summary represented the canonical head at the same observation time, height 87,318,331 would be 138,166 blocks ahead of it, conflicting with the reported >200 confirmations. The summary may be cached or stale; this discrepancy is therefore an **unresolved conflict**, not a final invalidation.

## Current assessment

- **Established by identifier arithmetic:** the two supplied IDs encode consecutive candidate heights, 87,318,331 and 87,318,330.
- **Reported but not independently reproduced:** explorer state moved from unconfirmed to >200 confirmations.
- **Not verified:** either full block ID against a canonical TRON node; the candidate block's actual `parentHash`; timestamp, producer, transaction count, transaction IDs, or confirmation status.
- **Not established:** any connection between this block and the Polygon target wallet or the wider SIMBASE OG case.

## Required verification sequence

1. Query an authoritative TRON FullNode or SolidityNode using a POST-capable client:
   - `POST /wallet/getblockbyid` with candidate ID.
   - `POST /wallet/getblockbyid` with parent ID.
   - `POST /wallet/getblockbynum` with `{"num":87318331}` and `{"num":87318330}`.
2. Compare returned block IDs and verify the candidate's header `parentHash` equals the supplied parent ID; verify parent height and ID independently.
3. Compare FullNode and SolidityNode results to distinguish head/confirmation state from solidified state; record observation timestamps and provider.
4. Extract transaction IDs only after canonical block identity is verified. Trace relevant transfers and counterparties, then test any relationship to SIMBASE OG against direct transaction evidence.
5. If the canonical height/head remains inconsistent with the reported confirmation depth, preserve both observations and investigate the explorer/network selection and capture timestamps before drawing a conclusion.

## Sources and method notes

- Official TRON GetBlockById documentation: https://developers.tron.network/reference/getblockbyid
- TRONSCAN candidate-height page attempted: https://tronscan.org/#/block/87318331/transactions
- The exact block IDs and confirmation progression above were supplied/reported by the investigator in conversation. They are not represented here as independently verified chain data.
