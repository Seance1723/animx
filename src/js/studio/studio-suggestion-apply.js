export function applySuggestion(suggestion) {
  const el = suggestion.targetElement;
  if (!el) return false;
  
  // Apply data attributes
  el.setAttribute('data-ax', suggestion.preset);
  
  if (suggestion.options) {
    if (suggestion.options.stagger) {
      el.setAttribute('data-ax-delay-step', suggestion.options.stagger);
      el.setAttribute('data-ax-items', suggestion.preset);
      el.removeAttribute('data-ax'); // Use items instead if staggering children
    }
  }
  
  return true;
}

export function generateUpdatedHtml(rootElement) {
  return rootElement.innerHTML;
}
