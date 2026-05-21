// performance-monitor.js
import { getConfig } from './config.js';
import { debug } from './debug.js';

let activeElements = 0;
let refreshCalls = 0;

export const performanceMonitor = {
  trackElement() {
    const perfConfig = getConfig().performance;
    if (perfConfig && perfConfig.monitor) {
      activeElements++;
      if (perfConfig.warnLargeBatch && activeElements > perfConfig.largeBatchLimit) {
        debug.warnOnce('large-batch', `High number of animated elements tracked (${activeElements}). Consider pagination or strict scroll observers.`);
      }
    }
  },
  untrackElement() {
    if (activeElements > 0) activeElements--;
  },
  trackRefresh() {
    const perfConfig = getConfig().performance;
    if (perfConfig && perfConfig.monitor) {
      refreshCalls++;
      if (refreshCalls > 50) {
        debug.warnOnce('many-refresh', `High number of AnimX.refresh() calls (${refreshCalls}). Ensure it is not called on every scroll/resize event.`);
      }
    }
  },
  getStats() {
    return { activeElements, refreshCalls };
  }
};
