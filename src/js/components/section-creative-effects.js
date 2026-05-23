export function sectionCreative(selector, options = {}) {
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
  const { animation = 'section-curtain-reveal' } = options;
  
  elements.forEach(el => {
    el.classList.add('ax-section-creative-base', animation);
  });
}
