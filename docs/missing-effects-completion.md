# Missing Effects Completion (v3.12.0)

During the v3.12.0 coverage audit, several practical UI elements were found lacking native AnimX presets. The following were added:

## Link / Nav
- `nav-link-underline-slide`: A pure-CSS accessible hover state.
- `nav-menu-slide-down`: A clean JS/Class hybrid for dropdowns.

## Tables & Lists
- `list-row-reveal`: A stagger recipe for unordered lists.
- `table-row-fade`: Optimized for large tabular datasets.

## Dashboard
- `kpi-number-roll`: Counts up from 0 to a target value.
- `chart-bar-grow`: Builds SVGs from the baseline up.

## Modals & Drawers
- `modal-pop`, `drawer-left`, `toast-slide-up`: UI essentials that instantly revert safely under `prefers-reduced-motion: reduce`.
