/**
 * AnimX Button Effects Engine (v3.22.0)
 */

export function initButton(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(btn => {
    if (prefersReducedMotion) return; // Safely skip heavy animation setup

    if (config.hover === 'button-glow') {
      btn.addEventListener('mouseenter', () => btn.style.boxShadow = '0 0 15px rgba(255,255,255,0.5)');
      btn.addEventListener('mouseleave', () => btn.style.boxShadow = 'none');
    }
    
    if (config.focus === 'button-focus-ring-pop') {
      // Focus safety implementation
      btn.addEventListener('focus', () => btn.style.outline = '2px solid #3b82f6');
      btn.addEventListener('blur', () => btn.style.outline = 'none');
    }
  });
}
