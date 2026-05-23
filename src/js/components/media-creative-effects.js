export function mediaCreative(selector, options = {}) {
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
  const { animation = 'image-slice-reveal' } = options;
  
  elements.forEach(el => {
    el.classList.add('ax-media-creative-base', animation);
  });
}
