import { items as setAItems } from '../items';
import { resultsCopy as setAResultsCopy } from '../resultsCopy';
import { rounds as setARounds } from '../rounds';
import type { QuestionSet } from '../types';

// ============================================================================
// PLACEHOLDER — Set B is a `[B]`-marked clone of Set A so the A/B pipeline is
// provable end to end before the real content exists. Do NOT run a real
// participant session against this set.
//
// When the compiled Set B content lands (see docs/knowledge/QUESTION_SET_WORKSHEET.md),
// replace the derived clone below with literal authored items/rounds/copy via the
// data-author skill — own labels, own weights (update `expectedSums` to the new
// declared sums), own robot mappings. Ids must stay distinct from Set A's
// (keep the `b-` prefix convention): decisions are keyed by item id.
// ============================================================================

const MARK = '[B] ';

export const setB: QuestionSet = {
  id: 'b',
  name: 'Set B',
  items: setAItems.map((item) => ({
    ...item,
    id: `b-${item.id}`,
    label: `${MARK}${item.label}`,
  })),
  rounds: setARounds.map((round) => ({
    ...round,
    enterCopy: round.enterCopy ? `${MARK}${round.enterCopy}` : null,
  })),
  sortCopy: {
    keepLabel: `${MARK}That's me`,
    passLabel: `${MARK}Not my thing`,
    dragHint: `${MARK}Drag the card onto a bin — or tap one.`,
  },
  // Landing copy is deliberately UNMARKED: the participant sees the home screen, and the
  // researcher reads the active condition off the switcher itself.
  landingCopy: {
    overline: 'RoboticsCareer.org',
    heading: 'Explore the Floor',
    description:
      "Not sure where you'd fit in robotics? Sort what you're into and we'll build your match.",
    cta: 'Start sorting',
  },
  resultsCopy: {
    ...setAResultsCopy,
    heading: `${MARK}${setAResultsCopy.heading}`,
  },
  // Clone of Set A's weights, so the declared sums match Set A's until real content lands.
  expectedSums: { builder: 22, innovator: 27, architect: 25 },
};
