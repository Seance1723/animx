const motionStyles = [
  {
    id: "smooth-professional",
    name: "Smooth & Professional",
    duration: 700,
    ease: "ease-out",
    stagger: 120,
    reducedMotionSafe: true
  },
  {
    id: "bold-launch",
    name: "Bold Launch",
    duration: 900,
    ease: "spring",
    stagger: 150,
    reducedMotionSafe: false
  },
  {
    id: "minimal-subtle",
    name: "Minimal Subtle",
    duration: 400,
    ease: "linear",
    stagger: 50,
    reducedMotionSafe: true
  },
  {
    id: "energetic-startup",
    name: "Energetic Startup",
    duration: 500,
    ease: "spring",
    stagger: 80,
    reducedMotionSafe: false
  }
];

export function getMotionStyles() {
  return motionStyles;
}

export function getMotionStyleById(id) {
  return motionStyles.find(m => m.id === id);
}
