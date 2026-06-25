# Narrative Quiz V3, Language Update Guide for Claude Code

This guide hands off a focused language pass on the **Narrative** quiz flow in the `explore_floor` prototype. The previous round of testing picked the narrative version as the clear winner, so V3 builds on that one flow only. This pass updates **question and answer wording plus a few category mappings** to match the team's revised FigJam board. The selection mechanism and the higher-fidelity results screen are separate V3 workstreams and are out of scope here.

**Source of truth:** FigJam board "Narrative Quiz Structure" (`figma.com/board/HP9OFVXI69y7tKaFUJP1Lz`), section "Story line", node `7:313`. Where the board carries an obvious typo (for example "median in", "your the most", "parent''s"), keep the corrected wording the prototype already uses. We're matching content and mappings, not transcribing typos.

**Target file:** `src/data/flows/narrativeFlow.ts`. This is a data-only change. No scoring, runtime, or component logic should change.

---

## Two decisions to confirm before you start

These two items go beyond simple rewording, so confirm the intent before applying them. The rest of the guide is unambiguous and matches the board directly.

**1. New opening question.** The board adds a brand-new first question, "Do you have any experience in this field?" (Yes / No), ahead of the existing college question. It's drawn in pink (multiple choice) with a connector running into "Are you planning on going to college?", so it reads as an intentional addition, not a stray sticky. This guide includes it. If V3 should stay structurally identical to V2 and only reword existing questions, skip change **I-1** below.

**2. Scene 7 game examples.** The board shortened the scene 7 choices from "Puzzle-solving game like Portal or Outer Wilds" to just "Puzzle-solving game", and the same for the other three. Dropping the named examples removes the relatability hooks that worked well for the Gen Z audience, and it may just be sticky-note shorthand rather than a deliberate cut. This guide's default keeps the **current examples** for scene 7 and flags it. If the team really did mean to drop them, apply the shortened version shown in change **S-7**.

---

## Ground rules (do not change these)

- **Preserve these choice IDs.** `tests/e2e/narrative.spec.ts` references them by ID: `n-q1-no`, `n-q3-60`, `n-q4-typing`, `n-q5-solving`. Keep those IDs even where their labels stay the same. Other IDs can keep their current values; only add new IDs for genuinely new choices.
- **Keep `expectedCategoryMax: { operate: 9, repair: 9, program: 9, plan: 9 }`.** The new mappings still yield a full-path max of 9 per category, so the declared value is unchanged. `src/lib/__tests__/data-integrity.test.ts` asserts declared equals computed, so leave the number alone and let the test confirm it.
- **Don't touch** `landingCopy`, `resultsCopy`, the scene/MC step `type`s, the three-bucket sort labels (`src/data/flows/buckets.ts`), or `src/data/flows/screeners.ts`. The new experience question is an unscored background question and does **not** get a `SCREENER_LEVELS` entry.
- **Each `scene` step keeps exactly four choices, one per category.** Only `mc` steps may have a different count (Q4 grows from three choices to four).

---

## Changes, in flow order

### Intro questions (the `mc` steps)

**I-1. Add a new first question (see decision 1).** Insert a new `mc` step as the very first entry in `steps`, before `n-q1`. Move the existing opening prompt onto it.

```ts
{
  type: 'mc',
  id: 'n-q0',
  prompt: "Let's start with some basic questions...",
  question: 'Do you have any experience in this field?',
  choices: [
    { id: 'n-q0-yes', label: 'Yes', categories: [] },
    { id: 'n-q0-no', label: 'No', categories: [] },
  ],
},
```

No `branchTo` is needed; any answer advances to `n-q1`. Both choices are unscored (`categories: []`), like the other background questions.

**I-2. Remove the opening prompt from `n-q1`.** Because the "Let's start with some basic questions..." line now leads the new experience question, the college question should no longer carry it. Delete the `prompt` field from the `n-q1` step. Its `question`, choices, and the `branchTo: 'n-q3'` on the "No" choice all stay as they are.

**I-3. Q2 (`n-q2`, "How long?") and Q3 (`n-q3`, salary): no change.** Wording and choices match the board already.

**I-4. Q4 (`n-q4`) now has four choices, one per category.** The board split the old combined hands-on choice into two distinct ones and made every category map to exactly one choice.

| Current choice | Current mapping | New choice | New mapping |
|---|---|---|---|
| Doing hands-on work | operate, repair | Doing hands-on work | **operate** |
| (none) | (none) | **Making sure that things are working correctly** | **repair** |
| Typing on a computer | program | Typing on a computer | program |
| Leading others | plan | Leading others | plan |

Result for `n-q4.choices` (keep `id: 'n-q4-typing'`):

```ts
choices: [
  { id: 'n-q4-hands', label: 'Doing hands-on work', categories: ['operate'] },
  { id: 'n-q4-maintain', label: 'Making sure that things are working correctly', categories: ['repair'] },
  { id: 'n-q4-typing', label: 'Typing on a computer', categories: ['program'] },
  { id: 'n-q4-leading', label: 'Leading others', categories: ['plan'] },
],
```

**I-5. Q5 (`n-q5`) choices and mappings change.** The board dropped "Earning a lot of money", remapped the helping choice to repair only, and added "Building" for operate, so Q5 now also maps one choice per category. The prompt ("Okay, one last thing. What will bring you fulfillment?") and the question stay as they are.

| Current choice | Current mapping | New choice | New mapping |
|---|---|---|---|
| Inspiring others | plan | Inspiring others | plan |
| Earning a lot of money | plan | *(removed)* | — |
| Feeling like I'm helping people | operate, repair | Feeling like I'm helping people | **repair** |
| (none) | (none) | **Building** | **operate** |
| Solving difficult problems | program | Solving difficult problems | program |

Result for `n-q5.choices` (keep `id: 'n-q5-solving'`; delete `n-q5-money`):

```ts
choices: [
  { id: 'n-q5-inspiring', label: 'Inspiring others', categories: ['plan'] },
  { id: 'n-q5-helping', label: "Feeling like I'm helping people", categories: ['repair'] },
  { id: 'n-q5-building', label: 'Building', categories: ['operate'] },
  { id: 'n-q5-solving', label: 'Solving difficult problems', categories: ['program'] },
],
```

### Story scenes (the `scene` steps)

Only the choices listed below change. Every scene's prompt and question text stays as it is, and every scene keeps four choices, one per category. Update labels in place; keep the existing IDs (they're keyed by category, e.g. `n-s1-repair`).

**S-1. Scene 1 (`n-s1`), "How do you start the day?"**

| Category | Current label | New label |
|---|---|---|
| repair | Help my parents make breakfast | **Helping a younger sibling get ready** |
| operate | Walk my dog | **Make breakfast for myself** |

Plan ("Get dressed in the outfit I planned the night before") and program ("Write down a step-by-step to-do list") are unchanged.

**S-2. Scene 2 (`n-s2`): no change.** All four choices match the board.

**S-3. Scene 3 (`n-s3`), "What are you most excited for?"**

| Category | Current label | New label |
|---|---|---|
| operate | Building a diorama | **Building a 3D model** |

The other three choices are unchanged.

**S-4. Scene 4 (`n-s4`): no label change, open item resolved.** The board no longer flags "IT club" with "??", so the team has settled on it. Keep the label "IT club" (repair). If there's a `??` or "(unsettled)" note in a code comment, you can remove it.

**S-5. Scene 5 (`n-s5`), "What are you doing around the house?"**

| Category | Current label | New label |
|---|---|---|
| repair | Helping my parents with some chores | **Fix your bike** |
| operate | Playing with Legos | **Assemble a bird house** |

Program ("Coding a game") and plan ("Planning the rest of my week") are unchanged.

**S-6. Scene 6 (`n-s6`), "Which assignment would you want to complete the most?"**

| Category | Current label | New label |
|---|---|---|
| repair | Re-do a previous assignment | **Editing an essay** |

Program ("Writing code") loses its "??" open-item status on the board (the team settled on it). Keep the label "Writing code"; remove any "unsettled" code comment. Plan and operate are unchanged.

**S-7. Scene 7 (`n-s7`), "What are you playing?" (see decision 2).** Default: **leave the current labels with their examples as they are.** If the team confirms the board's shortened version, apply:

| Category | Current label | Shortened label (only if confirmed) |
|---|---|---|
| program | Puzzle-solving game like Portal or Outer Wilds | Puzzle-solving game |
| plan | Strategy game like Civ or TFT | Strategy game |
| operate | Building game like Minecraft or Animal Crossing | Building game |
| repair | Simulation game like Sims or Cities Skylines | Simulation games |

---

## Update the e2e test

`tests/e2e/narrative.spec.ts` imports `narrativeFlow` and walks it, so it needs two small edits only if change **I-1** (the new question) is applied. If I-1 is skipped, the test needs no changes.

1. Add the new question to the answer map so the helper can resolve its label:

```ts
const mcAnswers: Record<string, string> = {
  'n-q0': 'n-q0-no', // new experience question, unscored
  'n-q1': 'n-q1-no', // branches over n-q2
  'n-q3': 'n-q3-60',
  'n-q4': 'n-q4-typing',
  'n-q5': 'n-q5-solving',
};
```

2. Answer the experience question before the college question. Just before the existing "Are you planning on going to college?" assertion (around line 61), add:

```ts
await expect(
  page.getByRole('heading', { name: 'Do you have any experience in this field?' }),
).toBeVisible();
await page.getByRole('button', { name: mcLabel('n-q0'), exact: true }).click();
```

The unscored answer doesn't affect `calculateCategoryScores`, so the expected percentages and the `program` top-match assertion stay valid.

## Tests and files you do NOT need to change

- `src/lib/__tests__/categoryScoring.test.ts` and `categoryBreakdown.test.ts` build their own inline fixtures (they happen to reuse labels like "Walk my dog" and "Doing hands-on work"). They do **not** import `narrativeFlow`, so leave them alone; renaming real flow labels won't break them.
- `src/lib/__tests__/data-integrity.test.ts` needs no edit. It recomputes the max from the steps and checks it against the declared `expectedCategoryMax` (still 9 per category).

## Update the in-repo spec

Update `docs/reference/Narrative Quiz Structure Content Spec.md` so the repo's reference matches the build: add the new opening question, the revised Q4 and Q5 choices and mappings, the four reworded scene choices, and clear the two resolved open items ("IT club", "Writing code"). Update the source-pull date line to today and note the source as board node `7:313`.

## Verify

Run the repo's standard checks and confirm all green:

1. Typecheck and lint (the repo's `typecheck` and `lint` scripts).
2. Unit tests, especially `data-integrity.test.ts` (confirms `expectedCategoryMax` still holds) and the `categoryScoring` / `categoryBreakdown` suites.
3. `tests/e2e/narrative.spec.ts` (confirms the flow runs end to end with the new first question and that displayed percentages match the engine).

Then do a quick manual read-through of the narrative flow in the browser: the new experience question shows first under "Let's start with some basic questions...", the college question no longer repeats that prompt, Q4 shows four options, Q5 shows the revised four, and the four reworded scene choices read correctly.

---

## Appendix: full intended narrative content (post-update)

Use this as the target to implement against and to cross-check the file after editing. Mappings in parentheses; background questions carry no mapping.

**Opening prompt (on the first question):** "Let's start with some basic questions..."

- **Q0. Do you have any experience in this field?** Yes / No *(background, unscored; new in V3)*
- **Q1. Are you planning on going to college?** Yes (to Q2) / No (skip to Q3) *(background)*
- **Q2. How long?** Little as possible (1-2 years) / Typical (4 years) / Long as possible (4+ years) / Whatever *(background; shown only if Q1 = Yes)*
- **Q3. What is the lowest salary you would feel satisfied with?** Prompt: "Keep in mind, the median is $60,000 in the US." Choices: $40,000 / $60,000 / $80,000+ *(background)*
- **Q4. What would you be happy spending your day doing?** Prompt: "Workers in robotics do many different things throughout the day..."
  - Doing hands-on work (operate)
  - Making sure that things are working correctly (repair)
  - Typing on a computer (program)
  - Leading others (plan)
- **Q5. What do you think will bring you the most happiness?** Prompt: "Okay, one last thing. What will bring you fulfillment?"
  - Inspiring others (plan)
  - Feeling like I'm helping people (repair)
  - Building (operate)
  - Solving difficult problems (program)

**Story transition (before Scene 1):** "Alright, let's get started."

- **Scene 1.** "Your alarm goes off in the morning. You're getting ready for your first day of school." **How do you start the day?**
  - Get dressed in the outfit I planned the night before (plan)
  - Helping a younger sibling get ready (repair)
  - Write down a step-by-step to-do list (program)
  - Make breakfast for myself (operate)
- **Scene 2.** "You arrive at school, but have some time to kill." **What do you want to check out in that time?**
  - Take a look at the shop class (operate)
  - Explore the computer lab (program)
  - Meet with my friends to make some afterschool plans (plan)
  - Double-check my homework (repair)
- **Scene 3.** "The bell rings so you head to class. Your teacher hands you a handout of all the assignments for that year." **What are you most excited for?**
  - Taking the lead on a group project (plan)
  - Building a 3D model (operate)
  - Being a tutor to a younger student (repair)
  - Solving some difficult math problems (program)
- **Scene 4.** "It's lunch time! You usually spend this time with the club you are a part of." **Where will you be?**
  - Shop club (operate)
  - Computer science club (program)
  - Debate club (plan)
  - IT club (repair)
- **Scene 5.** "You're back home after a long day of school." **What are you doing around the house?**
  - Coding a game (program)
  - Fix your bike (repair)
  - Assemble a bird house (operate)
  - Planning the rest of my week (plan)
- **Scene 6.** "You have to do some homework." **Which assignment would you want to complete the most?**
  - Working on my presentation (plan)
  - Editing an essay (repair)
  - Writing code (program)
  - Make 10 posters for a club event (operate)
- **Scene 7.** "You finally have some time to relax. You decide to play a video game." **What are you playing?** *(labels below keep the examples; see decision 2)*
  - Puzzle-solving game like Portal or Outer Wilds (program)
  - Strategy game like Civ or TFT (plan)
  - Building game like Minecraft or Animal Crossing (operate)
  - Simulation game like Sims or Cities Skylines (repair)

After Scene 7, the user goes to results.
