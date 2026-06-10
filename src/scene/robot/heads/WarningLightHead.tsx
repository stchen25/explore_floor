// WarningLightHead — industrial robot head with an orange warning light on top.
// Visor LED strip uses currentColor for archetype tinting.
export function WarningLightHead() {
  return (
    <g>
      {/* Warning light housing */}
      <rect x="48" y="4" width="24" height="13" rx="6" fill="#F56A00" stroke="#C88A00" strokeWidth="1.5" />
      <ellipse cx="60" cy="10.5" rx="8" ry="3.5" fill="#FF9840" opacity="0.7" />

      {/* Head shell */}
      <rect x="31" y="16" width="58" height="42" rx="13" fill="#FFB81C" stroke="#C88A00" strokeWidth="2" />

      {/* Visor / LED display strip */}
      <rect x="36" y="26" width="48" height="18" rx="5" fill="#1A2638" stroke="#C88A00" strokeWidth="1.5" />
      {/* Three LED eyes on the visor */}
      <circle cx="47" cy="35" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="60" cy="35" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="73" cy="35" r="5" fill="currentColor" opacity="0.9" />
      {/* LED highlights */}
      <circle cx="48" cy="33" r="1.5" fill="white" opacity="0.6" />
      <circle cx="61" cy="33" r="1.5" fill="white" opacity="0.6" />
      <circle cx="74" cy="33" r="1.5" fill="white" opacity="0.6" />

      {/* Lower face line (speaker grille) */}
      <line x1="40" y1="49" x2="80" y2="49" stroke="#C88A00" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="44" y1="53" x2="76" y2="53" stroke="#C88A00" strokeWidth="1" strokeLinecap="round" />

      {/* Ear bolts */}
      <circle cx="31" cy="36" r="5" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />
      <circle cx="89" cy="36" r="5" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />
    </g>
  );
}
