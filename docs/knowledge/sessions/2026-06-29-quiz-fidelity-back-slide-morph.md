# Session handoff — 2026-06-29 — Quiz-fidelity pass: Back nav, slide-up morph, slide + gold-hold

A targeted fidelity pass on the dark quiz (post-Phase-B, before Phase C), grounded in the Claude Design source (`Quiz to Results.dc.html`, imported via the claude_design MCP — project `df8d5f31…`, file `design_handoff_quiz_to_results/`). Caelan flagged three gaps vs the mockup; all three fixed and verified. Code changed; **no commit** (left for Caelan).

> **Read first for full context.** This note is the **delta** on top of the prior state, not a restatement. Start with `STATUS.md` (the master index — where the whole build is, with links to every prior session note), then the immediately-prior `sessions/2026-06-26-phase-B-quiz-reskin.md` (the Phase-B re-skin this pass refines) and the plan of record `VISUAL_REARCHITECTURE.md` (D-029). Everything below is scoped to just the 2026-06-29 fidelity pass.

## What we did (the three fixes)

1. **Scene slide-up morph (issue 1).** The mockup's two-beat is ONE morphing surface, not two swapped views. Pressing **Continue** now flips `scenePhase` intro→rating and the scene-context card morphs in place — padding compresses (32→24), the question shrinks (h3 32px → h4 24px), and the choices region expands open below (`height 0 → auto`). Because the runner column is vertically centered, that growth slides the card UP. _Was a hard swap (card stayed full-size, choices popped in)._
   - **Layout bug found + fixed along the way:** `FlowRunner`'s `<main>` used `min-h-full`, which didn't resolve (the flex ancestor's height is flex-derived, not explicit), so main wrapped its content and `justify-center` never centered — the card couldn't slide up. Changed to `flex-1` (fills the flex column → real height → centers). This also lets the Back button sit at the true viewport bottom.
   - **Motion gotcha:** `fontSize` must be a px **string** in `animate` (Motion only auto-appends px to a known set — x/width/padding…, not fontSize); a bare number is dropped (silently fell back to inherited 16px) and also throws an "not an animatable value" warning. Fixed; `initial={false}` on the card/question pins the mount value so they snap to the right phase on a Back re-entry and only animate on the Continue press.
2. **Back navigation (issue 2 — the top research gap, "no way back").** A persistent, centered **Back** at the bottom of the flow. `goBack` (store action) is a branch-aware reverse traversal mirroring the mockup's `qGoBack`: within a scene, previous choice → scene intro; across steps, pops a `history` back-stack to the previous step, re-entering a prior **scene at its last choice** (and a prior **MC** showing its answer). **Prior picks are pre-lit and re-pickable** (answers/buckets persist; the revisited card seeds its lit state from them). Offered whenever there's somewhere to reverse to; hidden on the very first question.
3. **Horizontal slide + gold-hold (issue 3).** Steps now slide **horizontally** (enter from the right, exit left) instead of the old vertical fade/rise. The **selected answer/row holds its gold fill through the exit** — AnimatePresence keeps the card mounted (with its `picked` state) while it slides out, so the pick stays lit through the transition ("stays lit to show state"), then a brief hold (`durationsMs.snap`) before advancing, matching the mockup.

## Architecture (where state moved)

- **Runner cursor → store.** `SessionState` gained `history: number[]`, `scenePhase: 'intro'|'rating'`, `choiceIndex: number` (`src/data/types.ts`). New store actions: `startScene`, `rateChoice` (records a scene bucket + advances the choice/step, runs scoring on the last choice of the last scene), `goBack`. `advanceStep` now pushes `history` + resets the scene cursor. `recordStatement` was folded into `rateChoice`.
- **`FlowRunner`** reads the cursor, renders the horizontal-slide step transition, and owns the Back button (`data-testid="flow-back"`, `canGoBack` = scene-in-rating OR `history.length>0`). Passes `selectedId`/`reduce` to `MCQuestion`.
- **`SceneSortView`** is now the morph orchestrator (reads `scenePhase`/`choiceIndex`, dispatches `startScene`/`rateChoice`); no longer takes `onDone`.
- **`BucketSort`** is controlled by `currentIndex` and has an inner **`ChoiceCard`** (keyed by choice id) that owns per-choice `picked`/`acted`/timer — so the lit state is per-card and persists through the exit, and rows **disable once acted** (this fixed the reduced-motion E2E: without `disabled`, a stray/auto click landed on the inert exiting card instead of waiting for the next).
- **`MCQuestion`** seeds `picked` from `selectedId` (pre-lit on revisit), `acted` disables on pick (no double-advance / stray click), re-pickable on a fresh mount.
- **`Icon`** gained `arrow-l` → `arrow_back`; exported `Icon` from the components barrel.

## State at end of session

- Branch `narrative-v3-realign`. **Gates all green:** lint, typecheck, **49 unit**, **3 E2E** (`narrative` / `role-select` / `reduced-motion`), zero console errors/warnings. Verified live via Playwright: the morph (32→24px), the gold-hold (lit + disabled during the hold), and Back (returns to a pre-lit, re-enabled prior choice → scene intro → previous MC with its answer pre-lit).
- **Reduced motion** is gated throughout: the morph/slides snap or crossfade, the gold-hold advances immediately (no timer). The reduced-motion spec runs ~8s.
- **No commit** — left for Caelan.

## Docs synced (direct edits — additive interaction/motion facts; no model/number/scoring change, so no `doc-steward` sweep)

- `PRD.md` §5.0 — records the slide-up morph, the horizontal slide + gold-hold, and the Back affordance.
- `DATA_MODEL.md` §17 Runtime model — the store-owned cursor (`scenePhase`/`choiceIndex`/`history`), the new actions, and `goBack`/Back semantics.
- `VISUAL_REARCHITECTURE.md` §6 Phase G — marks these as **already landed** but explicitly keeps the motion bullet open (take a fresh look at G: whether the choice card should slide in *after* the reveal settles like the mockup; directional Back-vs-forward slide; any other motion polish).
- `STATUS.md` — fidelity-pass note + this handoff in the session list; date bumped to 2026-06-29.

## Not done on purpose / watch-items

- **Single slide direction** (Back slides the same way as forward — matches the mockup; revisit at Phase G if it confuses).
- **Reveal vs first-card slide happen together** (the mockup reveals the choices block, *then* slides the first choice card in; ours is simultaneous). Phase-G polish candidate.
- **Back button vs tall content** — on short viewports very tall rating content could approach the bottom-anchored Back. Fine at desktop today; fold into Phase G responsive.
- **A graded `/design-review`** wasn't run this pass (mechanical/interaction work, faithful to the source, gates green). Worth running at the start of Phase C alongside the results work.
- **Next:** Phase C (results role cards) per `VISUAL_REARCHITECTURE.md` §6 + `sessions/2026-06-26-phase-B-quiz-reskin.md`.
