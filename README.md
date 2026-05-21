# AnimX (v0.3.0)

A highly optimized, zero-dependency browser animation library.

## Features

- **Zero Dependencies**: No GSAP, Anime.js, Motion, or jQuery required.
- **One CSS, One JS**: Output is strictly limited to `animx.css` and `animx.js`.
- **CSS Presets**: 20+ hardware-accelerated CSS animation families.
- **JavaScript API**: Built-in Web Animations API (WAAPI) engine with RAF fallback.
- **Data Attributes**: Declarative HTML engine (`data-ax="fade-up"`).

## Quick Start

```html
<!-- Include in your project -->
<link rel="stylesheet" href="dist/animx.min.css">
<script src="dist/animx.min.js"></script>
```

## Usage

### 1. Data Attribute Engine (No JS needed!)
```html
<div data-ax="fade-up" data-ax-duration="600" data-ax-ease="smooth">Animated Box</div>
```

### 2. Manual Data Attributes
```html
<div data-ax="slide-left" data-ax-on="manual" data-ax-id="box">Manual</div>
<button onclick="AnimX.run('[data-ax-id=box]')">Run</button>
```

### 3. Custom JS Animation (WAAPI/RAF)
```javascript
window.AnimX.config({ debug: true });
window.AnimX.init();
```
