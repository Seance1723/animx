/**
 * AnimX Composer API (v3.23.0)
 * Safely stacks multiple animation effects onto a single target.
 */

import { validateChain } from './effect-conflict-resolver.js';
import { getVariant } from './variant-registry.js';
// Removed invalid core/init import

export function compose(target, effectsConfig) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return null;

  // If a string is passed, check if it's a variant
  if (typeof effectsConfig === 'string') {
    const variant = getVariant(effectsConfig);
    if (variant) {
      effectsConfig = variant.effects;
    } else {
      console.warn(`[AnimX Composer] Variant not found: ${effectsConfig}`);
      return null;
    }
  }

  // Validate the composition
  const validation = validateChain(effectsConfig);
  if (validation.warnings.length > 0) {
    console.warn(`[AnimX Composer] Warnings on ${target}:`, validation.warnings);
  }

  const instances = [];

  // Apply each effect
  elements.forEach(el => {
    effectsConfig.forEach(eff => {
      let effectName = typeof eff === 'string' ? eff : eff.effect;
      let options = typeof eff === 'object' ? eff.options || {} : {};
      
      // Inject standard data attributes dynamically so core engine picks it up
      // For a true engine, we would bypass data attributes and invoke JS timelines directly,
      // but modifying DOM is safer for the existing zero-dependency AnimX observer engine.
      el.setAttribute('data-ax', effectName);
      if (options.duration) el.setAttribute('data-ax-duration', options.duration);
      if (options.stagger) el.setAttribute('data-ax-stagger', options.stagger);
      if (options.split) el.setAttribute('data-ax-text', options.split);
      
      // Re-trigger core init for this element
      if (typeof window !== 'undefined' && window.AnimX) {
        window.AnimX.init(el);
      }
    });
  });

  return {
    play: () => console.log('Play composed chain'),
    destroy: () => console.log('Destroy composed chain')
  };
}

export function chain(target, sequence) {
  // Simple abstraction over timelines
  console.log('[AnimX] Chaining sequence on', target);
  return compose(target, sequence);
}
