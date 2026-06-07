import { colorSchemes } from '@/data/colorSchemes';
import { competencies } from '@/data/competencies';
import { flowList, flows } from '@/data/flows';
import { programs } from '@/data/programs';
import { questionSetList } from '@/data/questionSets';
import { robotParts } from '@/data/robotParts';
import { roleDetails } from '@/data/roleDetails';
import { roles } from '@/data/roles';
import { essentialSkills } from '@/data/skills';
import type { ArchetypeId, CategoryFlow, CategoryId, RoleId } from '@/data/types';
import { ARCHETYPE_TO_ROLE, CATEGORIES } from '@/data/types';
import { computeCategoryMax } from '@/lib/categoryScoring';

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

const categoryFlows = flowList.filter((f): f is CategoryFlow => f.kind !== 'classic');

describe.each(categoryFlows)('§17 flow invariants — $name', (flow) => {
  const steps = flow.steps;
  const stepIds = steps.map((s) => s.id);

  it('has unique step ids', () => {
    expect(new Set(stepIds).size).toBe(stepIds.length);
  });

  it('resolves every branch target to a real, later step (forward-only)', () => {
    steps.forEach((step, index) => {
      if (step.type !== 'mc') return;
      for (const choice of step.choices) {
        if (choice.branchTo === undefined) continue;
        const target = stepIds.indexOf(choice.branchTo);
        expect(target, `${step.id} → ${choice.branchTo}`).toBeGreaterThan(index);
      }
    });
  });

  it('gives every scene exactly four choices covering all four categories', () => {
    for (const step of steps) {
      if (step.type !== 'scene') continue;
      expect(step.choices, step.id).toHaveLength(4);
      expect(new Set(step.choices.map((c) => c.category)), step.id).toEqual(new Set(CATEGORIES));
    }
  });

  it('keeps choice and statement ids unique within the flow', () => {
    const ids = steps.flatMap((step) => {
      if (step.type === 'statementSort') return step.statements.map((s) => s.id);
      return step.choices.map((c) => c.id);
    });
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('matches the declared expectedCategoryMax against the computed full-path max', () => {
    expect(computeCategoryMax(steps)).toEqual(flow.expectedCategoryMax);
  });

  it('has complete, non-empty owned copy (landing + results)', () => {
    const strings = [
      ...Object.values(flow.landingCopy),
      flow.resultsCopy.heading,
      flow.resultsCopy.mapHint,
      flow.resultsCopy.centerLabel,
      flow.resultsCopy.retake,
      ...Object.values(flow.resultsCopy.sheet),
    ];
    for (const value of strings) {
      expect(typeof value).toBe('string');
      expect(value.trim()).not.toBe('');
    }
  });
});

describe('§17 narrative flow shape', () => {
  const narrative = flows.narrative as CategoryFlow;

  it('has exactly 7 scenes after the intro questions', () => {
    expect(narrative.steps.filter((s) => s.type === 'scene')).toHaveLength(7);
    expect(narrative.steps.filter((s) => s.type === 'mc')).toHaveLength(5);
  });
});

describe('§17 exam flow shape', () => {
  const exam = flows.exam as CategoryFlow;
  const sort = exam.steps.find((s) => s.type === 'statementSort');

  it('has exactly 30 statements with the spec category counts (8/7/7/8)', () => {
    expect(sort).toBeDefined();
    if (sort?.type !== 'statementSort') return;
    expect(sort.statements).toHaveLength(30);
    const counts: Record<CategoryId, number> = { operate: 0, repair: 0, program: 0, plan: 0 };
    for (const statement of sort.statements) counts[statement.category] += 1;
    expect(counts).toEqual({ operate: 8, repair: 7, program: 7, plan: 8 });
  });

  it('interleaves statements — no two same-category statements adjacent', () => {
    if (sort?.type !== 'statementSort') return;
    for (let i = 1; i < sort.statements.length; i++) {
      expect(
        sort.statements[i].category,
        `${sort.statements[i - 1].id} → ${sort.statements[i].id}`,
      ).not.toBe(sort.statements[i - 1].category);
    }
  });

  it('offers the three buckets in order: thats-me, maybe, not-me', () => {
    if (sort?.type !== 'statementSort') return;
    expect(sort.buckets.map((b) => b.id)).toEqual(['thats-me', 'maybe', 'not-me']);
    for (const bucket of sort.buckets) expect(bucket.label.trim()).not.toBe('');
  });
});

describe('§17 cross-flow invariants', () => {
  it('gives every flow a unique id and a researcher-facing name', () => {
    expect(new Set(flowList.map((f) => f.id)).size).toBe(flowList.length);
    for (const flow of flowList) expect(flow.name.trim()).not.toBe('');
  });

  it('registers every flow in the map under its own id', () => {
    for (const flow of flowList) expect(flows[flow.id]).toBe(flow);
  });

  it('wraps the classic flow around question set A by reference', () => {
    const classic = flows.classic;
    expect(classic.kind).toBe('classic');
    if (classic.kind === 'classic') {
      expect(classic.questionSet.id).toBe('a');
      expect(classic.landingCopy).toBe(classic.questionSet.landingCopy);
    }
  });

  it('provides a role detail for every category with full sheet content', () => {
    for (const category of CATEGORIES) {
      const detail = roleDetails[category];
      expect(detail.categoryId).toBe(category);
      for (const value of [detail.roleName, detail.description, detail.education, detail.salary]) {
        expect(value.trim()).not.toBe('');
      }
      expect(detail.jobActivities.length).toBeGreaterThan(0);
      expect(detail.commonJobTitles.length).toBeGreaterThan(0);
    }
  });

  it('maps the four role names onto four distinct roles', () => {
    const names = CATEGORIES.map((c) => roleDetails[c].roleName);
    expect(new Set(names).size).toBe(4);
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
