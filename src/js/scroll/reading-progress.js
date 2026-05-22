import { getConfig } from '../core/config.js';
import { getScrollY } from './scroll-metrics.js';
import { registerScrollInstance, unregisterScrollInstance } from './scroll-ticker.js';
import { scheduler } from '../core/scheduler.js';
import { normalizeSelector } from '../core/selector.js';
import { dispatchAnimEvent } from '../data/data-events.js';

export function runReadingProgress(element, options = {}) {
  const config = getConfig();
  if (!config.advancedScroll?.enabled) return null;

  let isEnabled = true;
  let maxScroll = 0;
  let currentProgress = -1;

  const containerSelector = options.container || document.documentElement;
  const containers = typeof containerSelector === 'string' ? normalizeSelector(containerSelector) : [containerSelector];
  const container = containers[0] || document.documentElement;

  const axis = options.axis || 'x';
  const progressVar = options.cssVar || options.progressVar || null;

  const instance = {
    element,
    isActive: () => isEnabled,
    refreshMetrics: () => {
      // Calculate max scroll for the container
      if (container === document.documentElement || container === document.body) {
        maxScroll = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        ) - window.innerHeight;
      } else {
        // If it's a specific element, we track scroll relative to its top/bottom
        const rect = container.getBoundingClientRect();
        maxScroll = rect.height - window.innerHeight;
        // Wait, reading progress for a container usually means the distance from when its top hits the viewport 
        // to when its bottom hits the viewport.
        // Actually, standard reading progress is document scroll.
      }
    },
    onScroll: () => {
      if (!isEnabled) return;
      
      let progress = 0;
      if (container === document.documentElement || container === document.body) {
        progress = maxScroll > 0 ? getScrollY() / maxScroll : 0;
      } else {
        // For specific element container
        const rect = container.getBoundingClientRect();
        const top = rect.top;
        const height = rect.height;
        // when top is at bottom of viewport: progress 0
        // when bottom is at top of viewport: progress 1
        // (window.innerHeight - top) / (height + window.innerHeight)
        progress = (window.innerHeight - top) / (height + window.innerHeight);
      }
      
      progress = Math.max(0, Math.min(progress, 1));
      
      if (progress !== currentProgress) {
        currentProgress = progress;
        
        if (options.onUpdate) options.onUpdate(progress, element);
        dispatchAnimEvent(element, 'reading-progress', { progress, instance });

        scheduler.write(() => {
          if (!isEnabled) return;
          if (progressVar) element.style.setProperty(progressVar, progress);
          if (axis === 'x') {
            element.style.transform = `scaleX(${progress})`;
          } else if (axis === 'y') {
            element.style.transform = `scaleY(${progress})`;
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
      element.classList.remove('ax-reading-progress');
    }
  };

  element.classList.add('ax-reading-progress');
  registerScrollInstance(instance);
  return instance;
}
