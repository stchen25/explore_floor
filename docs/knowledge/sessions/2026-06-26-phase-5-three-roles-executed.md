# 2026-06-26 — Phase 5 executed: collapsed to ARM's three roles (D-028)

Executed the final phase of the realignment sweep. The prototype now scores **ARM's three live robotics roles** (Technician / Specialist / Integrator) instead of the four study categories. Committed as **D-028 (`a69e5c4`)**. This note is the execution handoff; the forward work (step 8) is below. The plan this session followed is `sessions/2026-06-25-strip-to-narrative-and-three-roles.md` (Phase 5 section).

## State at end (start a new chat here)
- Branch **`narrative-v3-realign`**, **14 commits ahead of `main`**, working tree **clean**.
- **Gates green:** lint, typecheck, **49 unit (5 files)**, **3 E2E** (`narrative` / `role-select` / `reduced-motion`).
- **Live model:** `CategoryId = 'technician' | 'specialist' | 'integrator'` (`CATEGORIES` order technician > specialist > integrator). `expectedCategoryMax {11,11,11}`. The narrative flow + the `/select` comparator are the live surface; Landing switcher reads **Narrative / Select**.
- The realignment sweep is **complete** (D-024 foundation → D-025 specs → D-026 gates → D-027 strip → D-028 three roles). Next is **step 8** (the high-fidelity results screen), which the sweep existed to unblock.

## What this session did
- **5a (content, user-approved):** collapsed `roleDetails` to three cards — entry **Technician** built from the old Operate/Operator card (HS/GED, national median **$45,936**), **Specialist** ($85k–$147.7k, median $105k), **Integrator** ($87k–$153k, median $99,250), all from `docs/reference/ARM Updated Role Structure - Source Content.md`. Re-cut the 7 scenes + Q4/Q5 from **4 → 3 choices** (each operate+repair pair merged into one technician choice). **Rebuilt the salary question** on the real ARM ranges: `$45,000` → technician, `$85,000` and `$105,000+` → specialist + integrator. **Left Q2 "1-2 years" unscored** (matches no role; this is the equalizer that keeps the three ceilings at 11/11/11).
- **5b (mechanical):** renamed the `CategoryId` literals; removed `StatementSortStep`/`SortStatement` + the `CategoryFlow.kind` `'exam'` arm; derived `zeroWeights()` + `FitRadar` `gridWeights` from `CATEGORIES`; flipped the node-map + fit-radar from a 4-axis diamond to a **3-axis triangle** (`CATEGORY_ANGLES` technician −90 / specialist 30 / integrator 150); collapsed `categoryAccent` to 3 keys (technician→gold, specialist→blue, integrator→teal); trimmed the dead `howler` / `@types/howler` devDeps.
- **Tests:** re-baselined all 5 unit specs + 3 E2E. Flipped `narrative.spec`'s name-collision asserts so the node yielding "Technician" is the Operate-derived **entry** role at $45,936.
- **Docs + harness:** swept `CLAUDE.md` whole-file (hard rule rewritten to three roles, **D-017 carve-out retired**), `verifier.md`, `data-author`; `doc-steward` reconciled `DATA_MODEL` §17 (owner) + PRD / ARCHITECTURE / DESIGN_SYSTEM / ROADMAP / README / CONTEXT_BRIEF / HARNESS and rewrote the content spec to match the live data; both rubrics + `design-reviewer.md` retargeted. `doc-steward` also caught a real contradiction it fixed: `DATA_MODEL` had said the intro questions "remain unmapped for scoring," which the code contradicts. Logged D-028, ticked STATUS.

## Settled decisions (don't relitigate)
- **"1-2 years of college" is unscored** — it matches no ARM role (above HS, below Bachelor's), which is both the honest mapping and the lever that equalizes the maxes to `{11,11,11}`. (The alternative, scoring it toward technician for `{12,11,11}`, was rejected per the user's equalize ask.)
- **Salary can't separate Specialist from Integrator** (their ranges overlap, Integrator's median is lower), so both high salary choices feed `[specialist, integrator]`. Salary only sorts entry vs degreed — by design.
- **"Operator" is gone as a result** — it survives only as a Technician common job title. The "frame the entry result as a starting rung" open question (REALIGNMENT §11) now lands on the **Technician** result.
- `categoryBreakdown.ts` stays kept-and-unwired (the step-8 match-explanation engine).

## Next session — step 8 (the high-fidelity narrative results screen)
The sweep's payoff. On the kit-aligned tokens, against `docs/rubrics/results-screen.md` (graded `/design-review`). Open items (STATUS + REALIGNMENT §11):
- **Define what the match percentage means** in one plain line (the #1 content gap from testing).
- **Frame the entry Technician result as a starting rung** with a visible path up to Specialist/Integrator, not a verdict.
- **Wire match-explanation onto the narrative** (`categoryBreakdown.ts` is kept, pure, tested, unwired).
- **Reintroduce a role-keyed programs set** (the live results surface zero programs — the known "somewhere to go" gap; `programs`/`programSelection` were deleted in Phase 4).
- **Resolve the 3-axis-radar viz** — a triangle is a degenerate radar; this aesthetic call was deferred here from 5b. The geometry is wired and correct; the question is whether a triangle radar is the right read.
- **Redesign the Landing hero** (frees the `scene/*` token removal) and **retone `arm-blue`** (fails AA at 2.7:1 as text).

## Out of scope / open follow-ups (not code)
- **Parent-Capstone twin** of the content spec (`Capstone/Protype Testing/Quiz/...`) was left untouched (outside this repo; Cowork's domain). It still describes four categories.
- **Fivestar name check:** confirm our three role names match theirs (they added three AI-prefixed variants + went scenario-based on their own quiz) before the July 21 handoff. An alignment item, not code.
- The branch is unpushed; no PR opened (the user drives that).
