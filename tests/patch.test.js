import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    console.log('[Tests] Running AnimX v3.42.0 RC Issue Fix and Regression checks...');

    // 1. Version Asserts
    assert.strictEqual(AnimX.version, '3.42.0', 'Global version must be exactly 3.42.0');
    assert.strictEqual(AnimX.versionInfo().version, '3.42.0', 'versionInfo version must be exactly 3.42.0');
    assert.strictEqual(AnimX.versionInfo().release, 'Advanced Text Reveal and Split Animation Pack', 'Release metadata must match milestone');
    
    // 2. Core Modules Intact
    assert.strictEqual(typeof AnimX.animate, 'function', 'animate() must exist');
    assert.strictEqual(typeof AnimX.timeline, 'function', 'timeline() must exist');
    assert.strictEqual(typeof AnimX.stagger, 'function', 'stagger() must exist');
    
    // 3. New Modules Intact
    assert.strictEqual(typeof AnimX.packs, 'function', 'packs() must exist');
    assert.strictEqual(typeof AnimX.cms, 'function', 'cms() must exist');
    assert.strictEqual(typeof AnimX.compatReport, 'function', 'compat API must exist');

    console.log('[Tests] RC Patch Verification passed');
  } catch (err) {
    throw err;
  }
}

run();
