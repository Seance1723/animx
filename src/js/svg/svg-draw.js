import { normalizeSelector } from '../core/selector.js';
import { getConfig } from '../core/config.js';
import { isReducedMotion } from '../core/reduced-motion.js';
import { getSvgLength, cleanInlineStyles } from './svg-utils.js';
import { saveSvgState, deleteSvgState } from './svg-state.js';

export function svgDraw(targets, options = {}, isUndraw = false) {
  const elements = normalizeSelector(targets);
  const config = getConfig().svg || {};
  const duration = options.duration !== undefined ? options.duration : config.duration;
  const ease = options.ease || config.ease;
  const staggerDelay = options.stagger !== undefined ? options.stagger : config.stagger;
  const useReducedMotion = isReducedMotion();

  // If using AnimX stagger wrapper internally, delay might be passed
  const baseDelay = options.delay || 0;

  let instances = [];

  elements.forEach((el, index) => {
    // If element is <svg>, we want to draw its children
    const targetNodes = el.tagName.toLowerCase() === 'svg' ? 
      Array.from(el.querySelectorAll('path, line, polyline, polygon, circle, ellipse, rect')) : 
      [el];

    targetNodes.forEach((node, nodeIndex) => {
      const length = getSvgLength(node);
      if (length <= 0) return; // Skip invisible or invalid

      const currentDelay = baseDelay + ((index + nodeIndex) * staggerDelay);
      
      const state = {
        element: node,
        length: length,
        type: isUndraw ? 'undraw' : 'draw',
        isRunning: true,
        animation: null
      };

      if (useReducedMotion && config.reducedMotionSafe) {
        node.style.strokeDasharray = 'none';
        node.style.strokeDashoffset = '0';
        state.isRunning = false;
        if (options.onComplete) options.onComplete(state);
        instances.push(createInstance(state, options));
        return;
      }

      // Initial setup
      node.style.strokeDasharray = `${length} ${length}`;
      const startOffset = isUndraw ? 0 : length;
      const endOffset = isUndraw ? length : 0;
      
      node.style.strokeDashoffset = startOffset;
      
      saveSvgState(node, state);

      const timing = {
        duration: duration,
        delay: currentDelay,
        easing: ease === 'smooth' ? 'cubic-bezier(0.4, 0, 0.2, 1)' : (ease || 'ease'),
        fill: 'forwards'
      };

      if (typeof node.animate === 'function') {
        const anim = node.animate([
          { strokeDashoffset: startOffset },
          { strokeDashoffset: endOffset }
        ], timing);

        state.animation = anim;

        anim.onfinish = () => {
          state.isRunning = false;
          node.style.strokeDashoffset = endOffset;
          // Clean up CSS if it was a forward draw to prevent resize bugs where length changes
          if (!isUndraw) {
            cleanInlineStyles(node, ['stroke-dasharray', 'stroke-dashoffset']);
          }
          if (options.onComplete) options.onComplete(state);
        };

        if (options.onStart) {
          setTimeout(() => { if (state.isRunning) options.onStart(state); }, currentDelay);
        }
      } else {
        // Fallback for extremely old browsers lacking WAAPI on SVG
        node.style.transition = `stroke-dashoffset ${duration}ms ${timing.easing} ${currentDelay}ms`;
        // Force reflow
        void node.getBoundingClientRect();
        node.style.strokeDashoffset = endOffset;
        
        state.fallbackTimeout = setTimeout(() => {
          state.isRunning = false;
          if (!isUndraw) cleanInlineStyles(node, ['stroke-dasharray', 'stroke-dashoffset', 'transition']);
          if (options.onComplete) options.onComplete(state);
        }, currentDelay + duration);
      }

      instances.push(createInstance(state, options));
    });
  });

  return createGroupInstance(instances);
}

export function svgUndraw(targets, options = {}) {
  return svgDraw(targets, options, true);
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
    replay: () => {
      if (state.animation) {
        state.animation.cancel();
        state.animation.play();
        state.isRunning = true;
      }
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
    replay: () => instances.forEach(i => i.replay()),
    reset: () => instances.forEach(i => i.reset()),
    destroy: () => instances.forEach(i => i.destroy()),
    isRunning: () => instances.some(i => i.isRunning())
  };
}
