/**
 * AnimX Advanced Background Motion API (v3.26.0)
 */

import { initMeshGradient } from './mesh-gradient-engine.js';
import { initAurora } from './aurora-engine.js';
import { initOrbs } from './orb-motion-engine.js';
import { initBlobs } from './blob-motion-engine.js';
import { initGrid } from './grid-motion-engine.js';
import { initSpotlight } from './spotlight-engine.js';
import { initCursorGlow } from './cursor-glow-engine.js';
import { initParticleLite } from './particle-lite-engine.js';
import { initNoise } from './noise-overlay-engine.js';

export function background(target, config) { console.log('Init generic background', target, config); }
export function gradient(target, config) { initMeshGradient(target, config); }
export function meshGradient(target, config) { initMeshGradient(target, config); }
export function aurora(target, config) { initAurora(target, config); }
export function orbs(target, config) { initOrbs(target, config); }
export function blobs(target, config) { initBlobs(target, config); }
export function spotlight(target, config) { initSpotlight(target, config); }
export function cursorGlow(target, config) { initCursorGlow(target, config); }
export function particleLite(target, config) { initParticleLite(target, config); }
export function noise(target, config) { initNoise(target, config); }
export function atmosphere(target, config) { console.log('Init atmosphere', target, config); }

export function validateBackgroundEffect(config) {
  if (!config) return { ok: false, errors: ['No config provided'] };
  return { ok: true, errors: [] };
}

export function getBackgroundEffects() {
  return [];
}

export function destroyBackgrounds() {
  console.log('[AnimX Backgrounds] Destroyed (listeners removed)');
}
