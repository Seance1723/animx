// Use WeakMap to prevent memory leaks when DOM elements are removed
export const textStateMap = new WeakMap();

export function saveTextState(element, state) {
  textStateMap.set(element, state);
}

export function getTextState(element) {
  return textStateMap.get(element);
}

export function removeTextState(element) {
  textStateMap.delete(element);
}
