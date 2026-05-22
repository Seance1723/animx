// svg-path-normalizer.js
// Helpers to convert DOM shapes to path 'd' strings and handle basic normalization

export function shapeToPathData(element) {
  if (!element || !element.tagName) return null;
  const tag = element.tagName.toLowerCase();

  if (tag === 'path') {
    return element.getAttribute('d');
  }

  if (tag === 'rect') {
    const x = parseFloat(element.getAttribute('x') || 0);
    const y = parseFloat(element.getAttribute('y') || 0);
    const w = parseFloat(element.getAttribute('width') || 0);
    const h = parseFloat(element.getAttribute('height') || 0);
    const rx = parseFloat(element.getAttribute('rx') || 0);
    const ry = parseFloat(element.getAttribute('ry') || 0);
    // Simple rect without rounded corners for now
    if (!rx && !ry) {
      return `M${x} ${y} H${x + w} V${y + h} H${x} Z`;
    }
  }

  if (tag === 'circle') {
    const cx = parseFloat(element.getAttribute('cx') || 0);
    const cy = parseFloat(element.getAttribute('cy') || 0);
    const r = parseFloat(element.getAttribute('r') || 0);
    // Circle using two bezier arcs
    return `M ${cx - r}, ${cy} 
            a ${r},${r} 0 1,0 ${r * 2},0 
            a ${r},${r} 0 1,0 -${r * 2},0`;
  }

  if (tag === 'ellipse') {
    const cx = parseFloat(element.getAttribute('cx') || 0);
    const cy = parseFloat(element.getAttribute('cy') || 0);
    const rx = parseFloat(element.getAttribute('rx') || 0);
    const ry = parseFloat(element.getAttribute('ry') || 0);
    return `M ${cx - rx}, ${cy} 
            a ${rx},${ry} 0 1,0 ${rx * 2},0 
            a ${rx},${ry} 0 1,0 -${rx * 2},0`;
  }

  if (tag === 'polygon' || tag === 'polyline') {
    const points = element.getAttribute('points');
    if (points) {
      const p = points.trim().split(/[\s,]+/).map(parseFloat);
      let d = '';
      for (let i = 0; i < p.length; i += 2) {
        d += (i === 0 ? 'M' : ' L') + p[i] + ' ' + p[i + 1];
      }
      if (tag === 'polygon') d += ' Z';
      return d;
    }
  }

  return null;
}

export function absolutizeCommands(commands) {
  let x = 0, y = 0;
  const absCommands = [];

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const type = cmd.type;
    const isRelative = type === type.toLowerCase();
    const upper = type.toUpperCase();
    const vals = [...cmd.values];

    const out = { type: upper, values: [] };

    if (upper === 'M' || upper === 'L') {
      out.values[0] = isRelative ? x + vals[0] : vals[0];
      out.values[1] = isRelative ? y + vals[1] : vals[1];
      x = out.values[0]; y = out.values[1];
    } else if (upper === 'H') {
      out.type = 'L';
      out.values[0] = isRelative ? x + vals[0] : vals[0];
      out.values[1] = y;
      x = out.values[0];
    } else if (upper === 'V') {
      out.type = 'L';
      out.values[0] = x;
      out.values[1] = isRelative ? y + vals[0] : vals[0];
      y = out.values[1];
    } else if (upper === 'C') {
      out.values[0] = isRelative ? x + vals[0] : vals[0];
      out.values[1] = isRelative ? y + vals[1] : vals[1];
      out.values[2] = isRelative ? x + vals[2] : vals[2];
      out.values[3] = isRelative ? y + vals[3] : vals[3];
      out.values[4] = isRelative ? x + vals[4] : vals[4];
      out.values[5] = isRelative ? y + vals[5] : vals[5];
      x = out.values[4]; y = out.values[5];
    } else if (upper === 'Z') {
      out.type = 'Z';
    } else {
      // Unhandled complex commands (A, S, Q, T) will just be copied as-is 
      // but warn during validation if they mismatch.
      out.type = type; // keep original relative/absolute for unsupported
      out.values = vals;
    }

    absCommands.push(out);
  }

  return absCommands;
}
