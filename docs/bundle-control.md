# Bundle Control & Preset Groups

AnimX's architecture revolves around a core WAAPI/CSS driver engine. To give you maximum control over your payload size, AnimX v2.7.0 separates functionality into distinct preset categories and internal modules.

## How AnimX keeps Core zero-dependency
We avoid wrapping elements in heavy JS abstractions. Animations resolve directly into native DOM Web Animations API (`Element.animate`) calls or highly optimized CSS transitions. Because we don't require external utility libraries or rendering engines, our baseline size remains strictly controlled.

## Preset Groups

Presets are categorized internally to make future modular imports easier. Current groups include:

*   **Core**: Base engine presets
*   **Entrance**: Fade, Slide, Zoom in
*   **Exit**: Fade, Slide, Zoom out
*   **Attention**: Pulse, Shake, Bounce
*   **Text**: Char, Word, Line stagger presets
*   **SVG**: Draw, Morph
*   **Component**: Accordions, Modals, Drawers
*   **Layout**: Reorder, FLIP
*   **Gesture**: Swipe, Drag

*Note: In the `core` build, only Entrance/Exit presets are registered.*

## Optional Adapter Files

If you need framework support, **do not** modify the core library. Use our optional, pre-compiled integration adapters (found in `dist/adapters/`). These are extremely lightweight wrappers that interface natively with AnimX.

## Current Limitations & Future Strategy
Currently, AnimX is compiled into two primary IIFE bundles for native browser usage (`full` and `core`). In future releases, we intend to provide fully tree-shakable ES Modules (`.mjs`) alongside granular preset pack exports for advanced bundlers like Vite and Webpack.
