import { generateApiReport } from './signoff-report-generator.js';

const STABLE_APIS = [
  'version', 'config', 'init', 'ready', 'registerPreset', 'getPreset', 'getPresets',
  'getComponentPresets', 'getPresetCategories', 'getPresetsByCategory', 'searchPresets',
  'findPreset', 'suggestPreset', 'getPresetTags', 'animate', 'replay', 'reset', 'stop',
  'destroy', 'refresh', 'refreshScroll', 'run', 'scroll', 'scrollProgress', 'parallax',
  'pin', 'scrollScene', 'readingProgress', 'unobserve', 'timeline', 'stagger', 'text',
  'splitText', 'revertText', 'textSwap', 'ticker', 'counter', 'interact', 'hover',
  'press', 'focus', 'magnetic', 'ripple', 'tilt', 'feedback', 'component', 'svg',
  'svgDraw', 'svgUndraw', 'svgProgress', 'svgPathFollow', 'debug', 'inspect', 'validate',
  'diagnose', 'features', 'versionInfo', 'detectIntegration', 'productionCheck',
  'accessibility', 'a11y', 'auditAccessibility', 'motionSafe', 'setReducedMotion',
  'getReducedMotion', 'focusSafe', 'announce', 'createLiveRegion',
  'security', 'securityAudit', 'safeHTML', 'safeSelector', 'sanitizeOptions',
  'checkCompatibility', 'getDeprecations', 'migrateDataAttributes', 'validateRuntime',
  'compose', 'chain', 'registerVariant', 'getVariant', 'getVariants', 'validateChain',
  'state', 'setState', 'getState', 'toggleState', 'trigger', 'rule', 'when', 'destroyStates',
  'scrollStory', 'responsiveMotion', 'viewportMotion', 'validateScrollStory',
  'spatial', 'depth', 'depthScene', 'threeD', 'perspective', 'validate3D', 'destroySpatial',
  'easing', 'registerEase', 'getEase', 'getEases', 'validateEase',
  'physics', 'spring', 'inertia', 'bounce', 'snap', 'elastic', 'validatePhysics', 'destroyPhysics',
  'rollText', 'slotText', 'scrambleText', 'marqueeText', 'counterText', 'scrollText',
  'kineticText', 'typeText', 'validateTextEffect', 'destroyTextEffects',
  'media', 'imageReveal', 'imageMask', 'imageClip', 'mediaHover', 'mediaParallax',
  'videoMotion', 'gallery', 'lightboxMotion', 'beforeAfter', 'validateMediaEffect',
  'getMediaEffects', 'destroyMediaEffects',
  'button', 'link', 'nav', 'menu', 'dropdown', 'mobileMenu', 'micro', 'buttonState',
  'navState', 'tabIndicator', 'validateInteractionEffect', 'getInteractionEffects',
  'card', 'grid', 'list', 'table', 'dashboard', 'kpi', 'chartReveal', 'feed', 'kanban',
  'filterSort', 'dataState', 'validateDataUIEffect', 'getDataUIEffects', 'destroyDataUI',
  'form', 'input', 'validationMotion', 'checkbox', 'radio', 'switch', 'range',
  'modal', 'drawer', 'toast', 'tooltip', 'popover', 'accordion', 'upload',
  'progressFeedback', 'uiFeedback', 'validateFeedbackEffect', 'getFeedbackEffects', 'destroyFeedback',
  'background', 'gradient', 'meshGradient', 'aurora', 'orbs', 'blobs', 'spotlight',
  'cursorGlow', 'particleLite', 'noise', 'atmosphere', 'validateBackgroundEffect',
  'getBackgroundEffects', 'destroyBackgrounds',
  'svgRoute', 'icon', 'logo', 'lineArt', 'handwriting', 'infographic', 'svgChart',
  'svgDiagram', 'validateSVGEffect', 'getSVGEffects', 'destroySVG',
  'pageTransition', 'sectionTransition', 'routeMotion', 'viewTransition', 'contentSwap',
  'sharedElement', 'transitionLink', 'transitionTo', 'transitionFrom', 'transitionState',
  'validateTransition', 'getTransitionEffects', 'destroyTransitions',
  'cms', 'applyRecipe', 'registerRecipe', 'getRecipe', 'getRecipes', 'getCMSRecipes',
  'refreshCMS', 'observeCMS', 'disconnectCMS', 'validateCMSRecipe', 'exportCMSRecipe',
  'cmsAudit', 'destroyCMS',
  'packs', 'registerPack', 'getPack', 'getPacks', 'getPackCatalog', 'importPack',
  'exportPack', 'validatePack', 'auditPack', 'checkPackCompatibility', 'destroyPacks',
  'finalAudit',
  'supports', 'getFeatureSupport', 'getBrowserInfo', 'getFallback', 'registerFallback',
  'validateFallbacks', 'compatReport',
  'getExamples', 'copyExample'
];

const EXPERIMENTAL_APIS = [];

const DEPRECATED_ALIASES = [
  { alias: 'a11y', target: 'accessibility', reason: 'Shorthand alias, kept for convenience' }
];

export function publicApiFreezeCheck() {
  return generateApiReport({
    stableApis: STABLE_APIS,
    experimentalApis: EXPERIMENTAL_APIS,
    deprecatedAliases: DEPRECATED_ALIASES,
    removedApis: [],
    missingDocumentedApis: [],
    undocumentedPublicApis: []
  });
}
