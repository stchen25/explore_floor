---
rubric: motion-quality
name: Motion Quality
applies_to: [tsx, ts]
version: 1
severity_defaults:
  default: p2
source:
  - docs/DESIGN_SYSTEM.md §8
  - docs/ARCHITECTURE.md §1, §5
sections:
  tokens:
    order: 1
    title: Motion tokens
    criteria:
      - id: durations-from-tokens
        severity: p2
        check: Durations come from the motion token set (instant/snap/glide/pour/reveal)
      - id: easings-from-tokens
        severity: p2
        check: Easings use the named curves (ease-soft, ease-snap, ease-physical)
      - id: nothing-instant
        severity: p3
        check: Nothing animates in 0ms; even fast changes get at least the instant token
  ownership:
    order: 2
    title: Engine ownership
    criteria:
      - id: no-crossed-engines
        severity: p1
        check: Motion and GSAP never animate the same property on the same node
      - id: motion-owns-state
        severity: p2
        check: React-state/gesture-driven motion uses Motion, not GSAP
      - id: gsap-owns-scene
        severity: p2
        check: Timeline/scene choreography uses GSAP inside useGSAP with a scope ref
      - id: gsap-cleanup
        severity: p2
        check: Every GSAP animation is scoped and auto-reverted on unmount (useGSAP)
  accessibility:
    order: 3
    title: Reduced motion & performance
    criteria:
      - id: reduced-motion
        severity: p1
        check: prefers-reduced-motion is respected (fast crossfades replace physical motion)
      - id: sixty-fps
        severity: p2
        check: Animations hold 60fps at normal viewport on a mid-range laptop
      - id: spring-vs-tween
        severity: p3
        check: Scene uses spring physics, UI cards use tweens, per the motion principles
---

Checks that motion is consistent, correctly owned across the two animation engines, accessible, and performant. The two-engine model is the most error-prone part of the build, so the ownership section is weighted heavily.

## Scope & Grounding

**Personas**
- *Riley (16-18)* — motion should make the experience feel alive and satisfying (the part snap, the build beat), never frantic or laggy.
- *Motion-sensitive user* — must get a calm, reduced-motion experience that still works end to end.
- *ARM client on a conference-room laptop* — it must run at 60fps on mid-range hardware.

**Realistic scenarios**
- Dragging a card to a bin uses Motion's `drag`; the part flying into the robot and the snap use a GSAP timeline. They touch different nodes/properties.
- With `prefers-reduced-motion`, the build beat becomes a quick crossfade instead of a physical sequence.

**Anti-scenarios (should fail)**
- Motion and GSAP both write `transform` on the robot node, causing a fight/jank.
- A bare `gsap.to(selector)` runs in a component without `useGSAP`/scope, leaking on unmount.
- A hard-coded `duration: 0.35` instead of a token.
- A physical spring sequence plays regardless of `prefers-reduced-motion`.

## 1. Motion tokens
Durations (`instant` 100 / `snap` 200 / `glide` 400 / `pour` 700 / `reveal` 1000) and easings (`ease-soft`, `ease-snap`, `ease-physical`) live in `/src/lib/motion.ts` and are shared by **both** engines so the feel is unified. Nothing is truly instant — even taps get the 100ms token.

## 2. Engine ownership
The hard rule: **a given element + property is owned by exactly one library at a time.** Motion owns React-state/gesture/lifecycle motion (screen transitions, drag-to-bin, hover/tap, results layout/compare). GSAP owns timeline-choreographed scene sequences (conveyor + arm + part-to-robot + snap, the build beat, DrawSVG/MorphSVG/MotionPath). All GSAP runs inside `useGSAP` with a scope ref and auto-reverts on unmount; plugins registered once at app start. No bare `gsap` selectors in components.

## 3. Reduced motion & performance
`prefers-reduced-motion` is respected globally (Motion gate) — sensitive users get fast crossfades instead of physical motion. Hold 60fps at normal viewport on a mid-range laptop; profile before optimizing. Scene uses spring physics, UI cards use tweens.

## Application
Run via `/design-review` (observe motion live; toggle reduced-motion) and by reading the animation code for engine-ownership and `useGSAP` discipline. p1 findings (crossed engines, missing reduced-motion) block; cite file:line.

## Cross-references
`design-system-compliance.md` (motion-from-tokens), `ARCHITECTURE.md` §1 (the ownership rule + useGSAP pattern), `.claude/skills/scene-motion` (authoring discipline), `DESIGN_SYSTEM.md` §8 (tokens & principles).
