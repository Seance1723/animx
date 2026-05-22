# Accessibility Checklist

When implementing AnimX in a production environment, use this practical checklist to ensure maximum compatibility and compliance.

*   [ ] **Reduced Motion Tested**: Enable "Reduce Motion" at the OS level (e.g., Mac: Accessibility -> Display -> Reduce Motion). Refresh your site and verify that no heavy animations play, and most importantly, no content remains hidden.
*   [ ] **Keyboard Tested**: Tab through your site. Ensure no interactive elements require a hover state to be focused. 
*   [ ] **Screen Reader Labels Checked**: If you are using `AnimX.text()`, ensure the parent container properly receives `aria-label` with the original text.
*   [ ] **Focus Visible**: Verify that you have not applied global `outline: none;` without providing a visible focus indicator fallback.
*   [ ] **No Hover-Only Critical Action**: Ensure no critical information is only revealed via a hover-triggered animation.
*   [ ] **No Swipe-Only Critical Action**: Ensure any drag/swipe gestures (like dismissing a modal or reordering a list) also have keyboard-accessible fallbacks (e.g., "Close" or "Move Up/Down" buttons).
*   [ ] **Text Split Checked**: Run `AnimX.auditAccessibility()` to ensure all split text fragments properly receive `aria-hidden="true"`.
*   [ ] **SVG Title/Desc Checked**: Ensure animated SVGs have `<title>` or `<desc>` tags, or use `aria-hidden="true"` if they are purely decorative.
*   [ ] **Content Not Hidden If JS Fails**: If JavaScript is disabled or crashes, your site should not leave elements permanently invisible (`opacity: 0`).
*   [ ] **CMS Editor-Safe Checked**: If using AnimX inside a CMS builder (like WordPress), ensure `editorSafe` mode is active so content isn't hidden from editors.
