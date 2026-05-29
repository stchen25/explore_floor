import { items } from '@/data/items';
import type { Decision } from '@/data/types';
import { assembleRobot } from '@/lib/robotAssembly';

const keep = (...ids: string[]): Record<string, Decision> =>
  Object.fromEntries(ids.map((id) => [id, 'keep' as Decision]));

describe('assembleRobot', () => {
  it('returns a non-finalized robot with default base/body/colorScheme when nothing is kept', () => {
    const robot = assembleRobot({}, items, null);
    expect(robot.isFinalized).toBe(false);
    expect(robot.slots.base).toBe('base-default');
    expect(robot.slots.body).toBe('body-default');
    expect(robot.slots.colorScheme).toBe('default');
    expect(robot.slots.accessory).toBeUndefined();
    expect(robot.slots.head).toBeUndefined();
  });

  it('derives colorScheme from the primary archetype when provided', () => {
    const robot = assembleRobot({}, items, 'innovator');
    expect(robot.slots.colorScheme).toBe('innovator');
  });

  it('lets the last kept item win for a single-cardinality slot (head)', () => {
    // Three items target head: magnifier (13), warning-light (20), antenna (24).
    const robot = assembleRobot(
      keep('taking-apart-whats-wrong', 'noticing-needs-fixing', 'spotting-problems-early'),
      items,
      null,
    );
    expect(robot.slots.head).toBe('antenna-head'); // last in item order
  });

  it('accumulates accessories in item order and caps at 4', () => {
    const allAccessoryItems = items
      .filter((i) => i.robotContribution.parts.some((p) => p.slot === 'accessory'))
      .map((i) => i.id);
    const robot = assembleRobot(keep(...allAccessoryItems), items, null);
    const accessories = robot.slots.accessory as string[];
    expect(accessories).toHaveLength(4);
    expect(accessories).toEqual(['puzzle-piece', 'clipboard', 'blueprint-roll', 'mini-robot-arm']);
  });

  it('accumulates decals in item order and caps at 3', () => {
    const allDecalItems = items
      .filter((i) => i.robotContribution.parts.some((p) => p.slot === 'decal'))
      .map((i) => i.id);
    const robot = assembleRobot(keep(...allDecalItems), items, null);
    const decals = robot.slots.decal as string[];
    expect(decals).toHaveLength(3);
    expect(decals).toEqual(['open-panel-decal', 'binary-decal', 'graph-decal']);
  });

  it('attaches the right arm part for a single kept builder item', () => {
    const robot = assembleRobot(keep('building-or-fixing'), items, 'builder');
    expect(robot.slots.rightArm).toBe('wrench-arm');
    expect(robot.slots.colorScheme).toBe('builder');
  });
});
