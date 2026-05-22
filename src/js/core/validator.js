import { getPreset } from '../presets/preset-registry.js';
import { debug } from './debug.js';
import { ErrorCodes } from './error-codes.js';
import { suggestPreset } from '../presets/preset-search-index.js';

export function validate(scope = document) {
  const result = {
    ok: true,
    errors: [],
    warnings: [],
    checked: 0
  };

  const isElement = typeof Element !== 'undefined' && scope instanceof Element;
  const isDocument = typeof Document !== 'undefined' && scope instanceof Document;
  
  let elements = [];
  if (typeof scope === 'string' && typeof document !== 'undefined') {
    elements = Array.from(document.querySelectorAll(scope));
  } else if (isElement || isDocument) {
    elements = Array.from(scope.querySelectorAll('*'));
  }

  const trackedElements = typeof scope === 'string'
    ? elements
    : (isElement ? [scope, ...elements] : elements);

  const seenIds = new Set();

  trackedElements.forEach(el => {
    let hasAnimX = false;
    
    // Check preset
    if (el.hasAttribute('data-ax')) {
      hasAnimX = true;
      const presetName = el.getAttribute('data-ax');
      if (presetName && !getPreset(presetName)) {
        const suggestions = suggestPreset(presetName);
        const suggestionText = suggestions.length ? ` Did you mean "${suggestions[0].name}"?` : '';
        const msg = `Preset "${presetName}" was not found.${suggestionText}`;
        result.errors.push(msg);
        result.ok = false;
        debug.warn(ErrorCodes.PRESET_MISSING, msg);
      }
    }

    // Check component preset
    if (el.hasAttribute('data-ax-component')) {
      hasAnimX = true;
      const compName = el.getAttribute('data-ax-component');
      if (compName && !getPreset(compName)) {
        const msg = `Component preset "${compName}" was not found.`;
        result.errors.push(msg);
        result.ok = false;
        debug.warn(ErrorCodes.COMPONENT_PRESET_MISSING, msg);
      }
    }

    // Check SVG mode
    if (el.hasAttribute('data-ax-svg')) {
      hasAnimX = true;
      const mode = el.getAttribute('data-ax-svg');
      const validModes = ['draw', 'undraw', 'progress', 'path-follow'];
      if (!validModes.includes(mode)) {
        result.errors.push(`Invalid SVG mode: ${mode}`);
        result.ok = false;
      }
      if (mode === 'path-follow' && !el.hasAttribute('data-ax-path')) {
        result.errors.push(`SVG path-follow requires data-ax-path attribute.`);
        result.ok = false;
        debug.warn(ErrorCodes.PATH_MISSING, `Missing path target for SVG path-follow`);
      }
    }

    // Check numeric attributes
    ['duration', 'delay', 'stagger'].forEach(attr => {
      const fullAttr = `data-ax-${attr}`;
      if (el.hasAttribute(fullAttr)) {
        hasAnimX = true;
        const val = parseFloat(el.getAttribute(fullAttr));
        if (isNaN(val)) {
          const msg = `Invalid numeric value for ${fullAttr}: "${el.getAttribute(fullAttr)}"`;
          result.warnings.push(msg);
          debug.warn(ErrorCodes.INVALID_ATTRIBUTE, msg);
        }
      }
    });

    // Check duplicate IDs
    if (el.hasAttribute('data-ax-id')) {
      const id = el.getAttribute('data-ax-id');
      if (seenIds.has(id)) {
        result.warnings.push(`Duplicate data-ax-id found: ${id}`);
        debug.warn(ErrorCodes.INVALID_ATTRIBUTE, `Duplicate data-ax-id: ${id}`);
      }
      seenIds.add(id);
    }

    if (hasAnimX) result.checked++;
  });

  return result;
}
