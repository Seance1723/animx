# AnimX Demo Audit

| Section | Element / Selector | Expected Animation | Trigger | Current Status | Fix Applied |
|---|---|---|---|---|---|
| Header | `header[data-ax-component="hero-fade-sequence"]` | hero-fade-sequence | load | Missing SCSS Class | No |
| Header | `h1[data-ax-component="hero-split-text"]` | hero-split-text | load | Missing SCSS Class | No |
| Core CSS | `.box.ax-fade-up` | fade-up | css | Working | No |
| Core CSS | `.box.ax-slide-left` | slide-left | css | Working | No |
| Core CSS | `.box.ax-zoom-in` | zoom-in | css | Working | No |
| Core CSS | `.box.ax-blur-up` | blur-up | css | Missing SCSS/Preset | No |
| Core CSS | `.box.ax-bounce` | bounce | css | Working | No |
| Core CSS | `.box.ax-glow-pulse` | glow-pulse | css | Missing SCSS/Preset | No |
| JS API | `.js-preset-box` | bounce | button click | Working | No |
| JS API | `.js-custom-box` | custom WAAPI | button click | Working | No |
| Data Attr | `[data-ax="fade-right"]` | fade-right | load | Working | No |
| Data Attr | `[data-ax="zoom-in"][data-ax-on="manual"]` | zoom-in | manual | Working | No |
| Data Attr | `[data-ax="slide-up"][data-ax-disabled]` | disabled | none | Working | No |
| Scroll | `[data-ax="fade-up"][data-ax-on="scroll"]` | fade-up | scroll | Working | No |
| Scroll | `[data-ax="zoom-in"][data-ax-on="scroll"]` | zoom-in | scroll | Working | No |
| Scroll Group | `[data-ax-group]` | slide-up | scroll | Working | No |
| Timeline | `.tl-box-*` | fade-up, zoom-in, WAAPI | button click | Working | No |
| Stagger | `.stag-box` | zoom-in, fade-up | buttons click | Working | No |
| Text | `.txt-chars` | text-rise | button click | Missing SCSS/Preset | No |
| Text | `.txt-words` | fade-up | button click | Working | No |
| Text | `.txt-lines` | text-slide-up | button click | Missing SCSS/Preset | No |
| Text | `.txt-type` | typewriter | button click | Working | No |
| Text | `.txt-scramble` | scramble | button click | Working | No |
| Text | `.txt-counter` | counter | button click | Working | No |
| Interactions | `[data-ax-hover="ax-card-lift"]` | card-lift | hover | Mismatched Demo Attr, Missing SCSS | No |
| Interactions | `[data-ax-press="ax-button-press"]` | button-press | press | Mismatched Demo Attr, Missing SCSS | No |
| Interactions | `[data-ax-ripple]` | ripple | click | Working | No |
| Interactions | `[data-ax-magnetic]` | magnetic | hover | Working | No |
| Interactions | `[data-ax-tilt]` | tilt | hover | Working | No |
| Interactions | `[data-ax-focus="ax-input-focus-glow"]` | input-focus-glow | focus | Mismatched Demo Attr, Missing SCSS | No |
| Interactions | `AnimX.feedback(this, 'error')` | error | button click | Working (wait, is error-shake missing?) | No |
| Components | `[data-ax-component="button-lift"]` | button-lift | hover | Missing SCSS Class | No |
| Components | `[data-ax-component="button-magnetic"]` | button-magnetic | magnetic | Missing SCSS Class | No |
| Components | `[data-ax-component="button-loading-fill"]` | button-loading-fill | load | Missing SCSS Class | No |
| Components | `[data-ax-component="card-tilt"]` | card-tilt | tilt | Missing SCSS Class | No |
| Components | `[data-ax-component="card-lift"]` | card-lift | hover | Missing SCSS Class | No |
| Components | `[data-ax-component="skeleton-shimmer"]` | skeleton-shimmer | load | Missing SCSS Class | No |
| Components | `[data-ax-component="loader-spinner"]` | loader-spinner | load | Missing SCSS Class | No |
