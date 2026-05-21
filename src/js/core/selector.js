export function normalizeSelector(selector) {
  if (!selector) return [];
  if (typeof document === 'undefined') return [];
  if (typeof selector === 'string') {
    return Array.from(document.querySelectorAll(selector));
  }
  if (typeof NodeList !== 'undefined' && (selector instanceof NodeList || selector instanceof HTMLCollection)) {
    return Array.from(selector);
  }
  if (typeof HTMLElement !== 'undefined' && selector instanceof HTMLElement) {
    return [selector];
  }
  if (Array.isArray(selector)) {
    return selector.filter(el => typeof HTMLElement !== 'undefined' && el instanceof HTMLElement);
  }
  return [];
}
