import { generateKnownIssuesLock } from './signoff-report-generator.js';

export function knownIssuesLock() {
  return generateKnownIssuesLock({
    issues: [
      { severity: 'P3', module: '3D/Spatial', summary: 'Safari sub-pixel rendering in CSS perspective transforms', workaround: 'Use 2D fallback transforms', targetFix: 'v4.x' },
      { severity: 'P3', module: 'Studio', summary: 'Some optional Studio panels marked incomplete', workaround: 'Panels are honestly marked as incomplete in UI', targetFix: 'v4.x' },
      { severity: 'P3', module: 'Accessibility', summary: 'Focus trap in modals is a documented caveat, not full implementation', workaround: 'Use native dialog or dedicated focus-trap library', targetFix: 'v4.x' }
    ]
  });
}
