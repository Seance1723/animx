import { saveTextState } from './text-state.js';
import { dispatchTextEvent } from './text-utils.js';
import { isReducedMotion } from '../core/reduced-motion.js';

export function runSwap(element, options, coreInstance) {
  const originalHTML = element.innerHTML;
  
  // Safe defaults
  const values = Array.isArray(options.values) ? options.values : [];
  if (values.length === 0) return null;
  
  const interval = options.interval || 1600;
  const animPreset = options.animation || 'text-swap-up';
  const loop = options.loop !== false;
  
  let currentIndex = 0;
  let timer = null;
  let isPaused = false;
  let isDestroyed = false;

  element.classList.add('ax-text-swap');
  element.innerHTML = values[0];
  
  // Clean up existing element structure to avoid jump on first swap if needed
  const swapContainer = document.createElement('span');
  swapContainer.className = 'ax-text-swap-inner';
  swapContainer.textContent = values[0];
  element.innerHTML = '';
  element.appendChild(swapContainer);

  const swapTo = (index) => {
    if (isDestroyed) return;
    
    const value = values[index];
    
    if (isReducedMotion()) {
      swapContainer.textContent = value;
      dispatchTextEvent(element, 'text-swap', { value, index });
      scheduleNext();
      return;
    }
    
    // Animate out
    coreInstance.animate(swapContainer, `${animPreset}-out`, {
      duration: 300,
      onComplete: () => {
        if (isDestroyed) return;
        swapContainer.textContent = value;
        // Animate in
        coreInstance.animate(swapContainer, animPreset, {
          duration: 400,
          onComplete: () => {
            dispatchTextEvent(element, 'text-swap', { value, index });
            scheduleNext();
          }
        });
      }
    });
  };

  const scheduleNext = () => {
    if (isDestroyed || (!loop && currentIndex >= values.length - 1)) return;
    
    timer = setTimeout(() => {
      if (isPaused || isDestroyed) return;
      currentIndex = (currentIndex + 1) % values.length;
      swapTo(currentIndex);
    }, interval);
  };

  if (options.pauseOnHover) {
    element.addEventListener('mouseenter', () => isPaused = true);
    element.addEventListener('mouseleave', () => {
      isPaused = false;
      if (!timer) scheduleNext();
    });
  }

  // Start sequence
  scheduleNext();

  const state = {
    type: 'swap',
    originalHTML,
    stop: () => {
      isDestroyed = true;
      clearTimeout(timer);
    }
  };
  
  saveTextState(element, state);

  return {
    element,
    stop: state.stop,
    destroy: () => {
      state.stop();
      element.innerHTML = originalHTML;
      element.classList.remove('ax-text-swap');
    }
  };
}
