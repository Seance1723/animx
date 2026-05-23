import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    assert.strictEqual(AnimX.version, '3.12.0', 'Version should match package');
    assert.doesNotThrow(() => AnimX.config({ debug: true }));
    assert.doesNotThrow(() => AnimX.config({ debug: false }));
    assert.doesNotThrow(() => AnimX.ready(() => {}));
    const safeInst = AnimX.animate(null, 'fade-up');
    assert.ok(safeInst.play);
    assert.doesNotThrow(() => safeInst.destroy());
    assert.doesNotThrow(() => AnimX.destroy('.missing-target-does-not-crash'));

    // v3.12.0 Migration Hook Tests
    assert.strictEqual(typeof AnimX.checkCompatibility, 'function', 'checkCompatibility should be a function');
    const compat = AnimX.checkCompatibility();
    assert.strictEqual(compat.ok, true, 'Core LTS Compatibility check should pass on standard init');
    
    assert.strictEqual(typeof AnimX.getDeprecations, 'function', 'getDeprecations should be a function');
    assert.ok(AnimX.getDeprecations().deprecations.length > 0, 'Deprecations map should not be empty');

  } catch (e) {
    throw e;
  }
}

run();
