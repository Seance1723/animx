import { saveInteractionState, getInteractionState, removeInteractionState } from './interaction-state.js';
import { dispatchInteractionEvent, getInteractionConfig } from './interaction-utils.js';

export function runHover(element, options, animxInstance) {
  const config = getInteractionConfig();
  if (!config.hover) return null;
  
  // If already initialized, destroy first
  const existing = getInteractionState(element, 'hover');
  if (existing) existing.destroy();
  
  let enterAnim = null;
  let leaveAnim = null;
  
  if (typeof options === 'string') {
    enterAnim = options;
  } else if (options && typeof options === 'object') {
    enterAnim = options.enter || null;
    leaveAnim = options.leave || null;
  }
  
  let isHovered = false;
  let isEnabled = true;
  let currentInstance = null;
  
  element.classList.add('ax-interaction-ready');
  
  const onPointerEnter = (e) => {
    if (!isEnabled || e.pointerType === 'touch') return; // Do not stick hover on touch
    isHovered = true;
    element.classList.add('ax-interaction-active', 'ax-hovered');
    
    if (enterAnim) {
      if (currentInstance) currentInstance.stop();
      currentInstance = animxInstance.animate(element, enterAnim, options);
    } else {
      // If no explicit animation but class exists
      if (typeof options === 'string') {
         // Just toggle the class because CSS takes over
         element.classList.add(options);
      }
    }
    
    dispatchInteractionEvent(element, 'hover-enter', { options });
    if (options.onEnter) options.onEnter(element);
  };
  
  const onPointerLeave = (e) => {
    if (!isEnabled || e.pointerType === 'touch') return;
    isHovered = false;
    element.classList.remove('ax-interaction-active', 'ax-hovered');
    
    if (leaveAnim) {
      if (currentInstance) currentInstance.stop();
      currentInstance = animxInstance.animate(element, leaveAnim, options);
    } else {
      if (typeof options === 'string') {
         // Some CSS animations expect to just remove the class to revert safely
         // Let CSS transitions handle the revert
      } else if (currentInstance) {
         // Reverse WAAPI manually if no leave animation provided? No, CSS hover naturally reverts.
         // If they used a WAAPI preset, and didn't provide a leave anim, WAAPI might persist the transform.
         // In AnimX we generally rely on CSS states for hover or explicit leave anims.
      }
    }
    
    dispatchInteractionEvent(element, 'hover-leave', { options });
    if (options.onLeave) options.onLeave(element);
  };
  
  // Fallback to mouse events if pointer events are weird
  element.addEventListener('pointerenter', onPointerEnter);
  element.addEventListener('pointerleave', onPointerLeave);
  
  const instance = {
    element,
    type: 'hover',
    enable: () => { isEnabled = true; },
    disable: () => {
      isEnabled = false;
      isHovered = false;
      element.classList.remove('ax-interaction-active', 'ax-hovered');
    },
    destroy: () => {
      element.removeEventListener('pointerenter', onPointerEnter);
      element.removeEventListener('pointerleave', onPointerLeave);
      instance.disable();
      element.classList.remove('ax-interaction-ready');
      if (currentInstance) currentInstance.stop();
      removeInteractionState(element, 'hover');
    },
    isEnabled: () => isEnabled
  };
  
  saveInteractionState(element, 'hover', instance);
  dispatchInteractionEvent(element, 'interaction-ready', { type: 'hover', instance });
  
  return instance;
}
