#!/usr/bin/env node

/**
 * Gap 1 Resolution: Factory Deployer Verification
 * 
 * Queries Etherscan to verify:
 * 1. Factory contract address
 * 2. Factory deployer address (creator)
 * 3. Comparison with investigation subject address (0xc2B5f79a5768893b8087667B391C1381c502Ab5c)
 * 4. Determines if HIGH-confidence originator or MEDIUM-confidence post-acquirer
 * 
 * Usage:
 *   node scripts/gap-1-factory-deployer.js \
 *     --factory=0xe12eB4879b7b53e91117f2925f45e9c895CB560B \
 *     --etherscan-key=YOUR_API_KEY \
 *     [--rpc-url=https://eth-mainnet.alchemyapi.io/v2/...]
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class Gap1FactoryDeployerVerifier {
  constructor(options = {}) {
    this.factoryAddress = options.factoryAddress || '0xe12eB4879b7b53e91117f2925f45e9c895CB560B';
    this.subjectAddress = '0xc2B5f79a5768893b8087667B391C1381c502Ab5c';
    this.etherscanApiKey = options.etherscanKey || process.env.ETHERSCAN_API_KEY;
    this.etherscanUrl = 'https://api.etherscan.io/api';
  }

  /**
   * Query Etherscan for contract creator
   */
  async getContractCreator() {
    console.log(`\n🔍 Querying Etherscan for factory creator...\n`);

    try {
      const response = await axios.get(this.etherscanUrl, {
        params: {
          module: 'contract',
          action: 'getcontractcreation',
          contractaddresses: this.factoryAddress,
          apikey: this.etherscanApiKey
        },
        timeout: 10000
      });

      if (response.data.status !== '1') {
        throw new Error(`Etherscan error: ${response.data.message}`);
      }

      const result = response.data.result[0];
      return {
        contractAddress: result.ContractAddress,
        creatorAddress: result.ContractCreator,
        txHash: result.TxHash,
        blockNumber: result.BlockNumber
      };
    } catch (err) {
      console.error(`❌ Etherscan API error: ${err.message}`);
      throw err;
    }
  }

  /**
   * Query Etherscan for full contract details
   */
  async getContractDetails() {
    console.log(`\n📋 Retrieving contract details...\n`);

    try {
      const response = await axios.get(this.etherscanUrl, {
        params: {
          module: 'contract',
          action: 'getsourcecode',
          address: this.factoryAddress,
          apikey: this.etherscanApiKey
        },
        timeout: 10000
      });

      if (response.data.status !== '1') {
        throw new Error(`Etherscan error: ${response.data.message}`);
      }

      return response.data.result[0];
    } catch (err) {
      console.error(`❌ Etherscan API error: ${err.message}`);
      throw err;
    }
  }

  /**
   * Normalize addresses for comparison
   */
  normalizeAddress(addr) {
    return addr.toLowerCase();
  }

  /**
   * Determine attribution confidence
   */
  determineConfidence(creatorAddress, subjectAddress) {
    const creator = this.normalizeAddress(creatorAddress);
    const subject = this.normalizeAddress(subjectAddress);

    if (creator === subject) {
      return {
        confidence: 'HIGH',
        status: 'Originator',
        reasoning: 'Factory deployer == investigation subject (same address)'
      };
    } else {
      return {
        confidence: 'MEDIUM',
        status: 'Post-Acquisition',
        reasoning: 'Subject address called factory but did not deploy it; likely acquired ownership post-deployment'
      };
    }
  }

  /**
   * Generate findings report
   */
  async generateReport() {
    console.log(`\n🔐 Gap 1: Factory Deployer Verification\n`);
    console.log(`Factory Address: ${this.factoryAddress}`);
    console.log(`Subject Address: ${this.subjectAddress}\n`);

    try {
      const creator = await this.getContractCreator();
      const details = await this.getContractDetails();
      const confidence = this.determineConfidence(creator.creatorAddress, this.subjectAddress);

      const report = {
        gap: 1,
        timestamp: new Date().toISOString(),
        
        target: {
          factory: this.factoryAddress,
          subjectAddress: this.subjectAddress
        },

        factoryCreation: {
          creatorAddress: creator.creatorAddress,
          creationTxHash: creator.txHash,
          creationBlockNumber: creator.blockNumber,
          verified: true
        },

        contractDetails: {
          name: details.ContractName,
          compiler: details.CompilerVersion,
          optimizationEnabled: details.OptimizationUsed === '1',
          sourceCodeAvailable: !!details.SourceCode,
          deploymentTime: details.IsProxy === '1' ? 'Proxy contract' : 'Direct contract'
        },

        comparison: {
          factoryDeployer: creator.creatorAddress,
          investigationSubject: this.subjectAddress,
          match: this.normalizeAddress(creator.creatorAddress) === this.normalizeAddress(this.subjectAddress)
        },

        conclusion: {
          ...confidence,
          propositionAffected: 1,
          proposition1Status: confidence.confidence === 'HIGH' ? 'HIGH-confidence originator' : 'MEDIUM-confidence post-acquisition'
        },

        nextSteps: confidence.confidence === 'HIGH' 
          ? ['Proceed to Gap 2 (incidental result analysis)', 'Update casefile with Proposition 1 HIGH confidence']
          : ['Proceed to Gap 2 (incidental result analysis)', 'Update casefile with Proposition 1 MEDIUM confidence', 'Flag: Subject acquired control post-deployment']
      };

      return report;
    } catch (err) {
      return {
        gap: 1,
        timestamp: new Date().toISOString(),
        error: err.message,
        status: 'FAILED',
        recoverySteps: [
          'Verify ETHERSCAN_API_KEY is set correctly',
          'Check network connectivity',
          'Verify factory address is correct',
          'Try with alternative RPC provider'
        ]
      };
    }
  }

  /**
   * Save report to file
   */
  async saveReport(report) {
    const reportPath = path.join(__dirname, '../investigation/metadata/gaps/Gap-1-Findings.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    return reportPath;
  }

  /**
   * Print formatted report
   */
  printReport(report) {
    console.log('\n' + '='.repeat(70));
    console.log('GAP 1 RESOLUTION: FACTORY DEPLOYER VERIFICATION');
    console.log('='.repeat(70) + '\n');

    if (report.error) {
      console.log(`❌ ERROR: ${report.error}\n`);
      console.log('Recovery steps:');
      for (const step of report.recoverySteps) {
        console.log(`  - ${step}`);
      }
      return;
    }

    console.log('Factory Details:');
    console.log(`  Name: ${report.contractDetails.name}`);
    console.log(`  Compiler: ${report.contractDetails.compiler}`);
    console.log(`  Optimization: ${report.contractDetails.optimizationEnabled ? 'Enabled' : 'Disabled'}\n`);

    console.log('Creation Info:');
    console.log(`  Creator: ${report.factoryCreation.creatorAddress}`);
    console.log(`  TX Hash: ${report.factoryCreation.creationTxHash}`);
    console.log(`  Block: ${report.factoryCreation.creationBlockNumber}\n`);

    console.log('Comparison:');
    console.log(`  Factory Deployer: ${report.comparison.factoryDeployer}`);
    console.log(`  Subject Address:  ${report.comparison.investigationSubject}`);
    console.log(`  Match: ${report.comparison.match ? '✅ YES' : '❌ NO'}\n`);

    console.log('CONCLUSION:');
    console.log(`  Status: ${report.conclusion.status}`);
    console.log(`  Confidence: ${report.conclusion.confidence}`);
    console.log(`  Reasoning: ${report.conclusion.reasoning}`);
    console.log(`  Proposition 1: ${report.conclusion.proposition1Status}\n`);

    console.log('Next Steps:');
    for (const step of report.nextSteps) {
      console.log(`  ✓ ${step}`);
    }
    console.log('\n' + '='.repeat(70) + '\n');
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const factory = args.find(arg => arg.startsWith('--factory='))?.split('=')[1];
  const etherscanKey = args.find(arg => arg.startsWith('--etherscan-key='))?.split('=')[1];

  if (!etherscanKey && !process.env.ETHERSCAN_API_KEY) {
    console.error('\n❌ Error: ETHERSCAN_API_KEY not provided');
    console.error('Usage: ETHERSCAN_API_KEY=... node gap-1-factory-deployer.js [--factory=address]\n');
    process.exit(1);
  }

  const verifier = new Gap1FactoryDeployerVerifier({
    factoryAddress: factory,
    etherscanKey: etherscanKey || process.env.ETHERSCAN_API_KEY
  });

  try {
    const report = await verifier.generateReport();
    verifier.printReport(report);
    
    const filepath = await verifier.saveReport(report);
    console.log(`📄 Report saved to: ${filepath}\n`);

    process.exit(report.error ? 1 : 0);
  } catch (err) {
    console.error(`\n❌ Fatal error: ${err.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { Gap1FactoryDeployerVerifier };
