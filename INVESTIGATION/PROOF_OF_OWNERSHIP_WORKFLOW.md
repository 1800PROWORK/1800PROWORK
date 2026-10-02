# Proof of Ownership Workflow — SIMBASE / SimBase Investigation

## Purpose

This workflow is for establishing proof of wallet ownership and control, not merely token association or transaction activity. In blockchain investigations, ownership must be proven by cryptographic control, not by naming, visual similarity, or market listing.

This repo contains evidence that a contract or wallet is associated with SIMBASE activity, but the repo does not yet establish ownership of the wallet or common control between addresses.

---

## Core Principle

Proof of ownership requires one of the following:

1. A wallet signs a verifiable message proving it controls the private key.
2. A wallet submits a transaction that is independently traceable on-chain.
3. A contract or token transfer is controlled by an address whose admin / owner relationship is independently verified.
4. A real-world identity is separately established through a lawful identity process.

The following do not qualify as proof of ownership:

- Token name matching
- Market price page association
- Similar transaction timing
- Deployer address association alone
- “Looks connected” behavior
- Hash similarity without exact reproduction

---

## Ownership Proof Standard

### 1. Wallet ownership proof

Use a clear wallet-signing challenge.

Example:

```text
Message: "I am proving ownership of address 0x[ADDRESS] at timestamp 2026-10-02T00:00:00Z"
```

Then have the wallet sign the message using the private key. Verify on-chain using:

- EIP-191 personal_sign
- EIP-712 typed data
- secp256k1 signature verification with the wallet address

### 2. On-chain control proof

A wallet proves control by:

- sending a transaction from the wallet;
- receiving or sending assets under that wallet's signature;
- signing a contract call that modifies owner/admin state;
- being the signer for a multisig transaction.

### 3. Contract ownership proof

If ownership is tied to a contract:

- identify the owner/admin variable,
- verify the owner slot or method,
- check who can call `transferOwnership`, `setOwner`, or admin functions,
- confirm the signer is an approved wallet,
- ensure the ownership change is on-chain and time-stamped.

### 4. Real-world identity proof

If legal or compliance identity is required, blockchain control is not enough by itself. It must be paired with a separate identity record such as:

- KYC record
- business registry
- domain ownership records
- signed legal declaration
- verified customer onboarding records

---

## Minimum Evidence Checklist for Ownership

### Required fields

- [ ] Full wallet address (40 hex chars, no truncation)
- [ ] Transaction hash proving wallet control
- [ ] Block number and timestamp
- [ ] Signed challenge text or message
- [ ] Signature verification method
- [ ] Public key recovery result
- [ ] Proof that the wallet actually signed with the private key
- [ ] Full chain of transfer, admin action, or contract ownership change

### Required exclusions

- [ ] No truncated addresses
- [ ] No name similarity alone
- [ ] No partial screenshots without transaction hash
- [ ] No unverified market labels as ownership proof
- [ ] No hash match without exact reproduction and address-specific input

---

## Proof Workflow

### Phase 1: Establish the address is the right target

Before claiming ownership:

1. Confirm the exact address you are testing.
2. Verify the network (Base, Ethereum, etc.).
3. Confirm the token / contract association separately from ownership.
4. Record the address exactly, including case and full 40-character checksum form.

### Phase 2: Verify wallet control by signature

Use a message signed by the wallet.

Example:

```javascript
const signer = new ethers.Wallet(privateKey);
const msg = "I am proving wallet ownership for 0x[...] on 2026-10-02T00:00:00Z";
const sig = await signer.signMessage(msg);
console.log(sig);
```

Then verify with the wallet address:

```javascript
const recovered = ethers.utils.verifyMessage(msg, sig);
console.log(recovered);
```

Required result:

- `recovered === walletAddress`

This is strong proof that the wallet controls the private key.

### Phase 3: Verify on-chain state

After signature verification:

1. Query the wallet's outgoing transactions.
2. Check whether the wallet sends funds or interacts with the contract.
3. Link the wallet to its first funding source.
4. Verify that any owner/admin function is signed by the same wallet.

Useful sources:

- BaseScan
- Etherscan
- Blockscout
- RPC endpoints for `eth_getTransactionReceipt`, `eth_getTransactionByHash`

### Phase 4: Confirm linkage to SIMBASE or contract control

If the wallet is claimed to be the SIMBASE deployer or controller:

1. verify the deployment transaction hash;
2. verify deployer address;
3. verify the wallet's first funding path;
4. verify any contract owner/admin relationship;
5. verify the wallet is the same one that signed or sent the relevant transaction.

### Phase 5: Classify the result

Use the repo’s evidence grading model:

- VERIFIED: cryptographic proof, exact on-chain transaction, and reproducible signature
- STRONG CORRELATION: clear transaction linkage but no direct wallet signature
- POSSIBLE: plausible but not independently validated
- UNPROVEN: no direct control proof

---

## Proof-of-Ownership Decision Tree

### If a wallet can sign a specific message and the signature recovers to the wallet address

Status: VERIFIED ownership proof

### If a wallet has a transaction sending ETH or tokens to a target wallet

Status: STRONG TRANSACTIONAL RELATIONSHIP, not necessarily ownership proof

### If a wallet created a contract and later controlled it

Status: Verified contract-control proof if the contract owner/admin and function calls are independently validated

### If all you have is a token name, market listing, or similar contract behavior

Status: UNPROVEN for ownership

---

## Proof Package Template

```markdown
# Ownership Proof Package

## Wallet
- Address: `0x[full_address]`
- Network: `Base` or `Ethereum`
- Date: `[ISO-8601]`

## Signature proof
- Message: `"..."`
- Signature: `0x[...]`
- Verification result: `Recovered address = 0x[...]`
- Status: VERIFIED / FAILED

## On-chain proof
- Transaction hash: `0x[...]`
- Block number: `[n]`
- Timestamp: `[UTC]`
- Sender: `0x[...]`
- Receiver: `0x[...]`
- Value: `[amount]`
- Source: BaseScan / Etherscan / RPC

## Contract proof
- Contract: `0x[...]`
- Owner/admin method used: `transferOwnership`, `setOwner`, or equivalent
- Signature recovered by wallet: YES / NO
- Verified source contract: YES / NO

## Classification
- Ownership: VERIFIED / STRONG CORRELATION / UNPROVEN
- Common-control link: VERIFIED / STRONG CORRELATION / UNPROVEN
```

---

## Practical Guidance for This Repo

The repo currently contains evidence of:

- a token identity association with SIMBASE;
- a Base contract address for the token;
- funding and liquidity activity;
- a candidate gasSaver hash test.

But it does not yet contain a wallet-signature proof or a direct owner/admin control chain. Without that, the status remains:

- token association = verified as a public fact
- wallet ownership = unproven
- identity linkage = unproven

---

## Final Rule

If you are trying to show ownership, the standard is not “it looks related.” The standard is:

- the wallet signed a challenge,
- the signature recovered to the wallet,
- the transaction or contract state was independently observed,
- the chain of custody or control is reproducible,
- and the evidence is preserved without truncation or speculation.

If there is no signature, no on-chain owner/admin control action, and no reproducible signed proof, then the claim is not proof of ownership.

---

## What to do next

1. Identify the exact wallet(s) you want to prove control over.
2. Generate a signed challenge from the wallet.
3. Verify the recovered wallet address.
4. Query the wallet's transactions.
5. Match those to the deployer / contract admin / liquidity path.
6. Preserve the transaction hashes and timestamps.
7. Write the proof package in a markdown file under `INVESTIGATION/`.
8. Cross-check against the repo’s existing records and classify the result.

---

## Bottom Line

For SIMBASE / SimBase, the repo is currently at the stage of:

- transaction evidence
- contract association
- liquidity correlation
- candidate hash analysis

It is not yet at the stage of:

- proven wallet ownership
- proven common-control identity
- verified identity linkage

Ownership proof requires direct wallet-signature or contract-owner verification, not inferred association.
