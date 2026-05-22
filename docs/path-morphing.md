# Path Validation and Compatibility

AnimX interpolates `d` strings by iterating through command lists (e.g., `M`, `L`, `C`, `Z`).

If Path A has 4 commands and Path B has 4 commands of the same type, AnimX interpolates them beautifully. 
If Path A has 4 commands and Path B has 35 commands, they cannot be natively lerped without heavy computational geometric subdivision (like Flubber or GSAP MorphSVG).

AnimX will detect this and safely abort the morph loop, utilizing the fallback strategy (fade or jump).

## Validation API
If you are dynamically injecting paths and want to verify if they are compatible:

```javascript
const result = AnimX.validateMorph(pathA, pathB);

if (result.ok) {
  console.log('Paths are compatible!', result.strategy); // "direct" or "normalized"
} else {
  console.warn('Incompatible: ', result.reason);
}
```

## Normalization
If paths are structurally similar but differ slightly (e.g., one uses absolute `L`, the other uses relative `l`), AnimX will automatically attempt to **normalize** them into absolute coordinates before morphing.
