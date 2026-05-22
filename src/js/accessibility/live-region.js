import { getConfig } from '../core/config.js';

let globalLiveRegion = null;

export function createLiveRegion(options = {}) {
  if (typeof document === 'undefined') return null;
  
  if (globalLiveRegion) return globalLiveRegion;
  
  const politeness = options.politeness || 'polite';
  
  globalLiveRegion = document.createElement('div');
  globalLiveRegion.setAttribute('aria-live', politeness);
  globalLiveRegion.setAttribute('aria-atomic', 'true');
  globalLiveRegion.setAttribute('class', 'ax-sr-only');
  
  // Style to ensure visually hidden but accessible
  Object.assign(globalLiveRegion.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0'
  });
  
  document.body.appendChild(globalLiveRegion);
  return globalLiveRegion;
}

export function announce(message, options = {}) {
  const config = getConfig().accessibility || {};
  
  // Respect user preference if they globally disabled it, 
  // but allow explicit calls to override if forced.
  if (options.force !== true && config.announceChanges === false) {
    return;
  }
  
  const region = createLiveRegion({ politeness: options.politeness || config.livePoliteness || 'polite' });
  if (!region) return;
  
  // Force a re-announcement by briefly clearing
  region.textContent = '';
  setTimeout(() => {
    region.textContent = message;
  }, 50);
  
  if (options.clearAfter) {
    setTimeout(() => {
      if (region.textContent === message) region.textContent = '';
    }, options.clearAfter);
  }
}
