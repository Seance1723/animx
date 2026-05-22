# AnimX Webflow Helper

Inject AnimX into your Webflow projects without conflicting with Webflow's native IX2 interactions engine.

## Installation

Add this to your project settings (Custom Code -> Footer):

```html
<script src="https://cdn.jsdelivr.net/npm/animx@2.6.0/dist/animx.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/animx@2.6.0/dist/adapters/animx.webflow.min.js"></script>
```

## How it works

The adapter hooks into `window.Webflow.push()`, ensuring that AnimX waits for Webflow to completely finish setting up its internal components (like sliders, tabs, and navbars) before initializing your animations.

You can then freely use `data-ax` attributes directly in the Webflow Designer without writing custom Javascript.
