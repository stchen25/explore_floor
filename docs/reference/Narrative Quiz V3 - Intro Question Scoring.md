# Narrative Quiz V3, Intro-Question Scoring, Guide for Claude Code

This guide wires the **Narrative** flow's intro questions into the category score. Right now they carry no scoring weight, so the narrative scores purely on the seven scenes and skews low (it landed people on Operator in V2 while the exam, whose intro screeners do score, landed them higher). This change closes that gap by giving the intro questions the same kind of weight the exam already uses, so the two instruments stop disagreeing by construction.

This is a **data-only change** to choice category tags plus one declared-max update. No scoring, runtime, or component logic changes. The question wording and the results screen are separate workstreams and are out of scope here. The question-screen layout and interaction changes (prompt hierarchy, click default, back/undo, and so on) are also out of scope, they go to a separate session with the revised Figma screens.

**Target file:** `src/data/flows/narrativeFlow.ts`, plus the `expectedCategoryMax` line in the same file, plus the test and spec updates noted below.

---

## The model

The role cards already define a ladder (`src/data/roleDetails.ts`): Operator is education 0 / pay 0, Technician is 1 / 1, Specialist and Integrator are both 2 / 2. The exam already turns its education screener into a score nudge by tagging its intro choices with categories (`e-q1-no → ['operate']`, `e-q1-maybe` and `e-q1-yes → ['program','plan']`); the normal MC scoring in `categoryScoring.ts` picks those up. We do the same on the narrative, and we let salary count too (the exam left salary as fit-line-only).

Map each scored intro answer's appetite level to the role or roles at that tier, adding one point:

| Appetite level | Tier | Tag |
|---|---|---|
| 0 (no college, or $40k) | Operator | `['operate']` |
| 1 (1-2 years, or $60k) | Technician | `['repair']` |
| 2 (4+ years, or $80k+) | Specialist and Integrator | `['program','plan']` |

Two axes carry weight, **education and salary, one point each**. Education is split across Q1 ("going to college?") and Q2 ("how long?"), so whichever of the two lands on the user's path carries the education point. Salary is Q3. The experience question (Q0) stays **unscored**: it's the routing signal we're adding now and parking the actual routing for later.

At level 2 the point lands on both Specialist and Integrator (one each), which mirrors the exam and keeps the two top-tier roles distinguished by the scenes rather than by this nudge. The seven scenes still carry most of the weight, so the intro questions tilt the result, they don't decide it.

A note on what this does to low-signal users: tagging "no college" and "$40k" toward Operator pushes lower-appetite users further toward Operator. That's correct for making the instruments agree, and it's why the entry-level "starting rung, not a verdict" reframing on the results screen matters. The two changes are a pair.

---

## Ground rules (do not change these)

- **Q0 (experience) stays unscored.** Both choices keep `categories: []`. It's a background question and the routing it will eventually drive is parked.
- **Scenes stay rate-each.** We're keeping the rate-each scene model, so the middle "Kinda me" bucket and `MAYBE_WEIGHT` (currently `0` in `src/lib/categoryScoring.ts`) are unchanged. Don't touch them.
- **Don't touch the fit line.** `src/data/flows/screeners.ts` (`SCREENER_LEVELS`, `SCREENER_COPY`) and `src/lib/screenerFit.ts` drive the always-on education/pay fit line on results. That's presentation and it stays as is. The tags we add below are a separate, parallel signal that happens to use the same level-to-tier logic. Keep them consistent with the fit-line levels, but don't merge them.
- **Don't touch the exam, the buckets, the results screens, or the homescreen.** The exam is retiring (leave its code in place for now), `buckets.ts` is unchanged, the results work is a separate workstream, and the homescreen stays plain for the moment.
- **Preserve choice IDs.** `tests/e2e/narrative.spec.ts` references `n-q1-no`, `n-q3-60`, `n-q4-typing`, `n-q5-solving` by ID. Keep those. We're only changing `categories` arrays, not IDs or labels.
- **Keep the `n-q1-no` branch.** `n-q1-no` keeps `branchTo: 'n-q3'` (a "No" answer skips the "how long?" question). We add a tag to it without changing the branch.

---

## Changes, in flow order

Edit only the `categories` arrays on the intro `mc` steps. Everything else on these steps (IDs, labels, prompts, the Q1 branch) stays.

**Q0 (`n-q0`, experience): no change.** Both choices stay `categories: []`.

**Q1 (`n-q1`, "Are you planning on going to college?").**

| Choice | Current | New |
|---|---|---|
| `n-q1-yes` | `categories: []` | `categories: []` (unchanged; defers to Q2) |
| `n-q1-no` | `categories: [], branchTo: 'n-q3'` | `categories: ['operate'], branchTo: 'n-q3'` |

**Q2 (`n-q2`, "How long?"), reached only when Q1 = Yes.**

| Choice | Level | New |
|---|---|---|
| `n-q2-short` (1-2 years) | 1 | `categories: ['repair']` |
| `n-q2-typical` (4 years) | 2 | `categories: ['program','plan']` |
| `n-q2-long` (4+ years) | 2 | `categories: ['program','plan']` |
| `n-q2-whatever` | 1 | `categories: ['repair']` |

`n-q2-whatever` follows its fit-line level (1) for consistency. If the team would rather a noncommittal answer not nudge the score, set it to `[]` instead; flag it and we'll decide.

> **As-built (reconciled 2026-06-25, D-023):** the team chose **`[]` (unscored)** for `n-q2-whatever`. A noncommittal answer does not nudge the score (it still feeds the fit line). The shipped value in `narrativeFlow.ts` is `categories: []`. This table row is the superseded provisional.

**Q3 (`n-q3`, "What is the lowest salary you would feel satisfied with?").**

| Choice | Level | New |
|---|---|---|
| `n-q3-40` ($40,000) | 0 | `categories: ['operate']` |
| `n-q3-60` ($60,000) | 1 | `categories: ['repair']` |
| `n-q3-80` ($80,000+) | 2 | `categories: ['program','plan']` |

**Q4 and Q5: no change.** They already map one choice per category from the V3 language pass.

---

## Update the declared max

Adding these tags raises the per-category ceiling, so update `expectedCategoryMax` in `narrativeFlow.ts` (currently line 199):

```ts
expectedCategoryMax: { operate: 11, repair: 11, program: 11, plan: 11 },
```

The reasoning: across all steps, Q1 adds 1 to operate, Q2 adds 1 each to repair/program/plan, Q3 adds 1 to each of the four, and Q4, Q5, and the seven scenes already add 9 to each. That nets 11 per category. `src/lib/__tests__/data-integrity.test.ts` recomputes the max from the steps and asserts it equals the declared value, so let that test confirm the number. If it reports a different computed value, trust the test and match it, then tell us, since that means a tag landed differently than expected.

---

## Update the tests

- **`src/lib/__tests__/data-integrity.test.ts`:** no edit beyond the declared-max change above. It will confirm declared equals computed.
- **`src/lib/__tests__/categoryScoring.test.ts` and `categoryBreakdown.test.ts`:** these build inline fixtures and don't import `narrativeFlow`, so they won't break. Leave them.
- **`tests/e2e/narrative.spec.ts`:** this one walks the real flow and asserts the displayed percentages match the engine and that a specific role is the top match. The walk answers `n-q1-no` (which now tags operate), `n-q3-60` (now tags repair), `n-q4-typing` (program), `n-q5-solving` (program). Those new intro tags shift the totals, so the previously-asserted top match and percentages may no longer hold. Re-run the spec, read the new engine output, and update the expected values so the "displayed equals engine" invariant still passes. If the asserted top match changes, either update the assertion to the new top role or adjust the walked answers so the test still demonstrates a clear, intentional top match. Keep the new first question (`n-q0`) answered as it already is; it stays unscored.

---

## Update the in-repo docs

- **`docs/reference/Narrative Quiz Structure Content Spec.md`:** record that the intro questions now carry scoring weight, with the level-to-tier mapping and the one-point-each rule for education and salary. Note Q0 stays unscored.
- **`docs/knowledge/STATUS.md`:** close the open item that reads "narrative intro questions (Q0–Q3) still carry empty category weights for scoring, no score nudge yet." Replace it with a line saying education (Q1/Q2) and salary (Q3) now nudge on the tier ladder, Q0 stays unscored, and `expectedCategoryMax` moved to 11 per category.
- **`docs/knowledge/DECISIONS.md`:** log this as a new decision (it parallels D-019 for the exam): the narrative's education and salary intro questions nudge the match one point each on the Operator/Technician/Specialist-Integrator tier ladder, mirroring the exam, so the two instruments stop disagreeing structurally; experience (Q0) stays unscored pending routing.

---

## Verify

1. `typecheck` and `lint` pass.
2. Unit tests pass, especially `data-integrity.test.ts` (confirms the new `expectedCategoryMax`).
3. `tests/e2e/narrative.spec.ts` passes with its updated expected values, and the displayed percentages still equal the engine output.
4. Manual read-through: answer the intro questions a few ways and confirm the result moves sensibly. No college plus $40k should pull toward Operator; 4-plus years plus $80k+ should pull toward Specialist and Integrator. Confirm the experience question still has no effect on the score.
