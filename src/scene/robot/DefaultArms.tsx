// DefaultArms — rendered when no arm variant is active for that slot.
// Individual components let Robot.tsx swap each side independently.

export function DefaultLeftArm() {
  return (
    <g>
      <rect x="9" y="62" width="16" height="42" rx="8" fill="#FFD05A" stroke="#C88A00" strokeWidth="2" />
      <circle cx="17" cy="107" r="7" fill="#FFB81C" stroke="#C88A00" strokeWidth="2" />
    </g>
  );
}

export function DefaultRightArm() {
  return (
    <g>
      <rect x="95" y="62" width="16" height="42" rx="8" fill="#FFD05A" stroke="#C88A00" strokeWidth="2" />
      <circle cx="103" cy="107" r="7" fill="#FFB81C" stroke="#C88A00" strokeWidth="2" />
    </g>
  );
}
