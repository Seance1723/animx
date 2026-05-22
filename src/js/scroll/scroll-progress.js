import { getConfig } from '../core/config.js';
import { isReducedMotion } from '../core/reduced-motion.js';
import { calculateScrollPositions, calculateProgress, getScrollY } from './scroll-metrics.js';
import { registerScrollInstance, unregisterScrollInstance } from './scroll-ticker.js';
import { scheduler } from '../core/scheduler.js';

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

export function runScrollProgress(element, options = {}) {
  const config = getConfig();
  if (!config.advancedScroll?.enabled) return null;

  let isEnabled = true;
  let startY = 0;
  let endY = 0;
  let currentProgress = -1;

  const startStr = options.start || config.advancedScroll.start;
  const endStr = options.end || config.advancedScroll.end;
  
  const properties = {};
  const supported = ['x', 'y', 'opacity', 'scale', 'scaleX', 'scaleY', 'rotate', 'rotateX', 'rotateY', 'blur'];
  
  supported.forEach(prop => {
    if (options[prop] !== undefined) {
      if (Array.isArray(options[prop]) && options[prop].length === 2) {
        properties[prop] = options[prop];
      }
    }
  });

  const progressVar = options.progressVar || null;

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
        currentProgress = progress;
        
        if (options.onUpdate) {
          options.onUpdate(progress, element);
        }

        scheduler.write(() => {
          if (!isEnabled) return;
          
          if (progressVar) {
            element.style.setProperty(progressVar, progress);
          }

          let transformStr = '';
          let filterStr = '';
          
          const reduced = isReducedMotion();
          const p = reduced ? 1 : progress; // If reduced motion, jump to final state
          
          if (properties.x) transformStr += `translateX(${lerp(properties.x[0], properties.x[1], p)}px) `;
          if (properties.y) transformStr += `translateY(${lerp(properties.y[0], properties.y[1], p)}px) `;
          if (properties.scale) transformStr += `scale(${lerp(properties.scale[0], properties.scale[1], p)}) `;
          if (properties.scaleX) transformStr += `scaleX(${lerp(properties.scaleX[0], properties.scaleX[1], p)}) `;
          if (properties.scaleY) transformStr += `scaleY(${lerp(properties.scaleY[0], properties.scaleY[1], p)}) `;
          if (properties.rotate) transformStr += `rotate(${lerp(properties.rotate[0], properties.rotate[1], p)}deg) `;
          if (properties.rotateX) transformStr += `rotateX(${lerp(properties.rotateX[0], properties.rotateX[1], p)}deg) `;
          if (properties.rotateY) transformStr += `rotateY(${lerp(properties.rotateY[0], properties.rotateY[1], p)}deg) `;
          
          if (properties.blur) filterStr += `blur(${lerp(properties.blur[0], properties.blur[1], p)}px) `;
          
          if (transformStr) element.style.transform = transformStr.trim();
          if (filterStr) element.style.filter = filterStr.trim();
          if (properties.opacity !== undefined) {
            element.style.opacity = lerp(properties.opacity[0], properties.opacity[1], p);
          }
        });
      }
    },
    getProgress: () => currentProgress,
    destroy: () => {
      isEnabled = false;
      unregisterScrollInstance(instance);
      if (progressVar) element.style.removeProperty(progressVar);
      element.style.transform = '';
      element.style.filter = '';
      element.style.opacity = '';
    }
  };

  element.classList.add('ax-scroll-progress');
  registerScrollInstance(instance);
  return instance;
}
