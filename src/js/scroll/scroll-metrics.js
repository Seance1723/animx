import { getConfig } from '../core/config.js';

let viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
let viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
let scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    viewportHeight = window.innerHeight;
    viewportWidth = window.innerWidth;
  }, { passive: true });
}

export function getScrollY() {
  return scrollY;
}

export function updateGlobalScrollY() {
  scrollY = window.scrollY;
  return scrollY;
}

export function parseScrollOffset(value, elementSize, viewportSize) {
  if (typeof value === 'number') return value;
  if (!value || typeof value !== 'string') return 0;
  
  // Handling relative offsets like "+=500" or "-=200"
  if (value.startsWith('+=')) {
    return parseFloat(value.replace('+=', ''));
  }
  if (value.startsWith('-=')) {
    return -parseFloat(value.replace('-=', ''));
  }
  
  if (value.includes('%')) {
    return (parseFloat(value) / 100) * elementSize;
  }
  
  if (value.includes('vh')) {
    return (parseFloat(value) / 100) * viewportHeight;
  }
  
  if (value.includes('vw')) {
    return (parseFloat(value) / 100) * viewportWidth;
  }
  
  return parseFloat(value) || 0;
}

// "top bottom" -> element top meets viewport bottom
// "center center" -> element center meets viewport center
// "bottom top" -> element bottom meets viewport top
// Format: "elementPos viewportPos"
export function calculateScrollPositions(element, startStr, endStr) {
  const rect = element.getBoundingClientRect();
  const currentScrollY = scrollY;
  
  // Element top relative to document
  const elementTop = rect.top + currentScrollY;
  const elementHeight = rect.height;
  
  const parsePos = (str, isStart) => {
    if (!str) str = isStart ? 'top bottom' : 'bottom top';
    
    // Check if it's a relative offset "+=500" from the start position
    // We handle that in a second pass if it doesn't match standard keywords
    
    let parts = str.split(' ');
    if (parts.length === 1) parts = [parts[0], isStart ? 'bottom' : 'top'];
    
    const [elAlign, viewAlign] = parts;
    
    let elOffset = 0;
    if (elAlign === 'top') elOffset = 0;
    else if (elAlign === 'center') elOffset = elementHeight / 2;
    else if (elAlign === 'bottom') elOffset = elementHeight;
    else elOffset = parseScrollOffset(elAlign, elementHeight, viewportHeight);
    
    let viewOffset = 0;
    if (viewAlign === 'top') viewOffset = 0;
    else if (viewAlign === 'center') viewOffset = viewportHeight / 2;
    else if (viewAlign === 'bottom') viewOffset = viewportHeight;
    else viewOffset = parseScrollOffset(viewAlign, viewportHeight, viewportHeight);
    
    // The absolute scrollY position where this alignment happens:
    // When window.scrollY + viewOffset === elementTop + elOffset
    return (elementTop + elOffset) - viewOffset;
  };
  
  let startY = 0;
  let endY = 0;
  
  // Start position
  if (startStr && (startStr.startsWith('+=') || startStr.startsWith('-='))) {
    // If start is relative, relative to what? Usually relative to element top
    startY = elementTop + parseScrollOffset(startStr, elementHeight, viewportHeight);
  } else {
    startY = parsePos(startStr, true);
  }
  
  // End position
  if (endStr && (endStr.startsWith('+=') || endStr.startsWith('-='))) {
    endY = startY + parseScrollOffset(endStr, elementHeight, viewportHeight);
  } else {
    endY = parsePos(endStr, false);
  }
  
  return { startY, endY };
}

export function calculateProgress(startY, endY, currentScrollY = scrollY) {
  if (startY === endY) return 1;
  const progress = (currentScrollY - startY) / (endY - startY);
  return Math.max(0, Math.min(progress, 1));
}

export function calculateRawProgress(startY, endY, currentScrollY = scrollY) {
  if (startY === endY) return 1;
  return (currentScrollY - startY) / (endY - startY);
}
