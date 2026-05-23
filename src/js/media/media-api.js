/**
 * AnimX Advanced Media API (v3.22.0)
 */

import { initImageReveal, initImageMask } from './image-reveal-engine.js';
import { initImageClip } from './image-slice-engine.js';
import { initVideoMotion } from './video-motion-engine.js';
import { initGallery } from './gallery-motion-engine.js';
import { initBeforeAfter } from './before-after-engine.js';

export function media(target, config) {
  console.log('[AnimX Media] Initialized generic media router', target, config);
}

export function imageReveal(target, config) { initImageReveal(target, config); }
export function imageMask(target, config) { initImageMask(target, config); }
export function imageClip(target, config) { initImageClip(target, config); }

export function mediaHover(target, config) {
  console.log('[AnimX Media] Hover media initialized', target, config);
}

export function mediaParallax(target, config) {
  console.log('[AnimX Media] Parallax initialized', target, config);
}

export function videoMotion(target, config) { initVideoMotion(target, config); }

export function gallery(target, config) { initGallery(target, config); }

export function lightboxMotion(target, config) {
  console.log('[AnimX Media] Lightbox initialized', target, config);
}

export function beforeAfter(target, config) { initBeforeAfter(target, config); }

export function validateMediaEffect(config) {
  if (!config) return { ok: false, errors: ['No media configuration provided'] };
  return { ok: true, errors: [] };
}

export function getMediaEffects() {
  return [];
}

export function destroyMediaEffects() {
  console.log('[AnimX Media] Cleanup triggered');
}
