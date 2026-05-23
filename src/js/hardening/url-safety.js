export function isSafeUrl(url) {
  if (typeof url !== 'string') return false;
  const lowerUrl = url.toLowerCase().trim();
  if (lowerUrl.startsWith('javascript:')) return false;
  if (lowerUrl.startsWith('vbscript:')) return false;
  if (lowerUrl.startsWith('file:')) return false;
  if (lowerUrl.startsWith('data:') && !lowerUrl.startsWith('data:image/')) return false;
  return true;
}

export function sanitizeUrl(url) {
  return isSafeUrl(url) ? url : '#';
}
