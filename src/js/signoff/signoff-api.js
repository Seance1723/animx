import { finalStableSignoff } from './final-stable-signoff.js';
import { goNoGoReview } from './go-no-go-review.js';
import { verifyArtifacts } from './artifact-verification.js';
import { publicApiFreezeCheck } from './public-api-freeze-check.js';
import { securityAccessibilityFinalCheck } from './security-accessibility-final-check.js';
import { knownIssuesLock } from './known-issues-lock.js';
import { releaseReadinessCheck } from './release-readiness-check.js';
import { v4LaunchGate } from './v4-launch-gate.js';
import { nextStepReport } from './next-step-report.js';

export function signoff() {
  return {
    stableSignoff: finalStableSignoff(),
    goNoGo: goNoGoReview(),
    artifacts: verifyArtifacts(),
    apiFreeze: publicApiFreezeCheck(),
    securityAccessibility: securityAccessibilityFinalCheck(),
    knownIssues: knownIssuesLock(),
    releaseReadiness: releaseReadinessCheck(),
    v4Gate: v4LaunchGate(),
    nextStep: nextStepReport()
  };
}

export {
  finalStableSignoff,
  goNoGoReview,
  verifyArtifacts,
  publicApiFreezeCheck,
  securityAccessibilityFinalCheck,
  knownIssuesLock,
  releaseReadinessCheck,
  v4LaunchGate,
  nextStepReport
};
