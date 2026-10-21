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
- **Caveat:** The five listed transfers do not by themselves establish that every inbound amount was passed to the target. The November 26 transfer is the only one in this set for which this addendum has reconciled a precise 20-second, amount-plus-fee pass-through to `0x5E1c...`.
- **Alternative explanations retained:** gas funding, operational transfers, a wallet service, or automated activity remain possible. The upstream address's high transaction nonce/activity and transfers to other addresses are reasons to investigate its role before attributing it to a person or a coordinated cluster.

### Next tests

1. Reconcile the 2024-11-22 and 2024-11-24 inbound amounts against all subsequent outgoing POL transfers and fees from `0xf2B1...`.
2. Reconcile the 2024-12-15 inbound transfer against the two direct transfers to `0x5E1c...` on 2024-12-16 and all intervening fees/transfers.
3. Trace the 2025-11-17 top-up against the same-day outgoing transfers, while accounting for other inbound POL deposits.
4. Inspect `0x44c7...`'s other recipients and funding sources to determine whether this is broad gas-funding behavior rather than a relationship unique to the investigation graph.
