/**
 * AnimX Trigger Orchestrator (v3.16.0)
 * Allows firing custom events that AnimX listens to, converting them into animation triggers.
 */

export function trigger(eventName, payload = {}) {
  const evt = new CustomEvent(`ax:${eventName}`, { detail: payload });
  document.dispatchEvent(evt);
}

export function onTriggerEvent(eventName, callback) {
  const handler = (e) => callback(e.detail);
  document.addEventListener(`ax:${eventName}`, handler);
  return () => document.removeEventListener(`ax:${eventName}`, handler);
}
