import { setConfig, getConfig } from './core/config.js';
import { ready } from './core/dom-ready.js';
import { log } from './core/utils.js';
import { initDataAPI } from './data/data-api.js';
import { registerPreset, getPreset } from './presets/preset-registry.js';

const version = '0.0.1';

function init() {
  log(`AnimX v${version} initializing...`);
  initDataAPI();
  log('Initialization complete.');
}

const AnimX = {
  version,
  config: setConfig,
  init,
  ready,
  registerPreset,
  getPreset
};

// Auto-init logic placeholder if needed in the future
ready(() => {
  if (getConfig().autoInit) {
    // Currently autoInit doesn't do anything by default to not pollute console unless debug is on,
    // and init is mostly manual in v0.0.1 per requirements.
  }
});

// Attach to window
if (typeof window !== 'undefined') {
  window.AnimX = AnimX;
}

export default AnimX;
