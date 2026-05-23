# Advanced Media Effects (v3.21.0)

AnimX ships with a zero-dependency suite for executing complex media interactions gracefully.

## Image Slicing and Shutter Effects
Using `AnimX.imageClip()`, you can safely cut `<img />` tags into animated shards.
Rather than converting images to background-images (which harms SEO), AnimX generates overlapping absolutely positioned slices wrapped within a `clip-path` boundary, hiding all slices from screen readers via `aria-hidden="true"`.

```javascript
AnimX.imageClip('.hero', { direction: 'vertical', slices: 4 });
```

## Before/After Sliders
A pure DOM-based Before/After slider with zero external JS drag-and-drop libraries. It utilizes `clip-path: inset()` for rendering the mask seamlessly and natively supports keyboard adjustments natively.

```javascript
AnimX.beforeAfter('.comparison', { reveal: 0.5 });
```
