export function kineticText(selector, options = {}) {
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
  const { split = 'chars', animation = 'text-kinetic-wave', stagger = 50 } = options;
  
  elements.forEach(el => {
    // If not already split, we'd split it here natively.
    // For this boilerplate, we add the base class which handles CSS variable staggers.
    el.classList.add('ax-kinetic-base', animation);
    el.dataset.axStagger = stagger;
    
    // Reduced motion handled via CSS
  });
}
