/**
 * AnimX SVG Draw Engine (v3.26.0)
 */

export function initSvgDraw(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(el => {
    // Failsafe for getTotalLength on hidden elements
    const originalDisplay = el.style.display;
    const originalVisibility = el.style.visibility;

    if (getComputedStyle(el).display === 'none') {
      el.style.display = 'block';
      el.style.visibility = 'hidden';
    }

    let length = 0;
    try {
      length = el.getTotalLength ? el.getTotalLength() : 0;
    } catch (e) {
      console.warn('[AnimX SVG] Failed to calculate path length safely.', e);
    }

    // Restore original
    el.style.display = originalDisplay;
    el.style.visibility = originalVisibility;

    if (prefersReducedMotion || length === 0) {
      el.style.strokeDasharray = 'none';
      el.style.strokeDashoffset = '0';
      return;
    }

    el.style.strokeDasharray = length;
    el.style.strokeDashoffset = config.reverse ? -length : length;
    
    // Simulate animation trigger
    setTimeout(() => {
      el.style.transition = `stroke-dashoffset ${config.duration || 1000}ms ease`;
      el.style.strokeDashoffset = '0';
    }, 50);
  });
}
