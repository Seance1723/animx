const readyTextRevealEffects = [
  'text-fade-in',
  'text-fade-up',
  'text-fade-down',
  'text-slide-up',
  'text-slide-down',
  'text-blur-in',
  'text-blur-to-sharp',
  'text-mask-up',
  'text-mask-down',
  'text-mask-left',
  'text-mask-right',
  'line-mask-up',
  'line-mask-down',
  'line-curtain-reveal',
  'line-stagger-up',
  'word-fade-up',
  'word-slide-up',
  'word-mask-up',
  'word-blur-reveal',
  'word-random-reveal',
  'char-fade-up',
  'char-slide-up',
  'char-rotate-in',
  'char-flip-x',
  'char-flip-y',
  'char-random-reveal',
  'char-wave',
  'char-domino',
  'char-elastic-pop',
  'char-center-out',
  'char-edge-in',
  'paragraph-line-build'
];

const experimentalTextRevealEffects = [
  'char-spiral-in',
  'char-scatter-in',
  'char-gather-in',
  'word-wave-reveal',
  'line-overlap-reveal',
  'text-clip-reveal',
  'text-block-reveal',
  'text-highlight-reveal'
];

function categoryFor(id) {
  if (id.startsWith('line-')) return 'text-line-reveal';
  if (id.startsWith('word-')) return 'text-word-reveal';
  if (id.startsWith('char-')) return 'text-char-reveal';
  if (id.startsWith('paragraph-')) return 'text-paragraph-reveal';
  if (experimentalTextRevealEffects.includes(id)) return 'text-experimental-reveal';
  if (id.includes('mask') || id.includes('clip') || id.includes('block')) return 'text-mask-reveal';
  return 'text-basic-reveal';
}

function splitFor(id) {
  if (id.startsWith('line-') || id.startsWith('paragraph-')) return 'lines';
  if (id.startsWith('word-')) return 'words';
  if (id.startsWith('char-')) return 'chars';
  return 'chars';
}

function titleFromId(id) {
  return id.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function buildPreset(id, status) {
  return {
    name: id,
    className: `ax-${id}`,
    type: 'css',
    family: 'text',
    category: categoryFor(id),
    element: 'text',
    status,
    experimental: status === 'experimental',
    split: splitFor(id),
    usage: ['class', 'data', 'js', 'cms'],
    reducedMotion: 'final-state',
    tags: ['text', 'reveal', splitFor(id), categoryFor(id)],
    description: `${titleFromId(id)} text reveal effect.`
  };
}

export const textRevealPresets = [
  ...readyTextRevealEffects.map(id => buildPreset(id, 'ready')),
  ...experimentalTextRevealEffects.map(id => buildPreset(id, 'experimental'))
];

export const v342ReadyTextRevealEffects = readyTextRevealEffects;
export const v342ExperimentalTextRevealEffects = experimentalTextRevealEffects;
