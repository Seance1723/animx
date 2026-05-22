import './tests/setup.js';
import AnimX from './src/js/animx.js';

const presets = AnimX.getPresets();
console.log('Total presets:', presets.length);
console.log(presets[0]);
