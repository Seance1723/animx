import { normalizeSelector } from '../core/selector.js';
import { getLayoutConfig, LayoutInstance, dispatchLayoutEvent } from './layout-utils.js';
import { isReducedMotion } from '../core/reduced-motion.js';

export function sharedElement(sourceSelector, targetSelector, options = {}) {
  const sourceElements = normalizeSelector(sourceSelector);
  const targetElements = normalizeSelector(targetSelector);
  
  if (!sourceElements.length || !targetElements.length) return new LayoutInstance([], 'shared');

  const source = sourceElements[0];
  const target = targetElements[0];
  const config = { ...getLayoutConfig(), duration: 600, fade: true, cleanup: true, ...options };
  
  const instance = new LayoutInstance([source, target], 'shared');

  if (isReducedMotion() && config.reducedMotionSafe) {
    if (config.fade) {
      source.style.opacity = '0';
      target.style.opacity = '1';
    }
    return instance;
  }

  // 1. Measure
  const sourceRect = source.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  // 2. Clone source
  const clone = source.cloneNode(true);
  clone.classList.add('ax-layout-clone');
  clone.setAttribute('aria-hidden', 'true');
  
  // Clean id to prevent duplicates
  clone.removeAttribute('id');
  
  // Position clone identically to source absolute to viewport
  clone.style.position = 'fixed';
  clone.style.top = sourceRect.top + 'px';
  clone.style.left = sourceRect.left + 'px';
  clone.style.width = sourceRect.width + 'px';
  clone.style.height = sourceRect.height + 'px';
  clone.style.margin = '0';
  clone.style.zIndex = '9999';
  clone.style.transformOrigin = 'top left';

  document.body.appendChild(clone);

  // 3. Hide originals visually if needed
  if (config.fade) {
    source.style.opacity = '0';
    target.style.opacity = '0';
  }

  // 4. Calculate deltas
  const deltaX = targetRect.left - sourceRect.left;
  const deltaY = targetRect.top - sourceRect.top;
  const scaleX = sourceRect.width !== 0 ? targetRect.width / sourceRect.width : 1;
  const scaleY = sourceRect.height !== 0 ? targetRect.height / sourceRect.height : 1;

  dispatchLayoutEvent(source, 'shared-start', { target });

  // 5. Animate
  const keyframes = [
    { transform: 'translate(0px, 0px) scale(1, 1)' },
    { transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})` }
  ];

  const timing = {
    duration: config.duration,
    easing: config.ease === 'snappy' ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'cubic-bezier(0.25, 1, 0.5, 1)',
    fill: 'both'
  };

  const anim = clone.animate(keyframes, timing);
  instance._addAnim(anim);

  anim.onfinish = () => {
    if (config.cleanup && clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }
    if (config.fade) {
      target.style.opacity = '1';
    }
    dispatchLayoutEvent(source, 'shared-complete', { target });
    if (config.onComplete) config.onComplete(instance);
  };

  return instance;
}
