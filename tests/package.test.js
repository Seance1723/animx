import assert from 'assert';
import fs from 'fs';
import path from 'path';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    console.log('[Tests] Running AnimX v3.39.0 Package Dry Run verification...');

    // 1. Version Asserts
    assert.strictEqual(AnimX.version, '3.39.0', 'Global version must be exactly 3.39.0');
    assert.strictEqual(AnimX.versionInfo().version, '3.39.0', 'versionInfo version must be exactly 3.39.0');
    assert.strictEqual(
      AnimX.versionInfo().release,
      'Final Package Dry Run, Distribution Audit, and Release Notes Lock',
      'Release metadata must match milestone'
    );
    assert.strictEqual(AnimX.versionInfo().dependency, 'zero-runtime-dependency', 'Must be zero-dependency');

    // 2. Package.json version check
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      assert.strictEqual(pkg.version, '3.39.0', 'package.json version must be 3.39.0');
      assert.ok(pkg.main, 'package.json must have main field');
      assert.ok(pkg.browser, 'package.json must have browser field');
      assert.ok(pkg.style, 'package.json must have style field');
    }

    // 3. Core APIs intact
    assert.strictEqual(typeof AnimX.animate, 'function', 'animate() must exist');
    assert.strictEqual(typeof AnimX.timeline, 'function', 'timeline() must exist');
    assert.strictEqual(typeof AnimX.stagger, 'function', 'stagger() must exist');
    assert.strictEqual(typeof AnimX.packs, 'function', 'packs() must exist');
    assert.strictEqual(typeof AnimX.cms, 'function', 'cms() must exist');

    console.log('[Tests] Package Dry Run verification passed');
  } catch (err) {
    throw err;
  }
}

run();
