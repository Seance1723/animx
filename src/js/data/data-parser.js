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
  
  const isText = ds.axText !== undefined || ds.axTextType !== undefined;
  let textOptions = null;
  if (isText) {
    textOptions = {
      type: ds.axTextType || 'split',
      split: ds.axText || 'chars',
      animation,
      text: ds.axTextValue || null,
      mask: ds.axMask === 'true' ? true : (ds.axMask === 'lines' ? 'lines' : false),
      speed: parseInt(ds.axSpeed, 10) || parseInt(ds.axTypewriterSpeed, 10) || 45,
      from: parseFloat(ds.axFrom) || 0,
      to: parseFloat(ds.axTo) || 100,
      decimals: parseInt(ds.axDecimals, 10) || 0,
      prefix: ds.axPrefix || '',
      suffix: ds.axSuffix || '',
      chars: ds.axScrambleChars || undefined,
      responsive: ds.axResponsive !== 'false',
      preset: ds.axScramblePreset || undefined,
      values: ds.axValues ? ds.axValues.split('|') : undefined,
      interval: parseInt(ds.axInterval, 10) || 1600,
      format: ds.axFormat || undefined,
      locale: ds.axLocale || undefined,
      currency: ds.axCurrency || undefined,
      separator: ds.axSeparator || undefined,
      compact: ds.axCompact !== 'false',
      direction: ds.axDirection || undefined,
      pauseOnHover: ds.axPauseOnHover !== 'false',
      duration,
      stagger
    };
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
    isText,
    textOptions,
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
