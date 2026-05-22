// Expanded Presets Metadata Generator

const generatePresets = () => {
  const presets = [];

  const add = (category, family, bases, modifiers, tags) => {
    bases.forEach(base => {
      // Add base without modifiers
      presets.push({
        name: base,
        className: `ax-${base}`,
        type: 'css',
        category,
        family,
        tags: [base, category, family, ...tags],
        description: `${base} animation`
      });

      // Add with modifiers
      if (modifiers && modifiers.length > 0) {
        modifiers.forEach(mod => {
          presets.push({
            name: `${base}-${mod}`,
            className: `ax-${base}-${mod}`,
            type: 'css',
            category,
            family,
            tags: [base, mod, category, family, ...tags],
            description: `${base} with ${mod} modifier`
          });
        });
      }
    });
  };

  const directions = ['up', 'down', 'left', 'right'];
  const intensities = ['soft', 'hard'];
  const transforms = ['x', 'y'];

  // Combine directions and intensities
  const dirIntensities = [];
  directions.forEach(d => {
    dirIntensities.push(d);
    intensities.forEach(i => dirIntensities.push(`${d}-${i}`));
  });

  // ENTRANCE
  add('entrance', 'fade', ['fade-in'], [], ['entrance', 'opacity']);
  add('entrance', 'fade', ['fade'], dirIntensities, ['entrance', 'slide', 'opacity']);
  add('entrance', 'slide', ['slide'], dirIntensities, ['entrance', 'move']);
  add('entrance', 'zoom', ['zoom-in', 'zoom-up', 'zoom-down'], [], ['entrance', 'scale']);
  add('entrance', 'blur', ['blur-in', 'blur-up', 'blur-down'], [], ['entrance', 'filter']);
  add('entrance', 'flip', ['flip-in'], transforms, ['entrance', 'rotate3d']);
  add('entrance', 'rotate', ['rotate-in', 'spin-in'], [], ['entrance', 'rotate']);
  add('entrance', 'scale', ['scale-in'], [], ['entrance', 'scale']);

  // EXIT
  add('exit', 'fade', ['fade-out'], [], ['exit', 'opacity']);
  add('exit', 'fade', ['fade-out'], directions, ['exit', 'slide', 'opacity']);
  add('exit', 'slide', ['slide-out'], directions, ['exit', 'move']);
  add('exit', 'zoom', ['zoom-out', 'scale-out'], [], ['exit', 'scale']);
  add('exit', 'blur', ['blur-out'], [], ['exit', 'filter']);
  add('exit', 'flip', ['flip-out'], transforms, ['exit', 'rotate3d']);
  add('exit', 'rotate', ['rotate-out'], [], ['exit', 'rotate']);
  add('exit', 'wipe', ['wipe-out'], ['up', 'down'], ['exit', 'clip-path']);
  add('exit', 'collapse', ['collapse-out'], [], ['exit', 'scale', 'opacity']);

  // ATTENTION
  add('attention', 'pulse', ['pulse'], ['', 'soft', 'strong'], ['attention', 'scale']);
  add('attention', 'shake', ['shake'], ['', 'x', 'y', 'soft', 'hard'], ['attention', 'move']);
  add('attention', 'heartbeat', ['heartbeat', 'ping'], [], ['attention', 'scale']);
  add('attention', 'bounce', ['bounce', 'bounce-soft'], [], ['attention', 'move']);
  add('attention', 'swing', ['swing', 'wobble', 'tada', 'jello'], [], ['attention', 'complex']);
  add('attention', 'glow', ['glow-pulse', 'vibrate', 'highlight'], [], ['attention', 'filter', 'move']);

  // EMPHASIS
  add('emphasis', 'lift', ['lift', 'rise'], [], ['emphasis', 'hover', 'move']);
  add('emphasis', 'pop', ['pop', 'soft-pop', 'depth-pop', 'scale-pop'], [], ['emphasis', 'scale']);
  add('emphasis', 'glow', ['border-glow', 'glow', 'shine', 'glint'], [], ['emphasis', 'filter', 'light']);
  add('emphasis', 'sweep', ['light-sweep', 'shadow-lift', 'focus-ring', 'spotlight'], [], ['emphasis', 'light', 'shadow']);

  // TRANSFORM
  add('transform', 'rotate', ['rotate-left', 'rotate-right', 'spin', 'spin-reverse'], [], ['transform', 'loop']);
  add('transform', 'float', ['float', 'float-up-down', 'float-left-right', 'drift', 'sway'], [], ['transform', 'loop', 'move']);
  add('transform', 'skew', ['skew-left', 'skew-right', 'tilt-soft', 'tilt-hard'], [], ['transform', 'skew', 'rotate3d']);

  // REVEAL
  add('reveal', 'mask', ['mask', 'curtain', 'clip'], ['up', 'down', 'left', 'right'], ['reveal', 'clip-path', 'overflow']);
  add('reveal', 'split', ['split-reveal'], ['horizontal', 'vertical'], ['reveal', 'clip-path']);
  add('reveal', 'wipe', ['wipe'], ['up', 'down', 'left', 'right'], ['reveal', 'clip-path']);

  // MEDIA
  add('media', 'image', ['image-zoom-in', 'image-zoom-out', 'image-blur-in', 'image-parallax-soft', 'image-kenburns'], [], ['media', 'image', 'scale']);
  add('media', 'image', ['image-pan'], ['left', 'right'], ['media', 'image', 'move']);
  add('media', 'image', ['image-light-sweep', 'image-frame-lift', 'image-mask-reveal'], [], ['media', 'image', 'effect']);
  add('media', 'video', ['video-fade-in', 'media-card-lift'], [], ['media', 'video']);

  // BACKGROUND
  add('background', 'gradient', ['bg-gradient-shift', 'bg-gradient-pulse', 'bg-gradient-sweep'], [], ['background', 'color', 'loop']);
  add('background', 'pan', ['bg-pan', 'bg-zoom', 'bg-mesh-drift', 'bg-radial-bloom', 'bg-noise-drift', 'bg-orb-float', 'bg-spotlight-sweep'], [], ['background', 'effect', 'loop']);

  // SKELETON
  add('skeleton', 'skeleton', ['skeleton-shimmer', 'skeleton-wave', 'skeleton-pulse', 'skeleton-glow', 'skeleton-card', 'skeleton-text-lines', 'skeleton-avatar', 'skeleton-table', 'skeleton-media', 'skeleton-dashboard'], [], ['skeleton', 'loading', 'placeholder']);

  // TEXT
  add('text', 'text', ['text-rise', 'text-fade', 'text-blur', 'text-wave', 'text-char-wave', 'text-word-wave', 'text-mask-up', 'text-mask-down', 'text-line-rise', 'text-line-fade', 'text-line-blur', 'text-swap-up', 'text-swap-fade', 'text-gradient-shift', 'text-gradient-pulse', 'text-gradient-sweep', 'text-scramble-decode', 'text-scramble-hacker', 'text-counter-roll', 'text-ticker-left', 'text-ticker-right'], [], ['text', 'typography']);

  // SVG
  add('svg', 'svg', ['svg-draw', 'svg-undraw', 'svg-stroke-dash', 'svg-fill-in', 'svg-fill-fade', 'svg-logo-build', 'svg-icon-draw', 'svg-line-draw', 'svg-ring-progress', 'svg-path-follow', 'svg-pulse-stroke', 'svg-dash-loop', 'svg-trace-glow'], [], ['svg', 'vector']);

  // Clean up duplicate names created by empty modifier string
  return presets.filter(p => !p.name.endsWith('-')).map(p => {
    // Deduplicate tags
    p.tags = [...new Set(p.tags)];
    return p;
  });
};

export const expandedPresets = generatePresets();
