import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    console.log('[Tests] Running AnimX v3.41.0 Final Freeze verification...');

    // 1. Version Asserts
    assert.strictEqual(AnimX.version, '3.41.0', 'Global version must be exactly 3.41.0');
    assert.strictEqual(AnimX.versionInfo().version, '3.41.0', 'versionInfo version must be exactly 3.41.0');
    assert.strictEqual(
      AnimX.versionInfo().release,
      'Demo Website UX Rebuild, React Mini-Site, Journey Landing, Playground Builder, and Documentation Portal',
      'Release metadata must match milestone'
    );
    assert.strictEqual(AnimX.versionInfo().dependency, 'zero-runtime-dependency', 'Must be zero-dependency');

    // 2. Core Modules Intact
    assert.strictEqual(typeof AnimX.animate, 'function', 'animate() must exist');
    assert.strictEqual(typeof AnimX.timeline, 'function', 'timeline() must exist');
    assert.strictEqual(typeof AnimX.stagger, 'function', 'stagger() must exist');
    assert.strictEqual(typeof AnimX.packs, 'function', 'packs() must exist');
    assert.strictEqual(typeof AnimX.cms, 'function', 'cms() must exist');
    assert.strictEqual(typeof AnimX.compatReport, 'function', 'compatReport() must exist');

    // 3. No backward-compat breakage
    const vInfo = AnimX.versionInfo();
    assert.ok(vInfo.name === 'AnimX', 'name must be AnimX');
    assert.ok(typeof vInfo.features === 'object', 'features must be an object');

    console.log('[Tests] Final Freeze verification passed');
  } catch (err) {
    throw err;
  }
}

run();
