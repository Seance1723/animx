import { saveInteractionState, getInteractionState, removeInteractionState } from './interaction-state.js';
import { dispatchInteractionEvent, getInteractionConfig } from './interaction-utils.js';

export function runPress(element, options, animxInstance) {
  const config = getInteractionConfig();
  if (!config.press) return null;
  
  const existing = getInteractionState(element, 'press');
  if (existing) existing.destroy();
  
  let isPressed = false;
  let isEnabled = true;
  let pressAnim = typeof options === 'string' ? options : (options.down || null);
  let upAnim = typeof options === 'object' ? options.up : null;
  let currentInstance = null;
  
  element.classList.add('ax-interaction-ready');
  // Make focusable if it's not
  if (!element.hasAttribute('tabindex') && element.tagName !== 'BUTTON' && element.tagName !== 'A' && element.tagName !== 'INPUT') {
    element.setAttribute('tabindex', '0');
  }
  
  const activate = () => {
    if (!isEnabled || isPressed) return;
    isPressed = true;
    element.classList.add('ax-interaction-active', 'ax-pressed');
    
    if (pressAnim) {
      if (currentInstance) currentInstance.stop();
      currentInstance = animxInstance.animate(element, pressAnim, options);
    }
    
    dispatchInteractionEvent(element, 'press-start', { options });
    if (options.onPressStart) options.onPressStart(element);
  };
  
  const deactivate = () => {
    if (!isEnabled || !isPressed) return;
    isPressed = false;
    element.classList.remove('ax-interaction-active', 'ax-pressed');
    
    if (upAnim) {
      if (currentInstance) currentInstance.stop();
      currentInstance = animxInstance.animate(element, upAnim, options);
    }
    
    dispatchInteractionEvent(element, 'press-end', { options });
    if (options.onPressEnd) options.onPressEnd(element);
  };
  
  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return; // Only left click
    activate();
  };
  
  const onPointerUp = () => deactivate();
  const onPointerLeave = () => deactivate();
  
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent scroll on space
      activate();
    }
  };
  
  const onKeyUp = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      deactivate();
    }
  };
  
  element.addEventListener('pointerdown', onPointerDown);
  element.addEventListener('pointerup', onPointerUp);
  element.addEventListener('pointercancel', onPointerUp);
  element.addEventListener('pointerleave', onPointerLeave);
  element.addEventListener('keydown', onKeyDown);
  element.addEventListener('keyup', onKeyUp);
  
  const instance = {
    element,
    type: 'press',
    enable: () => { isEnabled = true; },
    disable: () => {
      isEnabled = false;
      deactivate();
    },
    destroy: () => {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerUp);
      element.removeEventListener('pointerleave', onPointerLeave);
      element.removeEventListener('keydown', onKeyDown);
      element.removeEventListener('keyup', onKeyUp);
      instance.disable();
      element.classList.remove('ax-interaction-ready');
      if (currentInstance) currentInstance.stop();
      removeInteractionState(element, 'press');
    },
    isEnabled: () => isEnabled
  };
  
  saveInteractionState(element, 'press', instance);
  dispatchInteractionEvent(element, 'interaction-ready', { type: 'press', instance });
  
  return instance;
}
