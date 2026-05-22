// gesture-api.js
// Public entry points for gestures

import { normalizeSelector } from '../core/selector.js';
import { drag } from './drag.js';
import { draggable } from './draggable.js';
import { swipe } from './swipe.js';
import { pan } from './pan.js';
import { pinch } from './pinch.js';
import { longPress } from './long-press.js';
import { dragReorder } from './drag-reorder.js';
import { destroyGestures, refreshGestures } from './gesture-state.js';
import { PhysicsSimulation } from './drag-physics.js';

export function gesture(target, options = {}) {
  const instances = [];
  if (options.drag) instances.push(draggable(target, typeof options.drag === 'object' ? options.drag : {}));
  if (options.swipe) instances.push(swipe(target, typeof options.swipe === 'object' ? options.swipe : {}));
  if (options.pan) instances.push(pan(target, typeof options.pan === 'object' ? options.pan : {}));
  if (options.pinch) instances.push(pinch(target, typeof options.pinch === 'object' ? options.pinch : {}));
  if (options.longPress) instances.push(longPress(target, typeof options.longPress === 'object' ? options.longPress : {}));
  
  return {
    instances,
    enable: () => instances.forEach(i => i.enable()),
    disable: () => instances.forEach(i => i.disable()),
    destroy: () => instances.forEach(i => i.destroy()),
    refresh: () => instances.forEach(i => i.refresh())
  };
}

// Helpers for manual physics
export function spring(target, options = {}) {
  const els = normalizeSelector(target);
  els.forEach(el => {
    let currentX = 0; let currentY = 0;
    // Basic approximation assuming starting from transform
    const phys = new PhysicsSimulation((x, y) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, null);
    phys.startSpring(currentX, currentY, options.x || 0, options.y || 0, options);
  });
}

export function inertia(target, options = {}) {
  const els = normalizeSelector(target);
  els.forEach(el => {
    let currentX = 0; let currentY = 0;
    const phys = new PhysicsSimulation((x, y) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, null);
    phys.startInertia(currentX, currentY, options.velocityX || 0, options.velocityY || 0, options);
  });
}

export function destroyGesturesApi(target) {
  if (!target) {
    // If no target, we'd need to track all global instances, but for safety we expect targets
    return;
  }
  const els = normalizeSelector(target);
  els.forEach(el => destroyGestures(el));
}

export function refreshGesturesApi(target) {
  if (!target) return;
  const els = normalizeSelector(target);
  els.forEach(el => refreshGestures(el));
}

export function bindGestureAnimX(animxInstance) {
  animxInstance.gesture = gesture;
  animxInstance.drag = drag;
  animxInstance.draggable = draggable;
  animxInstance.dragReorder = dragReorder;
  animxInstance.swipe = swipe;
  animxInstance.pan = pan;
  animxInstance.pinch = pinch;
  animxInstance.longPress = longPress;
  animxInstance.spring = spring;
  animxInstance.inertia = inertia;
  animxInstance.destroyGestures = destroyGesturesApi;
  animxInstance.refreshGestures = refreshGesturesApi;
}

export {
  drag,
  draggable,
  dragReorder,
  swipe,
  pan,
  pinch,
  longPress
};
