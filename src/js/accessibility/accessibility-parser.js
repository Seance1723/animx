import { accessibility } from './accessibility-api.js';

export function parseA11yAttributes(element) {
  if (!element || !element.hasAttribute) return {};
  
  const options = {};
  
  if (element.hasAttribute('data-ax-reduced-motion')) {
    options.reducedMotion = element.getAttribute('data-ax-reduced-motion');
  }
  
  if (element.hasAttribute('data-ax-preserve-focus')) {
    options.preserveFocus = element.getAttribute('data-ax-preserve-focus') !== 'false';
  }
  
  if (element.hasAttribute('data-ax-announce')) {
    options.announce = element.getAttribute('data-ax-announce');
  }
  
  if (element.hasAttribute('data-ax-live')) {
    options.livePoliteness = element.getAttribute('data-ax-live');
  }
  
  return options;
}
