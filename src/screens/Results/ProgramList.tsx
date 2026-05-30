import { programs } from '@/data';
import type { RoleId } from '@/data/types';
import { selectProgramsForRole } from '@/lib';

interface ProgramListProps {
  roleId: RoleId;
}

// "Programs that get you there" — the top 3 mock programs for the role, ranked by the pure
// selectProgramsForRole helper. Name, type, duration, blurb. No real links yet (PRD §5.4).
export function ProgramList({ roleId }: ProgramListProps) {
  const top = selectProgramsForRole(roleId, programs);

  return (
    <ul className="flex flex-col gap-space-2">
      {top.map((program) => (
        <li
          key={program.id}
          className="rounded-sm border border-border-default bg-bg-soft p-space-3"
        >
          <div className="flex items-baseline justify-between gap-space-2">
            <span className="font-body text-body font-medium text-text-strong">{program.name}</span>
            <span className="shrink-0 text-small text-text-faint">{program.duration}</span>
          </div>
          <p className="text-overline uppercase text-text-faint">{program.type}</p>
          <p className="text-small text-text-muted">{program.blurb}</p>
        </li>
      ))}
    </ul>
  );
}
