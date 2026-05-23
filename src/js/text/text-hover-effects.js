export function hoverText(selector, options = {}) {
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
  const { animation = 'text-hover-roll' } = options;
  
  elements.forEach(el => {
    el.classList.add('ax-text-hover-base', animation);
  });
}
