import assert from 'assert';
import fs from 'fs';
import path from 'path';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    console.log('[Tests] Running AnimX v3.42.0 Final Stable Sign-Off verification...');

    // 1. Version Asserts
    assert.strictEqual(AnimX.version, '3.42.0', 'Global version must be exactly 3.42.0');
    assert.strictEqual(AnimX.versionInfo().version, '3.42.0', 'versionInfo version must be exactly 3.42.0');
    assert.strictEqual(
      AnimX.versionInfo().release,
      'Advanced Text Reveal and Split Animation Pack',
      'Release metadata must match milestone'
    );
    assert.strictEqual(AnimX.versionInfo().dependency, 'zero-runtime-dependency', 'Must be zero-dependency');

    // 2. Package.json version check
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      assert.strictEqual(pkg.version, '3.42.0', 'package.json version must be 3.42.0');
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

    // 4. Signoff API (v3.42.0)
    assert.strictEqual(typeof AnimX.signoff, 'function', 'signoff() must exist');
    const signoffResult = AnimX.signoff();
    assert.ok(signoffResult.stableSignoff, 'signoff must have stableSignoff');
    assert.ok(signoffResult.goNoGo, 'signoff must have goNoGo');
    assert.ok(signoffResult.v4Gate, 'signoff must have v4Gate');
    assert.strictEqual(signoffResult.stableSignoff.version, '3.42.0', 'signoff version must be 3.42.0');
    assert.strictEqual(signoffResult.goNoGo.decision, 'go', 'go/no-go decision must be go');
    assert.strictEqual(signoffResult.v4Gate.canReleaseV4, false, 'canReleaseV4 must be false');
    assert.strictEqual(signoffResult.v4Gate.nextVersion, '3.43.0', 'next version must be 3.43.0');

    // 5. Version must NOT be 4.0.0
    assert.notStrictEqual(AnimX.version, '4.0.0', 'Must not jump to v4.0.0');

    console.log('[Tests] Final Stable Sign-Off verification passed');
  } catch (err) {
    throw err;
  }
}

run();
