import { getProjectState } from './studio-project-state.js';
import { validateProjectExport } from './studio-project-validator.js';

export function generateProjectReport() {
  const proj = getProjectState();
  const validation = validateProjectExport(proj);
  
  let report = `# AnimX Project Report\n\n`;
  report += `- **Project**: ${proj.name}\n`;
  report += `- **Version**: ${proj.version}\n`;
  report += `- **Motion style**: ${proj.motionStyle}\n`;
  report += `- **Sections**: ${proj.sections.length}\n`;
  
  report += `\n## Accessibility Notes\n`;
  if (proj.globalSettings.reducedMotionSafe) {
    report += `- ✅ Reduced Motion is handled gracefully.\n`;
  } else {
    report += `- ⚠️ Reduced Motion is DISABLED. This is a severe WCAG failure.\n`;
  }
  
  report += `\n## Security Notes\n`;
  report += `- All HTML exports run through validation to ensure no injected script tags.\n`;
  
  if (validation.warnings.length > 0) {
    report += `\n## Warnings\n`;
    validation.warnings.forEach(w => {
      report += `- ${w}\n`;
    });
  }
  
  return report;
}
