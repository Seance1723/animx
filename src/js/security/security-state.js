import { getConfig, setConfig } from '../core/config.js';

export function getSecurityConfig() {
  const config = getConfig();
  return config.security || {
    safeMode: true,
    allowHTMLStringSwap: false,
    blockScriptHTML: true,
    blockInlineEventHandlers: true,
    blockJavascriptURLs: true,
    safeObjectMerge: true,
    validateSelectors: true,
    validateDataAttributes: true,
    freezePresetMetadata: false,
    debugWarnings: true
  };
}
