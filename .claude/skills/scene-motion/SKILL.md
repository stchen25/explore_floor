---
name: scene-motion
description: Use when authoring or editing animation and the SVG assembly-line scene — conveyor, robotic arm, bins, the live-building robot, the build beat, screen transitions, the drag-to-bin gesture, or the results compare interaction. Encodes the hard Motion-vs-GSAP ownership boundary, the useGSAP discipline, and the shared motion tokens so the two engines never fight. Trigger on tasks touching /src/scene, GSAP, Motion (motion/react), AnimatePresence, drag, timelines, or DrawSVG/MorphSVG/MotionPath.
---

# Scene & motion authoring

Authoritative specs: `ARCHITECTURE.md` §1 (the two-engine model) and §5 (scene composition), `DESIGN_SYSTEM.md` §8 (motion tokens) and §10 (playful layer). This skill is the discipline that keeps the two animation engines from colliding. Pair it with the installed GSAP and Motion agent skills for library API correctness; **this** file is the source of truth for *our* conventions.

## The one hard rule
**A given element + property is owned by exactly one library at a time.** Motion runs through React's render cycle / WAAPI; GSAP writes straight to the DOM/SVG and bypasses React. They only break when both grab the same transform on the same node. Don't.

## Ownership map
- **Motion (`motion/react`, formerly framer-motion)** owns React-state / lifecycle / gesture motion: screen + route transitions (`AnimatePresence`), card enter/exit, the **drag-to-bin** gesture (`drag` + `dragConstraints`), hover/tap micro-interactions, results layout reflow (`layout`), the **compare** interaction, and the global `prefers-reduced-motion` gate. Pattern: declarative `motion.div` / `motion.svg` with variants.
- **GSAP** owns timeline-choreographed, multi-element scene sequences and SVG effects Motion can't do cleanly: conveyor item travel + arm reach + part-to-robot + snap as one timeline, the cinematic **build beat**, `DrawSVG` (linework draws in), `MorphSVG`, `MotionPath` (parts arc into robot slots).

Per-screen: **Landing** — Motion CTA; optional GSAP `DrawSVG` scene reveal (Phase 1). **Sort** — Motion drag + card UI; GSAP belt + (Phase 2) item-to-robot. **Build beat** — pure GSAP timeline (the showcase). **Results** — Motion layout/compare; GSAP (`Flip`/`MotionPath`) slides the robot between pedestals.

## GSAP discipline (non-negotiable)
- Every GSAP animation runs inside the **`useGSAP`** hook (`@gsap/react`) with a **scope ref**, so it auto-cleans on unmount via `gsap.context().revert()`.
- **Never** a bare `gsap.to(selector)` in a component.
- Register plugins **once** at app start: `gsap.registerPlugin(useGSAP, MorphSVGPlugin, DrawSVGPlugin, MotionPathPlugin)`.

## Tokens — one motion language across both engines (`DESIGN_SYSTEM.md` §8)
Durations and easings live in `/src/lib/motion.ts` and are read by **both** engines:
- durations: `instant` 100 · `snap` 200 · `glide` 400 · `pour` 700 · `reveal` 1000 (ms)
- easings: `ease-soft` (most UI) · `ease-snap` (overshoot for arm/part settle) · `ease-physical` (Motion spring)
Nothing animates in 0ms. Scene uses spring physics; UI cards use tweens. Respect `prefers-reduced-motion` (fast crossfade instead of physical motion).

## Scene rendering
Plain **SVG as React components** in `/src/scene/` (no canvas, no WebGL). `<Factory>` static bg, `<ConveyorBelt>`, `<ConveyorItem>`, `<RoboticArm>`, `<Bin>`, `<Robot>` (composes `parts/`). Named motion variants live alongside the component that uses them. Cap animated nodes to a few dozen; profile before optimizing.

## Before done
- Confirm no node has both engines on the same property.
- Confirm GSAP is inside `useGSAP` + scope.
- Confirm durations/easings are tokens, not literals.
- Sanity-check `prefers-reduced-motion` path exists.
- Consider running `/design-review` against `motion-quality.md`.
