import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    assert.strictEqual(AnimX.version, '3.15.0', 'Version should match package');
    assert.doesNotThrow(() => AnimX.config({ debug: true }));
    assert.doesNotThrow(() => AnimX.config({ debug: false }));
    assert.doesNotThrow(() => AnimX.ready(() => {}));
    const safeInst = AnimX.animate(null, 'fade-up');
    assert.ok(safeInst.play);
    assert.doesNotThrow(() => safeInst.destroy());
    assert.doesNotThrow(() => AnimX.destroy('.missing-target-does-not-crash'));

    // v3.15.0 Migration Hook Tests
    assert.strictEqual(typeof AnimX.migrateDataAttributes, 'function', 'migrateDataAttributes API should exist');

    // v3.15.0 Composer API Tests
    assert.strictEqual(typeof AnimX.compose, 'function', 'compose API should exist');
    assert.strictEqual(typeof AnimX.registerVariant, 'function', 'registerVariant API should exist');
    assert.strictEqual(typeof AnimX.validateChain, 'function', 'validateChain API should exist');

    const testVariant = { name: "test", effects: [{ type: "entrance", effect: "fade-up" }] };
    AnimX.registerVariant("test-variant", testVariant);
    const retrieved = AnimX.getVariant("test-variant");
    assert.strictEqual(retrieved.name, "test", "Should store and retrieve variants");

    const validation = AnimX.validateChain([
      { effect: "fade-up" },
      { effect: "card-lift" },
      { effect: "card-spotlight-hover" }
    ]);
    assert.strictEqual(validation.ok, true, "Valid chain should pass");

    console.log('[Tests] core API check passed');
    
  } catch (err) {
    throw e;
  }
}

run();
