# ES Module Usage

AnimX v2.6.0 fully supports ES Module imports for modern bundlers like Vite, Webpack, and Rollup.

## Usage

```javascript
import AnimX from 'animx';
import 'animx/dist/animx.css';

// AnimX is ready to use!
AnimX.animate('.box', 'fade-up');
```

## Treeshaking

Because AnimX is built as a highly integrated engine targeting zero-dependencies, the core engine isn't heavily treeshakable, but it is extremely small out of the box (~55kb gzipped).

You do not need to import individual modules (like text, svg, scroll)—they are all included in the primary `AnimX` default export.
