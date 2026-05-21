export function parseInteractionAttributes(element) {
  if (!element || !element.dataset) return null;
  const ds = element.dataset;
  
  const interactions = {};
  let hasInteractions = false;
  
  if (ds.axHover !== undefined) {
    interactions.hover = {
      enter: ds.axHover,
      leave: ds.axHoverLeave || undefined
    };
    hasInteractions = true;
  }
  
  if (ds.axPress !== undefined) {
    interactions.press = ds.axPress;
    hasInteractions = true;
  }
  
  if (ds.axFocus !== undefined) {
    interactions.focus = ds.axFocus;
    hasInteractions = true;
  }
  
  if (ds.axRipple !== undefined) {
    interactions.ripple = {
      color: ds.axRippleColor || undefined,
      duration: ds.axRippleDuration ? parseInt(ds.axRippleDuration, 10) : undefined,
      centered: ds.axRippleCentered === 'true'
    };
    hasInteractions = true;
  }
  
  if (ds.axMagnetic !== undefined) {
    interactions.magnetic = {
      strength: ds.axMagneticStrength ? parseFloat(ds.axMagneticStrength) : undefined,
      radius: ds.axMagneticRadius ? parseFloat(ds.axMagneticRadius) : undefined,
      maxMove: ds.axMagneticMax ? parseFloat(ds.axMagneticMax) : undefined
    };
    hasInteractions = true;
  }
  
  if (ds.axTilt !== undefined) {
    interactions.tilt = {
      max: ds.axTiltMax ? parseFloat(ds.axTiltMax) : undefined,
      perspective: ds.axTiltPerspective ? parseFloat(ds.axTiltPerspective) : undefined,
      scale: ds.axTiltScale ? parseFloat(ds.axTiltScale) : undefined,
      glare: ds.axTiltGlare === 'true'
    };
    hasInteractions = true;
  }
  
  if (ds.axFeedback !== undefined) {
    interactions.feedback = ds.axFeedback; // error, success, warning, info
    hasInteractions = true;
  }
  
  return hasInteractions ? interactions : null;
}
