
# Lumina Technical Architecture

This document outlines the architecture and implementation details for the Lumina high-performance website.

## 1. Tech Stack Overview
- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS
- **Motion Engine**: GSAP (GreenSock Animation Platform)
- **Scroll Engine**: Lenis (Studio Freight) for smooth momentum-based scrolling.
- **Visuals**: Canvas-based frame-scrubbing for high-performance interactive sequences.

## 2. Component Flow
The application follows a linear storytelling flow typical of premium hardware brands:

### Global Layout (`Layout.tsx`)
- **Lenis Implementation**: Initializes the smooth scroll instance.
- **Custom Cursor**: Integrates the `GlowingCursor` component globally.
- **GSAP Sync**: Updates GSAP `ScrollTrigger` instances on every Lenis scroll tick.

### Custom Cursor (`GlowingCursor.tsx`)
- **Orb & Tail**: A multi-element cursor that follows the mouse with variable inertia.
- **Iridescent Animation**: A CSS keyframe-based glow that cycles through cyan, purple, lime, and white.
- **Responsiveness**: Automatically disabled on touch devices using media queries (`pointer: fine`).

### Sections
1. **Hero Section (`Hero.tsx`)**: High-impact entry with staggered text reveals and a blurred image intro.
2. **Interactive Frame Scrubber (`FrameScrubber.tsx`)**:
   - Uses a `canvas` to render pre-cached images.
   - GSAP `ScrollTrigger` maps the scroll progress directly to the frame index.
   - Text overlays animate in and out based on specific scroll percentages.
3. **Feature Grid (`FeatureGrid.tsx`)**:
   - A 2x2 grid of hardware features.
   - Intersection-based entry animations (staggered translateY/opacity).
4. **CTA Section**: Final push for product interaction.

## 3. High Performance Considerations
- **Image Preloading**: Frame scrubbing sequences are preloaded into memory to ensure zero-lag scrubbing.
- **Canvas Rendering**: Using Canvas instead of <img> or <video> tags for scrubbing prevents layout thrashing and ensures 60FPS interaction.
- **GSAP quickTo**: Used for the cursor to bypass React state updates for mouse position, providing sub-millisecond response times.
- **Lenis Configuration**: Tuned easing (exponential) for a "heavy", premium feel.

## 4. Deployment Requirements
- **Node.js**: 16.x or higher.
- **Package Manager**: NPM or Yarn.
- **Environment**: Ensure GSAP and Lenis are correctly transpiled.

## 5. Future Scalability
- **WebGL Integration**: The current structure is ready to accept Three.js components within the GSAP ScrollTrigger timeline.
- **Asset Management**: For larger frame sequences, consider implementing a lazy-loading buffer.
