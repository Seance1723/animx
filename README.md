<div align="center">
  <h3>The Zero-Dependency UI Animation Engine (v3.4.0)</h3>
  <p>Production-ready, accessible, and fast.</p>
</div>

---

## ⚡ What's New in v3.4.0

- **Project Packaging**: Export and import complete animation projects as standard JSON. Share and load your setups seamlessly without any cloud accounts or backends.
- **Theme Kits & Motion Tokens**: Apply reusable Theme Kits (e.g., `premium-soft`) to instantly update motion tokens (easing, duration, stagger) globally across your project.

## ✨ Features
- **v3.36.0**: Cross-Browser Compatibility, Fallback System, and Legacy Safety.
- **v3.27.0**: Advanced Page Transitions, Section Transitions, and Route Motion Packs.
- **v3.26.0**: Advanced SVG, Icon, Logo, Path, and Infographic Motion Packs.
- **v3.25.0**: Advanced Background, Decorative Motion, Ambient Effects, and Visual Atmosphere Packs.
- **v3.24.0**: Advanced Form, Modal, Drawer, Toast, Tooltip, and UI Feedback Motion.
- **v3.7.0**: Studio Handoff Documentation and Client Delivery Kits.
- **v3.6.0**: Advanced Creative Animation Catalog.
- **v2.9.0**: Security and Defensive Runtime Hardening
- **v2.8.0**: Accessibility and Compliance Hardening
- **v2.7.0**: Production Optimization and Bundle Control

AnimX is a production-ready, zero-dependency browser animation library built directly on top of the native **Web Animations API (WAAPI)**. It provides a massive suite of over 300 highly tuned, GPU-accelerated presets, combined with powerful Scroll, Timeline, Layout, Text, SVG, and Interaction engines. 

AnimX achieves GSAP-like declarative power with absolute minimal footprint: exactly one CSS file and one JS file. 

## Security and Defensive Runtime
AnimX v2.9.0 introduces a robust defensive runtime.
- **Zero eval() or new Function()**: AnimX is entirely CSP friendly.
- **Prototype Pollution Guards**: Deep merging is securely constrained.
- **Safe HTML String Management**: Unsafe `<script>` and inline handlers are sanitized or blocked by default.
- **Selector Crash Prevention**: Broken CSS selectors will fail gracefully instead of breaking execution.
Check `AnimX.securityAudit()` or the docs for full details.

## Local Playground & Builder
AnimX v2.2.0 includes a fully interactive local Playground and Builder!
After building the project, simply open:
- \`dist/animx.docs.html\` (Documentation Landing Page)

## 1. What AnimX Is
AnimX bridges the gap between simple CSS animations and heavy JavaScript animation frameworks. It exposes a clean, intuitive API for creating complex timelines, scroll-linked animations, and staggered sequences while relying entirely on native browser features.

## 2. Why AnimX Exists
Modern browsers have incredibly powerful native animation engines (WAAPI, IntersectionObserver, ResizeObserver). Yet, developers still load hundreds of kilobytes of external libraries to achieve basic scroll reveals or timelines. AnimX exists to unlock the full power of modern browsers without the bloat.

## 3. The Zero-Dependency Rule
AnimX has exactly **zero** runtime dependencies. No jQuery, no Lodash, no GSAP, no Anime.js. It runs purely on vanilla JavaScript and CSS.

## 4. Final Output Files
AnimX is distributed as two minified files:
- `dist/animx.min.css` (Base CSS utility definitions and Reduced Motion fallbacks)
- `dist/animx.min.js` (The core JS engine)

## 5. Quick Start
Link the files from a CDN or your local directory:
```html
<link rel="stylesheet" href="https://unpkg.com/animx@2.0.0/dist/animx.min.css">
<script src="https://unpkg.com/animx@2.0.0/dist/animx.min.js"></script>

<!-- Animate via Data Attributes instantly -->
<div data-ax="fade-up" data-ax-duration="1000">I fade up!</div>
```

## 6. CSS Class Usage
If you prefer pure CSS (no JS intersection observing required), apply the classes directly:
```html
<div class="ax-fade-up">Fades up on load</div>
```

## 7. Data Attribute Usage
AnimX will automatically parse data attributes on any element containing `data-ax` or `data-ax-scroll`.
- `data-ax="preset-name"`
- `data-ax-duration="1000"`
- `data-ax-delay="200"`
- `data-ax-ease="ease-out"`

## 8. JavaScript API Usage
Trigger animations programmatically:
```js
AnimX.animate('.box', 'zoom-in', { duration: 500, delay: 100 });
```

## 9. Scroll Usage
Automatically trigger animations when elements enter the viewport:
```html
<div data-ax-scroll="fade-up" data-ax-threshold="0.5">Reveals at 50% visibility</div>
```

## 10. Timeline Usage
Chain animations sequentially:
```js
const tl = AnimX.timeline();
tl.add('.box1', 'fade-right')
  .add('.box2', 'zoom-in', {}, '-=200') // Overlap by 200ms
  .play();
```

## 11. Stagger Usage
Animate multiple items intelligently:
```js
AnimX.stagger('.grid-items', 'fade-up', { stagger: 50, direction: 'center' });
```

## 12. Text Usage
Split and animate text accessibly:
```js
AnimX.text('.title', { type: 'split', splitType: 'words', animation: 'fade-up' });
AnimX.ticker('.scrolling-news');
AnimX.counter('.stats', { to: 1000 });
```

## 13. Interaction Usage
Add physics-based interactions:
```js
AnimX.hover('.btn', 'ax-button-lift');
AnimX.magnetic('.magnetic-target');
```

## 14. Component Usage
Use predefined complex UI behaviors:
```js
AnimX.component('.loader', 'loader-spin');
AnimX.component('.skeleton', 'skeleton-shimmer');
```

## 15. SVG Usage
Draw strokes, dash arrays, and paths:
```js
AnimX.svgDraw('circle');
AnimX.svgPathFollow('path');
```

## 16. CMS / No-Code Usage
AnimX is fully compatible with WordPress, Webflow, and generic static sites via data attributes. Use `AnimX.observeCMS()` to dynamically watch for new DOM injections (e.g. AJAX pagination).

## 17. Debug & Diagnostics
To ensure everything is working:
```js
console.log(AnimX.diagnose());
console.log(AnimX.validate()); // Checks for missing targets or typos
```

## 18. Preset Search Usage
Not sure what a preset is called?
```js
console.log(AnimX.searchPresets('fade'));
```

## 19. Reduced Motion Support
AnimX deeply respects the user's OS-level accessibility preferences. If `prefers-reduced-motion: reduce` is detected, AnimX strips out transforms, delays, and heavy motion, resolving elements to their final visual state instantly. 

## 20. Accessibility Notes
AnimX prioritizes A11Y. Our Text Engine preserves `aria-label` screen reader legibility. Our Scroll Engine guarantees no element remains permanently `opacity: 0` if JS fails or reduced motion is active.

## 21. Performance Notes
Built using the Web Animations API (WAAPI), AnimX offloads animation rendering to the compositor thread (GPU) where possible, ensuring smooth 60fps animations without Main Thread jank.

## 22. Browser Support Note
AnimX supports all modern browsers (Chrome, Firefox, Safari, Edge). Older browsers (IE11) lacking full WAAPI support will either gracefully ignore the animations or instantly fallback to final states.

## 23. Current Limitations
- No advanced SVG Morphing (yet).
- No advanced FLIP/Layout transitions (planned).
- No visual GUI editor.

## 24. How to Build Locally
```bash
npm install
npm run build
npm run dev
npm run preview
```

## 25. How to Run Demo
```bash
npm run dev
```

## 26. How to Test
AnimX features a fully headless, zero-dependency Node.js test runner.
```bash
npm test
```

## 27. Release Status
**v2.0.0 (Hero Release)** is actively stable and recommended for production use.
