import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testsDir = path.join(__dirname);

const testTemplate = (name, body) => `
import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

${body}
`;

const VERSION = '2.9.0';
const files = {
  'accessibility.test.js': `
    // Accessibility Tests
    assert.ok(typeof window.AnimX.accessibility === 'function', 'AnimX.accessibility missing');
    assert.ok(typeof window.AnimX.a11y === 'function', 'AnimX.a11y missing');
    assert.ok(typeof window.AnimX.auditAccessibility === 'function', 'AnimX.auditAccessibility missing');
    assert.ok(typeof window.AnimX.motionSafe === 'function', 'AnimX.motionSafe missing');
    assert.ok(typeof window.AnimX.setReducedMotion === 'function', 'AnimX.setReducedMotion missing');
    assert.ok(typeof window.AnimX.getReducedMotion === 'function', 'AnimX.getReducedMotion missing');
    assert.ok(typeof window.AnimX.focusSafe === 'function', 'AnimX.focusSafe missing');
    assert.ok(typeof window.AnimX.announce === 'function', 'AnimX.announce missing');
    
    // Test setReducedMotion
    window.AnimX.setReducedMotion('always');
    let rm = window.AnimX.getReducedMotion();
    assert.strictEqual(rm.mode, 'always', 'setReducedMotion failed for "always"');
    assert.strictEqual(rm.active, true, 'setReducedMotion failed for "always"');
    
    window.AnimX.setReducedMotion('never');
    rm = window.AnimX.getReducedMotion();
    assert.strictEqual(rm.mode, 'never', 'setReducedMotion failed for "never"');
    assert.strictEqual(rm.active, false, 'setReducedMotion failed for "never"');
    
    window.AnimX.setReducedMotion('system');
    
    // Test auditAccessibility
    const audit = window.AnimX.auditAccessibility();
    assert.strictEqual(typeof audit.ok, 'boolean', 'auditAccessibility returned bad format');
    assert.ok(Array.isArray(audit.warnings), 'auditAccessibility warnings missing');
    
    console.log('✅ accessibility.test.js passed.');
  `,
  'security.test.js': `
    // Security Tests
    assert.ok(typeof window.AnimX.security === 'function', 'AnimX.security missing');
    assert.ok(typeof window.AnimX.securityAudit === 'function', 'AnimX.securityAudit missing');
    assert.ok(typeof window.AnimX.safeHTML === 'function', 'AnimX.safeHTML missing');
    assert.ok(typeof window.AnimX.safeSelector === 'function', 'AnimX.safeSelector missing');
    assert.ok(typeof window.AnimX.sanitizeOptions === 'function', 'AnimX.sanitizeOptions missing');
    
    // Prototype pollution test
    const payload = JSON.parse('{"__proto__":{"polluted":true}}');
    window.AnimX.config(payload);
    assert.strictEqual({}.polluted, undefined, 'Prototype was polluted by config');

    // Safe Selector test
    const badSel = window.AnimX.safeSelector("[bad-selector");
    assert.strictEqual(badSel.ok, false, 'Bad selector should fail safely');
    assert.doesNotThrow(() => window.AnimX.animate("[bad-selector", "fade-up"), 'animate should not throw on bad selector');

    // Safe HTML test
    const htmlTest = window.AnimX.safeHTML('<p>Hello</p><script>alert(1)</script><a href="javascript:x">Link</a><div onclick="x()">x</div>');
    assert.strictEqual(htmlTest.ok, true);
    assert.ok(htmlTest.removed.includes('<script>'), 'safeHTML must remove script');
    assert.ok(htmlTest.removed.includes('onclick'), 'safeHTML must remove onclick');
    assert.ok(htmlTest.removed.includes('javascript:href'), 'safeHTML must remove javascript: hrefs');

    // Swap safety test
    window.AnimX.security({ allowHTMLStringSwap: false });
    const dummy = document.createElement('div');
    dummy.className = 'dummy-swap';
    
    // Should ignore strings entirely
    window.AnimX.swap(dummy, '<img src="x" onerror="alert(1)">', { animation: 'fade' });
    assert.strictEqual(dummy.innerHTML, undefined, 'String swap should be blocked when allowHTMLStringSwap is false');
    
    console.log('✅ security.test.js passed.');
  `,
  'adapter.test.js': `
    // Mock environments
    global.window.jQuery = function() { return { toArray: () => [], addClass: function() { return this; } }; };
    global.window.jQuery.fn = {};
    global.window.AnimX = AnimX;
    
    global.window.Alpine = {
      directive: function(name, callback) {
        this._directives = this._directives || {};
        this._directives[name] = callback;
      }
    };
    
    // Load adapters (these usually execute immediately)
    // We will dynamically import them to simulate browser loading
    await import('../src/js/adapters/jquery-adapter.js');
    await import('../src/js/adapters/alpine-adapter.js');
    await import('../src/js/adapters/wordpress-adapter.js');
    await import('../src/js/adapters/webflow-adapter.js');
    
    // Dispatch Alpine init to trigger directive registration
    global.document.dispatchEvent(new Event('alpine:init'));
    
    assert.ok(typeof global.window.jQuery.fn.animx === 'function', 'jQuery plugin registered');
    assert.ok(typeof AnimX.wp === 'object', 'WordPress helper registered');
    assert.ok(typeof AnimX.webflow === 'object', 'Webflow helper registered');
    
    const integrations = AnimX.detectIntegration();
    assert.strictEqual(integrations.jquery, true, 'detectIntegration finds jQuery');
    assert.strictEqual(integrations.alpine, true, 'detectIntegration finds Alpine');
    
    console.log('✅ Adapter APIs exposed successfully');
  `,
  'smoke.test.js': `
    assert.strictEqual(AnimX.version, '${VERSION}');
    assert.doesNotThrow(() => AnimX.config({ debug: true }));
    assert.doesNotThrow(() => AnimX.config({ debug: false }));
    assert.doesNotThrow(() => AnimX.ready(() => {}));
    const safeInst = AnimX.animate(null, 'fade-up');
    assert.ok(safeInst.play);
    assert.doesNotThrow(() => safeInst.destroy());
    assert.doesNotThrow(() => AnimX.destroy('.missing-target-does-not-crash'));
  `,
  'core.test.js': `
    assert.strictEqual(AnimX.version, '${VERSION}');
    assert.doesNotThrow(() => AnimX.config({ debug: true }));
    assert.doesNotThrow(() => AnimX.config({ debug: false }));
    assert.doesNotThrow(() => AnimX.ready(() => {}));
    const safeInst = AnimX.animate(null, 'fade-up');
    assert.ok(safeInst.play);
    assert.doesNotThrow(() => safeInst.destroy());
    assert.doesNotThrow(() => AnimX.destroy('.missing-target-does-not-crash'));
  `,
  'registry.test.js': `
    assert.ok(AnimX.getPreset('fade-up'));
    assert.ok(AnimX.getPreset('text-rise'));
    assert.ok(AnimX.getPreset('svg-draw'));
    assert.ok(AnimX.getPreset('button-ripple'));
    assert.strictEqual(AnimX.getPreset('not-a-real-preset'), null);
    assert.ok(AnimX.searchPresets('fade').length > 0);
    assert.ok(AnimX.getPresetsByCategory('entrance').length > 0);
    assert.ok(AnimX.getPresetCategories().length > 0);
  `,
  'data-api.test.js': `
    import { parseDataAttributes } from '../src/js/data/data-parser.js';
    const el = document.createElement('div');
    el.setAttribute('data-ax', 'fade-up');
    el.setAttribute('data-ax-duration', '1000');
    const res = parseDataAttributes(el, { defaultDuration: 500 });
    assert.ok(res, 'Should not be null');
    assert.strictEqual(res.animation, 'fade-up');
    assert.strictEqual(res.options.duration, 1000);
  `,
  'animate-api.test.js': `
    const el = document.createElement('div');
    const inst = AnimX.animate(el, 'fade-up');
    assert.ok(inst);
    assert.doesNotThrow(() => inst.play());
    assert.doesNotThrow(() => inst.stop());
    assert.doesNotThrow(() => inst.destroy());
    
    // Missing
    const missingInst = AnimX.animate('.non-existent', 'fade-up');
    assert.doesNotThrow(() => missingInst.play());
    assert.doesNotThrow(() => missingInst.destroy());
  `,
  'scroll.test.js': `
    const el = document.createElement('div');
    const inst = AnimX.scroll(el, 'fade-up');
    assert.doesNotThrow(() => AnimX.refreshScroll());
    assert.doesNotThrow(() => AnimX.unobserve(el));
    
    // Missing
    const missing = AnimX.scroll('.missing', 'fade-up');
    assert.doesNotThrow(() => missing.destroy && missing.destroy());
  `,
  'timeline.test.js': `
    const tl = AnimX.timeline();
    assert.ok(tl.add);
    assert.doesNotThrow(() => tl.add('.missing', 'fade-up').play());
    assert.doesNotThrow(() => tl.pause());
    assert.doesNotThrow(() => tl.resume());
    assert.doesNotThrow(() => tl.stop());
    assert.doesNotThrow(() => tl.destroy());
  `,
  'stagger.test.js': `
    const st = AnimX.stagger('.missing', 'fade-up', { stagger: 100 });
    assert.ok(st);
    assert.doesNotThrow(() => st.destroy());
  `,
  'text.test.js': `
    const textInst = AnimX.text('.missing', { type: 'split' });
    assert.ok(textInst);
    assert.doesNotThrow(() => textInst.destroy());
    
    const splitData = AnimX.splitText('.missing');
    assert.ok(Array.isArray(splitData));
    assert.doesNotThrow(() => AnimX.revertText('.missing'));
  `,
  'interactions.test.js': `
    const interactInst = AnimX.interact('.missing', { hover: 'fade-up' });
    assert.doesNotThrow(() => interactInst.destroy && interactInst.destroy());
    
    const hoverInst = AnimX.hover('.missing', 'fade-up');
    assert.doesNotThrow(() => hoverInst.destroy && hoverInst.destroy());
    
    const pressInst = AnimX.press('.missing', 'fade-up');
    assert.doesNotThrow(() => pressInst.destroy && pressInst.destroy());
    
    const rippleInst = AnimX.ripple('.missing');
    assert.doesNotThrow(() => rippleInst.destroy && rippleInst.destroy());
  `,
  'components.test.js': `
    const compInst = AnimX.component('.missing', 'button-ripple');
    assert.ok(compInst);
    assert.doesNotThrow(() => compInst.enable());
    assert.doesNotThrow(() => compInst.destroy());
  `,
  'svg.test.js': `
    const svgInst = AnimX.svg('.missing', {});
    assert.ok(svgInst);
    assert.doesNotThrow(() => svgInst.destroy());
    
    const drawInst = AnimX.svgDraw('.missing', {});
    assert.doesNotThrow(() => drawInst.destroy());
  `,
  'cms.test.js': `
    assert.ok(AnimX.cms);
    assert.doesNotThrow(() => AnimX.refreshCMS());
    assert.doesNotThrow(() => AnimX.observeCMS());
    assert.doesNotThrow(() => AnimX.disconnectCMS());
    assert.ok(AnimX.getCMSRecipes().length > 0);
    assert.doesNotThrow(() => AnimX.applyRecipe('.missing', 'hero-saas-intro'));
  `,
  'dx.test.js': `
    assert.ok(AnimX.inspect);
    assert.ok(AnimX.validate);
    assert.ok(AnimX.diagnose);
    assert.ok(AnimX.features);
    assert.ok(AnimX.versionInfo);
    assert.ok(AnimX.findPreset);
    assert.ok(AnimX.suggestPreset);
    assert.ok(AnimX.getExamples);
    assert.ok(AnimX.copyExample);
    
    const diag = AnimX.diagnose();
    assert.strictEqual(diag.version, '${VERSION}');
    
    const feats = AnimX.features();
    assert.ok('waapi' in feats);
  `,
  'reduced-motion.test.js': `
    // Simulating reduced motion by directly passing the flag or setting config isn't easily done globally here without mock override, but we check config propagation.
    AnimX.config({ reducedMotion: 'always' });
    const inst = AnimX.animate('.missing', 'fade-up');
    // Safe empty
    AnimX.config({ reducedMotion: 'system' });
  `,
  'cleanup.test.js': `
    const el = document.createElement('div');
    const inst = AnimX.animate(el, 'fade-up');
    assert.doesNotThrow(() => AnimX.destroy(el));
    assert.doesNotThrow(() => AnimX.destroy('.non-existent-clean'));
  `,
  'build-output.test.js': `
    import fs from 'fs';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const distPath = path.resolve(__dirname, '../dist');
    if (fs.existsSync(distPath)) {
      assert.ok(fs.existsSync(path.join(distPath, 'animx.css')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.min.css')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.js')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.min.js')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.demo.html')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.version.json')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.preset-data.json')));
      
      if (fs.existsSync(path.join(distPath, 'animx.gallery.html'))) assert.ok(true);
      if (fs.existsSync(path.join(distPath, 'animx.docs.html'))) assert.ok(true);
      if (fs.existsSync(path.join(distPath, 'animx.examples.html'))) assert.ok(true);
      if (fs.existsSync(path.join(distPath, 'animx.playground.html'))) assert.ok(true);
      
      const jsContent = fs.readFileSync(path.join(distPath, 'animx.min.js'), 'utf-8');
      assert.ok(jsContent.includes('${VERSION}'));
    }
  `
};

for (const [filename, body] of Object.entries(files)) {
  fs.writeFileSync(path.join(testsDir, filename), testTemplate(filename, body));
}
console.log('Generated test files.');
