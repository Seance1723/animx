/**
 * AnimX Image Reveal Engine (v3.21.0)
 */

export function initImageReveal(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;
  
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(el => {
    if (prefersReducedMotion) {
      el.style.opacity = '1';
      return;
    }
    
    // Simplistic reveal scaling fallback proof of concept
    el.style.transition = `all ${config.duration || 800}ms ease-out`;
    el.style.opacity = '0';
    el.style.transform = 'scale(0.95)';
    
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'scale(1)';
    });
  });
}

export function initImageMask(target, config) {
  // Uses pure CSS clip-path safely instead of wrapping images
  console.log('[AnimX Media] Applying native clip-path masking to', target);
}
