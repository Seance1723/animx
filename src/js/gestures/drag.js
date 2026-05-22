// drag.js
// Core Pointer Event drag implementation

import { normalizeSelector } from '../core/selector.js';
import { getPointerEventData, parseGrid, snapToGrid, dispatchGestureEvent } from './gesture-utils.js';
import { resolveBounds, applyConstraints } from './drag-constraints.js';
import { PhysicsSimulation } from './drag-physics.js';
import { addGestureInstance, removeGestureInstance } from './gesture-state.js';
import { getConfig } from '../core/config.js';
import { isReducedMotion } from '../core/reduced-motion.js';

export function drag(target, options = {}) {
  const elements = normalizeSelector(target);
  if (!elements.length) {
    return {
      elements: [],
      enable: () => {},
      disable: () => {},
      destroy: () => {},
      refresh: () => {},
      isEnabled: () => false,
      reset: () => {},
      setPosition: () => {},
      getPosition: () => ({ x: 0, y: 0 }),
      isDragging: () => false
    };
  }

  const el = elements[0];
  
  const config = {
    axis: 'both', // 'x', 'y', 'both'
    bounds: null,
    handle: null,
    disabled: false,
    inertia: false,
    spring: false,
    snapBack: false,
    grid: null,
    threshold: 3,
    preventScroll: false,
    lockScrollOnDrag: false,
    useTransform: true,
    ...options
  };

  const globalConfig = getConfig();
  let enabled = !config.disabled;
  let isDragging = false;
  let pointerId = null;
  
  let startX = 0, startY = 0;
  let currentX = 0, currentY = 0; // The actual translation applied
  let pointerStartX = 0, pointerStartY = 0;
  
  let velocityX = 0, velocityY = 0;
  let lastTime = 0;
  let lastPointerX = 0, lastPointerY = 0;
  
  let gridConfig = parseGrid(config.grid);
  let resolvedBounds = null;
  let hasMovedPastThreshold = false;

  let rafId = null;
  let physics = new PhysicsSimulation(
    (x, y) => {
      currentX = x;
      currentY = y;
      applyTransform();
    },
    () => {
      dispatchGestureEvent(el, 'drag-end', { x: currentX, y: currentY });
      if (config.onEnd) config.onEnd({ x: currentX, y: currentY });
    }
  );

  const applyTransform = () => {
    if (config.useTransform) {
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }
    if (config.onMove) {
      config.onMove({ x: currentX, y: currentY, velocityX, velocityY });
    }
    dispatchGestureEvent(el, 'drag-move', { x: currentX, y: currentY, velocityX, velocityY });
  };

  const onPointerDown = (e) => {
    if (!enabled) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return; // Only left click
    
    if (config.handle) {
      const handles = normalizeSelector(config.handle, el);
      const isHandle = handles.some(h => h === e.target || h.contains(e.target));
      if (!isHandle) return;
    }

    // Capture pointer
    if (globalConfig.gestures?.pointerCapture !== false && el.setPointerCapture) {
      try { el.setPointerCapture(e.pointerId); } catch(err) {}
    }

    physics.stop();
    pointerId = e.pointerId;
    isDragging = true;
    hasMovedPastThreshold = false;
    
    const ptr = getPointerEventData(e);
    pointerStartX = ptr.x;
    pointerStartY = ptr.y;
    lastPointerX = ptr.x;
    lastPointerY = ptr.y;
    lastTime = performance.now();
    velocityX = 0;
    velocityY = 0;

    resolvedBounds = resolveBounds(el, config.bounds);

    dispatchGestureEvent(el, 'drag-start', { originalEvent: e, x: currentX, y: currentY });
    if (config.onStart) config.onStart({ originalEvent: e, x: currentX, y: currentY });
    
    if (config.preventScroll) {
      e.preventDefault();
    }
  };

  const onPointerMove = (e) => {
    if (!isDragging || e.pointerId !== pointerId) return;

    if (config.preventScroll || (config.lockScrollOnDrag && hasMovedPastThreshold)) {
      e.preventDefault();
    }

    const ptr = getPointerEventData(e);
    const deltaX = ptr.x - pointerStartX;
    const deltaY = ptr.y - pointerStartY;
    
    if (!hasMovedPastThreshold) {
      if (Math.abs(deltaX) > config.threshold || Math.abs(deltaY) > config.threshold) {
        hasMovedPastThreshold = true;
      } else {
        return;
      }
    }

    // Velocity tracking
    const now = performance.now();
    const dt = Math.max(now - lastTime, 1);
    velocityX = (ptr.x - lastPointerX) / dt;
    velocityY = (ptr.y - lastPointerY) / dt;
    lastPointerX = ptr.x;
    lastPointerY = ptr.y;
    lastTime = now;

    let targetX = startX + deltaX;
    let targetY = startY + deltaY;

    if (gridConfig) {
      targetX = snapToGrid(targetX, gridConfig.x);
      targetY = snapToGrid(targetY, gridConfig.y);
    }

    const constrained = applyConstraints(targetX, targetY, config.axis, resolvedBounds);
    
    currentX = constrained.x;
    currentY = constrained.y;

    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        applyTransform();
        rafId = null;
      });
    }
  };

  const onPointerUp = (e) => {
    if (!isDragging || e.pointerId !== pointerId) return;
    
    if (globalConfig.gestures?.pointerCapture !== false && el.releasePointerCapture) {
      try { el.releasePointerCapture(e.pointerId); } catch(err) {}
    }

    isDragging = false;
    pointerId = null;
    startX = currentX;
    startY = currentY;

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    const reduced = isReducedMotion() && globalConfig.gestures?.reducedMotionSafe !== false;

    if (config.snapBack) {
      if (!reduced) {
        physics.startSpring(currentX, currentY, 0, 0, { stiffness: 200, damping: 20 });
        startX = 0; startY = 0;
      } else {
        currentX = 0; currentY = 0; startX = 0; startY = 0;
        applyTransform();
        dispatchGestureEvent(el, 'drag-end', { x: currentX, y: currentY });
      }
    } else if (config.inertia && !reduced) {
      // Multiply velocity by a factor to make the inertia feel right
      physics.startInertia(currentX, currentY, velocityX * 16, velocityY * 16, { spring: config.spring }, resolvedBounds);
    } else {
      dispatchGestureEvent(el, 'drag-end', { x: currentX, y: currentY });
      if (config.onEnd) config.onEnd({ x: currentX, y: currentY });
    }
  };

  const onPointerCancel = (e) => {
    if (!isDragging || e.pointerId !== pointerId) return;
    isDragging = false;
    pointerId = null;
    dispatchGestureEvent(el, 'drag-cancel', { originalEvent: e });
    if (config.onCancel) config.onCancel({ originalEvent: e });
  };

  const bind = () => {
    el.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove, { passive: !config.preventScroll && !config.lockScrollOnDrag });
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerCancel);
  };

  const unbind = () => {
    el.removeEventListener('pointerdown', onPointerDown);
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    document.removeEventListener('pointercancel', onPointerCancel);
  };

  bind();

  const instance = {
    elements: [el],
    enable: () => { enabled = true; },
    disable: () => { enabled = false; isDragging = false; physics.stop(); },
    destroy: () => {
      unbind();
      physics.stop();
      if (rafId) cancelAnimationFrame(rafId);
      removeGestureInstance(el, instance);
    },
    refresh: () => {
      resolvedBounds = resolveBounds(el, config.bounds);
      gridConfig = parseGrid(config.grid);
    },
    isEnabled: () => enabled,
    reset: () => {
      currentX = 0; currentY = 0; startX = 0; startY = 0;
      applyTransform();
    },
    setPosition: (x, y) => {
      currentX = x; currentY = y; startX = x; startY = y;
      applyTransform();
    },
    getPosition: () => ({ x: currentX, y: currentY }),
    isDragging: () => isDragging
  };

  addGestureInstance(el, instance);
  dispatchGestureEvent(el, 'gesture-ready', { type: 'drag' });

  return instance;
}
