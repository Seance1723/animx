import { saveInteractionState, getInteractionState, removeInteractionState } from './interaction-state.js';
import { dispatchInteractionEvent, getInteractionConfig } from './interaction-utils.js';

export function runFocus(element, options, animxInstance) {
  const config = getInteractionConfig();
  if (!config.focus) return null;
  
  const existing = getInteractionState(element, 'focus');
  if (existing) existing.destroy();
  
  let isFocused = false;
  let isEnabled = true;
  let focusAnim = typeof options === 'string' ? options : (options.focus || null);
  let blurAnim = typeof options === 'object' ? options.blur : null;
  let currentInstance = null;
  
  element.classList.add('ax-interaction-ready');
  if (!element.hasAttribute('tabindex') && element.tagName !== 'BUTTON' && element.tagName !== 'A' && element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA') {
    element.setAttribute('tabindex', '0');
  }
  
  const onFocus = () => {
    if (!isEnabled) return;
    isFocused = true;
    element.classList.add('ax-interaction-active', 'ax-focused');
    
    if (focusAnim) {
      if (currentInstance) currentInstance.stop();
      currentInstance = animxInstance.animate(element, focusAnim, options);
    }
    
    dispatchInteractionEvent(element, 'focus-start', { options });
    if (options.onFocus) options.onFocus(element);
  };
  
  const onBlur = () => {
    if (!isEnabled) return;
    isFocused = false;
    element.classList.remove('ax-interaction-active', 'ax-focused');
    
    if (blurAnim) {
      if (currentInstance) currentInstance.stop();
      currentInstance = animxInstance.animate(element, blurAnim, options);
    }
    
    dispatchInteractionEvent(element, 'focus-end', { options });
    if (options.onBlur) options.onBlur(element);
  };
  
  element.addEventListener('focusin', onFocus);
  element.addEventListener('focusout', onBlur);
  
  const instance = {
    element,
    type: 'focus',
    enable: () => { isEnabled = true; },
    disable: () => {
      isEnabled = false;
      if (isFocused) onBlur();
    },
    destroy: () => {
      element.removeEventListener('focusin', onFocus);
      element.removeEventListener('focusout', onBlur);
      instance.disable();
      element.classList.remove('ax-interaction-ready');
      if (currentInstance) currentInstance.stop();
      removeInteractionState(element, 'focus');
    },
    isEnabled: () => isEnabled
  };
  
  saveInteractionState(element, 'focus', instance);
  dispatchInteractionEvent(element, 'interaction-ready', { type: 'focus', instance });
  
  return instance;
}
