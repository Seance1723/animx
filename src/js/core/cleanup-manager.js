// cleanup-manager.js
export function createCleanupBucket() {
  const cleanups = new Set();
  
  return {
    add(fn) {
      if (typeof fn === 'function') {
        cleanups.add(fn);
      }
    },
    run() {
      cleanups.forEach(fn => {
        try { fn(); } catch (e) { /* ignore cleanup errors */ }
      });
      cleanups.clear();
    },
    clear() {
      cleanups.clear();
    }
  };
}
