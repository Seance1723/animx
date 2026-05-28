import assert from 'assert';
import fs from 'fs';
import path from 'path';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    console.log('[Tests] Running AnimX v3.41.0 Final Sign-Off verification...');

    // 1. Version
    assert.strictEqual(AnimX.version, '3.41.0', 'Version must be 3.41.0');
    assert.strictEqual(AnimX.versionInfo().version, '3.41.0', 'versionInfo version must be 3.41.0');
    assert.strictEqual(
      AnimX.versionInfo().release,
      'Demo Website UX Rebuild, React Mini-Site, Journey Landing, Playground Builder, and Documentation Portal',
      'Release must match milestone'
    );
    assert.strictEqual(AnimX.versionInfo().dependency, 'zero-runtime-dependency');

    // 2. Package.json
    const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'));
    assert.strictEqual(pkg.version, '3.41.0');
    assert.ok(pkg.main);
    assert.ok(pkg.browser);
    assert.ok(pkg.module);
    assert.ok(pkg.style);

    // 3. Core APIs intact
    assert.strictEqual(typeof AnimX.animate, 'function');
    assert.strictEqual(typeof AnimX.timeline, 'function');
    assert.strictEqual(typeof AnimX.stagger, 'function');
    assert.strictEqual(typeof AnimX.packs, 'function');
    assert.strictEqual(typeof AnimX.cms, 'function');
    assert.strictEqual(typeof AnimX.compatReport, 'function');
    assert.strictEqual(typeof AnimX.destroy, 'function');

    // 4. versionInfo structure
    const vi = AnimX.versionInfo();
    assert.ok(vi.name === 'AnimX');
    assert.ok(typeof vi.features === 'object');

    console.log('[Tests] Final Sign-Off verification passed');
  } catch (err) {
    throw err;
  }
}

run();
