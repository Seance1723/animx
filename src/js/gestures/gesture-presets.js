// gesture-presets.js
// Default SCSS presets for gestures

export const gesturePresets = {
  'gesture-drag': {
    name: 'gesture-drag',
    type: 'gesture',
    category: 'gesture',
    family: 'drag',
    description: 'Enables pointer-based dragging',
    tags: ['gesture', 'drag', 'pointer']
  },
  'gesture-swipe': {
    name: 'gesture-swipe',
    type: 'gesture',
    category: 'gesture',
    family: 'swipe',
    description: 'Enables swipe detection',
    tags: ['gesture', 'swipe', 'pointer']
  },
  'gesture-pan': {
    name: 'gesture-pan',
    type: 'gesture',
    category: 'gesture',
    family: 'pan',
    description: 'Enables continuous panning',
    tags: ['gesture', 'pan', 'pointer']
  },
  'gesture-pinch': {
    name: 'gesture-pinch',
    type: 'gesture',
    category: 'gesture',
    family: 'pinch',
    description: 'Enables pinch zoom scaling',
    tags: ['gesture', 'pinch', 'zoom', 'touch']
  },
  'gesture-long-press': {
    name: 'gesture-long-press',
    type: 'gesture',
    category: 'gesture',
    family: 'long-press',
    description: 'Enables long press detection',
    tags: ['gesture', 'long-press', 'touch']
  },
  'gesture-drag-reorder': {
    name: 'gesture-drag-reorder',
    type: 'gesture',
    category: 'gesture',
    family: 'drag',
    description: 'Enables drag to reorder lists',
    tags: ['gesture', 'drag', 'reorder', 'list']
  }
};
