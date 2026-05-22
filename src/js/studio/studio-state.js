// Basic observable state with localStorage sync
const STORAGE_KEY = 'animx_studio_state';

const defaultState = {
  mode: 'preset',
  template: 'hero',
  selectedElementId: 'template-hero-title',
  animation: 'fade-up',
  duration: 700,
  delay: 0,
  ease: '',
  trigger: '',
  stagger: 0,
  timelineSteps: []
};

let state = { ...defaultState };

const listeners = [];

export function getState() {
  return { ...state };
}

export function updateState(updates) {
  state = { ...state, ...updates };
  saveState();
  notify();
}

export function subscribe(fn) {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

function notify() {
  const current = getState();
  listeners.forEach(fn => fn(current));
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Fail safely
  }
}

export function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      state = { ...state, ...parsed };
    }
  } catch (e) {
    // Fail safely
  }
  return getState();
}

export function resetState() {
  state = { ...defaultState };
  saveState();
  notify();
}
