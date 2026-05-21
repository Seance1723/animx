const defaultConfig = {
  debug: false,
  autoInit: true,
  reducedMotion: 'system', // 'system', 'reduce', or 'allow'
  defaultDuration: 420,
  defaultEase: 'smooth',
  dataApi: true,
  scroll: {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
    once: true
  },
  stagger: {
    each: 100,
    from: 'start',
    startDelay: 0,
    axis: 'both'
  }
};

let currentConfig = { ...defaultConfig };

export function getConfig() {
  return currentConfig;
}

export function setConfig(userConfig = {}) {
  currentConfig = { ...currentConfig, ...userConfig };
  return currentConfig;
}
