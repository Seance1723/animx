/**
 * AnimX Conditional Rules Engine (v3.16.0)
 * Evaluates matchMedia or JS logic before firing effects.
 */

export function when(target, config) {
  const condition = config.if;
  let passed = false;

  if (typeof condition === 'object') {
    if (condition.viewport === 'mobile') passed = window.matchMedia('(max-width: 768px)').matches;
    if (condition.viewport === 'desktop') passed = window.matchMedia('(min-width: 769px)').matches;
    if (condition.reducedMotion === true) passed = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } else if (typeof condition === 'string') {
    // Simple naive check for demo purposes
    if (condition === 'inView') passed = true; 
  }

  const effectToRun = passed ? config.then : config.else;

  if (effectToRun && typeof window !== 'undefined' && window.AnimX && window.AnimX.compose) {
    window.AnimX.compose(target, effectToRun);
  }
}
