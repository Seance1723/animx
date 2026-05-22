export function saveProjectLocal(project) {
  try {
    const saved = localStorage.getItem('animx-projects') || '[]';
    let projects = JSON.parse(saved);
    
    // Remove if exists
    projects = projects.filter(p => p.projectId !== project.projectId);
    projects.push(project);
    
    localStorage.setItem('animx-projects', JSON.stringify(projects));
    return true;
  } catch (e) {
    console.warn('[AnimX Studio] Failed to save project locally.', e);
    return false;
  }
}

export function loadProjectsLocal() {
  try {
    const saved = localStorage.getItem('animx-projects');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function clearProjectsLocal() {
  try {
    localStorage.removeItem('animx-projects');
  } catch (e) {
    // Ignore
  }
}
