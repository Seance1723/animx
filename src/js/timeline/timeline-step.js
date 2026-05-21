export function createStep(target, animationInput, options = {}, position = null) {
  return {
    target,
    animation: animationInput,
    options,
    position,
    instance: null,
    status: 'pending' // pending, running, complete, cancelled, skipped
  };
}
