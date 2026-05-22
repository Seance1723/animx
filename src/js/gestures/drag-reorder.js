// drag-reorder.js
// Practical drag-to-reorder combining draggable and FLIP

import { draggable } from './draggable.js';
import { normalizeSelector } from '../core/selector.js';
import { dispatchGestureEvent } from './gesture-utils.js';
// We need to access layout tools, but to avoid circular deps we might need to rely on AnimX global
// However, since we are inside src, we can import layout-api if needed.
// Wait, flip is inside layout/. We will import it directly.
import { flip } from '../layout/flip.js';

export function dragReorder(target, options = {}) {
  const containers = normalizeSelector(target);
  const instances = [];

  containers.forEach(container => {
    container.classList.add('ax-drag-reorder');
    
    const config = {
      items: null,
      axis: 'y', // 'x', 'y', 'both'
      animation: true,
      duration: 300,
      ease: 'smooth',
      handle: null,
      ...options
    };

    if (!config.items) return;

    let dragInstances = [];
    let activeItem = null;
    let placeholder = null;

    const getItems = () => normalizeSelector(config.items, container).filter(i => i !== placeholder);

    const initItems = () => {
      // Destroy old
      dragInstances.forEach(i => i.destroy());
      dragInstances = [];

      const items = getItems();
      items.forEach(item => {
        const inst = draggable(item, {
          axis: config.axis,
          handle: config.handle,
          useTransform: true, // We will manually manage the dragging transform
          onStart: () => {
            activeItem = item;
            item.style.zIndex = '9999';
            
            // Create placeholder
            placeholder = document.createElement(item.tagName);
            placeholder.className = item.className;
            placeholder.classList.add('ax-drag-placeholder');
            placeholder.classList.remove('ax-draggable', 'ax-dragging');
            placeholder.style.width = item.offsetWidth + 'px';
            placeholder.style.height = item.offsetHeight + 'px';
            
            // Insert placeholder
            container.insertBefore(placeholder, item);
            
            // Fix active item to absolute to pull it out of flow visually but keep in DOM
            item.style.position = 'absolute';
            item.style.width = placeholder.style.width;
            item.style.height = placeholder.style.height;
            // The drag engine uses transform translate3d, so it will shift from its new static absolute origin.
            // We need to offset its starting position so it doesn't jump.
            const pRect = placeholder.getBoundingClientRect();
            const iRect = item.getBoundingClientRect();
            const startX = pRect.left - iRect.left;
            const startY = pRect.top - iRect.top;
            inst.setPosition(startX, startY);
          },
          onMove: (data) => {
            if (!activeItem || !placeholder) return;
            // We use simple DOM distance checking
            const activeRect = activeItem.getBoundingClientRect();
            const siblings = getItems().filter(i => i !== activeItem);
            
            let closest = null;
            let closestDist = Infinity;
            const center = {
              x: activeRect.left + activeRect.width / 2,
              y: activeRect.top + activeRect.height / 2
            };

            siblings.forEach(sib => {
              const rect = sib.getBoundingClientRect();
              const sibCenter = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
              };
              const dist = Math.abs(center.x - sibCenter.x) + Math.abs(center.y - sibCenter.y);
              if (dist < closestDist) {
                closestDist = dist;
                closest = sib;
              }
            });

            if (closest && closestDist < (config.axis === 'y' ? activeRect.height : activeRect.width)) {
              // Time to swap placeholder
              const action = () => {
                const isAfter = (center.y > (closest.getBoundingClientRect().top + closest.getBoundingClientRect().height / 2));
                if (config.axis === 'x') {
                  // logic for x...
                }
                if (isAfter) {
                  container.insertBefore(placeholder, closest.nextSibling);
                } else {
                  container.insertBefore(placeholder, closest);
                }
              };

              if (config.animation) {
                // We flip the siblings so they slide nicely
                flip(siblings, action, { duration: config.duration, ease: config.ease });
              } else {
                action();
              }
            }
          },
          onEnd: () => {
            if (activeItem && placeholder) {
              container.insertBefore(activeItem, placeholder);
              placeholder.remove();
              placeholder = null;
              
              activeItem.style.position = '';
              activeItem.style.zIndex = '';
              activeItem.style.width = '';
              activeItem.style.height = '';
              inst.setPosition(0, 0); // reset transform
              
              activeItem = null;
              
              dispatchGestureEvent(container, 'drag-reorder', { items: getItems() });
              if (config.onReorder) config.onReorder({ items: getItems() });
            }
          },
          onCancel: () => {
             // same as end
             if (activeItem && placeholder) {
              container.insertBefore(activeItem, placeholder);
              placeholder.remove();
              placeholder = null;
              activeItem.style.position = '';
              activeItem.style.zIndex = '';
              activeItem.style.width = '';
              activeItem.style.height = '';
              inst.setPosition(0, 0);
              activeItem = null;
             }
          }
        });
        dragInstances.push(inst);
      });
    };

    initItems();

    const instance = {
      elements: [container],
      enable: () => dragInstances.forEach(i => i.enable()),
      disable: () => dragInstances.forEach(i => i.disable()),
      destroy: () => {
        dragInstances.forEach(i => i.destroy());
        container.classList.remove('ax-drag-reorder');
      },
      refresh: () => initItems(),
      isEnabled: () => dragInstances.length > 0 && dragInstances[0].isEnabled()
    };
    instances.push(instance);
  });

  return {
    elements: containers,
    enable: () => instances.forEach(i => i.enable()),
    disable: () => instances.forEach(i => i.disable()),
    destroy: () => instances.forEach(i => i.destroy()),
    refresh: () => instances.forEach(i => i.refresh()),
    isEnabled: () => instances.length > 0 && instances[0].isEnabled()
  };
}
