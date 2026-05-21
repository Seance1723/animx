import { isReducedMotion } from '../core/reduced-motion.js';

export function dispatchInteractionEvent(element, name, detail) {
  if (typeof document !== 'undefined') {
    const event = new CustomEvent(`animx:${name}`, { detail, bubbles: true });
    (element || document).dispatchEvent(event);
  }
}

export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

export function getPointerPosition(e, element) {
  const rect = element.getBoundingClientRect();
  let clientX = e.clientX;
  let clientY = e.clientY;
  
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  }
  
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
    centerX: clientX - rect.left - rect.width / 2,
    centerY: clientY - rect.top - rect.height / 2,
    width: rect.width,
    height: rect.height,
    clientX,
    clientY
  };
}

export function isMotionSafe(type) {
  if (isReducedMotion()) {
    // Return false for layout heavy or continuous updates if reduced motion enabled
    if (type === 'magnetic' || type === 'tilt') return false;
  }
  return true;
}

import { getConfig } from '../core/config.js';

export function getInteractionConfig() {
  const config = getConfig();
  return config.interactions || { enabled: true, hover: true, press: true, focus: true, ripple: true, magnetic: true, tilt: true, reducedMotionSafe: true };
}
