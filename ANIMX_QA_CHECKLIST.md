# AnimX QA Checklist (v3.13.0)

**Target Version:** 3.13.0

## 1. Build & Serve
- [ ] Run `npm run build` - verify it completes without errors.
- [ ] Run `npm test` - verify all test suites pass.
- [ ] Run `npm run dev` - verify dev server loads locally.
- [ ] Run `npm run preview` - verify production build preview loads.

## 2. Automated Tools
- [ ] Ensure `npm run size-check` shows core is under 20KB minified.
- [ ] Run **AnimX Studio QA Runner** to evaluate accessibility rules.
- [ ] Run **Studio Runtime Validation** (v3.13.0) to ensure zero memory leaks.
- [ ] Verify **Real-World Patterns** export safe HTML (v3.14.0).
- [ ] Validate **Animation Composer** chains handle conflicts safely (v3.15.0).
- [ ] Verify **State Manager** MutationObservers are safely garbage collected on destroy (v3.16.0).
- [ ] Ensure **Scroll Story** loops sleep when offscreen to preserve battery (v3.17.0).
- [ ] Validate **Spatial 3D Tracking** shuts off when reduced-motion is detected (v3.18.0).

## 3. Component Verifications
- [ ] Verify standard `data-ax` utility classes trigger automatically.
- [ ] Scroll down and verify entrance animations execute properly.
- [ ] Ensure missing targets don't cause console errors.

## 3. Data Attributes & Aliases
- [ ] Ensure `data-ax-preset`, `data-ax-trigger`, and `data-ax-scroll` map correctly.
- [ ] Ensure parsing of invalid duration/delay/ease falls back safely.

## 4. Scroll Engine
- [ ] Validate basic intersection observer triggers.
- [ ] Test Advanced Scroll (parallax, pin, reading progress).
- [ ] Validate scroll states don't keep content `opacity: 0` if JS crashes.

## 5. Timeline & Stagger
- [ ] Confirm timeline chaining resolves sequentially.
- [ ] Confirm stagger lists (e.g. `data-ax-items`) delay descendants correctly.

## 6. Text Animations
- [ ] Test split logic (chars, words, lines).
- [ ] Validate typewriter, scramble, and counter logic.
- [ ] Test window resize to ensure responsive splits revert cleanly.

## 7. Interactions & Components
- [ ] Test hover, press, focus, and ripple states.
- [ ] Test component presets (e.g. `button-ripple`, `card-lift`).

## 8. SVG System
- [ ] Verify stroke-dash drawing resolves cleanly without breaking viewBox.
- [ ] Test `data-ax-svg` drawing automatically on scroll.

## 9. CMS / No-Code Integrations
- [ ] Verify `observeCMS()` captures newly injected content.
- [ ] Test editor-safe mode by injecting `wp-admin` into body class.

## 10. Developer Experience
- [ ] Open console and run `AnimX.diagnose()`.
- [ ] Run `AnimX.validate()` and check for warnings.

## 11. Reduced Motion
- [ ] Enable system-level reduced motion (or `AnimX.config({ reducedMotion: 'always' })`).
- [ ] Verify heavy animations convert to instant states (0 delay, 1ms duration).
- [ ] Verify split text remains accessible.

## 12. Cleanup & Memory
- [ ] Verify `AnimX.destroy()` safely removes active observers and resets inline CSS.
- [ ] Confirm repetitive calls to `init()` or `refresh()` don't multiply bindings.
