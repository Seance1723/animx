# Text Accessibility and Reduced Motion

AnimX preserves readable text by storing original content before splitting and restoring it through `AnimX.revertText()`.

When text is split, generated visual fragments receive `aria-hidden` where the existing text accessibility option is enabled, and the source element receives an accessible label when needed.

Reduced motion behavior:
- Ready text effects use final-state fallback behavior.
- CSS reduced-motion rules remove animation, transform, filter, and clipping for readable final text.
- Unknown text effects do not add hiding classes.

Caveats:
- Splitting deeply nested rich text can affect inline layout during animation.
- Revert text before replacing large dynamic text blocks.
- Rolling, slot, typewriter, and scramble text effects are reserved for v3.43.0.
