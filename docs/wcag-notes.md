# WCAG Compliance Notes

AnimX is heavily designed to be **WCAG-aware** and **accessibility-friendly**, but it is **not a certification tool**, nor does it guarantee legal compliance for your website. 

Compliance depends heavily on how you implement the animations.

## Relevant WCAG Areas

AnimX provides features to help you comply with the following WCAG guidelines:

### 1. Motion and Animation (WCAG 2.3.3 Animation from Interactions)
AnimX natively hooks into `prefers-reduced-motion` and forcefully clamps all WAAPI drivers and CSS presets to `1ms` duration. This ensures animations are bypassed for sensitive users without leaving elements permanently hidden.

### 2. Focus Order (WCAG 2.4.3 Focus Order)
AnimX provides the `AnimX.focusSafe()` API to explicitly preserve and restore focus during complex DOM swaps, layout FLIPs, or component transitions.

### 3. Keyboard Access (WCAG 2.1.1 Keyboard)
AnimX interactions (`hover`, `press`) are designed to be triggered via keyboard focus states when properly configured on interactive elements (`<a>`, `<button>`, `[tabindex]`).

### 4. Readable Text (WCAG 1.4.12 Text Spacing)
AnimX's Text Splitting API preserves the original text node inside an `aria-label` while hiding the animated fragments via `aria-hidden="true"` to ensure screen readers do not stutter or spell out animated words character-by-character.

### 5. Status Messages (WCAG 4.1.3 Status Messages)
AnimX includes a native `AnimX.createLiveRegion()` and `AnimX.announce()` helper to allow you to easily notify assistive technologies when a complex animation (like a layout reorder) finishes.

> **Disclaimer:** You, the website owner, must perform manual QA and testing on the final implementation to ensure WCAG compliance.
