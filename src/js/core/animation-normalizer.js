import { getConfig } from './config.js';
import { getEasing } from './easing-map.js';

export function normalizeOptions(options = {}) {
  const config = getConfig();
  return {
    duration: typeof options.duration !== 'undefined' ? options.duration : config.defaultDuration,
    delay: typeof options.delay !== 'undefined' ? options.delay : 0,
    ease: getEasing(options.ease || config.defaultEase),
    fill: options.fill || 'both',
    iterations: options.iterations || 1,
    direction: options.direction || 'normal',
    
    // Callbacks
    onStart: options.onStart || null,
    onUpdate: options.onUpdate || null,
    onComplete: options.onComplete || null,
    onCancel: options.onCancel || null
  };
}
