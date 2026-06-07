# 2026-06-04 — A/B question-set instrument

Built the research instrument for the first user test: two swappable **question sets** (formal vs playful language treatments) with a researcher switcher on Landing. Inserted between Phase 1 and Phase 2 — logged as `DECISIONS.md` D-016, schema in `DATA_MODEL.md` §16, flagged in `PRD.md` §8/§14.

## What we did

**Schema + data.** New `QuestionSet` type (`types.ts`): a set owns its 24 items (own ids/labels/weights/robot mappings) + landing/sort/round/results copy; roles/competencies/skills/programs/parts stay shared. `src/data/questionSets/`: `setA.ts` re-exports the existing items/rounds/resultsCopy and lifts the previously-hardcoded Landing/Sort strings verbatim; `setB.ts` is a **loud `[B]`-marked placeholder clone** (distinct `b-` ids) until the team's compiled content lands; `index.ts` is the registry (`questionSets`, `defaultSetId: 'a'`, `questionSetList`).

**State.** `sessionStore`: `questionSetId` lives **next to** `state`, not inside it — `reset()`'s shallow `set({ state })` is the mechanism that preserves the condition across "Start over" between participants (commented in the store; don't restructure reset). Actions resolve items via `get()` at action time. New `useQuestionSet()` hook; screens (Landing/Sort/Results/FourPartRead) read items + copy from the active set.

**UI.** New generic `SegmentedControl` (tokens only). Design-review pass surfaced 2 p2s, both fixed: active segment now a **quiet** selected state (`bg-bg-section` + `font-medium text-text-strong`, NOT arm-yellow — yellow is reserved for the CTA) and `duration-100` pins the transition to the token scale.

**Tests.** `data-integrity.test.ts` parameterized with `describe.each(questionSetList)`: per-set structural invariants + **declared-vs-computed `expectedSums`** (replaces the global 22/27/25 check; Set A still declares those), cross-set id uniqueness, owned-copy completeness. New `tests/e2e/question-set-b.spec.ts`: toggle → marked copy everywhere → full flow on Set B → retake → **selection survives reset**. Also updated the data-author skill's invariants for per-set sums.

**Worksheet.** `docs/knowledge/QUESTION_SET_WORKSHEET.md` — the authoring template the team fills per treatment (item table ×24 with weights + robot parts from the catalog, all copy blocks, declared totals, handoff checklist). Content drops in via data-author with no component edits.

**Infra fix.** `playwright.config.ts` now points at port **5174**, following the user's `vite.config.ts` port move (5173 is taken by the sibling prototype); the e2e webServer was timing out against 5173.

## State at end of session

- All gates green: lint, typecheck, **45 unit** (23 data-integrity), **5 E2E** (incl. question-set-b). Design-review on Landing: p2s fixed, re-verified visually.
- Set B is a placeholder — **do not run a real participant session on Set B until the compiled content is authored in.**
- Working tree: this session's work is uncommitted on `phase-1-flow` (alongside the user's vite port change).
- Known boundary (intentional, in D-016): `Build.tsx` copy, Results empty state, and chrome strings are not set-owned.

## Next session

1. Commit this work on `phase-1-flow`.
2. Team compiles both treatments in `QUESTION_SET_WORKSHEET.md` (CollegeBoard-ish vs Futurescape-ish); then author real Set A/B content via data-author — update each set's `expectedSums`, run gates + `/design-review`.
3. Decide the researcher-facing switcher labels (`name` fields, currently "Set A"/"Set B").
4. Run the A/B user test; fold findings into Phase 2 (`ROADMAP.md` §3, build to D-014).
