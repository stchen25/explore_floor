import type { ReactNode } from 'react';

import { competencies, essentialSkills } from '@/data';
import type { Role } from '@/data/types';
import { getFitBand } from '@/lib';
import { useQuestionSet } from '@/state';

import { ProgramList } from './ProgramList';

interface FourPartReadProps {
  role: Role;
  pct: number;
}

// The conversion payload (PRD §5.4): how you match · skills you'd build · what you'd learn ·
// programs that get you there. All copy is data (resultsCopy / role / competency / skill / program
// content), so the team tunes wording without touching this component.
export function FourPartRead({ role, pct }: FourPartReadProps) {
  // The fit/section copy comes from the active question set; role/skill/competency data is shared.
  const { resultsCopy } = useQuestionSet();
  const fitLine = resultsCopy.fit[getFitBand(pct)];

  const skills = role.skillIds
    .map((id) => essentialSkills.find((s) => s.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  // Show a digestible handful of competencies in plain language (the full set is 8-9).
  const learns = role.competencyIds
    .map((id) => competencies.find((c) => c.id === id)?.plainName)
    .filter((name): name is string => Boolean(name))
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-space-4 text-left">
      <Section label={resultsCopy.sections.match}>
        <p className="text-body text-text-default">{fitLine}</p>
      </Section>

      <Section label={resultsCopy.sections.skills}>
        <ul className="flex flex-wrap gap-space-1">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-bg-section px-space-3 py-space-0 text-small text-text-default"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Section>

      <Section label={resultsCopy.sections.competencies}>
        <ul className="flex flex-col gap-space-0">
          {learns.map((learn) => (
            <li key={learn} className="text-small text-text-muted">
              • {learn}
            </li>
          ))}
        </ul>
      </Section>

      <Section label={resultsCopy.sections.programs}>
        <ProgramList roleId={role.id} />
      </Section>
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-space-1">
      <p className="text-overline uppercase text-text-faint">{label}</p>
      {children}
    </div>
  );
}
