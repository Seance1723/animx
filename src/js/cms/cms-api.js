import { getConfig } from '../core/config.js';
import { parseAndApplyCMS } from './cms-parser.js';
import { startCMSObserver, stopCMSObserver } from './cms-observer.js';
import { CMS_RECIPES } from './cms-recipes.js';
import { dispatchCMSEvent, querySafe } from './cms-utils.js';

let _animx = null;

export function bindCMSApi(animxInstance) {
  _animx = animxInstance;
}

export function cms(rootOrSelector = document, options = {}) {
  const config = getConfig();
  if (!config.cms || !config.cms.enabled) return null;

  let root = typeof rootOrSelector === 'string' ? document.querySelector(rootOrSelector) : rootOrSelector;
  if (!root) root = document;

  parseAndApplyCMS(root, _animx);
  
  if (_animx && _animx._initialized) {
    // If AnimX is fully initialized, also run standard data refresh to catch any raw data attributes that might be aliased
    _animx.refresh(root);
  }

  dispatchCMSEvent('init', { root });

  const observeOpt = options.observe !== undefined ? options.observe : config.cms.observe;
  const observeAttr = root !== document && root.getAttribute ? root.getAttribute('data-ax-observe') === 'true' : false;
  
  if (observeOpt || observeAttr) {
    observeCMS(root, { debounce: options.debounce || config.cms.observerDebounce });
  }

  return {
    root,
    refresh: () => refreshCMS(root),
    observe: (opts) => observeCMS(root, opts),
    disconnect: () => disconnectCMS(),
    destroy: () => disconnectCMS()
  };
}

export function refreshCMS(rootOrSelector = document) {
  let root = typeof rootOrSelector === 'string' ? document.querySelector(rootOrSelector) : rootOrSelector;
  if (!root) root = document;
  
  parseAndApplyCMS(root, _animx);
  if (_animx) _animx.refresh(root);
  
  dispatchCMSEvent('refresh', { root });
}

export function observeCMS(rootOrSelector = document, options = {}) {
  let root = typeof rootOrSelector === 'string' ? document.querySelector(rootOrSelector) : rootOrSelector;
  if (!root) root = document;

  const config = getConfig();
  const debounceMs = options.debounce || (config.cms && config.cms.observerDebounce) || 120;
  
  startCMSObserver(root, () => {
    refreshCMS(root);
  }, debounceMs);

  dispatchCMSEvent('observe', { root, options });
}

export function disconnectCMS() {
  stopCMSObserver();
  dispatchCMSEvent('disconnect');
}

export function getCMSRecipes() {
  return Object.keys(CMS_RECIPES);
}

export function applyRecipe(selectorOrElement, recipeName) {
  const elements = typeof selectorOrElement === 'string' ? querySafe(document, selectorOrElement) : [selectorOrElement];
  const recipe = CMS_RECIPES[recipeName];
  
  if (!recipe || typeof recipe.apply !== 'function') {
    dispatchCMSEvent('recipe-error', { recipe: recipeName });
    return;
  }

  dispatchCMSEvent('recipe-start', { recipe: recipeName });
  elements.forEach(el => {
    if (el) recipe.apply(el, _animx);
  });
  dispatchCMSEvent('recipe-complete', { recipe: recipeName });
}
