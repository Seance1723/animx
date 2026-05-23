/**
 * AnimX Animation Coverage Matrix (v3.14.0)
 * Evaluates the preset registry against all required UI element types.
 */

export const ELEMENT_TYPES = [
  'text', 'button', 'link', 'nav', 'card', 'image', 'video', 'section', 'page',
  'scroll', 'svg', 'icon', 'form', 'loader', 'skeleton', 'list', 'table',
  'dashboard', 'modal', 'drawer', 'toast', 'tabs', 'tooltip', 'background', 'cms'
];

export function generateCoverageMatrix() {
  if (!window.AnimX || !window.AnimX.getPresets) return null;

  const presets = window.AnimX.getPresets();
  const matrix = {};

  ELEMENT_TYPES.forEach(type => {
    matrix[type] = {
      element: type,
      totalPresets: 0,
      families: new Set(),
      presets: [],
      dataAttributes: false,
      jsAPI: false,
      classAPI: false,
      reducedMotionSafe: true
    };
  });

  presets.forEach(p => {
    const el = p.element || 'misc';
    if (matrix[el]) {
      matrix[el].totalPresets++;
      if (p.family) matrix[el].families.add(p.family);
      matrix[el].presets.push(p.name);
      
      if (p.usage) {
        if (p.usage.includes('data')) matrix[el].dataAttributes = true;
        if (p.usage.includes('js')) matrix[el].jsAPI = true;
        if (p.usage.includes('class')) matrix[el].classAPI = true;
      }
      
      if (!p.reducedMotion || p.reducedMotion === 'unsafe') {
        matrix[el].reducedMotionSafe = false;
      }
    }
  });

  // Convert Sets to Arrays for serialization
  Object.keys(matrix).forEach(k => {
    matrix[k].families = Array.from(matrix[k].families);
    matrix[k].coverageScore = Math.min(100, Math.round((matrix[k].totalPresets / 3) * 100)); // Target 3 presets per category
  });

  return {
    version: "3.14.0",
    generatedAt: new Date().toISOString(),
    totalPresets: presets.length,
    elements: Object.values(matrix)
  };
}
