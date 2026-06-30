import { Icon } from '@/components/Icon';
import { bridgePrograms } from '@/data';
import type { ResultsCardsCopy, RoleDetail } from '@/data/types';

import { BridgeProgramRow } from './BridgeProgramRow';
import { Chip } from './Chip';

// Tab 2 "Skills, path & next steps": the role's ARM competencies as chips, then the bridge-training
// programs that build them. Tokens only (D-029). Bridge programs are placeholder pending ARM
// sourcing (src/data/bridgePrograms.ts).
export function RoleTabSkills({ copy, detail }: { copy: ResultsCardsCopy; detail: RoleDetail }) {
  const programs = bridgePrograms[detail.categoryId];

  return (
    <div className="mt-space-4 flex flex-col gap-space-6">
      <section>
        <h3 className="font-heading text-h5 text-text-on-dark">{copy.competenciesHeading}</h3>
        <div className="mt-space-3 flex flex-wrap gap-space-1">
          {detail.competencies.map((competency) => (
            <Chip key={competency}>
              <Icon name="check" size={16} className="text-text-on-dark-faint" />
              {competency}
            </Chip>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-heading text-h5 text-text-on-dark">{copy.bridgeHeading}</h3>
        <p className="mt-space-1 font-body text-small text-text-on-dark-faint">{copy.bridgeSubtitle}</p>
        <div className="mt-space-3 flex flex-col gap-space-2">
          {programs.map((program) => (
            <BridgeProgramRow key={program.title} program={program} />
          ))}
        </div>
      </section>
    </div>
  );
}
