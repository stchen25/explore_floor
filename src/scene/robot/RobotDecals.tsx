// RobotDecals — renders up to 3 active decals stacked on the chest panel.
// Each decal is a small icon within a 52×42 space (panel: x=34 y=65).
// partId → small SVG icon, centered in the panel.

interface DecalProps {
  partIds: string[];
}

// Decals render in a row or stacked; at most 3 fit.
const DECAL_POSITIONS: Array<{ cx: number; cy: number }> = [
  { cx: 60, cy: 86 },  // center
  { cx: 46, cy: 80 },  // left
  { cx: 74, cy: 80 },  // right
];

function OpenPanelDecal({ cx, cy }: { cx: number; cy: number }) {
  const x = cx - 10;
  const y = cy - 10;
  return (
    <g>
      <rect x={x} y={y} width="20" height="16" rx="3" fill="none" stroke="#C88A00" strokeWidth="1.5" />
      <line x1={x + 3} y1={y + 5} x2={x + 17} y2={y + 5} stroke="#C88A00" strokeWidth="1" />
      <line x1={x + 3} y1={y + 9} x2={x + 17} y2={y + 9} stroke="#C88A00" strokeWidth="1" />
    </g>
  );
}

function BinaryDecal({ cx, cy }: { cx: number; cy: number }) {
  return (
    <text x={cx} y={cy + 4} textAnchor="middle" fontSize="8" fill="#C88A00" fontFamily="monospace" fontWeight="bold">
      01
    </text>
  );
}

function GraphDecal({ cx, cy }: { cx: number; cy: number }) {
  const x = cx - 9;
  const y = cy + 4;
  return (
    <g>
      <polyline points={`${x},${y} ${x + 4},${y - 7} ${x + 8},${y - 4} ${x + 12},${y - 11} ${x + 16},${y - 8}`} fill="none" stroke="#C88A00" strokeWidth="1.5" strokeLinejoin="round" />
    </g>
  );
}

function CalendarDecal({ cx, cy }: { cx: number; cy: number }) {
  const x = cx - 9;
  const y = cy - 8;
  return (
    <g>
      <rect x={x} y={y} width="18" height="16" rx="2" fill="none" stroke="#C88A00" strokeWidth="1.5" />
      <line x1={x} y1={y + 5} x2={x + 18} y2={y + 5} stroke="#C88A00" strokeWidth="1" />
      <circle cx={x + 5} cy={y + 10} r="1.5" fill="#C88A00" />
      <circle cx={x + 9} cy={y + 10} r="1.5" fill="#C88A00" />
      <circle cx={x + 13} cy={y + 10} r="1.5" fill="#C88A00" />
    </g>
  );
}

function ChecklistDecal({ cx, cy }: { cx: number; cy: number }) {
  const x = cx - 8;
  const y = cy - 8;
  return (
    <g>
      <line x1={x + 6} y1={y + 3} x2={x + 16} y2={y + 3} stroke="#C88A00" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={x + 6} y1={y + 8} x2={x + 16} y2={y + 8} stroke="#C88A00" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={x + 6} y1={y + 13} x2={x + 16} y2={y + 13} stroke="#C88A00" strokeWidth="1.5" strokeLinecap="round" />
      {/* Check marks */}
      <path d={`M ${x + 1} ${y + 2} l 2 2 l 3 -3`} fill="none" stroke="#C88A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${x + 1} ${y + 7} l 2 2 l 3 -3`} fill="none" stroke="#C88A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function FlowchartDecal({ cx, cy }: { cx: number; cy: number }) {
  const x = cx;
  const y = cy - 7;
  return (
    <g>
      <rect x={x - 5} y={y} width="10" height="7" rx="2" fill="none" stroke="#C88A00" strokeWidth="1.5" />
      <line x1={x} y1={y + 7} x2={x} y2={y + 10} stroke="#C88A00" strokeWidth="1.5" />
      <rect x={x - 7} y={y + 10} width="14" height="7" rx="2" fill="none" stroke="#C88A00" strokeWidth="1.5" />
    </g>
  );
}

function NetworkDecal({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy - 5} r="3" fill="none" stroke="#C88A00" strokeWidth="1.5" />
      <circle cx={cx - 7} cy={cy + 5} r="2.5" fill="none" stroke="#C88A00" strokeWidth="1.5" />
      <circle cx={cx + 7} cy={cy + 5} r="2.5" fill="none" stroke="#C88A00" strokeWidth="1.5" />
      <line x1={cx} y1={cy - 2} x2={cx - 6} y2={cy + 3} stroke="#C88A00" strokeWidth="1.2" />
      <line x1={cx} y1={cy - 2} x2={cx + 6} y2={cy + 3} stroke="#C88A00" strokeWidth="1.2" />
    </g>
  );
}

const DECAL_MAP: Record<string, React.ComponentType<{ cx: number; cy: number }>> = {
  'open-panel-decal': OpenPanelDecal,
  'binary-decal': BinaryDecal,
  'graph-decal': GraphDecal,
  'calendar-decal': CalendarDecal,
  'checklist-decal': ChecklistDecal,
  'flowchart-decal': FlowchartDecal,
  'network-decal': NetworkDecal,
};

export function RobotDecals({ partIds }: DecalProps) {
  if (partIds.length === 0) return null;
  const visible = partIds.slice(0, 3);
  return (
    <g>
      {visible.map((id, i) => {
        const Decal = DECAL_MAP[id];
        if (!Decal) return null;
        const pos = DECAL_POSITIONS[i] ?? DECAL_POSITIONS[0];
        return <Decal key={id} cx={pos.cx} cy={pos.cy} />;
      })}
    </g>
  );
}
