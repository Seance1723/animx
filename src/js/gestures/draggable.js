// draggable.js
// Higher-level wrapper over drag that manages CSS classes

import { drag } from './drag.js';
import { normalizeSelector } from '../core/selector.js';

export function draggable(target, options = {}) {
  const elements = normalizeSelector(target);
  const instances = [];

  elements.forEach(el => {
    el.classList.add('ax-draggable');
    
    if (options.handle) {
      const handles = normalizeSelector(options.handle, el);
      handles.forEach(h => h.classList.add('ax-drag-handle'));
    }

    const onStart = (data) => {
      el.classList.add('ax-dragging');
      if (options.onStart) options.onStart(data);
    };

    const onEnd = (data) => {
      el.classList.remove('ax-dragging');
      if (options.onEnd) options.onEnd(data);
    };

    const onCancel = (data) => {
      el.classList.remove('ax-dragging');
      if (options.onCancel) options.onCancel(data);
    };

    const dragInst = drag(el, { ...options, onStart, onEnd, onCancel });
    
    // Override destroy to clean up classes
    const originalDestroy = dragInst.destroy;
    dragInst.destroy = () => {
      el.classList.remove('ax-draggable', 'ax-dragging');
      if (options.handle) {
        const handles = normalizeSelector(options.handle, el);
        handles.forEach(h => h.classList.remove('ax-drag-handle'));
      }
      originalDestroy();
    };

    instances.push(dragInst);
  });

  return {
    elements,
    enable: () => instances.forEach(i => i.enable()),
    disable: () => instances.forEach(i => i.disable()),
    destroy: () => instances.forEach(i => i.destroy()),
    refresh: () => instances.forEach(i => i.refresh()),
    isEnabled: () => instances.length > 0 && instances[0].isEnabled(),
    reset: () => instances.forEach(i => i.reset()),
    setPosition: (x, y) => instances.forEach(i => i.setPosition(x, y)),
    getPosition: () => instances.length ? instances[0].getPosition() : { x: 0, y: 0 },
    isDragging: () => instances.some(i => i.isDragging())
  };
}
