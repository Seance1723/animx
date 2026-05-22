# Keyboard Support & Safety

AnimX provides several built-in mechanisms to ensure animations do not break keyboard navigation.

## Press & Focus Interactions
Whenever you apply an interaction preset like `press-scale` or `hover-lift`, AnimX automatically attempts to bind these to `:focus-visible` or programmatic focus events if the element is keyboard navigable (`button`, `a`, `input`, or `[tabindex]`).

## Drag & Gesture Limitations
AnimX provides powerful drag and gesture mechanics. **However, direct manipulation via drag/swipe is inherently inaccessible to keyboard-only users.**

If you build a feature that requires dragging (e.g., reordering a list, or swiping a card away):
1.  **You must provide a fallback.** For list reordering, provide explicit "Move Up" and "Move Down" buttons.
2.  **Use Live Regions.** You can use `AnimX.announce("Item moved to position 2")` when the user clicks the fallback buttons to inform screen reader users of the result.

## Focus Safety API
During complex animations where elements might be temporarily cloned, unmounted, or swapped, focus can easily be lost, forcing the user's focus back to the top of the `<body>`.

Use `AnimX.focusSafe()` to snapshot the current focus and restore it once the transition ends:

```javascript
const safeState = AnimX.focusSafe('.modal-container');

// ... run complex animation ...

safeState.restore();
```
