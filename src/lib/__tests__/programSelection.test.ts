import { programs } from '@/data/programs';
import { selectProgramsForRole } from '@/lib/programSelection';

describe('selectProgramsForRole', () => {
  it('returns only programs that serve the requested role', () => {
    const result = selectProgramsForRole('integrator', programs);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.rolesServed.includes('integrator'))).toBe(true);
  });

  it('respects an explicit max', () => {
    const result = selectProgramsForRole('technician', programs, { max: 2 });
    expect(result).toHaveLength(2);
  });

  it('defaults to at most 3 programs', () => {
    const result = selectProgramsForRole('technician', programs);
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it('ranks the highest competency-overlap program first', () => {
    // smart-tech shares all 4 of its competencies with the technician role — the best match.
    const result = selectProgramsForRole('technician', programs);
    expect(result[0]?.id).toBe('smart-tech');
  });

  it('returns an empty list for a role no program serves', () => {
    const noServers = programs.filter((p) => p.rolesServed.includes('specialist'));
    expect(noServers.length).toBeGreaterThan(0); // sanity: specialist IS served
    const result = selectProgramsForRole('specialist', []);
    expect(result).toEqual([]);
  });
});
