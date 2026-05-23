import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    assert.strictEqual(AnimX.version, '3.14.0', 'Version should match package');
    assert.doesNotThrow(() => AnimX.config({ debug: true }));
    assert.doesNotThrow(() => AnimX.config({ debug: false }));
    assert.doesNotThrow(() => AnimX.ready(() => {}));
    const safeInst = AnimX.animate(null, 'fade-up');
    assert.ok(safeInst.play);
    assert.doesNotThrow(() => safeInst.destroy());
    assert.doesNotThrow(() => AnimX.destroy('.missing-target-does-not-crash'));

    // v3.14.0 Migration Hook Tests
    assert.strictEqual(typeof AnimX.migrateDataAttributes, 'function', 'migrateDataAttributes API should exist');

    // v3.14.0 API Tests
    assert.strictEqual(typeof AnimX.validateRuntime, 'function', 'validateRuntime API should exist');
    const runtimeReport = AnimX.validateRuntime();
    assert.strictEqual(typeof runtimeReport, 'object');
    assert.strictEqual(runtimeReport.version, '3.14.0', 'Runtime report should reflect current version');
    assert.ok(runtimeReport.checked.presets > 0, 'Runtime validator should check presets');

    console.log('[Tests] core API check passed');
    
  } catch (e) {
    throw e;
  }
}

run();
