<div align="center">
  <h1>AnimX</h1>
  <p><strong>v1.7.0</strong> — Zero-dependency, high-performance browser animation engine.</p>
  
  ![AnimX Size](https://img.shields.io/badge/size-9kb_gzipped-brightgreen)
  ![Zero Dependencies](https://img.shields.io/badge/dependencies-0-blue)
  ![Waapi Powered](https://img.shields.io/badge/engine-WAAPI-orange)
</div>

AnimX is a comprehensive animation library built directly on top of the native Web Animations API (WAAPI). It provides the power of GSAP or Framer Motion without the massive bundle size or external dependencies.

## Key Features
- **Zero Dependencies**: 100% native WAAPI and Vanilla JS.
- **Micro-Bundle**: ~9kb gzipped.
- **Scroll Engine**: Built-in IntersectionObserver for scroll-triggered animations.
- **Timeline & Stagger**: Robust sequential and batch animations.
- **Text & SVG Packs**: Advanced character/word splitting and SVG path drawing.
- **No-Code & CMS Friendly**: Complete data-attribute mapping, recipes, and MutationObservers for WordPress/Webflow.
- **Accessibility First**: Built-in `prefers-reduced-motion` detection.
- **Developer Experience Utilities:** Built-in validation, diagnostics, and environment inspection (`AnimX.validate()`, `AnimX.diagnose()`).

## ✨ What's New in v1.6.0 (Developer Experience Upgrade)
- **AnimX now includes DX helpers** natively with no external dependency.
- **Debug & Inspect**: `AnimX.debug(true)` enables `AX_*` code warnings. `AnimX.inspect('.card')` returns real-time instance state.
- **Validate & Diagnose**: `AnimX.validate()` scans the DOM for invalid presets or typos. `AnimX.diagnose()` analyzes browser capability and CSS loading status.
- **Examples**: `AnimX.getExamples('fade-up')` and `AnimX.copyExample()` output instant copy-pasteable usage examples.
- **Smart Suggestions**: In debug mode, missing presets (e.g., `fadeup`) will automatically suggest `fade-up`.
- **Ticker/Marquee**: Zero-dependency seamless scroll text.
- **Gradient Text**: Advanced `background-clip` gradients with motion.
- **Advanced Counters**: Animated numbers synced with `Intl.NumberFormat`.
- **Accessibility Guaranteed**: Reduced motion halts loops automatically.
- **Text Animation**: Accessible character, word, and line splitting.
- **Interaction Engine**: Magnetic, Tilt, Hover, Press, Focus, Ripple, and UI feedback without Physics loops draining battery.
- **Component Presets**: 100+ native recipes for Cards, Buttons, Modals, Loaders, and Forms.
- **Accessibility First**: Deeply integrates with `prefers-reduced-motion` and manages ARIA attributes automatically for text splits.

## Features
- **Zero Dependencies**: No GSAP, ScrollTrigger, Anime.js, Motion, or jQuery.
- **Advanced Scroll System**: Scroll progress, parallax, sticky pins, and scroll scenes powered by a single shared RAF ticker.
- **Hardware Accelerated**: Prioritizes `transform` and `opacity` via the Web Animations API (WAAPI) and CSS Keyframes.
- **Declarative & Imperative**: Use `data-ax` attributes in HTML or `AnimX.animate()` in JS.
- **Scroll Reveal**: Native `IntersectionObserver` integration for seamless scroll-triggered animations.
- **Timelines & Stagger**: Sequence complex animations with ease.

## Quick Start

Include the minified files in your HTML:

```html
<link rel="stylesheet" href="dist/animx.min.css">
<script src="dist/animx.min.js"></script>
```

## Run Locally

```bash
npm install
npm run dev
```
Open: `http://localhost:5173`

For preview:
```bash
npm run build
npm run preview
```
Open: `http://localhost:4173`

### Declarative Usage

No Javascript required. Just add data attributes to your elements:

```html
<!-- Animate on load -->
<div data-ax="fade-up" data-ax-duration="800">Hello World</div>

<!-- Animate on scroll -->
<div data-ax="slide-left" data-ax-on="scroll">I appear when scrolled</div>

<!-- Interactive component -->
<button data-ax-component="button-ripple">Click Me</button>
```

### Imperative Usage

```javascript
// Basic animation
AnimX.animate('.box', 'bounce');

// Custom keyframes
AnimX.animate('.box', 
  { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0 } }, 
  { duration: 600, ease: 'smooth' }
);

// Stagger a list of items
AnimX.stagger('.list-item', 'zoom-in', { stagger: { each: 50 } });

// Timeline sequence
AnimX.timeline()
  .add('.header', 'fade-down')
  .add('.content', 'fade-up', { duration: 500 })
  .play();
```

## Documentation & Resources
- **[Getting Started](docs/getting-started.md)** - Installation, config, and basic usage.
- **[API Reference](docs/api-reference.md)** - Exhaustive list of all methods and parameters.
- **[Preset List](docs/preset-list.md)** - Catalog of all included CSS and Component animations.
- **[Debugging Guide](docs/debugging.md)** - Developer experience and validation tools.

## Developer Experience APIs

AnimX provides lightweight, zero-dependency tools built right into the core library to speed up development.

```javascript
// 1. Enable structured debug warnings
AnimX.debug(true);

// 2. Scan the current page for missing presets, typos, and unused attributes
const validation = AnimX.validate();

// 3. Inspect the environment state (e.g. WAAPI support, reduced motion, loaded CSS)
const environment = AnimX.diagnose();

// 4. Generate instant copy-pasteable examples for any preset
AnimX.copyExample('fade-up-soft', 'js'); // Copies `AnimX.animate('.box', 'fade-up-soft');`

// 5. Suggest closest matches for a typo
AnimX.suggestPreset('btn-lift'); // Returns matching full objects like `button-lift`
```

## Documentation

For full API references, available presets, and advanced configuration, see the `docs/` folder:

- [API Reference](docs/api-reference.md)
- [Preset List](docs/preset-list.md)
- [Data Attributes](docs/data-attributes.md)
- [Accessibility](docs/accessibility.md)
- [Reduced Motion](docs/reduced-motion.md)
- [Performance](docs/performance.md)
- [Release Notes](docs/release-notes.md)

## Current Limitations
- **No Advanced FLIP Layouts**: Not designed for complex flex/grid layout transitions yet.
- **No Drag/Gesture Physics**: Does not include touch-drag or throwing physics.
- **No Pinned Scroll Scenes**: Scroll reveals work flawlessly, but pinned/scrubbed scroll timelines are not supported.

## License
MIT
