// long-press.js
// Detects long press gestures

import { normalizeSelector } from '../core/selector.js';
import { getPointerEventData, distance, dispatchGestureEvent } from './gesture-utils.js';
import { addGestureInstance, removeGestureInstance } from './gesture-state.js';

export function longPress(target, options = {}) {
  const elements = normalizeSelector(target);
  const instances = [];

  elements.forEach(el => {
    el.classList.add('ax-long-press-ready');
    
    const config = {
      duration: 600,
      moveTolerance: 8,
      disabled: false,
      ...options
    };

    let enabled = !config.disabled;
    let pointerId = null;
    let startX = 0, startY = 0;
    let timer = null;

    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      el.classList.remove('ax-long-press-active');
    };

    const triggerLongPress = (e) => {
      if (!enabled || pointerId === null) return;
      el.classList.add('ax-long-press-active');
      const data = { x: startX, y: startY, originalEvent: e };
      dispatchGestureEvent(el, 'long-press', data);
      if (config.onLongPress) config.onLongPress(data);
      pointerId = null; // Consume event
    };

    const onPointerDown = (e) => {
      if (!enabled) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      
      pointerId = e.pointerId;
      const ptr = getPointerEventData(e);
      startX = ptr.x;
      startY = ptr.y;
      
      clearTimer();
      timer = setTimeout(() => triggerLongPress(e), config.duration);
      
      if (config.onStart) config.onStart({ originalEvent: e });
    };

    const onPointerMove = (e) => {
      if (e.pointerId !== pointerId) return;
      const ptr = getPointerEventData(e);
      if (distance(startX, startY, ptr.x, ptr.y) > config.moveTolerance) {
        clearTimer();
        pointerId = null;
        if (config.onCancel) config.onCancel({ originalEvent: e });
      }
    };

    const onPointerUp = (e) => {
      if (e.pointerId === pointerId) {
        clearTimer();
        pointerId = null;
        if (config.onCancel) config.onCancel({ originalEvent: e });
      }
    };

    const bind = () => {
      el.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointermove', onPointerMove, { passive: true });
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
      disable: () => { enabled = false; clearTimer(); pointerId = null; },
      destroy: () => {
        unbind();
        clearTimer();
        el.classList.remove('ax-long-press-ready');
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
