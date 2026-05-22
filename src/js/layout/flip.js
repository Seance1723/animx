import { measureLayout } from './layout-measure.js';
import { getLayoutConfig, LayoutInstance, cleanInlineTransforms, dispatchLayoutEvent } from './layout-utils.js';
import { isReducedMotion } from '../core/reduced-motion.js';

export function animateLayout(firstSnapshot, lastSnapshot, options = {}) {
  const config = { ...getLayoutConfig(), ...options };
  const instance = new LayoutInstance(lastSnapshot.elements, 'flip');

  if (isReducedMotion() && config.reducedMotionSafe) {
    // In reduced motion, we just let the DOM snap to final state
    lastSnapshot.elements.forEach(el => cleanInlineTransforms(el));
    return instance;
  }

  lastSnapshot.elements.forEach((el, index) => {
    const firstRect = firstSnapshot.rects.get(el);
    const lastRect = lastSnapshot.rects.get(el);

    if (!firstRect || !lastRect) return; // Cannot FLIP if element was created/destroyed

    const deltaX = firstRect.left - lastRect.left;
    const deltaY = firstRect.top - lastRect.top;
    const deltaScaleX = config.scale && lastRect.width !== 0 ? firstRect.width / lastRect.width : 1;
    const deltaScaleY = config.scale && lastRect.height !== 0 ? firstRect.height / lastRect.height : 1;

    // Skip if no movement or scale change
    if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5 && Math.abs(deltaScaleX - 1) < 0.01 && Math.abs(deltaScaleY - 1) < 0.01) {
      return;
    }

    // First, Invert: Apply transform to snap back to original position instantly
    el.style.transformOrigin = 'top left';
    el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaScaleX}, ${deltaScaleY})`;
    
    // Setup WAAPI animation for the "Play" phase
    const keyframes = [
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaScaleX}, ${deltaScaleY})` },
      { transform: 'translate(0px, 0px) scale(1, 1)' }
    ];
    
    const timing = {
      duration: config.duration,
      delay: (config.stagger || 0) * index,
      easing: config.ease === 'snappy' ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' :
              config.ease === 'linear' ? 'linear' :
              config.ease === 'bounce' ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' :
              'cubic-bezier(0.25, 1, 0.5, 1)', // default smooth
      fill: 'both'
    };

    // Use requestAnimationFrame to let the inverted transform apply to screen first
    requestAnimationFrame(() => {
      const anim = el.animate(keyframes, timing);
      instance._addAnim(anim);

      anim.onfinish = () => {
        if (config.cleanup) cleanInlineTransforms(el);
        if (config.onComplete && index === lastSnapshot.elements.length - 1) {
           config.onComplete(instance);
           dispatchLayoutEvent(el, 'layout-complete', { type: 'flip' });
        }
      };
      
      anim.oncancel = () => {
        if (config.cleanup) cleanInlineTransforms(el);
      };
    });
  });

  return instance;
}

export function flip(selector, mutationCallback, options = {}) {
  // 1. First: Measure
  const firstSnapshot = measureLayout(selector);
  
  // 2. Mutate DOM
  if (typeof mutationCallback === 'function') {
    mutationCallback();
  }

  // 3. Last + Invert + Play (Using requestAnimationFrame to wait for layout recalculation)
  requestAnimationFrame(() => {
    const lastSnapshot = measureLayout(selector);
    animateLayout(firstSnapshot, lastSnapshot, options);
  });
  
  // We return a dummy instance immediately since WAAPI hasn't started yet.
  // Real instance control requires async handling, but we return a proxy.
  return new LayoutInstance(firstSnapshot.elements, 'flip-proxy');
}
