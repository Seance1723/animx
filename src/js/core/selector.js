export function normalizeSelector(selector) {
  if (!selector) return [];
  if (typeof document === 'undefined') return [];
  
  if (typeof selector === 'string') {
    try {
      return Array.from(document.querySelectorAll(selector));
    } catch (e) {
      console.warn(`[AnimX Security] Invalid selector "${selector}" ignored safely.`);
      return [];
    }
  }
  
  // Handling standard NodeList / HTMLCollection / Array
  if (Array.isArray(selector) || 
      (typeof NodeList !== 'undefined' && selector instanceof NodeList) || 
      (typeof HTMLCollection !== 'undefined' && selector instanceof HTMLCollection)) {
    return Array.from(selector).filter(el => el && el.nodeType === 1);
  }
  
  // Handling single elements
  if (selector && selector.nodeType === 1) {
    return [selector];
  }
  
  return [];
}
