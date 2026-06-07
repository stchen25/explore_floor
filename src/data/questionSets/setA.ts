import { items } from '../items';
import { resultsCopy } from '../resultsCopy';
import { rounds } from '../rounds';
import type { QuestionSet } from '../types';

// Set A — the original Phase 1 content, re-exported (not duplicated) so items.ts/rounds.ts/
// resultsCopy.ts stay the single source of truth for this set. The landing and sort copy
// below is lifted verbatim from what was hardcoded in Landing.tsx / Sort.tsx.
//
// NOTE: `landingCopy.heading` must stay exactly 'Explore the Floor' — the happy-path E2E
// asserts it literally (it runs against the default set).

export const setA: QuestionSet = {
  id: 'a',
  name: 'Set A',
  items,
  rounds,
  sortCopy: {
    keepLabel: "That's me",
    passLabel: 'Not my thing',
    dragHint: 'Drag the card onto a bin — or tap one.',
  },
  landingCopy: {
    overline: 'RoboticsCareer.org',
    heading: 'Explore the Floor',
    description:
      "Not sure where you'd fit in robotics? Sort what you're into and we'll build your match.",
    cta: 'Start sorting',
  },
  resultsCopy,
  expectedSums: { builder: 22, innovator: 27, architect: 25 },
};
