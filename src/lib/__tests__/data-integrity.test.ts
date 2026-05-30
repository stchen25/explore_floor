import { colorSchemes } from '@/data/colorSchemes';
import { competencies } from '@/data/competencies';
import { items } from '@/data/items';
import { programs } from '@/data/programs';
import { robotParts } from '@/data/robotParts';
import { roles } from '@/data/roles';
import { essentialSkills } from '@/data/skills';
import type { ArchetypeId, RoleId } from '@/data/types';
import { ARCHETYPE_TO_ROLE } from '@/data/types';

// Guards every invariant in DATA_MODEL §15. Imports LIVE data so any bad content edit
// fails loudly here. Sums are RECOMPUTED, never compared against an exported constant.

const ARCHETYPES: ArchetypeId[] = ['builder', 'innovator', 'architect'];
const ROLE_IDS: RoleId[] = ['technician', 'specialist', 'integrator'];

describe('§15 data invariants', () => {
  it('has exactly 24 interest items with unique ids', () => {
    expect(items).toHaveLength(24);
    expect(new Set(items.map((i) => i.id)).size).toBe(24);
  });

  it('gives every item all three integer weights in 0..3 (no omitted zeros)', () => {
    for (const item of items) {
      for (const archetype of ARCHETYPES) {
        const w = item.weights[archetype];
        expect(typeof w, `${item.id}.${archetype}`).toBe('number');
        expect(Number.isInteger(w), `${item.id}.${archetype}`).toBe(true);
        expect(w).toBeGreaterThanOrEqual(0);
        expect(w).toBeLessThanOrEqual(3);
      }
    }
  });

  it('places exactly 6 items in each of rounds 1-4', () => {
    for (const round of [1, 2, 3, 4] as const) {
      expect(items.filter((i) => i.round === round)).toHaveLength(6);
    }
  });

  it('sums per-archetype weights to Builder 22 / Innovator 27 / Architect 25', () => {
    // Recomputed from live data. ROADMAP §1.4 says Innovator=24 — stale typo (see D-001).
    const sum = (a: ArchetypeId) => items.reduce((total, i) => total + i.weights[a], 0);
    expect(sum('builder')).toBe(22);
    expect(sum('innovator')).toBe(27);
    expect(sum('architect')).toBe(25);
  });

  it('gives every role a non-empty competencyIds that resolves to real competencies', () => {
    const competencyIds = new Set(competencies.map((c) => c.id));
    for (const role of roles) {
      expect(role.competencyIds.length, role.id).toBeGreaterThan(0);
      for (const id of role.competencyIds) {
        expect(competencyIds.has(id), `${role.id} → ${id}`).toBe(true);
      }
    }
  });

  it('gives every role a non-empty skillIds that resolves to real essential skills', () => {
    const skillIds = new Set(essentialSkills.map((s) => s.id));
    for (const role of roles) {
      expect(role.skillIds.length, role.id).toBeGreaterThan(0);
      for (const id of role.skillIds) {
        expect(skillIds.has(id), `${role.id} → ${id}`).toBe(true);
      }
    }
  });

  it('gives every competency a valid roleId and unique id', () => {
    expect(new Set(competencies.map((c) => c.id)).size).toBe(competencies.length);
    for (const competency of competencies) {
      expect(ROLE_IDS).toContain(competency.roleId);
    }
  });

  it('has programs that reference only real role ids and competency ids', () => {
    const competencyIds = new Set(competencies.map((c) => c.id));
    for (const program of programs) {
      expect(program.rolesServed.length, program.id).toBeGreaterThan(0);
      for (const roleId of program.rolesServed) {
        expect(ROLE_IDS, program.id).toContain(roleId);
      }
      for (const id of program.competencyIds) {
        expect(competencyIds.has(id), `${program.id} → ${id}`).toBe(true);
      }
    }
  });

  it('resolves every item robot-part reference to a real part with a matching slot', () => {
    const partsById = new Map(robotParts.map((p) => [p.id, p]));
    expect(new Set(robotParts.map((p) => p.id)).size).toBe(robotParts.length);
    for (const item of items) {
      for (const ref of item.robotContribution.parts) {
        const part = partsById.get(ref.partId);
        expect(part, `${item.id} → ${ref.partId}`).toBeDefined();
        expect(part!.slot, `${item.id} → ${ref.partId} slot`).toBe(ref.slot);
      }
    }
  });

  it('maps each archetype to a distinct role that round-trips', () => {
    const mappedRoles = ARCHETYPES.map((a) => ARCHETYPE_TO_ROLE[a]);
    expect(new Set(mappedRoles).size).toBe(3);
    for (const role of roles) {
      expect(ARCHETYPE_TO_ROLE[role.archetypeId]).toBe(role.id);
    }
  });

  it('defines a color scheme for all three archetypes', () => {
    for (const archetype of ARCHETYPES) {
      expect(colorSchemes[archetype], archetype).toBeDefined();
      expect(colorSchemes[archetype].accentToken).toBeTruthy();
    }
  });
});
