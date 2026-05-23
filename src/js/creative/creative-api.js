import { rollText } from '../text/rolling-text.js';
import { kineticText } from '../text/kinetic-text.js';
import { scrollTypography } from '../text/scroll-typography.js';

export function creative(selector, options = {}) {
  // Dispatcher for creative text effects based on type
  if (options.type === 'roll') {
    return rollText(selector, options);
  } else if (options.type === 'kinetic') {
    return kineticText(selector, options);
  } else if (options.type === 'scroll-fill') {
    return scrollTypography(selector, options);
  }
  
  // Fallback to basic logging or error
  console.warn(`[AnimX Creative] Unknown creative type: ${options.type}`);
}
