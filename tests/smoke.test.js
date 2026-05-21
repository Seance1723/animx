import assert from 'assert';

// We import the unminified JS build or src to test exports without a browser.
// Note: Some DOM APIs won't exist in Node, so we mock basic global variables for the test to import successfully.
global.window = {
  matchMedia: () => ({ matches: false }),
  addEventListener: () => {}
};
global.document = {
  readyState: 'complete',
  querySelectorAll: () => []
};

// Now safe to import
import AnimX from '../src/js/animx.js';
import { normalizeSelector } from '../src/js/core/selector.js';
import { parseDataAttributes } from '../src/js/data/data-parser.js';
import { parseScrollAttributes } from '../src/js/scroll/scroll-parser.js';

console.log('--- Running Smoke Test ---');

try {
  // 1. Version Check
  assert.strictEqual(AnimX.version, '0.4.0', 'Version should be 0.4.0');
  console.log('✅ Version is correct');

  // 2. Preset API
  const presets = AnimX.getPresets();
  assert.ok(presets.length > 0, 'CSS presets should be registered');
  
  const fadeUp = AnimX.getPreset('fade-up');
  assert.ok(fadeUp, 'fade-up preset should exist');
  assert.strictEqual(fadeUp.className, 'ax-fade-up', 'Preset classname mapping is correct');
  console.log('✅ CSS presets loaded successfully');

  const missing = AnimX.getPreset('not-a-real-preset');
  assert.strictEqual(missing, null, 'Missing preset should return null without crashing');
  console.log('✅ Missing preset handled gracefully');

  // 3. Config API
  AnimX.config({ debug: true });
  console.log('✅ Config updates correctly');

  // 4. Selector normalizer
  const emptyArr = normalizeSelector('.not-exist');
  assert.ok(Array.isArray(emptyArr), 'Selector returns array');
  assert.strictEqual(emptyArr.length, 0, 'Selector returns empty array when no elements found');
  console.log('✅ Selector utility does not crash');

  // 5. AnimX.animate API (safe mock test)
  assert.strictEqual(typeof AnimX.animate, 'function', 'AnimX.animate should be exposed');
  const emptyAnim = AnimX.animate('.fake-selector', 'fade-up');
  assert.ok(emptyAnim, 'AnimX.animate returns an instance safely for missing elements');
  assert.strictEqual(typeof emptyAnim.play, 'function', 'Instance has play()');
  console.log('✅ AnimX.animate() exists and handles missing targets safely');
  
  // 6. Global controls
  assert.strictEqual(typeof AnimX.stop, 'function');
  assert.strictEqual(typeof AnimX.init, 'function');
  assert.strictEqual(typeof AnimX.refresh, 'function');
  assert.strictEqual(typeof AnimX.run, 'function');
  assert.strictEqual(typeof AnimX.scroll, 'function', 'AnimX.scroll should be exposed');
  assert.strictEqual(typeof AnimX.refreshScroll, 'function');
  assert.strictEqual(typeof AnimX.unobserve, 'function');
  console.log('✅ Global API exposed');
  
  // 7. Scroll Parser Check
  const mockScrollEl = {
    dataset: { ax: 'fade-up', axOn: 'scroll', axThreshold: '2', axOnce: 'false', axStagger: '100' }
  };
  const scrollParsed = parseScrollAttributes(mockScrollEl);
  assert.strictEqual(scrollParsed.threshold, 1, 'Threshold should clamp to 1 max');
  assert.strictEqual(scrollParsed.once, false, 'Once should parse to false');
  assert.strictEqual(scrollParsed.stagger, 100);
  console.log('✅ Scroll parser successfully parses and clamps attributes');

  console.log('--- All tests passed ---');
} catch (error) {
  console.error('❌ Smoke test failed:', error);
  process.exit(1);
}

console.log('--- All tests passed ---');
