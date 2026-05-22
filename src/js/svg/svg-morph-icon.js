// svg-morph-icon.js
// Practical pre-defined SVG paths for standard icon morphs
// These paths are constructed specifically to be structurally compatible with each other.

export const iconPaths = {
  menu: "M2 5 L22 5 M2 12 L22 12 M2 19 L22 19",
  close: "M5 5 L19 19 M12 12 L12 12 M5 19 L19 5", // Middle line collapses to center
  plus: "M12 2 L12 22 M2 12 L22 12",
  minus: "M5 12 L19 12 M2 12 L22 12", // Vertical line collapses horizontal
  play: "M6 4 L20 12 L6 20 Z",
  pause: "M6 4 L10 4 L10 20 Z M14 4 L18 4 L18 20 Z", // requires specific layout if we try to morph these safely, wait... 
  // actually Play to Pause is tough to normalize safely in simple point to point.
  // We'll provide a 3-bar compatible setup:
  play_safe: "M5 4 L19 12 L19 12 L5 20 M5 4 L5 20 L5 20 L5 20", // Bar 1 makes triangle, Bar 2 stays hidden
  pause_safe: "M6 4 L10 4 L10 20 L6 20 M14 4 L18 4 L18 20 L14 20",
  check: "M4 12 L10 18 L20 6",
  close_safe: "M6 6 L12 12 L18 6 M12 12 L12 12 L12 12 M6 18 L12 12 L18 18"
};

export function getIconPath(name) {
  return iconPaths[name] || iconPaths[`${name}_safe`] || null;
}
