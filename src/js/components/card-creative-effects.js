export function cardCreative(selector, options = {}) {
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
  const { animation = 'card-spotlight-hover' } = options;
  
  elements.forEach(el => {
    el.classList.add('ax-card-creative-base', animation);
  });
}
