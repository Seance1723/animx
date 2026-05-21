import { getConfig } from '../core/config.js';

export function parseStaggerOptions(input) {
  const config = getConfig();
  
  if (typeof input === 'number') {
    return {
      ...config.stagger,
      each: input
    };
  }
  
  if (!input || typeof input !== 'object') {
    return { ...config.stagger };
  }
  
  return {
    each: input.each !== undefined ? input.each : config.stagger.each,
    from: input.from || config.stagger.from,
    startDelay: input.startDelay !== undefined ? input.startDelay : config.stagger.startDelay,
    reverse: input.reverse || false,
    grid: input.grid || null,
    axis: input.axis || config.stagger.axis,
    index: input.index !== undefined ? input.index : 0,
    randomSeed: input.randomSeed || null,
    // Callbacks
    onStart: input.onStart || null,
    onItemStart: input.onItemStart || null,
    onItemComplete: input.onItemComplete || null,
    onComplete: input.onComplete || null,
    onCancel: input.onCancel || null
  };
}
