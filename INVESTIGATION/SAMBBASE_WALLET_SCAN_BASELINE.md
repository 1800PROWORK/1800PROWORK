# SAMBASE Wallet Scan Baseline

This file records the current investigation addresses intended for the multi-chain evidence collector.

## Candidate addresses

- SIMBASE: `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`
- Base wallet A: `0xAEce168F44DbE83517f9161b394Dfca7AE63846c`
- Base wallet B: `0x12bbF04806a25D124e389B4c9871aC6D21EfC6f4`
- YIELDX: `0x5C16384341D3A8d3796E8524Af5615f9b529f44F`
- CRASH contract: `0x5136691bd7826eba653a81abdcfd86494448c280`
- CRASH creator: preserve the full address from primary explorer evidence before cryptographic testing.

## Method

The collector scans Ethereum, BNB Chain, Base, Optimism, and Polygon for native balances, normal transactions, and ERC-20 transfer history. Results are observations for correlation and verification; address activity alone is not proof of common ownership or control.

## Usage

```bash
export ETHERSCAN_API_KEY="..."
python3 INVESTIGATION/tools/check_wallet_sambase.py --addresses-file INVESTIGATION/SAMBBASE_WALLET_SCAN_BASELINE.md --json sambase_wallet_scan.json
```

For machine-readable input, place one address per line in a separate text file and pass it with `--addresses-file`.
