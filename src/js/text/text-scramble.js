import { saveTextState, textStateMap } from './text-state.js';
import { clearElementSafely, getRawTextContent } from './text-utils.js';
import { isReducedMotion } from '../accessibility/accessibility-state.js';

export function runScramble(element, options) {
  const originalHTML = element.innerHTML;
  const targetText = options.text !== null ? options.text : getRawTextContent(element).trim();
  
  saveTextState(element, {
    originalHTML,
    originalText: targetText,
    type: 'scramble',
    isRunning: true
  });

  clearElementSafely(element);

  if (options.preserveAccessibility && !element.hasAttribute('aria-label')) {
    element.setAttribute('aria-label', targetText);
  }

  const textNode = document.createTextNode('');
  element.appendChild(textNode);
  
  const PRESETS = {
    decode: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    hacker: '!<>-_\\\\/[]{}—=+*^?#________',
    soft: 'abcdefghijklmnopqrstuvwxyz',
    numeric: '0123456789',
    glitch: 'ABCDEF0123456789!@#$%^&*'
  };

  const presetName = options.preset || 'decode';
  const scrambleChars = options.chars || PRESETS[presetName] || PRESETS.decode;
  const duration = options.duration || 1000;
  
  let state = textStateMap.get(element);
  
  let isPaused = false;
  let startTime = null;
  
  if (isReducedMotion()) {
    textNode.nodeValue = targetText;
    state.isRunning = false;
    if (options.onComplete) options.onComplete(element);
    return createInstance(element, state);
  }
  
  const length = targetText.length;
  
  function loop(time) {
    if (!state || !state.isRunning) return;
    if (isPaused) {
      if (startTime) startTime += (time - startTime); // shift start time
      requestAnimationFrame(loop);
      return;
    }
    
    if (!startTime) startTime = time;
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    let currentText = '';
    
    for (let i = 0; i < length; i++) {
      let charProgress = 0;
      
      if (options.revealDirection === 'start') {
        charProgress = (progress * length) - i;
      } else if (options.revealDirection === 'end') {
        charProgress = (progress * length) - (length - 1 - i);
      } else if (options.revealDirection === 'center') {
        const center = length / 2;
        const dist = Math.abs(i - center);
        charProgress = (progress * length) - (center - dist);
      } else { // random
        // simple random heuristic
        charProgress = progress * 2 - Math.random(); 
      }
      
      if (charProgress >= 1 || targetText[i] === ' ') {
        currentText += targetText[i];
      } else if (charProgress > 0) {
        currentText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      } else {
        currentText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }
    }
    
    textNode.nodeValue = currentText;
    
    if (progress < 1) {
      requestAnimationFrame(loop);
    } else {
      textNode.nodeValue = targetText;
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
