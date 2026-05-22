import { getProjectState } from './studio-project-state.js';
import { getTemplateById } from './studio-template-registry.js';

export function generateProjectRecipe(exportType) {
  const proj = getProjectState();
  let htmlResult = '';
  let jsResult = '';
  
  if (exportType === 'html' || exportType === 'data') {
    htmlResult = `<!-- AnimX Project: ${proj.name} -->\n`;
    htmlResult += `<div class="ax-project-wrapper" data-ax-motion="${proj.motionStyle}">\n`;
    
    proj.sections.forEach(sec => {
      const tpl = getTemplateById(sec.preset);
      if (tpl) {
        htmlResult += `  <!-- Section: ${sec.type} -->\n`;
        htmlResult += `  ${tpl.template.html}\n`;
      }
    });
    
    htmlResult += `</div>`;
  }
  
  if (exportType === 'js') {
    htmlResult = `<!-- AnimX Project: ${proj.name} -->\n`;
    htmlResult += `<div class="ax-project-wrapper">\n`;
    
    proj.sections.forEach(sec => {
      const tpl = getTemplateById(sec.preset);
      if (tpl) {
        htmlResult += `  <!-- Section: ${sec.type} -->\n`;
        htmlResult += `  ${tpl.template.html}\n`;
      }
    });
    
    htmlResult += `</div>`;
    
    jsResult = `// AnimX Initialization for ${proj.name}\n`;
    jsResult += `window.addEventListener('DOMContentLoaded', () => {\n`;
    jsResult += `  AnimX.config({\n`;
    jsResult += `    duration: ${proj.globalSettings.duration},\n`;
    jsResult += `    ease: "${proj.globalSettings.ease}",\n`;
    jsResult += `    reducedMotionSafe: ${proj.globalSettings.reducedMotionSafe}\n`;
    jsResult += `  });\n\n`;
    jsResult += `  // Auto-bind data attributes if any\n`;
    jsResult += `  AnimX.init();\n`;
    jsResult += `});\n`;
  }
  
  return { html: htmlResult, js: jsResult };
}
