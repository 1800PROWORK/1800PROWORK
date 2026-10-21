# Polygon Counterparty Addendum — 0x5E1c

**Prepared:** 2026-10-21  
**Repository case target:** `0x5E1cf44F3E0314E9F28bf7140166A4F113A9D6DA`  
**Status:** Derived transaction finding; ownership/control unresolved.

## Finding 8 — Near-exact pass-through funding chain (2024-11-26)

The transaction records show a tightly timed sequence:

1. At **2024-11-26 01:10:11 UTC**, `0x44c7e46a3e3AF17A1b2002893B46Fc6481a5cFaF` transferred **0.35364248 POL** to intermediary `0xf2B1ceA4e5AaAbDD1799ec04D74d23F3FFEDB17D`.  
   Transaction: https://polygonscan.com/tx/0x40bf8901ea139adcf77d6669c4a637e353bfd4b161e6c3c6242ef79f285ac5a6

2. At **2024-11-26 01:10:31 UTC**, 20 seconds later, `0xf2B1...` transferred **0.352851862443908 POL** to target `0x5E1c...`.  
   Transaction: https://polygonscan.com/tx/0x7377127e43d2ce6eeffea2ff26b85ce2ce82730a9de1c8eb79f2549ea439f2a4

3. The recorded transaction fee for the outbound transfer is **0.000790617556092 POL**.

### Reconciliation

`0.353642480000000 - 0.352851862443908 - 0.000790617556092 = 0 POL`

The upstream amount is exactly reconciled by the downstream transfer plus its recorded fee. The sequence is consistent with a just-in-time pass-through funding event, with no residual POL from that input after the outbound transfer and fee.

### Evidentiary assessment

- **Observed facts:** the two transfers, their amounts, their transaction timestamps, and the stated fee are recorded in the cited PolygonScan transactions.
- **Derived finding:** the timing and exact arithmetic support a near-exact pass-through interpretation.
- **Not established:** common ownership, shared control, the identity of any controller, or an illicit purpose. A wallet can relay funds for many reasons, including operational funding, a service, or automated activity.
- **Limit:** this is a specific transaction-level trace, not a complete reconstruction of either address's funding history.

### Next tests

1. Inspect the upstream sender `0x44c7...` for other transfers to `0xf2B1...` and other known graph nodes.
2. Repeat amount-and-fee reconciliation for each direct `0xf2B1... -> 0x5E1c...` transfer.
3. Check for inbound funding shortly before each outbound transfer and preserve exceptions where amounts do not reconcile.
4. Test alternative explanations, including a high-activity service or automated funding wallet, before making any ownership/control inference.

## Sources

- Upstream transfer: https://polygonscan.com/tx/0x40bf8901ea139adcf77d6669c4a637e353bfd4b161e6c3c6242ef79f285ac5a6
- Outbound transfer to target: https://polygonscan.com/tx/0x7377127e43d2ce6eeffea2ff26b85ce2ce82730a9de1c8eb79f2549ea439f2a4
- Upstream address: https://polygonscan.com/address/0x44c7e46a3e3af17a1b2002893b46fc6481a5cfaf
- Intermediary address: https://polygonscan.com/address/0xf2b1cea4e5aaabdd1799ec04d74d23f3ffedb17d


## Finding 9 — Repeated upstream funding from 0x44c7… (expanded trace)

The 2024-11-26 pass-through is not the only observed transfer from `0x44c7e46a3e3AF17A1b2002893B46Fc6481a5cFaF` to intermediary `0xf2B1...`. PolygonScan transaction listings show repeated direct POL transfers from the same upstream address to `0xf2B1...`:

| UTC timestamp | Amount to `0xf2B1...` | Transaction |
|---|---:|---|
| 2024-11-22 19:10:10 | 0.33110087 POL | https://polygonscan.com/tx/0xc2061aae47682f381205e28bd56d10dd40dd10c7e5645d3e6d652fa95247e4b4 |
| 2024-11-24 23:30:12 | 0.23000368 POL | https://polygonscan.com/tx/0x744e14ca67404777b13ca1202ae581bd999c8f391aa342740a1445735505144e |
| 2024-11-26 01:10:11 | 0.35364248 POL | https://polygonscan.com/tx/0x40bf8901ea139adcf77d6669c4a637e353bfd4b161e6c3c6242ef79f285ac5a6 |
| 2024-12-15 22:05:08 | 0.21031415 POL | https://polygonscan.com/tx/0x8ca27e8fe7bec3415ee8a929e6db1d5196f3e501a092e0903e799eaab6c4c963 |
| 2025-11-17 17:40:47 | 0.02978385 POL | https://polygonscan.com/tx/0xa010d3af4d6204d978008ba8beb01b415c773408a5dc5687a1b4e08e6130a6e5 |

### Assessment

- **Observed:** repeated direct POL transfers from `0x44c7...` to `0xf2B1...` across several dates, including a further small transfer in November 2025.
- **Derived:** `0x44c7...` is a recurring upstream funding source for `0xf2B1...`, not merely the sender in the single November 26 transaction.
- **Caveat (updated 2026-10-21):** The five listed transfers do not by themselves establish that every inbound amount was passed to the target. Subsequent review has identified additional near-exact inbound/outbound reconciliations on November 26 and November 29, documented in Finding 10 below.
- **Alternative explanations retained:** gas funding, operational transfers, a wallet service, or automated activity remain possible. The upstream address's high transaction nonce/activity and transfers to other addresses are reasons to investigate its role before attributing it to a person or a coordinated cluster.

### Next tests

1. Reconcile the 2024-11-22 and 2024-11-24 inbound amounts against all subsequent outgoing POL transfers and fees from `0xf2B1...`.
2. Reconcile the 2024-12-15 inbound transfer against the two direct transfers to `0x5E1c...` on 2024-12-16 and all intervening fees/transfers.
3. Trace the 2025-11-17 top-up against the same-day outgoing transfers, while accounting for other inbound POL deposits.
4. Inspect `0x44c7...`'s other recipients and funding sources to determine whether this is broad gas-funding behavior rather than a relationship unique to the investigation graph.


## Finding 10 — Additional near-exact funding-to-target sequences

Review of the intermediary's chronological PolygonScan transaction list identifies two additional sequences where incoming POL is followed shortly by an outgoing transfer to target `0x5E1c...`. The displayed transaction values and fees reconcile to within tiny differences consistent with explorer display rounding; the raw transaction values should be retrieved via RPC/API before calling these exact at wei-level precision.

### Sequence A — 2024-11-29

- **16:25:09 UTC:** `0x44c7...` sent **0.17154916 POL** to `0xf2B1...`, transaction https://polygonscan.com/tx/0x34a6a0f28503e4bfeffa42deab4640c19bc9c7c871652a188eb6f573a100ec86
- **16:27:13 UTC:** `0xf2B1...` sent **0.169792608 POL** to `0x5E1c...`, transaction https://polygonscan.com/tx/0xdb6f604a86197c7e8ef493e39598b66bafdc42dc698e07b7d33c83664e5f2f23
- PolygonScan displays an outbound fee of **0.00175655 POL**.

Using the displayed values:  
`0.171549160 - 0.169792608 - 0.001756550 = 0.000000002 POL`

The 2-nano-POL remainder is below the precision shown for the inbound amount and fee, so this is a **near-exact displayed-value reconciliation**, not yet an asserted wei-exact reconciliation.

### Sequence B — 2024-11-26, later that day

- **23:00:12 UTC:** `0x44c7...` sent **0.11341975 POL** to `0xf2B1...`, transaction https://polygonscan.com/tx/0xfd4df44a909982b7ea3b4a2fbb6f4bdab10f2855c66464435e9febe05223b481
- **23:01:38 UTC:** `0xf2B1...` sent **0.113133959 POL** to `0x5E1c...`, transaction https://polygonscan.com/tx/0x1a29fca4fd59ef34b3c35ca496878dad2d392ff8a32b2df68d8dc738de1a18ff
- PolygonScan displays an outbound fee of **0.00054384 POL**.
- Earlier at **01:26:51 UTC**, `0x469C...` also sent **0.00025805 POL** to `0xf2B1...`, transaction https://polygonscan.com/tx/0x5ea97d513bcb19dc5da8bf6acc0b570ca6d164f665e3918c6b072bd57f2f8106.

Including both inbound transfers, the displayed-value reconciliation is:  
`0.113419750 + 0.000258050 - 0.113133959 - 0.000543840 = 0.000000001 POL`

Again, the 1-nano-POL remainder is within the precision limits of the displayed inbound amounts and fee. This sequence is especially important because the funding is **mixed-source**: the incoming amount from `0x44c7...` alone does not cover the outgoing transfer plus fee; the earlier `0x469C...` top-up is needed for the near-exact reconciliation.

### Updated assessment

Three tightly timed near-exact pass-through candidates are now documented:
1. **2024-11-26 01:10 UTC:** `0x44c7...` → `0xf2B1...` → `0x5E1c...`, reconciled exactly from the displayed values and recorded fee.
2. **2024-11-26 23:00 UTC:** `0x44c7...` and earlier `0x469C...` → `0xf2B1...` → `0x5E1c...`, near-exact at displayed precision.
3. **2024-11-29 16:25 UTC:** `0x44c7...` → `0xf2B1...` → `0x5E1c...`, near-exact at displayed precision.

The recurrence materially strengthens the inference that `0xf2B1...` sometimes acts as an operational POL relay for the target, with `0x44c7...` a recurring upstream source and `0x469C...` contributing to at least one mixed-source funding sequence. It still does not establish common ownership, identity, or illicit purpose. The intermediary's other activity, including interactions with JumpTask and a Mimic swapper, means ordinary service/automation explanations remain live.

### Required precision check

Before treating Sequences B and A as exact at the wei level, obtain raw transaction values, gasUsed, and effectiveGasPrice from receipts/API and calculate the balance delta for the intermediary around each sequence. The explorer's rounded UI values are insufficient to resolve the tiny residuals.


## Finding 11 — Upstream address 0x44c7… is an exceptionally high-volume distributor

A separate review of the PolygonScan transaction history for `0x44c7e46a3e3AF17A1b2002893B46Fc6481a5cFaF` materially changes how its relationship to this graph should be interpreted.

PolygonScan's indexed transaction page reports **569,642 total transactions** for the address and more than **100,000 outgoing transactions** in the displayed outgoing view (the explorer notes that it shows the last 100,000 records). The visible transaction list shows many separate POL transfers to numerous distinct recipient addresses within short intervals. Source: https://polygonscan.com/txs?a=0x44c7e46a3e3af17a1b2002893b46fc6481a5cfaf

### Evidentiary assessment

- **Observed:** the explorer currently reports a very high transaction count and shows broad fan-out transfers to many unrelated-looking recipient addresses.
- **Derived:** `0x44c7...` is not a low-activity wallet whose only notable relationship is funding `0xf2B1...`. Its repeated deposits to `0xf2B1...` must be interpreted against a large-scale distribution pattern.
- **Hypotheses retained, not confirmed:** the address may be an automated distribution/funding service, operational hot wallet, or other high-volume transaction system. The public explorer evidence cited here does not identify the operator or establish the exact service type.
- **Impact on graph confidence:** this high-volume behavior weakens the attribution value of the shared upstream source by itself. The timing and amount-plus-fee reconciliations between `0xf2B1...` and `0x5E1c...` remain meaningful evidence of relay-like transfers, but the fact that `0x44c7...` funds `0xf2B1...` is not strong evidence of common ownership between `0x44c7...`, `0xf2B1...`, and the target.
- **Important distinction:** the near-exact funding sequences are transaction-flow evidence, not identity evidence. A third-party service can fund multiple independent users.

### Next tests

1. Sample historical outgoing transfers from `0x44c7...` around the 2024 dates and compare recipients, amounts, and cadence to determine whether the `0xf2B1...` deposits resemble its normal distribution pattern.
2. Inspect the address's inbound counterparties and contract interactions to characterize the service mechanism, without assigning an operator absent independent evidence.
3. Prioritize direct temporal/amount reconciliation at the `0xf2B1... -> 0x5E1c...` edge over the upstream `0x44c7...` edge for relationship analysis.
4. Keep the possible service/hot-wallet explanation explicit in any future report and avoid clustering all recipients of `0x44c7...` as commonly controlled.


## Finding 12 — 2025-12-15 inbound funding and non-exact follow-on reconciliation

A further inbound transfer from upstream address `0x44c7e46a3e3AF17A1b2002893B46Fc6481a5cFaF` to intermediary `0xf2B1ceA4e5AaAbDD1799ec04D74d23F3FFEDB17D` is recorded at **2025-12-15 22:05:08 UTC** for **0.21031415 POL**. Transaction: `0x8ca27e8fe7bec3415ee8a929e6db1d5196f3e501a092e0903e799eaab6c4c963`.

Subsequent transfers from `0xf2B1...` to target `0x5E1cf44F3E0314E9F28bf7140166A4F113A9D6DA` identified in the current review are:

- **2025-12-16 01:17:26 UTC:** 0.204071567929187516 POL; transaction `0xd814822249d54fab280607dbfdeb83732343a2e16ac912de28c760d6b0a3a949`; stated transaction fee 0.001187736139044 POL.
- **2025-12-16 10:56:06 UTC:** 0.001011930674595 POL; transaction `0x6d1bbbf586024c607a271addb65a945c939cfbbdbae941f9c0f8bc02900e8784`; stated transaction fee 0.000684835238325 POL.

The two listed target transfers total **0.205083498603782516 POL**. Adding the two stated fees gives **0.206956069981151516 POL**, leaving **0.003358080018848484 POL** unreconciled against the 0.21031415 POL inbound amount.

### Evidentiary assessment

- **Observed:** the upstream deposit is followed by two identified transfers from the intermediary to the target.
- **Derived:** those listed transfers plus their stated fees do **not** exactly reconcile to the inbound deposit. This sequence must not be described as an exact single-deposit pass-through on the current evidence.
- **Unresolved:** a complete chronological balance reconciliation is required, including the intermediary's opening balance, all intervening incoming/outgoing transfers, and transaction fees. The residual could reflect other activity or pre-existing funds; the available figures alone do not determine which.
- **Attribution limit:** temporal proximity and a transfer path establish transaction-flow relationships, not common ownership or control.

### Next tests

1. Retrieve raw transaction and receipt data for the inbound and both outbound transactions and independently verify amounts, timestamps, and gas fees.
2. Reconstruct the intermediary's full POL balance chronologically across the interval, including opening balance and all other transactions.
3. Keep this sequence separate from the exact reconciliations in Findings 8 and 10 unless the full ledger resolves the residual.
