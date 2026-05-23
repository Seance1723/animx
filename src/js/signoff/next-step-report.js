import { generateNextStepReport } from './signoff-report-generator.js';

export function nextStepReport() {
  return generateNextStepReport({
    mustFix: [],
    shouldFix: [
      'Final npm pack dry run with fresh install verification',
      'Final cross-browser smoke test documentation'
    ],
    canDefer: [
      'Safari 3D sub-pixel cosmetic issue (P3)',
      'Optional Studio panel completion (P3)',
      'Focus trap full implementation (P3)'
    ]
  });
}
