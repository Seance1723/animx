/**
 * AnimX Advanced Interaction API (v3.24.0)
 */

import { initButton } from './button-effects-engine.js';
import { initLink } from './link-effects-engine.js';
import { initNav, initTabIndicator } from './navigation-motion-engine.js';
import { initDropdown, initMenu } from './dropdown-motion-engine.js';
import { initMobileMenu } from './mobile-menu-motion-engine.js';
import { initButtonState, initNavState } from './button-state-engine.js';

export function button(target, config) { initButton(target, config); }
export function link(target, config) { initLink(target, config); }
export function nav(target, config) { initNav(target, config); }
export function menu(target, config) { initMenu(target, config); }
export function dropdown(target, config) { initDropdown(target, config); }
export function mobileMenu(target, config) { initMobileMenu(target, config); }

export function micro(target, config) {
  console.log('[AnimX Micro] Initialized', target, config);
}

export function buttonState(target, config) { initButtonState(target, config); }
export function navState(target, config) { initNavState(target, config); }
export function tabIndicator(target, config) { initTabIndicator(target, config); }

export function validateInteractionEffect(config) {
  if (!config) return { ok: false, errors: ['No config provided'] };
  return { ok: true, errors: [] };
}

export function getInteractionEffects() {
  return [];
}
