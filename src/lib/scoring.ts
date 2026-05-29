import type {
  ArchetypeId,
  ArchetypeWeights,
  Decision,
  InterestItem,
  ScoreResult,
} from '@/data/types';
import { ARCHETYPE_TO_ROLE } from '@/data/types';

// The scoring engine — the brain (DATA_MODEL §9). Pure: same input always yields the same
// output, no side effects. Scores are normalized per archetype against that archetype's own
// maximum, so unequal weight ceilings don't structurally favor any role.

// Order matters: it encodes the deterministic tiebreak builder > innovator > architect.
// Array.prototype.sort is stable, so equal percentages keep this order.
const ARCHETYPES: readonly ArchetypeId[] = ['builder', 'innovator', 'architect'];

export function calculateScores(
  decisions: Record<string, Decision>,
  items: InterestItem[],
): ScoreResult {
  const raw: ArchetypeWeights = { builder: 0, innovator: 0, architect: 0 };
  const max: ArchetypeWeights = { builder: 0, innovator: 0, architect: 0 };

  for (const item of items) {
    const kept = decisions[item.id] === 'keep'; // missing decision = pass
    for (const archetype of ARCHETYPES) {
      max[archetype] += item.weights[archetype];
      if (kept) raw[archetype] += item.weights[archetype];
    }
  }

  const matchPercentages: ArchetypeWeights = {
    builder: toPercent(raw.builder, max.builder),
    innovator: toPercent(raw.innovator, max.innovator),
    architect: toPercent(raw.architect, max.architect),
  };

  const ranking = [...ARCHETYPES].sort((a, b) => matchPercentages[b] - matchPercentages[a]);
  const primaryArchetype = ranking[0];

  return {
    raw,
    matchPercentages,
    primaryArchetype,
    primaryRole: ARCHETYPE_TO_ROLE[primaryArchetype],
    ranking,
  };
}

function toPercent(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}
