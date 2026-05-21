# AnimX (v0.9.0)

A highly optimized, zero-dependency browser animation library.

## Features
- **Zero Dependencies**: Pure Vanilla JS & CSS. No GSAP, Anime, or jQuery.
- **Tiny Footprint**: Output is just one `.css` and one `.js` file.
- **Hardware Accelerated**: Uses native Web Animations API (WAAPI) and optimized CSS Transforms.
- **Timeline Engine**: Compose sequences intuitively with `<` positioning.
- **Stagger Engine**: Easily animate grids, lists, and node collections with center/edge/random layouts.
- **Text Engine**: Powerful, accessibility-safe text splitting, typewriters, counters, and scramblers.
- **Interaction Engine**: Hover, Press, Focus, Ripple, Magnetic, Tilt, and Feedback interactions.
- **Component Presets**: Over 100+ ready-to-use animation UI recipes for buttons, cards, modals, loaders, and more.

## Basic Usage

### 1. Data Attributes (Declarative)
```html
<!-- Core Animation -->
<div data-ax="fade-up" data-ax-duration="800">Hello World</div>

<!-- Component Presets -->
<button data-ax-component="button-ripple">Ripple Button</button>
<div data-ax-component="card-lift">Card</div>
<div data-ax-component="card-fade-up" data-ax-on="scroll">Scroll Card</div>
```

### 2. JavaScript API (Imperative)
```javascript
// Simple Animate
AnimX.animate(".card", "fade-up");

// Components
AnimX.component(".card", "card-lift");
AnimX.component(".button", "button-ripple");
AnimX.component(".input", "input-error-shake");
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
