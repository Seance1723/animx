/**
 * AnimX Page Transition Engine (v3.27.0)
 */

export function initPageTransition(config) {
  const container = config.container || '[data-ax-page]';
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion instantly completes the transition
  if (prefersReducedMotion || config.reducedMotion === 'instant') {
    el.style.opacity = '1';
    return;
  }

  const effect = config.enter || 'page-fade-in';
  console.log(`[AnimX Page] Firing enter effect: ${effect}`);
  
  el.style.opacity = '0';
  setTimeout(() => {
    el.style.transition = `opacity ${config.duration || 500}ms ease`;
    el.style.opacity = '1';
  }, 10);
}
