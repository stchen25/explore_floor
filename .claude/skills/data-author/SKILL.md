---
name: data-author
description: Use when creating or editing anything in /src/data — interest items, archetype weights, roles, competencies, essential skills, training programs, robot-part mappings, or color schemes. Encodes the "data is data, not code" discipline and the DATA_MODEL invariants so content stays tunable without touching component logic. Trigger on tasks like "add/edit an interest item", "tune the weights", "update results copy", "add a mock program", or "map a robot part".
---

# Authoring `/src/data`

`DATA_MODEL.md` is the schema spec — **read it, don't restate it.** This skill is the working discipline for editing data safely. The single rule everything serves: **content lives in typed data, never in components.** The team tunes content constantly; a content change must never require editing logic.

## Where things live
`/src/data/`: `types.ts`, `items.ts` (24 interests), `roles.ts` (3), `competencies.ts`, `skills.ts` (14), `programs.ts` (~6-10), `robotParts.ts`, `colorSchemes.ts`, `questionSets/` (set A only — the classic flow; the A/B language test is retired, `DATA_MODEL.md` §16), `flows/` (the question-structure study: narrative/exam/classic + `roleDetails.ts` — `DATA_MODEL.md` §17), `index.ts` (barrel). See `DATA_MODEL.md` §13.

## Invariants — must hold after every edit (`DATA_MODEL.md` §15–§17)
- **24 interest items per question set** (set A / the classic flow), built in round order, each with **all three** weights present (`builder`, `innovator`, `architect`) — never omit a zero. Item ids are unique within a set.
- **Study flows (`flows/`, §17):** narrative = 7 scenes × 4 choices (one per category, each sorted into a bucket — D-018), branch targets resolve forward; exam = 30 statements counted 8/7/7/8, interleaved; both sorts share the 3 `SORT_BUCKETS` (`flows/buckets.ts`): That's me / **Kinda me** (id `maybe`) / Not me — edit that label once, there, for both flows. Each `CategoryFlow.expectedCategoryMax` must equal the computed full-path max (`data-integrity` enforces) — **if you change MC `categories`, recompute it** (e.g. exam Q1/Q2 now score on a tier ladder — No→operate, Maybe/Yes→program+plan, D-019 → max 11/8/10/11). Four categories operate/repair/program/plan — parallel to the three archetypes, never mixed. Background MC choices may map to **zero** categories (narrative intro still does; exam Q1/Q2 no longer — D-019). **Screener fit (D-020):** appetite levels + copy live in `flows/screeners.ts`, role `educationLevel`/`payLevel` (0–2) in `roleDetails.ts`; the comparison is `lib/screenerFit.ts` (don't put fit copy in the component). `data-integrity.test.ts` covers all of this per flow.
- **Per-archetype weight sums equal the set's declared `expectedSums`** (Set A: Builder 22 · Innovator 27 · Architect 25; other sets declare their own). Maxes need not be equal across archetypes or sets — scoring normalizes per archetype against its own max. If you change a weight, update that set's `expectedSums` and log it in `docs/knowledge/DECISIONS.md`.
- A question set owns its items + landing/sort/round/results copy; **roles, competencies, skills, programs, and robot parts stay shared** — never fork those per set.
- Weights are integers **0-3** (0 none, 1 light, 2 clear, 3 defining). Passing an item contributes 0 by default; negative weights are schema-allowed but off in v1.
- Every `Role.competencyIds` is non-empty and resolves to a real `competencies.ts` entry.
- Every `TrainingProgram` references real role IDs and real competency IDs.
- Every item's `robotContribution.parts` resolves to a real `robotParts.ts` entry (placeholder components are fine in Phase 0/1; the *reference* must resolve).
- Exactly three roles/archetypes — **never add, rename, or remove one.** Builder→Technician, Innovator→Specialist, Architect→Integrator.

## Tunable without code vs needs-code (`DATA_MODEL.md` §14)
- **Tunable (just edit data):** any text (labels, role descriptions, plain-name competency translations, job/program blurbs), all archetype weights, per-item robot-part assignments, the mock program set.
- **Needs code / stop and ask:** adding a fourth archetype/role, changing the scoring algorithm shape, adding robot slots, changing session-state shape. If a content change *feels* like it needs a code edit, it probably doesn't — re-check the schema first.

## Workflow
1. Confirm the change is data, not logic. If logic, stop and flag.
2. Edit the relevant `/src/data` file, matching existing types exactly (no `any`).
3. Re-run the affected invariants above (recompute weight sums by hand if you touched weights).
4. If `/src/lib` tests exist, run them (`pnpm test:unit`) — especially `scoring.test.ts`.
5. If you changed a weight max, copy/code-edit the expectation, and record the decision in `DECISIONS.md`.

## Anti-patterns (refuse)
- Putting copy, weights, or role text inside a component.
- Omitting a zero weight "for brevity."
- A config-driven generalization the spec didn't ask for (the sort is a fixed 4 rounds of 6 — build that).
