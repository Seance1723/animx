const defaultTimelineOptions = {
  autoplay: false,
  loop: false,
  delay: 0,
  timeScale: 1,
  defaults: {
    duration: 420,
    ease: 'smooth',
    delay: 0
  },
  onStart: null,
  onStepStart: null,
  onStepComplete: null,
  onComplete: null,
  onCancel: null
};

export function parseTimelineOptions(options = {}) {
  return {
    ...defaultTimelineOptions,
    ...options,
    defaults: {
      ...defaultTimelineOptions.defaults,
      ...(options.defaults || {})
    }
  };
}

export function mergeStepOptions(timelineDefaults, stepOptions) {
  return {
    ...timelineDefaults,
    ...stepOptions,
    // Ensure delay accumulates safely if needed, though position parsing handles timeline relative delays
    delay: stepOptions.delay !== undefined ? stepOptions.delay : timelineDefaults.delay
  };
}
