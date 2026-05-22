# Deployment Checklist

Before taking a site using AnimX live, run through this quick checklist to ensure maximum performance and stability.

## 1. Verify Build Output
Run the internal verification script to ensure your dist folder has compiled successfully.
```bash
npm run build
npm run verify:dist
```

## 2. Check File Usage
Ensure your production HTML files reference the minified files.
**Correct:**
```html
<link rel="stylesheet" href="animx.min.css">
<script src="animx.min.js"></script>
```
**Incorrect:**
```html
<script src="/src/js/animx.js"></script> <!-- Do not link directly to src -->
```

## 3. Do not include demo files
Do not accidentally bundle or link to `gallery.html`, `demo/`, or any playground CSS inside your production application.

## 4. Run Production Checks
Open your site in a staging environment and open the browser console. Run:
```javascript
AnimX.productionCheck();
```
Ensure `ok` is `true` and `warnings` is empty.

## 5. Test Reduced Motion
Verify that your operating system's "Reduce Motion" setting behaves correctly.
1. Turn on Reduce Motion in your OS (Mac: Accessibility -> Display -> Reduce Motion).
2. Reload your site.
3. Confirm that animations are either bypassed instantly or converted to simple cross-fades.
4. Run `AnimX.diagnose()` and confirm `reducedMotion: true`.

## 6. Optional: Load Adapters Safely
If using jQuery or Alpine, ensure their respective adapters are loaded **after** `animx.min.js`.
