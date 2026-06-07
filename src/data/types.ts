// All shared data types for the experience. Schema spec: docs/DATA_MODEL.md §2.
// Data is data, not code — content lives in the sibling files, never in components.

// ---------- Archetypes & Roles ----------

export type ArchetypeId = 'builder' | 'innovator' | 'architect';

export type RoleId = 'technician' | 'specialist' | 'integrator';

/** Each archetype maps to exactly one role. */
export const ARCHETYPE_TO_ROLE: Record<ArchetypeId, RoleId> = {
  builder: 'technician',
  innovator: 'specialist',
  architect: 'integrator',
};

export interface Job {
  title: string;
  description: string; // one-liner, plain language
}

export interface Role {
  id: RoleId;
  archetypeId: ArchetypeId;
  name: string; // "Robotics Technician"
  archetypeName: string; // "Builder"
  shortDescription: string; // teen-friendly plain language
  pathFraming: string; // typical educational pathway, plain language
  competencyIds: string[];
  skillIds: string[]; // essential (soft) skills this role leans on; resolves to skills.ts
  jobs: Job[];
}

// ---------- Competencies & Skills ----------

export interface Competency {
  id: string;
  roleId: RoleId;
  name: string; // "PLC (Programmable Logic Controller)"
  plainName: string; // teen-friendly translation; see DATA_MODEL §5
}

export interface EssentialSkill {
  id: string;
  name: string; // "Critical Thinking"
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
  id: string; // stable identifier, e.g. 'building-or-fixing'
  round: RoundId;
  label: string; // what the user reads on the card
  weights: ArchetypeWeights;
  robotContribution: RobotContribution;
}

/** Per-round authoring + copy. The sort is a fixed 4 rounds of 6 (PRD §5.2). */
export interface RoundMeta {
  round: RoundId;
  /** Internal theme — authoring context only. NEVER rendered (PRD §5.2: no category labels). */
  theme: string;
  /** Encouraging beat shown when this round begins. Round 1 is null (it's the start). */
  enterCopy: string | null;
}

// ---------- Question sets (A/B language test) ----------

/** Sort-screen copy a question set owns: the two bin labels + the drag hint. */
export interface SortCopy {
  keepLabel: string;
  passLabel: string;
  dragHint: string;
}

/** Landing-screen copy a question set owns. */
export interface LandingCopy {
  overline: string;
  heading: string;
  description: string;
  cta: string;
}

/** Results-screen copy a question set owns (the shape of `resultsCopy`). */
export interface ResultsCopy {
  heading: string;
  compareHint: string;
  retake: string;
  lowSignal: string;
  sections: {
    match: string;
    skills: string;
    competencies: string;
    programs: string;
  };
  fit: Record<FitBand, string>;
}

export type QuestionSetId = 'a' | 'b';

/** A complete, standalone content variant for the A/B language user test (DATA_MODEL §16).
 *  A set owns its 24 interest items (own ids, labels, weights, robot mappings) and the copy
 *  around them; roles, competencies, skills, programs, and the robot-part catalog stay
 *  SHARED — the three-role taxonomy is fixed. */
export interface QuestionSet {
  id: QuestionSetId;
  /** Researcher-facing label on the landing switcher, e.g. 'Set A'. */
  name: string;
  items: InterestItem[];
  rounds: RoundMeta[];
  sortCopy: SortCopy;
  landingCopy: LandingCopy;
  resultsCopy: ResultsCopy;
  /** Declared per-archetype weight sums. The data-integrity test asserts declared ==
   *  computed, so each set carries its own maxima — they need not match across sets
   *  (scoring normalizes per archetype against its own max). */
  expectedSums: ArchetypeWeights;
}

// ---------- Robot ----------

/** A robot has a fixed set of slots. Each kept interest contributes to one
 *  or more of them. The build logic resolves conflicts (last-wins by default;
 *  see DATA_MODEL §10). */
export type RobotSlot =
  | 'base'
  | 'body'
  | 'leftArm'
  | 'rightArm'
  | 'head'
  | 'accessory' // up to N accessories can stack
  | 'decal' // up to N decals can stack
  | 'colorScheme';

export interface RobotContribution {
  /** Description for designers/authors. Not shown to user. */
  intent: string;
  /** One or more part contributions applied if this interest is kept. */
  parts: RobotPartRef[];
}

export interface RobotPartRef {
  slot: RobotSlot;
  partId: string; // refs an entry in /src/data/robotParts.ts
}

export interface RobotPart {
  id: string;
  slot: RobotSlot;
  name: string; // designer-facing label
  svgComponent: string; // name of the React/SVG component to render (Phase 2)
}

// ---------- Color schemes ----------

/** Archetype-derived color scheme for the robot + role accents (DESIGN_SYSTEM §3.3).
 *  Picked from the dominant archetype after scoring. */
export interface ColorScheme {
  id: ArchetypeId | 'default';
  accentToken: string; // Tailwind/Figma token name, e.g. 'arm-orange'
  accentHex: string; // raw hex for SVG fills / non-class usage
  name: string; // designer-facing label
}

// ---------- Programs ----------

export interface TrainingProgram {
  id: string;
  name: string;
  type: 'apprenticeship' | 'certificate' | 'degree' | 'bootcamp' | 'workshop';
  duration: string; // "12 weeks", "2 years", etc.
  rolesServed: RoleId[];
  competencyIds: string[]; // which competencies this program builds
  blurb: string; // 1-2 sentence description
  url?: string; // optional, mocked
}

// ---------- Runtime ----------

export type Decision = 'keep' | 'pass';

export interface SessionState {
  currentScreen: 'landing' | 'sort' | 'build' | 'results';
  currentRound: 0 | 1 | 2 | 3 | 4; // 0 = not started, 4 = sorting done
  decisions: Record<string, Decision>; // keyed by InterestItem.id
  scoreResult: ScoreResult | null;
  robot: RobotState | null;
  currentlyTryingOn: RoleId | null; // results screen state
  soundEnabled: boolean;
}

export interface RobotState {
  slots: Partial<Record<RobotSlot, string | string[]>>; // partId or array for stacking slots
  isFinalized: boolean; // true only after completion
}

export interface ScoreResult {
  raw: ArchetypeWeights; // sum of weights for kept items, per archetype
  matchPercentages: ArchetypeWeights; // 0-100 per archetype, see scoring formula
  primaryArchetype: ArchetypeId;
  primaryRole: RoleId;
  ranking: ArchetypeId[]; // ordered, primary first
}

/** Plain-language band for a match percentage, used in the results "how you match" read. */
export type FitBand = 'strong' | 'solid' | 'light';
