import assert from 'assert';
import fs from 'fs';
import path from 'path';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    console.log('[Tests] Running AnimX v3.41.0 Documentation Portal checks...');

    // 1. Version checks
    assert.strictEqual(AnimX.version, '3.41.0', 'AnimX.version should be 3.41.0');
    
    const info = AnimX.versionInfo();
    assert.strictEqual(info.version, '3.41.0', 'versionInfo version should match');
    assert.ok(info.release.includes('Demo Website UX Rebuild, React Mini-Site, Journey Landing, Playground Builder, and Documentation Portal'), 'versionInfo release string should contain Demo Website UX Rebuild, React Mini-Site, Journey Landing, Playground Builder, and Documentation Portal');

    // 2. Docs existence checks
    const docsPath = path.resolve(process.cwd(), 'docs');
    const requiredDocs = [
      'index.md',
      'quick-start.md',
      'installation.md',
      'public-api-reference.md',
      'data-attributes-reference.md',
      'preset-reference.md',
      'browser-support.md',
      'troubleshooting.md',
      'accessibility-guide.md',
      'reduced-motion-guide.md',
      'security-guide.md'
    ];

    for (const doc of requiredDocs) {
      const p = path.join(docsPath, doc);
      assert.ok(fs.existsSync(p), `Required doc ${doc} must exist`);
    }

    // 3. README check
    const readme = fs.readFileSync(path.resolve(process.cwd(), 'README.md'), 'utf8');
    assert.ok(readme.includes('3.41.0'), 'README.md must reflect version 3.41.0');

    console.log('[Tests] Documentation verification passed');
  } catch (err) {
    throw err;
  }
}

run();
