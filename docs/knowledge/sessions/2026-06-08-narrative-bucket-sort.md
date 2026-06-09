# 2026-06-08 — Narrative scenes become a per-choice 3-bucket sort; middle bucket → "Kinda me"

Reworked the narrative study flow's scene interaction after the team clarified the FigJam board's intent: each scene was always meant to have the user sort **each** of its four choices (judge them like the exam's statements), not pick a single winner. Logged as `DECISIONS.md` D-018. All on `phase-1-flow`; gates green throughout.

## What we did

**Scene mechanic (the core change).** Each of the 7 scenes now presents its 4 choices one card at a time, sorted into three buckets — **That's me / Kinda me / Not me** — the exam's `StatementSortView` mechanic with the scene's story framing (prompt + question + "Scene N of 7"). Replaced the D-017 "drag your one pick into a zone."

**Bucket relabel, both flows.** Middle bucket "Maybe" → **"Kinda me"** across narrative *and* exam, via one shared `SORT_BUCKETS` constant (`src/data/flows/buckets.ts`). The user chose both flows for study consistency (the study compares structure, not wording). `BucketId` stays `'maybe'`, so **scoring is unchanged** — "Kinda me" still scores `MAYBE_WEIGHT` (0 today, tunable). The user kept it at 0.

**Shared sort UI.** Extracted `src/screens/Flow/BucketSort.tsx` (one-card-at-a-time, drag-or-tap-into-buckets, progress, ref-guarded completion) from the old `StatementSortView`. `StatementSortView` is now a thin wrapper; new `SceneSortView` wraps it with scene framing. Deleted `SceneStepView.tsx`.

**Scoring/state.** Scene choices flow into the existing `statementBuckets` map keyed by `SceneChoice.id` (no store change — scenes use `recordStatement`; `answers` now holds only MC picks + branching). `categoryScoring.addStepRaw` and `categoryBreakdown` scene cases read buckets via the existing `bucketWeight`. Per-category **max unchanged** (`expectedCategoryMax` still {9,9,9,9}); one scene can now credit several categories or none. `FlowRunner` got `handleSceneDone` (advance, or complete on the last scene); scenes left `handleChoice` (MC-only now).

**Tests.** Updated scene scoring/breakdown units (drive `statementBuckets`, added a multi-category scene case), added a `data-integrity` lock that the middle bucket label is "Kinda me", rewrote `narrative.spec` for the new bucket interaction (engine-match, branch-skip, swap, role sheet), added a "Kinda me" visual check to `exam.spec`. **89 unit, 6 E2E green.**

## State at end of session

- Gates green: lint, typecheck, **89 unit**, **6 E2E**. Working tree has the changes (not yet committed).
- Verified visually via Playwright: the new scene sort UI renders ("Scene 1 of 7", card-at-a-time, 3 buckets incl. "Kinda me"), the Q1→Q3 branch skips Q2, and bucketing all four choices (incl. via "Kinda me") advances to the next scene.
- Docs current: `DATA_MODEL.md` §17, `DECISIONS.md` D-018, `PRD.md` §8, `STATUS.md`, the content spec's as-built notes, `data-author` skill.

## Next session

1. **Commit** the change (branch `phase-1-flow`).
2. Optional `/design-review` on the new scene screen — grade against the deliberate minimal study presentation (the goose-game rubric doesn't apply here; same caveat as D-017).
3. Still open from D-017 (unchanged): background-question category mappings unrecovered (chase the team); two `??`-flagged narrative choices ship as-authored.
4. Then run the study (compare the three conditions) and fold findings into Phase 2 (`ROADMAP.md` §3, build to D-014).
