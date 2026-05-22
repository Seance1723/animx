import assert from 'assert';

// We import the unminified JS build or src to test exports without a browser.
// Note: Some DOM APIs won't exist in Node, so we mock basic global variables for the test to import successfully.
global.window = {
  matchMedia: () => ({ matches: false }),
  addEventListener: () => {},
  removeEventListener: () => {}
};
global.document = {
  readyState: 'complete',
  querySelectorAll: () => [],
  dispatchEvent: () => {},
  createElement: () => ({ classList: { add: () => {}, remove: () => {} }, getBoundingClientRect: () => ({left: 0, top: 0, width: 0, height: 0}), setAttribute: () => {}, appendChild: () => {}, textContent: '' }),
  createDocumentFragment: () => ({ appendChild: () => {} }),
  createTextNode: () => ({ nodeValue: '' }),
  body: { scrollHeight: 1000, offsetHeight: 1000, clientHeight: 1000 },
  documentElement: { scrollHeight: 1000, offsetHeight: 1000, clientHeight: 1000 }
};
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// Now safe to import
import AnimX from '../src/js/animx.js';
import { normalizeSelector } from '../src/js/core/selector.js';
import { parseDataAttributes } from '../src/js/data/data-parser.js';
import { parseScrollAttributes } from '../src/js/scroll/scroll-parser.js';

console.log('--- Running Smoke Test ---');

try {
  // 1. Basic API Presence & Version
  assert.strictEqual(AnimX.version, '1.4.0', 'Version should be 1.4.0');
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
  
  // 5.5 Repeated Init Safety
  AnimX.init();
  AnimX.init(); // Should not crash or double bind
  AnimX.refresh();
  AnimX.refresh(); // Should not crash
  console.log('✅ AnimX.init() and refresh() can be called multiple times safely');
  
  // 6. Global controls
  assert.strictEqual(typeof AnimX.stop, 'function');
  assert.strictEqual(typeof AnimX.init, 'function');
  assert.strictEqual(typeof AnimX.refresh, 'function');
  assert.strictEqual(typeof AnimX.run, 'function');
  assert.strictEqual(typeof AnimX.scroll, 'function', 'AnimX.scroll should be exposed');
  assert.strictEqual(typeof AnimX.refreshScroll, 'function');
  assert.strictEqual(typeof AnimX.unobserve, 'function');
  assert.strictEqual(typeof AnimX.timeline, 'function', 'AnimX.timeline should be exposed');
  assert.strictEqual(typeof AnimX.stagger, 'function', 'AnimX.stagger should be exposed');
  assert.strictEqual(typeof AnimX.text, 'function', 'AnimX.text should be exposed');
  assert.strictEqual(typeof AnimX.splitText, 'function', 'AnimX.splitText should be exposed');
  assert.strictEqual(typeof AnimX.revertText, 'function', 'AnimX.revertText should be exposed');
  assert.strictEqual(typeof AnimX.scrollProgress, 'function');
  assert.strictEqual(typeof AnimX.parallax, 'function');
  assert.strictEqual(typeof AnimX.pin, 'function');
  assert.strictEqual(typeof AnimX.scrollScene, 'function');
  assert.strictEqual(typeof AnimX.readingProgress, 'function');
  console.log('✅ Global API exposed');
  
  // 7. Timeline API Check
  const tl = AnimX.timeline();
  assert.strictEqual(typeof tl.add, 'function');
  assert.strictEqual(typeof tl.play, 'function');
  
  tl.add('.fake-target', 'fade-up');
  const steps = tl.getSteps();
  assert.strictEqual(steps.length, 1);
  assert.strictEqual(steps[0].target, '.fake-target');
  
  tl.play(); // Should not crash on missing targets
  tl.destroy(); // Should safely destroy empty timelines
  console.log('✅ Timeline initializes, chains, and destroys safely');
  
  // 8. Stagger Engine Check
  const staggerGroup = AnimX.stagger('.fake-stagger', 'fade-up', { each: 100 });
  assert.ok(staggerGroup, 'AnimX.stagger() returns a group instance');
  assert.strictEqual(typeof staggerGroup.play, 'function');
  assert.strictEqual(typeof staggerGroup.pause, 'function');
  assert.strictEqual(typeof staggerGroup.resume, 'function');
  assert.strictEqual(typeof staggerGroup.stop, 'function');
  assert.strictEqual(typeof staggerGroup.replay, 'function');
  assert.strictEqual(typeof staggerGroup.destroy, 'function');
  console.log('✅ Stagger Engine initializes safely on missing targets');
  
  const fakeNodes = [
    { nodeType: 1, classList: { add: () => {}, remove: () => {} }, getBoundingClientRect: () => ({left:0,top:0}), dispatchEvent: () => {}, addEventListener: () => {}, removeEventListener: () => {}, style: {} },
    { nodeType: 1, classList: { add: () => {}, remove: () => {} }, getBoundingClientRect: () => ({left:0,top:0}), dispatchEvent: () => {}, addEventListener: () => {}, removeEventListener: () => {}, style: {} }
  ];
  const routedGroup = AnimX.animate(fakeNodes, 'fade-up', { stagger: 100 });
  // It should route to stagger instead of returning single AnimationInstance
  assert.strictEqual(typeof routedGroup.resume, 'function', 'AnimX.animate options.stagger routes correctly');
  console.log('✅ AnimX.animate() stagger fallback routes correctly');
  
  // 9. Scroll Parser Check
  const mockScrollEl = {
    dataset: { ax: 'fade-up', axOn: 'scroll', axThreshold: '2', axOnce: 'false', axStagger: '100' }
  };
  const scrollParsed = parseScrollAttributes(mockScrollEl);
  assert.strictEqual(scrollParsed.threshold, 1, 'Threshold should clamp to 1 max');
  assert.strictEqual(scrollParsed.once, false, 'Once should parse to false');
  assert.strictEqual(scrollParsed.options.stagger.each, 100, 'Scroll stagger uses complex parser');
  console.log('✅ Scroll parser successfully parses and clamps attributes');

  // 10. Text Engine API Check
  const emptyText = AnimX.text('.fake-text', { split: 'chars' });
  assert.ok(emptyText, 'AnimX.text safely handles missing targets');
  
  const fakeTextNode = { 
    nodeType: 1, 
    nodeName: 'DIV',
    innerHTML: 'Hello', 
    textContent: 'Hello', 
    classList: { add: () => {}, remove: () => {} }, 
    setAttribute: () => {}, 
    removeAttribute: () => {},
    hasAttribute: () => false, 
    appendChild: () => {}, 
    dispatchEvent: () => {},
    childNodes: [],
    style: {},
    classList: { add: () => {}, remove: () => {} }
  };
  fakeTextNode.childNodes.push({ 
    nodeType: 3, 
    nodeValue: 'Hello', 
    parentNode: { replaceChild: () => {} } 
  });
  
  // Test Interactions System
  const testInteractions = () => {
    try {
      const hover = AnimX.hover('.fake-btn', 'ax-button-lift');
      if (hover && hover.length !== 0) throw new Error('Hover returned instances for fake selector');
      
      const magnetic = AnimX.magnetic('.fake-btn');
      if (magnetic && magnetic.length !== 0) throw new Error('Magnetic returned instances for fake selector');
      
      const feedback = AnimX.feedback('.fake-btn', 'error');
      if (feedback && feedback.length !== 0) throw new Error('Feedback returned instances for fake selector');

      // Test Component System
      const presets = AnimX.getComponentPresets();
      assert.ok(presets.button, 'Button presets exist');
      assert.ok(presets.button.includes('button-ripple'), 'button-ripple exists');
      assert.ok(presets.card.includes('card-lift'), 'card-lift exists');
      assert.ok(presets.modal.includes('modal-pop'), 'modal-pop exists');
      assert.ok(presets.toast.includes('toast-slide-right'), 'toast-slide-right exists');
      assert.ok(presets.form.includes('input-error-shake'), 'input-error-shake exists');
      assert.ok(presets.loader.includes('loader-spinner'), 'loader-spinner exists');
      assert.ok(presets.hero.includes('hero-fade-sequence'), 'hero-fade-sequence exists');

      const cats = AnimX.getPresetCategories();
      assert.ok(cats.includes('component'), 'Component category exists');

      // Test component routing handles missing preset safely
      const missing = AnimX.component('.fake-btn', 'invalid-component');
      assert.ok(missing && missing.elements.length === 0, 'AnimX.component safely handles missing presets and returns empty instance');

      console.log('✅ Component Engine and registry initializes safely');
      console.log('✅ Interactions initialize safely on missing targets');
    } catch (e) {
      console.error('❌ Component/Interactions Engine Error:', e.message);
      process.exit(1);
    }
  };
  testInteractions();

  const splitRes = AnimX.splitText([fakeTextNode], { split: 'chars' });
  assert.ok(splitRes, 'AnimX.splitText processes node gracefully');
  assert.strictEqual(typeof AnimX.revertText, 'function', 'AnimX.revertText parses gracefully');
  AnimX.revertText([fakeTextNode]);
  console.log('✅ Text Engine and WeakMap revert gracefully handles mocks');

  // 11. Advanced Scroll API Checks
  const fakeScrollNode = { 
    nodeType: 1, 
    classList: { add: () => {}, remove: () => {} },
    style: { setProperty: () => {}, removeProperty: () => {} },
    getBoundingClientRect: () => ({ left: 0, top: 0, height: 100, width: 100 })
  };
  
  const spInstance = AnimX.scrollProgress(fakeScrollNode, { y: [-100, 100] });
  assert.ok(spInstance, 'scrollProgress safely initializes');
  
  const pxInstance = AnimX.parallax(fakeScrollNode, { speed: 0.5 });
  assert.ok(pxInstance, 'parallax safely initializes');
  
  const pinInstance = AnimX.pin(fakeScrollNode, { end: '+=500' });
  assert.ok(pinInstance, 'pin safely initializes');
  
  const sceneInstance = AnimX.scrollScene(fakeScrollNode, { enter: 'fade-up' });
  assert.ok(sceneInstance, 'scrollScene safely initializes');
  
  const rpInstance = AnimX.readingProgress(fakeScrollNode);
  assert.ok(rpInstance, 'readingProgress safely initializes');
  
  // Validation for new text features
  assert.strictEqual(typeof AnimX.textSwap, 'function', 'textSwap() should exist');
  assert.strictEqual(typeof AnimX.ticker, 'function', 'ticker() should exist');
  assert.strictEqual(typeof AnimX.counter, 'function', 'counter() should exist');
  console.log('✅ New Text Engine features exposed');

  // SVG Pack
  assert.strictEqual(typeof AnimX.svg, 'function', 'svg() should exist');
  assert.strictEqual(typeof AnimX.svgDraw, 'function', 'svgDraw() should exist');
  assert.strictEqual(typeof AnimX.svgUndraw, 'function', 'svgUndraw() should exist');
  assert.strictEqual(typeof AnimX.svgProgress, 'function', 'svgProgress() should exist');
  assert.strictEqual(typeof AnimX.svgPathFollow, 'function', 'svgPathFollow() should exist');
  console.log('✅ SVG APIs exposed');
  
  // SVG Missing Node Crash Test
  const emptySvgDraw = AnimX.svgDraw('.missing-svg');
  assert.ok(emptySvgDraw, 'Missing SVG does not crash');
  assert.strictEqual(typeof emptySvgDraw.destroy, 'function');
  
  const emptySvgProg = AnimX.svgProgress('.missing-svg-prog');
  assert.ok(emptySvgProg, 'Missing SVG progress does not crash');
  assert.strictEqual(typeof emptySvgProg.destroy, 'function');
  
  const emptySvgPath = AnimX.svgPathFollow('.missing-svg-path', { path: '#missing-id' });
  assert.ok(emptySvgPath, 'Missing SVG path-follow does not crash');
  assert.strictEqual(typeof emptySvgPath.destroy, 'function');
  console.log('✅ SVG APIs handle missing targets gracefully');

  // SVG Data Parser Check
  const mockSvgEl = {
    dataset: { axSvg: 'draw', axDuration: '1000' },
    hasAttribute: (n) => false,
    getAttribute: (n) => n === 'data-ax-svg' ? 'draw' : (n === 'data-ax-duration' ? '1000' : null)
  };
  const parsedSvg = parseDataAttributes(mockSvgEl);
  assert.strictEqual(parsedSvg.isSvg, true);
  assert.strictEqual(parsedSvg.svgOptions.type, 'draw');
  assert.strictEqual(parsedSvg.svgOptions.duration, 1000);
  console.log('✅ Data parser successfully parses SVG attributes');

  AnimX.destroy(); // Ensure deep cleanup works without crashing
  console.log('✅ Safe Initialization and Teardown achieved');

  console.log('--- All tests passed ---');
} catch (error) {
  console.error('❌ Smoke test failed:', error);
  process.exit(1);
}
