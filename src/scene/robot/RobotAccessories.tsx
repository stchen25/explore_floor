// RobotAccessories — renders up to 4 active accessories around the robot.
// Accessories occupy four attachment points; earlier items get the primary spots.

interface AccessoryProps {
  partIds: string[];
}

// Four attachment positions: held left, held right, badge top-right, badge top-left.
const ATTACH: Array<{ x: number; y: number }> = [
  { x: -4, y: 106 },   // left-hand area (left arm holds it)
  { x: 96, y: 106 },   // right-hand area
  { x: 88, y: 18 },    // upper-right badge
  { x: 8, y: 18 },     // upper-left badge
];

function PuzzlePiece({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="2" width="14" height="14" rx="2" fill="#38A5EE" stroke="#1A7AB8" strokeWidth="1.5" />
      <circle cx="7" cy="0" r="3" fill="#38A5EE" stroke="#1A7AB8" strokeWidth="1.5" />
      <circle cx="16" cy="9" r="3" fill="#38A5EE" stroke="#1A7AB8" strokeWidth="1.5" />
    </g>
  );
}

function Clipboard({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="2" width="13" height="16" rx="2" fill="#FAFAFA" stroke="#C88A00" strokeWidth="1.5" />
      <rect x="4" y="0" width="5" height="4" rx="1" fill="#E8A000" stroke="#C88A00" strokeWidth="1" />
      <line x1="2" y1="7" x2="11" y2="7" stroke="#C88A00" strokeWidth="1" />
      <line x1="2" y1="10" x2="11" y2="10" stroke="#C88A00" strokeWidth="1" />
      <line x1="2" y1="13" x2="8" y2="13" stroke="#C88A00" strokeWidth="1" />
    </g>
  );
}

function BlueprintRoll({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="2" y="2" width="11" height="15" rx="1" fill="#E8F4FF" stroke="#38A5EE" strokeWidth="1.5" />
      <ellipse cx="7.5" cy="2" rx="5.5" ry="2" fill="#C5DFF5" stroke="#38A5EE" strokeWidth="1" />
      <ellipse cx="7.5" cy="17" rx="5.5" ry="2" fill="#C5DFF5" stroke="#38A5EE" strokeWidth="1" />
      <line x1="4" y1="7" x2="11" y2="7" stroke="#38A5EE" strokeWidth="1" />
      <line x1="4" y1="10" x2="11" y2="10" stroke="#38A5EE" strokeWidth="1" />
    </g>
  );
}

function MiniRobotArm({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="4" y="0" width="6" height="10" rx="3" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />
      <circle cx="7" cy="10" r="3" fill="#FFB81C" stroke="#C88A00" strokeWidth="1" />
      <rect x="5" y="12" width="4" height="7" rx="2" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />
      <path d="M 4 19 L 7 23 L 10 19" fill="none" stroke="#C88A00" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function Beaker({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M 4 2 L 4 9 L 1 17 L 13 17 L 10 9 L 10 2 Z" fill="#D0F0FF" stroke="#38A5EE" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="4" y1="2" x2="10" y2="2" stroke="#38A5EE" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="6" cy="13" r="1.5" fill="#38A5EE" opacity="0.6" />
      <circle cx="9" cy="15" r="1" fill="#38A5EE" opacity="0.6" />
    </g>
  );
}

function ChipPin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="2" y="2" width="10" height="10" rx="2" fill="#2D3A4A" stroke="#555" strokeWidth="1.5" />
      <line x1="0" y1="5" x2="2" y2="5" stroke="#888" strokeWidth="1" />
      <line x1="0" y1="9" x2="2" y2="9" stroke="#888" strokeWidth="1" />
      <line x1="12" y1="5" x2="14" y2="5" stroke="#888" strokeWidth="1" />
      <line x1="12" y1="9" x2="14" y2="9" stroke="#888" strokeWidth="1" />
      <rect x="4" y="4" width="6" height="6" rx="1" fill="#38A5EE" opacity="0.7" />
    </g>
  );
}

function Headset({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M 2 9 Q 7 2 12 9" fill="none" stroke="#C88A00" strokeWidth="2" strokeLinecap="round" />
      <rect x="0" y="8" width="4" height="6" rx="2" fill="#FFB81C" stroke="#C88A00" strokeWidth="1.5" />
      <rect x="10" y="8" width="4" height="6" rx="2" fill="#FFB81C" stroke="#C88A00" strokeWidth="1.5" />
      <path d="M 7 14 Q 7 17 5 17" fill="none" stroke="#C88A00" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function ReferenceBook({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="1" y="0" width="12" height="17" rx="2" fill="#F56A00" stroke="#C44C00" strokeWidth="1.5" />
      <rect x="3" y="2" width="8" height="11" rx="1" fill="#FAFAFA" opacity="0.9" />
      <line x1="4" y1="5" x2="10" y2="5" stroke="#C44C00" strokeWidth="1" />
      <line x1="4" y1="8" x2="10" y2="8" stroke="#C44C00" strokeWidth="1" />
      <line x1="4" y1="11" x2="8" y2="11" stroke="#C44C00" strokeWidth="1" />
    </g>
  );
}

function Pencil({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="5" y="1" width="4" height="14" rx="1" fill="#FFB81C" stroke="#C88A00" strokeWidth="1.5" />
      <path d="M 5 15 L 7 20 L 9 15 Z" fill="#FFD05A" stroke="#C88A00" strokeWidth="1" />
      <rect x="5" y="1" width="4" height="3" rx="1" fill="#E8A000" />
    </g>
  );
}

function ToolBelt({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="4" width="16" height="5" rx="2" fill="#C88A00" stroke="#8A5E00" strokeWidth="1.5" />
      {/* Wrench icon */}
      <circle cx="5" cy="2" r="2.5" fill="none" stroke="#8A5E00" strokeWidth="1.5" />
      <line x1="5" y1="4" x2="5" y2="9" stroke="#8A5E00" strokeWidth="1.5" />
      {/* Screwdriver */}
      <line x1="11" y1="0" x2="11" y2="8" stroke="#8A5E00" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="8" x2="13" y2="8" stroke="#8A5E00" strokeWidth="1.5" />
    </g>
  );
}

function QuestionPin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="7" cy="7" r="7" fill="#FFB81C" stroke="#C88A00" strokeWidth="1.5" />
      <text x="7" y="11" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#C88A00" fontFamily="sans-serif">?</text>
    </g>
  );
}

function LightningBolt({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M 9 0 L 5 9 L 8 9 L 4 18 L 12 7 L 8 7 Z" fill="#F56A00" stroke="#C44C00" strokeWidth="1" strokeLinejoin="round" />
    </g>
  );
}

const ACCESSORY_MAP: Record<string, React.ComponentType<{ x: number; y: number }>> = {
  'puzzle-piece': PuzzlePiece,
  'clipboard': Clipboard,
  'blueprint-roll': BlueprintRoll,
  'mini-robot-arm': MiniRobotArm,
  'beaker': Beaker,
  'chip-pin': ChipPin,
  'headset': Headset,
  'reference-book': ReferenceBook,
  'pencil': Pencil,
  'tool-belt': ToolBelt,
  'question-pin': QuestionPin,
  'lightning-bolt': LightningBolt,
};

export function RobotAccessories({ partIds }: AccessoryProps) {
  if (partIds.length === 0) return null;
  const visible = partIds.slice(0, 4);
  return (
    <g>
      {visible.map((id, i) => {
        const Accessory = ACCESSORY_MAP[id];
        if (!Accessory) return null;
        const pos = ATTACH[i] ?? ATTACH[0];
        return <Accessory key={id} x={pos.x} y={pos.y} />;
      })}
    </g>
  );
}
