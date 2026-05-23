let currentProject = null;
let subscribers = [];

export function getProjectState() {
  if (!currentProject) {
    currentProject = {
      version: "3.13.0",
      projectId: "proj-" + Date.now(),
      name: "Untitled Project",
      type: "custom",
      motionStyle: "smooth-professional",
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
  }
  return currentProject;
}

export function setProjectState(newState) {
  currentProject = { ...currentProject, ...newState, updatedAt: new Date().toISOString() };
  notifySubscribers();
}

export function subscribeToProject(callback) {
  subscribers.push(callback);
}

function notifySubscribers() {
  subscribers.forEach(cb => cb(currentProject));
}
