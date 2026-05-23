/**
 * AnimX Chart Reveal Engine (v3.23.0)
 */

export function initChartReveal(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(chart => {
    if (prefersReducedMotion) return;
    
    // Example logic for growing pre-rendered chart bars
    if (config.effect === 'chart-bar-grow') {
      const bars = chart.querySelectorAll('.ax-chart-bar');
      bars.forEach((bar, i) => {
        bar.style.transformOrigin = 'bottom';
        bar.style.transform = 'scaleY(0)';
        bar.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        setTimeout(() => {
          bar.style.transform = 'scaleY(1)';
        }, i * 100);
      });
    }
  });
}
