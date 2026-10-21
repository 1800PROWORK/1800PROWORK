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
