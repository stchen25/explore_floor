import type { ArchetypeId, Decision, InterestItem, RobotState } from '@/data/types';

// Resolves the user's kept interests into a robot (DATA_MODEL §10). Pure function.
// Called live after each decision (Phase 2+) so the robot accretes; the caller flips
// isFinalized at the Build beat.

const SLOT_CAPS: Partial<Record<string, number>> = {
  accessory: 4, // up to 4 visual stacks
  decal: 3, // up to 3 visual stacks
};

export function assembleRobot(
  decisions: Record<string, Decision>,
  items: InterestItem[],
  primaryArchetype: ArchetypeId | null,
): RobotState {
  const slots: RobotState['slots'] = {
    base: 'base-default',
    body: 'body-default',
    colorScheme: primaryArchetype ?? 'default',
  };

  for (const item of items) {
    if (decisions[item.id] !== 'keep') continue;
    for (const ref of item.robotContribution.parts) {
      const cap = SLOT_CAPS[ref.slot];
      if (cap !== undefined) {
        // Multi-cardinality (accessory / decal): accumulate in item order, respect the cap.
        const current = (slots[ref.slot] as string[] | undefined) ?? [];
        if (current.length < cap) slots[ref.slot] = [...current, ref.partId];
      } else {
        // Single-cardinality: last kept wins.
        slots[ref.slot] = ref.partId;
      }
    }
  }

  return { slots, isFinalized: false };
}
