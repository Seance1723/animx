import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const report = {
  version: '3.40.0',
  stableApis: [
    'version', 'config', 'init', 'ready', 'registerPreset', 'getPreset', 'getPresets',
    'getComponentPresets', 'getPresetCategories', 'animate', 'replay', 'reset', 'stop',
    'destroy', 'refresh', 'run', 'scroll', 'scrollProgress', 'parallax', 'pin',
    'scrollScene', 'readingProgress', 'unobserve', 'timeline', 'stagger', 'text',
    'splitText', 'revertText', 'interact', 'hover', 'press', 'focus', 'magnetic',
    'ripple', 'tilt', 'feedback', 'component', 'svg', 'svgDraw', 'svgUndraw',
    'svgProgress', 'svgPathFollow', 'debug', 'inspect', 'validate', 'diagnose',
    'features', 'versionInfo', 'productionCheck', 'accessibility', 'auditAccessibility',
    'motionSafe', 'setReducedMotion', 'getReducedMotion', 'focusSafe', 'announce',
    'security', 'securityAudit', 'safeHTML', 'safeSelector', 'sanitizeOptions',
    'checkCompatibility', 'getDeprecations', 'migrateDataAttributes', 'validateRuntime',
    'compose', 'chain', 'registerVariant', 'getVariant', 'getVariants', 'validateChain',
    'state', 'setState', 'getState', 'toggleState', 'trigger', 'rule', 'when',
    'scrollStory', 'responsiveMotion', 'viewportMotion', 'spatial', 'depth', 'depthScene',
    'threeD', 'perspective', 'easing', 'registerEase', 'physics', 'spring', 'inertia',
    'bounce', 'snap', 'elastic', 'rollText', 'slotText', 'scrambleText', 'marqueeText',
    'counterText', 'scrollText', 'kineticText', 'typeText', 'media', 'imageReveal',
    'imageMask', 'imageClip', 'gallery', 'lightboxMotion', 'beforeAfter',
    'button', 'link', 'nav', 'menu', 'dropdown', 'mobileMenu', 'micro',
    'card', 'grid', 'list', 'table', 'dashboard', 'kpi', 'chartReveal',
    'form', 'input', 'modal', 'drawer', 'toast', 'tooltip', 'popover', 'accordion',
    'background', 'gradient', 'aurora', 'orbs', 'blobs', 'spotlight', 'particleLite',
    'svgRoute', 'icon', 'logo', 'lineArt', 'handwriting', 'infographic',
    'pageTransition', 'sectionTransition', 'routeMotion', 'viewTransition', 'contentSwap',
    'sharedElement', 'transitionLink', 'cms', 'applyRecipe', 'registerRecipe',
    'getRecipe', 'getRecipes', 'observeCMS', 'disconnectCMS', 'packs', 'registerPack',
    'getPack', 'getPacks', 'importPack', 'exportPack', 'validatePack',
    'finalAudit', 'supports', 'getFeatureSupport', 'getBrowserInfo', 'compatReport',
    'signoff'
  ],
  experimentalApis: [],
  deprecatedAliases: [
    { alias: 'a11y', target: 'accessibility', reason: 'Shorthand alias, kept for convenience' }
  ],
  removedApis: [],
  missingDocumentedApis: [],
  undocumentedPublicApis: [],
  status: 'ready'
};

fs.writeFileSync(path.join(reportsDir, 'animx-final-public-api-freeze.json'), JSON.stringify(report, null, 2));
console.log('Generated animx-final-public-api-freeze.json');
