import { isReducedMotion } from '../accessibility/accessibility-state.js';

export function createWAAPIDriver(element, keyframes, options, instance) {
  let animation = null;
  let hasStarted = false;

  const driver = {
    play: () => {
      if (!animation) {
        if (options.onStart) options.onStart(element);
        hasStarted = true;
        
        const isReduced = isReducedMotion();
        const duration = isReduced ? 1 : options.duration;
        const delay = isReduced ? 0 : options.delay;
        
        animation = element.animate(keyframes, {
          duration: duration,
          delay: delay,
          easing: options.ease,
          fill: options.fill,
          iterations: options.iterations,
          direction: options.direction
        });

        animation.onfinish = () => {
          if (options.onComplete) options.onComplete(element);
          instance.setStatus('finished');
        };

        animation.oncancel = () => {
          if (options.onCancel) options.onCancel(element);
          instance.setStatus('cancelled');
        };
      } else {
        animation.play();
      }
    },
    pause: () => {
      if (animation) animation.pause();
    },
    stop: () => {
      if (animation) {
        animation.cancel();
        animation = null;
      }
      hasStarted = false;
    },
    cancel: () => {
      if (animation) animation.cancel();
    },
    finish: () => {
      if (animation) animation.finish();
    },
    reverse: () => {
      if (animation) {
        animation.reverse();
      } else {
        driver.play();
        if (animation) animation.reverse();
      }
    },
    replay: () => {
      if (animation) animation.cancel();
      animation = null;
      driver.play();
    },
    reset: () => {
      driver.stop();
    },
    destroy: () => {
      driver.stop();
    }
  };

  return driver;
}
