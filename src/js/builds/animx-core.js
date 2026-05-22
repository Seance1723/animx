import '../../scss/builds/animx-core.scss';
import { getConfig, setConfig } from '../core/config.js';
import { normalizeSelector } from '../core/selector.js';
import { debug } from '../core/debug.js';
import { destroyInstances } from '../core/instance-registry.js';
import { toggleDebug, diagnose, features, versionInfo } from '../core/devtools.js';
import { inspect } from '../core/inspector.js';
import { validate } from '../core/validator.js';
import { registerPreset, getPreset, getPresets, getPresetsByCategory, searchPresets, getPresetTags } from '../presets/preset-registry.js';
import { findPreset, suggestPreset } from '../presets/preset-search-index.js';
import { cssPresets } from '../presets/css-presets.js';
import { isReducedMotion } from '../core/reduced-motion.js';
import { normalizeOptions } from '../core/animation-normalizer.js';
import { buildTransformAndFilter } from '../core/transform-builder.js';
import { AnimationInstance } from '../core/animation-instance.js';
import { createCSSDriver } from '../drivers/css-driver.js';
import { createWAAPIDriver } from '../drivers/waapi-driver.js';
import { createRAFDriver } from '../drivers/raf-driver.js';
import { initData, bindAnimX } from '../data/data-api.js';

const VERSION = '2.7.0';

// Pre-register basic CSS presets only
Object.values(cssPresets).forEach(preset => {
  registerPreset(preset.name, preset);
});

class AnimXCore {
  constructor() {
    this.version = VERSION;
    this._instances = new Set();
    this._initialized = false;
    bindAnimX(this);
    // Notice: Scroll, Timeline, Stagger, SVG, Layout, Gestures, CMS omitted for Core build.
  }

  config(options) {
    setConfig(options);
  }

  init() {
    if (this._initialized) return;
    this._initialized = true;
    debug.info(`AnimX v${this.version} (Core) Initialized.`);
    initData();
  }

  ready(callback) {
    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      callback();
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', callback);
    }
  }

  registerPreset(name, config) { return registerPreset(name, config); }
  getPreset(name) { return getPreset(name); }
  getPresets() { return getPresets(); }
  getPresetsByCategory(cat) { return getPresetsByCategory(cat); }
  searchPresets(query) { return searchPresets(query); }
  findPreset(query) { return findPreset(query); }
  suggestPreset(query) { return suggestPreset(query); }
  getPresetTags() { return getPresetTags(); }

  debug(enabled) { return toggleDebug(enabled); }
  inspect(selector) { return inspect(selector); }
  validate(scope) { return validate(scope); }
  diagnose() { 
    const diag = diagnose();
    diag.build = 'core';
    return diag; 
  }
  features() { return features(); }
  versionInfo() { return versionInfo(); }

  animate(selector, animationInput, options = {}) {
    if (!selector) return createSafeInstance();

    const elements = normalizeSelector(selector);
    const normOptions = normalizeOptions(options);

    if (isReducedMotion(normOptions)) {
      debug.warn('Reduced motion enabled, animation cancelled', elements);
      return createSafeInstance();
    }

    const drivers = elements.map(el => {
      if (typeof animationInput === 'string') {
        const preset = getPreset(animationInput);
        return preset ? createCSSDriver(el, preset, normOptions) : null;
      } else if (typeof animationInput === 'object' && animationInput.from && animationInput.to) {
        const keyframes = [
          buildTransformAndFilter(animationInput.from),
          buildTransformAndFilter(animationInput.to)
        ];
        return typeof el.animate === 'function' ? 
               createWAAPIDriver(el, keyframes, normOptions) : 
               createRAFDriver(el, keyframes, normOptions);
      }
      return null;
    }).filter(Boolean);

    const instance = new AnimationInstance(elements, drivers);
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

  replay() { this._instances.forEach(inst => inst.replay()); }
  reset() { this._instances.forEach(inst => inst.reset()); }

  stop(selector) {
    if (selector) {
      const elements = normalizeSelector(selector);
      elements.forEach(el => {
        this._instances.forEach(instance => {
          if (instance.elements.includes(el)) instance.stop();
        });
      });
    } else {
      this._instances.forEach(instance => instance.stop());
      this._instances.clear();
    }
  }

  destroy(selector) {
    this.stop(selector);
    if (selector) {
      const elements = normalizeSelector(selector);
      elements.forEach(el => {
        el.dataset.axState = '';
        el.classList.remove('ax-animating', 'ax-paused');
        destroyInstances(el);
      });
    } else {
      const allEls = document.querySelectorAll('[data-ax-state], .ax-animating, .ax-paused');
      allEls.forEach(el => {
        el.dataset.axState = '';
        el.classList.remove('ax-animating', 'ax-paused');
        destroyInstances(el);
      });
    }
  }
}

// Fallback safe instance
function createSafeInstance() {
  return { play: () => {}, pause: () => {}, stop: () => {}, destroy: () => {}, replay: () => {}, reset: () => {} };
}

const AnimX = new AnimXCore();
AnimX.build = { name: "core", version: VERSION, modules: ["core", "data"] };

if (typeof window !== 'undefined') {
  window.AnimX = AnimX;
  if (typeof document !== 'undefined') {
    const doAutoInit = () => {
      if (getConfig().autoInit) AnimX.init();
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doAutoInit);
    } else {
      doAutoInit();
    }
  }
}

export default AnimX;
