import { normalizeSelector } from '../core/selector.js';

export function dispatchCMSEvent(eventName, detail = {}) {
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function' || typeof CustomEvent === 'undefined') return;
  const event = new CustomEvent(`animx:${eventName}`, { detail });
  window.dispatchEvent(event);
}

export function debounce(func, wait) {
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

export function querySafe(scope, selector) {
  if (!scope || typeof scope.querySelectorAll !== 'function') return [];
  try {
    return Array.from(scope.querySelectorAll(selector));
  } catch (e) {
    return [];
  }
}
