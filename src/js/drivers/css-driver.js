import { log } from '../core/utils.js';

export function createCSSDriver(element, preset, options, instance) {
  const className = preset.className;
  let hasStarted = false;

  function handleAnimationEnd(e) {
    if (e.target !== element) return;
    if (options.onComplete) options.onComplete(element);
    instance.setStatus('finished');
    cleanUp();
  }

  function cleanUp() {
    element.removeEventListener('animationend', handleAnimationEnd);
    element.removeEventListener('animationcancel', handleAnimationCancel);
  }

  function handleAnimationCancel(e) {
    if (e.target !== element) return;
    if (options.onCancel) options.onCancel(element);
    instance.setStatus('cancelled');
    cleanUp();
  }

  const driver = {
    play: () => {
      if (!hasStarted && options.onStart) options.onStart(element);
      hasStarted = true;
      
      // Remove any existing ax preset classes to avoid conflicts
      Array.from(element.classList).forEach(cls => {
        if (cls.startsWith('ax-') && cls !== 'ax-paused' && cls !== 'ax-running' && cls !== 'ax-hidden' && cls !== 'ax-visible' && cls !== className) {
          element.classList.remove(cls);
        }
      });

      element.classList.add('ax', className);
      element.classList.remove('ax-paused');
      element.classList.add('ax-running');
      
      // Apply inline overrides if custom options were passed (and not defaults)
      if (options.duration !== 420) element.style.animationDuration = `${options.duration}ms`;
      if (options.delay !== 0) element.style.animationDelay = `${options.delay}ms`;
      if (options.ease !== 'cubic-bezier(0.22, 1, 0.36, 1)') element.style.animationTimingFunction = options.ease;
      
      element.addEventListener('animationend', handleAnimationEnd);
      element.addEventListener('animationcancel', handleAnimationCancel);
    },
    pause: () => {
      element.classList.replace('ax-running', 'ax-paused');
      // If we don't have running, just add paused
      if (!element.classList.contains('ax-paused')) {
        element.classList.add('ax-paused');
      }
    },
    stop: () => {
      element.classList.remove('ax', className, 'ax-running', 'ax-paused');
      element.style.animationDuration = '';
      element.style.animationDelay = '';
      element.style.animationTimingFunction = '';
      cleanUp();
    },
    cancel: () => {
      driver.stop();
      if (options.onCancel) options.onCancel(element);
    },
    finish: () => {
      // Force completion by removing the class and firing complete
      driver.stop();
      if (options.onComplete) options.onComplete(element);
    },
    reverse: () => {
      log('CSS driver reverse not fully supported, falling back to replay in v0.2.0');
      driver.replay();
    },
    replay: () => {
      driver.stop();
      // force reflow
      void element.offsetWidth;
      hasStarted = false;
      driver.play();
    },
    reset: () => {
      driver.stop();
      hasStarted = false;
    },
    destroy: () => {
      driver.stop();
    }
  };

  return driver;
}
