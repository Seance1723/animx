# AnimX Demo Reuse Map (v3.41.0)

This document maps how the React mini-site inside `animxWebsite` directly reuses, adapts, and implements the visual design, layouts, and working logic from the legacy `animx/demo/` folder.

## 1. Inspected Source Files
The following files in `animx/demo/` were thoroughly inspected to establish our design and functional baseline:
- **`demo/index.html`**: Analyzed header layouts, navigation link buttons, hero headings, and industry demo grid panels.
- **`demo/playground.html`**: Analyzed the 3-column element builder layout, specific form inputs, slider indicators, active tabs, copy snippet buttons, and visual canvas backgrounds.
- **`demo/docs.html`**: Analyzed the documentation container, readable headings hierarchy, responsive card grids, and dark slate code block formatting.

## 2. Reused Design Language & Styles
To prevent a disconnected visual identity, the React website consumes the exact slate-dark color palette and styling tokens of the source demos:
- **Slate Palette**:
  - Main background: `#0f172a` (`var(--bg)`)
  - Panels/Cards: `#1e293b` (`var(--panel)`)
  - Border/Grid lines: `#334155` (`var(--border)`)
  - Core Text: `#f8fafc` (`var(--text)`)
  - Muted Text: `#94a3b8` (`var(--muted)`)
  - Primary Indigo Accent: `#6366f1` (`var(--primary)`)
  - Hover/Focus state: `#4f46e5` (`var(--primary-hover)`)
  - Accent Green: `#10b981` (`var(--accent)`)
- **Typography & Details**:
  - Global Sans-Serif font hierarchy (using system-ui).
  - Code Block Font: Consolas, monospace.
  - Border radius: `8px` for cards/panels, `6px` for buttons/selectors.
  - Interactive Hover Transitions: Smooth border-color fade to primary indigo on hover.

## 3. Reused Layout Structures
- **Global Header Shell**: Contains the sticky header with unified top navigation tabs exactly styled like the legacy `nav a` buttons.
- **3-Column Desktop Playground Layout**:
  - **Left Sidebar**: 320px column holding Builder Controls (preset list and slider controls).
  - **Center Canvas**: Flex column holding Replay/Reset actions and a radial-gradient preview screen (`radial-gradient(circle at center, #1e1b4b 0%, var(--bg) 100%)`).
  - **Right Export Panel**: 350px column containing multiline code blocks with embedded "Copy" controls.
- **2-Column Docs Layout**: Consolidates the sidebar categories on the left and full-width readable articles on the right.

## 4. Converted Functional Components
The following procedural jQuery-style functionalities were translated into clean React hooks, states, and DOM lifecycle events:
- **`usePlaygroundState`**: Tracks the selected element, active animation family, duration, delay, easing curves, and accessibility toggles.
- **Dynamic Controls Mapping**: Hides irrelevant input fields dynamically based on whether the selected element supports stagger or custom triggers.
- **Safe Preview Cycle**: Directly resets children on DOM updates and uses `window.AnimX.animate()` inside a React `useEffect` callback safely.
- **Snippet Generator Utility**: Translates standard HTML, utility CSS classes, Data Attributes, and JavaScript APIs dynamically into copyable string stubs.

## 5. Broken Layouts/UX Fixed & Cleaned Up
- **No Scattered Files**: Integrated 22 scattered HTML files into a single, cohesive, modern React website.
- **Vite File Loading**: Fixed asset serving so `dist/` builds load reliably under a monorepo parent boundary.
- **Mobile Stackability**: Made the 3-column playground fully stackable on mobile views so that it is functional on smartphones.
