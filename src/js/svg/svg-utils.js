// SVG Utility Helpers

// Find total length with caching
export function getSvgLength(element) {
  if (element.dataset.axSvgLength) {
    return parseFloat(element.dataset.axSvgLength);
  }
  
  let length = 0;
  if (typeof element.getTotalLength === 'function') {
    length = element.getTotalLength();
  } else if (element.tagName.toLowerCase() === 'rect') {
    const w = parseFloat(element.getAttribute('width') || 0);
    const h = parseFloat(element.getAttribute('height') || 0);
    length = (w + h) * 2;
  } else if (element.tagName.toLowerCase() === 'circle') {
    const r = parseFloat(element.getAttribute('r') || 0);
    length = 2 * Math.PI * r;
  } else if (element.tagName.toLowerCase() === 'line') {
    const x1 = parseFloat(element.getAttribute('x1') || 0);
    const y1 = parseFloat(element.getAttribute('y1') || 0);
    const x2 = parseFloat(element.getAttribute('x2') || 0);
    const y2 = parseFloat(element.getAttribute('y2') || 0);
    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  } else if (element.tagName.toLowerCase() === 'polyline' || element.tagName.toLowerCase() === 'polygon') {
    const pointsStr = element.getAttribute('points');
    if (pointsStr) {
      const points = pointsStr.trim().split(/[\s,]+/).map(parseFloat);
      for (let i = 0; i < points.length - 2; i += 2) {
        length += Math.sqrt(Math.pow(points[i+2] - points[i], 2) + Math.pow(points[i+3] - points[i+1], 2));
      }
      if (element.tagName.toLowerCase() === 'polygon' && points.length >= 4) {
        length += Math.sqrt(Math.pow(points[0] - points[points.length-2], 2) + Math.pow(points[1] - points[points.length-1], 2));
      }
    }
  }

  // Cache it
  if (length > 0) {
    element.dataset.axSvgLength = length.toString();
  }
  return length;
}

export function cleanInlineStyles(element, props) {
  props.forEach(p => {
    element.style.removeProperty(p);
  });
  if (element.getAttribute('style') === '') {
    element.removeAttribute('style');
  }
}
