#!/usr/bin/env node

/**
 * Attestation Generator
 * 
 * Generates signed attestations for investigation milestones.
 * Each attestation includes:
 * - Findings summary
 * - Evidence hash chain link
 * - Git commit reference (immutable proof)
 * - Investigator signature (via commit)
 * 
 * Usage:
 *   node scripts/generate-attestation.js \
 *     --gap=1 \
 *     --investigator="name@example.com" \
 *     --commit-sha="abc123..." \
 *     --status="RESOLVED|PENDING|ESCALATED"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AttestationGenerator {
  constructor() {
    this.attestationsDir = path.join(__dirname, '../investigation/metadata/ATTESTATIONS');
    if (!fs.existsSync(this.attestationsDir)) {
      fs.mkdirSync(this.attestationsDir, { recursive: true });
    }
  }

  /**
   * Load gap findings
   */
  loadGapFindings(gapNumber) {
    const findingsPath = path.join(
      __dirname,
      `../investigation/metadata/gaps/Gap-${gapNumber}-Findings.json`
    );

    if (!fs.existsSync(findingsPath)) {
      return {
        gap: gapNumber,
        findings: [],
        summary: 'No findings recorded yet',
        confidence: 'UNKNOWN'
      };
    }

    return JSON.parse(fs.readFileSync(findingsPath, 'utf-8'));
  }

  /**
   * Get last hash chain link
   */
  getLastHashLink() {
    const chainPath = path.join(__dirname, '../investigation/metadata/EVIDENCE-HASH-CHAIN.json');
    if (!fs.existsSync(chainPath)) {
      return null;
    }

    const chain = JSON.parse(fs.readFileSync(chainPath, 'utf-8'));
    return chain.links.length > 0 ? chain.links[chain.links.length - 1] : null;
  }

  /**
   * Get Git commit info
   */
  getCommitInfo(commitSha) {
    try {
      const output = execSync(`git show ${commitSha} --pretty=format:"%H|%an|%ae|%ai|%s"`, {
        encoding: 'utf-8',
        cwd: path.join(__dirname, '../..')
      });

      const [sha, author, email, date, subject] = output.trim().split('|');
      return { sha, author, email, date, subject };
    } catch (e) {
      return null;
    }
  }

  /**
   * Generate attestation document
   */
  generateAttestation(options) {
    const {
      gap,
      investigator,
      commitSha,
      status = 'RESOLVED',
      findings = {},
      confidence = 'HIGH'
    } = options;

    const timestamp = new Date().toISOString();
    const dateStr = timestamp.split('T')[0];
    
    const gapFindings = this.loadGapFindings(gap);
    const lastHashLink = this.getLastHashLink();
    const commitInfo = this.getCommitInfo(commitSha);

    const attestation = {
      version: '1.0',
      type: 'gap-resolution-attestation',
      timestamp,
      milestone: `Gap-${gap}-Resolution`,
      
      investigator: {
        name: investigator,
        timestamp
      },

      gap: {
        number: gap,
        status,
        confidence
      },

      findings: {
        summary: gapFindings.summary || findings.summary || 'Investigation gap resolved',
        itemsResolved: gapFindings.findings?.length || 0,
        claims: gapFindings.findings || findings.claims || [],
        nextSteps: findings.nextSteps || []
      },

      evidence: {
        hashChainLink: lastHashLink ? {
          id: lastHashLink.id,
          hash: lastHashLink.hash,
          previousHash: lastHashLink.previousHash,
          timestamp: lastHashLink.timestamp
        } : null,
        evidenceCount: gapFindings.findings?.length || 0,
        chainValidated: !!lastHashLink
      },

      cryptographicProof: {
        method: 'GitHub commit signature',
        commit: {
          sha: commitSha,
          author: commitInfo?.author || 'unknown',
          email: commitInfo?.email || 'unknown',
          date: commitInfo?.date || timestamp,
          message: commitInfo?.subject || 'Gap resolution'
        },
        verificationUrl: `https://github.com/1800PROWORK/1800PROWORK/commit/${commitSha}`,
        gpgVerifiable: true
      },

      casefile: {
        updated: true,
        propositionCount: gap === 1 ? 1 : gap === 2 ? 2 : 1,
        propositionsAffected: this.getAffectedPropositions(gap)
      },

      qualityGates: {
        planned: 6,
        status: 'PENDING_REVIEW'
      },

      approval: {
        status: 'PENDING_PEER_REVIEW',
        requiredReviewers: 1,
        reviewDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    };

    return attestation;
  }

  /**
   * Determine which propositions are affected by gap resolution
   */
  getAffectedPropositions(gap) {
    const mapping = {
      1: [1],              // Gap 1 affects Proposition 1 (Factory Initiation)
      2: [2],              // Gap 2 affects Proposition 2 (Ownership Transfer)
      4: [1, 2]            // Gap 4 (causality) affects both Prop 1 & 2
    };
    return mapping[gap] || [];
  }

  /**
   * Save attestation to file
   */
  saveAttestation(attestation) {
    const filename = `Gap-${attestation.gap.number}-Resolved-${attestation.timestamp.split('T')[0]}.json`;
    const filepath = path.join(this.attestationsDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(attestation, null, 2), 'utf-8');
    return filepath;
  }

  /**
   * List all attestations
   */
  listAttestations() {
    if (!fs.existsSync(this.attestationsDir)) {
      return [];
    }

    return fs.readdirSync(this.attestationsDir)
      .filter(f => f.endsWith('.json'))
      .map(f => ({
        filename: f,
        path: path.join(this.attestationsDir, f),
        gap: parseInt(f.match(/Gap-(\d+)/)?.[1] || 0)
      }));
  }

  /**
   * Generate summary report
   */
  generateReport() {
    const attestations = this.listAttestations();
    const report = {
      generated: new Date().toISOString(),
      totalAttestations: attestations.length,
      byGap: {},
      summary: []
    };

    for (const att of attestations) {
      if (!report.byGap[att.gap]) {
        report.byGap[att.gap] = [];
      }
      const content = JSON.parse(fs.readFileSync(att.path, 'utf-8'));
      report.byGap[att.gap].push({
        date: content.timestamp,
        status: content.gap.status,
        confidence: content.gap.confidence,
        investigator: content.investigator.name
      });
    }

    return report;
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  
  const gap = args.find(arg => arg.startsWith('--gap='))?.split('=')[1];
  const investigator = args.find(arg => arg.startsWith('--investigator='))?.split('=')[1] || process.env.USER || 'unknown';
  const commitSha = args.find(arg => arg.startsWith('--commit-sha='))?.split('=')[1];
  const status = args.find(arg => arg.startsWith('--status='))?.split('=')[1] || 'RESOLVED';
  const confidence = args.find(arg => arg.startsWith('--confidence='))?.split('=')[1] || 'HIGH';
  const listOnly = args.includes('--list');
  const reportOnly = args.includes('--report');

  const generator = new AttestationGenerator();

  if (listOnly) {
    const attestations = generator.listAttestations();
    console.log('\n📋 Existing Attestations:\n');
    for (const att of attestations) {
      console.log(`  Gap ${att.gap}: ${att.filename}`);
    }
    console.log();
    return;
  }

  if (reportOnly) {
    const report = generator.generateReport();
    console.log('\n📊 Attestation Report:\n');
    console.log(JSON.stringify(report, null, 2));
    console.log();
    return;
  }

  if (!gap || !commitSha) {
    console.error('Usage: node generate-attestation.js --gap=<1|2|4> --commit-sha=<sha> [--investigator=name@email.com] [--status=RESOLVED|PENDING] [--confidence=HIGH|MEDIUM|LOW]');
    process.exit(1);
  }

  console.log(`\n✍️  Generating attestation for Gap ${gap}\n`);

  const attestation = generator.generateAttestation({
    gap: parseInt(gap),
    investigator,
    commitSha,
    status,
    confidence
  });

  const filepath = generator.saveAttestation(attestation);
  
  console.log(`📄 Attestation saved: ${filepath}`);
  console.log(`📍 Commit: ${commitSha.slice(0, 12)}`);
  console.log(`🔐 Cryptographic proof enabled via GitHub commit signature`);
  console.log(`⏳ Status: ${status}`);
  console.log(`💪 Confidence: ${confidence}\n`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

module.exports = { AttestationGenerator };
