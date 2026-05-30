import type { RoundMeta } from './types';

// Round-transition copy. The sort runs as a fixed 4 rounds of 6 (DATA_MODEL §3).
// `theme` is internal authoring context only and is NEVER rendered — per PRD §5.2 the user
// does not see category labels. `enterCopy` is the brief encouraging beat shown when a round
// begins; round 1 has none because it's the start of the flow. All tunable without code.

export const rounds: RoundMeta[] = [
  { round: 1, theme: 'things you like doing', enterCopy: null },
  { round: 2, theme: 'school and clubs', enterCopy: "Nice work — that's round one done." },
  { round: 3, theme: 'how you solve problems', enterCopy: 'Halfway there. Keep going.' },
  { round: 4, theme: 'how you work', enterCopy: "Last round — let's finish your build." },
];
