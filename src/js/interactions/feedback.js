import { dispatchInteractionEvent } from './interaction-utils.js';

export function runFeedback(element, type, options, animxInstance) {
  // Feedback is typically a one-off call, not a persistent listener.
  // It applies a class/animation instantly.
  
  const map = {
    'error': 'ax-feedback-error-shake',
    'success': 'ax-feedback-success-pop',
    'warning': 'ax-feedback-warning-pulse',
    'info': 'ax-feedback-info-glow'
  };
  
  const cssClass = map[type];
  if (!cssClass) return null;
  
  element.classList.add(`ax-feedback-${type}`);
  
  // Use AnimX WAAPI wrapper if we want to sync perfectly,
  // but the prompt specified mapping to SCSS classes. 
  // Let's just force-replay the class.
  element.classList.remove(cssClass);
  // trigger reflow
  void element.offsetWidth;
  element.classList.add(cssClass);
  
  dispatchInteractionEvent(element, 'feedback', { type, options });
  
  // Cleanup class after anim
  const duration = type === 'error' ? 500 : (type === 'success' ? 400 : (type === 'warning' ? 800 : 1000));
  
  setTimeout(() => {
    element.classList.remove(cssClass);
    element.classList.remove(`ax-feedback-${type}`);
  }, duration);
  
  return {
    element,
    type: 'feedback',
    replay: () => runFeedback(element, type, options, animxInstance)
  };
}
