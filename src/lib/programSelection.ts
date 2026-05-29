import { roles } from '@/data/roles';
import type { RoleId, TrainingProgram } from '@/data/types';

// Picks the most relevant mock programs for a role the user is "trying on" (DATA_MODEL §11).
// v1 is intentionally dumb: filter by role, rank by competency overlap, break ties by a
// type preference tuned for the HS audience. The team can replace the ranking later.

// Lower = more preferred. apprenticeship/certificate > bootcamp/workshop > degree.
const TYPE_PREFERENCE: Record<TrainingProgram['type'], number> = {
  apprenticeship: 0,
  certificate: 0,
  bootcamp: 1,
  workshop: 1,
  degree: 2,
};

export function selectProgramsForRole(
  roleId: RoleId,
  programs: TrainingProgram[],
  options?: { max?: number },
): TrainingProgram[] {
  const max = options?.max ?? 3;
  const role = roles.find((r) => r.id === roleId);
  const roleCompetencies = new Set(role?.competencyIds ?? []);

  const overlap = (program: TrainingProgram): number =>
    program.competencyIds.filter((id) => roleCompetencies.has(id)).length;

  return programs
    .filter((program) => program.rolesServed.includes(roleId))
    .sort((a, b) => overlap(b) - overlap(a) || TYPE_PREFERENCE[a.type] - TYPE_PREFERENCE[b.type])
    .slice(0, max);
}
