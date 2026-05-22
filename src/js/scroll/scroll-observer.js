import { isReducedMotion } from '../accessibility/accessibility-state.js';
import { log } from '../core/utils.js';
import { dispatchAnimEvent } from '../data/data-events.js';
import { markScrollEntered, markScrollExited, scrollObservedMap, unmarkScrollObserved } from './scroll-state.js';

let animxInstance = null;
export function bindScrollAnimX(instance) {
  animxInstance = instance;
}

// Group observers by signature: threshold_rootMargin
const observers = new Map();

function getObserver(threshold, rootMargin) {
  const signature = `${threshold}_${rootMargin}`;
  if (!observers.has(signature)) {
    if (typeof IntersectionObserver === 'undefined') {
      return null;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        handleIntersection(entry);
      });
    }, {
      threshold,
      rootMargin
    });
    
    observers.set(signature, observer);
  }
  return observers.get(signature);
}

function handleIntersection(entry) {
  const element = entry.target;
  const config = scrollObservedMap.get(element);
  
  if (!config) return; // Should not happen if observed
  
  if (entry.isIntersecting) {
    markScrollEntered(element, config.enterClass);
    dispatchAnimEvent(element, 'scroll-enter', config);
    
    // Execute animation
    runScrollAnimation(element, config);
    
    if (config.once) {
      unobserveElement(element);
    }
  } else {
    // Only exit if not once
    if (!config.once) {
      markScrollExited(element, config.exitClass);
      dispatchAnimEvent(element, 'scroll-exit', config);
      // Wait, if it's out of view, we might want to reset it?
      // In a real physics engine, we might reverse it, but for v0.4.0, we just allow it to replay on enter.
      // So no reset is strictly forced unless they use CSS that resets, which the drivers do when re-running.
    }
  }
}

function runScrollAnimation(element, config) {
  if (!animxInstance) return;
  
  if (config.isComponent) {
    animxInstance.component(element, config.componentName, config.options);
  } else if (config.isText) {
    animxInstance.text(element, { ...config.textOptions, ...config.options });
  } else if (config.isGroup) {
    const children = Array.from(element.children);
    if (children.length > 0) {
      const childAnim = config.childAnim || element.dataset.ax || 'fade-up';
      const runOptions = {
        ...config.options,
        groupElement: element
      };
      animxInstance.stagger(children, childAnim, runOptions);
    }
  } else {
    animxInstance.animate(element, config.animation, config.options);
  }
}

export function observeElement(element, config) {
  const observer = getObserver(config.threshold, config.rootMargin);
  if (observer) {
    observer.observe(element);
  } else {
    // IntersectionObserver is missing, fallback to immediate execution
    log('AnimX: IntersectionObserver is not supported. Running scroll animation immediately.', element);
    markScrollEntered(element, config.enterClass);
    runScrollAnimation(element, config);
  }
}

export function unobserveElement(element) {
  const config = scrollObservedMap.get(element);
  if (config) {
    const observer = getObserver(config.threshold, config.rootMargin);
    if (observer) {
      observer.unobserve(element);
    }
    unmarkScrollObserved(element);
  }
}
