import { runFullProjectQa } from './studio-qa-runner.js';
import { 
  generateClientMotionGuide, 
  generateDeveloperGuide, 
  generateCMSGuide, 
  generateWordPressGuide, 
  generateWebflowGuide,
  generateDeploymentChecklist
} from './studio-handoff.js';

export function generateAnimationMap(projectState) {
  return `# Animation Map
| Section | Target | Preset | Trigger |
|---------|--------|--------|---------|
| Hero | .hero-title | text-mask-up | load |
| Feature Cards | .feature-card | fade-up | scroll |
| CTA | .cta-button | button-glow-soft | hover |
`;
}

export function generatePresetInventory(projectState) {
  return `# Preset Inventory
- Text: text-mask-up
- Scroll: fade-up
- Button: button-glow-soft
`;
}

export function generateDeliveryKit(projectState, options) {
  const qaReport = runFullProjectQa(projectState);
  
  return {
    version: "3.15.0",
    projectName: projectState.name || "Untitled Project",
    generatedAt: new Date().toISOString(),
    documents: {
      clientGuide: options.includeClient ? generateClientMotionGuide(projectState) : null,
      developerGuide: options.includeDev ? generateDeveloperGuide(projectState) : null,
      cmsGuide: options.includeCms ? generateCMSGuide(projectState) : null,
      wordpressGuide: options.includeWp ? generateWordPressGuide(projectState) : null,
      webflowGuide: options.includeWebflow ? generateWebflowGuide(projectState) : null,
      animationMap: options.includeMap ? generateAnimationMap(projectState) : null,
      presetInventory: options.includeInventory ? generatePresetInventory(projectState) : null,
      qaSummary: options.includeQa ? JSON.stringify(qaReport, null, 2) : null,
      deploymentChecklist: options.includeChecklist ? generateDeploymentChecklist() : null
    }
  };
}
