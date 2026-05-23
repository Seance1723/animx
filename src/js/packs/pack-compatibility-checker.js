export function checkPackCompatibility(pack) {
  const result = {
    ok: true,
    supported: true,
    warnings: [],
    errors: []
  };

  if (!pack || !pack.compatibility) {
    result.warnings.push("No compatibility metadata provided");
    return result;
  }

  const requiredVersion = pack.compatibility.animx || "";
  
  // Simple check for >=3.29.0
  if (requiredVersion.includes("3.29.0")) {
    result.supported = true;
  } else if (requiredVersion) {
    // Basic fallback warning if it requires something specific that isn't trivially matched
    result.warnings.push(`Pack specifies AnimX version ${requiredVersion}. Current version is 3.29.0.`);
  }

  return result;
}
