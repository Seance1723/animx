import { getConfig } from './config.js';
import { getPresets, getPresetCategories } from '../presets/preset-registry.js';
import { getInstances } from './instance-registry.js';
import { normalizeSelector } from './selector.js';

export function inspect(selector) {
  if (!selector) {
    // Global inspection
    return {
      version: '2.1.0',
      activeAnimations: Object.keys(data).length,
      presetCount: getPresets().length,
      categories: getPresetCategories(),
      activeInstances: 'unknown (WeakMap)',
      initializedElements: typeof document !== 'undefined' ? document.querySelectorAll('[data-ax], [data-ax-component], [data-ax-svg]').length : 0,
      features: typeof window !== 'undefined' ? {
        waapi: typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function',
        reducedMotion: typeof matchMedia !== 'undefined' ? matchMedia('(prefers-reduced-motion: reduce)').matches : false
      } : {}
    };
  }

  // Element-level inspection
  const elements = normalizeSelector(selector);
  if (elements.length === 0) {
    return { error: `No elements found for selector: ${selector}` };
  }

  const el = elements[0]; // inspect the first matched element
  
  const dataAttributes = {};
  Array.from(el.attributes).forEach(attr => {
    if (attr.name.startsWith('data-ax')) {
      dataAttributes[attr.name] = attr.value;
    }
  });

  const activeInstancesCount = getInstances(el).size;

  return {
    element: el,
    dataAttributes,
    classes: Array.from(el.classList),
    activeInstances: activeInstancesCount,
    presets: dataAttributes['data-ax'] || dataAttributes['data-ax-component'] || 'none',
    state: el.dataset.axState || 'unknown',
    warnings: activeInstancesCount > 5 ? ['High number of active instances on this element.'] : []
  };
}
