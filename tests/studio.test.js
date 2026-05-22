import assert from 'assert';

console.log('▶ Running studio.test.js...');

export async function run() {
  try {
    const AnimX = (await import('../src/js/animx.js')).default;
    
    // Check version
    assert.strictEqual(AnimX.build.version, '3.0.0', 'AnimX version should be 3.0.0');
    assert.strictEqual(AnimX.build.versionInfo().version, '3.0.0', 'versionInfo should be 3.0.0');
    assert.strictEqual(AnimX.build.versionInfo().release, 'AnimX Studio / Visual Builder', 'release name should match');
    
    // Check if studio shortcut exists
    assert.strictEqual(typeof AnimX.studio, 'function', 'AnimX.studio() should exist');
    
    console.log('✅ studio.test.js passed.');
  } catch (error) {
    console.error('❌ studio.test.js failed:', error);
    process.exit(1);
  }
}

run();
