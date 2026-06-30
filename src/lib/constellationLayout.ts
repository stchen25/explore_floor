import { polarPoint } from './nodeLayout';

// Pure layout for the results job constellation (D-029 Phase F). Count-aware: N job nodes ring a
// center (the role itself) on an even polar orbit, so a role with 3 jobs and one with 5 both read
// balanced. Coordinates are in a fixed CONSTELLATION_VIEW space (the field scales them to
// responsive percentages — see ConstellationField). No React, no side effects; unit-tested in
// __tests__/constellationLayout.test.ts. (Reuses polarPoint from nodeLayout; deliberately NOT
// fanPoints, which arcs a bounded spread and would collide the first/last node on a full ring.)

/** Logical drawing space for the constellation field. */
export const CONSTELLATION_VIEW = { width: 1040, height: 640 } as const;

// Geometry defaults, tuned so a 5-node ring fits CONSTELLATION_VIEW with margin and no node
// overlaps its neighbour (adjacent spacing at N=5 ≈ 247px > 2·nodeR = 128px).
const DEFAULTS = {
  centerR: 96, // role center circle radius
  nodeR: 64, // job node radius
  orbit: 210, // distance from center to each node center
  startAngleDeg: -90, // first node straight up
} as const;

export interface ConstellationOptions {
  startAngleDeg?: number;
  orbit?: number;
  nodeR?: number;
  centerR?: number;
}

export interface ConstellationNodeLayout {
  index: number;
  angleDeg: number;
  cx: number;
  cy: number;
  r: number;
  /** Dashed edge endpoints: from the center rim out to the node rim (both clear of the circles). */
  edge: { x1: number; y1: number; x2: number; y2: number };
}

export interface ConstellationLayout {
  center: { cx: number; cy: number; r: number };
  nodes: ConstellationNodeLayout[];
}

/** Positioned job nodes ringing the role center for a path with `count` featured jobs. */
export function constellationLayout(
  count: number,
  opts: ConstellationOptions = {},
): ConstellationLayout {
  const centerR = opts.centerR ?? DEFAULTS.centerR;
  const nodeR = opts.nodeR ?? DEFAULTS.nodeR;
  const orbit = opts.orbit ?? DEFAULTS.orbit;
  const startAngleDeg = opts.startAngleDeg ?? DEFAULTS.startAngleDeg;
  const cx = CONSTELLATION_VIEW.width / 2;
  const cy = CONSTELLATION_VIEW.height / 2;

  const nodes: ConstellationNodeLayout[] = Array.from({ length: Math.max(0, count) }, (_, index) => {
    const angleDeg = startAngleDeg + (index * 360) / count;
    const node = polarPoint(orbit, angleDeg);
    const start = polarPoint(centerR, angleDeg); // center rim
    const end = polarPoint(orbit - nodeR, angleDeg); // node rim
    return {
      index,
      angleDeg,
      cx: cx + node.x,
      cy: cy + node.y,
      r: nodeR,
      edge: { x1: cx + start.x, y1: cy + start.y, x2: cx + end.x, y2: cy + end.y },
    };
  });

  return { center: { cx, cy, r: centerR }, nodes };
}
