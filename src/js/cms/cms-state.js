const initializedNodes = new WeakSet();

export function isCMSInitialized(element) {
  return initializedNodes.has(element);
}

export function setCMSInitialized(element) {
  if (element) {
    initializedNodes.add(element);
  }
}
