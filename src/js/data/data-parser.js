export function parseDataAttributes(element) {
  if (!element || !element.dataset) return null;
  
  const ds = element.dataset;
  if (!ds.ax) return null;
  
  // Basic attributes
  const animation = ds.ax;
  const trigger = ds.axOn || 'load';
  const id = ds.axId || null;
  const disabled = ds.axDisabled === 'true' || ds.axDisabled === '1' || ds.axDisabled === '';
  const debug = ds.axDebug === 'true';
  const extraClass = ds.axClass || null;
  
  // Parse numeric options safely
  let duration = undefined;
  if (ds.axDuration) {
    const parsed = parseInt(ds.axDuration, 10);
    if (!isNaN(parsed)) duration = parsed;
  }
  
  let delay = undefined;
  if (ds.axDelay) {
    const parsed = parseInt(ds.axDelay, 10);
    if (!isNaN(parsed)) delay = parsed;
  }
  
  let iterations = undefined;
  if (ds.axRepeat) {
    if (ds.axRepeat === 'infinite') {
      iterations = Infinity;
    } else {
      const parsed = parseInt(ds.axRepeat, 10);
      if (!isNaN(parsed)) iterations = parsed;
    }
  }
  
  return {
    animation,
    trigger,
    id,
    disabled,
    debug,
    extraClass,
    options: {
      duration,
      delay,
      ease: ds.axEase, // normalized in animation-normalizer
      direction: ds.axDirection,
      fill: ds.axFill,
      iterations
    }
  };
}
