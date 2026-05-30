import { forwardRef } from 'react';

import { MatchIndicator } from '@/components';
import { ACCENT_CLASSES } from '@/components/accent';
import type { Role, RoleId } from '@/data/types';

import { FourPartRead } from './FourPartRead';

interface RoleCardProps {
  role: Role;
  pct: number;
  isActive: boolean;
  onTryOn: (roleId: RoleId) => void;
}

// A recommendation card. Active = the role the robot is "on": accent border, full four-part
// read, the loud training-programs CTA. Ghosted = a de-emphasized alternative the user can tap
// (or drop the robot onto) to try on. forwardRef so the parent can hit-test robot drops.
export const RoleCard = forwardRef<HTMLElement, RoleCardProps>(function RoleCard(
  { role, pct, isActive, onTryOn },
  ref,
) {
  const accent = ACCENT_CLASSES[role.archetypeId];

  if (isActive) {
    return (
      <article
        ref={ref}
        data-testid={`role-card-${role.id}`}
        data-active="true"
        className={`flex w-96 shrink-0 flex-col gap-space-4 rounded-md border-2 ${accent.border} bg-bg p-space-5 shadow-elev-2`}
      >
        <header className="flex flex-col gap-space-1">
          <span className="text-overline uppercase text-text-faint">{role.archetypeName}</span>
          <div className="flex items-baseline justify-between gap-space-3">
            <h3 className="font-heading text-h4 text-text-strong">{role.name}</h3>
            <MatchIndicator archetype={role.archetypeId} roleId={role.id} pct={pct} />
          </div>
          <p className="text-body text-text-muted">{role.shortDescription}</p>
        </header>

        <FourPartRead role={role} pct={pct} />

        <button
          type="button"
          className={`mt-space-1 rounded-md ${accent.bg} px-space-4 py-space-3 text-center font-body text-body font-medium text-white transition-opacity hover:opacity-90`}
        >
          Explore training programs for {role.name}
        </button>
      </article>
    );
  }

  return (
    <article
      ref={ref}
      data-testid={`role-card-${role.id}`}
      data-active="false"
      role="button"
      tabIndex={0}
      onClick={() => onTryOn(role.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onTryOn(role.id);
        }
      }}
      className="flex w-64 shrink-0 cursor-pointer flex-col gap-space-2 rounded-md border border-border-default bg-bg p-space-4 opacity-70 shadow-card transition-opacity hover:opacity-100"
    >
      <span className="text-overline uppercase text-text-faint">{role.archetypeName}</span>
      <div className="flex items-baseline justify-between gap-space-2">
        <h3 className="font-heading text-h5 text-text-default">{role.name}</h3>
        <MatchIndicator archetype={role.archetypeId} roleId={role.id} pct={pct} compact />
      </div>
      <span className={`text-small font-medium ${accent.text}`}>Try this path →</span>
    </article>
  );
});
