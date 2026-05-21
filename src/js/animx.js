import { getConfig, setConfig } from './core/config.js';
import { normalizeSelector } from './core/selector.js';
import { log } from './core/utils.js';
import { registerPreset, getPreset, getPresets } from './presets/preset-registry.js';
import { cssPresets } from './presets/css-presets.js';

import { isReducedMotion } from './core/reduced-motion.js';
import { normalizeOptions } from './core/animation-normalizer.js';
import { buildTransformAndFilter } from './core/transform-builder.js';
import { AnimationInstance } from './core/animation-instance.js';
import { createCSSDriver } from './drivers/css-driver.js';
import { createWAAPIDriver } from './drivers/waapi-driver.js';
import { createRAFDriver } from './drivers/raf-driver.js';

import { initData, refreshData, runData, bindAnimX } from './data/data-api.js';

const VERSION = '0.3.0';

// Pre-register core CSS presets
Object.entries(cssPresets).forEach(([name, preset]) => {
  if (!preset.name) preset.name = name;
  registerPreset(name, preset);
});

class AnimXCore {
  constructor() {
    this.version = VERSION;
    this._instances = new Set();
    this._initialized = false;
    bindAnimX(this);
  }

  config(options) {
    setConfig(options);
  }

  init() {
    if (this._initialized) return;
    this._initialized = true;
    log(`AnimX v${this.version} Initialized.`);
    initData();
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

  refresh(root) {
    refreshData(root);
  }

  run(target) {
    runData(target);
  }

  animate(selector, animationInput, options = {}) {
    const elements = normalizeSelector(selector);
    if (!elements || elements.length === 0) {
      log('AnimX.animate(): No targets found for selector', selector);
      return new AnimationInstance([], []);
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

  stop() {
    this._instances.forEach(inst => inst.stop());
  }

  destroy() {
    this._instances.forEach(inst => inst.destroy());
    this._instances.clear();
  }
}

const AnimX = new AnimXCore();

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
