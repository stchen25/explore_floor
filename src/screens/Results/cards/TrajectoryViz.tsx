import { Fragment } from 'react';

import { ROLE_ACCENT } from '@/components/categoryAccent';
import { Icon } from '@/components/Icon';
import { roleDetails } from '@/data';
import type { CategoryId } from '@/data/types';

// The "Where this can lead" mini career-trajectory on the job-overview "How you fit" tab (D-029
// Phase F). The three ARM roles read as a climb (Technician → Specialist → Integrator); the current
// role is lit with its accent, the others stay neutral. Static by construction (reduced-motion safe).

const LADDER: CategoryId[] = ['technician', 'specialist', 'integrator'];

export function TrajectoryViz({ category }: { category: CategoryId }) {
  return (
    <div
      className="flex items-center justify-between gap-space-2 rounded-lg border border-glass-border-soft bg-glass-fill p-space-4"
      data-testid="trajectory"
    >
      {LADDER.map((cat, i) => {
        const accent = ROLE_ACCENT[cat];
        const current = cat === category;
        return (
          <Fragment key={cat}>
            <div className="flex flex-1 flex-col items-center gap-space-2 text-center">
              <span
                className={`grid h-14 w-14 place-items-center rounded-full border ${
                  current ? `${accent.bg} border-transparent` : 'border-glass-border bg-glass-fill-strong'
                }`}
                // Role glow on the current rung (decorative literal offset/blur, no shadow token).
                style={current ? { boxShadow: `0 0 24px ${accent.glow}` } : undefined}
              >
                <Icon name="star" size={22} className={current ? accent.onAccent : accent.text} />
              </span>
              <span
                className={`font-heading text-small font-bold ${
                  current ? accent.textSoft : 'text-text-on-dark-muted'
                }`}
              >
                {roleDetails[cat].roleName}
              </span>
            </div>
            {i < LADDER.length - 1 && (
              <Icon name="arrow-r" size={20} className="shrink-0 text-text-on-dark-faint" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
