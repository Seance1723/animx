import { getConfig, setConfig } from './config.js';
import { getPresets } from '../presets/preset-registry.js';

export function toggleDebug(enabled) {
  if (enabled === undefined) return getConfig().debug;
  setConfig({ debug: !!enabled });
  return getConfig().debug;
}

export function diagnose() {
  const config = getConfig();
  const presets = getPresets();
  const waapiSupported = typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function';
  const ioSupported = typeof IntersectionObserver !== 'undefined';
  const roSupported = typeof ResizeObserver !== 'undefined';
  
  const cssDetected = typeof getComputedStyle !== 'undefined' 
    ? getComputedStyle(document.documentElement).getPropertyValue('--ax-duration-normal') !== '' 
    : false;
    
  const reducedMotion = typeof matchMedia !== 'undefined' 
    ? matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const issues = [];
  const suggestions = [];

  if (!waapiSupported) issues.push('Web Animations API is not supported in this browser.');
  if (!ioSupported) issues.push('IntersectionObserver is not supported.');
  if (!cssDetected) {
    issues.push('AnimX CSS variables not detected on :root. Did you include animx.css?');
    suggestions.push('Ensure <link rel="stylesheet" href="dist/animx.css"> is in your <head>.');
  }
  if (presets.length === 0) issues.push('No presets registered.');

  return {
    version: '3.10.0',
    release: 'Studio Final UX Polish and Public Studio Release',
    build: 'full',
    dependency: 'zero-runtime-dependency',
    cssLoaded: cssDetected,
    jsLoaded: true,
    reducedMotion,
    waapiSupported,
    intersectionObserverSupported: ioSupported,
    resizeObserverSupported: roSupported,
    pointerEventsSupported: typeof window !== 'undefined' && !!window.PointerEvent,
    presetsRegistered: presets.length,
    issues,
    suggestions
  };
}

export function features() {
  return {
    waapi: typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function',
    intersectionObserver: typeof IntersectionObserver !== 'undefined',
    resizeObserver: typeof ResizeObserver !== 'undefined',
    mutationObserver: typeof MutationObserver !== 'undefined',
    pointerEvents: typeof window !== 'undefined' && !!window.PointerEvent,
    reducedMotion: typeof matchMedia !== 'undefined' ? matchMedia('(prefers-reduced-motion: reduce)').matches : false,
    svgPathLength: typeof SVGPathElement !== 'undefined' && 'getTotalLength' in SVGPathElement.prototype
  };
}

export function versionInfo() {
  return {
    name: 'AnimX',
    version: '3.10.0',
    release: 'Studio Final UX Polish and Public Studio Release',
    dependency: 'zero-runtime-dependency',
    features: features()
  };
}

export function productionCheck() {
  const diag = diagnose();
  const warnings = [];
  
  if (!diag.cssLoaded) warnings.push('AnimX CSS not detected on :root. Check stylesheet.');
  if (diag.presetsRegistered === 0) warnings.push('No presets are registered.');
  if (diag.issues.length > 0) warnings.push(...diag.issues);
  
  return {
    ok: warnings.length === 0,
    warnings,
    checks: {
      cssLoaded: diag.cssLoaded,
      reducedMotionSupported: diag.reducedMotion,
      presetCount: diag.presetsRegistered,
      buildType: diag.build
    }
  };
}
