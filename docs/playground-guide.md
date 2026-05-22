# Playground Guide

AnimX v2.2.0 introduces an interactive **Playground** that functions as a lightweight visual builder without relying on any external UI frameworks or heavy React bundles.

## Accessing the Playground

Build the project with `npm run build`, then open:

`dist/animx.playground.html`

## Core Features

### 1. Left Sidebar (Controls)
This panel lets you tweak settings in real-time. Use the top tabs to switch contexts between Presets, Stagger, Text, and SVG.
- **Search:** Quickly find presets by typing their name.
- **Sliders:** Visually adjust Duration and Delay.
- **Easing:** Swap between Smooth, Snappy, Bounce, or Linear easily.

### 2. Center Canvas (Live Preview)
The canvas dynamically adapts to the current context.
- **Preset Mode:** Renders a single box to demonstrate basic reveals.
- **Stagger Mode:** Renders a grid to demonstrate ripple/origin effects.
- **Text Mode:** Renders a sentence to demonstrate splitting or scrambling.
- **SVG Mode:** Renders a vector path to demonstrate drawing.
- **Toolbar:** Hit "Replay Animation" to trigger it again, or use the **Reduced Motion Toggle** to verify a11y compliance.

### 3. Right Panel (Snippets)
As you adjust controls on the left, the panel on the right generates the exact HTML or JS needed to recreate that exact animation. See [Exporting Snippets](exporting-snippets.md) for details.

## Local State
The playground utilizes `localStorage` safely to remember your last configuration (like duration or selected mode), ensuring you don't lose your work if you refresh the page.
