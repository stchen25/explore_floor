import { Fragment } from 'react';

import { SparkleStar } from '@/components';
import { ROLE_ACCENT } from '@/components/categoryAccent';
import { careerTrajectory } from '@/data/exploreContent';
import type { CategoryId } from '@/data/types';

// The "Where this can lead" branching-diamond trajectory on the job-overview "How you fit" tab
// (Phase G, the Claude Design handoff). The user's current role sits at the base and climbs through
// two mid-level branch roles to one senior role at the top, four sparkle nodes wired by dashed
// connectors. Static by construction (reduced-motion safe — no looping animation).
//
// Geometry is recreated from the reference in a fixed 636×450 space: nodes are placed by percentage
// of that space (so their centers track the SVG when the panel scales) at a fixed 70px size, while
// the SVG connectors scale with the panel. The radial-gradient panel fill, the grey line color, and
// the node fill/border alphas are decorative handoff literals with no token home (mirrors how
// BubbleField / ConstellationField annotate theirs); everything else is tokens / the role accent.

const PANEL_W = 636;
const PANEL_H = 450;
const NODE = 70; // node diameter (px), fixed regardless of panel scale (r ~35)
const PILL_GAP = NODE / 2 + 8; // node rim → pill offset

const xPct = (v: number) => `${(v / PANEL_W) * 100}%`;
const yPct = (v: number) => `${(v / PANEL_H) * 100}%`;

interface TrajNode {
  key: string;
  cx: number;
  cy: number;
  label: string;
  place: 'above' | 'below'; // the pill sits centered above or below its node
  current: boolean;
}

export function TrajectoryViz({ category }: { category: CategoryId }) {
  const accent = ROLE_ACCENT[category];
  const traj = careerTrajectory[category];
  const accentSoft = `var(--color-role-${category}-soft)`; // accent soft as a raw value for the SVG stroke
  const greyLine = 'rgba(224, 224, 224, 0.4)'; // decorative upper-connector grey (handoff literal)

  // Labels sit centered above/below their node (not beside it): role titles vary in length and
  // side pills clipped the panel for the wider names. The senior pill goes above its top node; the
  // branch + current pills go below, where each can grow either way from center without overflowing.
  const nodes: TrajNode[] = [
    { key: 'current', cx: 318, cy: 374, label: 'CURRENT ROLE', place: 'below', current: true },
    { key: 'left', cx: 197, cy: 232, label: traj.branches[0], place: 'below', current: false },
    { key: 'right', cx: 439, cy: 232, label: traj.branches[1], place: 'below', current: false },
    { key: 'senior', cx: 318, cy: 90, label: traj.senior, place: 'above', current: false },
  ];

  return (
    <div
      className="relative mx-auto w-full overflow-hidden rounded-lg"
      // Decorative radial-gradient panel (grey/purple handoff literals — no token home).
      style={{
        maxWidth: PANEL_W,
        aspectRatio: `${PANEL_W} / ${PANEL_H}`,
        background: 'radial-gradient(120% 90% at 50% 100%, #3a3140 0%, #2e3340 45%, #2a2a2a 100%)',
      }}
      data-testid="trajectory"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${PANEL_W} ${PANEL_H}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* base → the two branch roles: role-soft accent, the lit lower half of the climb */}
        <line x1={318} y1={350} x2={232} y2={232} stroke={accentSoft} strokeOpacity={0.85} strokeWidth={1.5} strokeDasharray="6 6" />
        <line x1={318} y1={350} x2={404} y2={232} stroke={accentSoft} strokeOpacity={0.85} strokeWidth={1.5} strokeDasharray="6 6" />
        {/* the two branch roles → senior: neutral grey, the unlit upper half */}
        <line x1={232} y1={208} x2={318} y2={118} stroke={greyLine} strokeWidth={1.5} strokeDasharray="6 6" />
        <line x1={404} y1={208} x2={318} y2={118} stroke={greyLine} strokeWidth={1.5} strokeDasharray="6 6" />
      </svg>

      {nodes.map((n) => (
        <Fragment key={n.key}>
          <div
            className="absolute grid place-items-center rounded-full"
            style={{
              left: xPct(n.cx),
              top: yPct(n.cy),
              width: NODE,
              height: NODE,
              transform: 'translate(-50%, -50%)',
              // Translucent dark fill + ring (fill/border alphas are decorative literals): the
              // current node rings in its accent, the rest in soft white.
              background: 'rgba(38, 38, 38, 0.3)',
              border: `2px solid ${n.current ? `var(--color-role-${category})` : 'rgba(255, 255, 255, 0.8)'}`,
            }}
          >
            <SparkleStar
              size={28}
              className={n.current ? accent.textSoft : 'text-text-on-dark-muted'}
              // Soft glow so each node reads as a twinkle (accent on current, white on the rest).
              style={{
                filter: `drop-shadow(0 0 7px ${n.current ? accent.glow : 'rgba(255, 255, 255, 0.35)'})`,
              }}
            />
          </div>

          <span
            className={`absolute whitespace-nowrap rounded-full text-small ${
              n.current
                ? `${accent.textSoft} font-heading font-semibold tracking-wide`
                : 'text-text-on-dark-muted'
            }`}
            style={{
              left: xPct(n.cx),
              padding: '6px 14px',
              // Low-alpha accent fill for the current pill (accent.glow is already rgb(...)/0.3);
              // neutral glass fill for the branch/senior pills (decorative literal).
              backgroundColor: n.current ? accent.glow : 'rgba(255, 255, 255, 0.12)',
              ...(n.place === 'above'
                ? { top: `calc(${yPct(n.cy)} - ${PILL_GAP}px)`, transform: 'translate(-50%, -100%)' }
                : { top: `calc(${yPct(n.cy)} + ${PILL_GAP}px)`, transform: 'translate(-50%, 0)' }),
            }}
          >
            {n.label}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
