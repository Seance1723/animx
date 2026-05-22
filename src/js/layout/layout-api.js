import { measureLayout } from './layout-measure.js';
import { flip, animateLayout } from './flip.js';
import { expand, collapse, toggleExpand } from './layout-expand.js';
import { sharedElement } from './layout-shared.js';
import { swap } from './layout-swap.js';

export function layout(selector, options = {}) {
  const type = options.type || 'reorder';
  
  if (type === 'expand') return expand(selector, options);
  if (type === 'collapse') return collapse(selector, options);
  
  // Reorder/Filter mode requires an items selector
  const items = options.items || (selector + ' > *');
  
  // Expose a helper that wraps flip
  return flip(items, null, options);
}

export function refreshLayout() {
  // Can be expanded later if we track mutation observers.
  // For now, it's a safe no-op.
  return true;
}

export function bindLayoutAnimX(core) {
  core.measureLayout = measureLayout;
  core.animateLayout = animateLayout;
  core.flip = flip;
  core.layout = layout;
  core.expand = expand;
  core.collapse = collapse;
  core.toggleExpand = toggleExpand;
  core.sharedElement = sharedElement;
  core.swap = swap;
  core.refreshLayout = refreshLayout;
}

export { measureLayout, animateLayout, flip, expand, collapse, toggleExpand, sharedElement, swap };
