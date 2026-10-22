# Initial Triage — EVM Address 0x185c...3d40ed

**Prepared:** 2026-10-22  
**Status:** Preliminary; transaction-level source verification still required  
**Target:** `0x185CfaFca1F2D364C1ACB7d568B0f221623d40Ed`

## Scope and separation from existing cases

This address was supplied via its BaseScan page. It is **not** the existing Polygon primary target `0x5E1cf44F3E0314E9F28bf7140166A4F113A9D6DA`, nor the separate Base/EIP-7702 target `0xC0e8d8Df729a91FB3920A026Ce548b3A9d00BA06`. Exact-address search in the repository did not find this new address in the indexed investigation files. Do not merge it into those cases without a transaction-level link.

## Explorer observations (indexed snapshots; not a current-state attestation)

- BaseScan labels the address `simbase.base.eth`, shows approximately 3,150 Base transactions, an initial-funder label of `LayerZero: Relayer`, and a multichain portfolio view covering 33 chains. Its indexed snapshot shows repeated interactions with Morpho Bundler3, Aave, LI.FI Permit2 Proxy, Superform, Pendle, Stargate, and Celer cBridge.
- PolygonScan labels the same 20-byte address `simcrypto.eth`, shows approximately 630 Polygon transactions, and labels `trappist1d.eth` as the initial funder. Indexed Polygon activity includes LI.FI, Axelar Gas Service, Socket, and Merkly bridge/refuel interactions, plus a batch of token approvals on 2026-01-07.
- These explorer labels and snapshots are leads. They are not proof of a human identity, shared ownership of ENS/Basename names, or a direct relationship to other case targets.

## Specific transaction leads from the BaseScan indexed page

| Approx. timestamp (UTC) | Explorer-described action | Transaction hash |
|---|---|---|
| 2026-05-14 20:30:33 | Morpho Bundler3 multicall; explorer displays 2.005 ETH value | `0x685bee5ef6a9fceda4f45db9b46556e8e2f37057f975efdeb5797fec84bcd187` |
| 2026-05-14 20:24:13 | Aave Base Pool, method labelled Borrow | `0xc0aa0f2bf5494b7134c33f817f4fd93944e92309fa614333c7785148136166cd` |
| 2026-05-08 15:54:43 | Internal transfer from Stargate Pool Native to target, 0.008998 ETH shown | `0x397062c2c0d91cd6f6f44a007adb3dd66d1b480db3756a31695dc3ed7a90c251` |
| 2026-04-28 23:30:45 | Internal transfer from Celer cBridge to target, 0.92640269 ETH shown | `0xf71b701a7248d222b1aaec5e76fec62370fff00442498d8a4d4eec98b68e1610` |
| 2026-04-19 07:41:15 | Internal transfer from Aave Wrapped Token Gateway V3 2, 1.5 ETH shown | `0x29adbed64e0eb1a3f09c1f95f26d2f3f90609c295d52b805619fdb6199a9e1ca` |

These are explorer-rendered summaries; inspect receipts, logs, calldata, token transfers, and paired bridge messages before interpreting them as net deposits, borrow proceeds, or cross-chain source/destination matches.

## Specific leads from PolygonScan's indexed page

- Initial-funder label: `trappist1d.eth`; funding transaction hash and exact amount not yet recovered.
- 2025-03-25: LI.FI “Start Bridge Token” transaction `0x73e41848b54bd673c253c110750611f4db159689c094caa61a5dba8eeb27a305`.
- 2025-06-01: Merkly “Bridge Gas” transaction `0xcca85ec6e0267233b5a55c97c31f821ef52b26e926af8cf18a35360536165100`.
- 2026-01-07: multiple approvals including USDT0, USDC.e, WBTC, WETH, DAI, LINK, CRV, SAND, stMATIC, AAVE, and WPOL. Determine spender addresses and current allowance amounts before treating these as risk-relevant.

## Balance discrepancy / freshness warning

BaseScan's indexed page displayed about $6,694 across its multichain view and a small Base ETH balance. PolygonScan's indexed page displayed about $10,688 across its multichain view, with a materially different allocation (including about 5.9965 aBasWETH on Base). These snapshots are inconsistent and were crawled at different times; do not treat either portfolio value or balance as the current verified balance. Re-query chain state and token balances from primary RPC/provider data.

## Evidence classification

- **Observed in explorer-indexed pages:** same 20-byte address is listed on Base and Polygon; respective labels are `simbase.base.eth` and `simcrypto.eth`; protocol and bridge-related transaction rows are present.
- **Derived:** activity is consistent with a multichain DeFi user/account, including lending, approvals, and bridging.
- **Unresolved:** EOA vs delegated/smart-account state on each chain; ENS/Basename registration and controller history; exact initial funding transactions; bridge source/destination matches; current balances and allowances; relationship, if any, to `0x5E1c...D6DA`, `0xC0e8...BA06`, or other SIMBASE case targets.
- **Not established:** real-world identity, common ownership with any named wallet, wrongdoing, or common control with another investigation address.

## Next verification sequence

1. Retrieve Base and Polygon transaction lists, receipts, logs, calldata, token transfers, and contract-code state from primary chain data.
2. Recover the exact `trappist1d.eth -> target` Polygon funding transaction and the Base initial-funding transaction; trace each upstream.
3. Match LI.FI, Stargate, Celer, Axelar, Socket, and Merkly messages to destination-chain transactions by protocol identifiers and amounts, allowing for fees and wrapped-asset conversions.
4. Decode the May 2026 Aave/Morpho transactions and reconstruct position changes rather than inferring from method labels.
5. Check whether any verified transaction-level edge links this address to the existing SIMBASE investigation targets. Preserve the new address as a separate case until such an edge is demonstrated.

## Sources

- BaseScan: https://basescan.org/address/0x185cfafca1f2d364c1acb7d568b0f221623d40ed
- PolygonScan: https://polygonscan.com/address/0x185cfafca1f2d364c1acb7d568b0f221623d40ed


## Addendum — Funding-address lead (2026-10-22)

A follow-up review of the PolygonScan address page's **Funded By** link resolved the linked funder address to:

`0x2365A03837e58FFd6B570CF214aE52F61188f1Ba`

The PolygonScan page associates this funder with the ENS label `trappist1d.eth`. A separate BaseScan indexed result labels the same 20-byte address `basefarmer.base.eth` and shows repeated Base DeFi activity. This is a concrete address-level lead to investigate across chains, but ENS/Basename labels are not proof that the same person controls either name or that the funder and target share ownership.

### Follow-up tests

1. Retrieve the exact Polygon transaction by which `0x2365A03837e58FFd6B570CF214aE52F61188f1Ba` first funded the target; record tx hash, timestamp, amount, and native/token asset.
2. Trace the funder's upstream funding and check whether the same source or repeated transfers fund other case targets.
3. Compare the funder's Base transaction timeline with the target's Base activity, especially bridge and lending interactions, but only treat matched transaction IDs / protocol message IDs as cross-chain links.
4. Verify current ENS and Basename records, resolver, controller/registrant history where available; keep labels as attribution leads only.
5. Check whether the address `0x2365A03837e58FFd6B570CF214aE52F61188f1Ba` appears in other SIMBASE case files and whether any direct on-chain edge supports joining cases.

**Evidence status:** the funder address is obtained from the explorer's Funded By link and cross-referenced against a BaseScan result; the exact first-funding transaction and common control remain unverified.


## Addendum — Verified Polygon-to-Arbitrum bridge (2026-10-22)

### Transaction pair

The Polygon source transaction and Arbitrum destination transaction were reviewed through explorer-rendered transaction details.

| Field | Observation |
|---|---|
| Source network | Polygon PoS |
| Source transaction | `0x73e41848b54bd673c253c110750611f4db159689c094caa61a5dba8eeb27a305` |
| Source timestamp | 2025-03-25 21:26:32 UTC |
| Source asset / amount | 0.4 WETH |
| Entry protocol | LI.FI; bridge route identified as Across |
| Destination network | Arbitrum One (chain ID 42161) |
| Destination transaction | `0x6abdec2ea5755f3b484f87d832bb24c9f298b088e5af43f21af0abb87201d1d3` |
| Destination amount | 0.399944559262067387 WETH |
| Destination recipient | Same 20-byte address as the Polygon target |
| Deposit ID shown in source event | `1678308` |

The source event was rendered as `FundsDeposited`, and the destination transaction included a `FilledRelay` event and WETH transfer to the target address. The amount difference is consistent with bridge fees / quote mechanics; no evidence from this pair alone indicates diversion.

### Evidence classification

- **Observed:** the source explorer page shows a 0.4 WETH Polygon bridge deposit initiated through LI.FI / Across.
- **Observed:** the destination explorer page shows 0.399944559262067387 WETH delivered to the same address on Arbitrum.
- **Derived, high confidence:** the two transactions are a cross-chain source/destination match based on the displayed protocol events, destination chain, deposit identifier, recipient, and amounts.
- **Unresolved:** independently retrieving raw RPC receipts and decoding all logs; whether the wallet controller is a particular person; any relationship to other SIMBASE targets.
- **Not established:** fraud, criminal intent, or common control with any other address.

### Sources

- Polygon source transaction: https://polygonscan.com/tx/0x73e41848b54bd673c253c110750611f4db159689c094caa61a5dba8eeb27a305
- Arbitrum destination transaction: https://arbiscan.io/tx/0x6abdec2ea5755f3b484f87d832bb24c9f298b088e5af43f21af0abb87201d1d3

### Follow-up

1. Preserve transaction pages and obtain raw receipts/logs from an independent RPC or data provider.
2. Continue to recover the exact Polygon initial-funding transaction associated with the explorer's `Funded By` lead (`0x2365A03837e58FFd6B570CF214aE52F61188f1Ba`); this is still not established by the bridge pair.
3. Match other bridge leads by protocol message / deposit identifiers rather than address labels or approximate timing.
4. Keep this address as a separate case from other SIMBASE targets unless a direct transaction-level link is verified.


## Addendum — Additional verified bridge and lending evidence (2026-10-22)

### A. Merkly / LayerZero: Polygon to Optimism

LayerZero Scan links Polygon source transaction `0xcca85ec6e0267233b5a55c97c31f821ef52b26e926af8cf18a35360536165100` to Optimism destination transaction `0xe8c9f2e9d72ce2b4a3df4b324fddc26e4184cd88d8b3984671d81637b8120d6d`. The source address is the target wallet. LayerZero Scan reports **Delivered**, time taken 18m 22s, nonce 12040, GUID `0x81678bc0e4683f3ca08517e0b8578f40906c4e775a61cca1ccd830fca719014b`, and Merkly as source/destination application. The source calldata includes the target address as remote recipient.

**Finding:** strong evidence of a successful Merkly/LayerZero cross-chain gas-refuel message intended for the target. This does not establish identity, fraud, or common control with another wallet.

Sources:
- https://layerzeroscan.com/tx/0xcca85ec6e0267233b5a55c97c31f821ef52b26e926af8cf18a35360536165100
- https://optimistic.etherscan.io/tx/0xe8c9f2e9d72ce2b4a3df4b324fddc26e4184cd88d8b3984671d81637b8120d6d

### B. Base inbound bridge transactions

**Stargate / LayerZero:** Base transaction `0x397062c2c0d91cd6f6f44a007adb3dd66d1b480db3756a31695dc3ed7a90c251` shows 0.008998 ETH delivered from Stargate Pool Native to the target. The receipt includes `OFTReceived`, source endpoint ID `30110`, and amount `8998000000000000` wei. The source-side transaction has not yet been paired independently.

Source: https://basescan.org/tx/0x397062c2c0d91cd6f6f44a007adb3dd66d1b480db3756a31695dc3ed7a90c251

**Celer cBridge:** Base transaction `0xf71b701a7248d222b1aaec5e76fec62370fff00442498d8a4d4eec98b68e1610` shows 0.926402693881097845 WETH delivered to the target. Its `Relay` event reports transferId `0x829228024AEC74EB3173B02F47CCBB115ECA0970A61A0A99D880340F691CA6FF`, sender `0xDE1E598b81620773454588B85D6b5D4eEC32573e`, source chain ID `59144`, and source transfer ID `0xE3ED104CD18B1AC1423938462ED839D2316D8525B9FFF819F0EB8386453AF905`. The corresponding source transaction hash is still unresolved.

Source: https://basescan.org/tx/0xf71b701a7248d222b1aaec5e76fec62370fff00442498d8a4d4eec98b68e1610

### C. Base Aave / Morpho activity

- **Aave borrow:** `0xc0aa0f2bf5494b7134c33f817f4fd93944e92309fa614333c7785148136166cd`, successful transaction at 2026-05-14 20:24:13 UTC; BaseScan labels the target as borrowing 2,000 USDC through Aave Pool Proxy Base.
- **Morpho Bundler3 multicall:** `0x685bee5ef6a9fceda4f45db9b46556e8e2f37057f975efdeb5797fec84bcd187`, successful transaction at 2026-05-14 20:30:33 UTC; explorer transfer details show 2.005 WETH moving from Morpho General Adapter1 to Morpho.

These calls occurred about 6 minutes 20 seconds apart. That timing alone does **not** prove the Aave borrow funded the Morpho position; intervening transfers and calldata must be reconstructed before claiming a causal flow. These are DeFi activity indicators, not standalone evidence of fraud.

Sources:
- https://basescan.org/tx/0xc0aa0f2bf5494b7134c33f817f4fd93944e92309fa614333c7785148136166cd
- https://basescan.org/tx/0x685bee5ef6a9fceda4f45db9b46556e8e2f37057f975efdeb5797fec84bcd187

### D. Aave withdrawal

Base transaction `0x29adbed64e0eb1a3f09c1f95f26d2f3f90609c295d52b805619fdb6199a9e1ca` shows the target withdrawing 1.5 ETH via Aave Wrapped Token Gateway V3 2, with a corresponding reduction of approximately 1.5 aBasWETH. This is consistent with redeeming an Aave WETH position, not by itself an external third-party payment.

Source: https://basescan.org/tx/0x29adbed64e0eb1a3f09c1f95f26d2f3f90609c295d52b805619fdb6199a9e1ca

### E. Open funding lead and remaining verification

The exact first-funding transfer from `0x2365A03837e58FFd6B570CF214aE52F61188f1Ba` to the target remains unverified; no transaction hash, timestamp, asset, or amount is asserted here. Next steps: recover that transfer from a complete address export/indexed transaction API; resolve Celer's source transfer ID on Linea; recover Stargate's source-side transaction; decode the full Morpho multicall and market events; and keep this wallet separate from other SIMBASE targets unless direct transaction-level evidence links them.
