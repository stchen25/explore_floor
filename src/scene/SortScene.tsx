import type { ReactNode } from 'react';

import type { RobotState } from '@/data/types';
import { useSessionStore } from '@/state';

import { ConveyorBelt } from './ConveyorBelt';
import { Robot } from './robot/Robot';

interface SortSceneProps {
  /** The current item card + bins slot in here, positioned over the belt. */
  children: ReactNode;
}

// SortScene — the Phase 2 factory floor: warm background, animated belt, robot that builds
// live as the user sorts. The interactive card and bins render as children positioned over the
// belt area. GSAP owns belt animation; Motion owns the card drag gesture (different nodes).
export function SortScene({ children }: SortSceneProps) {
  const robot = useSessionStore((s) => s.state.robot);
  const scoreResult = useSessionStore((s) => s.state.scoreResult);
  const archetype = scoreResult?.primaryArchetype ?? null;

  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Factory floor background */}
      <div
        className="absolute inset-0 rounded-md"
        style={{ background: 'linear-gradient(180deg, var(--color-scene-paper) 0%, var(--color-scene-paper-warm) 100%)' }}
        aria-hidden="true"
      />

      {/* Factory ceiling detail */}
      <div aria-hidden="true" className="relative z-10 flex w-full justify-between px-4 pt-2">
        <FactoryDetail />
      </div>

      {/* Robot preview — builds live during sorting */}
      <div
        className="relative z-10 mt-2 flex justify-center"
        aria-hidden="true"
        style={{ minHeight: 100 }}
      >
        <RobotInProgress robot={robot} archetype={archetype} />
      </div>

      {/* Belt + interactive zone */}
      <div className="relative z-10 w-full">
        {/* Belt SVG */}
        <svg
          viewBox="0 0 500 90"
          className="h-auto w-full"
          aria-hidden="true"
          style={{ marginBottom: -8 }}
        >
          <ConveyorBelt />
        </svg>

        {/* Card + bins layered over the belt */}
        <div className="relative -mt-8 pb-2">{children}</div>
      </div>

      {/* Factory floor tiles */}
      <div aria-hidden="true" className="relative z-0 h-6 w-full" style={{ background: 'repeating-linear-gradient(90deg, var(--color-scene-paper-warm) 0px, var(--color-scene-paper-warm) 39px, var(--color-scene-shadow) 39px, var(--color-scene-shadow) 40px)' }} />
    </div>
  );
}

// Partially built robot during sorting — smaller, no pedestal, fades in.
function RobotInProgress({ robot, archetype }: { robot: RobotState | null; archetype: Parameters<typeof Robot>[0]['archetype'] }) {
  return (
    <Robot
      robotState={robot}
      archetype={archetype}
      size={88}
    />
  );
}

// Simple factory ceiling pipe / vent detail for atmosphere.
function FactoryDetail() {
  return (
    <svg viewBox="0 0 500 28" className="h-7 w-full" aria-hidden="true">
      {/* Ceiling track */}
      <rect x="0" y="8" width="500" height="6" rx="3" fill="#C88A00" opacity="0.35" />
      {/* Hanging arm mounts */}
      {[60, 180, 320, 440].map((x) => (
        <g key={x}>
          <rect x={x - 4} y="6" width="8" height="14" rx="3" fill="#E8A000" opacity="0.5" />
          <circle cx={x} cy="22" r="4" fill="#C88A00" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
