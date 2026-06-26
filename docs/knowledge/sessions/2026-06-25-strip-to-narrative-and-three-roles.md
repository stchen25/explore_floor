# 2026-06-25 — Handoff: strip to narrative, then pivot to ARM's three roles

**Planning session, no code changed.** Trigger: ARM's live site updated the career structure from the four categories we score to a **three-role** model (captured verbatim in `docs/reference/ARM Updated Role Structure - Source Content.md`), and the team confirmed the prototype is moving to the **narrative flow exclusively**. This note re-sequences the back half of the realignment sweep accordingly and hands the executable plan to the next session.

This **extends** the classic-delete plan in `sessions/2026-06-25-realignment-phases-2-3.md` (still the source for the classic KEEP/DELETE lists). Read that note for the classic specifics; read this one for what's new (the Exam archive, the three-role pivot, and the corrected order). Two adversarial-verification workflows backed this plan: a full 4→3 blast-radius map, and an Exam-archive blast-radius + sequencing critic (high confidence, "sound to write into the plan of record" with the five corrections folded in below).

## Decisions locked (user, 2026-06-25)
1. **Archive Exam** (delete from the live tree under the recovery tag), batched into the same destructive pass as the Classic delete. "Dormant" is not available: the three-role pivot changes the shared `CategoryId`, which would break `examFlow`'s typecheck and its 8/7/7/8 `data-integrity` invariant.
2. **Keep Select.** It had a positive response. It renders `roleDetails` over `CATEGORIES`, so it auto-shows three cards after the pivot. No edit needed for the archive.
3. **Rename the `CategoryId` literals** `operate/repair/program/plan` → `technician/specialist/integrator`. Honest names for the Fivestar rebuild; removes the long-standing "the ids don't match the role names" confusion.
4. **Two reviewed phases:** Phase 4 (strip to narrative, still four categories) **then** Phase 5 (the 4→3 pivot). Destructive delete stays separate from content re-authoring — partly to keep the diff/rollback legible, partly to bound per-session context.

## The mapping (confirmed from ARM's source doc, defended against the job-activity text)
- Old **Operate** (Operator, entry) **+** old **Repair** (Technician, maintenance) **→** the new **entry Robotics Technician**. Its description/activities are the OLD *Operate/Operator* card verbatim ("set-up, operation, and maintenance"); education HS/GED; **national median $45,936** (not the old $40,300 or $66,000). Repair's up-map to Specialist was rejected: Specialist is design/program/implement (Bachelor's), and the new Technician's own competency list literally includes "Maintenance & Troubleshooting."
- **Program → Specialist** (mid; new salary $85k–$147.7k, median $105k). **Plan → Integrator** (planning; new median $99,250).
- **NAME-COLLISION TRAP (load-bearing):** old `roleDetails.repair.roleName` is already `'Technician'` (a mid role). The NEW Technician is **entry** and must be built from the old **Operate/Operator** card, never the old `repair` card. Reason from job-activity text, never the matching string.
- **"Operator" demotes** from a category/result to a common job title under the new Technician (`commonJobTitles`).

---

# PHASE 4 — strip the build to the narrative flow (DESTRUCTIVE; needs go-ahead)

One tagged pass that does the Classic delete (per the phases-2-3 note) **and** the Exam archive together — same files, same operation. Two halves:

- **4a — reversible (doc-only, via `/revise-doc` + `doc-steward`):** demote Exam to "documented cut" in the specs, the same treatment Classic got in D-025 (Exam was a real, tested study condition — keep the record). Pull Exam out of the live descriptions and the gates. **Explicitly in 4a scope:** `DATA_MODEL.md` §17's exam subsections (the Exam row, the dashboard dispatch, the 8/7/7/8 invariant, `expectedCategoryMax {operate:11,repair:8,program:10,plan:11}`) must stop describing a live Exam flow **before** 4b deletes the code.
- **4b — destructive:** tag the recovery point, delete Classic + archive Exam, narrow the registry, re-baseline E2E.

## Recovery tag
`git tag archive/pre-narrative-only` **before any delete** (renamed from the old plan's `archive/classic-conveyor` since it now captures both Classic and Exam). This is the rollback point for everything below.

## Exam archive — verified delete / edit / keep (mirrors the classic list's rigor)

**DELETE (verified exam-only, no live non-exam importer):**
- `src/data/flows/examFlow.ts`
- `src/screens/Results/exam/` (whole folder: `ExamResults.tsx`, `CategoryBars.tsx`, `ScoreBreakdown.tsx`, `YourRoles.tsx`) — narrative results live in the sibling `Results/category/`, untouched.
- `src/screens/Flow/StatementSortView.tsx` (exam-only; the narrative uses `SceneSortView`; the shared `BucketSort` stays).
- `tests/e2e/exam.spec.ts`.
- `src/scene/RobotPlaceholder.tsx` — **conditional:** its importers are `ExamResults` (exam) + `Build`/`ClassicResults` (classic). It's only safe to delete because Classic is deleted in this **same** pass. After both, `LandingSceneHint` is the sole live file in `/src/scene` (so `/src/scene` survives, and stays in `CLAUDE.md`).
- **OPEN DECISION — `src/lib/categoryBreakdown.ts` (+ its `__tests__/categoryBreakdown.test.ts`).** The "why you scored that way" provenance engine is currently exam-only (only `ExamResults`/`ScoreBreakdown` import it). But its logic is flow-agnostic and step 8's #1 job is grafting match-explanation onto the **narrative** (the research-validated trust driver; `REALIGNMENT.md` §4 + the `results-screen` rubric). **Recommended: KEEP it** (don't delete with exam) — it's pure, tested, and exactly what step 8 wants; the only cost is it sits unwired until step 8, and its test fixture needs a narrative-shaped re-cut in Phase 5. **Alternative:** delete now, rebuild at step 8 (loses a working engine). This mirrors the existing `programs`/`competencies` open decision in the phases-2-3 note — settle both before deleting. If KEPT, do **not** prune its `lib/index.ts` exports.

**EDIT (surgical):**
- `src/data/flows/index.ts` — drop the `examFlow` import, the `exam:` registry entry, the re-export, and `examFlow` from `flowList`. (The choke point; everything is downstream of it.)
- `src/data/index.ts` — drop `examFlow` from the barrel re-export.
- `src/screens/Results/Results.tsx` — remove the `flow.kind === 'exam'` dispatch branch + the `ExamResults` import.
- **`src/lib/screenerFit.ts` — remove the `if (flowId === 'exam')` branch** in `deriveScreenerProfile` (education from `e-q1`). **This is the highest-risk miss: it is NOT in the phases-2-3 surgical-edit list** (that note predates the exam decision). The file stays live (narrative imports it).
- `src/lib/__tests__/screenerFit.test.ts` — drop the exam assertions (the "reads the exam education screener" block + the `deriveScreenerProfile('exam', ...)` line).
- `src/lib/__tests__/data-integrity.test.ts` — delete the entire `describe('§17 exam flow shape', ...)` block. The parametrized `describe.each(categoryFlows)` and the cross-flow blocks **self-collapse** (they iterate `flowList`), so they need no exam-specific edit.
- `src/screens/Flow/FlowRunner.tsx` — the `step.type === 'statementSort'` render branch is dead once `StatementSortView` is gone; remove it with the delete.
- If KEEP `categoryBreakdown.ts`: leave `lib/index.ts` alone. If DELETE: prune its two exports.

**KEEP (shared/live — do NOT delete; each has a live narrative or Select importer):** `categoryAccent.ts` (NodeMap uses it), `BucketSort.tsx`, `MCQuestion.tsx`, `SceneSortView.tsx`, `LandingSceneHint.tsx`, `FitNote.tsx`, `RoleDetailSheet.tsx` (narrative + Select), `categoryScoring.ts` (its dead `case 'statementSort'` arms are harmless), `RoleSelect.tsx` + `role-select.spec.ts`, `sessionStore`/`useFlow`/`useQuestionSet` (no exam-specific branch; they resolve via the registry), `Landing.tsx` (the switcher filters `flowList` by kind, so the Exam segment auto-disappears — cosmetic only).

## Gates + docs to reconcile (Exam half)
- **`.claude/agents/verifier.md` + `.claude/skills/data-author/SKILL.md`** — remove the Exam invariant bullets (the 8/7/7/8, the unequal `expectedCategoryMax {operate:11,repair:8,program:10,plan:11}`). This is the explicit reversal of part of D-026. Narrative + shared invariants stay.
- **Rubrics stay** (`results-screen.md`, `design-system-compliance.md`); just retarget the exam-dashboard example lines to the narrative node map. The four-category accent map stays for now (Phase 5 collapses it to three).
- **Spec docs** carry Exam as a live sibling because D-025 deliberately kept it: `DATA_MODEL §17` (~15 hits), `PRD` (~14), `ARCHITECTURE` (~11), plus `DESIGN_SYSTEM`, `ROADMAP`, `README`, `HARNESS.md`. Drive these through `/revise-doc` so `doc-steward` reconciles the §-refs. **`CLAUDE.md`'s** six exam mentions reconcile in the Phase-5 CLAUDE rewrite (below), not here.

## Corrected order-of-operations (gates green between groups)
The phases-2-3 order was written for classic-only and goes red if followed literally with Exam folded in. Corrected groups:
1. **Tag** `archive/pre-narrative-only`.
2. **Tests first.** Delete the 4 classic lib tests + `exam.spec.ts` (+ `categoryBreakdown.test.ts` if deleting it). Trim `data-integrity.test.ts`: drop the §15/§16 classic blocks **and the entire `§17 exam flow shape` block** (this must land here, before the registry drop, or `flows.exam` goes undefined and the block throws). Trim the exam asserts from `screenerFit.test.ts`. → `pnpm test:unit` green, narrative-only.
3. **Delete exam source + narrow the registry.** Remove all exam consumers **first** (`Results/exam/*`, the `Results.tsx` exam branch, the `screenerFit.ts` exam branch, `StatementSortView`, the `FlowRunner` branch), then `examFlow.ts` + `flows/index.ts` + `data/index.ts`. Then the classic screens/state per the phases-2-3 note. **Narrow `FlowId` LAST** (see acceptance check). → typecheck green.
4. **Delete classic lib + data + prune barrels** (phases-2-3 note), then `RobotPlaceholder.tsx`.
5. **E2E re-baseline + switcher cull in the same group:** 7 → **~3** (`narrative.spec`, `role-select.spec`, the rehomed `reduced-motion.spec`). `happy-path` + `compare` + `exam` deleted. Land the Landing switcher segment cull here so `role-select.spec`'s `flow-select` tap still targets the right segment.
6. **Docs/gates prose** (4a items if not already done), then full gates + an adversarial verify workflow (orphaned-data / dangling-import skeptic + documented-cut-fidelity skeptic), then commit + log **D-027** + `/phase-check` ticks `STATUS.md`.

## Phase-4 acceptance checks (these make Phase 5 clean)
- **`FlowId` narrowed to `'narrative'` only, LAST** — after every exam/classic consumer is gone, or typecheck reds.
- **`RoleId` and the classic `SessionState` fields deleted** (`scoreResult`, `robot`, `currentlyTryingOn`, `decisions`, `currentRound`). `RoleId`'s literals are **already** `technician/specialist/integrator` — exactly what Phase 5 renames `CategoryId` to. Deleting `RoleId` here is what makes the Phase-5 rename collision-free. Make this an explicit check, not an afterthought.
- Build stays on the **four-category** model throughout Phase 4. The 4→3 is Phase 5's job only.

---

# PHASE 5 — pivot to the three ARM roles (4→3)

Gated on a content re-cut, then a mechanical pass. **Order within the phase matters:** re-cut the content to three logical roles FIRST (still under the old literal names is fine), THEN do the rename + array shrink + recompute as one typecheck-gated commit. Renaming literals before the merge content is settled produces two sources both wanting to be `technician` and a flow that fails the "scene covers all categories" invariant.

## 5a — content re-cut (your authoring judgment; agent can draft, you approve)
- Re-cut the canonical content spec (`docs/reference/Narrative Quiz Structure Content Spec.md`, and its parent-Capstone twin) to three roles first; the data files cite it as their source.
- **roleDetails:** collapse operate+repair → one `technician` card from the old Operate content, **salary reconciled to the ARM source ($45,936**, currently $40,300 on operate), HS/GED, `commonJobTitles` = old Operator titles + the maintenance titles. Refresh Specialist/Integrator salary + education to the new source numbers.
- **narrative scenes (7):** each currently has one Operate + one Repair choice; merge that pair into a single entry-Technician choice per scene (or a fresh combined one), dropping each scene 4 → 3 choices. Same merge for the two scored intro questions (Q4/Q5).
- **screener tier ladder (narrative Q1–Q3):** the middle education rung loses its role (new Technician = HS = level 0; Specialist + Integrator both = Bachelor's = level 2). Decide where the "$60k / 1–2 year" (level-1) answer now points. With Exam gone, there's no second instrument to keep in sync, so this is a single-flow call now.

## 5b — mechanical pivot (mostly agent, once 5a is locked)
- `types.ts`: `CategoryId` → `'technician' | 'specialist' | 'integrator'`; shrink `CATEGORIES`; drop the now-orphaned `StatementSortStep`/`SortStatement` and the `'exam'` arm of `CategoryFlow.kind` (deferred from Phase 4).
- `categoryScoring.ts`: rewrite `zeroWeights()` (a hardcoded 4-key literal — does NOT auto-follow `CATEGORIES`; derive it from `CATEGORIES` so it can't drift again).
- `roleDetails.ts`, `categoryAccent.ts` (4 → 3 keys; one of gold/orange survives for Technician), and recompute each flow's `expectedCategoryMax` **after** the content freezes.
- **`nodeLayout.ts` `CATEGORY_ANGLES` + `FitRadar.tsx` — REQUIRED typecheck fix, not deferred.** A 3-key `CategoryWeights` against a 4-key `Record<CategoryId>` is a hard compile error, so the diamond → triangle angle change (e.g. -90/30/150) must ship in 5b. The *aesthetic* question ("is a 3-axis radar even right" — a triangle is a degenerate radar) defers to step 8.
- **Test re-baseline scope (wider than the first draft):** `data-integrity.test.ts`, `narrative.spec.ts`, **`role-select.spec.ts`** (it hardcodes `toHaveCount(4)` + `repair`/`program` testids), and the unit specs **`nodeLayout.test.ts` / `categoryScoring.test.ts` / `screenerFit.test.ts`** (all full of 4-key literals). Flip `narrative.spec`'s name-collision assertions: the node that yields "Technician" is now the Operate-derived entry role at $45,936, not the old `repair` node.
- **Gates + docs:** rewrite `verifier.md` + `data-author` to the three-role narrative invariants; `DATA_MODEL §17` owner-first via `/revise-doc`; then the other specs reconcile.
- **`CLAUDE.md` hard rule (the clean handoff from Phase 4):** Phase 4 left a standing four-category rule. Phase 5 **replaces it wholesale** with "the live model scores RC.org's three published roles: Robotics Technician (entry), Specialist (mid), Integrator (planning)," **retires the D-017 carve-out** (Operator folds into the entry Technician, so there's no fourth role left to quarantine), and drops the classic-vs-study distinction. **Sweep the WHOLE file**, not just the hard-rules bullet — grep `four categor`, `all four`, `three role families`, `Operate/Repair/Program` and reconcile every hit, or the blurb prose will contradict the rule.
- Verify with an adversarial workflow (name-collision mislabel, triangle geometry, max recompute), then log **D-028**.

---

## Out of scope (do NOT pull into the sweep)
- **Step 8** — the high-fidelity narrative results screen on kit tokens: define the match %, frame the entry Technician as a starting rung (the old "Operator deflation" concern, now on Technician), wire match-explanation onto the narrative (this is where `categoryBreakdown` earns its keep if KEPT), re-introduce category-keyed programs (the "somewhere to go" gap), redesign the Landing hero, retone `arm-blue`, and resolve the 3-axis-radar viz. Then a graded `/design-review`.
- The shared `rc-design-system` package (deferred).
- Fivestar alignment: confirm our three role names match theirs (their quiz went scenario-based + three-role on June 22) before the handoff — an open item, not code.
