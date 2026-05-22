export function safeSelector(selectorString) {
  const result = {
    ok: true,
    selector: null,
    error: null
  };

  if (typeof selectorString !== 'string') {
    result.ok = false;
    result.error = 'Selector must be a string';
    return result;
  }

  try {
    if (typeof document !== 'undefined') {
      document.querySelector(selectorString); // Will throw if invalid
    }
    result.selector = selectorString;
  } catch (e) {
    result.ok = false;
    result.error = e.message;
  }

  return result;
}
