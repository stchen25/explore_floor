# Data Model

This is the schema spec for everything in `/src/data` and the pure helpers in `/src/lib` that consume it. It's the load-bearing doc. Get this right and the rest of the build is structured edits; get it wrong and the experience leaks logic into UI code, which is the failure mode this convention exists to prevent.

The single guiding principle: **data is data, not code.** All content (interest items, weights, role copy, competency wording, programs, robot part mappings) lives here. UI reads it. Logic transforms it. Nothing about the content lives in a component.

---

## 1. Overview

The model has six core entities:

- **InterestItem** — one of the 24 things the user sorts. Carries archetype weights, a round assignment, and a robot-part contribution.
- **Archetype** — Builder, Innovator, Architect. The internal scoring lens. Each maps 1:1 to a Role.
- **Role** — Robotics Technician, Robotics Specialist, Robotics Integrator. ARM's real role taxonomy. Carries competencies, jobs, and pathway framing.
- **Competency** — a specific ARM-framework competency belonging to a role.
- **EssentialSkill** — a shared soft skill from ARM's framework. Used in results copy and program matching.
- **TrainingProgram** — a mock program that builds toward a role and its competencies. The "programs that get you there" content on results.

Plus two runtime structures:

- **SessionState** — the user's in-flight sorting decisions, scores, and robot.
- **ScoreResult** — what the scoring engine produces.

## 2. TypeScript types

All types live in `/src/data/types.ts`.

```ts
// ---------- Archetypes & Roles ----------

export type ArchetypeId = 'builder' | 'innovator' | 'architect';

export type RoleId = 'technician' | 'specialist' | 'integrator';

/** Each archetype maps to exactly one role. */
export const ARCHETYPE_TO_ROLE: Record<ArchetypeId, RoleId> = {
  builder: 'technician',
  innovator: 'specialist',
  architect: 'integrator',
};

export interface Role {
  id: RoleId;
  archetypeId: ArchetypeId;
  name: string;            // "Robotics Technician"
  archetypeName: string;   // "Builder"
  shortDescription: string; // teen-friendly plain language
  pathFraming: string;      // typical educational pathway, plain language
  competencyIds: string[];
  jobs: Job[];
}

export interface Job {
  title: string;
  description: string;     // one-liner, plain language
}

// ---------- Competencies & Skills ----------

export interface Competency {
  id: string;
  roleId: RoleId;
  name: string;            // "PLC (Programmable Logic Controller)"
  plainName: string;       // teen-friendly translation; see section 5
}

export interface EssentialSkill {
  id: string;
  name: string;            // "Critical Thinking"
}

// ---------- Interest items ----------

/** Weights are integers 0-3. 0 = no signal, 1 = light lean, 2 = clear lean,
 *  3 = defining. An item can contribute to multiple archetypes. */
export interface ArchetypeWeights {
  builder: number;
  innovator: number;
  architect: number;
}

export type RoundId = 1 | 2 | 3 | 4;

export interface InterestItem {
  id: string;              // stable identifier, e.g. 'building-or-fixing'
  round: RoundId;
  label: string;           // what the user reads on the card
  weights: ArchetypeWeights;
  robotContribution: RobotContribution;
}

// ---------- Robot ----------

/** A robot has a fixed set of slots. Each kept interest contributes to one
 *  or more of them. The build logic resolves conflicts (last-wins by default;
 *  see section 9). */
export type RobotSlot =
  | 'base'
  | 'body'
  | 'leftArm'
  | 'rightArm'
  | 'head'
  | 'accessory'        // up to N accessories can stack
  | 'decal'            // up to N decals can stack
  | 'colorScheme';

export interface RobotContribution {
  /** Description for designers/authors. Not shown to user. */
  intent: string;
  /** One or more part contributions applied if this interest is kept. */
  parts: RobotPartRef[];
}

export interface RobotPartRef {
  slot: RobotSlot;
  partId: string;          // refs an entry in /src/data/robotParts.ts
}

export interface RobotPart {
  id: string;
  slot: RobotSlot;
  name: string;            // designer-facing label
  svgComponent: string;    // name of the React/SVG component to render
}

// ---------- Programs ----------

export interface TrainingProgram {
  id: string;
  name: string;
  type: 'apprenticeship' | 'certificate' | 'degree' | 'bootcamp' | 'workshop';
  duration: string;        // "12 weeks", "2 years", etc.
  rolesServed: RoleId[];
  competencyIds: string[]; // which competencies this program builds
  blurb: string;           // 1-2 sentence description
  url?: string;            // optional, mocked
}

// ---------- Runtime ----------

export type Decision = 'keep' | 'pass';

export interface SessionState {
  currentScreen: 'landing' | 'sort' | 'build' | 'results';
  currentRound: 0 | 1 | 2 | 3 | 4;     // 0 = not started, 4 = sorting done
  decisions: Record<string, Decision>; // keyed by InterestItem.id
  scoreResult: ScoreResult | null;
  robot: RobotState | null;
  currentlyTryingOn: RoleId | null;    // results screen state
  soundEnabled: boolean;
}

export interface RobotState {
  slots: Partial<Record<RobotSlot, string | string[]>>; // partId or array for stacking slots
  isFinalized: boolean;     // true only after completion
}

export interface ScoreResult {
  raw: ArchetypeWeights;            // sum of weights for kept items, per archetype
  matchPercentages: ArchetypeWeights; // 0-100 per archetype, see scoring formula
  primaryArchetype: ArchetypeId;
  primaryRole: RoleId;
  ranking: ArchetypeId[];            // ordered, primary first
}
```

## 3. The 24 interest items

Seeded weights below are **designer defaults** (per PRD section 7). They produce a believable spread. Their per-archetype maxes are Builder 22, Innovator 27, Architect 25. These maxes do not need to match: the scoring engine normalizes each archetype against its own maximum (`raw[A] / max[A] * 100`), so no archetype is structurally favored regardless of its raw ceiling. ARM's dev team owns tuning for production.

| # | Round | Label | B | I | A | Robot intent |
|---|-------|-------|---|---|---|--------------|
| 1 | 1 | Building or fixing things | 3 | 0 | 0 | Add a wrench tool to an arm |
| 2 | 1 | Taking things apart to see how they work | 2 | 2 | 0 | Add an opened-panel decal showing wires |
| 3 | 1 | Coding or modding games | 0 | 3 | 0 | Spray binary 1s and 0s across the chest |
| 4 | 1 | Solving puzzles or brain teasers | 0 | 3 | 0 | Add a puzzle-piece accessory |
| 5 | 1 | Planning hangouts or events for friends | 0 | 0 | 3 | Clip on a clipboard |
| 6 | 1 | Turning ideas into real plans | 0 | 0 | 3 | Add a blueprint roll under one arm |
| 7 | 2 | Shop class or robotics club | 3 | 0 | 0 | Add a small robotic arm attachment |
| 8 | 2 | Hands-on science experiments | 2 | 2 | 0 | Add a beaker accessory |
| 9 | 2 | Coding or computer class | 0 | 3 | 0 | Add a chip-pin to the chest |
| 10 | 2 | Solving math or science problems | 0 | 3 | 0 | Add a graph decal on shoulder |
| 11 | 2 | Keeping your group on track | 0 | 0 | 3 | Add a headset accessory |
| 12 | 2 | Planning ahead before starting something | 0 | 0 | 3 | Add a calendar/timeline decal |
| 13 | 3 | Taking things apart to find what's wrong | 3 | 0 | 0 | Add a magnifier on a head sensor |
| 14 | 3 | Trying things until something works | 3 | 0 | 0 | Add a slightly soldered/repaired arm look |
| 15 | 3 | Looking up how others fixed it | 0 | 2 | 0 | Add a small reference-book accessory |
| 16 | 3 | Testing different solutions | 0 | 3 | 0 | Add a checklist-with-checkmarks decal |
| 17 | 3 | Writing or drawing out a plan first | 0 | 0 | 3 | Add a pencil-tucked-behind-sensor look |
| 18 | 3 | Figuring out how all the steps connect | 0 | 0 | 3 | Add a flowchart decal on the back |
| 19 | 4 | Fixing things when they break | 3 | 0 | 0 | Add a wrench-and-screwdriver tool belt |
| 20 | 4 | Noticing when something needs fixing | 3 | 0 | 0 | Add a warning-light indicator on head |
| 21 | 4 | Wanting to know how and why things work | 0 | 3 | 0 | Add a question-mark thought-bubble pin |
| 22 | 4 | Finding smarter or faster ways to do things | 0 | 2 | 2 | Add a lightning-bolt accent |
| 23 | 4 | Seeing how everything fits together | 0 | 0 | 3 | Add a network/web pattern decal |
| 24 | 4 | Spotting problems before they happen | 0 | 1 | 2 | Add a small antenna/scanner on head |

Notes for the author of `/src/data/items.ts`:

- Build the array in this order. Round assignments and weights match the table verbatim.
- The "Robot intent" column is a starter description; the actual `parts` array per item refers to `partId`s from the part library (section 7). Pencil in placeholder IDs that match these intents; the SVG components themselves get authored alongside Phase 2 of the build.
- Many cells are zero. The schema requires all three weight fields. Do not omit them.

**Sanity totals (max possible if user keeps every item):** Builder 22, Innovator 27, Architect 25.

## 4. Roles

The three Role objects live in `/src/data/roles.ts`. Below is the canonical content for each. Plain-language descriptions are starter copy; the final copy work is an open question in the PRD.

### `technician` — Robotics Technician (Builder)

- **shortDescription:** "Technicians install, maintain, and repair the robots and equipment that keep factories running. Hands-on, learn-by-doing, real machines."
- **pathFraming:** "Often starts with an apprenticeship or a technical certificate. Many technicians grow into senior tech and shift-supervisor roles, learning on the job."
- **competencyIds:** see section 5.
- **jobs:**
  - Robotics Technician — Installs and repairs the robots on a factory floor.
  - Manufacturing Maintenance Technician — Keeps all the machines and equipment running smoothly.
  - Automation Equipment Operator — Runs and monitors automated machinery day to day.
  - Robot Repair Specialist — Diagnoses and fixes robots when something goes wrong.
  - Assembly Line Technician — Maintains the tools and equipment used in production lines.

### `specialist` — Robotics Specialist (Innovator)

- **shortDescription:** "Specialists program robots and design the automated systems that make manufacturing faster and smarter. If you love figuring out how things work, this is the path."
- **pathFraming:** "Often a degree in engineering, computer science, or robotics. Specialists often become senior engineers, team leads, or R&D experts."
- **competencyIds:** see section 5.
- **jobs:**
  - Robotics Specialist — Programs robots and proposes upgrades to improve how they work.
  - Robot Programmer — Writes the code that tells robots what to do.
  - Automation Engineer — Designs automated systems that make manufacturing faster.
  - Controls Engineer — Builds the systems that control how machines behave.
  - Manufacturing Systems Developer — Creates software and systems that keep factories running efficiently.

### `integrator` — Robotics Integrator (Architect)

- **shortDescription:** "Integrators look at a whole factory, plan how robotic systems should fit in, and make sure all the pieces work together. Big-picture, coordination, strategy."
- **pathFraming:** "Often engineering or project management. Many grow up from specialist roles into project managers, system architects, or robotics consulting."
- **competencyIds:** see section 5.
- **jobs:**
  - Robotics Integrator — Evaluates factories and designs plans to introduce robotic systems.
  - Automation Project Manager — Leads teams to plan and deliver automation projects.
  - Systems Integration Engineer — Makes sure all the different parts of a robotic system work together.
  - Manufacturing Operations Manager — Oversees how an entire factory or production line runs.
  - Robotics Consultant — Advises companies on how to use robotics to improve their operations.

## 5. Competencies (real ARM framework)

All entries live in `/src/data/competencies.ts`. The `name` field is the official ARM term. The `plainName` field is a teen-friendly translation used in results copy. Plain names below are starter drafts; final copy is an open question.

### Technician competencies (`roleId: 'technician'`)

| id | name | plainName |
|----|------|-----------|
| tech-electrical | Electrical Systems | Working with the wiring and electrical guts of a machine |
| tech-electronics | Electronics & Controls | Setting up and tuning the controls that make machines behave |
| tech-fluid | Fluid Power | Working with the hydraulics and pneumatics that move heavy parts |
| tech-maintenance | Maintenance & Troubleshooting | Figuring out what's wrong and fixing it |
| tech-mechanical | Mechanical Systems | Working with the moving parts of machines |
| tech-plc | PLC (Programmable Logic Controller) | Programming the brains of industrial machines |
| tech-robot-programming | Robot Programming | Telling robots what to do in their own language |
| tech-system-controls | System Controls | Keeping a whole system running the way it should |

### Specialist competencies (`roleId: 'specialist'`)

| id | name | plainName |
|----|------|-----------|
| spec-advanced-programming | Advanced Robot Programming | Writing more complex code that makes robots do smarter things |
| spec-application | Application Emphasis | Picking the right robot for the right job |
| spec-inspection | Inspection/QA | Making sure everything robots make meets quality standards |
| spec-installation | Installation Concepts | Setting up new robots so they work the first time |
| spec-project-management | Project Management | Keeping a robotics project on time and on track |
| spec-troubleshooting | Robot and System Troubleshooting | Debugging the whole system when something breaks |
| spec-safety | Safety/Risk Assessment | Making sure no one and nothing gets hurt around robots |
| spec-sensors | Sensors | Working with the eyes, ears, and feel of a robot |
| spec-vision | Vision | Teaching robots to "see" with cameras |

### Integrator competencies (`roleId: 'integrator'`)

| id | name | plainName |
|----|------|-----------|
| int-arvr | Augmented Reality/Virtual Reality | Designing and testing factories in virtual space |
| int-big-data | Big Data | Pulling insight from huge piles of factory data |
| int-programming | Computer Programming | Writing code at the system level |
| int-interop | Interoperability | Making sure machines from different makers talk to each other |
| int-offline-programming | Offline Programming | Designing what a robot will do before it ever runs |
| int-simulation | Simulation | Modeling factories on a computer before building anything |
| int-process-design | System and Process Design | Designing how the whole factory should work |
| int-modeling | Systems Simulation/Modeling | Building digital twins of real systems |
| int-visualization | Visualization | Showing complex data and systems in ways people can understand |

## 6. Essential skills

The shared soft-skill list from ARM's framework. Lives in `/src/data/skills.ts`. Used in results to call out cross-cutting strengths the user's sorting revealed.

```
active-listening, adaptability, attention-to-detail, communication,
conflict-resolution, critical-thinking, interpersonal-skills, leadership,
problem-solving, teaming, technical-learning-ability, technology-aptitude,
time-management, work-ethic
```

Each is `{ id, name }` only. No plain-name translation needed; the names are already plain.

## 7. Robot parts library

Lives in `/src/data/robotParts.ts`. Each `RobotPart` references an SVG React component that lives in `/src/scene/robot/parts/`. The library is the **interface between data and visuals**: items reference part IDs, the build logic resolves them to SVG components.

For Phase 0 and 1, parts are placeholder shapes. Phase 2 is when the actual stylized SVG art gets made.

### Slot rules

| Slot | Cardinality | Conflict resolution |
|------|-------------|---------------------|
| `base` | 1 | last kept wins |
| `body` | 1 | last kept wins |
| `leftArm` | 1 | last kept wins |
| `rightArm` | 1 | last kept wins |
| `head` | 1 | last kept wins |
| `accessory` | many (cap at 4 visual stacks) | accumulate; order by item id |
| `decal` | many (cap at 3 visual stacks) | accumulate; order by item id |
| `colorScheme` | 1 | derived from dominant archetype after scoring |

### Seed part IDs

Author placeholder entries to match the "Robot intent" column in section 3. Examples:

```
{ id: 'wrench-arm', slot: 'rightArm', name: 'Wrench-tool arm', svgComponent: 'WrenchArm' }
{ id: 'binary-decal', slot: 'decal', name: 'Binary spray', svgComponent: 'BinaryDecal' }
{ id: 'chip-pin', slot: 'accessory', name: 'Chip pin', svgComponent: 'ChipPin' }
{ id: 'clipboard', slot: 'accessory', name: 'Clipboard', svgComponent: 'Clipboard' }
{ id: 'mini-robot-arm', slot: 'accessory', name: 'Mini robot arm', svgComponent: 'MiniRobotArm' }
{ id: 'hardhat', slot: 'head', name: 'Hard hat', svgComponent: 'HardHat' }
{ id: 'magnifier-head', slot: 'head', name: 'Magnifier sensor head', svgComponent: 'MagnifierHead' }
{ id: 'blueprint-roll', slot: 'accessory', name: 'Blueprint roll', svgComponent: 'BlueprintRoll' }
{ id: 'flowchart-decal', slot: 'decal', name: 'Flowchart decal', svgComponent: 'FlowchartDecal' }
...
```

The full set of ~24 parts is authored as items are seeded. Many parts can be reused across items (e.g. the wrench arm could be the contribution for items 1 and 19; that's fine and probably desirable for visual coherence).

### Color schemes

Each archetype has a color scheme defined in `/src/data/colorSchemes.ts`. Final palette is set in `DESIGN_SYSTEM.md`. The build logic picks a scheme based on the user's dominant archetype after scoring completes.

## 8. Mock training programs

Lives in `/src/data/programs.ts`. Seed about 6-10 representative programs covering all three role families. Accuracy is not required; structure is. The team can swap these out wholesale without breaking anything.

Seed examples:

```ts
{
  id: 'smart-tech',
  name: 'SMART Robotics Technician Program',
  type: 'certificate',
  duration: '16 weeks',
  rolesServed: ['technician'],
  competencyIds: ['tech-mechanical', 'tech-electrical', 'tech-maintenance', 'tech-plc'],
  blurb: 'A hands-on certificate covering the core skills technicians use day to day.'
}
{
  id: 'nc3-cert',
  name: 'NC3 Robotics Certification',
  type: 'certificate',
  duration: '12 weeks',
  rolesServed: ['technician', 'specialist'],
  competencyIds: ['tech-robot-programming', 'spec-installation', 'spec-safety'],
  blurb: 'Industry-recognized certification that opens doors at hundreds of manufacturers.'
}
{
  id: 'mechatronics-as',
  name: 'Mechatronics Associate Degree',
  type: 'degree',
  duration: '2 years',
  rolesServed: ['technician', 'specialist'],
  competencyIds: ['tech-electronics', 'tech-system-controls', 'spec-sensors', 'spec-vision'],
  blurb: 'Two-year degree blending mechanical, electrical, and programming foundations.'
}
{
  id: 'robotics-engineering-bs',
  name: 'Robotics Engineering BS',
  type: 'degree',
  duration: '4 years',
  rolesServed: ['specialist', 'integrator'],
  competencyIds: ['spec-advanced-programming', 'int-simulation', 'int-modeling'],
  blurb: 'A full engineering degree for the programming and design side of robotics.'
}
{
  id: 'industrial-apprenticeship',
  name: 'Manufacturing Apprenticeship',
  type: 'apprenticeship',
  duration: '2-4 years',
  rolesServed: ['technician'],
  competencyIds: ['tech-mechanical', 'tech-maintenance', 'tech-electrical'],
  blurb: 'Earn while you learn: paid apprenticeship with on-the-job training.'
}
{
  id: 'systems-integration-bootcamp',
  name: 'Automation Integration Bootcamp',
  type: 'bootcamp',
  duration: '8 weeks',
  rolesServed: ['integrator'],
  competencyIds: ['int-process-design', 'int-interop', 'int-visualization'],
  blurb: 'Intensive bootcamp for the system-design and integration side of automation.'
}
```

## 9. The scoring engine

Lives in `/src/lib/scoring.ts`. Pure function, no React, no side effects, fully unit-testable.

### Signature

```ts
export function calculateScores(
  decisions: Record<string, Decision>,
  items: InterestItem[]
): ScoreResult;
```

### Algorithm

1. For each archetype `A` in `['builder', 'innovator', 'architect']`:
   - `raw[A] = sum of items[i].weights[A] for every i where decisions[items[i].id] === 'keep'`
   - `max[A] = sum of items[i].weights[A] for every i in items` (the maximum possible)
   - `matchPercentages[A] = round(raw[A] / max[A] * 100)` clamped to integer
2. `primaryArchetype = archetype with the highest matchPercentages` (deterministic tiebreak: builder > innovator > architect)
3. `primaryRole = ARCHETYPE_TO_ROLE[primaryArchetype]`
4. `ranking = ['builder', 'innovator', 'architect'] sorted desc by matchPercentages`

### Properties to test

- All-keep produces 100/100/100 (saturation case)
- All-pass produces 0/0/0
- A user keeping only Builder-3 items produces high Builder, low others
- The function is pure (same input always produces same output, no global state read or written)
- It handles missing decisions for unsorted items by treating them as `'pass'`

### Tuning notes

The pass-equals-zero rule means a picky user can produce all-low scores honestly ("you haven't given us much signal yet for any of these"). The design should handle this gracefully on the results screen rather than the scoring engine artificially inflating numbers. Schema supports negative weights for later experiments; default v1 has no negative weights.

## 10. Robot assembly

Lives in `/src/lib/robotAssembly.ts`. Pure function.

### Signature

```ts
export function assembleRobot(
  decisions: Record<string, Decision>,
  items: InterestItem[],
  primaryArchetype: ArchetypeId | null
): RobotState;
```

### Algorithm

1. Initialize an empty `RobotState` with `isFinalized: false` and a default base/body/colorScheme.
2. For each item kept (`decisions[id] === 'keep'`), in item order:
   - For each `RobotPartRef` in that item's `robotContribution.parts`:
     - For single-cardinality slots: assign `partId` (overwrite previous).
     - For multi-cardinality slots (`accessory`, `decal`): append `partId` to the array, respecting the cap.
3. Set `colorScheme` from `primaryArchetype` (or default if null).
4. Return the state. `isFinalized` is set to `true` by the caller only at the Build beat.

### Live-build semantics

During sorting (Phase 2+), `assembleRobot` is called after every decision so the user sees the robot accrete in real time. On completion, the screen transitions to the Build beat which finalizes the state (`isFinalized: true`) and the snap-into-place animation plays.

If the user bails (closes, navigates away, refreshes) before completion, no robot is persisted. No half-robot leaves the experience.

## 11. Program selection

Lives in `/src/lib/programSelection.ts`. Given a role the user is "trying on," pick the most relevant programs.

### Signature

```ts
export function selectProgramsForRole(
  roleId: RoleId,
  programs: TrainingProgram[],
  options?: { max?: number }
): TrainingProgram[];
```

### Algorithm (v1, simple)

1. Filter `programs` to those whose `rolesServed` includes `roleId`.
2. Sort by number of competency matches with the role's `competencyIds` (descending), then by type preference (apprenticeship/certificate > bootcamp > degree for the HS audience).
3. Return top `max` (default 3).

The team can replace this scoring later. Keep it dumb in v1.

## 12. Session state

Lives in a Zustand store at `/src/state/sessionStore.ts`. Exposes:

```ts
interface SessionStore {
  state: SessionState;
  startSession: () => void;
  recordDecision: (itemId: string, decision: Decision) => void;
  advanceRound: () => void;
  completeSorting: () => void;     // triggers scoring, finalizes robot
  tryOnRole: (roleId: RoleId) => void;
  toggleSound: () => void;
  reset: () => void;
}
```

Conventions:

- `recordDecision` calls `assembleRobot` and updates the live (non-finalized) robot state.
- `completeSorting` runs `calculateScores`, sets `scoreResult`, sets `primaryRole`, sets `currentlyTryingOn` to the primary role by default, and marks `robot.isFinalized = true`.
- No persistence in v1. State lives in memory; refreshing the page starts fresh. The reset behavior is intentional for the prototype.

## 13. File layout

```
/src/data
  types.ts              All TypeScript interfaces
  items.ts              The 24 InterestItem objects
  roles.ts              The 3 Role objects
  competencies.ts       All Competency objects (grouped by role internally)
  skills.ts             The 14 EssentialSkill objects
  programs.ts           Mock TrainingProgram objects (~6-10)
  robotParts.ts         The RobotPart library
  colorSchemes.ts       Archetype -> color scheme mapping
  index.ts              Barrel export

/src/lib
  scoring.ts            calculateScores
  robotAssembly.ts      assembleRobot
  programSelection.ts   selectProgramsForRole
  index.ts              Barrel export

/src/state
  sessionStore.ts       Zustand store

/src/scene/robot/parts/ One SVG React component per RobotPart
```

Tests for the three lib functions live in `/src/lib/__tests__/`. They run as part of the standard `pnpm test` and are independent of Playwright.

## 14. Tuning surface

What's expected to change without code edits:

- **Any text:** item labels, role descriptions, plain-name competency translations, job descriptions, program blurbs.
- **All archetype weights** in `items.ts`. This is the primary scoring tuning surface.
- **Robot part assignments** per item (which partId each item references).
- **Mock training programs** added, removed, or edited freely.

What requires a code edit:

- Adding a fourth archetype or role (don't do this).
- Changing scoring algorithm shape.
- Adding new robot slots.
- Changing session state shape.

If a content change feels like it needs a code edit, stop and ask. It probably doesn't, and the convention is what keeps the team's iteration cheap.

## 15. Sanity checks before considering this doc "applied"

When `/src/data` is scaffolded from this doc, verify:

- All 24 items exist with all three weights set (no missing zeros).
- Sum-per-archetype across all items matches: Builder 22, Innovator 27, Architect 25.
- Every role's `competencyIds` array is non-empty and references real entries in `competencies.ts`.
- Every program references real role IDs and real competency IDs.
- Every item's `robotContribution.parts` references real entries in `robotParts.ts` (placeholders fine; the references must resolve).
- A unit test confirms `calculateScores` on an all-keep input returns 100/100/100.
- A unit test confirms `calculateScores` on an all-pass input returns 0/0/0.
- A unit test confirms `calculateScores` returns the expected primary archetype for a representative builder-heavy input.
