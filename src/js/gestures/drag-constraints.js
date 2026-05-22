// drag-constraints.js
// Resolves bounds and applies constraints during drag

import { normalizeSelector } from '../core/selector.js';

export function resolveBounds(element, boundsOption) {
  if (!boundsOption) return null;

  let boundsEl = null;

  if (boundsOption === 'parent') {
    boundsEl = element.parentElement;
  } else if (typeof boundsOption === 'string') {
    const matched = normalizeSelector(boundsOption);
    if (matched.length) boundsEl = matched[0];
  } else if (boundsOption instanceof HTMLElement) {
    boundsEl = boundsOption;
  } else if (typeof boundsOption === 'object') {
    // Custom object { minX, maxX, minY, maxY }
    return {
      minX: boundsOption.minX !== undefined ? boundsOption.minX : -Infinity,
      maxX: boundsOption.maxX !== undefined ? boundsOption.maxX : Infinity,
      minY: boundsOption.minY !== undefined ? boundsOption.minY : -Infinity,
      maxY: boundsOption.maxY !== undefined ? boundsOption.maxY : Infinity
    };
  }

  if (boundsEl) {
    const parentRect = boundsEl.getBoundingClientRect();
    const elRect = element.getBoundingClientRect();
    
    // We assume the element's current transform is its starting origin for this drag.
    // However, bounding client rect includes current transform.
    // For a practical implementation without heavy matrix math, we calculate the max travel distance.
    const maxTravelLeft = elRect.left - parentRect.left;
    const maxTravelRight = parentRect.right - elRect.right;
    const maxTravelTop = elRect.top - parentRect.top;
    const maxTravelBottom = parentRect.bottom - elRect.bottom;

    return {
      minX: -maxTravelLeft,
      maxX: maxTravelRight,
      minY: -maxTravelTop,
      maxY: maxTravelBottom
    };
  }

  return null;
}

export function applyConstraints(x, y, axis, bounds) {
  let finalX = x;
  let finalY = y;

  // Axis lock
  if (axis === 'x') finalY = 0;
  if (axis === 'y') finalX = 0;

  // Bounds
  if (bounds) {
    if (finalX < bounds.minX) finalX = bounds.minX;
    if (finalX > bounds.maxX) finalX = bounds.maxX;
    if (finalY < bounds.minY) finalY = bounds.minY;
    if (finalY > bounds.maxY) finalY = bounds.maxY;
  }

  return { x: finalX, y: finalY };
}
