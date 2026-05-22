// svg-morph.js
// RequestAnimationFrame based path interpolator

import { normalizeSelector } from '../core/selector.js';
import { validateMorph } from './svg-morph-validator.js';
import { buildPathString } from './svg-path-parser.js';
import { shapeToPathData } from './svg-path-normalizer.js';
import { getIconPath } from './svg-morph-icon.js';
import { getConfig } from '../core/config.js';
import { isReducedMotion } from '../core/reduced-motion.js';

const activeMorphs = new WeakMap();

export function destroyMorphs(element) {
  const els = normalizeSelector(element);
  els.forEach(el => {
    const inst = activeMorphs.get(el);
    if (inst && typeof inst.destroy === 'function') {
      inst.destroy();
    }
  });
}

function createMorphInstance(element, fromCmds, toCmds, options, finalPathStr) {
  const config = getConfig();
  let rafId = null;
  let startTime = null;
  let isRunning = false;
  let isPaused = false;
  let pauseTime = 0;
  let progress = 0;
  let direction = 1;

  const duration = options.duration || config.morph?.duration || 700;
  const easeName = options.ease || config.morph?.ease || 'smooth';
  
  // Minimal fallback easing if WAAPI easing parser isn't available for numeric JS lerp
  // We'll use a simple ease-in-out cubic approximation
  let easeFn = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  if (easeName === 'linear') easeFn = (t) => t;

  element.classList.add('ax-svg-morph-ready');

  const applyFrame = (p) => {
    const interpolated = [];
    for (let i = 0; i < fromCmds.length; i++) {
      const fc = fromCmds[i];
      const tc = toCmds[i];
      const outVals = [];
      for (let v = 0; v < fc.values.length; v++) {
        // Linear interpolate the numbers
        outVals.push(fc.values[v] + (tc.values[v] - fc.values[v]) * p);
      }
      interpolated.push({ type: tc.type, values: outVals }); // use target command type
    }
    const newD = buildPathString(interpolated);
    element.setAttribute('d', newD);
  };

  const loop = (timestamp) => {
    if (!startTime) startTime = timestamp - (progress * duration);
    if (isPaused) {
      startTime = timestamp - pauseTime;
      return;
    }

    let elapsed = timestamp - startTime;
    let t = elapsed / duration;
    
    if (t > 1) t = 1;
    if (t < 0) t = 0;

    progress = t;
    const eased = easeFn(direction === 1 ? t : 1 - t);
    
    applyFrame(eased);

    if (options.onUpdate) options.onUpdate(progress, instance);

    if (t === 1) {
      if (options.yoyo) {
        direction = direction === 1 ? -1 : 1;
        startTime = timestamp;
        rafId = requestAnimationFrame(loop);
      } else if (options.loop) {
        startTime = timestamp;
        rafId = requestAnimationFrame(loop);
      } else {
        complete();
      }
    } else {
      rafId = requestAnimationFrame(loop);
    }
  };

  const complete = () => {
    isRunning = false;
    element.classList.remove('ax-svg-morph-running');
    element.classList.add('ax-svg-morph-complete');
    
    // Ensure exact final state
    if (direction === 1) {
      element.setAttribute('d', finalPathStr);
    } else {
      element.setAttribute('d', buildPathString(fromCmds));
    }

    if (options.onComplete) options.onComplete(instance);
  };

  const instance = {
    elements: [element],
    play: () => {
      if (isRunning && !isPaused) return;
      isRunning = true;
      isPaused = false;
      element.classList.add('ax-svg-morph-running');
      element.classList.remove('ax-svg-morph-ready', 'ax-svg-morph-complete');
      if (options.onStart) options.onStart(instance);
      rafId = requestAnimationFrame(loop);
    },
    pause: () => {
      if (!isRunning || isPaused) return;
      isPaused = true;
      pauseTime = progress * duration;
      if (rafId) cancelAnimationFrame(rafId);
    },
    resume: () => {
      if (isPaused) {
        isPaused = false;
        rafId = requestAnimationFrame(loop);
      }
    },
    stop: () => {
      isRunning = false;
      isPaused = false;
      if (rafId) cancelAnimationFrame(rafId);
      element.classList.remove('ax-svg-morph-running');
      if (options.onCancel) options.onCancel(instance);
    },
    reset: () => {
      instance.stop();
      progress = 0;
      direction = 1;
      startTime = null;
      element.setAttribute('d', buildPathString(fromCmds));
    },
    reverse: () => {
      direction = direction === 1 ? -1 : 1;
      if (!isRunning) instance.play();
    },
    destroy: () => {
      instance.stop();
      element.classList.remove('ax-svg-morph-ready', 'ax-svg-morph-running', 'ax-svg-morph-complete');
      activeMorphs.delete(element);
    },
    isRunning: () => isRunning && !isPaused,
    getProgress: () => progress
  };

  activeMorphs.set(element, instance);
  return instance;
}

export function svgMorph(target, options = {}) {
  const elements = normalizeSelector(target);
  const config = getConfig();
  const reducedMotion = isReducedMotion() && (options.reducedMotionSafe !== false && config.morph?.reducedMotionSafe !== false);
  const fallbackType = options.fallback || config.morph?.fallback || 'fade';
  const duration = options.duration || config.morph?.duration || 700;

  const instances = [];

  elements.forEach(el => {
    // 1. Resolve from/to
    let fromPath = options.from;
    let toPath = options.to;

    // If string is a selector, get its 'd'
    if (fromPath && (fromPath.startsWith('#') || fromPath.startsWith('.'))) {
      const fEl = document.querySelector(fromPath);
      if (fEl) fromPath = shapeToPathData(fEl);
    }
    if (toPath && (toPath.startsWith('#') || toPath.startsWith('.'))) {
      const tEl = document.querySelector(toPath);
      if (tEl) toPath = shapeToPathData(tEl);
    }

    if (!fromPath) {
      fromPath = shapeToPathData(el);
    }

    if (!fromPath || !toPath) {
      if (config.debug) console.warn('AnimX: Morph missing from/to path data', el);
      return;
    }

    // 2. Validate
    const validation = validateMorph(fromPath, toPath);
    
    destroyMorphs(el);

    if (reducedMotion || !validation.ok) {
      // Fallback behavior
      if (fallbackType === 'jump' || reducedMotion) {
        el.setAttribute('d', toPath);
      } else if (fallbackType === 'fade') {
        const anim = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: duration / 2, fill: 'forwards' });
        anim.onfinish = () => {
          el.setAttribute('d', toPath);
          el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: duration / 2, fill: 'forwards' });
        };
      }
      // Return dummy instance
      instances.push({
        elements: [el], play:()=>{}, pause:()=>{}, resume:()=>{}, stop:()=>{}, 
        reset:()=>{}, reverse:()=>{}, destroy:()=>{ activeMorphs.delete(el); }, isRunning:()=>false, getProgress:()=>1
      });
      return;
    }

    // 3. Create active interpolator
    const instance = createMorphInstance(el, validation.fromCmds, validation.toCmds, options, toPath);
    instances.push(instance);

    // Auto-play unless delayed/manual (usually handled by caller)
    // We provide play() so caller dictates. But if we are called directly:
    if (options.autoPlay !== false) {
      if (options.delay) {
        setTimeout(() => instance.play(), options.delay);
      } else {
        instance.play();
      }
    }
  });

  return {
    elements,
    instances,
    play: () => instances.forEach(i => i.play()),
    pause: () => instances.forEach(i => i.pause()),
    resume: () => instances.forEach(i => i.resume()),
    stop: () => instances.forEach(i => i.stop()),
    reset: () => instances.forEach(i => i.reset()),
    reverse: () => instances.forEach(i => i.reverse()),
    destroy: () => instances.forEach(i => i.destroy()),
    isRunning: () => instances.some(i => i.isRunning()),
    getProgress: () => instances.length ? instances[0].getProgress() : 0
  };
}

export function morphPath(target, toPathSelector, options = {}) {
  const tEl = document.querySelector(toPathSelector);
  const toPath = tEl ? shapeToPathData(tEl) : null;
  return svgMorph(target, { ...options, to: toPath || toPathSelector });
}

export function morphShape(target, toTarget, options = {}) {
  return morphPath(target, toTarget, options);
}

export function morphIcon(target, options = {}) {
  const fromStr = getIconPath(options.from) || options.from;
  const toStr = getIconPath(options.to) || options.to;
  return svgMorph(target, { ...options, from: fromStr, to: toStr });
}
