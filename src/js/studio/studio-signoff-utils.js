export function createSignoffBadge(status) {
  const el = document.createElement('span');
  el.className = `ax-badge ax-badge-${status}`;
  el.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  return el;
}

export function formatSignoffDate() {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
