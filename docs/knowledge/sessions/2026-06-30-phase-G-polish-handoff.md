# Handoff — Phase G results polish (Claude Design realignment), 2026-06-30

**Read this first, then `STATUS.md`.** This is a mid-task handoff. A polish pass against the Claude
Design reference is ~70% done. All changes are in the **working tree, uncommitted** (branch
`narrative-v3-realign`). Gates at handoff: **typecheck ✓, lint ✓, 80 unit tests ✓**. The
**Playwright E2E specs are expected to FAIL** until updated (nav/testid changes below) — that's the
first job.

> **How to use this doc.** It's a **map and a priority list, not an answer key.** Do your own
> grounding — open the Claude Design reference and the relevant code, and decide the fixes yourself.
> Everything below exists only to point you at what matters and steer you around the dead ends this
> session already hit, so you don't burn tokens re-discovering them. Where it names a likely cause or
> direction, treat it as a lead to verify, not a spec to implement. The reference (not this doc) is
> ground truth for everything but copy.

---

## 0. Context (why this work exists)

Caelan asked for a full UI/UX polish of the dark results experience, grounded in the **Claude Design
handoff** as ground truth for everything **but copy**. The prior passes had drifted from it.

- **Reference (ground truth):** Claude Design project `df8d5f31-2435-4a09-9382-6af1d62f9b59`, file
  `design_handoff_quiz_to_results/Quiz to Results.dc.html`. Read it with the **DesignSync MCP**:
  `DesignSync({method:'get_file', projectId:'df8d5f31-2435-4a09-9382-6af1d62f9b59', path:'design_handoff_quiz_to_results/Quiz to Results.dc.html'})`.
  The file is large (~150 KB); it saves to a tool-results file — decode the JSON `content`, then
  grep the unescaped HTML for the section you need (the `README.md` in that same project is an
  excellent plain-English spec — read it first via `get_file`).
- **Reference uses 4 paths** (Program/Operate/Repair/Plan); **we map to our 3 roles**
  (Technician/Specialist/Integrator). Adapt, never invent roles (hard rule).
- **Approved plan with the exact reference values** (sparkle path, line/padding specs, trajectory
  geometry, nav labels): `~/.claude/plans/we-have-been-completing-vivid-falcon.md`. Read it.

### Locked decisions this session (do NOT relitigate)
- Constellation: **keep the adaptive count-aware ring** (handles 3/5/5 jobs) and fix the visuals.
- JobOverview control bar: **reversed** — gold "Set as target role" on the **left**, back action on
  the **right**, relabeled **"Back to {Role} careers"** (Caelan's call; diverges from the mockup's
  left-back for cross-screen consistency).
- Cards control bar when reached via the map path: **"Explore {Role} careers"** → dives into that
  role's constellation (replaces the old "Back to the map").
- Chips: short `chipLabel`s + a one-line fit with "+N more".
- Idle float: smooth **symmetric** bob (`repeatType:'mirror'`, `ease:'easeInOut'`).

---

## 1. CRITICAL setup + gotchas (save yourself an hour)

- **Dev server:** `pnpm dev` → `http://localhost:5175/explore_floor/` (port may differ; check the
  log). A dev-only **"Dev: skip to results"** button on the Landing (`data-testid="dev-skip-to-results"`)
  seeds a result and jumps to `/results` — use it to reach the results screens fast.
- **Reaching the constellation:** Landing → click `dev-skip-to-results` → cards → click
  `open-map` ("Skip to map") → map → click `map-bubble-specialist` → constellation (`selected`) →
  click a `constellation-node-*` → job overlay → click `job-overview-cta` → job-overview page.
- **Screenshots of results screens TIME OUT** (the MCP screenshot has a ~5s wrapper; the
  `AmbientField` orbs use `filter: blur(52px)` which blows the rasterization budget). **Workaround:**
  inject this style after reaching the screen, then screenshot —
  `[style*="blur(52px)"]{filter:none !important;} *{backdrop-filter:none !important;}`
  (keeps the star `drop-shadow` glow; only kills the heavy orb/panel blur). Landing + quiz screens
  screenshot fine (no heavy blur). **Alternative:** measure geometry with `browser_evaluate` +
  `getBoundingClientRect` — works regardless of animation/blur (this is how A4 centering was fixed).
- **Bubbles/nodes float continuously**, so Playwright `.click()` reports "element not stable" →
  **click via `browser_evaluate`** (`document.querySelector('[data-testid=...]').click()`) and add a
  `~400ms` sleep before reading the next screen's DOM.
- **HMR resets the browser** to Landing when you edit a source file — re-seed after edits.
- Use `$CLAUDE_JOB_DIR/tmp` for scratch files. **Three stray screenshots** are sitting in the repo
  root (`constellation-fixed.jpeg`, `job-overview-fit.jpeg`, `landing-test.jpeg`) — delete them (and
  consider adding `*.jpeg`/`.playwright-mcp/` to `.gitignore`) before committing.

---

## 2. What's DONE (in the working tree, verify by reading the files)

| Area | Files | State |
|---|---|---|
| **A1/A2 Sparkle stars + glow/twinkle** | `src/components/SparkleStar.tsx` (new, 4-point path), `ConstellationNode.tsx` | Star glyph swapped to the sparkle; twinkle (mirror loop, reduce-gated) + `drop-shadow` glow. **Glow reads subtle at rest — see task 4.** |
| **A3 Connector lines** | `globals.css` (`--color-constellation-line`), `ConstellationField.tsx` | Brighter stroke, dash `7 7`, opacities 0.5/0.7/0.18. Verified visually — clean. |
| **A4 Centering ("shoved right")** | `ResultsConstellation.tsx` (`min-w-0`), `ConstellationField.tsx` (aspect-locked width) | **FIXED + verified** by measurement: field fits viewport, ring centered/symmetric/circular. |
| **A5 Side-panel padding** | `JobSidePanel.tsx` | header `py-space-2`, body `py-space-4`. Verified visually. |
| **B Job content build-out** | `src/data/jobs.ts` (13 jobs enriched), `src/data/exploreContent.ts` (new: `fitNarrative` + `careerTrajectory`), `JobOverview.tsx` (How-you-fit wired to `fitNarrative`) | Done + verified visually. |
| **C Trajectory branching diamond** | `TrajectoryViz.tsx` (rebuilt) | Done + verified visually (Senior top, Controls/Automation mid, current bottom; dashed connectors; sparkles). |
| **D1 Cards "Explore {Role} careers"** | `ResultsExperience.tsx`, `narrativeFlow.ts` (`exploreRoleCta`), `types.ts` | `fromMap` button now dives into the constellation. **testid `back-to-map` → `explore-role`.** |
| **D2 JobOverview control bar reversed** | `JobOverview.tsx`, `narrativeFlow.ts` (`overviewBack`→"Back to {role} careers") | Done + verified visually. |
| **E Chips one-line** | `src/lib/chipFit.ts` (new + test), `categoryBreakdown.ts` (prefers `chipLabel`), `WhyYouMatched.tsx` (one-line + "+N more"), `Chip.tsx` (`whitespace-nowrap`), `narrativeFlow.ts` (12 `chipLabel`s) + `types.ts` (`chipLabel?` on MC/Scene choices) | Code done + unit-tested. **Not yet visually verified — see task 3.** |
| **F1 Bobbing** | `BubbleField.tsx`, `AmbientField.tsx`, `ConstellationNode.tsx` | Symmetric `mirror`/`easeInOut` float. Not yet visually feel-checked. |

---

## 3. What REMAINS — do these, in order

### TASK 1 (do first) — Fix the Playwright E2E specs (they're broken by the nav changes)
- **Explore:** `tests/narrative.spec.ts`, `tests/reduced-motion.spec.ts`, `tests/role-select.spec.ts`.
- **What broke:**
  1. The cards control bar testid `back-to-map` no longer exists → it's now `explore-role`, and it
     **dives into the constellation** (not back to the map). Any spec step that did
     `cards → back-to-map → map` must be reworked (from the map, you reach a role via the bubble →
     constellation; the cards "explore-role" button is the *constellation* dive).
  2. JobOverview back button: label is now templated **"Back to {Role} careers"** (testid
     `job-overview-back` is unchanged) and it moved to the **right** of the control bar (set-target
     moved left). Update any text/position assertions.
  3. `WhyYouMatched` collapsed chip DOM changed (now `fitChips` → `CollapsedChips`, a one-line row +
     a "+N more" tail). Update any chip-count/selector assertions.
- **Test:** `pnpm test` (runs Vitest unit + Playwright). **Look for:** failing selectors/labels in
  the narrative + reduced-motion walks. **Fix:** update selectors/labels; keep the walk reaching
  every screen (cards → compare → map → bubble → constellation → node → job overlay → job overview →
  tabs → back chain → cards). Keep them green.

### TASK 2 — F2: clean up the "weird" quiz intro motion (the one unfinished plan item)
- **The complaint (verbatim):** "the motion in the initial quiz questions … is pretty weird, we
  should try and clean that up quite a bit." (The *bobbing circles* half of that same complaint =
  F1, already fixed — don't touch it.)
- **Where it lives:** the narrative flow runner — start at `src/screens/Flow/FlowRunner.tsx` and
  follow it into `MCQuestion.tsx`, `SceneSortView.tsx`, and the motion tokens in `src/lib/motion.ts`.
  Ground yourself in how the step transition and the per-question layout actually behave before
  deciding what's wrong.
- **How to see it (this is the unlock — quiz screens screenshot FINE, no heavy blur):**
  `Start the story` and step through the first few MC questions; `mcp__claude-in-chrome__gif_creator`
  or a burst of screenshots lets you actually watch the transition. Watch it before theorizing.
- **Decide the fix yourself** against what you observe and the reference's intent (the reference
  README describes the intended intro behavior as auto-advancing screeners; the scene cards are the
  ones that slide). Two constraints to honor: keep the liked scene **"slide-up morph"** and the
  `prefers-reduced-motion` path working.

### TASK 3 — Visually verify the chips + remaining results screens
- **Compare screen chips (the original bug):** map → bubble → constellation isn't it — go cards →
  `open-compare`, switch the target to **Integrator**, and confirm the "Why Integrator?" chip row is
  **one line** with "+N more" (the long "Meet with my friends…" is now `chipLabel:'Make afterschool
  plans'`). Also check the cards hero "Why Specialist?" chips. (Use the blur-off screenshot trick;
  compare is in the rounded panel, lighter blur.)
- **Cards `fromMap` button:** from the constellation click "Role overview" → cards; the right button
  should read **"Explore Specialist careers"** with a forward arrow, and dive back to the
  constellation.
- **Bubble map + trajectory feel:** eyeball the float (should be a gentle, smooth bob now) and the
  full trajectory diamond (the current/bottom node was below the fold in the handoff screenshot —
  confirm it renders with the "CURRENT ROLE" pill).
- **What to fix:** anything that wraps, overflows, or reads off vs the reference.

### TASK 4 (small/optional) — Revisit the constellation star glow + labels vs the reference
- The user's original gripe was the stars "aren't glowing." They now twinkle (live) and carry a
  `drop-shadow` glow, but the glow reads **subtle in a static frame**. Look at it live, compare to
  how the reference stars read, and decide if the glow needs strengthening (it's in
  `ConstellationNode.tsx`). While you're there, sanity-check the node **label color** against the
  reference (ours is currently a muted off-white; the reference tints non-dimmed labels with the
  role accent-soft) — judgment call on whether matching it looks better or too busy with 5 labels.

### TASK 5 — Gates + review + close out
- `pnpm lint`, `pnpm typecheck`, `pnpm test` all green (E2E updated in Task 1).
- Run **`/design-review`** (the `design-reviewer` subagent) on the changed screens
  (constellation, job-overview/trajectory, compare chips, the quiz). Fold in p1/p2 and the
  still-open Phase-G p3s (signal-bar contrast, etc.). Note: the reviewer must handle the blur
  screenshot issue (tell it the workaround in §1, or it may need reduced-motion).
- Delete the stray root `*.jpeg` screenshots; consider `.gitignore` for them + `.playwright-mcp/`.
- `/phase-check` (this is Phase G) and `/compound` a session note + any decisions (the nav/back
  swap, sparkle/glow constellation, branching trajectory, the chip-fit helper).
- Then it's safe to commit (Caelan commits/pushes — confirm first).

---

## 4. Quick reference — the data/contracts added this session
- `types.ts`: `chipLabel?` on `MCChoice`/`SceneChoice`; `CareerTrajectory { current; branches:[a,b]; senior }`; `ResultsCardsCopy.exploreRoleCta`.
- `src/data/exploreContent.ts`: `fitNarrative: Record<CategoryId,string>` (2nd-person "You as a {noun}", may contain `{noun}`), `careerTrajectory: Record<CategoryId, CareerTrajectory>`. Both PLACEHOLDER, marked for ARM.
- `src/lib/chipFit.ts`: `fitChips(labels, {maxChars=34,maxCount=3}) → {shown, more}` (greedy, always ≥1).
- `src/components/SparkleStar.tsx`: the 4-point sparkle (`fill:currentColor`; color via a text class, glow via `style.filter`).
