/**
 * AnimX Link Effects Engine (v3.22.0)
 */

export function initLink(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(link => {
    if (prefersReducedMotion) return; // Safety check
    
    // Example logic for link underline sliding natively via DOM/CSS vars
    if (config.effect === 'link-underline-slide') {
      link.style.position = 'relative';
      link.style.textDecoration = 'none';
      
      const underline = document.createElement('span');
      underline.style.position = 'absolute';
      underline.style.bottom = '0';
      underline.style.left = '0';
      underline.style.width = '0%';
      underline.style.height = '2px';
      underline.style.backgroundColor = 'currentColor';
      underline.style.transition = 'width 0.3s ease';
      
      link.appendChild(underline);
      
      link.addEventListener('mouseenter', () => underline.style.width = '100%');
      link.addEventListener('mouseleave', () => underline.style.width = '0%');
      link.addEventListener('focus', () => underline.style.width = '100%');
      link.addEventListener('blur', () => underline.style.width = '0%');
    }
  });
}
