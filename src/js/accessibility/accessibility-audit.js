import { isReducedMotion } from './accessibility-state.js';

export function auditAccessibility() {
  if (typeof document === 'undefined') return { ok: true, checked: 0, errors: [], warnings: [], suggestions: [] };
  
  const errors = [];
  const warnings = [];
  const suggestions = [];
  let checked = 0;
  
  // 1. Reduced Motion Support
  if (!isReducedMotion()) {
    suggestions.push('Reduced motion is currently inactive. Ensure your OS settings can toggle it properly during manual QA.');
  }
  
  // 2. Check for hidden animated elements stuck in data-ax
  const dataElements = document.querySelectorAll('[data-ax], [data-ax-scroll]');
  dataElements.forEach(el => {
    checked++;
    const style = window.getComputedStyle(el);
    if (style.opacity === '0' || style.visibility === 'hidden') {
      if (!el.hasAttribute('data-ax-hidden-safe')) {
        warnings.push({
          element: el,
          message: 'Element is currently invisible. Ensure it reveals properly or uses data-ax-hidden-safe="true" if intentional.'
        });
      }
    }
  });
  
  // 3. Text Splitting Aria Labels
  const splitParents = document.querySelectorAll('.ax-text-word, .ax-text-char, .ax-text-line');
  splitParents.forEach(el => {
    checked++;
    const parent = el.parentElement;
    if (parent && !parent.hasAttribute('aria-label') && !parent.hasAttribute('data-ax-audited')) {
      // Mark audited so we don't spam for every char
      parent.setAttribute('data-ax-audited', 'true');
      warnings.push({
        element: parent,
        message: 'Split text fragments detected but parent lacks aria-label. This will read poorly in screen readers.'
      });
    }
  });
  
  // Clean up
  document.querySelectorAll('[data-ax-audited]').forEach(el => el.removeAttribute('data-ax-audited'));
  
  // 4. SVG Morph Accessibility
  const svgElements = document.querySelectorAll('[data-ax-svg]');
  svgElements.forEach(el => {
    checked++;
    const svg = el.tagName.toLowerCase() === 'svg' ? el : el.querySelector('svg');
    if (svg) {
      const hasTitle = svg.querySelector('title');
      const hasAria = svg.hasAttribute('aria-label') || svg.hasAttribute('aria-labelledby') || svg.hasAttribute('aria-hidden');
      if (!hasTitle && !hasAria) {
        warnings.push({
          element: svg,
          message: 'Animated SVG lacks <title>, aria-label, or aria-hidden. Decorative SVGs must be hidden from screen readers.'
        });
      }
    }
  });
  
  return {
    ok: errors.length === 0 && warnings.length === 0,
    checked,
    errors,
    warnings,
    suggestions
  };
}
