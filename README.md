<h1 align="center">AnimX</h1>
<p align="center"><strong>v1.3.0</strong> • Zero-Dependency Browser Animation Library</p>

<p align="center">
  AnimX provides a powerful, modular, and extremely lightweight animation engine designed for modern web apps. It features robust CSS hardware acceleration, complex timelines, staggers, intelligent data attributes, component presets, an advanced scroll engine, and the <strong>Advanced Text Pack</strong>, all with zero external dependencies.
</p>

## ✨ What's New in v1.3.0 (Advanced Text Pack)
- **Responsive Text Re-Splitting**: Text safely re-splits dynamically on resize and font load.
- **Wave & Line Effects**: Premium `ax-text-line-inner` wrapping and character wave keyframes.
- **Scramble Decode**: Hacker/numeric/glitch text decoders.
- **Text Swap**: Animate through an array of strings natively.
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
