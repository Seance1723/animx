import { getThemeKit } from './studio-theme-kits.js';

export function applyThemeToProject(projectState, themeKitId) {
  const kit = getThemeKit(themeKitId);
  
  // Clone current state to avoid mutating incorrectly
  const newState = JSON.parse(JSON.stringify(projectState));
  
  newState.themeKit = kit.id;
  newState.motionTokens = kit.tokens;
  
  // Override sections based on theme mappings
  newState.sections.forEach(section => {
    // Basic mapping logic (example)
    if (section.type === 'hero') {
      section.settings = section.settings || {};
      section.settings.headingPreset = kit.mappings['hero.heading'] || 'text-mask-up';
      section.settings.copyPreset = kit.mappings['hero.copy'] || 'fade-up';
    }
  });
  
  return newState;
}

export function exportTokensAsCss(tokens) {
  let css = `:root {\n`;
  Object.keys(tokens).forEach(key => {
    // convert camelCase to kebab-case
    const kebab = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    const val = typeof tokens[key] === 'number' ? `${tokens[key]}ms` : tokens[key];
    css += `  --ax-token-${kebab}: ${val};\n`;
  });
  css += `}\n`;
  return css;
}
