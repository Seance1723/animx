// pan.js
// Tracks continuous pointer movement

import { normalizeSelector } from '../core/selector.js';
import { getPointerEventData, dispatchGestureEvent } from './gesture-utils.js';
import { addGestureInstance, removeGestureInstance } from './gesture-state.js';

export function pan(target, options = {}) {
  const elements = normalizeSelector(target);
  const instances = [];

  elements.forEach(el => {
    el.classList.add('ax-pan-ready');
    
    const config = {
      disabled: false,
      preventScroll: false,
      ...options
    };

    let enabled = !config.disabled;
    let pointerId = null;
    let startX = 0, startY = 0;
    let lastX = 0, lastY = 0;
    let lastTime = 0;
    let rafId = null;
    let currentX = 0, currentY = 0;

    const dispatchMove = () => {
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      const dt = Math.max(performance.now() - lastTime, 1);
      const velocityX = (currentX - lastX) / dt;
      const velocityY = (currentY - lastY) / dt;

      const data = { x: currentX, y: currentY, deltaX, deltaY, velocityX, velocityY };
      dispatchGestureEvent(el, 'pan-move', data);
      if (config.onMove) config.onMove(data);

      lastX = currentX;
      lastY = currentY;
      lastTime = performance.now();
      rafId = null;
    };

    const onPointerDown = (e) => {
      if (!enabled) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      
      pointerId = e.pointerId;
      const ptr = getPointerEventData(e);
      startX = ptr.x;
      startY = ptr.y;
      currentX = ptr.x;
      currentY = ptr.y;
      lastX = ptr.x;
      lastY = ptr.y;
      lastTime = performance.now();

      const data = { x: startX, y: startY, originalEvent: e };
      dispatchGestureEvent(el, 'pan-start', data);
      if (config.onStart) config.onStart(data);
      
      if (config.preventScroll) e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (e.pointerId !== pointerId) return;
      if (config.preventScroll) e.preventDefault();
      
      const ptr = getPointerEventData(e);
      currentX = ptr.x;
      currentY = ptr.y;
      
      if (!rafId) {
        rafId = requestAnimationFrame(dispatchMove);
      }
    };

    const onPointerUp = (e) => {
      if (e.pointerId !== pointerId) return;
      
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      const data = { x: currentX, y: currentY, originalEvent: e };
      dispatchGestureEvent(el, 'pan-end', data);
      if (config.onEnd) config.onEnd(data);

      pointerId = null;
    };

    const bind = () => {
      el.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointermove', onPointerMove, { passive: !config.preventScroll });
      document.addEventListener('pointerup', onPointerUp);
      document.addEventListener('pointercancel', onPointerUp);
    };

    const unbind = () => {
      el.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onPointerUp);
    };

    bind();

    const instance = {
      elements: [el],
      enable: () => { enabled = true; },
      disable: () => { enabled = false; pointerId = null; },
      destroy: () => {
        unbind();
        if (rafId) cancelAnimationFrame(rafId);
        el.classList.remove('ax-pan-ready');
        removeGestureInstance(el, instance);
      },
      refresh: () => {},
      isEnabled: () => enabled
    };

    addGestureInstance(el, instance);
    instances.push(instance);
  });

  return {
    elements,
    enable: () => instances.forEach(i => i.enable()),
    disable: () => instances.forEach(i => i.disable()),
    destroy: () => instances.forEach(i => i.destroy()),
    refresh: () => instances.forEach(i => i.refresh()),
    isEnabled: () => instances.length > 0 && instances[0].isEnabled()
  };
}
