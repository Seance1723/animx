# AnimX WordPress Helper

When using AnimX in WordPress, a common issue is animations breaking the Gutenberg Block Editor or page builders like Elementor. The WordPress adapter provides a safe initialization wrapper.

## Installation

```html
<script src="dist/animx.min.js"></script>
<script src="dist/adapters/animx.wordpress.min.js"></script>
```

## What it does

The adapter automatically runs `AnimX.cms()` on DOM ready, but **only if it detects it is on the frontend**.

If it detects `wp-admin`, `block-editor-page`, or `elementor-editor-active`, it safely bypasses scroll triggers so editors can interact with the DOM without elements disappearing before they scroll.

## Manual API

```javascript
// Initialize (auto-run by default)
AnimX.wp.init();

// Re-run after an AJAX load
AnimX.wp.refresh();

// Observe dynamic changes
AnimX.wp.observe();
```
