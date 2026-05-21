npm run preview
```

## Usage

Use the compiled distribution files in your project:

```html
<link rel="stylesheet" href="dist/animx.min.css">
<script src="dist/animx.min.js"></script>
```

Add preset classes and modifiers directly to your elements:

```html
<div class="ax ax-fade-up">Fade up</div>
<div class="ax ax-slide-left ax-slow">Slide left</div>
<div class="ax ax-zoom-in ax-delay-200">Zoom in</div>
```

Initialize AnimX (prepares presets and future JS hooks):
```javascript
window.AnimX.config({ debug: true });
window.AnimX.init();
```
