export function validatePackage(pkgString) {
  let pkg;
  try {
    pkg = JSON.parse(pkgString);
  } catch (e) {
    return { ok: false, errors: ["Invalid JSON format."] };
  }
  
  const errors = [];
  const warnings = [];
  
  if (pkg.schema !== "animx-package") {
    errors.push("Missing or invalid schema identifier.");
  }
  
  if (pkg.schemaVersion !== "1.0") {
    warnings.push(`Unknown schema version: ${pkg.schemaVersion}. Package might not load fully.`);
  }
  
  if (!pkg.project || !pkg.project.sections) {
    errors.push("Package does not contain a valid project structure.");
  }
  
  // Checking for malicious nested scripts inside string representations of HTML is handled 
  // by studio-import-safety when it renders, but we can do a quick regex check here
  const pkgStr = JSON.stringify(pkg).toLowerCase();
  if (pkgStr.includes('<script>') || pkgStr.includes('javascript:')) {
    errors.push("Security Check Failed: Package contains script tags or javascript protocols.");
  }
  
  return {
    ok: errors.length === 0,
    errors,
    warnings,
    package: pkg
  };
}
