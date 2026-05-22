import { runScrollProgress } from './scroll-progress.js';

export function runParallax(element, options = {}) {
  const speed = options.speed !== undefined ? options.speed : 0.35;
  const depth = options.depth !== undefined ? options.depth : 1;
  
  // Convert speed/depth into y/x arrays if not explicitly provided
  let y = options.y;
  let x = options.x;
  
  if (!y && !x) {
    y = [-speed * 100 * depth, speed * 100 * depth];
  }

  const progressOptions = {
    ...options,
    y,
    x,
  };

  element.classList.add('ax-parallax');
  return runScrollProgress(element, progressOptions);
}
