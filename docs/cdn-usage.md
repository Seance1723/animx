# CDN & Local Usage

AnimX is distributed as a single CSS file and a single JS file. 

## 1. Using a CDN (Recommended)
You can link directly to the unpkg or jsdelivr CDNs for fast, cached global delivery.

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/animx@2.0.0/dist/animx.min.css">

<!-- JS -->
<script src="https://unpkg.com/animx@2.0.0/dist/animx.min.js"></script>
```
*Note: Always specify the version `@2.0.0` in production to prevent unexpected upgrades.*

## 2. Local Hosting
If you prefer to bundle or host it yourself, copy the files from the `dist/` directory after running `npm run build`.

```html
<link rel="stylesheet" href="/assets/css/animx.min.css">
<script src="/assets/js/animx.min.js"></script>
```

## 3. ES Modules
AnimX is fully compatible with ES module imports in modern build tools (Vite, Webpack, Rollup).

```js
import AnimX from 'animx';
import 'animx/dist/animx.min.css';

AnimX.init();
```
