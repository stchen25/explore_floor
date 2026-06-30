import type { BucketId, FlowStep } from '@/data/types';
import { categoryContributions } from '@/lib/categoryBreakdown';

import { makeFlow } from './fixtures';

// Fixtures mirror the narrative flow shape (a mapped MC + a scene sort). Real content is
// covered by data-integrity. The breakdown feeds the results "why you matched" read.

const steps: FlowStep[] = [
  {
    type: 'mc',
    id: 'q',
    question: 'Tech?',
    choices: [
      { id: 'q-spec', label: 'Coding it', categories: ['specialist'] },
      { id: 'q-tech', label: 'Running it', categories: ['technician'] },
    ],
  },
  {
    type: 'scene',
    id: 'sort',
    prompt: 'Around the house.',
    question: 'Which sounds like you?',
    choices: [
      { id: 's-spec-1', label: 'Building a website', category: 'specialist' },
      { id: 's-spec-2', label: 'Debugging code', category: 'specialist' },
      { id: 's-tech-1', label: 'Fixing a chair', category: 'technician' },
    ],
  },
];

describe('categoryContributions', () => {
  it('lists the choices marked "that\'s me" as earned, with n-of-m counts', () => {
    const buckets: Record<string, BucketId> = {
      's-spec-1': 'thats-me',
      's-spec-2': 'not-me',
      's-tech-1': 'thats-me',
    };
    const result = categoryContributions(makeFlow(steps), {}, buckets);
    expect(result.specialist.earned).toEqual(['Building a website']);
    expect(result.specialist.earnedCount).toBe(1);
    expect(result.specialist.totalCount).toBe(3); // q (specialist) + 2 specialist scene choices
    expect(result.technician.earned).toEqual(['Fixing a chair']);
    expect(result.technician.totalCount).toBe(2); // q (technician) + 1 technician scene choice
  });

  it('separates maybe choices from earned ones (maybe earns nothing today)', () => {
    const result = categoryContributions(makeFlow(steps), {}, { 's-spec-1': 'maybe' });
    expect(result.specialist.earned).toEqual([]);
    expect(result.specialist.maybe).toEqual(['Building a website']);
    expect(result.specialist.earnedCount).toBe(0);
  });

  it('breaks a scene down by bucket (earned vs on-the-fence)', () => {
    const sceneFlow = makeFlow([
      {
        type: 'scene',
        id: 's',
        prompt: 'p',
        question: 'q',
        choices: [
          { id: 's-tech', label: 'Fix your bike', category: 'technician' },
          { id: 's-spec', label: 'To-do list', category: 'specialist' },
          { id: 's-int', label: 'Planned outfit', category: 'integrator' },
        ],
      },
    ]);
    const result = categoryContributions(sceneFlow, {}, {
      's-tech': 'thats-me',
      's-spec': 'maybe',
      's-int': 'not-me',
    });
    expect(result.technician.earned).toEqual(['Fix your bike']);
    expect(result.technician.earnedCount).toBe(1);
    expect(result.specialist.maybe).toEqual(['To-do list']);
    expect(result.specialist.earned).toEqual([]);
    expect(result.integrator.earned).toEqual([]);
    expect(result.integrator.totalCount).toBe(1); // every scene choice counts toward its max
  });

  it('counts a chosen scored MC pick as an earned contribution for its role', () => {
    const result = categoryContributions(makeFlow(steps), { q: 'q-spec' }, {});
    expect(result.specialist.earned).toContain('Coding it');
    expect(result.specialist.earnedCount).toBe(1);
    expect(result.technician.earned).toEqual([]); // q-tech not chosen
  });

  it('feeds every role the choice maps to when a pick maps to two', () => {
    const twoWay = makeFlow([
      {
        type: 'mc',
        id: 'm',
        question: 'Day?',
        choices: [{ id: 'm-hands', label: 'Hands-on work', categories: ['technician', 'specialist'] }],
      },
    ]);
    const result = categoryContributions(twoWay, { m: 'm-hands' }, {});
    expect(result.technician.earned).toEqual(['Hands-on work']);
    expect(result.specialist.earned).toEqual(['Hands-on work']);
  });

  it('returns an entry for every role, empty where nothing contributed', () => {
    const result = categoryContributions(makeFlow(steps), {}, {});
    for (const category of ['technician', 'specialist', 'integrator'] as const) {
      expect(result[category].earned).toEqual([]);
      expect(result[category].earnedCount).toBe(0);
    }
    expect(result.integrator.totalCount).toBe(0); // no integrator items in the fixture
  });

  it('is pure — identical input yields a deeply equal result', () => {
    const flow = makeFlow(steps);
    const buckets: Record<string, BucketId> = { 's-spec-1': 'thats-me' };
    expect(categoryContributions(flow, {}, buckets)).toEqual(
      categoryContributions(flow, {}, buckets),
    );
  });
});

describe('categoryContributions — openers / moments / passed (Phase C breakdown)', () => {
  // A screener MC (n-q1, in SCREENER_STEP_IDS) + an interest MC (n-q4) + a scene.
  const splitFlow = makeFlow([
    {
      type: 'mc',
      id: 'n-q1',
      question: 'College?',
      choices: [
        { id: 'n-q1-no', label: 'No', categories: ['technician'] },
        { id: 'n-q1-yes', label: 'Yes', categories: [] },
      ],
    },
    {
      type: 'mc',
      id: 'n-q4',
      question: 'Day?',
      choices: [
        { id: 'n-q4-hands', label: 'Hands-on work', categories: ['technician'] },
        { id: 'n-q4-typing', label: 'Typing on a computer', categories: ['specialist'] },
      ],
    },
    {
      type: 'scene',
      id: 'n-s1',
      prompt: 'p',
      question: 'q',
      choices: [
        { id: 'n-s1-tech', label: 'Fix your bike', category: 'technician' },
        { id: 'n-s1-spec', label: 'To-do list', category: 'specialist' },
      ],
    },
  ]);

  it('counts a screener pick as an opener, not a moment', () => {
    const r = categoryContributions(
      splitFlow,
      { 'n-q1': 'n-q1-no', 'n-q4': 'n-q4-hands' },
      { 'n-s1-tech': 'thats-me', 'n-s1-spec': 'not-me' },
    );
    // Technician: opener (No) + two moments (Hands-on work, Fix your bike).
    expect(r.technician.openerCount).toBe(1);
    expect(r.technician.momentLabels).toEqual(['Hands-on work', 'Fix your bike']);
    expect(r.technician.momentCount).toBe(2);
    expect(r.technician.earnedCount).toBe(3);
    expect(r.technician.openerCount + r.technician.momentCount).toBe(r.technician.earnedCount);
    expect(r.technician.passedCount).toBe(0);
    expect(r.technician.passedLabels).toEqual([]);
  });

  it('lists a role’s untaken options as passed-on, and passedCount = total − earned', () => {
    const r = categoryContributions(
      splitFlow,
      { 'n-q1': 'n-q1-no', 'n-q4': 'n-q4-hands' },
      { 'n-s1-tech': 'thats-me', 'n-s1-spec': 'not-me' },
    );
    // Specialist earned nothing: passed on its interest option and its scene option.
    expect(r.specialist.earnedCount).toBe(0);
    expect(r.specialist.openerCount).toBe(0);
    expect(r.specialist.momentLabels).toEqual([]);
    expect(r.specialist.totalCount).toBe(2);
    expect(r.specialist.passedCount).toBe(2);
    expect(r.specialist.passedLabels).toEqual(['Typing on a computer', 'To-do list']);
  });

  it('treats a "maybe" scene as not-pointed (counts as passed) but not as a passed-on label', () => {
    const r = categoryContributions(
      splitFlow,
      { 'n-q1': 'n-q1-no', 'n-q4': 'n-q4-hands' },
      { 'n-s1-tech': 'thats-me', 'n-s1-spec': 'maybe' },
    );
    expect(r.specialist.maybe).toEqual(['To-do list']);
    expect(r.specialist.passedCount).toBe(2); // total 2 − earned 0
    // 'maybe' is on-the-fence, so only the untaken interest option is a passed-on label.
    expect(r.specialist.passedLabels).toEqual(['Typing on a computer']);
  });
});
