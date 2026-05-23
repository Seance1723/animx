export function auditPack(pack) {
  const result = {
    ok: true,
    errors: [],
    warnings: [],
    blocked: []
  };

  try {
    const packStr = JSON.stringify(pack);

    // Block prototype pollution keys
    if (packStr.includes('__proto__') || packStr.includes('constructor":') || packStr.includes('prototype":')) {
      result.ok = false;
      result.blocked.push("Prototype pollution detected (__proto__ / constructor)");
    }

    // Block inline scripts and URLs
    if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(packStr)) {
      result.ok = false;
      result.blocked.push("Contains <script> tags");
    }

    if (/javascript:/i.test(packStr)) {
      result.ok = false;
      result.blocked.push("Contains javascript: URI");
    }

    if (/on(load|click|mouseover|error|change|submit)=/i.test(packStr)) {
      result.ok = false;
      result.blocked.push("Contains inline event handlers");
    }

    // Check remote references (warning)
    if (/http(s)?:\/\//i.test(packStr) && !packStr.includes("animx.org")) {
      result.warnings.push("Contains external URLs (ensure they are safe)");
    }

  } catch (err) {
    result.ok = false;
    result.errors.push(`JSON serialization failed: ${err.message}`);
  }

  return result;
}
