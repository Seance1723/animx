# AnimX Project Memory

## Project Identity
- Project name: AnimX
- Version: 0.0.1
- Type: Zero-dependency browser animation library
- Final output: one CSS file and one JS file
- Runtime dependency: none

## Core Product Direction
- AnimX must be built from scratch.
- Do not use GSAP, Anime.js, Motion, Animate.css, AOS, jQuery, or any external animation library.
- Native browser APIs are allowed:
  - CSS animations
  - Web Animations API
  - requestAnimationFrame
  - IntersectionObserver
  - matchMedia
  - MutationObserver
  - ResizeObserver

## Final User Usage Goal
Users should be able to use AnimX with:

<link rel="stylesheet" href="dist/animx.min.css">
<script src="dist/animx.min.js"></script>

## Build Output
dist/
├── animx.css
├── animx.min.css
├── animx.js
├── animx.min.js
└── animx.demo.html

## Current Version Scope
v0.0.1 is only the foundation version.
Do not build actual animation presets yet.
Do not build the animation engine yet.
Only create the project foundation, build setup, global AnimX object, SCSS base structure, demo page, and documentation starter.

## Current Public API Placeholders
AnimX.version
AnimX.config()
AnimX.init()
AnimX.ready()
AnimX.registerPreset()
AnimX.getPreset()

## Development Rules
- Keep code clean and modular internally.
- Final public output must remain one CSS file and one JS file.
- Avoid unnecessary dependencies.
- Avoid unnecessary files.
- Avoid verbose comments.
- Avoid repeating already documented project context in every file.
- Use ANIMX_MEMORY.md as the project reference before making future changes.
- Update ANIMX_MEMORY.md whenever a new version adds important architecture, API, file structure, or rule changes.

## Token-Saving Rule for Future Prompts
When generating future implementation prompts, do not repeat the entire project history.
Instead, tell the coding agent:

"Before starting, read ANIMX_MEMORY.md and follow the existing project direction."
