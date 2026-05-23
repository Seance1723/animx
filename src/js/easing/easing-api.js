/**
 * AnimX Easing API (v3.22.0)
 * Exports bezier curve parsers and the easing registry.
 */
import { registerEase, getEase, getEases, validateEase } from './easing-registry.js';

export function easing(target, config) {
  // Utility for declarative easing setup (data attributes mapping)
  if (!config || !config.ease) return;
  const easeStr = getEase(config.ease) || config.ease;
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;
  
  elements.forEach(el => {
    el.style.setProperty('--ax-ease-custom', easeStr);
  });
}

export { registerEase, getEase, getEases, validateEase };
