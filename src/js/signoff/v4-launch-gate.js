import { generateV4LaunchGate } from './signoff-report-generator.js';

export function v4LaunchGate() {
  return generateV4LaunchGate({
    stableApis: ['All v3.x public APIs frozen and backward-compatible'],
    experimentalApis: [],
    releaseBlockers: [],
    nonBlockingIssues: [
      { severity: 'P3', summary: 'Safari 3D sub-pixel shifts' }
    ],
    requiredBeforeV4: [
      'Complete v3.43.0 Rolling, Slot, Typewriter, and Scramble Text Pack'
    ],
    recommendedBeforeV4: [
      'Final npm pack dry run with fresh install test',
      'Final browser smoke test across Chrome, Firefox, Safari, Edge'
    ],
    notes: [
      'v3.40.0 stable release sign-off passed with GO decision',
      'v4.0.0 preparation can begin after v3.43.0 text module',
      'Do not set current version to 4.0.0 until v3.43.0 is complete'
    ]
  });
}
