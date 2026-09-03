#!/usr/bin/env node

/**
 * Evidence Hash Chain Computer
 * 
 * Computes cryptographic hashes for investigation evidence to establish
 * immutable, verifiable audit trail. Each hash links to the previous state,
 * creating an unbreakable chain.
 * 
 * Usage:
 *   node scripts/compute-evidence-hash.js --gap=1 [--post-resolution=false]
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { keccak256, solidityPack } = require('ethers').utils;

class EvidenceHashChain {
  constructor() {
    this.chainPath = path.join(__dirname, '../investigation/metadata/EVIDENCE-HASH-CHAIN.json');
    this.chain = this.loadChain();
  }

  loadChain() {
    if (fs.existsSync(this.chainPath)) {
      return JSON.parse(fs.readFileSync(this.chainPath, 'utf-8'));
    }
    return {
      version: '1.0',
      created: new Date().toISOString(),
      links: [],
      metadata: {}
    };
  }

  /**
   * Compute hash for a gap resolution
   */
  computeGapHash(gapNumber, isPostResolution = false) {
    const gapMetaPath = path.join(
      __dirname,
      `../investigation/metadata/gaps/Gap-${gapNumber}-Metadata.json`
    );

    let gapData = {};
    if (fs.existsSync(gapMetaPath)) {
      gapData = JSON.parse(fs.readFileSync(gapMetaPath, 'utf-8'));
    }

    const phase = isPostResolution ? 'post-resolution' : 'pre-resolution';
    const timestamp = new Date().toISOString();

    // Get previous hash (if exists)
    const previousLink = this.chain.links[this.chain.links.length - 1];
    const previousHash = previousLink ? previousLink.hash : '0x0000000000000000000000000000000000000000000000000000000000000000';

    // Construct data to hash
    const dataToHash = JSON.stringify({
      gap: gapNumber,
      phase,
      timestamp,
      data: gapData,
      previousHash
    }, null, 0); // No spaces for deterministic hashing

    // Compute keccak256
    const hash = keccak256(Buffer.from(dataToHash));

    const link = {
      id: `gap-${gapNumber}-${phase}-${timestamp}`,
      gap: gapNumber,
      phase,
      timestamp,
      hash,
      previousHash,
      dataHash: crypto.createHash('sha256').update(dataToHash).digest('hex'),
      type: 'gap-resolution'
    };

    return { link, dataToHash };
  }

  /**
   * Compute hash for quality gate validation
   */
  computeQualityGateHash(gapNumber, gateResults) {
    const previousLink = this.chain.links[this.chain.links.length - 1];
    const previousHash = previousLink ? previousLink.hash : '0x0000000000000000000000000000000000000000000000000000000000000000';

    const timestamp = new Date().toISOString();
    const dataToHash = JSON.stringify({
      type: 'quality-gate',
      gap: gapNumber,
      timestamp,
      gateResults,
      previousHash
    }, null, 0);

    const hash = keccak256(Buffer.from(dataToHash));

    const link = {
      id: `quality-gate-gap-${gapNumber}-${timestamp}`,
      gap: gapNumber,
      timestamp,
      hash,
      previousHash,
      dataHash: crypto.createHash('sha256').update(dataToHash).digest('hex'),
      type: 'quality-gate',
      gatesPassed: gateResults.filter(r => r.status === 'PASS').length,
      gatesTotal: gateResults.length,
      allPassed: gateResults.every(r => r.status === 'PASS')
    };

    return link;
  }

  /**
   * Add link to chain
   */
  addLink(link) {
    this.chain.links.push(link);
    this.saveChain();
    return link;
  }

  /**
   * Validate entire chain
   */
  validateChain() {
    console.log('\n🔍 Validating evidence hash chain...\n');

    let valid = true;
    let previousHash = null;

    for (let i = 0; i < this.chain.links.length; i++) {
      const link = this.chain.links[i];

      // Check parent hash
      if (i === 0) {
        if (link.previousHash !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
          console.log(`❌ Link 0 should have null parent hash`);
          valid = false;
        }
      } else {
        if (link.previousHash !== previousHash) {
          console.log(`❌ Link ${i} parent hash mismatch`);
          valid = false;
        }
      }

      console.log(`✅ Link ${i}: ${link.type} (Gap ${link.gap}) - Hash: ${link.hash.slice(0, 16)}...`);
      previousHash = link.hash;
    }

    if (valid) {
      console.log(`\n✅ Hash chain is VALID (${this.chain.links.length} links)\n`);
    } else {
      console.log('\n❌ Hash chain validation FAILED\n');
    }

    return valid;
  }

  /**
   * Save chain to file
   */
  saveChain() {
    fs.writeFileSync(
      this.chainPath,
      JSON.stringify(this.chain, null, 2),
      'utf-8'
    );
  }

  /**
   * Export chain summary
   */
  exportSummary() {
    return {
      version: this.chain.version,
      created: this.chain.created,
      lastUpdated: new Date().toISOString(),
      totalLinks: this.chain.links.length,
      currentHash: this.chain.links.length > 0 
        ? this.chain.links[this.chain.links.length - 1].hash
        : '0x0000000000000000000000000000000000000000000000000000000000000000',
      links: this.chain.links.map(link => ({
        id: link.id,
        type: link.type,
        gap: link.gap,
        timestamp: link.timestamp,
        hash: link.hash
      }))
    };
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const gapNumber = args.find(arg => arg.startsWith('--gap='))?.split('=')[1];
  const isPostResolution = args.includes('--post-resolution=true');
  const validateOnly = args.includes('--validate-only');

  if (!gapNumber && !validateOnly) {
    console.error('Usage: node compute-evidence-hash.js --gap=<1|2|4> [--post-resolution=true|false]');
    process.exit(1);
  }

  const chain = new EvidenceHashChain();

  if (validateOnly) {
    const isValid = chain.validateChain();
    process.exit(isValid ? 0 : 1);
  }

  console.log(`\n🔐 Computing evidence hash for Gap ${gapNumber} (${isPostResolution ? 'post-resolution' : 'pre-resolution'})\n`);

  const { link, dataToHash } = chain.computeGapHash(gapNumber, isPostResolution);
  chain.addLink(link);

  console.log(`📝 Hash computed: ${link.hash}`);
  console.log(`📦 Linked to previous: ${link.previousHash.slice(0, 16)}...`);
  console.log(`✅ Added to chain: ${link.id}\n`);

  // Save detailed evidence record
  const evidencePath = path.join(
    __dirname,
    `../investigation/metadata/gap-${gapNumber}-${isPostResolution ? 'post' : 'pre'}-state.json`
  );

  fs.writeFileSync(evidencePath, JSON.stringify({
    link,
    timestamp: new Date().toISOString(),
    computedBy: process.env.USER || 'unknown',
    dataHash: link.dataHash,
    dataSize: Buffer.byteLength(dataToHash, 'utf-8')
  }, null, 2));

  console.log(`📄 Evidence record saved to: ${evidencePath}`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

module.exports = { EvidenceHashChain };
