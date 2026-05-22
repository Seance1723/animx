import { normalizeSelector } from '../core/selector.js';
import { isReducedMotion } from '../accessibility/accessibility-state.js';
import { parseStaggerOptions } from './stagger-parser.js';
import { calculateStaggerDelays } from './stagger-calculator.js';
import { StaggerGroup } from './stagger-group.js';
import { debug } from '../core/debug.js';
import { createSafeInstance } from '../core/safe-instance.js';

let animxInstance = null;
export function bindStaggerAnimX(instance) {
  animxInstance = instance;
}

export function stagger(targets, animationInput, options = {}) {
  const elements = normalizeSelector(targets);
  
  // If zero elements, log and return empty group safely
  if (elements.length === 0) {
    if (options.debug) debug.warn('AnimX.stagger(): No targets found.');
    return createSafeInstance(elements);
  }
  
  // If one element, stagger acts exactly like animate
  if (elements.length === 1) {
    if (!animxInstance) return null;
    const inst = animxInstance.animate(elements[0], animationInput, options);
    const group = new StaggerGroup(elements, {}, animationInput, options);
    group.addInstance(inst);
    // Play it instantly if not stopped
    return group;
  }
  
  const staggerOpts = parseStaggerOptions(options.stagger || options);
  
  // Handle reduced motion: kill the 'each' delay
  if (isReducedMotion()) {
    staggerOpts.each = 0;
  }
  
  const group = new StaggerGroup(elements, staggerOpts, animationInput, options);
  if (options.groupElement) {
    group.groupElement = options.groupElement;
    group.groupElement.classList.add('ax-stagger-ready');
  }
  
  // Calculate array of delays
  const delays = calculateStaggerDelays(elements, staggerOpts);
  
  let completedCount = 0;
  
  elements.forEach((element, index) => {
    const delay = delays[index] || 0;
    
    // Build options for this specific instance
    const itemOptions = {
      ...options,
      delay,
      _isStaggerChild: true, // Prevents animate() from recursively routing back here
      onStart: (el) => {
        if (staggerOpts.onItemStart) staggerOpts.onItemStart(el, index);
        group._dispatch('stagger-item-start', { element: el, index, delay });
        if (options.onStart) options.onStart(el);
      },
      onComplete: (el) => {
        if (staggerOpts.onItemComplete) staggerOpts.onItemComplete(el, index);
        group._dispatch('stagger-item-complete', { element: el, index, delay });
        if (options.onComplete) options.onComplete(el);
        
        completedCount++;
        if (completedCount === elements.length) {
          if (group.groupElement) {
            group.groupElement.classList.remove('ax-stagger-running');
            group.groupElement.classList.add('ax-stagger-complete');
          }
          group.status = 'complete';
          if (staggerOpts.onComplete) staggerOpts.onComplete(group);
          group._dispatch('stagger-complete');
        }
      },
      onCancel: (el) => {
        if (options.onCancel) options.onCancel(el);
      }
    };
    
    if (animxInstance) {
      // Don't auto-play yet, we collect instances in the group.
      // Wait, AnimX.animate() natively auto-plays currently unless it's a timeline.
      // We will let animate() auto-play, or if options dictate otherwise.
      const inst = animxInstance.animate(element, animationInput, itemOptions);
      group.addInstance(inst);
    }
  });
  
  // Return the group, which defaults to running since instances are immediately playing
  group.status = 'running';
  
  if (staggerOpts.onStart) staggerOpts.onStart(group);
  group._dispatch('stagger-start');
  
  return group;
}
