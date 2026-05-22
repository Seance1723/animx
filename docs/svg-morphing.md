# SVG Morphing

AnimX v2.5.0 introduces **Advanced SVG Morphing**. This allows you to seamlessly animate one vector shape into another using native browser interpolation.

## How It Works
AnimX reads the SVG path `d` strings, normalizes their commands, and uses a `requestAnimationFrame` loop to interpolate the numbers between them at 60fps.

Because AnimX is entirely zero-dependency, it enforces **compatible paths**. 
If you try to morph paths with completely different numbers of commands (e.g., a simple square into a highly complex text vector), AnimX will safely fallback to a cross-fade or instant jump rather than corrupting your graphic or crashing.

## Basic Morphing

```javascript
AnimX.svgMorph("#my-path", {
  to: "M50 10 C80 10 90 40 90 50 C90 80 60 90 50 90 C20 90 10 60 10 50 C10 20 40 10 50 10 Z",
  duration: 700,
  ease: "smooth"
});
```

You can also morph one DOM element to another:

```javascript
AnimX.morphShape("#rect-path", "#circle-path");
```

## Icon Morphs
We've built-in extremely lightweight, compatible paths for standard UI transitions:

```javascript
AnimX.morphIcon("#menu-btn", {
  icon: "menu-close", // Morphs hamburger to X
  duration: 400
});
```

Available icons: `menu-close`, `plus-minus`, `play-pause`.

## Data Attributes

You can set up morphs entirely in HTML:

```html
<path 
  data-ax-svg-morph
  data-ax-morph-to="M50 10 L90 50 L50 90 L10 50 Z"
  data-ax-on="hover"
  d="M10 10 L90 10 L90 90 L10 90 Z">
</path>
```

## Reduced Motion
If a user's operating system has `prefers-reduced-motion` enabled, AnimX disables the morph interpolation loop entirely. The path will simply "jump" to its final state instantly.
