const VERSION = '3.40.0';
const RELEASE = 'Final Stable Release Sign-Off and v4.0.0 Launch Readiness Gate';

export function ts() {
  return new Date().toISOString();
}

export function severity(level) {
  const map = { P0: 'critical', P1: 'major', P2: 'minor', P3: 'polish' };
  return map[level] || 'unknown';
}

export function statusFromBlockers(blockers) {
  if (!blockers || blockers.length === 0) return 'ready';
  const hasP0 = blockers.some(b => b.severity === 'P0');
  const hasP1 = blockers.some(b => b.severity === 'P1');
  if (hasP0 || hasP1) return 'blocked';
  return 'needs-review';
}

export function decisionFromStatus(status) {
  if (status === 'ready') return 'go';
  if (status === 'needs-review') return 'needs-review';
  return 'no-go';
}

export { VERSION, RELEASE };
