import { parseScrollAttributes } from '../scroll/scroll-parser.js';
import { parseTextAttributes } from '../text/text-parser.js';
import { parseSvgAttributes } from '../svg/svg-parser.js';
import { parseGestureAttributes } from '../gestures/gesture-parser.js';

export function parseDataAttributes(element) {
  if (!element || !element.dataset) return null;
  
  const ds = element.dataset;
  if (!ds.ax && !ds.axSvg) return null;
  
  // Handle no-code aliases
  const rawAnimation = ds.axTextEffect || ds.ax || ds.axPreset || ds.axHoverPreset || null;
  const isScrollAlias = ds.axScroll !== undefined;
  
  // Basic attributes
  const animation = isScrollAlias ? ds.axScroll : (rawAnimation || 'svg');
  const trigger = isScrollAlias ? 'scroll' : (ds.axOn || ds.axTrigger || 'load');
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
  const rawStagger = ds.axStagger !== undefined ? ds.axStagger : (ds.axDelayStep !== undefined ? ds.axDelayStep : undefined);
  if (rawStagger !== undefined) {
    stagger = {
      each: parseInt(rawStagger, 10) || 0,
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
  
  const isText = ds.axText !== undefined || ds.axTextType !== undefined || ds.axTextEffect !== undefined;
  let textOptions = null;
  if (isText) {
    textOptions = {
      type: ds.axTextType || ds.axTextEffect || 'split',
      split: ds.axText || 'chars',
      animation,
      text: ds.axValue || null,
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
  
  const isSvg = ds.axSvg !== undefined || ds.axSvgMorph !== undefined || ds.axMorphIcon !== undefined;
  let svgOptions = null;
  if (isSvg) {
    if (ds.axSvgMorph !== undefined || ds.axMorphIcon !== undefined) {
      svgOptions = {
        type: 'morph',
        to: ds.axMorphTo || (ds.axSvgMorph !== '' && ds.axSvgMorph !== 'true' ? ds.axSvgMorph : null),
        from: ds.axMorphFrom,
        icon: ds.axMorphIcon,
        fallback: ds.axMorphFallback,
        loop: ds.axMorphLoop === 'true',
        yoyo: ds.axMorphYoyo === 'true'
      };
    } else {
      svgOptions = parseSvgAttributes(element);
    }
  }
  
  const gestures = parseGestureAttributes(element);
  
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
    isSvg,
    svgOptions,
    isLayout: ds.axLayout !== undefined || ds.axToggle !== undefined || ds.axShared !== undefined || ds.axSwap !== undefined,
    layoutOptions: {
      type: ds.axLayout,
      items: ds.axLayoutItems,
      toggle: ds.axToggle,
      shared: ds.axShared,
      sharedTarget: ds.axSharedTarget,
      swap: ds.axSwap,
      scale: ds.axLayoutScale !== 'false',
      duration: parseInt(ds.axLayoutDuration, 10) || undefined,
      ease: ds.axLayoutEase || undefined,
      on: ds.axLayoutOn || undefined
    },
    gestures,
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
