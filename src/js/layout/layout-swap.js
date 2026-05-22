import { normalizeSelector } from '../core/selector.js';
import { getLayoutConfig, LayoutInstance, dispatchLayoutEvent } from './layout-utils.js';
import { isReducedMotion } from '../core/reduced-motion.js';

export function swap(selector, newContent, options = {}) {
  const elements = normalizeSelector(selector);
  const config = { ...getLayoutConfig(), duration: 500, animation: 'fade', ...options };
  const instance = new LayoutInstance(elements, 'swap');

  if (elements.length === 0) return instance;

  elements.forEach((el, index) => {
    dispatchLayoutEvent(el, 'swap-start', { animation: config.animation });

    const applyContent = () => {
      if (typeof newContent === 'string') {
        el.innerHTML = newContent;
      } else if (newContent instanceof HTMLElement || newContent instanceof DocumentFragment) {
        el.innerHTML = '';
        el.appendChild(newContent);
      }
    };

    if (isReducedMotion() && config.reducedMotionSafe) {
      applyContent();
      dispatchLayoutEvent(el, 'swap-complete');
      return;
    }

    // Determine out/in animations
    let outFrames, inFrames;
    const halfDur = config.duration / 2;

    switch(config.animation) {
      case 'fade-slide':
        outFrames = [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-10px)' }];
        inFrames = [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }];
        break;
      case 'scale':
        outFrames = [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0.95)' }];
        inFrames = [{ opacity: 0, transform: 'scale(0.95)' }, { opacity: 1, transform: 'scale(1)' }];
        break;
      case 'blur':
        outFrames = [{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(4px)' }];
        inFrames = [{ opacity: 0, filter: 'blur(4px)' }, { opacity: 1, filter: 'blur(0)' }];
        break;
      case 'fade':
      default:
        outFrames = [{ opacity: 1 }, { opacity: 0 }];
        inFrames = [{ opacity: 0 }, { opacity: 1 }];
    }

    // Animate out
    const outAnim = el.animate(outFrames, { duration: halfDur, fill: 'forwards' });
    instance._addAnim(outAnim);

    outAnim.onfinish = () => {
      applyContent();
      // Animate in
      const inAnim = el.animate(inFrames, { duration: halfDur, fill: 'forwards' });
      instance._addAnim(inAnim);
      
      inAnim.onfinish = () => {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.filter = '';
        dispatchLayoutEvent(el, 'swap-complete');
        if (config.onComplete && index === elements.length - 1) config.onComplete(instance);
      };
    };
  });

  return instance;
}
