/**
 * AnimX Image Slice Engine (v3.21.0)
 */

export function initImageClip(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(el => {
    if (prefersReducedMotion) {
      el.style.visibility = 'visible';
      return;
    }
    
    if (el.tagName !== 'IMG') return;

    // Accessibility-first cloning:
    // The original <img> retains its alt=""
    // The generated slices get aria-hidden="true"
    
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';
    
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    
    // Proof of concept slicing logic (curtains)
    const clone = el.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.clipPath = 'inset(0 50% 0 0)';
    
    wrapper.appendChild(clone);
  });
}
