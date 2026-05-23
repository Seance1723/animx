/**
 * AnimX Card Motion Engine (v3.23.0)
 */

export function initCard(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(card => {
    if (prefersReducedMotion) return;
    
    if (config.hover) {
      card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease';
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
      });
      // Accessibility fallback
      card.addEventListener('focus', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.outline = '2px solid #3b82f6';
      });
      card.addEventListener('blur', () => {
        card.style.transform = 'translateY(0)';
        card.style.outline = 'none';
      });
    }
  });
}
