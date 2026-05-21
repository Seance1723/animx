// safe-instance.js
export function createSafeInstance(elements = []) {
  return {
    elements,
    play() {},
    pause() {},
    resume() {},
    stop() {},
    replay() {},
    reset() {},
    destroy() {},
    enable() {},
    disable() {},
    isEnabled() { return false; },
    isRunning() { return false; }
  };
}
