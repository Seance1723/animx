export function dispatchAnimEvent(element, eventName, detail = {}) {
  if (!element || typeof window === 'undefined') return;
  
  try {
    const event = new CustomEvent(`animx:${eventName}`, {
      bubbles: true,
      cancelable: true,
      detail
    });
    element.dispatchEvent(event);
  } catch (e) {
    // Fallback for older browsers if needed, but CustomEvent is widely supported
    if (document.createEvent) {
      const event = document.createEvent('CustomEvent');
      event.initCustomEvent(`animx:${eventName}`, true, true, detail);
      element.dispatchEvent(event);
    }
  }
}
