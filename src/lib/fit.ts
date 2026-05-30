import type { FitBand, ScoreResult } from '@/data/types';

// Pure presentation-logic helpers for the Results screen: turn a normalized match percentage
// into a plain-language band, and detect the "low-signal" case (a picky user who passed most
// items). Kept here (not in a component) so the thresholds are unit-testable and tunable.

export const STRONG_FIT = 67; // ≥ this reads as a strong match
export const SOLID_FIT = 34; // ≥ this reads as a solid lean
export const LOW_SIGNAL_MAX = 25; // top score below this → "you played your cards close"

export function getFitBand(pct: number): FitBand {
  if (pct >= STRONG_FIT) return 'strong';
  if (pct >= SOLID_FIT) return 'solid';
  return 'light';
}

export function isLowSignal(scores: ScoreResult): boolean {
  const { builder, innovator, architect } = scores.matchPercentages;
  return Math.max(builder, innovator, architect) < LOW_SIGNAL_MAX;
}
