import { ANIMX_REGISTRY_VERSION, STATUS_VALUES, FAMILY_VALUES, ELEMENT_VALUES } from './animation-taxonomy.js';

export const animationRegistrySchema = {
  version: ANIMX_REGISTRY_VERSION,
  requiredFields: [
    'id',
    'name',
    'family',
    'category',
    'element',
    'description',
    'status',
    'usageModes',
    'reducedMotion',
    'fallback',
    'accessibility',
    'performance',
    'playground',
    'docs',
    'tests'
  ],
  statuses: STATUS_VALUES,
  families: FAMILY_VALUES,
  elements: ELEMENT_VALUES
};

export function createEffectRecord(overrides) {
  return {
    id: '',
    name: '',
    family: 'utility',
    category: 'utility',
    element: 'utility',
    description: '',
    status: 'needs-review',
    usageModes: {
      class: false,
      data: false,
      js: false,
      cms: false
    },
    cssClass: '',
    dataAttribute: '',
    jsApi: '',
    options: {
      duration: true,
      delay: true,
      easing: true,
      stagger: false,
      direction: false,
      intensity: false
    },
    reducedMotion: {
      behavior: 'final-state',
      safe: true
    },
    fallback: {
      effect: '',
      reason: 'Use final readable state when animation is unavailable'
    },
    accessibility: {
      notes: ['Preserve readable content'],
      risk: 'low'
    },
    performance: {
      cost: 'low',
      notes: []
    },
    playground: {
      ready: false,
      previewType: '',
      defaultText: 'Animate anything with AnimX',
      defaultOptions: {},
      supportedControls: [],
      exportTypes: ['html', 'class', 'data', 'js', 'react', 'cms']
    },
    docs: {
      hasExample: false,
      docsPath: ''
    },
    tests: {
      covered: false,
      testIds: []
    },
    implementation: {
      kind: 'metadata',
      verified: false,
      source: ''
    },
    ...overrides
  };
}
