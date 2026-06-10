// MagnifierHead — head with a large magnifier lens for the inspector/analyst archetype.
// Eye color uses currentColor.
export function MagnifierHead() {
  return (
    <g>
      {/* Head shell */}
      <rect x="31" y="14" width="58" height="43" rx="13" fill="#FFB81C" stroke="#C88A00" strokeWidth="2" />

      {/* Magnifier frame (large circular eye) */}
      <circle cx="56" cy="35" r="16" fill="#E8F6FF" stroke="#C88A00" strokeWidth="2" />
      {/* Lens tint */}
      <circle cx="56" cy="35" r="13" fill="currentColor" opacity="0.18" />
      {/* Pupil / focus spot */}
      <circle cx="56" cy="35" r="7" fill="currentColor" opacity="0.6" />
      {/* Lens highlight */}
      <circle cx="50" cy="29" r="4" fill="white" opacity="0.8" />

      {/* Handle extending to lower-right */}
      <line x1="68" y1="47" x2="76" y2="55" stroke="#C88A00" strokeWidth="3" strokeLinecap="round" />

      {/* Small secondary eye (monitoring) */}
      <circle cx="79" cy="28" r="4.5" fill="currentColor" opacity="0.7" />
      <circle cx="80" cy="27" r="1.5" fill="white" opacity="0.8" />

      {/* Ear bolts */}
      <circle cx="31" cy="36" r="5" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />
      <circle cx="89" cy="36" r="5" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />
    </g>
  );
}
