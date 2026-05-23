/**
 * AnimX Input Motion Engine (v3.24.0)
 */

export function initInput(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(input => {
    if (prefersReducedMotion) return;
    
    if (config.focus) {
      input.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
      input.addEventListener('focus', () => {
        if (config.focus === 'input-focus-glow') {
          input.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5)';
          input.style.borderColor = '#3b82f6';
        }
      });
      input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
        input.style.borderColor = ''; // Revert to CSS
      });
    }
  });
}
