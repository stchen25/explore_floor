import type { ReactNode } from 'react';

import { ACCENT_CLASSES } from '@/components/accent';
import type { ArchetypeId } from '@/data/types';

interface PedestalProps {
  archetype: ArchetypeId;
  children: ReactNode;
}

// A soft circular plinth the robot stands on (DESIGN_SYSTEM §10.3). The accent-tinted base
// picks up the active archetype's color. Phase 2 gives it real depth + the robot's physical
// slide between pedestals; Phase 1 keeps it a calm foundation element.
export function Pedestal({ archetype, children }: PedestalProps) {
  return (
    <div className="flex flex-col items-center gap-space-1">
      {children}
      <div className={`h-space-2 w-44 rounded-full ${ACCENT_CLASSES[archetype].soft}`} />
    </div>
  );
}
