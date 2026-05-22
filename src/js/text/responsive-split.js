import { textStateMap } from './text-state.js';
import { dispatchTextEvent } from './text-utils.js';

const resizeObserverMap = new WeakMap();

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function observeResponsiveText(element, options, reSplitCallback) {
  if (!options.responsive) return;
  
  if (resizeObserverMap.has(element)) {
    resizeObserverMap.get(element).disconnect();
  }

  const debouncedReSplit = debounce(() => {
    // Only resplit if element still exists and is in DOM
    if (!document.body.contains(element)) {
      unobserveResponsiveText(element);
      return;
    }
    
    // Perform resplit
    const splitData = reSplitCallback();
    dispatchTextEvent(element, 'text-resplit', { split: splitData, options });
    
    // Replay if requested
    if (options.replayOnResplit) {
      const state = textStateMap.get(element);
      if (state && typeof state.replay === 'function') {
        state.replay();
      }
    }
  }, options.resplitDebounce || 150);

  const observer = new ResizeObserver(() => {
    debouncedReSplit();
  });

  observer.observe(element);
  resizeObserverMap.set(element, observer);
  
  // Also hook into font loading if available
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (document.body.contains(element) && resizeObserverMap.has(element)) {
        debouncedReSplit();
      }
    });
  }
}

export function unobserveResponsiveText(element) {
  if (resizeObserverMap.has(element)) {
    resizeObserverMap.get(element).disconnect();
    resizeObserverMap.delete(element);
  }
}
