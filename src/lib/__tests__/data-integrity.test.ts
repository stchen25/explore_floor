import { colorSchemes } from '@/data/colorSchemes';
import { competencies } from '@/data/competencies';
import { programs } from '@/data/programs';
import { questionSetList } from '@/data/questionSets';
import { robotParts } from '@/data/robotParts';
import { roles } from '@/data/roles';
import { essentialSkills } from '@/data/skills';
import type { ArchetypeId, RoleId } from '@/data/types';
import { ARCHETYPE_TO_ROLE } from '@/data/types';

// Guards every invariant in DATA_MODEL §15 + §16. Imports LIVE data so any bad content edit
// fails loudly here. Shared data (roles/competencies/skills/programs/parts) is validated once;
// item-scoped invariants run per question set. Weight sums are RECOMPUTED from live items and
// compared against the set's own DECLARED `expectedSums` — the declaration is the author's
// intent, so drift between intent and content fails the build.

const ARCHETYPES: ArchetypeId[] = ['builder', 'innovator', 'architect'];
const ROLE_IDS: RoleId[] = ['technician', 'specialist', 'integrator'];

describe.each(questionSetList)('§15/§16 item invariants — question set $name', (set) => {
  const { items } = set;

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

  it('sums per-archetype weights to the set’s declared expectedSums', () => {
    // Recomputed from live data, asserted against the set’s own declaration (DATA_MODEL §16).
    for (const archetype of ARCHETYPES) {
      const sum = items.reduce((total, i) => total + i.weights[archetype], 0);
      expect(sum, `${set.id}.${archetype}`).toBe(set.expectedSums[archetype]);
    }
  });

  it('resolves every item robot-part reference to a real part with a matching slot', () => {
    const partsById = new Map(robotParts.map((p) => [p.id, p]));
    for (const item of items) {
      for (const ref of item.robotContribution.parts) {
        const part = partsById.get(ref.partId);
        expect(part, `${item.id} → ${ref.partId}`).toBeDefined();
        expect(part!.slot, `${item.id} → ${ref.partId} slot`).toBe(ref.slot);
      }
    }
  });

  it('has 4 round entries covering rounds 1-4, with non-empty enter copy where present', () => {
    expect(set.rounds).toHaveLength(4);
    expect(set.rounds.map((r) => r.round).sort()).toEqual([1, 2, 3, 4]);
    for (const round of set.rounds) {
      if (round.enterCopy !== null) expect(round.enterCopy.trim()).not.toBe('');
    }
  });

  it('has complete, non-empty owned copy (landing, sort, results)', () => {
    const strings = [
      ...Object.values(set.landingCopy),
      ...Object.values(set.sortCopy),
      set.resultsCopy.heading,
      set.resultsCopy.compareHint,
      set.resultsCopy.retake,
      set.resultsCopy.lowSignal,
      ...Object.values(set.resultsCopy.sections),
      ...Object.values(set.resultsCopy.fit),
    ];
    for (const value of strings) {
      expect(typeof value).toBe('string');
      expect(value.trim()).not.toBe('');
    }
  });
});

describe('§16 cross-set invariants', () => {
  it('keeps item ids unique across all question sets (decisions are keyed by id)', () => {
    const allIds = questionSetList.flatMap((set) => set.items.map((i) => i.id));
    expect(new Set(allIds).size).toBe(allIds.length);
  });

  it('gives every set a unique id and a researcher-facing name', () => {
    expect(new Set(questionSetList.map((s) => s.id)).size).toBe(questionSetList.length);
    for (const set of questionSetList) expect(set.name.trim()).not.toBe('');
  });
});

describe('§15 shared-data invariants', () => {
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

  it('has unique robot part ids', () => {
    expect(new Set(robotParts.map((p) => p.id)).size).toBe(robotParts.length);
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
