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
    assert.strictEqual(AnimX.version, '3.42.0');
    assert.deepStrictEqual(AnimX.versionInfo(), {
      name: 'AnimX',
      version: '3.42.0',
      release: 'Advanced Text Reveal and Split Animation Pack',
      dependency: 'zero-runtime-dependency'
    });

    const expandedCount = AnimX.getPresets().length;
    assert.ok(expandedCount > 0, 'Registry should expand after standard initialization');

    // v3.26.0 Missing Effects tests
    const navLink = AnimX.getPreset('nav-link-underline-slide');
    assert.ok(navLink, 'Missing effects nav preset should be registered');
    assert.strictEqual(navLink.element, 'link');

    const modalPop = AnimX.getPreset('modal-pop');
    assert.ok(modalPop, 'Missing effects modal preset should be registered');
    assert.strictEqual(modalPop.category, 'entrance');

    const kpiRoll = AnimX.getPreset('kpi-number-roll');
    assert.ok(kpiRoll, 'Missing effects KPI preset should be registered');

    const registry = AnimX.getRegistry();
    assert.strictEqual(registry.version, '3.42.0');
    assert.ok(Array.isArray(registry.effects));
    assert.ok(registry.effects.length > 0, 'Animation registry should expose effects');

    const ids = registry.effects.map(effect => effect.id);
    assert.strictEqual(new Set(ids).size, ids.length, 'No duplicate effect ids');

    const statuses = new Set(['ready', 'experimental', 'needs-review', 'deprecated']);
    const families = new Set(['text', 'interaction', 'component', 'media', 'svg', 'scroll', 'page', 'background', 'data-ui', 'layout', 'gesture', 'physics', 'state', 'cms', 'utility']);
    const elements = new Set(['text', 'button', 'link', 'navigation', 'card', 'image', 'gallery', 'video', 'svg', 'icon', 'logo', 'background', 'form-input', 'modal', 'toast', 'tooltip', 'accordion', 'table-row', 'kpi-card', 'chart', 'section', 'page', 'cms-block', 'layout', 'gesture', 'utility']);

    registry.effects.forEach(effect => {
      assert.ok(statuses.has(effect.status), `Invalid status: ${effect.id}`);
      assert.ok(families.has(effect.family), `Invalid family: ${effect.id}`);
      assert.ok(elements.has(effect.element), `Invalid element: ${effect.id}`);
      if (effect.status === 'ready') {
        assert.ok(effect.implementation && effect.implementation.verified, `Ready effect must have implementation: ${effect.id}`);
        assert.ok(Object.values(effect.usageModes).some(Boolean), `Ready effect must have usage mode: ${effect.id}`);
        assert.ok(effect.reducedMotion && effect.reducedMotion.behavior, `Ready effect must have reduced motion: ${effect.id}`);
      }
      if (effect.playground.ready) {
        assert.ok(effect.playground.previewType, `Playground effect must have preview type: ${effect.id}`);
      }
      if (effect.fallback && effect.fallback.effect) {
        assert.ok(ids.includes(effect.fallback.effect), `Fallback must exist: ${effect.id}`);
      }
    });

    assert.ok(AnimX.getEffectsByElement('text').length > 0);
    assert.ok(AnimX.getEffectsByFamily('text').length > 0);
    assert.ok(AnimX.getEffectsByStatus('ready').length > 0);
    assert.ok(AnimX.searchEffects('mask').length > 0);
    assert.deepStrictEqual(AnimX.searchEffects(null), []);
    assert.deepStrictEqual(AnimX.getEffectsByElement(null), []);

    const matrix = AnimX.getCapabilityMatrix();
    assert.strictEqual(matrix.version, '3.42.0');
    assert.ok(matrix.elements.text);
    assert.ok(matrix.elements.button);
    assert.strictEqual(matrix.summary.totalEffects, registry.effects.length);

    const validation = AnimX.validateRegistry();
    assert.strictEqual(validation.version, '3.42.0');
    assert.strictEqual(validation.ok, true, validation.errors.join('\n'));

    console.log(`[Tests] Verified ${expandedCount} presets in registry, including v3.26.0 additions.`);
    
  } catch (err) {
    throw err;
  }
}

run();
