export function validateProjectExport(project) {
  const warnings = [];
  
  if (!project.sections || project.sections.length === 0) {
    warnings.push("Project has no sections. Output will be empty.");
  }
  
  if (project.motionStyle === 'bold-launch' && !project.globalSettings.reducedMotionSafe) {
    warnings.push("Bold Launch motion style is active but reducedMotionSafe is disabled. This is an accessibility risk.");
  }
  
  return {
    ok: true, // We don't block export on warnings
    warnings
  };
}
