import { ACCENT_CLASSES } from '@/components/accent';
import type { ArchetypeId } from '@/data/types';

interface RobotPlaceholderProps {
  archetype: ArchetypeId;
  size?: number;
}

// Phase 1 placeholder robot — a simple line robot tinted with the active archetype accent
// (via currentColor). The real modular SVG robot is authored in Phase 2; here the point is the
// compare *interaction*, so the figure just needs to read as "your robot" and change with the
// active path. No hardcoded hex: stroke uses currentColor set by the accent text class.
export function RobotPlaceholder({ archetype, size = 116 }: RobotPlaceholderProps) {
  return (
    <svg
      width={size}
      height={(size / 116) * 136}
      viewBox="0 0 116 136"
      className={ACCENT_CLASSES[archetype].text}
      role="img"
      aria-label="Your robot"
    >
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        {/* antenna */}
        <line x1="58" y1="14" x2="58" y2="5" />
        <circle cx="58" cy="5" r="3.5" fill="currentColor" />
        {/* head */}
        <rect x="36" y="14" width="44" height="32" rx="8" className="fill-bg" />
        {/* eyes */}
        <circle cx="49" cy="30" r="4" fill="currentColor" stroke="none" />
        <circle cx="67" cy="30" r="4" fill="currentColor" stroke="none" />
        {/* arms */}
        <rect x="12" y="54" width="13" height="34" rx="6" className="fill-bg" />
        <rect x="91" y="54" width="13" height="34" rx="6" className="fill-bg" />
        {/* body */}
        <rect x="28" y="50" width="60" height="56" rx="10" className="fill-bg" />
        {/* chest light */}
        <circle cx="58" cy="74" r="7" fill="currentColor" stroke="none" opacity="0.3" />
        {/* legs */}
        <rect x="38" y="108" width="13" height="24" rx="5" className="fill-bg" />
        <rect x="65" y="108" width="13" height="24" rx="5" className="fill-bg" />
      </g>
    </svg>
  );
}
