import { scheduler } from '../core/scheduler.js';
import { updateGlobalScrollY } from './scroll-metrics.js';

const scrollInstances = new Set();
let isListening = false;
let resizeTimeout = null;

function onScroll() {
  updateGlobalScrollY();
  scheduler.read(processScrollInstances);
}

function onResize() {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    refreshScrollMetrics();
  }, 150);
}

function processScrollInstances() {
  scrollInstances.forEach(instance => {
    if (instance.isActive && instance.isActive()) {
      if (instance.updateMetricsIfNeeded) instance.updateMetricsIfNeeded();
      instance.onScroll();
    }
  });
}

function startListening() {
  if (isListening || typeof window === 'undefined') return;
  isListening = true;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
}

function stopListening() {
  if (!isListening || typeof window === 'undefined') return;
  isListening = false;
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
}

export function registerScrollInstance(instance) {
  scrollInstances.add(instance);
  if (!isListening) startListening();
  
  // Initial run
  scheduler.read(() => {
    updateGlobalScrollY();
    if (instance.refreshMetrics) instance.refreshMetrics();
    if (instance.onScroll) instance.onScroll();
  });
}

export function unregisterScrollInstance(instance) {
  scrollInstances.delete(instance);
  if (scrollInstances.size === 0) {
    stopListening();
  }
}

export function refreshScrollMetrics() {
  scheduler.read(() => {
    updateGlobalScrollY();
    scrollInstances.forEach(instance => {
      if (instance.refreshMetrics) instance.refreshMetrics();
      if (instance.onScroll) instance.onScroll();
    });
  });
}

export function clearScrollTicker() {
  scrollInstances.clear();
  stopListening();
}
