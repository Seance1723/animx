# Animation Debugging Guide

Common debugging steps when AnimX effects fail:

## 1. Element Stuck at `opacity: 0`
**Cause**: The IntersectionObserver fired but the animation was overridden by a stronger CSS rule.
**Fix**: Check if `AnimX.validateRuntime().ok` is true. Ensure your target does not have `!important` opacity rules.

## 2. Text Split Thrashing
**Cause**: Applying `.ax-char` to giant paragraphs.
**Fix**: Use the Performance Audit. If `splitTextNodes > 500`, switch to word or line splitting instead.

## 3. Background Loops Drain Battery
**Cause**: Ambient infinite animations bypassing the system `prefers-reduced-motion` flag.
**Fix**: Verify your preset uses the `disabled-for-heavy-motion` metadata tag so AnimX pauses the loop for affected users.
