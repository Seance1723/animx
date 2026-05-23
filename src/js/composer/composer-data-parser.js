/**
 * AnimX Composer Data Parser (v3.18.0)
 * Scans DOM for data-ax-compose and data-ax-variant on load.
 */

import { compose } from './composer-api.js';

export function initComposerDOM() {
  // Parse data-ax-variant
  const variantTargets = document.querySelectorAll('[data-ax-variant]');
  variantTargets.forEach(el => {
    const variantName = el.getAttribute('data-ax-variant');
    if (variantName) {
      compose(el, variantName);
    }
  });

  // Parse data-ax-compose
  const composeTargets = document.querySelectorAll('[data-ax-compose]');
  composeTargets.forEach(el => {
    const composeStr = el.getAttribute('data-ax-compose');
    if (composeStr) {
      const effects = composeStr.split('|').map(e => e.trim()).filter(Boolean);
      compose(el, effects);
    }
  });
}
