import { updateState } from './studio-state.js';

export function initControls(state) {
  const ctrlTarget = document.getElementById('ctrl-target');
  const ctrlAnimation = document.getElementById('ctrl-animation');
  const ctrlDuration = document.getElementById('ctrl-duration');
  const ctrlDelay = document.getElementById('ctrl-delay');
  const ctrlEase = document.getElementById('ctrl-ease');
  const ctrlTrigger = document.getElementById('ctrl-trigger');
  
  // Initial values
  ctrlTarget.value = '#' + state.selectedElementId;
  ctrlAnimation.value = state.animation;
  ctrlDuration.value = state.duration;
  ctrlDelay.value = state.delay;
  ctrlEase.value = state.ease;
  ctrlTrigger.value = state.trigger;
  
  // Bind inputs
  ctrlAnimation.onchange = (e) => updateState({ animation: e.target.value });
  ctrlDuration.onchange = (e) => updateState({ duration: parseInt(e.target.value) || 700 });
  ctrlDelay.onchange = (e) => updateState({ delay: parseInt(e.target.value) || 0 });
  ctrlEase.onchange = (e) => updateState({ ease: e.target.value });
  ctrlTrigger.onchange = (e) => updateState({ trigger: e.target.value });
  
  // External updates
  return function syncControls(newState) {
    ctrlTarget.value = newState.selectedElementId ? '#' + newState.selectedElementId : 'None';
    ctrlAnimation.value = newState.animation;
    ctrlDuration.value = newState.duration;
    ctrlDelay.value = newState.delay;
    ctrlEase.value = newState.ease;
    ctrlTrigger.value = newState.trigger;
  };
}
