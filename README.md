# AnimX (v0.8.0)

A highly optimized, zero-dependency browser animation library.

## Features
- **Zero Dependencies**: Pure Vanilla JS & CSS. No GSAP, Anime, or jQuery.
- **Tiny Footprint**: Output is just one `.css` and one `.js` file.
- **Hardware Accelerated**: Uses native Web Animations API (WAAPI) and optimized CSS Transforms.
- **Timeline Engine**: Compose sequences intuitively with `<` positioning.
- **Stagger Engine**: Easily animate grids, lists, and node collections with center/edge/random layouts.
- **Text Engine**: Powerful, accessibility-safe text splitting, typewriters, counters, and scramblers.
- **Interaction Engine**: Hover, Press, Focus, Ripple, Magnetic, Tilt, and Feedback interactions.

## Basic Usage

### 1. Data Attributes (Declarative)
```html
<!-- Single Element -->
<div data-ax="fade-up" data-ax-duration="800">Hello World</div>

<!-- Interaction Reveal -->
<button data-ax-hover="ax-button-lift" data-ax-ripple>Hover & Ripple</button>
<button data-ax-magnetic data-ax-magnetic-strength="0.35">Magnetic</button>
<div data-ax-tilt data-ax-tilt-glare="true">Tilt Card</div>

<!-- Group Stagger -->
<section data-ax-group data-ax-child="fade-up" data-ax-stagger="100">
  <div>Item 1</div>
  <div>Item 2</div>
</section>

<!-- Text Split Reveal -->
<h1 data-ax-text="chars" data-ax="text-rise" data-ax-stagger="35">
  Beautiful Typography
</h1>
```

### 2. JavaScript API (Imperative)
```javascript
// Simple Animate
AnimX.animate(".card", "fade-up", {
  duration: 600,
  ease: "bouncy"
});

// Interactions
AnimX.hover(".card", "ax-card-lift");
AnimX.ripple(".button");
AnimX.tilt(".card", { max: 12, glare: true });
```

### 3. Quick Start
```html
<link rel="stylesheet" href="dist/animx.min.css">
<script src="dist/animx.min.js"></script>
```

## Usage

### 1. Data Attribute Engine (No JS needed!)
```html
<div data-ax="fade-up" data-ax-duration="600" data-ax-ease="smooth">Animated Box</div>
```

### 2. Scroll Reveal
```html
<div data-ax="fade-up" data-ax-on="scroll">
  Fade up on scroll
</div>
```

### 3. Timeline Engine
```javascript
const tl = AnimX.timeline();

tl.add(".title", "fade-up")
  .add(".subtitle", "fade-up")
  .add(".button", "zoom-in")
  .play();

// Advanced Custom Timeline
const tl2 = AnimX.timeline({ defaults: { duration: 700 } });
tl2.add(".box", {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0 }
}).play();
```

### 4. Custom JS Animation (WAAPI/RAF)
```javascript
window.AnimX.config({ debug: true });
window.AnimX.init();
```
