export function ready(callback) {
  if (typeof callback !== 'function') return;
  if (typeof document === 'undefined') {
    callback();
    return;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}
