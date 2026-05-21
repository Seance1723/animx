export const scrollObservedMap = new WeakMap();

export function markScrollObserved(element, config) {
  if (!element || element.nodeType !== 1) return;
  element.classList.add('ax-scroll-ready');
  scrollObservedMap.set(element, config);
}

export function isScrollObserved(element) {
  return scrollObservedMap.has(element);
}

export function markScrollEntered(element, enterClass) {
  element.classList.add('ax-in-view');
  element.classList.remove('ax-out-view');
  if (enterClass) element.classList.add(enterClass);
}

export function markScrollExited(element, exitClass) {
  element.classList.remove('ax-in-view');
  element.classList.add('ax-out-view');
  if (exitClass) element.classList.add(exitClass);
}

export function unmarkScrollObserved(element) {
  scrollObservedMap.delete(element);
}
