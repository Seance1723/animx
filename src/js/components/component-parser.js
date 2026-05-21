export function parseComponentAttributes(element) {
  if (!element || !element.dataset) return null;
  const ds = element.dataset;
  
  if (!ds.axComponent) return null;
  
  const presetName = ds.axComponent;
  const trigger = ds.axComponentOn || ds.axOn || null;
  
  // Extract simple options
  const options = {
    duration: ds.axDuration ? parseInt(ds.axDuration, 10) : undefined,
    delay: ds.axDelay ? parseInt(ds.axDelay, 10) : undefined,
    ease: ds.axEase || undefined,
    color: ds.axRippleColor || undefined,
    strength: ds.axMagneticStrength ? parseFloat(ds.axMagneticStrength) : undefined,
    radius: ds.axMagneticRadius ? parseFloat(ds.axMagneticRadius) : undefined,
    maxMove: ds.axMagneticMax ? parseFloat(ds.axMagneticMax) : undefined,
    max: ds.axTiltMax ? parseFloat(ds.axTiltMax) : undefined,
    perspective: ds.axTiltPerspective ? parseFloat(ds.axTiltPerspective) : undefined,
    scale: ds.axTiltScale ? parseFloat(ds.axTiltScale) : undefined,
    glare: ds.axTiltGlare === 'true'
  };
  
  return {
    presetName,
    trigger,
    options
  };
}
