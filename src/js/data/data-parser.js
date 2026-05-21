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
  
  let stagger = null;
  if (ds.axStagger !== undefined) {
    stagger = {
      each: parseInt(ds.axStagger, 10) || 0,
      from: ds.axStaggerFrom || 'start',
      startDelay: parseInt(ds.axStaggerStartDelay, 10) || 0,
      reverse: ds.axStaggerReverse === 'true' || ds.axStaggerReverse === '1',
      axis: ds.axStaggerAxis || 'both'
    };
    if (ds.axStaggerGrid) {
      if (ds.axStaggerGrid === 'auto') {
        stagger.grid = 'auto';
      } else {
        const parts = ds.axStaggerGrid.split('x').map(p => parseInt(p, 10));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          stagger.grid = parts;
        }
      }
    }
  }
  
  return {
    animation,
    trigger,
    id,
    disabled,
    debug,
    extraClass,
    isGroup: ds.axGroup !== undefined,
    childAnimation: ds.axChild || null,
    childSelector: ds.axChildSelector || null,
    options: {
      duration,
      delay,
      ease: ds.axEase, // normalized in animation-normalizer
      direction: ds.axDirection,
      fill: ds.axFill,
      iterations,
      stagger
    }
  };
}
