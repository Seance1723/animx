import { saveTextState, textStateMap } from './text-state.js';
import { clearElementSafely, getRawTextContent, createWrapper } from './text-utils.js';
import { isReducedMotion } from '../core/reduced-motion.js';

export function runTypewriter(element, options) {
  const originalHTML = element.innerHTML;
  const targetText = options.text !== null ? options.text : getRawTextContent(element).trim();
  
  saveTextState(element, {
    originalHTML,
    originalText: targetText,
    type: 'typewriter',
    isRunning: true
  });

  clearElementSafely(element);
  
  if (options.preserveAccessibility && !element.hasAttribute('aria-label')) {
    element.setAttribute('aria-label', targetText);
  }

  const textNode = document.createTextNode('');
  element.appendChild(textNode);
  
  let cursorWrapper = null;
  if (options.cursor) {
    cursorWrapper = createWrapper('span', 'ax-text-cursor is-blinking', options.cursorChar);
    if (options.preserveAccessibility) cursorWrapper.setAttribute('aria-hidden', 'true');
    element.appendChild(cursorWrapper);
  }

  let state = textStateMap.get(element);
  
  let index = 0;
  let lastTime = performance.now();
  let delay = options.speed;
  let isPaused = false;
  
  // Reduced motion
  if (isReducedMotion()) {
    textNode.nodeValue = targetText;
    if (cursorWrapper) cursorWrapper.classList.remove('is-blinking');
    state.isRunning = false;
    if (options.onComplete) options.onComplete(element);
    return createInstance(element, state);
  }

  function loop(time) {
    if (!state || !state.isRunning) return;
    if (isPaused) {
      requestAnimationFrame(loop);
      return;
    }
    
    if (time - lastTime >= delay) {
      lastTime = time;
      
      if (index < targetText.length) {
        textNode.nodeValue += targetText.charAt(index);
        index++;
        if (cursorWrapper) cursorWrapper.classList.remove('is-blinking');
      } else {
        // Done
        state.isRunning = false;
        if (cursorWrapper) cursorWrapper.classList.add('is-blinking');
        if (options.onComplete) options.onComplete(element);
        return; // end loop
      }
    }
    
    requestAnimationFrame(loop);
  }
  
  if (options.onStart) options.onStart(element);
  requestAnimationFrame(loop);
  
  state.pause = () => { isPaused = true; };
  state.resume = () => { isPaused = false; lastTime = performance.now(); };
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
