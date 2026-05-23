/**
 * AnimX Element Presets (v3.12.0)
 * Fills the missing animation coverage matrix.
 */

export const elementPresets = [
  // --- LINK & NAV ---
  {
    name: 'nav-link-underline-slide',
    family: 'nav-link', category: 'interaction', element: 'link', tags: ['hover', 'underline'],
    reducedMotion: 'instant',
    usage: ['class', 'data'],
    description: 'Slides an underline in on hover.'
  },
  {
    name: 'nav-menu-slide-down',
    family: 'nav-menu', category: 'entrance', element: 'nav', tags: ['menu', 'slide'],
    reducedMotion: 'fade',
    usage: ['class', 'js'],
    description: 'Smoothly slides a dropdown menu into view.'
  },

  // --- TABLE & LIST ---
  {
    name: 'list-row-reveal',
    family: 'list', category: 'entrance', element: 'list', tags: ['stagger', 'reveal'],
    reducedMotion: 'instant',
    usage: ['js', 'data'],
    description: 'Sequentially reveals list items.'
  },
  {
    name: 'table-row-fade',
    family: 'table', category: 'entrance', element: 'table', tags: ['fade'],
    reducedMotion: 'instant',
    usage: ['class', 'data'],
    description: 'Simple fade in for table rows to avoid layout thrashing.'
  },

  // --- DASHBOARD & KPI ---
  {
    name: 'kpi-number-roll',
    family: 'kpi', category: 'text', element: 'dashboard', tags: ['counter', 'numbers'],
    reducedMotion: 'final-state',
    usage: ['js'],
    description: 'Animates numerical KPI values.'
  },
  {
    name: 'chart-bar-grow',
    family: 'chart', category: 'svg', element: 'dashboard', tags: ['bar', 'grow'],
    reducedMotion: 'final-state',
    usage: ['class', 'js'],
    description: 'Grows SVG or div bars from bottom to top.'
  },

  // --- MODAL, DRAWER, TOAST ---
  {
    name: 'modal-pop',
    family: 'modal', category: 'entrance', element: 'modal', tags: ['scale', 'pop'],
    reducedMotion: 'instant',
    usage: ['class', 'data'],
    description: 'Scales up a modal playfully.'
  },
  {
    name: 'drawer-left',
    family: 'drawer', category: 'entrance', element: 'drawer', tags: ['slide'],
    reducedMotion: 'instant',
    usage: ['class', 'data'],
    description: 'Slides a drawer in from the left edge.'
  },
  {
    name: 'toast-slide-up',
    family: 'toast', category: 'entrance', element: 'toast', tags: ['notification'],
    reducedMotion: 'fade',
    usage: ['class', 'data'],
    description: 'Slides a toast notification up from the bottom.'
  },

  // --- TABS & TOOLTIP ---
  {
    name: 'tab-indicator-slide',
    family: 'tabs', category: 'interaction', element: 'tab', tags: ['indicator'],
    reducedMotion: 'instant',
    usage: ['js'],
    description: 'Slides the active tab indicator line.'
  },
  {
    name: 'tooltip-pop',
    family: 'tooltip', category: 'entrance', element: 'tooltip', tags: ['pop'],
    reducedMotion: 'fade',
    usage: ['class', 'data'],
    description: 'Pops a tooltip into view.'
  },

  // --- BACKGROUNDS ---
  {
    name: 'bg-aurora',
    family: 'background', category: 'ambient', element: 'bg', tags: ['gradient', 'loop'],
    reducedMotion: 'disabled-for-heavy-motion',
    usage: ['class'],
    description: 'Slow shifting aurora borealis gradient.'
  },
  {
    name: 'bg-grid-pulse',
    family: 'background', category: 'ambient', element: 'bg', tags: ['grid', 'loop'],
    reducedMotion: 'disabled-for-heavy-motion',
    usage: ['class'],
    description: 'Subtle pulsing architectural grid.'
  }
];
