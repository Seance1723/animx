import { runExportQaChecks } from './studio-export-qa.js';
import { runPresetQaChecks } from './studio-preset-qa.js';

export function runFullProjectQa(projectState) {
  const errors = [];
  const warnings = [];
  const suggestions = [];
  const checks = [];
  
  const report = {
    version: "3.12.0",
    projectName: projectState.name || "Untitled",
    ranAt: new Date().toISOString(),
    score: 100,
    status: "pass",
    checks,
    errors,
    warnings,
    suggestions,
    reports: {
      preset: runPresetQaChecks(projectState),
      exports: runExportQaChecks(projectState),
      accessibility: { errors: [], warnings: [] }, // Handled by core audit
      security: { errors: [], warnings: [] } // Handled by core audit
    }
  };
  
  // Base checks
  if (!projectState.projectId) errors.push("Project is missing an ID.");
  if (!projectState.sections || projectState.sections.length === 0) {
    warnings.push("Project contains no sections.");
  }
  
  // Aggregate nested reports
  const allReports = Object.values(report.reports);
  allReports.forEach(r => {
    if (r.errors) errors.push(...r.errors);
    if (r.warnings) warnings.push(...r.warnings);
  });
  
  report.score = Math.max(0, 100 - (errors.length * 10) - (warnings.length * 5));
  
  if (errors.length > 0) {
    report.status = "fail";
  } else if (warnings.length > 0) {
    report.status = "pass-with-warnings";
  }
  
  return report;
}
