# API Reference

`AnimX` exposes a comprehensive JavaScript API available globally on `window.AnimX`. 

## Core Setup
- **`AnimX.version`**: Returns current version (`"1.0.0"`).
- **`AnimX.config(options)`**: Deep merges configuration options. 
- **`AnimX.init()`**: Automatically scans the DOM for `data-ax` attributes and sets up scroll observers.
- **`AnimX.destroy()`**: Globally destroys all running animations, scroll observers, and interaction listeners.

## Animation
- **`AnimX.animate(targets, presetOrKeyframes, options)`**: Animates elements using a preset name (e.g., `'fade-up'`) or custom WAAPI keyframes `{ from: {}, to: {} }`. Returns an `AnimationInstance`.
- **`AnimX.timeline()`**: Creates a new sequencing timeline instance. Chain `.add(targets, animation, options)` and call `.play()`.
- **`AnimX.stagger(targets, animation, options)`**: Animates a list of elements sequentially or radially. Supports `each`, `from: 'start' | 'center' | 'random'`, and `axis: 'both'`.

## Text
- **`AnimX.text(targets, options)`**: Entry point for text effects. Types: `split`, `typewriter`, `scramble`, `counter`.
- **`AnimX.splitText(targets, options)`**: Splits text manually into characters, words, and lines.
- **`AnimX.revertText(targets)`**: Restores original text HTML structure and cleans up split accessibility attributes.

## Scroll
- **`AnimX.scroll(targets, options)`**: Manually registers elements to trigger when they enter the viewport.
- **`AnimX.refreshScroll()`**: Forces IntersectionObserver to rescan elements.

## Interactions & Components
- **`AnimX.interact(targets, options)`**: Attaches mouse/pointer-driven physics (hover, press, magnetic, tilt).
- **`AnimX.component(targets, presetName, options)`**: Applies high-level macro behaviors for Buttons, Cards, Modals, etc. (e.g. `'card-lift'`).

## Instances
Most methods return an instance exposing: `.play()`, `.pause()`, `.resume()`, `.stop()`, `.replay()`, `.reset()`, `.destroy()`, and `.isRunning()`.

## Preset Registry (v1.5.0+)
- **`AnimX.getPresets()`**: Returns an array of all registered preset configuration objects.
- **`AnimX.getPresetCategories()`**: Returns a sorted array of available categories (e.g., `'entrance'`, `'attention'`).
- **`AnimX.getPresetsByCategory(category)`**: Returns all presets belonging to the specified category string.
- **`AnimX.searchPresets(query)`**: Deep searches presets by `name`, `category`, `family`, `tags`, or `description`. Returns matching preset objects.
- **`AnimX.getPresetTags()`**: Returns a sorted list of all unique tags used across the preset registry.
