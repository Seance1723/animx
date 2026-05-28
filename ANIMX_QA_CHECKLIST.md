# AnimX QA Checklist (v3.42.0)

**Target Version:** 3.42.0

## 1. Build & Serve
- [ ] Run `npm run build` - verify it completes without errors.
- [ ] Run `npm test` - verify all test suites pass.
- [ ] Run `npm run dev` - verify dev server loads locally.
- [ ] Run `npm run preview` - verify production build preview loads.
- [ ] Verify `AnimX.version` returns `3.42.0`.
- [ ] Verify `AnimX.versionInfo()` returns the text reveal release metadata.
- [ ] Verify `AnimX.getRegistry()` and `AnimX.validateRegistry()` work.
- [ ] Verify `dist/animx.preset-data.json` exists and is valid JSON.
- [ ] Verify text reveal reports exist under `dist/reports`.

## 2. Automated Tools
- [ ] Ensure `npm run size-check` shows core is under 20KB minified.
- [ ] Run **AnimX Studio QA Runner** to evaluate accessibility rules.
- [ ] Run **Studio Runtime Validation** (v3.13.0) to ensure zero memory leaks.
- [ ] Verify **Real-World Patterns** export safe HTML (v3.14.0).
- [ ] Validate **Animation Composer** chains handle conflicts safely (v3.15.0).
- [ ] Verify **State Manager** MutationObservers are safely garbage collected on destroy (v3.16.0).
- [ ] Ensure **Scroll Story** loops sleep when offscreen to preserve battery (v3.17.0).
- [ ] Validate **Spatial 3D Tracking** shuts off when reduced-motion is detected (v3.18.0).
- [ ] Ensure **Physics RAFs** successfully terminate when `maxDuration` threshold is met (v3.19.0).
- [ ] Verify **Text Splitters** assign `aria-hidden` properly to child shards (v3.20.0).
- [ ] Verify **Media Slices** preserve original `<img>` tags and respect reduced motion (v3.21.0).
- [ ] Verify **Dropdowns and Menus** correctly toggle `aria-expanded` and clean up styles (v3.22.0).
- [ ] Verify **Table Staggers** keep `display: table-row` intact for accessibility (v3.23.0).
- [ ] Verify **Modals and Tooltips** detail their focus-trap caveats clearly in documentation (v3.24.0).
- [ ] Verify **Particle Lite Engine** strictly caps DOM injection at 50 nodes per container (v3.25.0).
- [ ] Verify **SVG Path Engine** safely computes length even if element is initially hidden (v3.26.0).
- [ ] Verify **Route Engine** strictly ignores external domains, target="_blank", and javascript URIs (v3.27.0).
- [ ] Verify **CMS Mutation Observer** debounces rapid AJAX injections and limits node scanning to prevent freezing (v3.28.0).

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

## 9. CMS / No-Code
- [ ] Verify `observeCMS()` captures newly injected content.
- [ ] Test editor-safe mode by injecting `wp-admin` into body class.

### 3.29.0 Verification (Local Packs)
- [x] Zero-dependency JSON parsing logic operates correctly.
- [x] XSS and Prototype Pollution payloads rejected.

### 3.30.0 Final Audit Verification
- [x] `AnimX.finalAudit()` validates all presets without crashing.
- [x] Playground and Studio include all 22 animation lab panels.
- [x] Build scripts successfully generate QA JSON outputs.

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

### 3.42.0 Text Reveal Pack Verification
- [x] `AnimX.version` returns `3.42.0`.
- [x] `AnimX.versionInfo()` returns text reveal release metadata.
- [x] `AnimX.getRegistry()` returns v3.42 text effect metadata.
- [x] `AnimX.validateRegistry()` returns `ok: true`.
- [x] Capability matrix report is generated.
- [x] Playground readiness report is generated.
- [x] Cross-check report is generated.
- [x] Text reveal pack reports are generated.
- [x] Package.json and package-lock versions are `3.42.0`.
- [x] README references `3.42.0`.
- [x] Release notes reference `3.42.0`.
- [x] All required dist files exist.
- [x] No `eval()` or `new Function()` in codebase.
- [x] No external runtime dependencies.
- [x] Sign-off reports generated as valid JSON.
