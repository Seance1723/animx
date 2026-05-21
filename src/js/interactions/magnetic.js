import { saveInteractionState, getInteractionState, removeInteractionState } from './interaction-state.js';
import { dispatchInteractionEvent, getInteractionConfig, getPointerPosition, lerp, isMotionSafe } from './interaction-utils.js';

export function runMagnetic(element, options = {}) {
  const config = getInteractionConfig();
  if (!config.magnetic) return null;
  
  const existing = getInteractionState(element, 'magnetic');
  if (existing) existing.destroy();
  
  let isEnabled = true;
  let isActive = false;
  let rafId = null;
  
  const strength = options.strength || 0.35;
  const radius = options.radius || 120;
  const maxMove = options.maxMove || 18;
  const resetDuration = options.resetDuration || 300;
  
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  
  element.classList.add('ax-interaction-ready', 'ax-magnetic');
  
  const update = () => {
    if (!isEnabled) return;
    
    currentX = lerp(currentX, targetX, 0.15);
    currentY = lerp(currentY, targetY, 0.15);
    
    element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    
    // Keep ticking if we're active, or if we haven't settled to 0 yet
    if (isActive || (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1)) {
      rafId = requestAnimationFrame(update);
    } else {
      element.style.transform = '';
      rafId = null;
    }
  };
  
  const onPointerMove = (e) => {
    if (!isEnabled || !isMotionSafe('magnetic') || e.pointerType === 'touch') return;
    
    const pos = getPointerPosition(e, element);
    
    // Distance from center
    const dist = Math.sqrt(pos.centerX * pos.centerX + pos.centerY * pos.centerY);
    
    if (dist < radius) {
      if (!isActive) {
        isActive = true;
        element.classList.add('ax-interaction-active');
        dispatchInteractionEvent(element, 'magnetic-start', { options });
        if (!rafId) rafId = requestAnimationFrame(update);
      }
      
      const pullX = pos.centerX * strength;
      const pullY = pos.centerY * strength;
      
      targetX = Math.max(-maxMove, Math.min(maxMove, pullX));
      targetY = Math.max(-maxMove, Math.min(maxMove, pullY));
      
    } else if (isActive) {
      reset();
    }
  };
  
  const reset = () => {
    if (isActive) {
      isActive = false;
      targetX = 0;
      targetY = 0;
      element.classList.remove('ax-interaction-active');
      dispatchInteractionEvent(element, 'magnetic-end', { options });
      
      // Let it lerp back smoothly using CSS transition by relying on class removal,
      // but if we want JS lerp, we just let update() run until 0.
      // We will let update() run.
      if (!rafId) rafId = requestAnimationFrame(update);
    }
  };
  
  const onPointerLeave = () => reset();
  
  // Magnetic usually binds to parent or window to track "approaching" the element,
  // but to avoid massive performance hits, we bind to parentNode if possible.
  // For simplicity and performance, we'll bind to the document but throttle it.
  // Actually, standard magnetic binds to the element itself or an expanded wrapper.
  // A clean zero-dependency way is to bind mousemove on window but ONLY if we are actively checking elements.
  // To keep it simple per element, we will bind to window but check proximity quickly.
  
  const globalPointerMove = (e) => {
    if (!isEnabled) return;
    onPointerMove(e);
  };
  
  window.addEventListener('pointermove', globalPointerMove, { passive: true });
  
  const instance = {
    element,
    type: 'magnetic',
    enable: () => { isEnabled = true; },
    disable: () => {
      isEnabled = false;
      reset();
    },
    destroy: () => {
      window.removeEventListener('pointermove', globalPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
      instance.disable();
      element.classList.remove('ax-interaction-ready', 'ax-magnetic', 'ax-interaction-active');
      element.style.transform = '';
      removeInteractionState(element, 'magnetic');
    },
    isEnabled: () => isEnabled
  };
  
  saveInteractionState(element, 'magnetic', instance);
  dispatchInteractionEvent(element, 'interaction-ready', { type: 'magnetic', instance });
  
  return instance;
}
