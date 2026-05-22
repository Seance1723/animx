// swipe.js
// Swipe gesture detection

import { normalizeSelector } from '../core/selector.js';
import { getPointerEventData, dispatchGestureEvent } from './gesture-utils.js';
import { addGestureInstance, removeGestureInstance } from './gesture-state.js';
import { getConfig } from '../core/config.js';

export function swipe(target, options = {}) {
  const elements = normalizeSelector(target);
  const instances = [];

  elements.forEach(el => {
    el.classList.add('ax-swipe-ready');
    
    const config = {
      direction: 'any', // any, left, right, up, down, horizontal, vertical
      threshold: 60,
      velocity: 0.25,
      preventScroll: false,
      disabled: false,
      ...options
    };

    let enabled = !config.disabled;
    let pointerId = null;
    let startX = 0, startY = 0;
    let lastX = 0, lastY = 0;
    let lastTime = 0;

    const onPointerDown = (e) => {
      if (!enabled) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      
      pointerId = e.pointerId;
      const ptr = getPointerEventData(e);
      startX = ptr.x;
      startY = ptr.y;
      lastX = ptr.x;
      lastY = ptr.y;
      lastTime = performance.now();
    };

    const onPointerMove = (e) => {
      if (e.pointerId !== pointerId) return;
      if (config.preventScroll) e.preventDefault();
      
      const ptr = getPointerEventData(e);
      lastX = ptr.x;
      lastY = ptr.y;
    };

    const onPointerUp = (e) => {
      if (e.pointerId !== pointerId) return;
      
      const deltaX = lastX - startX;
      const deltaY = lastY - startY;
      const dt = Math.max(performance.now() - lastTime, 1);
      
      const vX = Math.abs(deltaX / dt);
      const vY = Math.abs(deltaY / dt);
      
      let swipeDirection = null;

      if (Math.abs(deltaX) > config.threshold && vX > config.velocity) {
        swipeDirection = deltaX > 0 ? 'right' : 'left';
      } else if (Math.abs(deltaY) > config.threshold && vY > config.velocity) {
        swipeDirection = deltaY > 0 ? 'down' : 'up';
      }

      if (swipeDirection) {
        // Filter by requested direction
        const matches = 
          config.direction === 'any' || 
          config.direction === swipeDirection ||
          (config.direction === 'horizontal' && (swipeDirection === 'left' || swipeDirection === 'right')) ||
          (config.direction === 'vertical' && (swipeDirection === 'up' || swipeDirection === 'down'));
          
        if (matches) {
          const data = { direction: swipeDirection, deltaX, deltaY, originalEvent: e };
          dispatchGestureEvent(el, 'swipe', data);
          if (config.onSwipe) config.onSwipe(data);
          if (swipeDirection === 'left' && config.onSwipeLeft) config.onSwipeLeft(data);
          if (swipeDirection === 'right' && config.onSwipeRight) config.onSwipeRight(data);
          if (swipeDirection === 'up' && config.onSwipeUp) config.onSwipeUp(data);
          if (swipeDirection === 'down' && config.onSwipeDown) config.onSwipeDown(data);
        }
      }

      pointerId = null;
    };

    const bind = () => {
      el.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointermove', onPointerMove, { passive: !config.preventScroll });
      document.addEventListener('pointerup', onPointerUp);
    };

    const unbind = () => {
      el.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    bind();

    const instance = {
      elements: [el],
      enable: () => { enabled = true; },
      disable: () => { enabled = false; pointerId = null; },
      destroy: () => {
        unbind();
        el.classList.remove('ax-swipe-ready');
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
