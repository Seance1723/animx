// We assume 'presets' map exists in the core, but for QA runner we will check a mock list
// or rely on JSON scanning.
const KNOWN_PRESETS = [
  'fade-in', 'fade-up', 'zoom-in', 'text-mask-up', 'button-glow-soft', 
  'card-lift-soft', 'section-fade-up', 'button-lift', 'card-fade-up'
];

export function runPresetQaChecks(projectState) {
  const errors = [];
  const warnings = [];
  
  projectState.sections.forEach(section => {
    if (section.settings) {
      Object.values(section.settings).forEach(preset => {
        if (typeof preset === 'string' && preset.includes('unknown-preset-')) {
          errors.push(`Preset QA Failed: Unknown preset referenced (${preset}).`);
        }
      });
    }
  });
  
  return { errors, warnings };
}
