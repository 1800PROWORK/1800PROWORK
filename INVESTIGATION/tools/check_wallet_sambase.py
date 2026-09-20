#!/usr/bin/env python3
"""SAMBASE multi-chain evidence collector.
Reads EVM addresses from arguments or --addresses-file and records native,
normal transaction, and ERC-20 transfer activity using Etherscan V2.
This tool collects observations; it does not establish wallet ownership.
"""
import argparse,csv,json,os,re,time
from decimal import Decimal
from pathlib import Path
import requests

API="https://api.etherscan.io/v2/api"
CHAINS={1:"Ethereum",56:"BNB Chain",8453:"Base",10:"Optimism",137:"Polygon"}
ADDR=re.compile(r"^0x[0-9a-fA-F]{40}$")
D18=Decimal(10)**18

def get(s,chain,module,action,**kw):
    q={"chainid":chain,"module":module,"action":action,"apikey":s.key,**kw}
    for n in range(4):
        try:
            r=s.http.get(API,params=q,timeout=30); r.raise_for_status(); d=r.json()
            time.sleep(s.delay); return d
        except Exception:
            if n==3: return {"status":"0","message":"request failed"}
            time.sleep(2**n)

class S:
    def __init__(self,key,delay=.25): self.key,self.delay,self.http=key,delay,requests.Session()

def pages(s,chain,action,address,size,limit):
    out=[]
    for p in range(1,limit+1):
        d=get(s,chain,"account",action,address=address,startblock=0,endblock=99999999,page=p,offset=size,sort="asc")
        if str(d.get("status"))!="1" or not isinstance(d.get("result"),list): break
        b=d["result"]; out+=b
        if len(b)<size: break
    return out

def native(x):
    try:return format(Decimal(str(x))/D18,"f")
    except:return "0"

def scan(s,a,size,pages_max):
    w={"address":a,"chains":{}}
    for cid,name in CHAINS.items():
        b=get(s,cid,"account","balance",address=a,tag="latest")
        tx=pages(s,cid,"txlist",a,size,pages_max)
        tok=pages(s,cid,"tokentx",a,size,pages_max)
        w["chains"][str(cid)]={"name":name,"native_balance":native(b.get("result","0")) if str(b.get("status"))=="1" else None,
                               "transactions":tx,"erc20_transfers":tok}
    return w

def main():
    p=argparse.ArgumentParser()
    p.add_argument("addresses",nargs="*"); p.add_argument("--addresses-file",type=Path)
    p.add_argument("--page-size",type=int,default=100); p.add_argument("--max-pages",type=int,default=100)
    p.add_argument("--json",type=Path,default=Path("sambase_wallet_scan.json"))
    p.add_argument("--csv",type=Path)
    a=p.parse_args(); key=os.getenv("ETHERSCAN_API_KEY")
    if not key:p.error("ETHERSCAN_API_KEY is not set")
    add=list(a.addresses)
    if a.addresses_file:add += [x.strip() for x in a.addresses_file.read_text().splitlines() if x.strip() and not x.startswith("#")]
    add=list(dict.fromkeys(add))
    bad=[x for x in add if not ADDR.fullmatch(x)]
    if bad:p.error("invalid EVM address: "+", ".join(bad))
    s=S(key); report={"tool":"SAMBASE wallet evidence collector","schema_version":1,"wallets":[scan(s,x,a.page_size,a.max_pages) for x in add],
                     "notes":["Blockchain activity is not ownership proof.","ERC-20 transfer history is not a complete portfolio inventory."]}
    a.json.write_text(json.dumps(report,indent=2),encoding="utf-8")
    if a.csv:
        with a.csv.open("w",newline="",encoding="utf-8") as f:
            w=csv.writer(f); w.writerow(["address","chain","kind","hash","block","from","to","value","token_contract","token_symbol"])
            for x in report["wallets"]:
                for c,ch in x["chains"].items():
                    for t in ch["transactions"]:w.writerow([x["address"],ch["name"],"native_tx",t.get("hash"),t.get("blockNumber"),t.get("from"),t.get("to"),native(t.get("value","0")),"",""])
                    for t in ch["erc20_transfers"]:w.writerow([x["address"],ch["name"],"erc20_transfer",t.get("hash"),t.get("blockNumber"),t.get("from"),t.get("to"),t.get("value"),t.get("contractAddress"),t.get("tokenSymbol")])
    print(json.dumps({"wallets":len(add),"json":str(a.json),"csv":str(a.csv) if a.csv else None},indent=2))

if __name__=="__main__":main()
