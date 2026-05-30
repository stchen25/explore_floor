# Lessons

An **agentic-workflow + design-craft log** — not a generic wiki. What worked when driving this build with Claude Code, where the agent needed steering, and craft learnings worth keeping. This is raw material for the portfolio thesis ("a forward-looking, agentic design practice").

Capture when notable with `/compound lesson`. When a lesson recurs, promote it to a rule in `CLAUDE.md` (by hand).

Format per entry: **L-### — one-line takeaway** · context · what to do.

---

## 2026-05-30

### L-006 — GSAP DrawSVG: ellipses not circles; register once; scope + matchMedia
- **Context:** First GSAP use in the build (Phase 1 landing reveal). DrawSVG animates `stroke-dasharray/offset`, so targets need a visible stroke — and it supports `rect/line/polyline/polygon/ellipse` but **not `<circle>`**, which silently won't draw.
- **Do:** Use `<ellipse>` for rollers/joints. Register plugins once at app start (`src/lib/gsap.ts`, side-effect imported in `main.tsx`), never in a component. Run every tween inside `useGSAP(..., { scope })` (auto-revert on unmount), and gate the draw with `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` so reduced-motion users see the lines already drawn. Keep GSAP (scene strokes) and Motion (content opacity/transform) on disjoint nodes — verified no crossed engines.

### L-005 — Dynamic Tailwind class names aren't generated; use a static literal map
- **Context:** Archetype accents (`arm-orange`/`arm-blue`/`arm-teal`) needed to vary per role. `` `text-${token}` `` produces a class string Tailwind v4's scanner never sees, so the utility doesn't exist at runtime.
- **Do:** Author a static literal class map keyed by the variant (`src/components/accent.ts`: `ACCENT_CLASSES[archetype].text/border/bg/soft`). Every class appears verbatim in source, so it's generated. For SVG tinting, set the accent as the element's text color and draw with `currentColor` + `fill-bg`.

### L-004 — AnimatePresence `mode="wait"` + a draggable child stalls the swap
- **Context:** The Sort card used `mode="wait"` with a `drag` + `dragSnapToOrigin` card whose exit animated `x`. On a drag-commit the exit `x` fought the snap-back, exit never completed, and `mode="wait"` never mounted the next card — the user saw "no more cards." Reproduced it live before fixing (state was advancing; only the render stalled).
- **Do:** For a draggable item under AnimatePresence, use `mode="popLayout"` (the next item mounts immediately — can't stall), `forwardRef` the child (popLayout measures it via a ref), and keep `x`/drag-owned properties **out** of the exit variant (exit on opacity/scale only). Reproduce render-stall bugs before claiming a fix.

## 2026-05-29

### L-003 — The agent can't self-install external skills; hand the command to the user
- **Context:** `npx skills add greensock/gsap-skills` was blocked by Claude Code's safety classifier (installing external code that steers future sessions = self-modification / untrusted-code integration), even though it was approved in the plan. The user ran it and it succeeded.
- **Do:** For external skill/plugin installs, give the user the exact command (they can prefix `!` to run it in-session) rather than running it as the agent. Project-authored skills (our own `SKILL.md` files) are fine to create directly.

### L-002 — Tune external templates to the project; don't cargo-cult
- **Context:** Adopting the BilLogic "design harness" plugin's structure wholesale would have imported ritual (consent hashing, taxonomies) that doesn't pay off for a single-summer capstone.
- **Do:** Borrow the *frame* and the *schema*, then justify each artifact against this project's actual goals. Cut anything you can't defend. (See `DECISIONS.md` D-007.)

### L-001 — Verify doc-internal invariants by computing them, not trusting them
- **Context:** `DATA_MODEL.md` asserted the Innovator weights summed to 24; they actually sum to 27. The error would have surfaced as a failing Phase 0 sanity test authored from the same table.
- **Do:** When a doc states a total/invariant, recompute it before building against it. Cheap, catches load-bearing errors early. (See `DECISIONS.md` D-001.)
