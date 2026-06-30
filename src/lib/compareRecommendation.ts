import { roleDetails } from '@/data/roleDetails';
import type { CategoryId } from '@/data/types';

// The compare-screen recommendation read (DATA_MODEL §17, D-029 Phase D). Pure, no React.
// The compare screen sets two roles side by side; this picks an honest, non-verdict nudge
// between them. It leads with fit (the higher match %), but when the two are close it
// foregrounds the lower-barrier (less-school) role as the "start here" option and lets the
// user grow toward the other — matching the product thesis (the "maybe" group, entry-as-a-rung).
// The wording itself is templated copy in resultsCopy.cards.recommendation; this only decides
// which variant to show and which roles fill its slots.
//
//   - clearWinner        — the match gap is wide; affirm the higher-fit role, the other stays a look.
//   - closeLowerBarrier  — close, and the two ask different amounts of school; foreground the
//                          lower-barrier role as the easier start and name the role to grow toward.
//   - closeEqualBarrier  — close, and they ask the same school; either is a solid start.

export type RecommendationVariant = 'clearWinner' | 'closeLowerBarrier' | 'closeEqualBarrier';

export interface CompareRecommendation {
  /** The higher-match role (ties go to the left/current role). */
  leaned: CategoryId;
  /** The other of the two compared roles. */
  other: CategoryId;
  /** True when the two match %s are within COMPARE_CLOSE_THRESHOLD points. */
  close: boolean;
  /** The lower-education-barrier role of the two, or null if they ask the same. */
  lowerBarrier: CategoryId | null;
  /** When foregrounding the lower-barrier role, the other role to grow toward (else null). */
  growToward: CategoryId | null;
  variant: RecommendationVariant;
}

/** Match-% gap (in points) within which two roles read as a close call. */
export const COMPARE_CLOSE_THRESHOLD = 8;

export function compareRecommendation(
  left: CategoryId,
  right: CategoryId,
  pctLeft: number,
  pctRight: number,
): CompareRecommendation {
  const leaned = pctLeft >= pctRight ? left : right;
  const other = leaned === left ? right : left;
  const close = Math.abs(pctLeft - pctRight) <= COMPARE_CLOSE_THRESHOLD;

  const eduLeft = roleDetails[left].educationLevel;
  const eduRight = roleDetails[right].educationLevel;
  let lowerBarrier: CategoryId | null = null;
  if (eduLeft < eduRight) lowerBarrier = left;
  else if (eduRight < eduLeft) lowerBarrier = right;

  const growToward = lowerBarrier ? (lowerBarrier === left ? right : left) : null;

  let variant: RecommendationVariant;
  if (!close) variant = 'clearWinner';
  else if (lowerBarrier) variant = 'closeLowerBarrier';
  else variant = 'closeEqualBarrier';

  return { leaned, other, close, lowerBarrier, growToward, variant };
}
