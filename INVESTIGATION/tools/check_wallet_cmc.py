#!/usr/bin/env python3
"""Add CoinMarketCap keyless market data to the SAMBASE wallet collector.

On-chain observations continue to come from check_wallet_sambase.py/Etherscan.
CMC is used only for market-data enrichment. No CoinMarketCap API key is
required.

Examples:
    python3 check_wallet_cmc.py 0xYourWallet
    python3 check_wallet_cmc.py 0xWallet1 0xWallet2 --csv wallet_cmc.csv
"""
import argparse
import csv
import json
import os
import time
from decimal import Decimal
from pathlib import Path

import requests

from check_wallet_sambase import ADDR, CHAINS, EtherscanClient, native

CMC_API = "https://pro-api.coinmarketcap.com/public-api"

CMC_PLATFORMS = {
    1: "ethereum",
    56: "bnb-smart-chain",
    8453: "base",
    10: "optimism",
    137: "polygon",
}

NATIVE_SYMBOLS = {
    1: "ETH",
    56: "BNB",
    8453: "ETH",
    10: "ETH",
    137: "POL",
}


class CoinMarketCapClient:
    """Small keyless CMC client with caching and 429/error backoff."""

    def __init__(self, delay=0.25, timeout=15):
        self.delay = delay
        self.timeout = timeout
        self.http = requests.Session()
        self.cache = {}

    def get(self, path, **params):
        cache_key = (path, tuple(sorted(params.items())))
        if cache_key in self.cache:
            return self.cache[cache_key]

        url = CMC_API + path
        for attempt in range(5):
            try:
                response = self.http.get(
                    url,
                    params=params,
                    headers={"Accept": "application/json"},
                    timeout=self.timeout,
                )
                if response.status_code == 429 and attempt < 4:
                    time.sleep(2 ** attempt)
                    continue
                response.raise_for_status()
                payload = response.json()
                self.cache[cache_key] = payload
                time.sleep(self.delay)
                return payload
            except requests.RequestException as exc:
                if attempt == 4:
                    payload = {"status": {"error_code": -1, "error_message": str(exc)}, "data": None}
                    self.cache[cache_key] = payload
                    return payload
                time.sleep(2 ** attempt)

    @staticmethod
    def ok(payload):
        status = payload.get("status", {}) if isinstance(payload, dict) else {}
        return str(status.get("error_code", "0")) == "0"

    def native_price(self, symbol):
        payload = self.get("/v2/simple/price", symbol=symbol, convert="USD")
        if not self.ok(payload):
            return None
        data = payload.get("data", {})
        quote = data.get(symbol) or data.get(symbol.upper()) or data.get(symbol.lower())
        if isinstance(quote, dict):
            return quote.get("USD") or quote.get("usd")
        return None

    def token_price(self, platform, address):
        payload = self.get("/v1/dex/token/price", platform=platform, address=address)
        if not self.ok(payload):
            return None
        data = payload.get("data")
        if isinstance(data, list):
            data = data[0] if data else None
        if not isinstance(data, dict) or data.get("p") is None:
            return None
        return {
            "name": data.get("n"),
            "symbol": data.get("sym"),
            "address": data.get("a", address),
            "price_usd": data.get("p"),
            "change_1h_pct": data.get("pc1h"),
            "change_24h_pct": data.get("pc24h"),
            "change_7d_pct": data.get("pc7d"),
            "volume_24h_usd": data.get("v24h"),
            "liquidity_usd": data.get("l"),
            "market_cap_usd": data.get("mc"),
            "timestamp": data.get("ts"),
        }


def enrich_wallet(etherscan, cmc, address, page_size, max_pages):
    result = {"address": address, "chains": {}}

    for chain_id, chain_name in CHAINS.items():
        balance = etherscan.get(chain_id, "account", "balance", address=address, tag="latest")
        transactions = etherscan.pages(chain_id, "txlist", address, page_size, max_pages)
        transfers = etherscan.pages(chain_id, "tokentx", address, page_size, max_pages)

        native_balance = (
            native(balance.get("result", "0"))
            if str(balance.get("status")) == "1"
            else None
        )
        native_symbol = NATIVE_SYMBOLS[chain_id]
        token_markets = {}

        for transfer in transfers:
            contract = transfer.get("contractAddress")
            if not contract or not ADDR.fullmatch(contract):
                continue
            key = contract.lower()
            if key not in token_markets:
                token_markets[key] = cmc.token_price(CMC_PLATFORMS[chain_id], contract)

        result["chains"][str(chain_id)] = {
            "name": chain_name,
            "native_symbol": native_symbol,
            "native_balance": native_balance,
            "native_price_usd": cmc.native_price(native_symbol),
            "transactions": transactions,
            "erc20_transfers": transfers,
            "erc20_market": token_markets,
        }

    return result


def transfer_amount_usd(transfer, market):
    if not isinstance(market, dict) or market.get("price_usd") is None:
        return None
    try:
        decimals = int(transfer.get("tokenDecimal") or 0)
        amount = Decimal(str(transfer.get("value", "0"))) / (Decimal(10) ** decimals)
        return str(amount * Decimal(str(market["price_usd"])))
    except (ArithmeticError, TypeError, ValueError):
        return None


def write_csv(path, wallets):
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow([
            "address", "chain", "kind", "hash", "block", "from", "to",
            "raw_value", "token_contract", "token_symbol", "price_usd",
            "value_usd", "liquidity_usd", "market_cap_usd",
        ])

        for wallet in wallets:
            for chain in wallet["chains"].values():
                price = chain.get("native_price_usd")
                native_value_usd = None
                if price is not None and chain.get("native_balance") is not None:
                    try:
                        native_value_usd = str(
                            Decimal(str(chain["native_balance"])) * Decimal(str(price))
                        )
                    except (ArithmeticError, TypeError, ValueError):
                        pass

                writer.writerow([
                    wallet["address"], chain["name"], "native_balance", "", "", "", "",
                    chain.get("native_balance"), "", chain["native_symbol"], price,
                    native_value_usd, "", "",
                ])

                for tx in chain["transactions"]:
                    writer.writerow([
                        wallet["address"], chain["name"], "native_tx",
                        tx.get("hash"), tx.get("blockNumber"), tx.get("from"),
                        tx.get("to"), tx.get("value"), "", "", "", "", "", "",
                    ])

                markets = chain.get("erc20_market", {})
                for transfer in chain["erc20_transfers"]:
                    contract = transfer.get("contractAddress", "")
                    market = markets.get(contract.lower()) if contract else None
                    writer.writerow([
                        wallet["address"], chain["name"], "erc20_transfer",
                        transfer.get("hash"), transfer.get("blockNumber"),
                        transfer.get("from"), transfer.get("to"),
                        transfer.get("value"), contract,
                        transfer.get("tokenSymbol"),
                        market.get("price_usd") if isinstance(market, dict) else None,
                        transfer_amount_usd(transfer, market),
                        market.get("liquidity_usd") if isinstance(market, dict) else None,
                        market.get("market_cap_usd") if isinstance(market, dict) else None,
                    ])


def main():
    parser = argparse.ArgumentParser(
        description="Collect SAMBASE wallet observations and add CMC keyless market data."
    )
    parser.add_argument("addresses", nargs="*")
    parser.add_argument("--addresses-file", type=Path)
    parser.add_argument("--page-size", type=int, default=100)
    parser.add_argument("--max-pages", type=int, default=100)
    parser.add_argument("--json", type=Path, default=Path("sambase_wallet_cmc.json"))
    parser.add_argument("--csv", type=Path)
    parser.add_argument("--api-delay", type=float, default=0.25)
    args = parser.parse_args()

    key = os.getenv("ETHERSCAN_API_KEY")
    if not key:
        parser.error("ETHERSCAN_API_KEY is not set")

    addresses = list(args.addresses)
    if args.addresses_file:
        addresses += [
            line.strip()
            for line in args.addresses_file.read_text(encoding="utf-8").splitlines()
            if line.strip() and not line.startswith("#")
        ]
    addresses = list(dict.fromkeys(addresses))
    if not addresses:
        parser.error("at least one EVM address is required")

    invalid = [address for address in addresses if not ADDR.fullmatch(address)]
    if invalid:
        parser.error("invalid EVM address: " + ", ".join(invalid))

    etherscan = EtherscanClient(key, delay=args.api_delay)
    cmc = CoinMarketCapClient(delay=args.api_delay)

    wallets = [
        enrich_wallet(etherscan, cmc, address, args.page_size, args.max_pages)
        for address in addresses
    ]

    report = {
        "tool": "SAMBASE wallet evidence collector + CoinMarketCap enrichment",
        "schema_version": 1,
        "market_data": {
            "provider": "CoinMarketCap Keyless Public API",
            "base_url": CMC_API,
            "authentication": "none",
        },
        "wallets": wallets,
        "notes": [
            "Blockchain activity is not ownership proof.",
            "ERC-20 transfer history is not a complete portfolio inventory.",
            "CMC prices, liquidity, and market-cap fields are market-data observations, not proof of asset ownership or control.",
        ],
    }

    args.json.write_text(json.dumps(report, indent=2), encoding="utf-8")
    if args.csv:
        write_csv(args.csv, wallets)

    print(json.dumps({
        "wallets": len(wallets),
        "json": str(args.json),
        "csv": str(args.csv) if args.csv else None,
        "cmc": CMC_API,
    }, indent=2))


if __name__ == "__main__":
    main()
