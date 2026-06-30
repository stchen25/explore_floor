import type { CategoryId, CategoryWeights } from '@/data/types';
import { BUBBLE_VIEW, bubbleLayout, bubbleRadius } from '@/lib/bubbleLayout';

// The rank-based bubble-map layout (D-029 Phase E). Positions are fixed per rank; radius scales
// with match %, so the top match is the largest bubble. Every bubble must stay inside BUBBLE_VIEW.

describe('bubbleLayout', () => {
  const ranking: CategoryId[] = ['specialist', 'integrator', 'technician'];
  const matchPercentages: CategoryWeights = { technician: 18, specialist: 64, integrator: 36 };
  const bubbles = bubbleLayout(ranking, matchPercentages);

  it('returns one bubble per ranked role, in rank order, with distinct categories', () => {
    expect(bubbles).toHaveLength(3);
    expect(bubbles.map((b) => b.category)).toEqual(ranking);
    expect(bubbles.map((b) => b.rank)).toEqual([0, 1, 2]);
    expect(new Set(bubbles.map((b) => b.category)).size).toBe(3);
  });

  it('makes the top match (rank 0) the largest bubble', () => {
    const [top, second, third] = bubbles.map((b) => b.r);
    expect(top).toBeGreaterThanOrEqual(second);
    expect(top).toBeGreaterThanOrEqual(third);
  });

  it('scales radius monotonically with match %', () => {
    expect(bubbleRadius(80)).toBeGreaterThan(bubbleRadius(40));
    expect(bubbleRadius(0)).toBeLessThan(bubbleRadius(100));
    // clamps out-of-range input
    expect(bubbleRadius(-20)).toBe(bubbleRadius(0));
    expect(bubbleRadius(140)).toBe(bubbleRadius(100));
  });

  it('keeps every bubble fully inside the view bounds (even at the max radius)', () => {
    const maxed: CategoryWeights = { technician: 100, specialist: 100, integrator: 100 };
    for (const b of bubbleLayout(ranking, maxed)) {
      expect(b.cx - b.r).toBeGreaterThanOrEqual(0);
      expect(b.cx + b.r).toBeLessThanOrEqual(BUBBLE_VIEW.width);
      expect(b.cy - b.r).toBeGreaterThanOrEqual(0);
      expect(b.cy + b.r).toBeLessThanOrEqual(BUBBLE_VIEW.height);
    }
  });
});
