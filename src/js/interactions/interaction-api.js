import { normalizeSelector } from '../core/selector.js';
import { runHover } from './hover.js';
import { runPress } from './press.js';
import { runFocus } from './focus.js';
import { runMagnetic } from './magnetic.js';
import { runRipple } from './ripple.js';
import { runTilt } from './tilt.js';
import { runFeedback } from './feedback.js';
import { getAllInteractions, getInteractionState } from './interaction-state.js';

let coreInstance = null;

export function bindInteractionAnimX(instance) {
  coreInstance = instance;
}

function safeEmpty() {
  return { enable: () => {}, disable: () => {}, destroy: () => {} };
}

export function interact(selector, options = {}) {
  const elements = normalizeSelector(selector);
  if (elements.length === 0) return safeEmpty();
  const instances = elements.map(el => {
    const group = {};
    if (options.hover) group.hover = hover(el, options.hover, options);
    if (options.press) group.press = press(el, options.press, options);
    if (options.focus) group.focus = focus(el, options.focus, options);
    if (options.magnetic) group.magnetic = magnetic(el, typeof options.magnetic === 'object' ? options.magnetic : {});
    if (options.ripple) group.ripple = ripple(el, typeof options.ripple === 'object' ? options.ripple : {});
    if (options.tilt) group.tilt = tilt(el, typeof options.tilt === 'object' ? options.tilt : {});
    return group;
  });
  return instances.length === 1 ? instances[0] : instances;
}

export function hover(selector, animationOrOptions, options = {}) {
  const elements = normalizeSelector(selector);
  if (elements.length === 0) return safeEmpty();
  let opts = typeof animationOrOptions === 'object' ? animationOrOptions : { enter: animationOrOptions, ...options };
  const instances = elements.map(el => runHover(el, opts, coreInstance)).filter(Boolean);
  return instances.length === 1 ? instances[0] : instances;
}

export function press(selector, animationOrOptions, options = {}) {
  const elements = normalizeSelector(selector);
  if (elements.length === 0) return safeEmpty();
  let opts = typeof animationOrOptions === 'object' ? animationOrOptions : { press: animationOrOptions, ...options };
  const instances = elements.map(el => runPress(el, opts, coreInstance)).filter(Boolean);
  return instances.length === 1 ? instances[0] : instances;
}

export function focus(selector, animationOrOptions, options = {}) {
  const elements = normalizeSelector(selector);
  if (elements.length === 0) return safeEmpty();
  let opts = typeof animationOrOptions === 'object' ? animationOrOptions : { focus: animationOrOptions, ...options };
  const instances = elements.map(el => runFocus(el, opts, coreInstance)).filter(Boolean);
  return instances.length === 1 ? instances[0] : instances;
}

export function magnetic(selector, options = {}) {
  const elements = normalizeSelector(selector);
  if (elements.length === 0) return safeEmpty();
  const instances = elements.map(el => runMagnetic(el, options)).filter(Boolean);
  return instances.length === 1 ? instances[0] : instances;
}

export function ripple(selector, options = {}) {
  const elements = normalizeSelector(selector);
  if (elements.length === 0) return safeEmpty();
  const instances = elements.map(el => runRipple(el, options)).filter(Boolean);
  return instances.length === 1 ? instances[0] : instances;
}

export function tilt(selector, options = {}) {
  const elements = normalizeSelector(selector);
  if (elements.length === 0) return safeEmpty();
  const instances = elements.map(el => runTilt(el, options)).filter(Boolean);
  return instances.length === 1 ? instances[0] : instances;
}

export function feedback(selector, type = 'success', options = {}) {
  const elements = normalizeSelector(selector);
  if (elements.length === 0) return safeEmpty();
  const instances = elements.map(el => runFeedback(el, type, options, coreInstance)).filter(Boolean);
  return instances.length === 1 ? instances[0] : instances;
}

export function destroyInteractions(selector) {
  if (!selector) return;
  const elements = normalizeSelector(selector);
  elements.forEach(el => {
    const active = getAllInteractions(el);
    Object.values(active).forEach(instance => {
      if (instance && instance.destroy) instance.destroy();
    });
  });
}
