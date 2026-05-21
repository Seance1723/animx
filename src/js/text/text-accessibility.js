export function preserveAccessibility(element, originalText) {
  // If element already has an aria-label, don't overwrite it unless requested
  if (!element.hasAttribute('aria-label')) {
    element.setAttribute('aria-label', originalText.trim());
  }
}

export function applyAriaHidden(wrapperElement) {
  wrapperElement.setAttribute('aria-hidden', 'true');
}

export function restoreAccessibility(element) {
  // We can remove the aria-label if we generated it, but usually reverting 
  // restores original text so aria-label isn't strictly needed anymore.
  element.removeAttribute('aria-label');
}
