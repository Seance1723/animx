function parseArrayRange(str) {
  if (!str) return null;
  const parts = str.split(',').map(s => parseFloat(s.trim()));
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return parts;
  }
  return null;
}

export function parseAdvancedScrollAttributes(element) {
  const result = {};
  
  if (element.hasAttribute('data-ax-scroll-progress')) {
    result.scrollProgress = {
      x: parseArrayRange(element.getAttribute('data-ax-progress-x')),
      y: parseArrayRange(element.getAttribute('data-ax-progress-y')),
      opacity: parseArrayRange(element.getAttribute('data-ax-progress-opacity')),
      scale: parseArrayRange(element.getAttribute('data-ax-progress-scale')),
      scaleX: parseArrayRange(element.getAttribute('data-ax-progress-scale-x')),
      scaleY: parseArrayRange(element.getAttribute('data-ax-progress-scale-y')),
      rotate: parseArrayRange(element.getAttribute('data-ax-progress-rotate')),
      blur: parseArrayRange(element.getAttribute('data-ax-progress-blur')),
      progressVar: element.getAttribute('data-ax-progress-var'),
      start: element.getAttribute('data-ax-start'),
      end: element.getAttribute('data-ax-end')
    };
  }

  if (element.hasAttribute('data-ax-parallax')) {
    const speed = element.getAttribute('data-ax-parallax-speed');
    const depth = element.getAttribute('data-ax-parallax-depth');
    result.parallax = {
      x: parseArrayRange(element.getAttribute('data-ax-parallax-x')),
      y: parseArrayRange(element.getAttribute('data-ax-parallax-y')),
      speed: speed ? parseFloat(speed) : undefined,
      depth: depth ? parseFloat(depth) : undefined,
      start: element.getAttribute('data-ax-start'),
      end: element.getAttribute('data-ax-end')
    };
  }

  if (element.hasAttribute('data-ax-pin')) {
    result.pin = {
      target: element.getAttribute('data-ax-pin-target'),
      start: element.getAttribute('data-ax-pin-start'),
      end: element.getAttribute('data-ax-pin-end'),
      progressVar: element.getAttribute('data-ax-pin-progress-var')
    };
  }

  if (element.hasAttribute('data-ax-scene')) {
    result.scene = {
      enter: element.getAttribute('data-ax-enter'),
      leave: element.getAttribute('data-ax-leave'),
      once: element.getAttribute('data-ax-once') !== 'false',
      start: element.getAttribute('data-ax-start'),
      end: element.getAttribute('data-ax-end'),
      progressVar: element.getAttribute('data-ax-scene-progress-var')
    };
  }

  if (element.hasAttribute('data-ax-reading-progress')) {
    result.readingProgress = {
      container: element.getAttribute('data-ax-reading-container'),
      axis: element.getAttribute('data-ax-reading-axis'),
      progressVar: element.getAttribute('data-ax-reading-var')
    };
  }

  return Object.keys(result).length > 0 ? result : null;
}
