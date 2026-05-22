# Exporting Snippets

The AnimX Playground (v2.2.0) automatically generates clean, zero-dependency copy-paste code based on your current visual configuration.

## How it works
The right-hand panel in `animx.playground.html` exposes three formats. Every time you change a slider or dropdown, these snippets update instantly.

### 1. HTML (Classes)
Best for basic, immediate CSS animations.
```html
<div class="ax ax-fade-up"></div>
```
*(Note: complex configurations like delays and staggers are better handled by Data Attributes or JS).*

### 2. HTML (Data Attributes)
Best for no-code setups, CMS integrations (Webflow, WP), or Scroll Reveals.
```html
<div data-ax="fade-up" data-ax-duration="1200" data-ax-delay="200"></div>
```

### 3. JavaScript API
Best for programmatic control, complex timelines, and dynamic text/SVG engines.
```javascript
AnimX.animate('.target', 'fade-up', { duration: 1200, delay: 200, ease: 'snappy' });
```

## Workflow
1. Select a preset and adjust the duration/delay/easing.
2. Click the `Copy` button next to the format you prefer.
3. Paste directly into your project. Since AnimX is zero-dependency, the code will just work as long as `animx.js` is loaded!
