# Public Api Reference

AnimX v3.33.0 Documentation.

This document covers public api reference.

> **Zero Dependency:** AnimX requires no external libraries.

## Core
- AnimX.version
- AnimX.versionInfo()
- AnimX.config()
- AnimX.init()
- AnimX.refresh()
- AnimX.destroy()
- AnimX.animate()
- AnimX.registerPreset()
- AnimX.getPreset()
- AnimX.getPresets()
- AnimX.searchPresets()

## Timeline / Stagger / Scroll
- AnimX.timeline()
- AnimX.stagger()
- AnimX.scroll()
- AnimX.scrollReveal()
- AnimX.scrollProgress()
- AnimX.refreshScroll()

## Text
- AnimX.text()
- AnimX.splitText()
- AnimX.revertText()
- AnimX.rollText()
- AnimX.slotText()
- AnimX.scrollText()
- AnimX.kineticText()
- AnimX.scrambleText()
- AnimX.typeText()
- AnimX.marqueeText()
- AnimX.counterText()
- AnimX.validateTextEffect()

## Media
- AnimX.media()
- AnimX.imageReveal()
- AnimX.imageMask()
- AnimX.mediaHover()
- AnimX.videoMotion()
- AnimX.gallery()
- AnimX.beforeAfter()
- AnimX.validateMediaEffect()

## Interaction
- AnimX.button()
- AnimX.link()
- AnimX.nav()
- AnimX.dropdown()
- AnimX.mobileMenu()
- AnimX.ripple()
- AnimX.magnetic()
- AnimX.buttonState()
- AnimX.validateInteractionEffect()

## Data UI
- AnimX.card()
- AnimX.grid()
- AnimX.list()
- AnimX.table()
- AnimX.dashboard()
- AnimX.kpi()
- AnimX.chartReveal()
- AnimX.validateDataUIEffect()

## Feedback
- AnimX.form()
- AnimX.input()
- AnimX.modal()
- AnimX.drawer()
- AnimX.toast()
- AnimX.tooltip()
- AnimX.popover()
- AnimX.accordion()
- AnimX.validateFeedbackEffect()

## Background
- AnimX.background()
- AnimX.gradient()
- AnimX.meshGradient()
- AnimX.aurora()
- AnimX.orbs()
- AnimX.blobs()
- AnimX.spotlight()
- AnimX.cursorGlow()
- AnimX.particleLite()
- AnimX.atmosphere()
- AnimX.validateBackgroundEffect()

## SVG
- AnimX.svg()
- AnimX.svgDraw()
- AnimX.svgMorph()
- AnimX.svgPathFollow()
- AnimX.svgRoute()
- AnimX.icon()
- AnimX.logo()
- AnimX.infographic()
- AnimX.svgChart()
- AnimX.validateSVGEffect()

## Transitions
- AnimX.pageTransition()
- AnimX.sectionTransition()
- AnimX.routeMotion()
- AnimX.viewTransition()
- AnimX.contentSwap()
- AnimX.sharedElement()
- AnimX.validateTransition()

## Composer / State / Rules
- AnimX.compose()
- AnimX.chain()
- AnimX.registerVariant()
- AnimX.getVariant()
- AnimX.validateChain()
- AnimX.state()
- AnimX.setState()
- AnimX.getState()
- AnimX.toggleState()
- AnimX.rule()
- AnimX.when()
- AnimX.trigger()
- AnimX.validateRule()

## Scroll Stories / Responsive
- AnimX.scrollStory()
- AnimX.responsiveMotion()
- AnimX.viewportMotion()
- AnimX.validateScrollStory()

## 3D / Spatial
- AnimX.threeD()
- AnimX.spatial()
- AnimX.depth()
- AnimX.depthScene()
- AnimX.validate3D()

## Physics / Easing
- AnimX.registerEase()
- AnimX.getEase()
- AnimX.getEases()
- AnimX.physics()
- AnimX.spring()
- AnimX.inertia()
- AnimX.snap()
- AnimX.elastic()
- AnimX.validatePhysics()

## CMS / Packs
- AnimX.cms()
- AnimX.refreshCMS()
- AnimX.observeCMS()
- AnimX.disconnectCMS()
- AnimX.applyRecipe()
- AnimX.registerRecipe()
- AnimX.validateCMSRecipe()
- AnimX.registerPack()
- AnimX.getPack()
- AnimX.importPack()
- AnimX.exportPack()
- AnimX.validatePack()

## Compatibility
- AnimX.supports()
- AnimX.getFeatureSupport()
- AnimX.getBrowserInfo()
- AnimX.getFallback()
- AnimX.registerFallback()
- AnimX.validateFallbacks()
- AnimX.compatReport()
