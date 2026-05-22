// SVG State Management

export const svgStateMap = new WeakMap();

export function saveSvgState(element, state) {
  svgStateMap.set(element, state);
}

export function getSvgState(element) {
  return svgStateMap.get(element);
}

export function deleteSvgState(element) {
  svgStateMap.delete(element);
}
