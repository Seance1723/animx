import { getConfig } from '../core/config.js';
import { calculateScrollPositions, calculateProgress, getScrollY } from './scroll-metrics.js';
import { registerScrollInstance, unregisterScrollInstance } from './scroll-ticker.js';
import { scheduler } from '../core/scheduler.js';
import { dispatchAnimEvent } from '../data/data-events.js';

let animxInstance = null;
export function bindScrollSceneAnimX(instance) {
  animxInstance = instance;
}

export function runScrollScene(element, options = {}) {
  const config = getConfig();
  if (!config.advancedScroll?.enabled) return null;

  let isEnabled = true;
  let startY = 0;
  let endY = 0;
  let currentProgress = -1;
  let hasEntered = false;

  const startStr = options.start || 'top bottom';
  const endStr = options.end || 'bottom top';
  const progressVar = options.progressVar || null;
  const once = options.once !== undefined ? options.once : true;

  let currentAnim = null;

  const instance = {
    element,
    isActive: () => isEnabled,
    refreshMetrics: () => {
      const bounds = calculateScrollPositions(element, startStr, endStr);
      startY = bounds.startY;
      endY = bounds.endY;
    },
    onScroll: () => {
      if (!isEnabled) return;
      const scrollY = getScrollY();
      const progress = calculateProgress(startY, endY, scrollY);
      
      if (progress !== currentProgress) {
        // Entering scene
        if (progress > 0 && progress < 1 && (currentProgress <= 0 || currentProgress >= 1)) {
          if (!hasEntered || !once) {
            hasEntered = true;
            dispatchAnimEvent(element, 'scene-enter', { instance });
            if (options.onEnter) options.onEnter(element);
            
            if (options.enter && animxInstance) {
              if (currentAnim) currentAnim.stop();
              currentAnim = animxInstance.animate(element, options.enter, options.options || {});
            }
          }
        }
        
        // Leaving scene
        if ((progress === 0 && currentProgress > 0) || (progress === 1 && currentProgress < 1)) {
          if (hasEntered && !once) {
            dispatchAnimEvent(element, 'scene-leave', { instance });
            if (options.onLeave) options.onLeave(element);
            
            if (options.leave && animxInstance) {
              if (currentAnim) currentAnim.stop();
              currentAnim = animxInstance.animate(element, options.leave, options.options || {});
            }
          }
        }
        
        currentProgress = progress;
        
        if (options.onProgress) options.onProgress(progress, element);
        dispatchAnimEvent(element, 'scene-progress', { progress, instance });

        if (progressVar || options.progress) {
          scheduler.write(() => {
            if (!isEnabled) return;
            if (progressVar) element.style.setProperty(progressVar, progress);
            if (typeof options.progress === 'function') options.progress(progress, element);
          });
        }
      }
    },
    getProgress: () => currentProgress,
    destroy: () => {
      isEnabled = false;
      unregisterScrollInstance(instance);
      if (progressVar) element.style.removeProperty(progressVar);
      element.classList.remove('ax-scroll-scene');
      if (currentAnim) currentAnim.stop();
    }
  };

  element.classList.add('ax-scroll-scene');
  registerScrollInstance(instance);
  return instance;
}
