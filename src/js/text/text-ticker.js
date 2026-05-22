import { saveTextState } from './text-state.js';
import { dispatchTextEvent } from './text-utils.js';
import { isReducedMotion } from '../core/reduced-motion.js';

export function runTicker(element, options) {
  const originalHTML = element.innerHTML;
  
  const textValue = options.text || element.textContent || '';
  const speed = options.speed || 60; // Pixels per second
  const direction = options.direction === 'right' ? 'right' : 'left';
  const duplicate = options.duplicate !== false;
  
  if (!textValue.trim()) return null;

  element.classList.add('ax-text-ticker');
  if (isReducedMotion()) {
    element.textContent = textValue;
    return null;
  }
  
  element.innerHTML = '';
  
  // Track container
  const track = document.createElement('div');
  track.className = `ax-text-ticker-track ax-ticker-${direction}`;
  
  // Create first instance
  const item1 = document.createElement('div');
  item1.className = 'ax-text-ticker-item';
  item1.innerHTML = textValue;
  track.appendChild(item1);
  
  // Create duplicate for seamless loop
  if (duplicate) {
    const item2 = item1.cloneNode(true);
    // aria-hidden for screen readers on duplicate
    item2.setAttribute('aria-hidden', 'true');
    track.appendChild(item2);
  }
  
  element.appendChild(track);
  
  // Calculate animation duration based on speed
  // We need the width of one item. For simplicity in setup, we can apply an inline style for animation-duration.
  // We wait for layout to measure width.
  requestAnimationFrame(() => {
    const width = item1.offsetWidth;
    if (width > 0) {
      const duration = width / speed;
      track.style.animationDuration = `${duration}s`;
    }
  });

  if (options.pauseOnHover) {
    track.style.animationPlayState = 'running';
    element.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    element.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  }

  dispatchTextEvent(element, 'text-ticker-start', { speed, direction });

  const state = {
    type: 'ticker',
    originalHTML,
    stop: () => {
      track.style.animationPlayState = 'paused';
      dispatchTextEvent(element, 'text-ticker-stop');
    }
  };
  
  saveTextState(element, state);

  return {
    element,
    stop: state.stop,
    destroy: () => {
      state.stop();
      element.innerHTML = originalHTML;
      element.classList.remove('ax-text-ticker');
    }
  };
}
