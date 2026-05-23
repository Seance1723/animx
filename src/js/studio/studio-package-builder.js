export function buildProjectPackage(projectState) {
  return {
    schema: "animx-package",
    schemaVersion: "1.0",
    animxVersion: "3.11.0",
    packageId: projectState.projectId || `pkg-${Date.now()}`,
    name: projectState.name || "Untitled Package",
    type: "project-package",
    targetPlatform: "html",
    themeKit: projectState.themeKit || "premium-soft",
    motionTokens: projectState.motionTokens || {},
    project: projectState,
    exports: {
      html: "<!-- Standard HTML export goes here -->",
      dataHTML: "<!-- Data-attribute HTML export goes here -->"
    },
    createdAt: new Date().toISOString()
  };
}

export function downloadPackageFile(pkg) {
  const jsonStr = JSON.stringify(pkg, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `animx-${pkg.name.toLowerCase().replace(/\s+/g, '-')}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
