// svg-path-parser.js
// Minimal tokenizer to convert SVG path 'd' strings into command arrays

export function parsePathString(d) {
  if (!d) return [];

  // Match command letters and numbers (including negatives and decimals)
  // E.g. "M10 10" -> ["M", "10", "10"]
  const regex = /([mzlhvcsqta])|([-+]?(?:\d*\.)?\d+(?:[eE][-+]?\d+)?)/ig;
  const tokens = d.match(regex);
  if (!tokens) return [];

  const commands = [];
  let currentCommand = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (/[mzlhvcsqta]/i.test(token)) {
      currentCommand = { type: token, values: [] };
      commands.push(currentCommand);
    } else {
      if (!currentCommand) {
        // Implicit 'M' if starting with numbers, though invalid strict SVG, browsers forgive it
        currentCommand = { type: 'M', values: [] };
        commands.push(currentCommand);
      }
      currentCommand.values.push(parseFloat(token));
    }
  }

  // Handle implicit polyline commands. If an M command has more than 2 values, the rest are implicit L.
  const normalizedCommands = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const type = cmd.type;
    const values = cmd.values;
    const upper = type.toUpperCase();

    if (upper === 'M' && values.length > 2) {
      normalizedCommands.push({ type: type, values: [values[0], values[1]] });
      const lType = type === 'm' ? 'l' : 'L';
      for (let j = 2; j < values.length; j += 2) {
        normalizedCommands.push({ type: lType, values: [values[j], values[j + 1]] });
      }
    } else if (upper === 'Z' || upper === 'H' || upper === 'V') {
      normalizedCommands.push(cmd);
    } else {
      // For simplicity in this engine, we assume the user provides explicit commands for C, Q, etc.
      // E.g. C x1 y1 x2 y2 x y. If there are multiples, we split them.
      let chunk = 2;
      if (upper === 'C') chunk = 6;
      else if (upper === 'S' || upper === 'Q') chunk = 4;
      else if (upper === 'A') chunk = 7;
      
      if (values.length > chunk) {
        for (let j = 0; j < values.length; j += chunk) {
          normalizedCommands.push({ type: type, values: values.slice(j, j + chunk) });
        }
      } else {
        normalizedCommands.push(cmd);
      }
    }
  }

  return normalizedCommands;
}

export function buildPathString(commands) {
  let str = '';
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    str += cmd.type + (cmd.values.length ? ' ' + cmd.values.join(' ') : '') + ' ';
  }
  return str.trim();
}
