# Implementation Notes

## What was built
- A clean React-based mini website (`animxWebsite`) to serve as the main public-facing demo experience.
- Three core areas: Landing Page, Playground, and Documentation.
- Features dynamic playgrounds generating live HTML/CSS/JS snippets.

## How AnimX is loaded
- The website leverages `../dist/animx.min.css` and `../dist/animx.min.js` directly via a local script injection loader (`utils/animxLoader.js`).

## How Playground works
- Driven by React state connecting the selected element, active options, and real-time snippet generation.
- Safely initializes and destroys AnimX effects to prevent overlap and DOM corruption (`utils/safePreview.js`).

## Known Limitations
- No backend/auth (intentional, per zero-dependency rule).
- Local file loading dependency relies on Vite serving files properly or building with relative paths.

## Next Recommendations
- Enhance the export tab with CodeSandbox direct upload functionality if community requests it.
