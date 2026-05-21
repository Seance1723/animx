import { saveInteractionState, getInteractionState, removeInteractionState } from './interaction-state.js';
import { dispatchInteractionEvent, getInteractionConfig, isMotionSafe } from './interaction-utils.js';

export function runRipple(element, options = {}) {
  const config = getInteractionConfig();
  if (!config.ripple) return null;
  
  const existing = getInteractionState(element, 'ripple');
  if (existing) existing.destroy();
  
  let isEnabled = true;
  element.classList.add('ax-interaction-ready', 'ax-ripple-container');
  
  const duration = options.duration || 600;
  const color = options.color || 'rgba(255,255,255,0.45)';
  const centered = options.centered === true;
  const className = options.className || 'ax-ripple-wave';
  
  const createRipple = (e) => {
    if (!isEnabled) return;
    
    // Check motion
    if (!isMotionSafe('ripple')) {
      // Just visually toggle something quick if disabled? The user wanted instant or disabled.
      // Easiest is to disable ripple for reduced motion.
      return;
    }
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    let x, y;
    if (centered) {
      x = rect.width / 2;
      y = rect.height / 2;
    } else {
      let clientX = e.clientX;
      let clientY = e.clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      // Provide defaults if triggered via keyboard
      if (clientX === undefined) clientX = rect.left + rect.width / 2;
      if (clientY === undefined) clientY = rect.top + rect.height / 2;
      
      x = clientX - rect.left;
      y = clientY - rect.top;
    }
    
    const ripple = document.createElement('span');
    ripple.className = className;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;
    ripple.style.backgroundColor = color;
    ripple.style.animationDuration = `${duration}ms`;
    
    element.appendChild(ripple);
    
    dispatchInteractionEvent(element, 'ripple', { options });
    if (options.onRipple) options.onRipple(element);
    
    // Cleanup
    setTimeout(() => {
      if (ripple.parentNode === element) {
        element.removeChild(ripple);
      }
    }, duration);
  };
  
  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    createRipple(e);
  };
  
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      createRipple(e);
    }
  };
  
  element.addEventListener('pointerdown', onPointerDown);
  element.addEventListener('keydown', onKeyDown);
  
  const instance = {
    element,
    type: 'ripple',
    enable: () => { isEnabled = true; },
    disable: () => { isEnabled = false; },
    destroy: () => {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('keydown', onKeyDown);
      instance.disable();
      element.classList.remove('ax-interaction-ready', 'ax-ripple-container');
      removeInteractionState(element, 'ripple');
    },
    isEnabled: () => isEnabled
  };
  
  saveInteractionState(element, 'ripple', instance);
  dispatchInteractionEvent(element, 'interaction-ready', { type: 'ripple', instance });
  
  return instance;
}
