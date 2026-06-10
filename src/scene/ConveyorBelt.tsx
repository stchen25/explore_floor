import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';

// ConveyorBelt — the animated horizontal belt that runs across the Sort scene.
// GSAP owns the belt texture animation (infinite scroll). viewBox 0 0 500 60.
// The hatching pattern scrolls left continuously to suggest motion.
export function ConveyorBelt() {
  const beltRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Scroll the hatch pattern infinitely to simulate belt movement.
        gsap.to('.belt-hatch', {
          x: -40,
          duration: 1.2,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((v) => parseFloat(v) % -40),
          },
        });
      });
    },
    { scope: beltRef },
  );

  return (
    <g ref={beltRef}>
      <defs>
        {/* Diagonal hatch pattern for belt texture */}
        <pattern id="belt-hatch-pat" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <rect width="40" height="20" fill="#C88A00" />
          <line x1="0" y1="0" x2="20" y2="20" stroke="#E8A000" strokeWidth="6" />
          <line x1="20" y1="0" x2="40" y2="20" stroke="#E8A000" strokeWidth="6" />
        </pattern>
        <clipPath id="belt-clip">
          <rect x="20" y="10" width="460" height="38" rx="0" />
        </clipPath>
      </defs>

      {/* Belt surface */}
      <rect x="20" y="10" width="460" height="38" rx="4" fill="#C88A00" />
      {/* Scrolling hatch */}
      <g className="belt-hatch" clipPath="url(#belt-clip)">
        <rect x="-40" y="10" width="560" height="38" fill="url(#belt-hatch-pat)" />
      </g>
      {/* Belt edge highlights */}
      <rect x="20" y="10" width="460" height="4" rx="2" fill="#E8A000" opacity="0.5" />
      <rect x="20" y="44" width="460" height="4" rx="2" fill="#8A5E00" opacity="0.5" />
      {/* Belt outline */}
      <rect x="20" y="10" width="460" height="38" rx="4" fill="none" stroke="#8A5E00" strokeWidth="2" />

      {/* Left roller */}
      <ellipse cx="20" cy="29" rx="10" ry="18" fill="#FFD05A" stroke="#C88A00" strokeWidth="2" />
      <ellipse cx="20" cy="29" rx="5" ry="10" fill="#FFB81C" />
      {/* Right roller */}
      <ellipse cx="480" cy="29" rx="10" ry="18" fill="#FFD05A" stroke="#C88A00" strokeWidth="2" />
      <ellipse cx="480" cy="29" rx="5" ry="10" fill="#FFB81C" />

      {/* Support legs */}
      <rect x="80" y="48" width="8" height="20" rx="3" fill="#E8A000" stroke="#C88A00" strokeWidth="1.5" />
      <rect x="410" y="48" width="8" height="20" rx="3" fill="#E8A000" stroke="#C88A00" strokeWidth="1.5" />
      {/* Foot braces */}
      <rect x="72" y="65" width="24" height="5" rx="2.5" fill="#C88A00" />
      <rect x="402" y="65" width="24" height="5" rx="2.5" fill="#C88A00" />
    </g>
  );
}
