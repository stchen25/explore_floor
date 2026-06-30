import type { CategoryId, CategoryWeights } from '@/data/types';

// Pure layout for the results bubble map (D-029 Phase E). Rank-based, NOT role-fixed: the top match
// sits high and centered and is the largest bubble; the second and third flank below. Bubble radius
// scales with match %, so a stronger match reads bigger. Coordinates are in a fixed BUBBLE_VIEW space
// (the view scales them to responsive percentages — see BubbleField). No React, no side effects;
// unit-tested in __tests__/bubbleLayout.test.ts. (The /select radar uses the role-fixed triangle in
// nodeLayout.ts; this is deliberately a different, rank-based layout.)

/** Logical drawing space for the bubble field. Width matches the --container-map token. */
export const BUBBLE_VIEW = { width: 1040, height: 600 } as const;

// Fixed slot per rank (index 0 = top match). Centres in BUBBLE_VIEW space.
const RANK_SLOTS = [
  { cx: 520, cy: 214 }, // top match — high, centred
  { cx: 304, cy: 432 }, // second — lower left
  { cx: 740, cy: 432 }, // third — lower right
] as const;

// Radius range. The floor keeps even a weak match large enough to read + tap; the ceiling is the
// strongest match. Both stay inside BUBBLE_VIEW from every slot (guarded by the bounds test).
const R_MIN = 84;
const R_MAX = 150;

export interface BubbleLayout {
  category: CategoryId;
  rank: number;
  cx: number;
  cy: number;
  r: number;
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

/** Bubble radius for a match % (0–100), scaled between R_MIN and R_MAX. */
export function bubbleRadius(pct: number): number {
  return R_MIN + (R_MAX - R_MIN) * (clamp(pct, 0, 100) / 100);
}

/** Positioned, sized bubbles for the ranked roles (best→worst). One per role, in rank order. */
export function bubbleLayout(
  ranking: CategoryId[],
  matchPercentages: CategoryWeights,
): BubbleLayout[] {
  return ranking.slice(0, RANK_SLOTS.length).map((category, rank) => ({
    category,
    rank,
    cx: RANK_SLOTS[rank].cx,
    cy: RANK_SLOTS[rank].cy,
    r: bubbleRadius(matchPercentages[category]),
  }));
}
