// SVG Data Attribute Parser

export function parseSvgAttributes(element) {
  const type = element.getAttribute('data-ax-svg');
  if (!type) return null;

  const options = {
    type: type,
    target: element.getAttribute('data-ax-svg-target') || null,
    value: parseFloat(element.getAttribute('data-ax-value')),
    max: parseFloat(element.getAttribute('data-ax-max')) || 100,
    path: element.getAttribute('data-ax-path') || null,
    rotate: element.getAttribute('data-ax-rotate') === 'true',
    loop: element.getAttribute('data-ax-loop') === 'true',
    duration: parseInt(element.getAttribute('data-ax-duration'), 10),
    delay: parseInt(element.getAttribute('data-ax-delay'), 10),
    ease: element.getAttribute('data-ax-ease'),
    stagger: parseInt(element.getAttribute('data-ax-stagger'), 10)
  };

  // Clean NaN
  if (isNaN(options.value)) delete options.value;
  if (isNaN(options.duration)) delete options.duration;
  if (isNaN(options.delay)) delete options.delay;
  if (isNaN(options.stagger)) delete options.stagger;

  return options;
}
