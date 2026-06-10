// WrenchArm — right arm with a wrench-tool end. Replaces the right default arm.
export function WrenchArm() {
  return (
    <g>
      {/* Upper arm */}
      <rect x="95" y="62" width="16" height="34" rx="8" fill="#FFD05A" stroke="#C88A00" strokeWidth="2" />
      {/* Elbow joint */}
      <circle cx="103" cy="97" r="6" fill="#FFB81C" stroke="#C88A00" strokeWidth="1.5" />
      {/* Forearm */}
      <rect x="96" y="96" width="14" height="18" rx="7" fill="#FFD05A" stroke="#C88A00" strokeWidth="2" />
      {/* Wrench O-ring */}
      <circle cx="103" cy="121" r="8" fill="none" stroke="#888888" strokeWidth="3" />
      <circle cx="103" cy="121" r="4" fill="none" stroke="#888888" strokeWidth="2" />
      {/* Wrench handle nub */}
      <rect x="99" y="128" width="8" height="4" rx="2" fill="#888888" stroke="#666" strokeWidth="1" />
    </g>
  );
}
