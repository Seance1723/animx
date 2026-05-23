/**
 * AnimX Rolling Text Engine (v3.20.0)
 */

let rollingTimers = new Set();

export function initRollingText(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;
  
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(el => {
    const values = config.values || [];
    if (values.length === 0) return;
    
    if (prefersReducedMotion) {
      el.textContent = values[values.length - 1]; // Stop on final value
      return;
    }

    let currentIndex = 0;
    const interval = config.interval || 2000;
    
    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % values.length;
      // In full implementation this would scroll through a masked DOM flexbox.
      // We simulate safely via textContent to avoid XSS innerHTML.
      el.textContent = values[currentIndex]; 
    }, interval);
    
    rollingTimers.add(timer);
  });
}

export function destroyRollingText() {
  rollingTimers.forEach(t => clearInterval(t));
  rollingTimers.clear();
}
