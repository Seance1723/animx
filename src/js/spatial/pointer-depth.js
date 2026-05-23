/**
 * AnimX Pointer Depth Engine (v3.19.0)
 * Uses requestAnimationFrame to map pointer coordinates to CSS custom properties.
 */

const trackingNodes = new Set();
let isTracking = false;
let pointerX = 0;
let pointerY = 0;

function trackLoop() {
  if (!isTracking) return;
  
  trackingNodes.forEach(node => {
    if (!node.rect) node.rect = node.el.getBoundingClientRect();
    const rect = node.rect;
    
    // Calculate relative pointer position (-1 to 1)
    const relX = ((pointerX - rect.left) / rect.width) * 2 - 1;
    const relY = ((pointerY - rect.top) / rect.height) * 2 - 1;
    
    // Clamp to valid boundaries to prevent intense flipping when mouse leaves fast
    const clampedX = Math.max(-1, Math.min(1, relX));
    const clampedY = Math.max(-1, Math.min(1, relY));

    node.el.style.setProperty('--ax-pointer-x', clampedX);
    node.el.style.setProperty('--ax-pointer-y', clampedY);
  });
  
  requestAnimationFrame(trackLoop);
}

function handlePointer(e) {
  pointerX = e.clientX;
  pointerY = e.clientY;
}

function startTracking() {
  if (isTracking) return;
  if (typeof window !== 'undefined') {
    window.addEventListener('pointermove', handlePointer, { passive: true });
    isTracking = true;
    requestAnimationFrame(trackLoop);
  }
}

export function trackPointerDepth(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // Accessibility fallback: bypass entirely

  elements.forEach(el => {
    trackingNodes.add({ el, config, rect: null });
    el.style.setProperty('--ax-perspective', config.perspective || '1000px');
  });

  startTracking();
}

export function destroyPointerDepth() {
  isTracking = false;
  trackingNodes.clear();
  if (typeof window !== 'undefined') {
    window.removeEventListener('pointermove', handlePointer);
  }
}
