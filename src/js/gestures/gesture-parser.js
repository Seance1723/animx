// gesture-parser.js
// Extracts gesture configuration from DOM element attributes

export function parseGestureAttributes(element) {
  const ds = element.dataset;
  
  if (ds.axGestureDisabled === 'true') {
    return { disabled: true };
  }

  const gestures = {};

  if (ds.axDrag !== undefined) {
    gestures.drag = {
      axis: ds.axDragAxis || 'both',
      bounds: ds.axDragBounds,
      handle: ds.axDragHandle,
      inertia: ds.axDragInertia === 'true',
      spring: ds.axDragSpring === 'true',
      snapBack: ds.axDragSnapBack === 'true',
      grid: ds.axDragGrid
    };
  }

  if (ds.axSwipe !== undefined) {
    gestures.swipe = {
      direction: ds.axSwipe || 'any',
      threshold: parseInt(ds.axSwipeThreshold, 10) || 60,
      velocity: parseFloat(ds.axSwipeVelocity) || 0.25
    };
  }

  if (ds.axPan !== undefined) {
    gestures.pan = true; // Use default options
  }

  if (ds.axPinch !== undefined) {
    gestures.pinch = {
      minScale: parseFloat(ds.axPinchMin) || 0.5,
      maxScale: parseFloat(ds.axPinchMax) || 3
    };
  }

  if (ds.axLongPress !== undefined) {
    gestures.longPress = {
      duration: parseInt(ds.axLongPressDuration, 10) || 600
    };
  }

  if (ds.axDragReorder !== undefined) {
    gestures.dragReorder = {
      items: ds.axReorderItems,
      axis: ds.axReorderAxis || 'y'
    };
  }

  // Generic gesture
  if (ds.axGesture !== undefined) {
    gestures.generic = true;
  }

  return Object.keys(gestures).length > 0 ? gestures : null;
}
