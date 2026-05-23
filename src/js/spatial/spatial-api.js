/**
 * AnimX Spatial API (v3.21.0)
 * Exports depth and pointer tracking tools.
 */
import { trackPointerDepth, destroyPointerDepth } from './pointer-depth.js';

export function spatial(target, config) {
  trackPointerDepth(target, config);
}

export function depth(target, config) {
  trackPointerDepth(target, config);
}

export function depthScene(target, config) {
  trackPointerDepth(target, config);
}

export function destroySpatial() {
  destroyPointerDepth();
}
