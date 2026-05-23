/**
 * AnimX Marquee Text Engine (v3.20.0)
 */

let clonedNodes = new Set();

export function initMarqueeText(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;
  
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(el => {
    if (prefersReducedMotion) {
      el.style.overflow = 'hidden';
      return;
    }

    el.style.display = 'flex';
    el.style.whiteSpace = 'nowrap';
    el.style.overflow = 'hidden';

    // Clone safely
    const clone = el.children[0].cloneNode(true);
    clone.setAttribute('aria-hidden', 'true'); // Hide duplicate from screen readers
    el.appendChild(clone);
    clonedNodes.add(clone);

    // Simplistic CSS animation injection for seamless looping
    const animName = `ax-marquee-${Date.now()}`;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${animName} {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(style);
    
    const speed = config.speed || 60;
    el.children[0].style.animation = `${animName} ${speed}s linear infinite`;
    clone.style.animation = `${animName} ${speed}s linear infinite`;
  });
}

export function destroyMarquee() {
  clonedNodes.forEach(node => node.remove());
  clonedNodes.clear();
}
