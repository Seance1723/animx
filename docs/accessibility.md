# Accessibility

AnimX v1.0.0 treats accessibility as a first-class citizen, ensuring that motion enhances user experience without degrading basic web usability.

## Focus Visibility
AnimX does not strip default focus outlines. Interaction presets like `input-focus-glow` only layer graphical hints (box-shadows or borders) alongside the browser's native outline rendering.

## Text Splitting
When using `AnimX.splitText()` or `AnimX.text({ split: 'chars' })`:
1. The engine wraps the generated spans inside an `aria-hidden="true"` block so screen readers do not read the word one character at a time.
2. The parent element is assigned an `aria-label` containing the clean, original text.
3. Upon calling `AnimX.revertText()`, the original innerHTML is restored, and the generated `aria-label` is cleaned up.

## Keyboard Interaction
Buttons, Modals, and interactive components enhanced with `AnimX.component()` do not trap keyboard focus unless you explicitly code a trap in your logic. AnimX does not replace HTML native elements (e.g. `<button>`, `<a>`); it merely animates them.

## Reduced Motion
See [Reduced Motion](./reduced-motion.md) for details on how AnimX intercepts OS-level accessibility preferences to disable vestibular disturbances.
