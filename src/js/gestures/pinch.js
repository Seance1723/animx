// pinch.js
// Basic pinch/zoom gesture for touch devices

import { normalizeSelector } from '../core/selector.js';
import { getPointerEventData, distance, dispatchGestureEvent } from './gesture-utils.js';
import { addGestureInstance, removeGestureInstance } from './gesture-state.js';

export function pinch(target, options = {}) {
  const elements = normalizeSelector(target);
  const instances = [];

  elements.forEach(el => {
    el.classList.add('ax-pinch-ready');
    
    const config = {
      minScale: 0.5,
      maxScale: 3,
      startScale: 1,
      disabled: false,
      useTransform: true,
      ...options
    };

    let enabled = !config.disabled;
    let activePointers = new Map();
    let initialDistance = 0;
    let currentScale = config.startScale;
    let scaleAtStart = config.startScale;

    const onPointerDown = (e) => {
      if (!enabled) return;
      const ptr = getPointerEventData(e);
      activePointers.set(ptr.id, ptr);
      
      if (activePointers.size === 2) {
        const pts = Array.from(activePointers.values());
        initialDistance = distance(pts[0].x, pts[0].y, pts[1].x, pts[1].y);
        scaleAtStart = currentScale;
        
        dispatchGestureEvent(el, 'pinch-start', { scale: currentScale, originalEvent: e });
        if (config.onStart) config.onStart({ scale: currentScale, originalEvent: e });
      }
    };

    const onPointerMove = (e) => {
      if (!activePointers.has(e.pointerId)) return;
      activePointers.set(e.pointerId, getPointerEventData(e));
      
      if (activePointers.size === 2) {
        e.preventDefault(); // prevent scroll/zoom browser default
        const pts = Array.from(activePointers.values());
        const currentDistance = distance(pts[0].x, pts[0].y, pts[1].x, pts[1].y);
        
        if (initialDistance > 0) {
          let newScale = scaleAtStart * (currentDistance / initialDistance);
          newScale = Math.max(config.minScale, Math.min(newScale, config.maxScale));
          
          if (newScale !== currentScale) {
            currentScale = newScale;
            if (config.useTransform) {
              el.style.transform = `scale(${currentScale})`;
            }
            dispatchGestureEvent(el, 'pinch', { scale: currentScale, originalEvent: e });
            if (config.onScale) config.onScale({ scale: currentScale, originalEvent: e });
          }
        }
      }
    };

    const onPointerUp = (e) => {
      if (activePointers.has(e.pointerId)) {
        activePointers.delete(e.pointerId);
        if (activePointers.size < 2 && initialDistance > 0) {
          initialDistance = 0;
          dispatchGestureEvent(el, 'pinch-end', { scale: currentScale, originalEvent: e });
          if (config.onEnd) config.onEnd({ scale: currentScale, originalEvent: e });
        }
      }
    };

    const bind = () => {
      el.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointermove', onPointerMove, { passive: false });
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
      disable: () => { enabled = false; activePointers.clear(); },
      destroy: () => {
        unbind();
        el.classList.remove('ax-pinch-ready');
        removeGestureInstance(el, instance);
      },
      refresh: () => {},
      isEnabled: () => enabled,
      getScale: () => currentScale,
      setScale: (s) => {
        currentScale = Math.max(config.minScale, Math.min(s, config.maxScale));
        if (config.useTransform) el.style.transform = `scale(${currentScale})`;
      }
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
    isEnabled: () => instances.length > 0 && instances[0].isEnabled(),
    getScale: () => instances.length ? instances[0].getScale() : 1,
    setScale: (s) => instances.forEach(i => i.setScale(s))
  };
}
