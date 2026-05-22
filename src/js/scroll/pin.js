import { getConfig } from '../core/config.js';
import { calculateScrollPositions, calculateProgress, getScrollY } from './scroll-metrics.js';
import { registerScrollInstance, unregisterScrollInstance } from './scroll-ticker.js';
import { scheduler } from '../core/scheduler.js';
import { normalizeSelector } from '../core/selector.js';
import { dispatchAnimEvent } from '../data/data-events.js';

export function runPin(element, options = {}) {
  const config = getConfig();
  if (!config.advancedScroll?.enabled) return null;

  const targetSelector = options.target || options.pin;
  const targets = normalizeSelector(targetSelector, element);
  const target = targets[0] || element; // Pin the target or the element itself
  
  if (!target) return null;

  let isEnabled = true;
  let startY = 0;
  let endY = 0;
  let currentProgress = -1;

  const startStr = options.start || 'top top';
  const endStr = options.end || '+=1000'; // Default extra scroll distance
  const progressVar = options.progressVar || null;

  // We set a height to the container (element) so the sticky target has room to stick.
  let isSetup = false;

  const instance = {
    element,
    isActive: () => isEnabled,
    refreshMetrics: () => {
      // Temporarily remove sticky/height to measure natural bounds
      const origHeight = element.style.height;
      element.style.height = '';
      
      const bounds = calculateScrollPositions(element, startStr, endStr);
      startY = bounds.startY;
      endY = bounds.endY;
      
      // Calculate how much extra scroll space we need
      const distance = endY - startY;
      
      scheduler.write(() => {
        // We ensure the wrapper has enough height for the scroll distance.
        // If distance is large, we expand the element's height.
        if (distance > 0 && element !== target) {
          const targetRect = target.getBoundingClientRect();
          element.style.height = `${targetRect.height + distance}px`;
        }
      });
    },
    onScroll: () => {
      if (!isEnabled) return;
      const scrollY = getScrollY();
      const progress = calculateProgress(startY, endY, scrollY);
      
      if (progress !== currentProgress) {
        if (currentProgress === 0 && progress > 0) {
          dispatchAnimEvent(element, 'pin-start', { instance });
          if (options.onStart) options.onStart(instance);
        }
        
        if (currentProgress < 1 && progress === 1) {
          dispatchAnimEvent(element, 'pin-end', { instance });
          if (options.onEnd) options.onEnd(instance);
        }
        
        currentProgress = progress;
        
        if (options.onUpdate) options.onUpdate(progress, instance);
        dispatchAnimEvent(element, 'pin-update', { progress, instance });

        if (progressVar) {
          scheduler.write(() => {
            if (isEnabled) element.style.setProperty(progressVar, progress);
          });
        }
      }
    },
    getProgress: () => currentProgress,
    destroy: () => {
      isEnabled = false;
      unregisterScrollInstance(instance);
      if (progressVar) element.style.removeProperty(progressVar);
      element.style.height = '';
      element.classList.remove('ax-pin-section');
      target.classList.remove('ax-pin-content');
    }
  };

  element.classList.add('ax-pin-section');
  target.classList.add('ax-pin-content');
  registerScrollInstance(instance);
  return instance;
}
