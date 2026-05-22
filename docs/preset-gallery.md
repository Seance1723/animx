# Preset Gallery Overview

The AnimX Preset Gallery is an interactive catalog of all available animations packaged within the core library.
> **New in v2.2.0:** We now also feature a full `animx.playground.html` which goes beyond simple searching to offer full live-building controls and text/svg timeline support!

## Purpose

The gallery exists to help developers:
- Discover new animations visually.
- Search for specific effects without reading raw CSS/JS.
- Quickly grab the correct implementation code.

## Data Source

The gallery runs natively off the `AnimX` engine. It uses the following public APIs:
- `AnimX.getPresets()`
- `AnimX.getPresetCategories()`
- `AnimX.searchPresets(query)`

During the build process (`npm run build`), AnimX statically exports its full internal preset registry into `dist/animx.preset-data.json`. This JSON payload provides raw metadata (names, categories, tags) for third-party tooling or static analysis without requiring a browser environment.
