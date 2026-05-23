# Production Build Guide

AnimX v3.31.0 is optimized for both legacy environments and modern ESM bundlers.

## Basic Usage (Zero Dependency)
For standard browser environments, include the core minified files directly. These files contain everything you need to execute animations without polluting the global namespace unnecessarily.
```html
<link rel="stylesheet" href="node_modules/animx/dist/animx.min.css">
<script src="node_modules/animx/dist/animx.min.js"></script>
```

## Bundler Usage (ESM)
If you are using Vite, Webpack, or Rollup, AnimX maps exports properly to ESM endpoints.
```javascript
import AnimX from 'animx';
// Or if you want core only:
// import AnimX from 'animx/core';
import 'animx/css';

AnimX.init();
```

The bundler will automatically pick up `animx.esm.js` enabling tree-shaking where applicable.
