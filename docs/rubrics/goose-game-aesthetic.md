---
rubric: goose-game-aesthetic
name: Goose-Game Aesthetic
applies_to: [tsx, svg]
version: 1
severity_defaults:
  default: p2
source:
  - docs/DESIGN_SYSTEM.md §10
  - docs/PRD.md §10
  - "TODO: RC.org reference stills (capture in Phase 1 — see DECISIONS D-011)"
sections:
  linework:
    order: 1
    title: Linework & form
    criteria:
      - id: stroke-weight
        severity: p2
        check: SVG outlines sit around 1.5-2.5px on the 1500px canvas with slight variation
      - id: built-not-rendered
        severity: p2
        check: The robot reads as built from parts (visible joints) not as a 3D render
      - id: soft-corners
        severity: p3
        check: Forms feel hand-drawn-confident, not razor-tight vector
  palette:
    order: 2
    title: Warmth & fills
    criteria:
      - id: warm-muted
        severity: p2
        check: Scene fills are warm and muted, using scene/* paper tones not clinical grays
      - id: desaturated-accents
        severity: p3
        check: Brand accents appear slightly desaturated when used inside the scene
      - id: ground-shadows
        severity: p3
        check: Objects get soft ground shadows for weight, not hard outlines pinning them
  space:
    order: 3
    title: Negative space & calm
    criteria:
      - id: breathing-room
        severity: p2
        check: Backgrounds use negative space and are not decorated to death
      - id: calm-motion
        severity: p2
        check: Ambient motion is gentle and never frantic or distracting
  tone:
    order: 4
    title: Tone (the anti-scenarios)
    criteria:
      - id: not-childish
        severity: p1
        check: Nothing reads as childish (no cartoon overload, no smiley-face robots)
      - id: not-neon
        severity: p1
        check: Nothing reads as saturated-neon arcade
      - id: not-corporate
        severity: p2
        check: The scene leans warm and crafted, not corporate-clinical
---

Judges the *taste* of the playful layer — whether the assembly-line scene and robot land as Untitled-Goose-Game-adjacent: calm, warm, lightly hand-crafted, charming without clutter. This is the build's differentiator and the hardest thing to nail. System conformance (exact tokens) is `design-system-compliance.md`'s job; this rubric judges feel.

> **Grounding note:** until we capture RC.org reference stills (Phase 1, D-011), ground judgments in `DESIGN_SYSTEM.md` §10 and the Goose-game reference. Add a "better than the dated current Explore the Floor, in the same family as RC.org" before/after check once stills exist.

## Scope & Grounding

**Personas**
- *Riley (16-18)* — should find it charming and worth finishing; not talked down to. Reading age ~9th grade, *visual* age 16-18.
- *Parent over the shoulder* — should read it as tasteful and credible in 30 seconds.
- *ARM client* — should see a refined cousin of their current scene, not a neon game or a kids' app.

**Realistic scenarios**
- A user keeps "shop class or robotics club" and a mini robotic-arm part snaps onto their robot with a small, satisfying settle.
- The conveyor surface has subtle texture and the arm has a faint idle hover — present but never distracting.

**Anti-scenarios (should fail)**
- The robot has a big smiley face and bouncy cartoon limbs.
- The scene is saturated neon with hard glows (the dead Make.md direction).
- The background is busy/decorated edge-to-edge with no negative space.
- The robot looks like a polished 3D render rather than something built from parts.

## 1. Linework & form
Confident, slightly imperfect outlines (~1.5-2.5px on the 1500px canvas, with slight stroke variation for a "drawn" quality). The robot's parts look *attached* — visible joints (small circles), pieces that read as built, not seamlessly merged or ray-traced.

## 2. Warmth & fills
Warm, muted fills from the `scene/*` namespace (`scene-paper` cream, soft mid-tones). Brand accents appear at slightly desaturated tints inside the scene. Weight comes from soft ground shadows (`scene-shadow`), not hard grid-pinning outlines.

## 3. Negative space & calm
Backgrounds breathe. Ambient motion (arm idle, conveyor texture) is gentle and slow enough to never distract from sorting. Calm > busy.

## 4. Tone — the three "nots"
Not childish (the user is 16-18, not 9), not saturated-neon, not corporate. When in doubt, warmer and quieter. A finding here is high-severity because tone is the whole point of the playful layer.

## Application
Run via `/design-review` against the landing scene, the sort scene mid-interaction, the build beat, and the results pedestal. Because this is subjective, the reviewer should describe *what* reads off-tone and *why*, cite the screenshot, and propose a concrete adjustment (e.g. "desaturate the accent tint", "reduce stroke to 2px", "add negative space above the conveyor").

## Cross-references
`design-system-compliance.md` (tokens/color), `motion-quality.md` (calm motion), `PRD.md` §6 (robot), `DESIGN_SYSTEM.md` §10 (playful layer).
