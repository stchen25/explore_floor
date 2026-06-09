import type { BucketDef } from '../types';

// The shared three-bucket sort labels, used by BOTH study flows (D-018): the exam's
// statement sort and each narrative scene's choice sort. Keeping one source of truth
// means the only difference between the conditions is question structure, not wording.
// The middle bucket reads "Kinda me" (renamed from "Maybe"); its id stays 'maybe' so
// the scoring weight is unchanged — MAYBE_WEIGHT (0 today) in lib/categoryScoring.ts.
export const SORT_BUCKETS: BucketDef[] = [
  { id: 'thats-me', label: "That's me" },
  { id: 'maybe', label: 'Kinda me' },
  { id: 'not-me', label: 'Not me' },
];
