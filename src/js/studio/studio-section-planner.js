import { getProjectState, setProjectState } from './studio-project-state.js';

export function addSectionToProject(type, presetId) {
  const proj = getProjectState();
  const newSection = {
    id: type + '-' + Date.now(),
    type: type,
    preset: presetId
  };
  setProjectState({
    ...proj,
    sections: [...proj.sections, newSection]
  });
}

export function removeSectionFromProject(sectionId) {
  const proj = getProjectState();
  setProjectState({
    ...proj,
    sections: proj.sections.filter(s => s.id !== sectionId)
  });
}

export function reorderSection(sectionId, direction) {
  const proj = getProjectState();
  const sections = [...proj.sections];
  const idx = sections.findIndex(s => s.id === sectionId);
  if (idx === -1) return;
  
  if (direction === 'up' && idx > 0) {
    const temp = sections[idx];
    sections[idx] = sections[idx - 1];
    sections[idx - 1] = temp;
  } else if (direction === 'down' && idx < sections.length - 1) {
    const temp = sections[idx];
    sections[idx] = sections[idx + 1];
    sections[idx + 1] = temp;
  }
  
  setProjectState({ ...proj, sections });
}
