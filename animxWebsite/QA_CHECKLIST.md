# QA Checklist (v3.41.0 Release-Ready)

## Landing Page
- [x] Renders without errors.
- [x] Hero CTA links to playground.
- [x] Capability journey renders elements properly.
- [x] Reduced motion is respected.
- [x] Responsive layout breaks correctly on mobile.

## Playground
- [x] Element selection updates options dynamically.
- [x] Preview updates correctly on option changes.
- [x] Replay triggers animation.
- [x] Reset brings preview to initial state.
- [x] Snippets update automatically.
- [x] Copy snippet buttons copy to clipboard.
- [x] Safe fallback if AnimX is missing.
- [x] Mobile tab layout works correctly.

## Docs
- [x] Sidebar navigation works.
- [x] Quick start code blocks render correctly.
- [x] Snippets can be copied.

## Accessibility & Security
- [x] Keyboard navigation functions on all interactive elements.
- [x] Focus rings are visible.
- [x] No inline event handlers in generated snippets.
- [x] No `javascript:` execution in outputs.

## Build
- [x] `npm run dev` starts server.
- [x] `npm run build` outputs dist folder.
- [x] `npm run preview` serves correctly.
