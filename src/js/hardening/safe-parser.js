export function safeParseBoolean(val) {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') {
    const s = val.toLowerCase().trim();
    if (s === 'true' || s === '1' || s === 'yes') return true;
    if (s === 'false' || s === '0' || s === 'no') return false;
  }
  return false;
}

export function safeParseNumber(val, fallback = 0, min = -Infinity, max = Infinity) {
  let num = Number(val);
  if (isNaN(num)) return fallback;
  return Math.max(min, Math.min(num, max));
}

export function safeParseJson(jsonString, fallback = {}) {
  if (typeof jsonString !== 'string') return fallback;
  try {
    const parsed = JSON.parse(jsonString);
    // Note: prototype-guard should be run on the output if merging!
    return typeof parsed === 'object' && parsed !== null ? parsed : fallback;
  } catch (err) {
    return fallback;
  }
}
