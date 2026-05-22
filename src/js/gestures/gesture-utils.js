// gesture-utils.js
// Utility helpers for pointer math and gesture coordination

export function getPointerEventData(event) {
  return {
    x: event.clientX,
    y: event.clientY,
    id: event.pointerId || 0,
    type: event.pointerType || 'mouse'
  };
}

export function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function getCenter(pointers) {
  let x = 0;
  let y = 0;
  const count = pointers.length;
  if (count === 0) return { x, y };

  for (let i = 0; i < count; i++) {
    x += pointers[i].x;
    y += pointers[i].y;
  }
  return { x: x / count, y: y / count };
}

export function parseGrid(grid) {
  if (!grid) return null;
  if (typeof grid === 'number') return { x: grid, y: grid };
  if (typeof grid === 'string') {
    const parts = grid.split(',').map(n => parseFloat(n.trim()));
    if (parts.length === 1) return { x: parts[0], y: parts[0] };
    if (parts.length >= 2) return { x: parts[0], y: parts[1] };
  }
  if (Array.isArray(grid)) {
    return { x: grid[0], y: grid[1] !== undefined ? grid[1] : grid[0] };
  }
  return null;
}

export function snapToGrid(val, gridStep) {
  if (!gridStep) return val;
  return Math.round(val / gridStep) * gridStep;
}

export function dispatchGestureEvent(element, eventName, detail = {}) {
  const event = new CustomEvent(`animx:${eventName}`, { 
    detail: { element, ...detail },
    bubbles: true
  });
  element.dispatchEvent(event);
}
