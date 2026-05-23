export function scrollTypography(selector, options = {}) {
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
  const { split = 'words', animation = 'text-scroll-fill' } = options;
  
  elements.forEach(el => {
    el.classList.add('ax-scroll-typo-base', animation);
    // Intersection Observer to update CSS variable progress
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Simplistic progress mapper
          const progress = Math.max(0, Math.min(1, entry.intersectionRatio));
          el.style.setProperty('--ax-scroll-progress', progress);
        }
      });
    }, { threshold: Array.from({length: 20}, (_, i) => i * 0.05) });
    
    observer.observe(el);
    el._axScrollTypoObserver = observer;
  });
}
