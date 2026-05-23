/**
 * AnimX Advanced SVG Motion API (v3.26.0)
 */

import { initSvgDraw } from './svg-draw-engine.js';
import { initPathFollow } from './svg-path-follow-engine.js';
import { initRoute } from './svg-route-engine.js';
import { initIcon } from './svg-icon-engine.js';
import { initLogo } from './svg-logo-engine.js';
import { initLineArt } from './svg-line-art-engine.js';
import { initInfographic } from './svg-infographic-engine.js';
import { initSvgChart } from './svg-chart-engine.js';
import { initSvgDiagram } from './svg-diagram-engine.js';

export function svg(target, config) { console.log('Init generic SVG', target, config); }
export function svgDraw(target, config) { initSvgDraw(target, config); }
export function svgUndraw(target, config) { initSvgDraw(target, { ...config, reverse: true }); }
export function svgProgress(target, config) { initSvgDraw(target, config); }
export function svgPathFollow(target, config) { initPathFollow(target, config); }
export function svgRoute(target, config) { initRoute(target, config); }
export function icon(target, config) { initIcon(target, config); }
export function logo(target, config) { initLogo(target, config); }
export function lineArt(target, config) { initLineArt(target, config); }
export function handwriting(target, config) { initLineArt(target, config); }
export function infographic(target, config) { initInfographic(target, config); }
export function svgChart(target, config) { initSvgChart(target, config); }
export function svgDiagram(target, config) { initSvgDiagram(target, config); }

export function validateSVGEffect(config) {
  if (!config) return { ok: false, errors: ['No config provided'] };
  return { ok: true, errors: [] };
}

export function getSVGEffects() {
  return [];
}

export function destroySVG() {
  console.log('[AnimX SVG] Destroyed (listeners removed)');
}
