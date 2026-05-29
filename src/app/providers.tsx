import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Top-level provider seam. Phase 0 has none; later phases add audio context,
 * motion config, etc. here so the mount point in main.tsx stays stable.
 */
export function Providers({ children }: ProvidersProps) {
  return <>{children}</>;
}
