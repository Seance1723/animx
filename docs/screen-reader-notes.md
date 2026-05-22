# Screen Reader Compatibility

AnimX includes strict safeguards to prevent animations from degrading the screen reader experience.

## Text Splitting
Splitting text into individual `<span>` tags per character or word usually breaks screen reader output, causing them to read out individual letters instead of words.

AnimX's `AnimX.text()` API automatically:
1.  Copies the raw text content.
2.  Assigns `aria-label="Raw text"` to the parent container.
3.  Assigns `aria-hidden="true"` to every generated fragment (`ax-text-char`, `ax-text-word`).

## Announcements & Live Regions
For complex visual state changes (like a layout FLIP reorder), screen readers won't know anything happened unless explicitly told.

You can use the new announcement API:

```javascript
AnimX.announce('The list has been successfully reordered.', { politeness: 'polite' });
```

This dynamically creates a visually hidden `aria-live` region and updates its text content.

## SVG Accessibility
When morphing or drawing SVGs, AnimX guarantees that any existing `<title>` or `<desc>` tags inside the `<svg>` are **never** removed. If you are animating decorative SVGs, ensure you add `aria-hidden="true"` to the `<svg>` node manually.
