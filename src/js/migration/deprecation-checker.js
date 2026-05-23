/**
 * AnimX Deprecation Checker (v3.20.0)
 * Formal map of all API aliases mapped to their modern equivalents.
 */

export function getDeprecations() {
  return {
    version: "3.20.0",
    deprecations: [
      {
        old: "data-ax-trigger",
        new: "data-ax-on",
        status: "alias-supported",
        removeIn: null,
        note: "Alias remains supported for CMS/no-code users."
      },
      {
        old: "data-ax-preset",
        new: "data-ax",
        status: "alias-supported",
        removeIn: null,
        note: "Alias supported for backward compatibility."
      },
      {
        old: "AnimX.timeline() without version flag",
        new: "AnimX.timeline({ version: 2 })",
        status: "warn",
        removeIn: "4.0.0",
        note: "Timeline arrays should now be wrapped in tracks."
      }
    ]
  };
}
