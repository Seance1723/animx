# Getting Started with AnimX

Welcome to AnimX v0.0.1! Currently, AnimX is in its foundation phase and contains basic placeholders for future animation presets.

## Installation

Include the CSS and JS files in your HTML:

```html
<link rel="stylesheet" href="dist/animx.min.css">
<script src="dist/animx.min.js"></script>
```

## Basic Usage

Add the `.ax` class to elements you wish to animate, along with a placeholder class for testing:

```html
<div class="ax ax-placeholder"></div>
```

Initialize AnimX in your scripts:

```javascript
AnimX.config({ debug: true });
AnimX.init();
```

*Note: v0.0.1 contains only placeholder foundations. Actual animations will be implemented in future versions.*
