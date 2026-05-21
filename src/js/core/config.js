const defaultConfig = {
  debug: false,
  autoInit: true,
  reducedMotion: 'system' // 'system', 'reduce', or 'allow'
};

let currentConfig = { ...defaultConfig };

export function getConfig() {
  return currentConfig;
}

export function setConfig(userConfig = {}) {
  currentConfig = { ...currentConfig, ...userConfig };
  return currentConfig;
}
