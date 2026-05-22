// svg-morph-presets.js
// Registers morph-specific presets for the gallery and parser

export const morphPresets = {
  'svg-morph': {
    name: 'svg-morph',
    type: 'svg',
    category: 'svg',
    family: 'morph',
    description: 'Morphs SVG path data between compatible shapes',
    tags: ['svg', 'morph', 'path']
  },
  'svg-morph-icon': {
    name: 'svg-morph-icon',
    type: 'svg',
    category: 'svg',
    family: 'morph',
    description: 'Morphs standard SVG icons (e.g. menu to close)',
    tags: ['svg', 'morph', 'icon']
  },
  'svg-menu-close': {
    name: 'svg-menu-close',
    type: 'svg',
    category: 'svg',
    family: 'morph',
    description: 'Morphs hamburger menu to close icon',
    tags: ['svg', 'morph', 'icon', 'menu', 'close']
  },
  'svg-plus-minus': {
    name: 'svg-plus-minus',
    type: 'svg',
    category: 'svg',
    family: 'morph',
    description: 'Morphs plus icon to minus icon',
    tags: ['svg', 'morph', 'icon', 'plus', 'minus']
  }
};
