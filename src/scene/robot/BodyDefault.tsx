// BodyDefault — torso, legs, feet, chest panel, and shoulder connectors.
// Always rendered. Arms are separate (DefaultArms or variants). slot: 'body'.
export function BodyDefault() {
  return (
    <g>
      {/* Legs */}
      <rect x="37" y="118" width="17" height="36" rx="8" fill="#FFD05A" stroke="#C88A00" strokeWidth="2" />
      <rect x="66" y="118" width="17" height="36" rx="8" fill="#FFD05A" stroke="#C88A00" strokeWidth="2" />
      {/* Feet — wider for stable footing */}
      <rect x="31" y="147" width="25" height="11" rx="5" fill="#FFB81C" stroke="#C88A00" strokeWidth="2" />
      <rect x="64" y="147" width="25" height="11" rx="5" fill="#FFB81C" stroke="#C88A00" strokeWidth="2" />

      {/* Torso */}
      <rect x="25" y="56" width="70" height="64" rx="15" fill="#FFB81C" stroke="#C88A00" strokeWidth="2" />
      {/* Chest panel (where decals render) */}
      <rect x="34" y="65" width="52" height="42" rx="9" fill="#E8A000" stroke="#C88A00" strokeWidth="1.5" />
      {/* Belly-button bolt */}
      <circle cx="60" cy="116" r="3.5" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />

      {/* Shoulder connector bolts — sit on top of torso edge */}
      <circle cx="25" cy="70" r="5" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />
      <circle cx="95" cy="70" r="5" fill="#FFD05A" stroke="#C88A00" strokeWidth="1.5" />
    </g>
  );
}
