export function dispatchComponentEvent(element, name, detail) {
  if (typeof document !== 'undefined') {
    const event = new CustomEvent(`animx:component-${name}`, { detail, bubbles: true });
    (element || document).dispatchEvent(event);
  }
}
