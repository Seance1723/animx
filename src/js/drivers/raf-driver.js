export function createRAFDriver(element, keyframes, options, instance) {
  let rafId = null;
  let startTime = null;
  let pausedTime = null;
  let isReversed = false;
  
  // Very basic RAF fallback for v0.2.0 supporting only simple linear/ease mapping roughly.
  // It applies the final frame properties when finished.
  // We don't build a full physics engine here. We just set the style.
  const fromFrame = keyframes[0];
  const toFrame = keyframes[keyframes.length - 1];

  function applyFrame(progress) {
    if (options.onUpdate) options.onUpdate(progress, element);
    
    // In a real robust RAF, we interpolate every property.
    // Here we just apply the start or end frame, or a very basic linear interpolation if needed.
    // For v0.2.0 RAF is just a fallback. We'll simply set the end state at progress 1.
    if (progress === 1) {
      Object.assign(element.style, isReversed ? fromFrame : toFrame);
    } else if (progress === 0) {
      Object.assign(element.style, isReversed ? toFrame : fromFrame);
    }
  }

  function loop(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    let progress = Math.min(Math.max(elapsed / options.duration, 0), 1);
    
    applyFrame(progress);

    if (progress < 1) {
      rafId = requestAnimationFrame(loop);
    } else {
      if (options.onComplete) options.onComplete(element);
      instance.setStatus('finished');
      rafId = null;
    }
  }

  const driver = {
    play: () => {
      if (rafId) return;
      if (options.onStart && !startTime) options.onStart(element);
      
      if (pausedTime) {
        startTime = performance.now() - pausedTime;
        pausedTime = null;
      } else {
        startTime = null;
      }
      
      rafId = requestAnimationFrame(loop);
    },
    pause: () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
        pausedTime = performance.now() - startTime;
      }
    },
    stop: () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      startTime = null;
      pausedTime = null;
      isReversed = false;
      Object.assign(element.style, fromFrame); // Reset to original roughly
    },
    cancel: () => {
      driver.stop();
      if (options.onCancel) options.onCancel(element);
    },
    finish: () => {
      driver.pause();
      applyFrame(1);
      if (options.onComplete) options.onComplete(element);
      instance.setStatus('finished');
    },
    reverse: () => {
      isReversed = !isReversed;
      driver.replay();
    },
    replay: () => {
      driver.stop();
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
