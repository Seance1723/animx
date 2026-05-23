# Advanced Creative Text Effects (v3.20.0)

AnimX ships with a zero-dependency text splitting engine that gracefully bridges DOM manipulation with Screen Reader accessibility.

## Splitting Text

```javascript
AnimX.splitText(".headline", { split: "chars" });
```

When text is split, AnimX will assign the target's original `textContent` to the parent node as an `aria-label`, and flag every generated `<span>` as `aria-hidden="true"`. This guarantees that screen readers announce the full word cleanly, ignoring the fragmented DOM structure.
