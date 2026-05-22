import assert from 'assert';
import { validateExport } from '../src/js/studio/studio-export-validator.js';
import { getProjectState, setProjectState } from '../src/js/studio/studio-project-state.js';

console.log('▶ Running studio.test.js...');

export async function run() {
  try {
    const AnimX = (await import('../src/js/animx.js')).default;
    
    // Check version
    assert.strictEqual(AnimX.build.version, '3.2.0', 'AnimX version should be 3.2.0');
    assert.strictEqual(AnimX.build.versionInfo().version, '3.2.0', 'versionInfo should be 3.2.0');
    assert.strictEqual(AnimX.build.versionInfo().release, 'Studio Workflow Automation and Project Presets', 'release name should match');
    
    // Check if studio shortcut exists
    assert.strictEqual(typeof AnimX.studio, 'function', 'AnimX.studio() should exist');
    
    // Check Export Validator
    const safeCheck = validateExport('<div class="ax-fade">Hello</div>');
    assert.strictEqual(safeCheck.ok, true, 'Safe string should pass validation');
    
    const unsafeCheck = validateExport('<div class="ax-fade">Hello<script>alert(1)</script></div>');
    assert.strictEqual(unsafeCheck.ok, false, 'Unsafe string should fail validation');
    
    // Check Project State defaults
    const state = getProjectState();
    assert.strictEqual(state.version, '3.2.0', 'Project state should default to 3.2.0');
    assert.strictEqual(state.motionStyle, 'smooth-professional', 'Default motion style should be smooth-professional');
    assert.strictEqual(state.sections.length, 0, 'Should start with no sections');
    
    console.log('✅ studio.test.js passed.');
  } catch (error) {
    console.error('❌ studio.test.js failed:', error);
    process.exit(1);
  }
}

run();
