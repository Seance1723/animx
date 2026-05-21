# Getting Started with AnimX

AnimX (v0.2.0) is a zero-dependency animation library. It includes both purely CSS-driven classes and a robust JavaScript API.

## Installation

Download the `dist/` folder and include it in your HTML:

```html
<link rel="stylesheet" href="path/to/dist/animx.min.css">
<script src="path/to/dist/animx.min.js"></script>
```

## Basic Usage (CSS)

Add `.ax` and an animation class directly to your HTML:

```html
<div class="ax ax-fade-up ax-duration-slow">Hello World</div>
```

## Advanced Usage (JavaScript API)

AnimX exposes a global `window.AnimX` API.

```javascript
AnimX.init();

// 1. Trigger CSS Preset via JS
AnimX.animate('.my-box', 'fade-up', { duration: 600 });

// 2. Custom JS Animation (WAAPI)
const instance = AnimX.animate('.custom-box', {
  from: { opacity: 0, y: 40, scale: 0.9 },
  to: { opacity: 1, y: 0, scale: 1 }
}, {
  duration: 700,
  ease: 'smooth'
});

// 3. Playback Controls
instance.pause();
instance.play();
instance.reverse();
```

## Accessibility (Reduced Motion)

AnimX defaults to honoring the user's system preferences. If reduced motion is preferred, durations are neutralized automatically by default. Use `AnimX.config({ reducedMotion: 'always' })` to force it.

### Utilities

You can modify duration, delay, and repeats using utility classes:

```html
<div class="ax ax-slide-left ax-slow ax-delay-300 ax-infinite">Slide left slowly, after 300ms, forever</div>
```

### Accessibility

AnimX supports `prefers-reduced-motion` out of the box. Users who prefer reduced motion will automatically see instantaneous transitions without motion, preserving content visibility.

### Initialization

Initialize AnimX in your scripts to load the preset registry:

```javascript
AnimX.config({ debug: true });
AnimX.init();
```
