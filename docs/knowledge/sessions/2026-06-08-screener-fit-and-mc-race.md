# 2026-06-08 — Screener mapping recovered + a results fit line; fixed a latent MC-transition race

Continued the same session as the narrative bucket-sort work (`2026-06-08-narrative-bucket-sort.md`). The team recovered the screener-question rationale and asked for it to be reflected in results. Logged as `DECISIONS.md` D-019 (score nudge) + D-020 (fit line); a real bug fix logged as `LESSONS.md` L-007. All on `phase-1-flow`; gates green.

## What we did

**Recovered + refined exam screener mapping (D-019).** The exam's two background questions now nudge the category match on a **tier ladder**: "pursuing higher education?" and "prior experience?" map No→Operator (operate, tier 0); **Maybe/Yes→Specialist+Integrator** (program+plan, tier 2) — the team moved "Maybe" up to the advanced tier ("not planning" vs "open to it"), so one 0/1/2 level drives both score and fit. Q3 maps left-to-right. `expectedCategoryMax` → {operate 11, repair 8, program 10, plan 11}. **Salary** stays fit-line-only (team's call). **Narrative** intro questions stay unmapped for scoring — they feed the fit line via answers only.

**Found + fixed a latent MC-transition race (L-007).** Wiring the screener scores surfaced it: the runner transitions MC with `AnimatePresence mode="wait"`, so the outgoing question's buttons linger (fading, hit-testable) for ~200ms. A fast click meant for the next question landed on the exiting question's button — its stale handler overwrote the answer and skipped a step (e-q1 "Maybe" → "No"). Invisible until screeners scored; then it corrupted results. Reproduced it live in the store (`globalThis.__store` debug, since removed) before fixing. **Fix:** `MCQuestion` locks (disables) its buttons once answered; the runner keys the card by step id so the lock resets per question. Confirmed all 6 E2E green after.

**Screener fit line (D-020).** Always-on education/pay read on results, separate from the score:
- `roleDetails` gained `educationLevel` + `payLevel` (0 = HS/$40k … 2 = Bachelor's+/$105k+; Specialist & Integrator both edu level 2, team-confirmed).
- `lib/screenerFit.ts` (pure): `deriveScreenerProfile(flowId, answers)` reads appetite (0/1/2) — exam Q1 direct; narrative Q1+Q2 for education, Q3 for pay; `screenerFitLines(category, profile)` → a green check (appetite ≥ role) or amber heads-up (role needs more school / pays a tier below target) per axis.
- `Results/category/FitNote.tsx` renders it; wired into `ExamResults` (top match) and `CategoryResults` (centered/active role). Education both flows; pay narrative-only.
- Levels + copy are data (`src/data/flows/screeners.ts`). Verified visually: narrative (No college + Specialist top) shows an education heads-up + a pay "fits".

**Reconciliation:** the team said both "No→Operator…Yes→Integrator" (categorical) and "No=0/Maybe=1/Yes=2" (graded). Resolved: the **category mapping is the score nudge** (D-019); the **0/1/2 level is the fit read** (D-020). Per the team: screeners also nudge the match (not caveat-only), flag education + pay, always show the line.

## State at end of session

- Gates green: lint, typecheck, **99 unit**, **6 E2E**. Working tree has all changes (this session: bucket sort + screener nudge + fit line + MC fix). **Not committed.**
- Temp debug hook (`globalThis.__store`) was added then removed — confirm it's gone (it is).
- Docs current: `DATA_MODEL.md` §17 (screener fit + open item), `DECISIONS.md` D-019/D-020, `LESSONS.md` L-007, `STATUS.md`, `data-author` skill, this note.

## Next session

1. **Commit** the session's work (`phase-1-flow`): narrative bucket sort (D-018), screener nudge (D-019), fit line (D-020), MC race fix (L-007).
2. Tunable knobs the team may revisit: the exam screener weights (currently +1 categorical — could go graded if the nudge should push harder), the fit-line copy/levels (all in `screeners.ts` / `roleDetails`), whether the narrative fit should pin to the top match vs the swapped role.
3. **Narrative** intro-question score mappings still open (team to provide) if they want the nudge there too.
4. Optional `/design-review` on the new scene-sort + `FitNote` screens (grade against the minimal study presentation, not the goose rubric — per D-017).
5. Then run the study; fold findings into Phase 2.
