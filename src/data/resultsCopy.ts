import type { FitBand } from './types';

// All Results-screen copy lives here so the team can tune wording without touching components
// (PRD §13 lists results copy as open; these are starter drafts). The four-part read labels,
// the per-band "how you match" lines, the low-signal framing, and the compare hint are all here.

export const resultsCopy = {
  heading: 'Here’s how you match',
  compareHint: 'Drag your robot onto a path — or tap a card — to compare.',
  retake: 'Start over',
  // Shown when the top score is low (the user passed most items). Demo-safe framing per PRD §5.4.
  lowSignal:
    'You played your cards close. Here’s a first read — retake and tell us a bit more to sharpen it.',
  // Four-part read section labels.
  sections: {
    match: 'How you match',
    skills: 'Skills you’d build',
    competencies: 'What you’d learn',
    programs: 'Programs that get you there',
  },
  // "How you match" line, chosen by the fit band (see src/lib/fit.ts).
  fit: {
    strong: 'A strong match — your choices line up closely with this path.',
    solid: 'A solid lean — real overlap with how you like to work.',
    light: 'A lighter match — a few pieces fit, others less so.',
  } satisfies Record<FitBand, string>,
} as const;
