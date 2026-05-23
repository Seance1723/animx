/**
 * AnimX Runtime Performance Audit (v3.20.0)
 * Scans the DOM for active animations and observers.
 */

export function runPerformanceAudit() {
  const ax = window.AnimX;
  if (!ax) return null;

  const metrics = {
    activeInstances: ax._instances ? ax._instances.size : 0,
    activeRAF: 0,
    splitTextNodes: 0,
    activeObservers: 0
  };

  const warnings = [];

  if (typeof document !== 'undefined') {
    metrics.splitTextNodes = document.querySelectorAll('.ax-char, .ax-word').length;
    
    if (metrics.splitTextNodes > 500) {
      warnings.push(`High number of split text nodes (${metrics.splitTextNodes}). This can cause layout thrashing.`);
    }

    if (metrics.activeInstances > 100) {
      warnings.push(`High number of active instances (${metrics.activeInstances}). Consider destroying off-screen instances.`);
    }
  }

  return {
    version: "3.20.0",
    ok: warnings.length === 0,
    metrics,
    warnings
  };
}
