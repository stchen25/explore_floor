import type { ArchetypeWeights, ScoreResult } from '@/data/types';
import { getFitBand, isLowSignal, LOW_SIGNAL_MAX, SOLID_FIT, STRONG_FIT } from '@/lib/fit';

// getFitBand bands a 0-100 match %, isLowSignal flags the "passed most items" case.

const scoreWith = (matchPercentages: ArchetypeWeights): ScoreResult => ({
  raw: { builder: 0, innovator: 0, architect: 0 },
  matchPercentages,
  primaryArchetype: 'builder',
  primaryRole: 'technician',
  ranking: ['builder', 'innovator', 'architect'],
});

describe('getFitBand', () => {
  it('bands at the documented thresholds', () => {
    expect(getFitBand(STRONG_FIT)).toBe('strong');
    expect(getFitBand(100)).toBe('strong');
    expect(getFitBand(STRONG_FIT - 1)).toBe('solid');
    expect(getFitBand(SOLID_FIT)).toBe('solid');
    expect(getFitBand(SOLID_FIT - 1)).toBe('light');
    expect(getFitBand(0)).toBe('light');
  });
});

describe('isLowSignal', () => {
  it('is true only when the top score is below the low-signal threshold', () => {
    expect(isLowSignal(scoreWith({ builder: 14, innovator: 9, architect: 5 }))).toBe(true);
    expect(isLowSignal(scoreWith({ builder: LOW_SIGNAL_MAX - 1, innovator: 0, architect: 0 }))).toBe(
      true,
    );
    expect(isLowSignal(scoreWith({ builder: LOW_SIGNAL_MAX, innovator: 0, architect: 0 }))).toBe(
      false,
    );
    expect(isLowSignal(scoreWith({ builder: 78, innovator: 54, architect: 31 }))).toBe(false);
  });
});
