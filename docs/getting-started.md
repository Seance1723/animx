# Getting Started with AnimX

AnimX (v0.2.0) is a zero-dependency animation library. It includes both purely CSS-driven classes and a robust JavaScript API.

## Installation

Download the `dist/` folder and include it in your HTML:

```html
<link rel="stylesheet" href="path/to/dist/animx.min.css">
<script src="path/to/dist/animx.min.js"></script>
```

## Basic Usage (Data Attributes)

You can animate elements automatically on load just by adding data attributes. You don't even need to write JS.

```html
<div data-ax="fade-up">Fade up</div>

<div 
  data-ax="zoom-in"
  data-ax-duration="700"
  data-ax-delay="200"
  data-ax-ease="snappy">
  Zoom in with options
</div>
```

If you want to manually trigger a data-attribute animation later, use `data-ax-on="manual"`:

```html
<div data-ax="slide-left" data-ax-on="manual" data-ax-id="box">Manual</div>
<button onclick="AnimX.run('[data-ax-id=box]')">Run</button>
```

## Scroll Reveal

Animate elements as they scroll into view!

```html
<div data-ax="fade-up" data-ax-on="scroll">
  Fade up on scroll
</div>

<div 
  data-ax="zoom-in"
  data-ax-on="scroll"
  data-ax-threshold="0.3"
  data-ax-once="true">
  Zoom in when 30% visible
</div>
```

### Scroll Groups (Stagger)

```html
<section 
  data-ax-group
  data-ax-child="fade-up"
  data-ax-on="scroll"
  data-ax-stagger="120">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</section>
```

### JS Scroll API
```javascript
AnimX.scroll('.card', {
  animation: 'fade-up',
  threshold: 0.2,
  once: true
});

AnimX.refreshScroll(); // Rescan DOM
AnimX.unobserve('.card'); // Stop observing
```

## Timeline Sequencing

Sequence complex animations without nested callbacks!

```javascript
const tl = AnimX.timeline({
  defaults: { duration: 500, ease: 'smooth' }
});

tl.add('.hero-title', 'fade-up')
  .add('.hero-subtitle', 'fade-up', { delay: 100 })
  .add('.hero-button', 'zoom-in', { delay: 150 })
  .play();
```

### Same-Time Grouping

Use `"<"` to execute multiple steps at exactly the same time.

```javascript
AnimX.timeline()
  .add('.card-1', 'fade-up')
  .add('.card-2', 'fade-up', {}, '<')
  .add('.card-3', 'fade-up', {}, '<')
  .add('.cta', 'zoom-in') // Runs after ALL cards complete
  .play();
```

### Timeline Controls

The timeline instance returns powerful playback controls:
```javascript
tl.play();
tl.pause();
tl.resume();
tl.stop();
tl.restart();
tl.destroy();
```

*(Note: Reduced motion automatically collapses timeline durations to ensure content reveals instantly!)*

## Advanced Usage (JavaScript API)

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
