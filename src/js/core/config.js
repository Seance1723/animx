import { safeMerge } from '../security/safe-merge.js';

const defaultConfig = {
  debug: false,
  autoInit: true,
  reducedMotion: 'system', // 'system', 'reduce', or 'allow'
  defaultDuration: 420,
  defaultEase: 'smooth',
  dataApi: true,
  scroll: {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
    once: true
  },
  advancedScroll: {
    enabled: true,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    reducedMotionSafe: true,
    passive: true
  },
  stagger: {
    each: 100,
    from: 'start',
    startDelay: 0,
    axis: 'both'
  },
  text: {
    preserveAccessibility: true,
    split: 'chars',
    animation: 'text-rise',
    stagger: 35,
    responsive: true,
    resplitDebounce: 150,
    typewriterSpeed: 45,
    scrambleDuration: 1000,
    counterDuration: 1000,
    tickerSpeed: 60,
    swapInterval: 1600
  },
  svg: {
    duration: 1000,
    ease: 'smooth',
    stagger: 100,
    drawOnInit: false,
    reducedMotionSafe: true
  },
  interactions: {
    enabled: true,
    hover: true,
    press: true,
    focus: true,
    ripple: true,
    magnetic: true,
    tilt: true,
    reducedMotionSafe: true
  },
  performance: {
    monitor: false,
    warnLargeBatch: true,
    largeBatchLimit: 100,
    batchDomWrites: true
  },
  components: {
    enabled: true,
    autoInit: true
  },
  layout: {
    enabled: true
  },
  gestures: {
    enabled: true,
    drag: true,
    swipe: true,
    pan: true,
    pinch: true,
    longPress: true,
    inertia: true,
    reducedMotionSafe: true,
    pointerCapture: true,
    defaultAxis: 'both'
  },
  morph: {
    duration: 700,
    ease: "smooth",
    fallback: "fade",
    reducedMotionSafe: true,
    maxPointsWarning: 250
  },
  cms: {
    enabled: true,
    autoScan: true,
    observe: false,
    observerDebounce: 120,
    editorSafe: true,
    autoRefresh: true,
    recipePrefix: "ax",
    maxAutoItems: 300
  },
  security: {
    safeMode: true,
    allowHTMLStringSwap: false,
    blockScriptHTML: true,
    blockInlineEventHandlers: true,
    blockJavascriptURLs: true,
    safeObjectMerge: true,
    validateSelectors: true,
    validateDataAttributes: true,
    freezePresetMetadata: false,
    debugWarnings: true
  }
};

let currentConfig = { ...defaultConfig };

export function getConfig() {
  return currentConfig;
}

export function setConfig(userConfig = {}) {
  currentConfig = safeMerge({ ...currentConfig }, userConfig);
  return currentConfig;
}
