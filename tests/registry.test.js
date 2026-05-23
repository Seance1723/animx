import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    const baseCount = AnimX.getPresets().length;
    
    assert.ok(AnimX.getPreset('fade-up'));
    assert.ok(AnimX.getPreset('text-rise'));
    assert.ok(AnimX.getPreset('svg-draw'));
    assert.ok(AnimX.getPreset('button-ripple'));
    assert.strictEqual(AnimX.getPreset('not-a-real-preset'), null);
    assert.ok(AnimX.searchPresets('fade').length > 0);
    assert.ok(AnimX.getPresetsByCategory('entrance').length > 0);
    assert.ok(AnimX.getPresetCategories().length > 0);

    const expandedCount = AnimX.getPresets().length;
    assert.ok(expandedCount > 0, 'Registry should expand after standard initialization');

    // v3.14.0 Missing Effects tests
    const navLink = AnimX.getPreset('nav-link-underline-slide');
    assert.ok(navLink, 'Missing effects nav preset should be registered');
    assert.strictEqual(navLink.element, 'link');

    const modalPop = AnimX.getPreset('modal-pop');
    assert.ok(modalPop, 'Missing effects modal preset should be registered');
    assert.strictEqual(modalPop.category, 'entrance');

    const kpiRoll = AnimX.getPreset('kpi-number-roll');
    assert.ok(kpiRoll, 'Missing effects KPI preset should be registered');

    console.log(`[Tests] Verified ${expandedCount} presets in registry, including v3.14.0 additions.`);
    
  } catch (err) {
    throw err;
  }
}

run();
