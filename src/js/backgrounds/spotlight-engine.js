/**
 * AnimX Spotlight Engine (v3.25.0)
 */

export function initSpotlight(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(container => {
    if (prefersReducedMotion) return;
    
    // Bind exclusively to the container to prevent global blocking
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--ax-spotlight-x', `${x}px`);
      container.style.setProperty('--ax-spotlight-y', `${y}px`);
    });
  });
}
