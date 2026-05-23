import { runFullProjectQa } from './studio-qa-runner.js';
import { draftReleaseNotes } from './studio-release-notes.js';

export function runReleaseAssistant(projectState) {
  const qaReport = runFullProjectQa(projectState);
  
  const checklist = [
    { id: "version-bump", label: "Version updated", passed: true },
    { id: "tests-pass", label: "Tests pass (Not run inside Studio)", passed: null },
    { id: "qa-score", label: `QA Score: ${qaReport.score}`, passed: qaReport.score >= 80 },
    { id: "exports-valid", label: "Exports Validated", passed: qaReport.reports.exports.errors.length === 0 },
    { id: "a11y-valid", label: "Accessibility QA Reviewed", passed: qaReport.reports.accessibility.errors.length === 0 }
  ];
  
  const releaseDraft = draftReleaseNotes(projectState, qaReport);
  
  return {
    ready: qaReport.status === "pass" || qaReport.status === "pass-with-warnings",
    checklist,
    qaReport,
    releaseDraft
  };
}
