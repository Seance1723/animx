import './setup.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTests() {
  console.log('--- AnimX Test Runner ---');
  let passed = 0;
  let failed = 0;

  const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.test.js') && f !== 'smoke.test.js');
  
  // Always run smoke test last
  if (fs.existsSync(path.join(__dirname, 'smoke.test.js'))) {
    files.push('smoke.test.js',    './packs.test.js',
    './compat.test.js',
    './audit.test.js',
    './docs.test.js',
    './demo.test.js',
    './hardening.test.js',
    './rc.test.js',
    './patch.test.js',
    './freeze.test.js',
    './package.test.js');
  }

  for (const file of files) {
    console.log(`\n▶ Running ${file}...`);
    try {
      await import(`./${file}`);
      console.log(`✅ ${file} passed.`);
      passed++;
    } catch (e) {
      console.error(`❌ ${file} failed:\n`, e);
      failed++;
    }
  }

  console.log(`\n--- Test Summary ---`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
