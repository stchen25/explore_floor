import type { ArchetypeId, RoleId } from '@/data/types';

import { ACCENT_CLASSES } from './accent';

interface MatchIndicatorProps {
  archetype: ArchetypeId;
  roleId: RoleId;
  pct: number;
  /** Ghosted cards render the % smaller. */
  compact?: boolean;
}

// The normalized match score in the archetype accent (DESIGN_SYSTEM §4.4: match % as H2 in
// accent). Renders on every role card so the displayed value is testable per role.
export function MatchIndicator({ archetype, roleId, pct, compact = false }: MatchIndicatorProps) {
  return (
    <span
      data-testid={`match-pct-${roleId}`}
      className={`font-heading ${compact ? 'text-h4' : 'text-h2'} ${ACCENT_CLASSES[archetype].text}`}
    >
      {pct}%
    </span>
  );
}
