export function dispatchTextEvent(element, name, detail) {
  if (typeof document !== 'undefined') {
    const event = new CustomEvent(`animx:${name}`, { detail, bubbles: true });
    (element || document).dispatchEvent(event);
  }
}

export function clearElementSafely(element) {
  // Clear without destroying potential React/Vue listeners if possible,
  // but for a text animation engine, we often have to replace innerHTML.
  // In v0.7.0 we just use innerHTML since it's zero-dependency vanilla JS.
  element.innerHTML = '';
}

export function createWrapper(tag, className, textContent = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

export function getRawTextContent(element) {
  // Use textContent instead of innerText for better performance and hidden element support
  return element.textContent || '';
}
