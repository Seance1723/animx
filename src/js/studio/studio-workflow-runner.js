import { getProjectState, setProjectState } from './studio-project-state.js';
import { workflows } from './studio-workflows.js';

export function runWorkflow(workflowId) {
  const wf = workflows.find(w => w.id === workflowId);
  if (!wf) return false;
  
  const current = getProjectState();
  const updated = wf.execute({ ...current });
  
  setProjectState(updated);
  return true;
}
