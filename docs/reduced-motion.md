# Reduced Motion

AnimX has a highly integrated reduced motion engine. Vestibular disorders mean heavy motion can induce nausea. 

AnimX listens to `(prefers-reduced-motion: reduce)`. 

## Config Modes
You can configure behavior via `AnimX.config()`:
```javascript
AnimX.config({
  reducedMotion: 'system' // Default. Respects OS.
  // 'always' -> Forces reduced motion globally
  // 'never' -> Ignores OS preference. Not recommended.
});
```

## What Happens During Reduced Motion
- **CSS Transitions**: Scaled down to `1ms` instantaneous snaps via an `!important` global override.
- **Physics Interactions**: `tilt` and `magnetic` continuous `requestAnimationFrame` loops are outright aborted to save battery and prevent nausea.
- **Scroll Reveals**: Delay offsets are stripped. Content is revealed immediately on intersecting rather than sequentially staggering in.
- **Text Engines**: The Typewriter, Scramble, and Counter systems bypass their durations and instantly print the final text value immediately.

**AnimX never hides content on error or reduced motion.** If motion is disabled, elements instantly appear in their final rested `to` state.
