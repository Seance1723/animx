/**
 * AnimX Runtime Cleanup Audit (v3.21.0)
 * Verifies that AnimX.clearInstances() correctly unmounts everything.
 */

export function runCleanupAudit() {
  const ax = window.AnimX;
  if (!ax) return null;

  let initialInstances = ax._instances ? ax._instances.size : 0;
  
  // Force global cleanup
  if (typeof ax.clearInstances === 'function') {
    ax.clearInstances();
  }

  let finalInstances = ax._instances ? ax._instances.size : 0;
  let hasOrphans = finalInstances > 0;

  return {
    version: "3.21.0",
    ok: !hasOrphans,
    initialInstances,
    finalInstances,
    status: hasOrphans ? 'Leaking Memory' : 'Clean'
  };
}
