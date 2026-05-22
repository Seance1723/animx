import { normalizeSelector } from '../core/selector.js';
import { runScrollProgress } from './scroll-progress.js';
import { runParallax } from './parallax.js';
import { runPin } from './pin.js';
import { runScrollScene } from './scroll-scene.js';
import { runReadingProgress } from './reading-progress.js';
import { saveScrollInstance, getScrollInstances, removeScrollInstance } from './scroll-state.js';

function mapApi(selector, options, runnerFunction, type) {
  const elements = normalizeSelector(selector);
  const instances = elements.map(el => {
    // Basic cleanup of previous same-type instance if it exists
    const existing = getScrollInstances(el);
    if (existing && existing[type]) {
      existing[type].destroy();
    }
    
    const instance = runnerFunction(el, options);
    if (instance) saveScrollInstance(el, type, instance);
    return instance;
  }).filter(Boolean);
  
  return instances.length === 1 ? instances[0] : instances;
}

export function scrollProgress(selector, options = {}) {
  return mapApi(selector, options, runScrollProgress, 'scrollProgress');
}

export function parallax(selector, options = {}) {
  return mapApi(selector, options, runParallax, 'parallax');
}

export function pin(selector, options = {}) {
  return mapApi(selector, options, runPin, 'pin');
}

export function scrollScene(selector, options = {}) {
  return mapApi(selector, options, runScrollScene, 'scrollScene');
}

export function readingProgress(selector, options = {}) {
  return mapApi(selector, options, runReadingProgress, 'readingProgress');
}

export function destroyAdvancedScroll(selector) {
  const elements = normalizeSelector(selector);
  elements.forEach(el => {
    const instances = getScrollInstances(el);
    if (instances) {
      Object.values(instances).forEach(inst => {
        if (inst && inst.destroy) inst.destroy();
      });
      // clear them
      Object.keys(instances).forEach(key => removeScrollInstance(el, key));
    }
  });
}
