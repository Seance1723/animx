export function normalizeSelector(selector) {
  if (!selector) return [];
  if (typeof document === 'undefined') return [];
  
  if (typeof selector === 'string') {
    return Array.from(document.querySelectorAll(selector));
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
