import type { InterestItem } from './types';

// The 24 interest items the user sorts (DATA_MODEL §3). Built in round order; weights and
// intents match the table verbatim. Weights are DESIGNER DEFAULTS — the primary tuning
// surface; ARM owns production tuning.
//
// INVARIANTS (data-integrity test enforces): 24 items · 6 per round · all three weights
// present (never omit a zero) · per-archetype sums Builder 22 / Innovator 27 / Architect 25.
// NOTE: Innovator sums to 27, not 24. ROADMAP §1.4 says "24" — that is a stale typo
// (see docs/knowledge/DECISIONS.md D-001). Do not "correct" it back to 24.

export const items: InterestItem[] = [
  // ---------- Round 1 — things you like doing ----------
  {
    id: 'building-or-fixing',
    round: 1,
    label: 'Building or fixing things',
    weights: { builder: 3, innovator: 0, architect: 0 },
    robotContribution: {
      intent: 'Add a wrench tool to an arm',
      parts: [{ slot: 'rightArm', partId: 'wrench-arm' }],
    },
  },
  {
    id: 'taking-apart-how-it-works',
    round: 1,
    label: 'Taking things apart to see how they work',
    weights: { builder: 2, innovator: 2, architect: 0 },
    robotContribution: {
      intent: 'Add an opened-panel decal showing wires',
      parts: [{ slot: 'decal', partId: 'open-panel-decal' }],
    },
  },
  {
    id: 'coding-or-modding-games',
    round: 1,
    label: 'Coding or modding games',
    weights: { builder: 0, innovator: 3, architect: 0 },
    robotContribution: {
      intent: 'Spray binary 1s and 0s across the chest',
      parts: [{ slot: 'decal', partId: 'binary-decal' }],
    },
  },
  {
    id: 'solving-puzzles',
    round: 1,
    label: 'Solving puzzles or brain teasers',
    weights: { builder: 0, innovator: 3, architect: 0 },
    robotContribution: {
      intent: 'Add a puzzle-piece accessory',
      parts: [{ slot: 'accessory', partId: 'puzzle-piece' }],
    },
  },
  {
    id: 'planning-hangouts',
    round: 1,
    label: 'Planning hangouts or events for friends',
    weights: { builder: 0, innovator: 0, architect: 3 },
    robotContribution: {
      intent: 'Clip on a clipboard',
      parts: [{ slot: 'accessory', partId: 'clipboard' }],
    },
  },
  {
    id: 'turning-ideas-into-plans',
    round: 1,
    label: 'Turning ideas into real plans',
    weights: { builder: 0, innovator: 0, architect: 3 },
    robotContribution: {
      intent: 'Add a blueprint roll under one arm',
      parts: [{ slot: 'accessory', partId: 'blueprint-roll' }],
    },
  },

  // ---------- Round 2 — school and clubs ----------
  {
    id: 'shop-class-robotics-club',
    round: 2,
    label: 'Shop class or robotics club',
    weights: { builder: 3, innovator: 0, architect: 0 },
    robotContribution: {
      intent: 'Add a small robotic arm attachment',
      parts: [{ slot: 'accessory', partId: 'mini-robot-arm' }],
    },
  },
  {
    id: 'hands-on-science',
    round: 2,
    label: 'Hands-on science experiments',
    weights: { builder: 2, innovator: 2, architect: 0 },
    robotContribution: {
      intent: 'Add a beaker accessory',
      parts: [{ slot: 'accessory', partId: 'beaker' }],
    },
  },
  {
    id: 'coding-or-computer-class',
    round: 2,
    label: 'Coding or computer class',
    weights: { builder: 0, innovator: 3, architect: 0 },
    robotContribution: {
      intent: 'Add a chip-pin to the chest',
      parts: [{ slot: 'accessory', partId: 'chip-pin' }],
    },
  },
  {
    id: 'solving-math-science',
    round: 2,
    label: 'Solving math or science problems',
    weights: { builder: 0, innovator: 3, architect: 0 },
    robotContribution: {
      intent: 'Add a graph decal on shoulder',
      parts: [{ slot: 'decal', partId: 'graph-decal' }],
    },
  },
  {
    id: 'keeping-group-on-track',
    round: 2,
    label: 'Keeping your group on track',
    weights: { builder: 0, innovator: 0, architect: 3 },
    robotContribution: {
      intent: 'Add a headset accessory',
      parts: [{ slot: 'accessory', partId: 'headset' }],
    },
  },
  {
    id: 'planning-ahead',
    round: 2,
    label: 'Planning ahead before starting something',
    weights: { builder: 0, innovator: 0, architect: 3 },
    robotContribution: {
      intent: 'Add a calendar/timeline decal',
      parts: [{ slot: 'decal', partId: 'calendar-decal' }],
    },
  },

  // ---------- Round 3 — how you solve problems ----------
  {
    id: 'taking-apart-whats-wrong',
    round: 3,
    label: "Taking things apart to find what's wrong",
    weights: { builder: 3, innovator: 0, architect: 0 },
    robotContribution: {
      intent: 'Add a magnifier on a head sensor',
      parts: [{ slot: 'head', partId: 'magnifier-head' }],
    },
  },
  {
    id: 'trying-things-until-works',
    round: 3,
    label: 'Trying things until something works',
    weights: { builder: 3, innovator: 0, architect: 0 },
    robotContribution: {
      intent: 'Add a slightly soldered/repaired arm look',
      parts: [{ slot: 'leftArm', partId: 'soldered-arm' }],
    },
  },
  {
    id: 'looking-up-how-others-fixed',
    round: 3,
    label: 'Looking up how others fixed it',
    weights: { builder: 0, innovator: 2, architect: 0 },
    robotContribution: {
      intent: 'Add a small reference-book accessory',
      parts: [{ slot: 'accessory', partId: 'reference-book' }],
    },
  },
  {
    id: 'testing-different-solutions',
    round: 3,
    label: 'Testing different solutions',
    weights: { builder: 0, innovator: 3, architect: 0 },
    robotContribution: {
      intent: 'Add a checklist-with-checkmarks decal',
      parts: [{ slot: 'decal', partId: 'checklist-decal' }],
    },
  },
  {
    id: 'writing-out-a-plan-first',
    round: 3,
    label: 'Writing or drawing out a plan first',
    weights: { builder: 0, innovator: 0, architect: 3 },
    robotContribution: {
      intent: 'Add a pencil-tucked-behind-sensor look',
      parts: [{ slot: 'accessory', partId: 'pencil' }],
    },
  },
  {
    id: 'figuring-out-how-steps-connect',
    round: 3,
    label: 'Figuring out how all the steps connect',
    weights: { builder: 0, innovator: 0, architect: 3 },
    robotContribution: {
      intent: 'Add a flowchart decal on the back',
      parts: [{ slot: 'decal', partId: 'flowchart-decal' }],
    },
  },

  // ---------- Round 4 — how you work ----------
  {
    id: 'fixing-things-when-they-break',
    round: 4,
    label: 'Fixing things when they break',
    weights: { builder: 3, innovator: 0, architect: 0 },
    robotContribution: {
      intent: 'Add a wrench-and-screwdriver tool belt',
      parts: [{ slot: 'accessory', partId: 'tool-belt' }],
    },
  },
  {
    id: 'noticing-needs-fixing',
    round: 4,
    label: 'Noticing when something needs fixing',
    weights: { builder: 3, innovator: 0, architect: 0 },
    robotContribution: {
      intent: 'Add a warning-light indicator on head',
      parts: [{ slot: 'head', partId: 'warning-light-head' }],
    },
  },
  {
    id: 'how-and-why-things-work',
    round: 4,
    label: 'Wanting to know how and why things work',
    weights: { builder: 0, innovator: 3, architect: 0 },
    robotContribution: {
      intent: 'Add a question-mark thought-bubble pin',
      parts: [{ slot: 'accessory', partId: 'question-pin' }],
    },
  },
  {
    id: 'smarter-faster-ways',
    round: 4,
    label: 'Finding smarter or faster ways to do things',
    weights: { builder: 0, innovator: 2, architect: 2 },
    robotContribution: {
      intent: 'Add a lightning-bolt accent',
      parts: [{ slot: 'accessory', partId: 'lightning-bolt' }],
    },
  },
  {
    id: 'seeing-how-things-fit',
    round: 4,
    label: 'Seeing how everything fits together',
    weights: { builder: 0, innovator: 0, architect: 3 },
    robotContribution: {
      intent: 'Add a network/web pattern decal',
      parts: [{ slot: 'decal', partId: 'network-decal' }],
    },
  },
  {
    id: 'spotting-problems-early',
    round: 4,
    label: 'Spotting problems before they happen',
    weights: { builder: 0, innovator: 1, architect: 2 },
    robotContribution: {
      intent: 'Add a small antenna/scanner on head',
      parts: [{ slot: 'head', partId: 'antenna-head' }],
    },
  },
];
