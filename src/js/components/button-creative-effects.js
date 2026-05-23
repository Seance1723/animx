export function buttonCreative(selector, options = {}) {
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
  const { animation = 'button-text-roll' } = options;
  
  elements.forEach(el => {
    el.classList.add('ax-button-creative-base', animation);
  });
}
