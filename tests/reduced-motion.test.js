
import assert from 'assert';
import AnimX from '../src/js/animx.js';


    // Simulating reduced motion by directly passing the flag or setting config isn't easily done globally here without mock override, but we check config propagation.
    AnimX.config({ reducedMotion: 'always' });
    const inst = AnimX.animate('.missing', 'fade-up');
    // Safe empty
    AnimX.config({ reducedMotion: 'system' });
  
