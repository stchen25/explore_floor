# Question-set authoring worksheet

> **SUPERSEDED (2026-06-07).** The A/B *language* test this worksheet served was replaced by the question-*structure* study (`DATA_MODEL.md` §17, `DECISIONS.md` D-017) before set B was authored. Set B and the formal/playful plan are retired. The live study's content lives in `src/data/flows/` and the verified transcription in `docs/reference/Narrative Quiz Structure Content Spec.md`. Kept below as a historical artifact + a still-valid template should a single-flow language A/B ever be revived (it would slot into the **classic** flow's QuestionSet).

The compilation template for the A/B language test (`DATA_MODEL.md` §16, `DECISIONS.md` D-016). Fill one copy of the **Set template** below per treatment — e.g. Set A formal/exam-like (CollegeBoard-ish), Set B playful/narrativized (Futurescape-ish). When a set is complete, hand it to Claude with "author this into `questionSets/` via data-author" and the tests will verify everything.

**The current build:** Set A is the original Phase 1 content (now wrapped by the classic flow). Set B was never authored — retired with the language test.

---

## Rules the content must obey (tests enforce these)

1. **Exactly 24 items, 6 per round, 4 rounds.** The flow, progress bar, and round beats assume this shape.
2. **Every item weights all three archetypes** with an integer **0–3** (0 none · 1 light · 2 clear · 3 defining). Items can legitimately lean two ways (e.g. `builder: 2, innovator: 2`).
3. **Weight sums don't need to balance.** Scoring normalizes each archetype against its own per-set maximum, so Builder/Innovator/Architect totals can differ — but give each archetype a healthy total (Set A's are 22/27/25) so all three paths can register. Record the three totals at the bottom of the item table; they become the set's declared `expectedSums`.
4. **One voice per set.** The set owns *all* the copy a participant reads — landing, cards, bin labels, round beats, results. Keep the treatment consistent end to end.
5. **Roles are fixed.** Robotics Technician (Builder) / Specialist (Innovator) / Integrator (Architect). The language *around* the results can change per set; the taxonomy and role content cannot.
6. **Every item maps to a robot part** from the catalog below (the literal, expressive build payoff). Multiple items may reuse a part only if they'd never both be kept... in practice: prefer one part per item; decals and accessories stack.
7. Reading level ~9th grade for both sets — "formal" means register and framing, not jargon.

### Robot-part catalog (valid `slot` / `partId` pairs)

| Slot | Parts |
|---|---|
| `head` | `magnifier-head`, `warning-light-head`, `antenna-head` |
| `rightArm` | `wrench-arm` |
| `leftArm` | `soldered-arm` |
| `decal` (stacks) | `open-panel-decal`, `binary-decal`, `graph-decal`, `calendar-decal`, `checklist-decal`, `flowchart-decal`, `network-decal` |
| `accessory` (stacks) | `puzzle-piece`, `clipboard`, `blueprint-roll`, `mini-robot-arm`, `beaker`, `chip-pin`, `headset`, `reference-book`, `pencil`, `tool-belt`, `question-pin`, `lightning-bolt` |

A new part is possible but is a code-side ask (new entry in `robotParts.ts` + eventually an SVG) — flag it rather than inventing an id.

---

## Set template (duplicate per set)

### Identity

| Field | Value |
|---|---|
| Set id | `a` / `b` |
| Switcher label (researcher-facing) | e.g. "Formal" / "Playful" |
| Treatment description (for the study log) | |

### Landing copy

| Field | Copy |
|---|---|
| Overline (small text above the title) | |
| Heading (the title) | |
| Description (one or two sentences framing the experience) | |
| CTA button | |

### Sort-screen copy

| Field | Copy |
|---|---|
| "Keep" bin label | |
| "Pass" bin label | |
| Drag hint (small text under the bins) | |

### Round-beat copy (shown between rounds; round 1 has none)

| Round | Internal theme (never shown) | Enter copy |
|---|---|---|
| 1 | | — |
| 2 | | |
| 3 | | |
| 4 | | |

### The 24 items

`id` is a short kebab-case slug (Set B ids get a `b-` prefix when authored). Weights: 0–3 per archetype.

| # | Round | id | Card label | Builder | Innovator | Architect | Robot part (slot / partId) |
|---|---|---|---|---|---|---|---|
| 1 | 1 | | | | | | |
| 2 | 1 | | | | | | |
| 3 | 1 | | | | | | |
| 4 | 1 | | | | | | |
| 5 | 1 | | | | | | |
| 6 | 1 | | | | | | |
| 7 | 2 | | | | | | |
| 8 | 2 | | | | | | |
| 9 | 2 | | | | | | |
| 10 | 2 | | | | | | |
| 11 | 2 | | | | | | |
| 12 | 2 | | | | | | |
| 13 | 3 | | | | | | |
| 14 | 3 | | | | | | |
| 15 | 3 | | | | | | |
| 16 | 3 | | | | | | |
| 17 | 3 | | | | | | |
| 18 | 3 | | | | | | |
| 19 | 4 | | | | | | |
| 20 | 4 | | | | | | |
| 21 | 4 | | | | | | |
| 22 | 4 | | | | | | |
| 23 | 4 | | | | | | |
| 24 | 4 | | | | | | |

**Declared totals (sum each weight column):** Builder ___ · Innovator ___ · Architect ___

### Results copy

| Field | Copy |
|---|---|
| Heading | |
| Compare hint (under the robot) | |
| Retake link | |
| Low-signal note (shown when the user passed on almost everything) | |
| Section label — how you match | |
| Section label — skills | |
| Section label — competencies | |
| Section label — programs | |
| Fit line — strong match | |
| Fit line — solid lean | |
| Fit line — light match | |

---

## Handoff checklist

- [ ] All 24 labels written in the set's voice; rounds of 6.
- [ ] Every item has three weights and a robot part from the catalog.
- [ ] Column totals recorded (these become `expectedSums`).
- [ ] All copy blocks filled — nothing left to "match the other set" implicitly.
- [ ] Authored into `src/data/questionSets/` via the data-author skill; `pnpm test` green.
