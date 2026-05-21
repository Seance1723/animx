import { saveInteractionState, getInteractionState, removeInteractionState } from './interaction-state.js';
import { dispatchInteractionEvent, getInteractionConfig, getPointerPosition, lerp, isMotionSafe } from './interaction-utils.js';

export function runTilt(element, options = {}) {
  const config = getInteractionConfig();
  if (!config.tilt) return null;
  
  const existing = getInteractionState(element, 'tilt');
  if (existing) existing.destroy();
  
  let isEnabled = true;
  let isActive = false;
  let rafId = null;
  
  const max = options.max || 12;
  const perspective = options.perspective || 900;
  const scale = options.scale || 1.02;
  const useGlare = options.glare === true;
  const glareOpacity = options.glareOpacity || 0.25;
  
  let currentX = 0;
  let currentY = 0;
  let currentScale = 1;
  let currentGlare = 0;
  let targetX = 0;
  let targetY = 0;
  let targetScale = 1;
  let targetGlare = 0;
  
  element.classList.add('ax-interaction-ready', 'ax-tilt');
  
  let glareEl = null;
  if (useGlare) {
    glareEl = document.createElement('div');
    glareEl.className = 'ax-tilt-glare';
    // Base styling for glare effect
    glareEl.style.background = `linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)`;
    element.appendChild(glareEl);
  }
  
  const update = () => {
    if (!isEnabled) return;
    
    currentX = lerp(currentX, targetX, 0.15);
    currentY = lerp(currentY, targetY, 0.15);
    currentScale = lerp(currentScale, targetScale, 0.15);
    currentGlare = lerp(currentGlare, targetGlare, 0.15);
    
    element.style.transform = `perspective(${perspective}px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale3d(${currentScale}, ${currentScale}, ${currentScale})`;
    if (glareEl) {
      glareEl.style.opacity = currentGlare;
      // move glare based on pointer
      const percentageY = (currentX / max) * 100;
      const percentageX = (currentY / max) * 100;
      glareEl.style.transform = `translateY(${percentageY * -0.5}%) translateX(${percentageX * 0.5}%)`;
    }
    
    if (isActive || (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1 || Math.abs(currentScale - 1) > 0.01)) {
      rafId = requestAnimationFrame(update);
    } else {
      element.style.transform = '';
      if (glareEl) {
        glareEl.style.opacity = 0;
        glareEl.style.transform = '';
      }
      rafId = null;
    }
  };
  
  const onPointerMove = (e) => {
    if (!isEnabled || !isMotionSafe('tilt') || e.pointerType === 'touch') return;
    
    const pos = getPointerPosition(e, element);
    
    // Normalize -1 to 1
    const normX = (pos.centerX / (pos.width / 2));
    const normY = (pos.centerY / (pos.height / 2));
    
    // Reverse logic: mouse right (normX > 0) means rotateY positive. Mouse down (normY > 0) means rotateX negative.
    targetX = -(normY * max);
    targetY = (normX * max);
    targetScale = scale;
    targetGlare = glareOpacity * (1 - Math.abs(normY));
    
    if (!isActive) {
      isActive = true;
      element.classList.add('ax-interaction-active');
      dispatchInteractionEvent(element, 'tilt-start', { options });
      if (!rafId) rafId = requestAnimationFrame(update);
      if (options.onStart) options.onStart(element);
    }
    
    if (options.onMove) options.onMove(element, { rotateX: targetX, rotateY: targetY });
  };
  
  const reset = () => {
    if (isActive) {
      isActive = false;
      targetX = 0;
      targetY = 0;
      targetScale = 1;
      targetGlare = 0;
      element.classList.remove('ax-interaction-active');
      dispatchInteractionEvent(element, 'tilt-end', { options });
      if (options.onEnd) options.onEnd(element);
      if (!rafId) rafId = requestAnimationFrame(update);
    }
  };
  
  const onPointerEnter = (e) => {
    if (e.pointerType === 'touch') return;
    // Let pointer move handle activation
  };
  
  const onPointerLeave = () => reset();
  
  element.addEventListener('pointerenter', onPointerEnter);
  element.addEventListener('pointermove', onPointerMove, { passive: true });
  element.addEventListener('pointerleave', onPointerLeave);
  
  const instance = {
    element,
    type: 'tilt',
    enable: () => { isEnabled = true; },
    disable: () => {
      isEnabled = false;
      reset();
    },
    destroy: () => {
      element.removeEventListener('pointerenter', onPointerEnter);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerleave', onPointerLeave);
      if (glareEl && glareEl.parentNode === element) element.removeChild(glareEl);
      if (rafId) cancelAnimationFrame(rafId);
      instance.disable();
      element.classList.remove('ax-interaction-ready', 'ax-tilt', 'ax-interaction-active');
      element.style.transform = '';
      removeInteractionState(element, 'tilt');
    },
    isEnabled: () => isEnabled
  };
  
  saveInteractionState(element, 'tilt', instance);
  dispatchInteractionEvent(element, 'interaction-ready', { type: 'tilt', instance });
  
  return instance;
}
