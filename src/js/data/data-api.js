import { getConfig } from '../core/config.js';
import { log } from '../core/utils.js';
import { normalizeSelector } from '../core/selector.js';
import { getPreset } from '../presets/preset-registry.js';
import { parseDataAttributes } from './data-parser.js';
import { isElementInitialized, setElementState, getElementState } from './data-state.js';
import { dispatchAnimEvent } from './data-events.js';
import { parseInteractionAttributes } from '../interactions/interaction-parser.js';

// We import AnimX dynamically or via a wrapper if needed, but to avoid circular deps we pass the animate function or resolve it from window.
let animxInstance = null;

export function bindAnimX(instance) {
  animxInstance = instance;
}

function processElement(element, forceRun = false) {
  const config = getConfig();
  const parsed = parseDataAttributes(element);
  
  // Warn if timeline trigger is used
  if (element.hasAttribute('data-ax-timeline')) {
    if (config.debug || parsed.debug) {
      log('AnimX: data-ax-timeline is planned for a future release.', element);
    }
  }

  // Let scroll-api handle scroll triggers
  if (parsed.trigger === 'scroll') {
    return;
  }

  // Handle Disabled
  if (parsed.disabled) {
    setElementState(element, 'cancelled');
    return;
  }

  // Handle Unknown Preset
  if (typeof parsed.animation === 'string' && !getPreset(parsed.animation)) {
    if (config.debug || parsed.debug) {
      log(`AnimX: preset '${parsed.animation}' was not found.`, element);
    }
    dispatchAnimEvent(element, 'error', parsed);
    return;
  }

  // If element is already initialized, only run if forced (manual run)
  if (isElementInitialized(element) && !forceRun) {
    return;
  }

  // Do not run 'manual' animations on auto-init load
  if (parsed.trigger === 'manual' && !forceRun) {
    setElementState(element, 'ready');
    return;
  }

  if (animxInstance) {
    setElementState(element, 'ready');
    dispatchAnimEvent(element, 'ready', parsed);
    
    // Merge callbacks into options
    const runOptions = {
      ...parsed.options,
      onStart: (el) => {
        setElementState(el, 'running');
        if (parsed.extraClass) el.classList.add(parsed.extraClass);
        dispatchAnimEvent(el, 'start', parsed);
      },
      onComplete: (el) => {
        setElementState(el, 'complete');
        if (parsed.extraClass) el.classList.remove(parsed.extraClass);
        dispatchAnimEvent(el, 'complete', parsed);
      },
      onCancel: (el) => {
        setElementState(el, 'cancelled');
        if (parsed.extraClass) el.classList.remove(parsed.extraClass);
        dispatchAnimEvent(el, 'cancel', parsed);
      }
    };

    if (parsed.isText) {
      animxInstance.text(element, { ...parsed.textOptions, ...runOptions });
    } else if (parsed.isGroup) {
      const children = parsed.childSelector 
        ? Array.from(element.querySelectorAll(parsed.childSelector))
        : Array.from(element.children);
        
      if (children.length > 0 && parsed.childAnimation) {
        // Group staggers will use AnimX.stagger directly which forwards everything
        runOptions.groupElement = element;
        animxInstance.stagger(children, parsed.childAnimation, runOptions);
      }
    } else {
      animxInstance.animate(element, parsed.animation, runOptions);
    }
  }
}

export function initData(forceScan = false) {
  const config = getConfig();
  
  if (typeof document === 'undefined') return;
  
  // Normal animx scanning
  if (config.dataApi) {
    const elements = document.querySelectorAll('[data-ax]');
    elements.forEach(el => processElement(el, forceScan));
  }
  
  // Interaction scanning
  if (config.interactions && config.interactions.enabled) {
    const interactionEls = document.querySelectorAll('[data-ax-hover], [data-ax-press], [data-ax-focus], [data-ax-magnetic], [data-ax-ripple], [data-ax-tilt], [data-ax-feedback]');
    interactionEls.forEach(el => processInteractionElement(el));
  }
}

function processInteractionElement(element) {
  if (!animxInstance) return;
  const interactions = parseInteractionAttributes(element);
  if (interactions) {
    animxInstance.interact(element, interactions);
  }
}

export function refreshData(root = document) {
  const config = getConfig();
  
  if (!root || typeof root.querySelectorAll !== 'function') return;
  
  if (config.dataApi) {
    const elements = root.querySelectorAll('[data-ax]');
    elements.forEach(el => processElement(el, false));
  }
  
  if (config.interactions && config.interactions.enabled) {
    const interactionEls = root.querySelectorAll('[data-ax-hover], [data-ax-press], [data-ax-focus], [data-ax-magnetic], [data-ax-ripple], [data-ax-tilt], [data-ax-feedback]');
    interactionEls.forEach(el => processInteractionElement(el));
  }
}

export function runData(target) {
  const config = getConfig();
  if (!config.dataApi) return;
  
  if (typeof document === 'undefined') return;
  
  let elements = [];
  
  if (!target) {
    // If no target provided, run all 'manual' triggers
    elements = Array.from(document.querySelectorAll('[data-ax-on="manual"]'));
  } else {
    elements = normalizeSelector(target);
  }
  
  elements.forEach(el => processElement(el, true));
}
