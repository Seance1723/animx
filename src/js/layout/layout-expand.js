import { normalizeSelector } from '../core/selector.js';
import { getLayoutConfig, LayoutInstance, dispatchLayoutEvent } from './layout-utils.js';
import { isReducedMotion } from '../accessibility/accessibility-state.js';

// Internal WeakMap to track expanded state
const expandState = new WeakMap();

export function expand(selector, options = {}) {
  const elements = normalizeSelector(selector);
  const config = { ...getLayoutConfig(), duration: 400, opacity: true, display: 'block', ...options };
  const instance = new LayoutInstance(elements, 'expand');

  if (isReducedMotion() && config.reducedMotionSafe) {
    elements.forEach(el => {
      el.style.display = config.display;
      el.style.height = 'auto';
      el.style.overflow = 'visible';
      if (config.opacity) el.style.opacity = '1';
      el.classList.remove('ax-layout-collapsed');
      el.classList.add('ax-layout-expanded');
      expandState.set(el, true);
    });
    return instance;
  }

  elements.forEach((el, index) => {
    // Force display to calculate natural height
    el.style.display = config.display;
    const currentHeight = el.offsetHeight; // might be 0
    el.style.height = 'auto';
    const targetHeight = el.scrollHeight;

    // Reset back to current to animate
    el.style.height = currentHeight + 'px';
    el.style.overflow = 'hidden';
    
    // Play WAAPI
    const keyframes = [
      { height: currentHeight + 'px', opacity: config.opacity ? 0 : 1 },
      { height: targetHeight + 'px', opacity: 1 }
    ];
    
    const timing = {
      duration: config.duration,
      easing: config.ease === 'snappy' ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'cubic-bezier(0.25, 1, 0.5, 1)',
      fill: 'both'
    };

    const anim = el.animate(keyframes, timing);
    instance._addAnim(anim);

    anim.onfinish = () => {
      el.style.height = 'auto';
      el.style.overflow = 'visible';
      el.classList.remove('ax-layout-collapsed');
      el.classList.add('ax-layout-expanded');
      expandState.set(el, true);
      dispatchLayoutEvent(el, 'expand', { height: targetHeight });
      if (config.onComplete && index === elements.length - 1) config.onComplete(instance);
    };
  });

  return instance;
}

export function collapse(selector, options = {}) {
  const elements = normalizeSelector(selector);
  const config = { ...getLayoutConfig(), duration: 350, opacity: true, displayAfter: 'none', ...options };
  const instance = new LayoutInstance(elements, 'collapse');

  if (isReducedMotion() && config.reducedMotionSafe) {
    elements.forEach(el => {
      el.style.display = config.displayAfter;
      el.style.height = '0px';
      el.style.overflow = 'hidden';
      if (config.opacity) el.style.opacity = '0';
      el.classList.remove('ax-layout-expanded');
      el.classList.add('ax-layout-collapsed');
      expandState.set(el, false);
    });
    return instance;
  }

  elements.forEach((el, index) => {
    const currentHeight = el.offsetHeight;
    el.style.overflow = 'hidden';

    const keyframes = [
      { height: currentHeight + 'px', opacity: 1 },
      { height: '0px', opacity: config.opacity ? 0 : 1 }
    ];
    
    const timing = {
      duration: config.duration,
      easing: config.ease === 'snappy' ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'cubic-bezier(0.25, 1, 0.5, 1)',
      fill: 'both'
    };

    const anim = el.animate(keyframes, timing);
    instance._addAnim(anim);

    anim.onfinish = () => {
      el.style.display = config.displayAfter;
      el.style.height = '0px';
      el.classList.remove('ax-layout-expanded');
      el.classList.add('ax-layout-collapsed');
      expandState.set(el, false);
      dispatchLayoutEvent(el, 'collapse');
      if (config.onComplete && index === elements.length - 1) config.onComplete(instance);
    };
  });

  return instance;
}

export function toggleExpand(selector, options = {}) {
  const elements = normalizeSelector(selector);
  elements.forEach(el => {
    let isExpanded = expandState.get(el);
    // fallback check if WeakMap is empty but DOM says otherwise
    if (isExpanded === undefined) {
      isExpanded = el.classList.contains('ax-layout-expanded') || el.offsetHeight > 0;
    }

    if (isExpanded) {
      collapse(el, options);
    } else {
      expand(el, options);
    }
  });
}
