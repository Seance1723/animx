# Preset Gallery Guide

AnimX v2.1.0 introduces a robust local Preset Gallery that allows you to easily browse, search, and preview over 300 animation presets.

## Accessing the Gallery

After building the project locally with `npm run build`, open:

`dist/animx.gallery.html`

## Searching & Filtering

1. **Search Input**: Start typing a preset name, keyword, or tag (e.g., `fade`, `bounce`, `text`). The gallery updates instantly.
2. **Category Filters**: Use the pill buttons below the search bar to filter by categories like Entrance, Exit, Attention, Scroll, Text, and SVG.
3. **Empty States**: If a search yields no results, AnimX uses its built-in `AnimX.suggestPreset()` engine to suggest similarly named presets.

## Previewing Animations

Each preset card features a dedicated preview area.
- Click the **Replay** button to re-trigger the animation instantly.
- The preview engine intelligently adapts: text animations will show text splitting, SVG animations will render a sample SVG circle, and CSS presets will attach standard class toggles.

## Copy-Paste Workflow

Every preset card provides quick-copy buttons:
1. **Copy Class**: Best for pure CSS animations (e.g., `<div class="ax-fade-up">`).
2. **Copy Data**: Best for auto-observed scroll reveals (e.g., `<div data-ax="fade-up">`).
3. **Copy JS**: Best for programmatic execution (e.g., `AnimX.animate('.target', 'fade-up')`).

## Reduced Motion Simulation

A handy toggle at the top of the gallery allows you to simulate `prefers-reduced-motion` without changing your OS settings. When enabled, animations gracefully fallback to their final states instantly, demonstrating exactly how users with motion sensitivities will experience your site.
