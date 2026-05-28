export const ANIMX_REGISTRY_VERSION = '3.41.0';

export const ANIMX_REGISTRY_RELEASE = 'Animation Registry Rebuild, Capability Matrix, and Playground-Ready Metadata Foundation';

export const STATUS_VALUES = ['ready', 'experimental', 'needs-review', 'deprecated'];

export const FAMILY_VALUES = [
  'text',
  'interaction',
  'component',
  'media',
  'svg',
  'scroll',
  'page',
  'background',
  'data-ui',
  'layout',
  'gesture',
  'physics',
  'state',
  'cms',
  'utility'
];

export const ELEMENT_VALUES = [
  'text',
  'button',
  'link',
  'navigation',
  'card',
  'image',
  'gallery',
  'video',
  'svg',
  'icon',
  'logo',
  'background',
  'form-input',
  'modal',
  'toast',
  'tooltip',
  'accordion',
  'table-row',
  'kpi-card',
  'chart',
  'section',
  'page',
  'cms-block',
  'layout',
  'gesture',
  'utility'
];

export const MATRIX_ELEMENTS = [
  ['text', 'Text'],
  ['button', 'Button'],
  ['link', 'Link'],
  ['navigation', 'Navigation'],
  ['card', 'Card'],
  ['image', 'Image'],
  ['gallery', 'Gallery'],
  ['video', 'Video'],
  ['svg', 'SVG'],
  ['icon', 'Icon'],
  ['logo', 'Logo'],
  ['background', 'Background'],
  ['form-input', 'Form Input'],
  ['modal', 'Modal'],
  ['toast', 'Toast'],
  ['tooltip', 'Tooltip'],
  ['accordion', 'Accordion'],
  ['table-row', 'Table Row'],
  ['kpi-card', 'KPI Card'],
  ['chart', 'Chart'],
  ['section', 'Section'],
  ['page', 'Page Transition'],
  ['cms-block', 'CMS Block'],
  ['layout', 'Layout'],
  ['gesture', 'Gesture'],
  ['physics', 'Physics'],
  ['state', 'State']
];

export const READY_CSS_EFFECT_IDS = new Set([
  'fade-in', 'fade-out', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'fade-center',
  'slide-up', 'slide-down', 'slide-left', 'slide-right',
  'zoom-in', 'zoom-out', 'scale-up', 'scale-down',
  'rotate-in', 'spin', 'flip-x',
  'shake', 'pulse', 'bounce',
  'loader-spin', 'blur-up', 'glow-pulse',
  'text-rise', 'text-slide-up',
  'text-fade', 'text-mask-up', 'text-wave', 'text-char-wave', 'text-word-wave',
  'text-swap-up', 'text-swap-fade', 'text-gradient-shift', 'text-gradient-pulse', 'text-gradient-sweep',
  'svg-draw', 'svg-undraw', 'svg-stroke-dash', 'svg-fill-in', 'svg-fill-fade',
  'svg-logo-build', 'svg-icon-draw', 'svg-line-draw', 'svg-ring-progress', 'svg-path-follow',
  'svg-pulse-stroke', 'svg-dash-loop', 'svg-trace-glow',
  'image-zoom-in', 'image-zoom-out', 'image-blur-in', 'image-parallax-soft', 'image-kenburns',
  'image-pan-left', 'image-pan-right', 'image-light-sweep', 'image-frame-lift', 'image-mask-reveal',
  'video-fade-in', 'media-card-lift',
  'bg-gradient-shift', 'bg-gradient-pulse', 'bg-gradient-sweep',
  'bg-pan', 'bg-zoom', 'bg-mesh-drift', 'bg-radial-bloom', 'bg-noise-drift', 'bg-orb-float', 'bg-spotlight-sweep',
  'skeleton-shimmer', 'skeleton-wave', 'skeleton-pulse', 'skeleton-glow', 'skeleton-card', 'skeleton-text-lines',
  'skeleton-avatar', 'skeleton-table', 'skeleton-media', 'skeleton-dashboard',
  'nav-link-underline-slide', 'modal-pop', 'drawer-left', 'toast-slide-up', 'tooltip-pop', 'bg-aurora'
]);

export const READY_JS_EFFECTS = {
  split: { family: 'text', category: 'split-text', element: 'text', jsApi: 'AnimX.text', previewType: 'text' },
  'rolling-text': { family: 'text', category: 'rolling-text', element: 'text', jsApi: 'AnimX.rollText', previewType: 'text' },
  'scramble-text': { family: 'text', category: 'text-reveal', element: 'text', jsApi: 'AnimX.scrambleText', previewType: 'text' },
  'counter-text': { family: 'text', category: 'text-reveal', element: 'kpi-card', jsApi: 'AnimX.counterText', previewType: 'kpi-card' },
  'marquee-text': { family: 'text', category: 'rolling-text', element: 'text', jsApi: 'AnimX.marqueeText', previewType: 'text' },
  hover: { family: 'interaction', category: 'hover', element: 'button', jsApi: 'AnimX.hover', previewType: 'button' },
  press: { family: 'interaction', category: 'press', element: 'button', jsApi: 'AnimX.press', previewType: 'button' },
  focus: { family: 'interaction', category: 'focus', element: 'form-input', jsApi: 'AnimX.focus', previewType: 'form-input' },
  magnetic: { family: 'interaction', category: 'pointer', element: 'button', jsApi: 'AnimX.magnetic', previewType: 'button' },
  ripple: { family: 'interaction', category: 'pointer', element: 'button', jsApi: 'AnimX.ripple', previewType: 'button' },
  tilt: { family: 'interaction', category: 'pointer', element: 'card', jsApi: 'AnimX.tilt', previewType: 'card' },
  'svg-draw-js': { family: 'svg', category: 'svg-draw', element: 'svg', jsApi: 'AnimX.svgDraw', previewType: 'svg' },
  'svg-path-follow-js': { family: 'svg', category: 'svg-path', element: 'svg', jsApi: 'AnimX.svgPathFollow', previewType: 'svg' },
  parallax: { family: 'scroll', category: 'scroll-motion', element: 'section', jsApi: 'AnimX.parallax', previewType: 'section' },
  'scroll-progress': { family: 'scroll', category: 'scroll-progress', element: 'section', jsApi: 'AnimX.scrollProgress', previewType: 'section' },
  pin: { family: 'scroll', category: 'scroll-motion', element: 'section', jsApi: 'AnimX.pin', previewType: 'section' },
  spring: { family: 'physics', category: 'spring-motion', element: 'utility', jsApi: 'AnimX.spring', previewType: 'utility' },
  drag: { family: 'gesture', category: 'drag', element: 'gesture', jsApi: 'AnimX.drag', previewType: 'gesture' },
  swipe: { family: 'gesture', category: 'swipe', element: 'gesture', jsApi: 'AnimX.swipe', previewType: 'gesture' }
};
