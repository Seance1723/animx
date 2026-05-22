import { normalizeSelector } from '../core/selector.js';
import { getConfig } from '../core/config.js';
import { isReducedMotion } from '../core/reduced-motion.js';
import { getSvgLength } from './svg-utils.js';
import { saveSvgState, deleteSvgState } from './svg-state.js';

export function svgPathFollow(targets, options = {}) {
  const elements = normalizeSelector(targets);
  const config = getConfig().svg || {};
  const duration = options.duration !== undefined ? options.duration : 1800;
  const pathEl = typeof options.path === 'string' && typeof document !== 'undefined' && typeof document.querySelector === 'function' ? document.querySelector(options.path) : options.path;
  const rotate = options.rotate === true;
  const loopMode = options.loop === true;
  const useReducedMotion = isReducedMotion();

  if (!pathEl || typeof pathEl.getPointAtLength !== 'function') {
    return createGroupInstance([]); // Missing or invalid path
  }

  const length = getSvgLength(pathEl);
  if (length <= 0) return createGroupInstance([]);

  let instances = [];

  elements.forEach((node) => {
    const state = {
      element: node,
      isRunning: true,
      rafId: null,
      startTime: null,
      paused: false,
      pauseTime: null
    };

    if (useReducedMotion && config.reducedMotionSafe) {
      const endPoint = pathEl.getPointAtLength(length);
      node.style.transform = `translate(${endPoint.x}px, ${endPoint.y}px)`;
      state.isRunning = false;
      if (options.onComplete) options.onComplete(state);
      instances.push(createInstance(state, options));
      return;
    }

    saveSvgState(node, state);

    const run = (timestamp) => {
      if (!state.isRunning) return;
      if (state.paused) {
        state.pauseTime = timestamp;
        state.rafId = requestAnimationFrame(run);
        return;
      }

      if (!state.startTime) state.startTime = timestamp;
      
      // Shift start time if we were paused
      if (state.pauseTime) {
        state.startTime += (timestamp - state.pauseTime);
        state.pauseTime = null;
      }

      const elapsed = timestamp - state.startTime;
      let progress = elapsed / duration;

      if (progress > 1) {
        if (loopMode) {
          state.startTime = timestamp;
          progress = 0;
        } else {
          progress = 1;
        }
      }

      // Linear progress. Add custom easing via cubic-bezier math if needed.
      const currentLength = progress * length;
      const pt = pathEl.getPointAtLength(currentLength);
      
      let transformStr = `translate(${pt.x}px, ${pt.y}px)`;

      if (rotate) {
        // Look slightly ahead to calculate tangent angle
        const aheadLength = Math.min(currentLength + 1, length);
        const ptAhead = pathEl.getPointAtLength(aheadLength);
        const angle = Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * 180 / Math.PI;
        transformStr += ` rotate(${angle}deg)`;
      }

      node.style.transform = transformStr;

      if (progress < 1 || loopMode) {
        state.rafId = requestAnimationFrame(run);
      } else {
        state.isRunning = false;
        if (options.onComplete) options.onComplete(state);
      }
    };

    state.rafId = requestAnimationFrame(run);
    instances.push(createInstance(state, options));
  });

  return createGroupInstance(instances);
}

function createInstance(state, options) {
  const node = state.element;
  return {
    element: node,
    play: () => { state.paused = false; },
    pause: () => { state.paused = true; },
    resume: () => { state.paused = false; },
    stop: () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      state.isRunning = false;
    },
    replay: () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      state.startTime = null;
      state.isRunning = true;
      state.paused = false;
      // Re-trigger via parent if we could, but path follow is self contained
    },
    reset: () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      state.isRunning = false;
      node.style.transform = '';
    },
    destroy: () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      state.isRunning = false;
      node.style.transform = '';
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
