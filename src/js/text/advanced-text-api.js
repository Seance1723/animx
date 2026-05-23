/**
 * AnimX Advanced Text API (v3.21.0)
 */

import { initRollingText } from './rolling-text-engine.js';
import { initScrambleText } from './scramble-text-engine.js';
import { initCounterText } from './counter-text-engine.js';
import { initMarqueeText, destroyMarquee } from './marquee-text-engine.js';

export function rollText(target, config) { initRollingText(target, config); }
export function slotText(target, config) { initRollingText(target, config); } // Aliased for now
export function scrambleText(target, config) { initScrambleText(target, config); }
export function marqueeText(target, config) { initMarqueeText(target, config); }
export function counterText(target, config) { initCounterText(target, config); }
export function scrollText(target, config) { console.log('[AnimX Text] scrollText initialised', target, config); }
export function kineticText(target, config) { console.log('[AnimX Text] kineticText initialised', target, config); }
export function typeText(target, config) { console.log('[AnimX Text] typeText initialised', target, config); }

export function validateTextEffect(config) {
  if (!config) return { ok: false, errors: ['No text configuration provided'] };
  return { ok: true, errors: [] };
}

export function destroyTextEffects() {
  destroyMarquee();
}
