import { getConfig } from '../core/config.js';
import { safeSelector } from './safe-selector.js';

export function securityAudit() {
  const result = {
    ok: true,
    checked: 0,
    errors: [],
    warnings: [],
    suggestions: []
  };

  if (typeof document === 'undefined') return result;

  const config = getConfig();

  if (config.debug) {
    result.warnings.push('Debug mode is active in production environment.');
  }

  if (config.security && config.security.allowHTMLStringSwap) {
    result.warnings.push('allowHTMLStringSwap is enabled. Ensure you are sanitizing strings properly.');
  }

  const allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    // Check bad attributes in AnimX generated/managed content
    if (el.classList.contains('ax') || el.hasAttribute('data-ax')) {
      result.checked++;
      
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.toLowerCase().startsWith('on')) {
          result.warnings.push({
            element: el,
            message: `Inline event handler "${attr.name}" found on AnimX-managed element.`
          });
        }
      });

      if (el.hasAttribute('href') && el.getAttribute('href').trim().toLowerCase().startsWith('javascript:')) {
        result.warnings.push({
          element: el,
          message: 'javascript: URL found on AnimX-managed element.'
        });
      }
      
      // Test selectors
      if (el.hasAttribute('data-ax-toggle')) {
        const toggleSelector = el.getAttribute('data-ax-toggle');
        const selSafe = safeSelector(toggleSelector);
        if (!selSafe.ok) {
          result.errors.push({
            element: el,
            message: `Invalid selector in data-ax-toggle: ${toggleSelector}`
          });
        }
      }
    }
  });

  result.ok = result.errors.length === 0 && result.warnings.length === 0;
  return result;
}
