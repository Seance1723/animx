# Motion Safety & Reduced Motion

AnimX v2.8.0 aggressively enforces OS-level `prefers-reduced-motion` preferences.

## How it works
If a user requests reduced motion, AnimX will clamp the `duration` of all Web Animations API (WAAPI) calls and CSS presets to `1ms`, and force the `delay` to `0ms`. 

**Why 1ms instead of skipping?**
Skipping an animation entirely often leaves an element stuck in its initial state (e.g., `opacity: 0`). By forcing a `1ms` duration, the animation "instantly" completes, firing all `onComplete` callbacks and safely reaching the final visual state.

## Configuration Options
You can override the system preference globally:

```javascript
// Respect OS (Default)
AnimX.setReducedMotion('system');

// Force animations to be instant for everyone
AnimX.setReducedMotion('always');

// Force animations to play regardless of OS settings (Not recommended)
AnimX.setReducedMotion('never');
```

## The motionSafe() API
If you have custom logic or heavy computations that should only run if motion is allowed, wrap them in `motionSafe`:

```javascript
AnimX.motionSafe(
  // Runs if motion is allowed
  () => {
    AnimX.animate('.hero', 'fade-up');
    initHeavyParallax();
  },
  // Runs if reduced motion is active
  () => {
    // Fallback logic, or just let AnimX handle the 1ms clamp automatically
    AnimX.animate('.hero', { from: { opacity: 0 }, to: { opacity: 1 }, duration: 1 });
  }
);
```
