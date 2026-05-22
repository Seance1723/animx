import { normalizeSelector } from '../core/selector.js';

export function focusSafe(selector, options = {}) {
  const elements = normalizeSelector(selector);
  const activeElement = typeof document !== 'undefined' ? document.activeElement : null;
  
  const restoreFocus = options.restoreFocus !== false; // Default true if used explicitly
  const preventFocusLoss = options.preventFocusLoss !== false;

  let sourceHasFocus = false;
  if (activeElement && elements.includes(activeElement)) {
    sourceHasFocus = true;
  }
  
  // Expose a helper to call after animation completes
  return {
    elements,
    sourceHasFocus,
    activeElement,
    restore: () => {
      if (typeof document === 'undefined') return;
      
      if (restoreFocus && sourceHasFocus && document.body.contains(activeElement)) {
        activeElement.focus({ preventScroll: true });
      } else if (restoreFocus && sourceHasFocus && options.targetFocus) {
        const target = normalizeSelector(options.targetFocus)[0];
        if (target) target.focus({ preventScroll: true });
      }
    }
  };
}
