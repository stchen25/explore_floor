// SolderedArm — left arm with a soldering-iron tip. Replaces the left default arm.
export function SolderedArm() {
  return (
    <g>
      {/* Upper arm */}
      <rect x="9" y="62" width="16" height="34" rx="8" fill="#FFD05A" stroke="#C88A00" strokeWidth="2" />
      {/* Elbow joint */}
      <circle cx="17" cy="97" r="6" fill="#FFB81C" stroke="#C88A00" strokeWidth="1.5" />
      {/* Forearm */}
      <rect x="10" y="96" width="14" height="18" rx="7" fill="#FFD05A" stroke="#C88A00" strokeWidth="2" />
      {/* Iron shaft */}
      <rect x="14" y="113" width="6" height="14" rx="3" fill="#888888" stroke="#666" strokeWidth="1.5" />
      {/* Tip cone */}
      <path d="M 14 127 L 17 136 L 20 127 Z" fill="#AAAAAA" stroke="#666" strokeWidth="1" />
      {/* Heat glow at tip */}
      <circle cx="17" cy="136" r="3" fill="#F56A00" opacity="0.7" />
      <circle cx="17" cy="136" r="1.5" fill="#FFD05A" opacity="0.9" />
    </g>
  );
}
