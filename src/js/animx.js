import { getConfig, setConfig } from './core/config.js';
import { normalizeSelector } from './core/selector.js';
import { log } from './core/utils.js';
import { registerPreset, getPreset, getPresets, getComponentPresets, getPresetCategories } from './presets/preset-registry.js';
import { cssPresets } from './presets/css-presets.js';
import { componentPresets } from './components/component-presets.js';

import { isReducedMotion } from './core/reduced-motion.js';
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

const VERSION = '1.0.0';

// Pre-register core CSS presets
Object.entries(cssPresets).forEach(([name, preset]) => {
  if (!preset.name) preset.name = name;
  registerPreset(name, preset);
});

// Pre-register component presets
componentPresets.forEach(preset => {
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
  }

  config(options) {
    setConfig(options);
  }

  init() {
    if (this._initialized) return;
    this._initialized = true;
    log(`AnimX v${this.version} Initialized.`);
    initData();
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

  refresh(root) {
    refreshData(root);
    refreshScroll(root);
  }
  
  refreshScroll(root) {
    refreshScroll(root);
  }

  run(target) {
    runData(target);
  }
  
  scroll(target, options) {
    observeScroll(target, options);
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
        log('AnimX.animate(): No targets found for selector', selector);
      }
      return new AnimationInstance(null, null, {});
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
    } else {
      this._instances.forEach(instance => instance.stop());
      this._instances.clear();
      destroyInteractions(document.body);
    }
  }

  destroy(selector) {
    this.stop(selector);
    // Remove initialization marks
    if (selector) {
      const elements = normalizeSelector(selector);
      elements.forEach(el => {
        el.dataset.axState = '';
        el.classList.remove('ax-animating', 'ax-paused');
      });
    }
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
