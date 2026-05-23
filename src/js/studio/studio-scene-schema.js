/**
 * AnimX Studio Scene Schema and Templates (v3.20.0)
 * Provides the base data model and templates for Advanced Timeline Scenes.
 */

export const SCENE_SCHEMA_VERSION = "1.0";
export const SCENE_SCHEMA_ID = "animx-timeline-scene";

export const DEFAULT_SCENE_TEMPLATES = [
  {
    schema: SCENE_SCHEMA_ID,
    schemaVersion: SCENE_SCHEMA_VERSION,
    animxVersion: "3.20.0",
    sceneId: "hero-intro-scene",
    name: "Hero Intro Scene",
    description: "Standard Hero title, copy, and CTA timeline sequence",
    type: "timeline-scene",
    trigger: "load",
    duration: "auto",
    settings: {
      ease: "smooth",
      reducedMotionSafe: true,
      autoplay: false,
      loop: false,
      yoyo: false
    },
    tracks: [
      { id: "track-text", name: "Text Elements", type: "text", collapsed: false, color: "blue" },
      { id: "track-ui", name: "UI Elements", type: "ui", collapsed: false, color: "green" }
    ],
    groups: [
      { id: "group-hero", name: "Hero Content", steps: ["step-1", "step-2"], collapsed: false }
    ],
    steps: [
      {
        id: "step-1",
        trackId: "track-text",
        groupId: "group-hero",
        target: ".hero-title",
        type: "text",
        preset: "text-mask-up",
        mode: "text",
        position: "0",
        duration: 800,
        delay: 0,
        options: { split: "lines", stagger: 80 },
        notes: "Main hero heading reveal"
      },
      {
        id: "step-2",
        trackId: "track-text",
        groupId: "group-hero",
        target: ".hero-copy",
        type: "preset",
        preset: "fade-up",
        position: "<+=200",
        duration: 600,
        delay: 0,
        options: {},
        notes: "Secondary copy reveal"
      },
      {
        id: "step-3",
        trackId: "track-ui",
        groupId: null,
        target: ".hero-cta",
        type: "preset",
        preset: "button-glow-soft",
        position: "+=100",
        duration: 300,
        delay: 0,
        options: {},
        notes: "CTA button pop"
      }
    ],
    exports: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    schema: SCENE_SCHEMA_ID,
    schemaVersion: SCENE_SCHEMA_VERSION,
    animxVersion: "3.20.0",
    sceneId: "scroll-story-scene",
    name: "Scroll Story Scene",
    description: "A sequence triggered by scrolling",
    type: "timeline-scene",
    trigger: "scroll",
    scroll: {
      start: "top 80%",
      end: "bottom 20%",
      scrub: false,
      once: true
    },
    settings: {
      ease: "smooth",
      reducedMotionSafe: true
    },
    tracks: [
      { id: "track-cards", name: "Cards", type: "ui", collapsed: false, color: "purple" }
    ],
    groups: [],
    steps: [
      {
        id: "step-1",
        trackId: "track-cards",
        target: ".story-card",
        type: "preset",
        preset: "fade-up",
        position: "0",
        duration: 600,
        options: { stagger: 100 },
        notes: "Cards stagger in"
      }
    ]
  }
];

export function createEmptyScene() {
  return {
    schema: SCENE_SCHEMA_ID,
    schemaVersion: SCENE_SCHEMA_VERSION,
    animxVersion: "3.20.0",
    sceneId: "custom-scene-" + Date.now(),
    name: "New Custom Scene",
    description: "",
    type: "timeline-scene",
    trigger: "load",
    duration: "auto",
    settings: {
      ease: "smooth",
      reducedMotionSafe: true,
      autoplay: false,
      loop: false,
      yoyo: false
    },
    tracks: [
      { id: "track-main", name: "Main Track", type: "default", collapsed: false, color: "gray" }
    ],
    groups: [],
    steps: [],
    exports: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
