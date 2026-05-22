import { normalizeSelector } from '../core/selector.js';

export function measureLayout(selector) {
  const elements = normalizeSelector(selector);
  if (!elements || elements.length === 0) return { elements: [], rects: new Map(), timestamp: performance.now() };

  const rects = new Map();
  const timestamp = performance.now();

  elements.forEach(el => {
    // Only measure if element is in DOM and has layout
    if (el.offsetParent !== null || el.tagName === 'BODY' || el.tagName === 'HTML' || window.getComputedStyle(el).display === 'fixed') {
      const rect = el.getBoundingClientRect();
      rects.set(el, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        opacity: window.getComputedStyle(el).opacity
      });
    }
  });

  return { elements, rects, timestamp };
}
