# Production Builds

AnimX v2.7.0 introduces multiple build targets to help you optimize your asset payload. Because AnimX is firmly committed to a zero-runtime-dependency architecture, we don't rely on tree-shaking the way a large React library might; instead, we provide pre-compiled modular bundles.

## Available Builds

### 1. Default (Full) Build
Includes all core features, the text engine, scroll observer, advanced scroll timelines, stagger, SVG morphing, layout flipping, gesture/drag physics, and CMS adapters.

**Files:**
*   `dist/animx.min.js`
*   `dist/animx.min.css`

**Use when:** You need the full power of AnimX and want to prototype rapidly without worrying about missing modules.

### 2. Core Build
A highly stripped-down version containing only the base engine, basic CSS presets (entrances/exits), and the WAAPI/RAF drivers. It omits all advanced modules (scroll, text, layout, SVG, CMS).

**Files:**
*   `dist/animx.core.min.js`
*   `dist/animx.core.min.css`

**Use when:** Your site only requires basic entrances, exits, and data-attribute-driven animations without advanced interactivity.

## Verifying Your Build

You can run diagnostics directly from the console to verify which build is currently running:

```javascript
console.table(AnimX.diagnose());
```

Look for the `build` property which will indicate `'full'` or `'core'`.

## Bundle Reporting
Every `npm run build` command generates a detailed JSON report at `dist/animx.bundle-report.json`. This lists exactly how large each generated file is in bytes and kilobytes to ensure no unexpected bloat sneaks into production.
