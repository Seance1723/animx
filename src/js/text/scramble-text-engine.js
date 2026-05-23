/**
 * AnimX Scramble Text Engine (v3.20.0)
 */

export function initScrambleText(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;
  
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const charset = config.charset || "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const duration = config.duration || 1000;

  elements.forEach(el => {
    const targetText = config.text || el.textContent;
    if (prefersReducedMotion) {
      el.textContent = targetText;
      return;
    }
    
    el.setAttribute('aria-label', targetText); // Accessibility
    
    let startTime = null;
    function loop(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      
      let scrambled = "";
      for (let i = 0; i < targetText.length; i++) {
        if (progress > Math.random()) {
          scrambled += targetText[i];
        } else {
          scrambled += charset[Math.floor(Math.random() * charset.length)];
        }
      }
      
      // Strict XSS Prevention: Use textContent exclusively
      el.textContent = scrambled;
      
      if (progress < 1) {
        requestAnimationFrame(loop);
      } else {
        el.textContent = targetText;
      }
    }
    requestAnimationFrame(loop);
  });
}
