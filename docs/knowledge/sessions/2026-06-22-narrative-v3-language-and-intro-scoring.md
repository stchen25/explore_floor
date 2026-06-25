# 2026-06-22 — Narrative V3: language pass + intro-question scoring

Testing picked the **Narrative** flow as the clear winner, so V3 builds on that one flow only. Two data-only passes this session, both driven by team spec docs in `docs/reference/`: a **language update** ("Narrative Quiz V3 - Language Updates.md") and **intro-question scoring** ("Narrative Quiz V3 - Intro Question Scoring.md"). No scoring, runtime, or component logic changed — all edits are in `src/data/flows/narrativeFlow.ts` plus tests/docs. The other two V3 workstreams (high-fidelity results screen, question-screen layout/interaction) are out of scope and not started.

## What we did

**Pass 1 — Language (matches FigJam board node `7:313`):**
- **Added a new first question Q0** — `n-q0` "Do you have any experience in this field?" (Yes/No), unscored. Moved the "Let's start with some basic questions..." prompt onto it and removed that prompt from Q1. (Confirmed with Caelan: it reads as an intentional board addition.)
- **Q4 → four choices, one per category:** split the combined hands-on choice — `n-q4-hands` → operate only, new `n-q4-maintain` "Making sure that things are working correctly" → repair.
- **Q5 → four choices, one per category:** removed `n-q5-money`, remapped `n-q5-helping` → repair, added `n-q5-building` "Building" → operate.
- **Reworded five scene labels** (S-1 repair/operate, S-3 operate, S-5 repair/operate, S-6 repair) and **shortened scene 7** to plain labels with no game examples (confirmed with Caelan — board's shortened version).
- Settled the two formerly `??`-flagged choices ("IT club", "Writing code").
- `tests/e2e/narrative.spec.ts` answers Q0 before the college question; `data-integrity.test.ts` MC-step count 5 → 6 (the only test consequence — the guide missed this; flagged it).

**Pass 2 — Intro-question scoring (D-023, parallels exam D-019):**
- The narrative scored purely on the 7 scenes and skewed low (Operator in V2) while the exam's intro screeners scored and landed people higher — the two instruments disagreed by construction. Fix: education (Q1/Q2) + salary (Q3) now nudge the match one point each on the role tier ladder.
- **Tags:** `n-q1-no` → operate (lvl 0); Q2 short → repair (1), typical/long → program+plan (2), **whatever → unscored** (Caelan's call); Q3 $40k → operate, $60k → repair, $80k+ → program+plan. **Q0 stays unscored** (routing parked).
- **`expectedCategoryMax` 9 → 11 per category** (intro adds +2 to each on top of Q4/Q5/scenes' 9). `computeCategoryMax` sums every step's per-category presence, so the Q1/Q2 branch split doesn't change the ceiling. `data-integrity` recomputes and confirms — no edit beyond the declared value living in `narrativeFlow.ts`.
- E2E needed **no edit**: the walk's new tags (operate+1, repair+1) leave program the runaway top → Specialist still the top match, and percentages read live from the engine.

**Docs updated:** `docs/reference/Narrative Quiz Structure Content Spec.md` (both passes, pull date → 2026-06-22 / node `7:313`), `STATUS.md` (open item closed), `DECISIONS.md` (**D-023**).

## State at end of session

- Gates green: **lint, typecheck, 99 unit, 7 E2E**. `data-integrity` independently confirms max = 11/category.
- Verified the scoring direction with a throwaway engine spec (since deleted): low appetite (no college + $40k) → Operator; high (4+ yrs + $80k+) → Specialist/Integrator; Q0 has zero score effect; Q2 "Whatever" scores nothing. Also visually self-checked the language pass via Playwright (Q0 first under the opening prompt, Q1 no longer repeats it, Q4/Q5 show the revised four).
- **Working tree is uncommitted on `main`** — both V3 passes plus the two untracked guide docs in `docs/reference/`. Changed files: `src/data/flows/narrativeFlow.ts`, `src/lib/__tests__/data-integrity.test.ts`, `tests/e2e/narrative.spec.ts`, `docs/reference/Narrative Quiz Structure Content Spec.md`, `docs/knowledge/STATUS.md`, `docs/knowledge/DECISIONS.md`.

## Next session

1. **Branch + commit** — we're on `main` and nothing is committed; per the harness, branch first (e.g. `narrative-v3`) before committing the two passes.
2. **Results screen to high fidelity** — the V3 acceptance driver per testing. Separate workstream; the node-graph results currently sit at study-register low-fi. Will want a `/design-review` once it has visual intent (it's exempt today per D-017, not graded against the goose rubric).
3. **Question-screen layout/interaction** — prompt hierarchy, click default, back/undo — slated for a separate session against the revised Figma screens.
4. **Selection mechanism** — the third V3 language-doc workstream, not yet specced into a guide.
5. Q0's routing is parked — wire it when the team defines what "has experience" should branch to.
