import { VERSION, RELEASE, ts, statusFromBlockers, decisionFromStatus } from './signoff-utils.js';

export function generateSignoffReport(checks) {
  const blockers = checks.blockers || [];
  const warnings = checks.warnings || [];
  const knownIssues = checks.knownIssues || [];
  const overallStatus = statusFromBlockers(blockers);
  const decision = decisionFromStatus(overallStatus);

  return {
    version: VERSION,
    release: RELEASE,
    generatedAt: ts(),
    overallStatus,
    decision,
    summary: {
      runtime: checks.runtime || 'ready',
      build: checks.build || 'ready',
      dist: checks.dist || 'ready',
      package: checks.package || 'ready',
      docs: checks.docs || 'ready',
      demo: checks.demo || 'ready',
      playground: checks.playground || 'ready',
      gallery: checks.gallery || 'ready',
      studio: checks.studio || 'ready',
      security: checks.security || 'ready',
      accessibility: checks.accessibility || 'ready',
      reducedMotion: checks.reducedMotion || 'ready',
      compatibility: checks.compatibility || 'ready',
      knownIssues: knownIssues.length > 0 ? 'needs-review' : 'ready',
      releaseNotes: checks.releaseNotes || 'ready',
      v4LaunchGate: checks.v4LaunchGate || 'ready'
    },
    blockers,
    warnings,
    knownIssues,
    recommendations: checks.recommendations || ['Proceed to v3.41.0 launch buffer'],
    nextVersion: '3.41.0'
  };
}

export function generateGoNoGoReport(checks) {
  const blockers = checks.blockers || [];
  const status = statusFromBlockers(blockers);
  const decision = decisionFromStatus(status);

  return {
    version: VERSION,
    decision,
    goCriteria: checks.goCriteria || [],
    failedCriteria: checks.failedCriteria || [],
    waivedCriteria: checks.waivedCriteria || [],
    waiverReasons: checks.waiverReasons || [],
    blockers,
    approvalNotes: checks.approvalNotes || [],
    status
  };
}

export function generateArtifactReport(checks) {
  return {
    version: VERSION,
    requiredArtifacts: checks.requiredArtifacts || [],
    optionalArtifacts: checks.optionalArtifacts || [],
    missingRequired: checks.missingRequired || [],
    missingOptional: checks.missingOptional || [],
    invalidArtifacts: checks.invalidArtifacts || [],
    oversizedArtifacts: checks.oversizedArtifacts || [],
    status: (checks.missingRequired || []).length > 0 ? 'blocked' : 'ready'
  };
}

export function generateApiReport(checks) {
  return {
    version: VERSION,
    stableApis: checks.stableApis || [],
    experimentalApis: checks.experimentalApis || [],
    deprecatedAliases: checks.deprecatedAliases || [],
    removedApis: checks.removedApis || [],
    missingDocumentedApis: checks.missingDocumentedApis || [],
    undocumentedPublicApis: checks.undocumentedPublicApis || [],
    status: (checks.removedApis || []).length > 0 ? 'blocked' : 'ready'
  };
}

export function generateSecurityA11yReport(checks) {
  return {
    version: VERSION,
    security: {
      status: checks.securityStatus || 'ready',
      blockers: checks.securityBlockers || [],
      warnings: checks.securityWarnings || []
    },
    accessibility: {
      status: checks.a11yStatus || 'ready',
      blockers: checks.a11yBlockers || [],
      warnings: checks.a11yWarnings || []
    },
    reducedMotion: {
      status: checks.rmStatus || 'ready',
      blockers: checks.rmBlockers || [],
      warnings: checks.rmWarnings || []
    },
    notes: checks.notes || []
  };
}

export function generateKnownIssuesLock(checks) {
  const releaseBlockers = (checks.issues || []).filter(i => i.severity === 'P0' || i.severity === 'P1');
  return {
    version: VERSION,
    issues: checks.issues || [],
    releaseBlockers,
    nonBlockingIssues: (checks.issues || []).filter(i => i.severity === 'P2'),
    deferredIssues: (checks.issues || []).filter(i => i.severity === 'P3'),
    status: releaseBlockers.length > 0 ? 'blocked' : 'ready'
  };
}

export function generateReleaseReadiness(checks) {
  const blockers = checks.blockers || [];
  return {
    version: VERSION,
    readyForStableRelease: blockers.length === 0,
    checks: {
      build: checks.build || 'ready',
      dist: checks.dist || 'ready',
      package: checks.package || 'ready',
      docs: checks.docs || 'ready',
      demo: checks.demo || 'ready',
      security: checks.security || 'ready',
      accessibility: checks.accessibility || 'ready',
      reducedMotion: checks.reducedMotion || 'ready',
      compatibility: checks.compatibility || 'ready',
      knownIssues: checks.knownIssues || 'ready',
      releaseNotes: checks.releaseNotes || 'ready'
    },
    blockers,
    warnings: checks.warnings || [],
    recommendations: checks.recommendations || []
  };
}

export function generateV4LaunchGate(checks) {
  const blockers = checks.releaseBlockers || [];
  const canStart = blockers.length === 0;
  return {
    version: VERSION,
    target: '4.0.0',
    launchGate: blockers.length > 0 ? 'blocked' : (checks.nonBlockingIssues || []).length > 0 ? 'needs-review' : 'ready',
    canStartV4Preparation: canStart,
    canReleaseV4: false,
    stableApis: checks.stableApis || [],
    experimentalApis: checks.experimentalApis || [],
    releaseBlockers: blockers,
    nonBlockingIssues: checks.nonBlockingIssues || [],
    requiredBeforeV4: checks.requiredBeforeV4 || ['Complete v3.41.0 launch buffer and public release packaging guard'],
    recommendedBeforeV4: checks.recommendedBeforeV4 || [],
    notes: checks.notes || ['v4.0.0 should not be released until v3.41.0 launch buffer is complete'],
    nextVersion: '3.41.0'
  };
}

export function generateNextStepReport(checks) {
  const hasBlockers = (checks.mustFix || []).length > 0;
  return {
    version: VERSION,
    nextVersion: '3.41.0',
    needed: true,
    reason: hasBlockers
      ? 'Must fix remaining items before v4.0.0 launch'
      : 'Final launch buffer and public release packaging guard needed before v4.0.0',
    recommendedModule: hasBlockers
      ? 'v3.41.0 Blocker Fixes and Launch Preparation'
      : 'v3.41.0 Final Launch Buffer and Public Release Packaging Guard',
    mustFix: checks.mustFix || [],
    shouldFix: checks.shouldFix || [],
    canDefer: checks.canDefer || []
  };
}
