/**
 * AnimX Counter Text Engine (v3.20.0)
 */

export function initCounterText(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;
  
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const from = parseFloat(config.from) || 0;
  const to = parseFloat(config.to) || 100;
  if (isNaN(to)) return;

  const duration = config.duration || 2000;

  elements.forEach(el => {
    if (prefersReducedMotion) {
      el.textContent = config.format === 'compact' ? new Intl.NumberFormat('en-US', { notation: "compact" }).format(to) : to;
      return;
    }

    let startTime = null;
    function loop(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      
      // Easing out quint
      const ease = 1 - Math.pow(1 - progress, 5);
      const current = from + ((to - from) * ease);
      
      const formatted = config.format === 'compact' ? 
        new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(current) : 
        Math.round(current);

      el.textContent = formatted;
      
      if (progress < 1) {
        requestAnimationFrame(loop);
      } else {
        el.textContent = config.format === 'compact' ? new Intl.NumberFormat('en-US', { notation: "compact" }).format(to) : Math.round(to);
      }
    }
    requestAnimationFrame(loop);
  });
}
