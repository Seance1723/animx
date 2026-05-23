import { getProjectState, setProjectState } from './studio-project-state.js';
import { saveProjectLocal, loadProjectsLocal } from './studio-project-storage.js';
import { getProjectPresets } from './studio-project-presets.js';
import { getMotionStyles } from './studio-motion-system.js';

export function createProject(name, type, motionStyle) {
  const newProj = {
    version: "3.22.0",
    projectId: "proj-" + Date.now(),
    name: name || "New Project",
    type: type || "custom",
    motionStyle: motionStyle || "smooth-professional",
    targetPlatform: "html",
    sections: [],
    globalSettings: {
      duration: 700,
      ease: "smooth",
      stagger: 120,
      reducedMotionSafe: true
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  setProjectState(newProj);
  return newProj;
}

export function initStudioProjects() {
  if (!window.AnimXStudio) {
    window.AnimXStudio = {};
  }
  
  window.AnimXStudio.createProject = createProject;
  window.AnimXStudio.getProjectState = getProjectState;
  window.AnimXStudio.saveProjectLocal = saveProjectLocal;
  window.AnimXStudio.loadProjectsLocal = loadProjectsLocal;
  window.AnimXStudio.getProjectPresets = getProjectPresets;
  window.AnimXStudio.getMotionStyles = getMotionStyles;
}
