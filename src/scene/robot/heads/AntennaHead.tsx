// AntennaHead — scanner/sensor head with a tall antenna. Default head.
// Eye circles use currentColor so the caller tints them by archetype.
export function AntennaHead() {
  return (
    <g>
      {/* Antenna stem + sensor orb */}
      <line x1="60" y1="14" x2="60" y2="4" stroke="#C88A00" strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="3" r="3.5" fill="#FFB81C" stroke="#C88A00" strokeWidth="1.5" />

      {/* Head shell */}
      <rect x="31" y="14" width="58" height="43" rx="13" fill="#FFB81C" stroke="#C88A00" strokeWidth="2" />

      {/* Eyes */}
      <circle cx="47" cy="33" r="7" fill="currentColor" />
      <circle cx="73" cy="33" r="7" fill="currentColor" />
      {/* Eye highlights */}
      <circle cx="49" cy="30" r="2.5" fill="white" opacity="0.75" />
      <circle cx="75" cy="30" r="2.5" fill="white" opacity="0.75" />

      {/* Smile */}
      <path d="M 49 46 Q 60 53 71 46" stroke="#C88A00" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Ear bolt-covers */}
      <circle cx="31" cy="36" r="5" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />
      <circle cx="89" cy="36" r="5" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />
    </g>
  );
}
