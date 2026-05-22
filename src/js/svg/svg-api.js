import { svgDraw, svgUndraw } from './svg-draw.js';
import { svgProgress } from './svg-progress.js';
import { svgPathFollow } from './svg-path-follow.js';
import { svgPresets } from './svg-presets.js';
import { registerPreset } from '../presets/preset-registry.js';
import { parseSvgAttributes } from './svg-parser.js';
import { getSvgState } from './svg-state.js';
import { debug } from '../core/debug.js';

// Pre-register SVG presets
Object.entries(svgPresets).forEach(([name, preset]) => {
  registerPreset(name, preset);
});

export { svgDraw, svgUndraw, svgProgress, svgPathFollow };

export function svg(targets, options) {
  const type = options.type || 'draw';
  
  switch(type) {
    case 'draw':
    case 'logo-build':
    case 'icon-draw':
      return svgDraw(targets, options);
    case 'undraw':
      return svgUndraw(targets, options);
    case 'progress':
      return svgProgress(targets, options);
    case 'path-follow':
      return svgPathFollow(targets, options);
    case 'stroke-dash':
    case 'fill':
      // Handled via CSS presets usually, but we can wrap them in WAAPI if needed
      if (options.debug) debug.warn(`AnimX.svg: Type ${type} uses CSS presets natively. Fallback to instance creation.`);
      return { elements: [], destroy: () => {}, play: () => {} };
    default:
      return svgDraw(targets, options);
  }
}

// Global integration hook
let AnimXRef = null;

export function bindSvgAnimX(animxInstance) {
  AnimXRef = animxInstance;
}

export function destroySvg(selector) {
  if (!selector) return;
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : (selector.length ? selector : [selector]);
  elements.forEach(el => {
    const state = getSvgState(el);
    if (state && state.destroy) {
      state.destroy();
    }
  });
}
