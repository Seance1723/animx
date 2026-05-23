/**
 * AnimX Studio Project JSON Migrator (v3.15.0)
 * Ensures old v3.2.0 payload exports can still be loaded without errors.
 */

export function migrateProject(projectJsonStr, options = { dryRun: true }) {
  const result = {
    ok: false,
    from: "unknown",
    to: "3.15.0",
    migrated: null,
    changes: [],
    warnings: [],
    errors: []
  };

  try {
    // Safe parse, blocking Prototype Pollution
    if (projectJsonStr.includes('__proto__') || projectJsonStr.includes('constructor')) {
      result.errors.push("Prototype Pollution detected. Migration aborted safely.");
      return result;
    }

    const data = JSON.parse(projectJsonStr);
    
    // Convert old `v2` timeline projects to `v3.9.0` scenes
    if (data.type === 'animx-timeline' && !data.tracks) {
      result.changes.push("Converted flat timeline to track-based schema (v3.9.0).");
      data.tracks = [{ id: 'track_migrated', name: 'Main', steps: data.steps || [] }];
      delete data.steps;
    }
    
    // Wrap generic project export in modern package format
    if (!data.version) {
      result.warnings.push("No version found on source. Assuming v3.0.0.");
      result.from = "3.0.0";
    } else {
      result.from = data.version;
    }

    data.version = "3.15.0";
    
    result.ok = true;
    result.migrated = data;
    
  } catch (e) {
    result.errors.push("Failed to parse JSON: " + e.message);
  }

  return result;
}
