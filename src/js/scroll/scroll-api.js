import { getConfig } from '../core/config.js';
import { log } from '../core/utils.js';
import { normalizeSelector } from '../core/selector.js';
import { parseScrollAttributes } from './scroll-parser.js';
import { markScrollObserved, isScrollObserved } from './scroll-state.js';
import { observeElement, unobserveElement } from './scroll-observer.js';
import { dispatchAnimEvent } from '../data/data-events.js';

export function observeScroll(target, options = {}) {
  const config = getConfig();
  const elements = normalizeSelector(target);
  
  elements.forEach(element => {
    if (isScrollObserved(element)) return; // Avoid duplicate observation
    
    // Parse attributes first
    const parsed = parseScrollAttributes(element) || {};
    
    // Merge JS options over parsed attributes
    const finalConfig = {
      animation: options.animation || parsed.animation,
      threshold: options.threshold !== undefined ? options.threshold : (parsed.threshold !== undefined ? parsed.threshold : config.scroll.threshold),
      rootMargin: options.rootMargin || parsed.rootMargin || config.scroll.rootMargin,
      once: options.once !== undefined ? options.once : (parsed.once !== undefined ? parsed.once : config.scroll.once),
      stagger: options.stagger !== undefined ? options.stagger : (parsed.stagger || 0),
      isGroup: options.isGroup !== undefined ? options.isGroup : (parsed.isGroup || false),
      childAnim: options.childAnim || parsed.childAnim || null,
      scrollClass: options.scrollClass || parsed.scrollClass || null,
      enterClass: options.enterClass || parsed.enterClass || null,
      exitClass: options.exitClass || parsed.exitClass || null,
      options: {
        ...(parsed.options || {}),
        ...(options.options || {}), // If passed nested options
        duration: options.duration || parsed.options?.duration,
        delay: options.delay || parsed.options?.delay,
        ease: options.ease || parsed.options?.ease
      }
    };
    
    // If missing animation completely (and not a group), we shouldn't crash, but it's invalid.
    if (!finalConfig.animation && !finalConfig.isGroup) {
      if (config.debug) log('AnimX: Scroll target missing animation.', element);
      return;
    }
    
    markScrollObserved(element, finalConfig);
    if (finalConfig.scrollClass) element.classList.add(finalConfig.scrollClass);
    
    dispatchAnimEvent(element, 'scroll-ready', finalConfig);
    
    observeElement(element, finalConfig);
  });
  
  return {
    elements,
    destroy: () => unobserveScroll(target)
  };
}

export function refreshScroll(root = document) {
  if (typeof document === 'undefined') return;
  if (!root || typeof root.querySelectorAll !== 'function') return;
  
  // Find all uninitialized elements marked for scroll
  const elements = root.querySelectorAll('[data-ax-on="scroll"]');
  elements.forEach(el => {
    if (!isScrollObserved(el)) {
      observeScroll(el);
    }
  });
}

export function unobserveScroll(target) {
  const elements = normalizeSelector(target);
  elements.forEach(el => {
    unobserveElement(el);
  });
}
