# AnimX

A zero-dependency browser animation library.

## Project Goal
Create a standalone animation library that outputs only one CSS file and one JS file. No GSAP, Anime.js, Motion, Animate.css, AOS, or jQuery. It leverages native browser APIs.

## Current Version
**0.0.1** - Foundation Version

*Note: v0.0.1 is only the foundation version. Actual animations start from future versions.*

## Development Instructions

### Install Dependencies
```sh
npm install
```

### Run Dev Server
```sh
npm run dev
```

### Build
```sh
npm run build
```

### Preview Build
```sh
npm run preview
```

## Usage

Use the compiled distribution files in your project:

```html
<link rel="stylesheet" href="dist/animx.min.css">
<script src="dist/animx.min.js"></script>
```

Initialize AnimX:
```javascript
window.AnimX.config({ debug: true });
window.AnimX.init();
```
