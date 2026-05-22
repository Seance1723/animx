# Preset List (v2.1.0)

> **New in v2.1.0:** The easiest way to explore presets is to use the local **Preset Gallery**. Simply run `npm run build` and open `dist/animx.gallery.html` to search, preview, and copy code for over 300 presets!

AnimX comes with an extensive registry of built-in animation presets categorized by their intended usage.

## 1. Categories
You can search the registry programmatically via `AnimX.searchPresets('fade')` or `AnimX.getPresetsByCategory('entrance')`.

- **Entrance**: `fade`, `slide`, `zoom`, `blur`, `flip`, `scale`
  *(e.g., `fade-up`, `fade-down-soft`, `slide-left`, `zoom-in`)*
- **Exit**: `fade-out`, `slide-out`, `zoom-out`, `collapse-out`
- **Attention**: `pulse`, `shake`, `heartbeat`, `bounce`, `wobble`
- **Emphasis**: `lift`, `pop`, `glow`, `spotlight`
- **Transform**: `spin`, `float`, `drift`, `skew`
- **Reveal**: `mask-up`, `clip-left`, `wipe-down`
- **Media**: `image-zoom-in`, `image-parallax-soft`, `image-pan-left`
- **Background**: `bg-gradient-shift`, `bg-pan`, `bg-radial-bloom`
- **Skeleton**: `skeleton-shimmer`, `skeleton-pulse`, `skeleton-card`
- **SVG**: `svg-draw`, `svg-stroke-dash`, `svg-fill-in`
- **Text**: `text-rise`, `text-wave`, `text-swap-up`, `text-scramble-decode`

## 2. Utility Modifiers
You can chain the following utility classes onto any element to quickly modify its animation properties without writing custom CSS.

**Duration**
- `.ax-instant` (0.01s)
- `.ax-fast` (0.3s)
- `.ax-normal` (0.6s)
- `.ax-slow` (1.2s)
- `.ax-cinematic` (2.5s)

**Delay**
- `.ax-delay-0`, `.ax-delay-100`, `.ax-delay-200`, `.ax-delay-300`, `.ax-delay-500`, `.ax-delay-700`, `.ax-delay-1000`

**Easing**
- `.ax-linear`, `.ax-smooth`, `.ax-snappy`, `.ax-soft`, `.ax-bounce`, `.ax-dramatic`

**Iteration**
- `.ax-repeat-1`, `.ax-repeat-2`, `.ax-repeat-3`, `.ax-infinite`

**Intensity**
- `.ax-subtle`, `.ax-soft-motion`, `.ax-strong`, `.ax-dramatic-motion`

**Transform Origin**
- `.ax-origin-center`, `.ax-origin-top`, `.ax-origin-bottom`, `.ax-origin-left`, `.ax-origin-right`

## 3. Component Presets
High level recipes bridging Core and Interactions into UI structures. Applied via `data-ax-component="button-magnetic"`.

**Buttons**
- `button-lift`, `button-ripple`, `button-magnetic`, `button-loading-fill`

**Cards**
- `card-lift`, `card-tilt`, `card-fade-up`

**Modals & Toasts**
- `modal-pop`, `modal-fade`, `toast-slide`

**Loaders & Skeletons**
- `loader-spinner`, `loader-dots`

**Feedback**
- `input-error-shake`, `input-success-glow`

> Use `console.log(AnimX.searchPresets('button'))` to see all available button presets dynamically.
