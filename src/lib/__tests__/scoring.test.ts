import { items } from '@/data/items';
import type { Decision, InterestItem } from '@/data/types';
import { calculateScores } from '@/lib/scoring';

const keepAll = (): Record<string, Decision> =>
  Object.fromEntries(items.map((item) => [item.id, 'keep' as Decision]));

const keepWhere = (predicate: (item: InterestItem) => boolean): Record<string, Decision> =>
  Object.fromEntries(items.filter(predicate).map((item) => [item.id, 'keep' as Decision]));

describe('calculateScores', () => {
  it('saturates to 100/100/100 and raw maxes when every item is kept', () => {
    const result = calculateScores(keepAll(), items);
    expect(result.matchPercentages).toEqual({ builder: 100, innovator: 100, architect: 100 });
    expect(result.raw).toEqual({ builder: 22, innovator: 27, architect: 25 });
  });

  it('returns 0/0/0 when every item is passed (empty decisions)', () => {
    const result = calculateScores({}, items);
    expect(result.matchPercentages).toEqual({ builder: 0, innovator: 0, architect: 0 });
    expect(result.raw).toEqual({ builder: 0, innovator: 0, architect: 0 });
  });

  it('makes the dominant archetype primary for a builder-heavy sort', () => {
    const decisions = keepWhere(
      (i) => i.weights.builder === 3 && i.weights.innovator === 0 && i.weights.architect === 0,
    );
    const result = calculateScores(decisions, items);
    expect(result.primaryArchetype).toBe('builder');
    expect(result.primaryRole).toBe('technician');
    expect(result.matchPercentages.builder).toBeGreaterThan(result.matchPercentages.innovator);
    expect(result.matchPercentages.builder).toBeGreaterThan(result.matchPercentages.architect);
  });

  it('makes innovator primary for an innovator-heavy sort', () => {
    const decisions = keepWhere((i) => i.weights.innovator === 3 && i.weights.builder === 0);
    const result = calculateScores(decisions, items);
    expect(result.primaryArchetype).toBe('innovator');
    expect(result.primaryRole).toBe('specialist');
  });

  it('makes architect primary for an architect-heavy sort', () => {
    const decisions = keepWhere((i) => i.weights.architect === 3 && i.weights.builder === 0);
    const result = calculateScores(decisions, items);
    expect(result.primaryArchetype).toBe('architect');
    expect(result.primaryRole).toBe('integrator');
  });

  it('treats unsorted items as pass (missing decisions add nothing)', () => {
    const oneBuilder = items.find((i) => i.id === 'building-or-fixing')!;
    const result = calculateScores({ [oneBuilder.id]: 'keep' }, items);
    expect(result.raw.builder).toBe(oneBuilder.weights.builder);
    expect(result.raw.innovator).toBe(0);
    expect(result.raw.architect).toBe(0);
  });

  it('breaks ties deterministically builder > innovator > architect', () => {
    // All-keep gives equal 100/100/100 — the tiebreak must pick builder first.
    const result = calculateScores(keepAll(), items);
    expect(result.primaryArchetype).toBe('builder');
    expect(result.ranking).toEqual(['builder', 'innovator', 'architect']);
  });

  it('is pure — identical input yields a deeply equal result', () => {
    const decisions = keepWhere((i) => i.weights.builder > 0);
    expect(calculateScores(decisions, items)).toEqual(calculateScores(decisions, items));
  });

  it('orders ranking primary-first by match percentage', () => {
    const decisions = keepWhere((i) => i.weights.architect === 3 && i.weights.builder === 0);
    const result = calculateScores(decisions, items);
    expect(result.ranking[0]).toBe('architect');
    const [a, b, c] = result.ranking;
    expect(result.matchPercentages[a]).toBeGreaterThanOrEqual(result.matchPercentages[b]);
    expect(result.matchPercentages[b]).toBeGreaterThanOrEqual(result.matchPercentages[c]);
  });
});
