# Ethereum / MetaMask EIP-7702 / Relay Cross-Chain Transaction — 2026-11-23

**Workstream:** SW-10 — Ethereum-to-Monad Relay / MetaMask Money transaction  
**Repository:** `1800PROWORK/1800PROWORK`  
**Primary Ethereum transaction:** `0x8cc9b0ac32ef0efcc056def8ceafda0ca697381f780554ad0482b8a02c29ba33`  
**Associated Monad transaction:** `0xc47a6cff9345747c86a8cfa426162138faf153735f658f64a1f1c1ea662671d2`  
**Status:** Active; transaction path substantially reconstructed from explorer records supplied/reviewed in this investigation; settlement discrepancy unresolved.  
**Evidence rule:** Distinguish user-reported facts, explorer observations, independently corroborated contract metadata, calculations, and unresolved hypotheses. Do not infer compromise, theft, or common ownership from delegation or labels alone.

## 1. User confirmation and transaction context

The user explicitly confirmed: **they initiated and made this transaction from their MetaMask wallet.** Treat this as an authorized, user-initiated operation unless later evidence contradicts that statement.

This does not mean the user's EOA was the outer Ethereum transaction sender. The transaction has an EIP-7702 authority/delegated-account component, while the outer transaction was submitted by an address labelled Relay Solver. Keep these roles separate:

- User-confirmed initiator: the user, through MetaMask.
- EIP-7702 authority account: `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`.
- Outer Ethereum transaction sender / explorer label: `0xA5a5491bCa93dD4C076e4906e79E7673F4A5A142` (Relay Solver).
- Ethereum transaction target: Multicall3 `0xcA11bde05977b3631167028862bE2a173976CA11`.

## 2. Ethereum source transaction

- Transaction: `0x8cc9b0ac32ef0efcc056def8ceafda0ca697381f780554ad0482b8a02c29ba33`
- Network: Ethereum mainnet.
- Block: `26476790`.
- Timestamp shown: 2026-11-23 08:58:35 UTC.
- Status shown: Success.
- Source asset: 0.00037174914046937 stETH.
- Source account: `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`.
- Relay Router: `0x0729E2a4716d9f7dD17858d5d504426D228697f7`.
- Relay Depository: `0x4cD00E387622C35bDDB9b4c962C136462338BC31`.
- Resulting source-side mUSD amount shown in token movements: 0.637854 mUSD (MetaMask USD).

The stETH was routed through a DEX aggregation path involving Uniswap V2, KyberSwap Aggregation Executor Proxy, and Uniswap V3/V4 components, with WETH/USDC conversions in the displayed movements. The resulting mUSD was transferred to the Relay Depository.

Explorer routing metadata captured during the review:
- `AmountInUSD`: approximately 0.640213.
- `AmountOutUSD`: approximately 0.637795.
- `AmountOut`: 637853 (consistent with six-decimal mUSD base units, subject to raw-log verification).
- `RouteID`: `859b1169-n9F_rLH:c4e40676HIdNN6rp`.
- Relay order ID: `0xE5D0039395CEB3662CDEDAB7BE9CE1BAC08481B3EC15915B2342DF08E4A6A4CF`.

The source-side difference between 0.640213 and 0.637795 USD is approximately 0.3777%. This does **not** explain the larger source-to-destination amount discrepancy below.

## 3. EIP-7702 delegation

The EIP-7702 authority account is `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`.

The transaction's authorization information identifies the delegation implementation as:

`0x63c0c19a282a1B52b07dD5a65b58948A07DAE32B`

MetaMask's published deployment documentation identifies this as its EIP-7702 delegation implementation. The authorization row reviewed in the explorer showed nonce 13 and validity true. A delegation/redeem event was also visible with the authority account as root delegator and Multicall3 as redeemer.

**Assessment:** The implementation address is consistent with standard MetaMask EIP-7702 infrastructure. This fact alone is not evidence of malicious delegation or wallet compromise. The precise signed authorization payload, permitted calls/permissions, nonce history, and any later delegation changes should be preserved and reviewed if the investigation expands to account-control risk.

Reference: MetaMask delegation framework deployment registry:  
https://github.com/MetaMask/delegation-framework/blob/main/documents/Deployments.md

## 4. Relay router and solver roles

- Ethereum Relay Router v3.2: `0x0729E2a4716d9f7dD17858d5d504426D228697f7`.
- Ethereum outer sender, labelled Relay Solver: `0xA5a5491bCa93dD4C076e4906e79E7673F4A5A142`.
- Monad-side solver: `0xf70da97812CB96acDF810712Aa562db8dfA3dbEF`.

The router address is listed in Relay's official contract-address registry. Relay's source describes a multicall router with per-call failure handling; its Multicall3 implementation supports `allowFailure` semantics. Therefore an explorer display combining an overall successful transaction with one or more subcall execution errors is technically possible. The exact failed subcall has not been identified; a complete trace is required.

The Ethereum and Monad solver addresses are distinct. Both appear in Relay-associated transaction context, but no evidence in this review establishes that they share an owner/operator.

References:
- Relay contract registry: https://docs.relay.link/references/api/api_resources/contract-addresses
- Relay Router source: https://github.com/relayprotocol/relay-periphery/blob/main/src/RelayRouter.sol
- Relay Multicall3 source: https://github.com/relayprotocol/relay-periphery/blob/main/src/common/Multicall3.sol

**Correction / caution:** The router's address being deployed on multiple networks, including Abstract, does not establish that this Ethereum transaction interacted with Abstract. No Abstract execution or cross-network relationship should be inferred from address reuse alone.

## 5. Monad destination leg

Associated Monad transaction:

`0xc47a6cff9345747c86a8cfa426162138faf153735f658f64a1f1c1ea662671d2`

The Monad explorer overview described a withdrawal of 0.45 mUSD from Ethereum via Relay. The visible destination-side sequence was:

1. Monad-side Relay solver `0xf70da97812CB96acDF810712Aa562db8dfA3dbEF` transfers 0.45 mUSD through the Relay Router.
2. 0.45 mUSD reaches destination account `0x7E86fffd719E8060Ddd34397AD34042305eDcC50`.
3. The destination account deposits 0.45 mUSD into a vault and receives 0.438568 vmUSD shares.
4. The vault strategy routes underlying mUSD through Morpho.

Destination account:
`0x7E86fffd719E8060Ddd34397AD34042305eDcC50`

Vault / vmUSD contract:
`0x1C8a336051D2024E318A229d01F9F6CF96efD316`

Morpho contract reference:
`0xD5D960E8C380B724a48AC59E2DfF1b2CB4a1eAee`

The Monad destination account is also shown as delegated to the MetaMask EIP-7702 implementation `0x63c0...`. This is consistent with a MetaMask smart-account / Money product flow, but the common implementation address does **not** prove that the Ethereum source EOA and Monad destination account have the same owner. The user should confirm whether `0x7E86...` is their intended destination account before any ownership attribution is made.

References:
- Destination account: https://monadscan.com/address/0x7E86fffd719E8060Ddd34397AD34042305eDcC50
- Vault: https://monadscan.com/address/0x1C8a336051D2024E318A229d01F9F6CF96efD316
- Morpho: https://monadscan.com/address/0xD5D960E8C380B724a48AC59E2DfF1b2CB4a1eAee
- MetaMask Money: https://metamask.com/money
- Veda architecture discussion: https://www.veda.tech/blog/veda-metamask-money-account-defi-yield-wallet

The conversion of 0.45 mUSD into 0.438568 vmUSD shares is not, by itself, evidence of a loss. Vault shares represent a proportional claim and can have a share price greater than one underlying unit per share.

## 6. Critical unresolved settlement discrepancy

The reviewed explorer records show:

| Stage | Amount |
|---|---:|
| mUSD received by Ethereum Relay Depository | 0.637854 mUSD |
| mUSD delivered on Monad to destination account | 0.450000 mUSD |
| Difference not reconciled by the reviewed records | **0.187854 mUSD** |

Derived calculations:
- Difference: `0.637854 - 0.450000 = 0.187854 mUSD`.
- Difference as a fraction of the source-side amount: approximately 29.45094%.

This is the principal unresolved issue in this case.

Do **not** classify the 0.187854 mUSD as a fee, loss, refund, retained balance, partial fill, or theft without the Relay order quote and settlement records. Potential explanations remain hypotheses only: quoted/minimum output, fee or solver economics, partial settlement, a separate payout/refund, another destination action, or an incomplete view of the linked order.

The source route's approximately 0.3777% USD difference does not reconcile the 29.45% gap. The separate 0.45 mUSD → 0.438568 vmUSD share conversion is a vault-share accounting step and must not be conflated with the source/destination discrepancy.

## 7. Access and evidence limitations

- Relay Requests v2 was reported as retired on 2026-11-24; Requests v3 requires an API key.
- Unauthenticated attempts did not retrieve the historical order payload; a published-request endpoint returned an authorization failure.
- The following Relay order data is still needed: original quote/order request, expected output, minimum output, fees, solver settlement, fill status, refund/return events, and complete source/destination execution records.
- Etherscan displayed a successful outer transaction while also showing an execution-reverted subcall message. The specific reverted call is unknown until a full trace is obtained.
- Explorer displays are useful investigative leads but should be replaced or corroborated with raw transaction/receipt/log/trace data before final conclusions.

Relay API reference: https://docs.relay.link/references/api/get-requests

## 8. Required next actions

1. Obtain the Relay order payload and historical settlement record for order ID `0xE5D0039395CEB3662CDEDAB7BE9CE1BAC08481B3EC15915B2342DF08E4A6A4CF` and route ID `859b1169-n9F_rLH:c4e40676HIdNN6rp`.
2. Reconcile the full 0.637854 mUSD source deposit against every destination payout, refund, retained balance, and solver settlement. Account for every base unit.
3. Retrieve raw Ethereum transaction, receipt, logs, and execution trace; identify each successful and failed subcall and decode the EIP-7702 authorization tuple.
4. Retrieve raw Monad transaction, receipt, logs, and traces; verify the 0.45 mUSD transfer, destination account, vault deposit, vmUSD mint, and Morpho strategy calls.
5. Verify whether the user controls or intended to use destination account `0x7E86fffd719E8060Ddd34397AD34042305eDcC50`; do not infer this from shared MetaMask delegation code.
6. Preserve the two solver addresses as distinct service-role observations unless primary evidence links their control.
7. If API-key access is unavailable, request Relay support to provide the order quote and settlement breakdown using the transaction hash and order ID.

## 9. Evidence status summary

### Confirmed by user
- The user personally initiated and made the MetaMask transaction.

### Explorer-observed in the reviewed transaction pages
- Ethereum transaction hash, block, timestamp, success status, source EOA, EIP-7702 implementation, Relay router, DEX token route, Relay Depository receipt of 0.637854 mUSD, linked Monad transaction, and 0.45 mUSD destination delivery.
- Monad-side deposit of 0.45 mUSD into the vault and receipt of 0.438568 vmUSD shares.

### Corroborated by official/project documentation reviewed
- MetaMask EIP-7702 implementation address.
- Relay Router v3.2 address and router/multicall design.
- MetaMask Money / Veda vault architecture as contextual explanation.

### Derived
- 0.187854 mUSD source-to-destination discrepancy.
- Approximately 29.45094% of the source-side mUSD amount remains unreconciled.
- Approximately 0.3777% difference between the displayed source route USD input/output values.

### Not established
- Why the 0.187854 mUSD did not appear in the reviewed Monad destination leg.
- Whether that amount was refunded, paid elsewhere, retained, charged, or left unsettled.
- Whether the two solver addresses share an operator.
- Whether the source EOA and Monad destination account have the same owner.
- Whether the reverted subcall was material to settlement.
- Any wallet compromise, theft, or malicious delegation.

### Withdrawn / not to be repeated as fact
- A previously mentioned Relay security advisory allegedly dated 2026-11-24 concerning malicious EIP-7702 delegations was not independently substantiated in the research. It is withdrawn as an evidentiary claim.
- A prior suggestion that same-address Relay Router deployment on Abstract establishes an Abstract connection is not supported.

---
**Checkpoint discipline:** This is a dated investigation record, not a final attribution. Preserve the unresolved amount discrepancy and all source identifiers until Relay's order-level settlement data and raw chain traces reconcile the transaction.
