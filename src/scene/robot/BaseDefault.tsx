// BaseDefault — the shadow platform the robot stands on.
// Always rendered first (bottom layer). slot: 'base'.
export function BaseDefault() {
  return (
    <g>
      <ellipse cx="60" cy="171" rx="36" ry="7" fill="#2D3A4A" opacity="0.12" />
      <ellipse cx="60" cy="169" rx="28" ry="4.5" fill="#2D3A4A" opacity="0.08" />
    </g>
  );
}
