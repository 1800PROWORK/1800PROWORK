# Ethereum Wallet Access and Transaction Leads — 2026-10-22

**Workstream:** SW-08 / ETH-9616B7 follow-up  
**Repository:** 1800PROWORK/1800PROWORK  
**Status:** Active; observations recorded, transaction-level verification pending  
**Handling rule:** This file preserves reported leads. It does not assert wallet ownership, fraud, or a causal relationship between the listed addresses.

## 1. Primary address under investigation

0x4023c5DB63d01c0A797D7949B2D5396Fd963EA49

This address already appears as Address A in the ETH-9616B7 report associated with the original Seaport transaction. The user reports they currently cannot access the wallet/interface they associate with this address and is trying to determine whether assets or control remain recoverable.

**Important distinction:** A wallet UI/account name being deleted or unavailable does not, by itself, prove the on-chain address or assets were deleted. Access recovery depends on the actual key/account mechanism; do not enter a seed phrase or private key into an arbitrary web wallet.

## 2. User-supplied transaction identifiers

| Identifier | Reported observation | Evidence status | Required verification |
|---|---|---|---|
| 0xe27d3f3076e67c733d7858628a9b02b3553a54c56aba78550f1238ee42f640c4 | Supplied as a recent/latest transaction hash associated with the investigation. Direction, asset, chain, and destination have not been independently established in this checkpoint. | Investigative lead | Open exact hash on the correct chain explorer; record status, block/time, from/to, value, token transfers, logs, and internal calls. |
| 0x28289bd23ca3f07c72f542f92d2bf89c2b41decb5a9f84b92fc6a0aa79926cf9 | User reports Etherscan labels the sender as “Kraken Hot Wallet 2” and the recipient as the primary address above, approximately 53 days before the observation. The label and transfer details have not been independently verified here. | Investigative lead / reported explorer label | Verify exact transaction page, chain, block timestamp, status, sender/recipient, asset/value, and whether the address label is Etherscan's verified label. |
| 0x9616b78607f8515e2dba14fe3b8d73da894697c8e726f370d7dde9d60965a24b | Existing ETH-9616B7 case transaction; prior report describes Seaport 1.6 marketplace execution. | Existing case reference; review primary receipt before reusing derived claims | Re-fetch receipt, logs, trace, and payment recipients from primary chain data. |

Explorer links for manual inspection:
- https://etherscan.io/address/0x4023c5DB63d01c0A797D7949B2D5396Fd963EA49
- https://etherscan.io/tx/0xe27d3f3076e67c733d7858628a9b02b3553a54c56aba78550f1238ee42f640c4
- https://etherscan.io/tx/0x28289bd23ca3f07c72f542f92d2bf89c2b41decb5a9f84b92fc6a0aa79926cf9
- https://etherscan.io/tx/0x9616b78607f8515e2dba14fe3b8d73da894697c8e726f370d7dde9d60965a24b

**Access limitation:** Direct retrieval of the two newly supplied Etherscan transaction pages was not available through the current web retrieval tool during this checkpoint. That is a tooling limitation, not evidence that either transaction does not exist. Preserve both hashes and verify via Etherscan in a browser or a chain-data API.

## 3. Additional reported explorer observations

The user also reported seeing the following while navigating Etherscan:

- Relay Depository address: 0x4cD00E387622C35bDDB9b4c962C136462338BC31
- Address described in the UI as the creator of that contract: 0xf3d63166F0Ca56C3c1A3508FcE03Ff0Cf3Fb691e
- Funding/source address selected from a “Funded by Binance 20” label: 0x4976A4A02f38326660D17bf34b431dC6e2eb2327
- Reported tags/labels encountered include “Relay Depository,” “Relay,” “source code,” “MetaMask EIP-7702 Delegator,” “deleted account.eth,” “authority,” and “World Liberty Financial.”
- The user observed a displayed “5,999 transactions pending” figure on the page for 0x4976A4A02f38326660D17bf34b431dC6e2eb2327; the meaning of that UI figure is not established. Do not treat it as 5,999 pending transactions attributable to the user's wallet without checking the exact page field and API response.

All items above are **reported UI observations**, not independently verified findings. Preserve the literal addresses exactly; do not normalize, group, or infer common control from labels alone.

## 4. Investigation procedure

1. Confirm the chain/network for each transaction and address before comparing them.
2. Retrieve raw transaction JSON and receipt for each hash; record from, to, value, blockNumber, blockTimestamp, status, logs, and token transfers.
3. For contract interactions, inspect internal calls/traces and emitted events. Distinguish transaction sender, authority/delegated account, contract caller, recipient, and token beneficiary.
4. Verify labels such as “Kraken Hot Wallet 2,” “Binance 20,” and “World Liberty Financial” against the explorer's label provenance and independent primary sources. A label identifies an address as tagged by the source; it does not identify the user or prove a relationship beyond the transaction.
5. Reconstruct chronological inflows/outflows for 0x4023c5DB63d01c0A797D7949B2D5396Fd963EA49, including the already-recorded Seaport transaction, and preserve all counterparty leads even if verification is blocked.
6. Separately investigate account recovery. Never request or store the user's seed phrase/private key; do not import it into an untrusted site. First identify the original wallet provider, account type, and whether the address was a normal EOA or used EIP-7702 delegation at the relevant time.

## 5. Current assessment

- **Verified from repository history:** the primary address is already recorded as Address A in the ETH-9616B7 investigation.
- **Reported, not independently verified in this checkpoint:** the Kraken Hot Wallet 2 label and inbound direction for the 0x28289... hash; any relationship of the 0xe27d... hash to that inbound transfer; the additional Relay/Binance/World Liberty Financial UI labels.
- **Not established:** wallet ownership/control, whether assets were lost because of an expired/deleted naming account, whether any transaction was malicious, or whether the listed service-labelled addresses share an operator.
- **Next decisive evidence:** exact transaction receipts and timestamps, the correct network for each identifier, the wallet provider/account recovery method, and current on-chain balances/asset holdings.
