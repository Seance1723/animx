import AnimX from '../src/js/animx.js';
import { normalizeSelector } from '../src/js/core/selector.js';
import { getConfig } from '../src/js/core/config.js';

console.log('--- Running Smoke Test ---');

// Test 1: Version exists
if (AnimX.version === '0.0.1') {
  console.log('✅ Version is correct');
} else {
  console.error('❌ Version is incorrect');
  process.exit(1);
}

// Test 2: Registry works
AnimX.registerPreset('test-preset', { type: 'placeholder' });
const preset = AnimX.getPreset('test-preset');
if (preset && preset.type === 'placeholder') {
  console.log('✅ Registry works');
} else {
  console.error('❌ Registry failed');
  process.exit(1);
}

// Test 3: Config works
AnimX.config({ debug: true });
if (getConfig().debug === true) {
  console.log('✅ Config updates correctly');
} else {
  console.error('❌ Config failed');
  process.exit(1);
}

// Test 4: Selector does not crash
try {
  normalizeSelector('.test');
  console.log('✅ Selector utility does not crash');
} catch (e) {
  console.error('❌ Selector utility crashed', e);
  process.exit(1);
}

console.log('--- All tests passed ---');
