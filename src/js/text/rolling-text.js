export function rollText(selector, options = {}) {
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
  const { values = [], animation = 'text-roll-up', interval = 2000 } = options;
  
  elements.forEach(el => {
    // Basic implementation for scrolling text using primitive class swap
    el.classList.add('ax-rolling-base');
    let currentIndex = 0;
    
    // Save timer to element so we can clean it up on destroy
    if (el._axRollTimer) clearInterval(el._axRollTimer);
    
    if (values.length > 0) {
      el.textContent = values[0];
      
      el._axRollTimer = setInterval(() => {
        // Reduced motion check
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          clearInterval(el._axRollTimer);
          return;
        }
        
        currentIndex = (currentIndex + 1) % values.length;
        
        // Trigger CSS animation by removing/re-adding class
        el.classList.remove(animation);
        void el.offsetWidth; // trigger reflow
        el.textContent = values[currentIndex];
        el.classList.add(animation);
      }, interval);
    }
  });
}
