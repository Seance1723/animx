import { getConfig, setConfig } from './core/config.js';
import { normalizeSelector } from './core/selector.js';
import { debug } from './core/debug.js';
import { createSafeInstance } from './core/safe-instance.js';
import { performanceMonitor } from './core/performance-monitor.js';
import { destroyInstances, clearInstances } from './core/instance-registry.js';
import { toggleDebug, diagnose, features, versionInfo, productionCheck } from './core/devtools.js';
import { inspect } from './core/inspector.js';
import { validate } from './core/validator.js';
import { getExamples, copyExample } from './core/example-builder.js';
import { registerPreset, getPreset, getPresets, getComponentPresets, getPresetCategories, getPresetsByCategory, searchPresets, getPresetTags } from './presets/preset-registry.js';
import { findPreset, suggestPreset } from './presets/preset-search-index.js';
import { cssPresets } from './presets/css-presets.js';
import { componentPresets } from './components/component-presets.js';
import { expandedPresets } from './presets/expanded-presets.js';
import { elementPresets } from './presets/element-presets.js'; // v3.14.0

import { accessibility, motionSafe } from './accessibility/accessibility-api.js';
import { setReducedMotion, getReducedMotion } from './accessibility/accessibility-state.js';
import { focusSafe } from './accessibility/focus-safety.js';
import { announce, createLiveRegion } from './accessibility/live-region.js';
import { auditAccessibility } from './accessibility/accessibility-audit.js';

import { security } from './security/security-api.js';
import { securityAudit } from './security/security-audit.js';
import { safeHTML } from './security/safe-html.js';
import { safeSelector } from './security/safe-selector.js';
import { sanitizeOptions } from './security/safe-options.js';

import { normalizeOptions } from './core/animation-normalizer.js';
import { buildTransformAndFilter } from './core/transform-builder.js';
import { AnimationInstance } from './core/animation-instance.js';
import { createCSSDriver } from './drivers/css-driver.js';
import { createWAAPIDriver } from './drivers/waapi-driver.js';
import { createRAFDriver } from './drivers/raf-driver.js';

import { initData, refreshData, runData, bindAnimX } from './data/data-api.js';
import { observeScroll, refreshScroll, unobserveScroll } from './scroll/scroll-api.js';
import { bindScrollAnimX } from './scroll/scroll-observer.js';
import { Timeline, bindTimelineAnimX } from './timeline/timeline.js';
import { stagger, bindStaggerAnimX } from './stagger/stagger.js';
import { text, splitText, revertText, bindTextAnimX } from './text/text-api.js';
import { interact, hover, press, focus, magnetic, ripple, tilt, feedback, bindInteractionAnimX, destroyInteractions } from './interactions/interaction-api.js';
import { component, bindComponentAnimX } from './components/component-api.js';
import { scrollProgress, parallax, pin, scrollScene, readingProgress, destroyAdvancedScroll } from './scroll/advanced-scroll-api.js';
import { bindScrollSceneAnimX } from './scroll/scroll-scene.js';
import { refreshScrollMetrics, clearScrollTicker } from './scroll/scroll-ticker.js';
import { svg, svgDraw, svgUndraw, svgProgress, svgPathFollow, bindSvgAnimX, destroySvg } from './svg/svg-api.js';
import { cms, refreshCMS, observeCMS, disconnectCMS, getCMSRecipes, applyRecipe, bindCMSApi } from './cms/cms-api.js';
import { bindLayoutAnimX } from './layout/layout-api.js';
import { layoutPresets } from './layout/layout-presets.js';
import { bindGestureAnimX } from './gestures/gesture-api.js';
import { gesturePresets } from './gestures/gesture-presets.js';
import { cmsRecipes312 } from './cms/cms-recipes-v3-12.js'; // v3.14.0

// v3.14.0 Migration APIs
import { checkCompatibility } from './migration/compatibility-checker.js';
import { getDeprecations } from './migration/deprecation-checker.js';
import { migrateDataAttributes } from './migration/data-attribute-migrator.js';

// v3.14.0 Runtime Validation APIs
import { validateRuntime } from './runtime/runtime-validator.js';

const VERSION = '3.14.0';

// Optional Studio shortcut
export function studio() {
  if (typeof window !== 'undefined') {
    if (window.location.pathname.includes('animx.studio.html')) {
      console.log('[AnimX] Studio is already running.');
      return;
    }
    const currentUrl = window.location.href;
    const basePath = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
    console.log('[AnimX] Launching AnimX Studio...');
    window.location.href = `${basePath}/animx.studio.html`;
  }
}

// Pre-register all presets
[...Object.values(cssPresets), ...componentPresets, ...expandedPresets, ...layoutPresets, ...Object.values(gesturePresets), ...elementPresets, ...cmsRecipes312].forEach(preset => {
  registerPreset(preset.name, preset);
});

class AnimXCore {
  constructor() {
    this.version = VERSION;
    this._instances = new Set();
    this._initialized = false;
    bindAnimX(this);
    bindScrollAnimX(this);
    bindTimelineAnimX(this);
    bindStaggerAnimX(this);
    bindTextAnimX(this);
    bindInteractionAnimX(this);
    bindComponentAnimX(this);
    bindScrollSceneAnimX(this);
    bindSvgAnimX(this);
    bindCMSApi(this);
    bindLayoutAnimX(this);
    bindGestureAnimX(this);
  }

  config(options) {
    if (options) {
      setConfig(options);
    }
    return getConfig();
  }

  // Accessibility APIs
  accessibility(options) {
    return accessibility(options);
  }
  
  a11y(options) {
    return accessibility(options);
  }
  
  auditAccessibility() {
    return auditAccessibility();
  }
  
  motionSafe(onSafe, onReduced) {
    return motionSafe(onSafe, onReduced);
  }
  
  setReducedMotion(mode) {
    return setReducedMotion(mode);
  }
  
  getReducedMotion() {
    return getReducedMotion();
  }
  
  focusSafe(selector, options) {
    return focusSafe(selector, options);
  }
  
  announce(message, options) {
    return announce(message, options);
  }
  
  createLiveRegion(options) {
    return createLiveRegion(options);
  }

  // Security APIs
  security(options) {
    return security(options);
  }

  securityAudit() {
    return securityAudit();
  }

  safeHTML(htmlString) {
    return safeHTML(htmlString);
  }

  safeSelector(selectorString) {
    return safeSelector(selectorString);
  }

  sanitizeOptions(options) {
    return sanitizeOptions(options);
  }

  productionCheck() {
    return productionCheck();
  }

  init() {
    if (this._initialized) return;
    this._initialized = true;
    debug.info(`AnimX v${this.version} Initialized.`);
    
    const conf = getConfig();
    if (conf.cms && conf.cms.autoScan) {
      cms(document, { observe: conf.cms.observe });
    } else {
      initData();
    }
    refreshScroll();
  }

  ready(callback) {
    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      callback();
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', callback);
    }
  }

  registerPreset(name, config) {
    return registerPreset(name, config);
  }

  getPreset(name) {
    return getPreset(name);
  }

  getPresets() {
    return getPresets();
  }
  
  getPresetsByCategory(category) {
    return getPresetsByCategory(category);
  }
  
  searchPresets(query) {
    return searchPresets(query);
  }
  
  findPreset(query) {
    return findPreset(query);
  }
  
  suggestPreset(query) {
    return suggestPreset(query);
  }
  
  getPresetTags() {
    return getPresetTags();
  }

  // DX APIs
  debug(enabled) {
    return toggleDebug(enabled);
  }
  
  inspect(selector) {
    return inspect(selector);
  }
  
  validate(scope) {
    return validate(scope);
  }
  
  diagnose() {
    return diagnose();
  }
  
  productionCheck() {
    return productionCheck();
  }
  
  features() {
    return features();
  }
  
  detectIntegration() {
    return {
      jquery: typeof window !== 'undefined' && !!window.jQuery,
      wordpress: typeof window !== 'undefined' && (!!window.wp || document.body?.classList.contains('wp-admin') || document.body?.classList.contains('block-editor-page')),
      webflow: typeof window !== 'undefined' && !!window.Webflow,
      alpine: typeof window !== 'undefined' && !!window.Alpine,
      react: 'not-detectable',
      vue: 'not-detectable'
    };
  }
  
  versionInfo() {
    return versionInfo();
  }

  // --- Core API Bindings ---
  
  // v3.14.0 Migration APIs
  checkCompatibility() {
    return checkCompatibility();
  }

  getDeprecations() {
    return getDeprecations();
  }

  migrateDataAttributes(node, options) {
    return migrateDataAttributes(node, options);
  }

  // v3.14.0 Runtime Validation APIs
  validateRuntime() {
    return validateRuntime();
  }

  // Expose SVG Morph
  svgMorph(target, options) { return this._svgMorph(target, options); }
  morphPath(target, toPathSelector, options) { return this._morphPath(target, toPathSelector, options); }
  morphShape(target, toTarget, options) { return this._morphShape(target, toTarget, options); }
  morphIcon(target, options) { return this._morphIcon(target, options); }
  validateMorph(fromStr, toStr) { return this._validateMorph(fromStr, toStr); }
  normalizePath(pathStr) { return this._normalizePath(pathStr); }
  refreshMorphs(target) { return this._refreshMorphs(target); }
  destroyMorphs(target) { return this._destroyMorphs(target); }
  svgMorph(target, options) { return this._svgMorph(target, options); }
  morphPath(target, toPathSelector, options) { return this._morphPath(target, toPathSelector, options); }
  morphShape(target, toTarget, options) { return this._morphShape(target, toTarget, options); }
  morphIcon(target, options) { return this._morphIcon(target, options); }
  validateMorph(fromStr, toStr) { return this._validateMorph(fromStr, toStr); }
  normalizePath(pathStr) { return this._normalizePath(pathStr); }
  refreshMorphs(target) { return this._refreshMorphs(target); }
  destroyMorphs(target) { return this._destroyMorphs(target); }
  
  getExamples(presetName) {
    return getExamples(presetName);
  }
  
  copyExample(presetName, type) {
    return copyExample(presetName, type);
  }

  // CMS / No-Code APIs
  cms(root, options) {
    return cms(root, options);
  }

  refreshCMS(root) {
    return refreshCMS(root);
  }

  observeCMS(root, options) {
    return observeCMS(root, options);
  }

  disconnectCMS() {
    return disconnectCMS();
  }

  getCMSRecipes() {
    return getCMSRecipes();
  }

  applyRecipe(target, recipeName) {
    return applyRecipe(target, recipeName);
  }

  refresh(root) {
    performanceMonitor.trackRefresh();
    refreshData(root);
    refreshScroll(root);
    refreshScrollMetrics();
  }
  
  refreshScroll(root) {
    refreshScroll(root);
    refreshScrollMetrics();
  }

  run(target) {
    runData(target);
  }
  
  scroll(target, options) {
    return observeScroll(target, options);
  }
  
  scrollProgress(target, options) {
    return scrollProgress(target, options);
  }
  
  parallax(target, options) {
    return parallax(target, options);
  }
  
  pin(target, options) {
    return pin(target, options);
  }
  
  scrollScene(target, options) {
    return scrollScene(target, options);
  }
  
  readingProgress(target, options) {
    return readingProgress(target, options);
  }
  
  unobserve(target) {
    unobserveScroll(target);
  }
  
  timeline(options) {
    return new Timeline(options);
  }
  
  stagger(targets, animationInput, options) {
    return stagger(targets, animationInput, options);
  }
  
  text(targets, options) {
    return text(targets, options);
  }
  
  splitText(targets, options) {
    return splitText(targets, options);
  }
  
  revertText(targets) {
    return revertText(targets);
  }
  
  textSwap(targets, options) {
    return text(targets, { ...options, type: 'swap' });
  }

  ticker(targets, options) {
    return text(targets, { ...options, type: 'ticker' });
  }

  counter(targets, options) {
    return text(targets, { ...options, type: 'counter' });
  }
  
  interact(targets, options) {
    return interact(targets, options);
  }
  
  hover(targets, animationOrOptions, options) {
    return hover(targets, animationOrOptions, options);
  }
  
  press(targets, animationOrOptions, options) {
    return press(targets, animationOrOptions, options);
  }
  
  focus(targets, animationOrOptions, options) {
    return focus(targets, animationOrOptions, options);
  }
  
  magnetic(targets, options) {
    return magnetic(targets, options);
  }
  
  ripple(targets, options) {
    return ripple(targets, options);
  }
  
  tilt(targets, options) {
    return tilt(targets, options);
  }
  
  feedback(targets, type, options) {
    return feedback(targets, type, options);
  }

  component(targets, presetName, options) {
    return component(targets, presetName, options);
  }

  svg(targets, options) {
    return svg(targets, options);
  }

  svgDraw(targets, options) {
    return svgDraw(targets, options);
  }

  svgUndraw(targets, options) {
    return svgUndraw(targets, options);
  }

  svgProgress(targets, options) {
    return svgProgress(targets, options);
  }

  svgPathFollow(targets, options) {
    return svgPathFollow(targets, options);
  }

  getComponentPresets() {
    return getComponentPresets();
  }

  getPresetCategories() {
    return getPresetCategories();
  }

  animate(selector, animationInput, options = {}) {
    const elements = normalizeSelector(selector);
    
    if (elements.length === 0) {
      if (options.debug || getConfig().debug) {
        debug.warn('AnimX.animate(): No targets found for selector', selector);
      }
      return createSafeInstance(elements);
    }
    
    // Route to stagger if multiple elements and stagger option exists
    if (elements.length > 1 && options.stagger && !options._isStaggerChild) {
      return this.stagger(elements, animationInput, options);
    }

    const normOptions = normalizeOptions(options);
    const useReduced = isReducedMotion();

    if (useReduced) {
      normOptions.duration = 1;
      normOptions.delay = 0;
    }

    const drivers = elements.map(el => {
      // 1. String Preset (CSS Driver)
      if (typeof animationInput === 'string') {
        const preset = getPreset(animationInput);
        if (preset) {
          return createCSSDriver(el, preset, normOptions, null); // Will assign instance below
        } else {
          log(`Preset '${animationInput}' not found.`);
          return null;
        }
      } 
      // 2. Custom JS Object (WAAPI or RAF Driver)
      else if (typeof animationInput === 'object' && animationInput.from && animationInput.to) {
        const fromFrame = buildTransformAndFilter(animationInput.from);
        const toFrame = buildTransformAndFilter(animationInput.to);
        const keyframes = [fromFrame, toFrame];
        
        if (typeof el.animate === 'function') {
          return createWAAPIDriver(el, keyframes, normOptions, null);
        } else {
          return createRAFDriver(el, keyframes, normOptions, null);
        }
      }
      return null;
    }).filter(Boolean);

    const instance = new AnimationInstance(elements, drivers);
    // Bind instance reference to drivers so they can report status back
    drivers.forEach(d => {
       // A bit of a hack to share instance status logic backward if we had complex events.
       // In our drivers, we passed `instance` as a parameter. Wait, we passed null above!
       // Let's fix that wrapper injection:
    });

    // Re-create drivers with the actual instance reference injected
    const boundDrivers = elements.map(el => {
      if (typeof animationInput === 'string') {
        const preset = getPreset(animationInput);
        return preset ? createCSSDriver(el, preset, normOptions, instance) : null;
      } else if (typeof animationInput === 'object' && animationInput.from && animationInput.to) {
        const keyframes = [
          buildTransformAndFilter(animationInput.from),
          buildTransformAndFilter(animationInput.to)
        ];
        return typeof el.animate === 'function' ? 
               createWAAPIDriver(el, keyframes, normOptions, instance) : 
               createRAFDriver(el, keyframes, normOptions, instance);
      }
    }).filter(Boolean);

    instance.drivers = boundDrivers;
    this._instances.add(instance);
    
    instance.play();
    return instance;
  }

  // Global Controls
  replay() {
    this._instances.forEach(inst => inst.replay());
  }

  reset() {
    this._instances.forEach(inst => inst.reset());
  }

  stop(selector) {
    if (selector) {
      const elements = normalizeSelector(selector);
      elements.forEach(el => {
        this._instances.forEach(instance => {
          if (instance.elements.includes(el)) instance.stop();
        });
      });
      destroyInteractions(selector);
      destroyAdvancedScroll(selector);
      destroySvg(selector);
    } else {
      this._instances.forEach(instance => instance.stop());
      this._instances.clear();
      destroyInteractions(document.body);
      destroyAdvancedScroll(document.body);
      destroySvg(document.body);
      clearScrollTicker();
    }
  }

  destroy(selector) {
    this.stop(selector);
    // Remove initialization marks and destroy instances
    if (selector) {
      const elements = normalizeSelector(selector);
      elements.forEach(el => {
        el.dataset.axState = '';
        el.classList.remove('ax-animating', 'ax-paused');
        destroyInstances(el);
      });
    } else {
      // Destroy all
      const allEls = document.querySelectorAll('[data-ax-state], .ax-animating, .ax-paused');
      allEls.forEach(el => {
        el.dataset.axState = '';
        el.classList.remove('ax-animating', 'ax-paused');
        destroyInstances(el);
      });
    }
  }
}

const AnimX = new AnimXCore();
AnimX.studio = studio;
AnimX.build = {
  name: 'full',
  version: VERSION,
  versionInfo: () => ({
      name: "AnimX",
      version: "3.14.0",
      release: "Real-World Animation Pattern Library and Industry Demo Packs",
      dependency: "zero-runtime-dependency"
    }),
  modules: ['core', 'data', 'scroll', 'timeline', 'stagger', 'text', 'interactions', 'components', 'advanced-scroll', 'svg', 'cms', 'layout', 'gestures']
};

if (typeof window !== 'undefined') {
  window.AnimX = AnimX;
  
  if (typeof document !== 'undefined') {
    // Auto initialization
    const doAutoInit = () => {
      const conf = getConfig();
      if (conf.autoInit) AnimX.init();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doAutoInit);
    } else {
      doAutoInit();
    }
  }
}

export default AnimX;
