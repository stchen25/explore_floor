---
rubric: design-system-compliance
name: Design System Compliance
applies_to: [tsx, css, tailwind-config]
version: 1
severity_defaults:
  default: p2
source:
  - docs/DESIGN_SYSTEM.md
  - docs/ARCHITECTURE.md §1, §11
  - "RC-CC Figma design system (yGDi4yDtptKttboTYV8on7)"
sections:
  tokens:
    order: 1
    title: Tokens, not literals
    criteria:
      - id: no-inline-hex
        severity: p1
        check: Color values come from Tailwind tokens, never inline hex
      - id: no-magic-px
        severity: p2
        check: Spacing, radius, and size values use scale tokens, not arbitrary pixels
      - id: motion-from-tokens
        severity: p2
        check: Durations and easings read from the motion tokens, not literals
  color:
    order: 2
    title: Color usage
    criteria:
      - id: archetype-mapping
        severity: p1
        check: Builder uses arm-orange, Innovator uses arm-blue, Architect uses arm-teal
      - id: yellow-reserved
        severity: p2
        check: arm-yellow signals brand/global only, never an archetype
      - id: no-neon
        severity: p1
        check: No Make.md neon colors (06ffa5, 00d9ff, ff006e) appear anywhere
      - id: light-mode-only
        severity: p2
        check: No dark-mode variants or dark backgrounds are introduced
  type:
    order: 3
    title: Typography
    criteria:
      - id: families
        severity: p1
        check: Headings use Montserrat and body uses Roboto, no other families
      - id: scale
        severity: p2
        check: Text sizes come from the type scale (h1-h5, body, small)
      - id: role-usage
        severity: p3
        check: Type roles match usage (H1 hero, H2 screen title, match % as H2 in accent)
  space:
    order: 4
    title: Spacing & layout
    criteria:
      - id: space-scale
        severity: p2
        check: Gaps and padding use the space-0..7 scale
      - id: containers
        severity: p3
        check: Layout width uses a container token (lg default, xl for the sort scene)
  surface:
    order: 5
    title: Radius & elevation
    criteria:
      - id: radius-set
        severity: p2
        check: Radii are only rounded-sm, rounded-md, or rounded-full
      - id: shadow-sparingly
        severity: p3
        check: Shadows use shadow-card or shadow-elev-2 and are used sparingly
  layering:
    order: 6
    title: Two-layer namespacing
    criteria:
      - id: scene-namespace
        severity: p2
        check: scene/* tokens are confined to the assembly-line scene, not foundation surfaces
      - id: no-glassmorphism
        severity: p2
        check: No glassmorphism / frosted-glass effects are used
---

Checks whether UI honors the RC.org-derived design system: brand-exact color, the preserved type system, the spacing/radius/shadow foundation, and the two-layer (foundation vs playful-scene) discipline. This rubric governs *system conformance*; the warmth/charm of the playful layer is judged by `goose-game-aesthetic.md`, and motion by `motion-quality.md`.

## Scope & Grounding

**Personas**
- *Riley (16-18), late-HS training-seeker* — the primary user. Should feel this is a fresh, friendly experience that's still recognizably part of RC.org.
- *Parent over the shoulder* — glances for 30 seconds; the look must read as a real, trustworthy ARM product, not a toy.
- *ARM client reviewer* — checks that brand identity is respected exactly (this is an "evolution, not rebrand").

**Realistic scenarios**
- A role card on Results uses the archetype's accent for its border, match %, and primary button.
- The sort scene uses the warm `scene-paper` background while the results foundation uses white-on-page-bg cards.

**Anti-scenarios (should fail)**
- A component hardcodes `#38A5EE` instead of `text-arm-blue`.
- An archetype is themed with a brand-new color, or `arm-yellow` is used to denote a role.
- A neon from the dead Make.md palette resurfaces in the scene.
- A "cool" frosted-glass card appears on Results.

## 1. Tokens, not literals
Every reused or semantically named value lives in `tailwind.config.ts` (color/type/space/radius) or `/src/lib/motion.ts` (durations/easings). Inline hex and magic pixels are the single most common drift and break the Figma↔code token alignment. **Pass:** `className="text-arm-orange p-space-4 rounded-md"`. **Fail:** `style={{ color: '#F56A00', padding: '23px' }}`.

## 2. Color usage
The four ARM brand colors are exact and non-negotiable. Archetypes are color-coded **Builder→`arm-orange`, Innovator→`arm-blue`, Architect→`arm-teal`**; `arm-yellow` is the global brand signature and never an archetype. The Make.md neons are dead. Product is light-mode only. **Fail:** inventing a fourth accent, or tinting a Technician (Builder) card blue.

## 3. Typography
Montserrat for headings, Roboto for body — always, across both layers. Sizes come from the scale (H1 56/64 … body 16/22, small 14/22). Match percentage renders as H2 in the archetype accent. **Fail:** a display font swapped in ad hoc, or a hand-set `font-size: 19px`.

## 4. Spacing & layout
Use the `space-0..7` scale (4 → 64px) and container tokens (`container-lg` 1248 default; `container-xl` 1500 for the sort scene). **Fail:** `gap: 18px`.

## 5. Radius & elevation
Only `rounded-sm` (4), `rounded-md` (8), `rounded-full`. Two shadow styles (`shadow-card`, `shadow-elev-2`), used sparingly — the playful layer leans on warm fills and soft outlines, not shadow stacks.

## 6. Two-layer namespacing
Foundation surfaces (forms, cards, results chrome) use Material-flavored conventions; the scene uses `scene/*` tokens (paper cream bg, soft strokes, ground shadows). Keep them from bleeding into each other, and keep transitions between layers explicit. No glassmorphism in either layer.

## Application
Run via `/design-review`, which screenshots the running screen and inspects the JSX/Tailwind. Report p1s as blocking, p2s as should-fix, p3s as polish. Cite the offending file:line and the correct token.

## Cross-references
`goose-game-aesthetic.md` (warmth/charm), `motion-quality.md` (motion tokens + reduced-motion), `CLAUDE.md` (tokens-not-literals rule), `DATA_MODEL.md` §7 (color schemes by archetype).
