import { saveTextState, textStateMap } from './text-state.js';
import { clearElementSafely } from './text-utils.js';
import { isReducedMotion } from '../core/reduced-motion.js';

export function runCounter(element, options) {
  const originalHTML = element.innerHTML;
  
  saveTextState(element, {
    originalHTML,
    originalText: originalHTML,
    type: 'counter',
    isRunning: true
  });

  clearElementSafely(element);
  
  const textNode = document.createTextNode('');
  element.appendChild(textNode);
  
  let state = textStateMap.get(element);
  
  let isPaused = false;
  let startTime = null;
  const duration = options.duration;
  const { from, to, decimals, prefix, suffix, format } = options;
  
  function formatNumber(val) {
    let str = val.toFixed(decimals);
    if (format === 'number') {
      str = Number(str).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    }
    return prefix + str + suffix;
  }
  
  if (isReducedMotion()) {
    textNode.nodeValue = formatNumber(to);
    state.isRunning = false;
    if (options.onComplete) options.onComplete(element);
    return createInstance(element, state);
  }
  
  function loop(time) {
    if (!state || !state.isRunning) return;
    if (isPaused) {
      if (startTime) startTime += (time - startTime);
      requestAnimationFrame(loop);
      return;
    }
    
    if (!startTime) startTime = time;
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Simple linear ease for counter
    const currentVal = from + (to - from) * progress;
    textNode.nodeValue = formatNumber(currentVal);
    
    if (progress < 1) {
      requestAnimationFrame(loop);
    } else {
      textNode.nodeValue = formatNumber(to);
      state.isRunning = false;
      if (options.onComplete) options.onComplete(element);
    }
  }
  
  if (options.onStart) options.onStart(element);
  requestAnimationFrame(loop);
  
  state.pause = () => { isPaused = true; };
  state.resume = () => { isPaused = false; };
  state.stop = () => { state.isRunning = false; };
  
  return createInstance(element, state);
}

function createInstance(element, state) {
  return {
    element,
    play: () => { if(state.resume) state.resume(); },
    pause: () => { if(state.pause) state.pause(); },
    resume: () => { if(state.resume) state.resume(); },
    stop: () => { if(state.stop) state.stop(); },
    revert: () => {
      if (state.stop) state.stop();
      element.innerHTML = state.originalHTML;
      textStateMap.delete(element);
    },
    destroy: () => {
      if (state.stop) state.stop();
      textStateMap.delete(element);
    },
    isRunning: () => state.isRunning
  };
}
