import { normalizeSelector } from '../core/selector.js';
import { getConfig } from '../core/config.js';
import { isReducedMotion } from '../accessibility/accessibility-state.js';
import { getSvgLength, cleanInlineStyles } from './svg-utils.js';
import { saveSvgState, deleteSvgState } from './svg-state.js';

export function svgProgress(targets, options = {}) {
  const elements = normalizeSelector(targets);
  const config = getConfig().svg || {};
  const duration = options.duration !== undefined ? options.duration : config.duration;
  const ease = options.ease || config.ease;
  const useReducedMotion = isReducedMotion();

  const value = options.value !== undefined ? options.value : 100;
  const max = options.max !== undefined ? options.max : 100;
  const ratio = Math.min(Math.max(value / max, 0), 1);
  const cssVar = options.cssVar || null;

  let instances = [];

  elements.forEach(node => {
    const length = getSvgLength(node);
    if (length <= 0) return;

    const targetOffset = length - (length * ratio);

    const state = {
      element: node,
      length: length,
      type: 'progress',
      isRunning: true,
      animation: null
    };

    if (useReducedMotion && config.reducedMotionSafe) {
      node.style.strokeDasharray = `${length} ${length}`;
      node.style.strokeDashoffset = targetOffset;
      if (cssVar) node.style.setProperty(cssVar, ratio);
      state.isRunning = false;
      if (options.onComplete) options.onComplete(state);
      instances.push(createInstance(state, options));
      return;
    }

    // Default to fully hidden if not set
    if (!node.style.strokeDasharray) {
      node.style.strokeDasharray = `${length} ${length}`;
      node.style.strokeDashoffset = length;
    }
    
    // Read current offset
    const currentOffsetStr = getComputedStyle(node).strokeDashoffset;
    const currentOffset = currentOffsetStr && currentOffsetStr !== 'none' ? parseFloat(currentOffsetStr) : length;

    saveSvgState(node, state);

    const timing = {
      duration: duration,
      easing: ease === 'smooth' ? 'cubic-bezier(0.4, 0, 0.2, 1)' : (ease || 'ease'),
      fill: 'forwards'
    };

    if (typeof node.animate === 'function') {
      const anim = node.animate([
        { strokeDashoffset: currentOffset },
        { strokeDashoffset: targetOffset }
      ], timing);

      state.animation = anim;

      // Handle CSS Variable update via requestAnimationFrame if needed
      if (cssVar) {
        let startTime = null;
        const startRatio = (length - currentOffset) / length;
        
        const loop = (t) => {
          if (!state.isRunning) return;
          if (!startTime) startTime = t;
          const progress = Math.min((t - startTime) / duration, 1);
          // Simplified linear interpolation for CSS var mapping during WAAPI execution
          const currentRatio = startRatio + ((ratio - startRatio) * progress);
          node.style.setProperty(cssVar, currentRatio.toFixed(4));
          if (progress < 1) requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      }

      anim.onfinish = () => {
        state.isRunning = false;
        node.style.strokeDashoffset = targetOffset;
        if (cssVar) node.style.setProperty(cssVar, ratio);
        if (options.onComplete) options.onComplete(state);
      };
    } else {
      node.style.transition = `stroke-dashoffset ${duration}ms ${timing.easing}`;
      void node.getBoundingClientRect();
      node.style.strokeDashoffset = targetOffset;
      if (cssVar) node.style.setProperty(cssVar, ratio);
      
      state.fallbackTimeout = setTimeout(() => {
        state.isRunning = false;
        if (options.onComplete) options.onComplete(state);
      }, duration);
    }

    instances.push(createInstance(state, options));
  });

  return createGroupInstance(instances);
}

function createInstance(state, options) {
  const node = state.element;
  return {
    element: node,
    play: () => { if (state.animation) state.animation.play(); },
    pause: () => { if (state.animation) state.animation.pause(); },
    resume: () => { if (state.animation && state.animation.playState !== 'running') state.animation.play(); },
    stop: () => {
      if (state.animation) state.animation.cancel();
      if (state.fallbackTimeout) clearTimeout(state.fallbackTimeout);
      state.isRunning = false;
    },
    reset: () => {
      if (state.animation) state.animation.cancel();
      if (state.fallbackTimeout) clearTimeout(state.fallbackTimeout);
      state.isRunning = false;
      cleanInlineStyles(node, ['stroke-dasharray', 'stroke-dashoffset', 'transition']);
    },
    destroy: () => {
      if (state.animation) state.animation.cancel();
      if (state.fallbackTimeout) clearTimeout(state.fallbackTimeout);
      state.isRunning = false;
      cleanInlineStyles(node, ['stroke-dasharray', 'stroke-dashoffset', 'transition']);
      deleteSvgState(node);
    },
    isRunning: () => state.isRunning
  };
}

function createGroupInstance(instances) {
  return {
    elements: instances.map(i => i.element),
    instances: instances,
    play: () => instances.forEach(i => i.play()),
    pause: () => instances.forEach(i => i.pause()),
    resume: () => instances.forEach(i => i.resume()),
    stop: () => instances.forEach(i => i.stop()),
    reset: () => instances.forEach(i => i.reset()),
    destroy: () => instances.forEach(i => i.destroy()),
    isRunning: () => instances.some(i => i.isRunning())
  };
}
