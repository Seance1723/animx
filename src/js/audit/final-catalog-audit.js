import { getPresets } from '../presets/preset-registry.js';

export function runCatalogAudit() {
  const presets = getPresets();
  const report = {
    total: presets.length,
    verified: 0,
    needsReview: 0,
    broken: 0,
    duplicateNames: 0,
    missingMetadata: 0,
    details: [],
    categories: {}
  };

  const nameMap = new Map();

  presets.forEach(p => {
    const issues = [];
    
    // Check duplicates
    if (nameMap.has(p.name)) {
      issues.push("Duplicate preset name");
      report.duplicateNames++;
    } else {
      nameMap.set(p.name, true);
    }

    // Check metadata
    if (!p.category) issues.push("Missing category");
    if (!p.family) issues.push("Missing family");
    if (!p.type) issues.push("Missing type");
    if (p.reducedMotion === undefined) issues.push("Missing reducedMotion flag");
    if (!p.className && typeof p.behavior !== 'function') issues.push("Missing className and behavior");
    
    if (issues.length > 0) report.missingMetadata++;

    // Assign status
    let status = "ready";
    if (p.ready === false || issues.length > 0) {
      status = "needs-review";
      report.needsReview++;
    } else {
      report.verified++;
    }

    // Record stats by category
    const cat = p.category || "uncategorized";
    if (!report.categories[cat]) report.categories[cat] = { total: 0, verified: 0, needsReview: 0 };
    report.categories[cat].total++;
    if (status === "ready") report.categories[cat].verified++;
    else report.categories[cat].needsReview++;

    report.details.push({
      name: p.name,
      status: status,
      issues: issues
    });
  });

  return report;
}
