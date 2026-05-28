# v3.41 Existing Animation Audit

Current effect families found:
- CSS preset families from `src/js/presets/css-presets.js` and `src/js/presets/expanded-presets.js`
- Element presets from `src/js/presets/element-presets.js`
- Text modules in `src/js/text`
- Interaction modules in `src/js/interactions`
- Component modules in `src/js/components`
- Media modules in `src/js/media`
- SVG modules in `src/js/svg`
- Scroll modules in `src/js/scroll` and `src/js/scroll-story`
- Page transition modules in `src/js/transitions`
- Background modules in `src/js/backgrounds`
- Data UI modules in `src/js/data-ui`
- Layout modules in `src/js/layout`
- Gesture modules in `src/js/gestures`
- Physics/state/CMS utility modules in `src/js/physics`, `src/js/state`, and `src/js/cms`

Current public APIs found:
- Core: `AnimX.init`, `AnimX.animate`, `AnimX.run`, `AnimX.refresh`, `AnimX.destroy`
- Presets: `registerPreset`, `getPreset`, `getPresets`, `getPresetsByCategory`, `searchPresets`
- Registry v3.41: `getRegistry`, `getEffects`, `getEffectsByElement`, `getEffectsByFamily`, `getEffectsByStatus`, `searchEffects`, `getCapabilityMatrix`, `validateRegistry`
- Text: `text`, `splitText`, `rollText`, `scrambleText`, `marqueeText`, `counterText`
- Interactions: `interact`, `hover`, `press`, `focus`, `magnetic`, `ripple`, `tilt`
- Media/SVG/scroll/layout/gesture/background/data-ui/feedback/CMS APIs remain exposed through `src/js/animx.js`

Current data attributes found:
- Core: `data-ax`, `data-ax-preset`, `data-ax-on`, `data-ax-trigger`, `data-ax-duration`, `data-ax-delay`, `data-ax-repeat`, `data-ax-stagger`
- Text: `data-ax-text`, `data-ax-text-type`, `data-ax-text-effect`
- SVG: `data-ax-svg`, `data-ax-svg-morph`, `data-ax-morph-icon`
- Component/interaction/scroll/layout/gesture attributes from their parsers and scanners

Current preset sources found:
- `src/js/presets/css-presets.js`
- `src/js/presets/expanded-presets.js`
- `src/js/presets/element-presets.js`
- `src/js/components/component-presets.js`
- `src/js/layout/layout-presets.js`
- `src/js/gestures/gesture-presets.js`
- `src/js/cms/cms-recipes-v3-12.js`

Duplicate names found:
- Some basic CSS names are registered by both `css-presets.js` and `expanded-presets.js`. The existing Map registry keeps one canonical value per name. The v3.41 animation registry deduplicates by normalized effect id.

Missing references found:
- Several expanded preset names are metadata-first and did not have a verified CSS/JS mapping during this module. They are not marked `ready`.
- Existing advanced `get*Effects()` helpers in several modules return empty arrays. The v3.41 registry does not depend on them for readiness.

Effects that appear fake or metadata-only:
- Expanded generated presets without a verified CSS class or JS API are marked `needs-review`.
- Placeholder JS APIs that only log to the console are not used as ready registry effects.

Effects working and safe to mark ready:
- Verified conservative CSS preset effects listed in `READY_CSS_EFFECT_IDS`.
- Verified JS API effects listed in `READY_JS_EFFECTS`.
- All ready effects include usage metadata, reduced-motion final-state behavior, and playground preview metadata.
