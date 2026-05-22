import { getConfig } from '../core/config.js';
import { isReducedMotion } from '../core/reduced-motion.js';

export const layoutInstances = new WeakMap();

export function getLayoutConfig() {
  const global = getConfig();
  return {
    duration: 500,
    ease: 'smooth',
    scale: true,
    cleanup: true,
    reducedMotionSafe: true,
    ...global.layout
  };
}

export function cleanInlineTransforms(element) {
  element.style.transform = '';
  element.style.transition = '';
  element.style.transformOrigin = '';
  if (element.getAttribute('style') === '') {
    element.removeAttribute('style');
  }
}

export function dispatchLayoutEvent(element, eventName, detail = {}) {
  const event = new CustomEvent(`animx:${eventName}`, { detail: { element, ...detail } });
  element.dispatchEvent(event);
}

export class LayoutInstance {
  constructor(elements, type) {
    this.elements = Array.isArray(elements) ? elements : [elements];
    this.type = type;
    this.activeAnimations = [];
    this._status = 'idle';
  }
  
  _addAnim(anim) {
    this.activeAnimations.push(anim);
  }

  play() {
    this.activeAnimations.forEach(a => a.play && a.play());
    this._status = 'running';
  }

  pause() {
    this.activeAnimations.forEach(a => a.pause && a.pause());
    this._status = 'paused';
  }

  resume() {
    this.activeAnimations.forEach(a => a.play && a.play());
    this._status = 'running';
  }

  stop() {
    this.activeAnimations.forEach(a => a.cancel && a.cancel());
    this._status = 'stopped';
  }

  destroy() {
    this.stop();
    this.elements.forEach(el => cleanInlineTransforms(el));
    this.activeAnimations = [];
    this._status = 'destroyed';
  }

  isRunning() {
    return this._status === 'running';
  }
}
