export const optionDefinitions = {
  duration: { type: 'number', default: 800, min: 100, max: 3000 },
  delay: { type: 'number', default: 0, min: 0, max: 2000 },
  stagger: { type: 'number', default: 50, min: 10, max: 500 },
  easing: { type: 'select', default: 'ease-out', options: ['ease-out', 'ease-in-out', 'spring'] },
  intensity: { type: 'range', default: 50, min: 0, max: 100 }
};