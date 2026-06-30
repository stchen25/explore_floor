import type { ReactNode } from 'react';

// A small glass pill used for the "what you chose" answer chips and the Tab-2 competency chips.
// Tokens only (D-029): glass fill, on-dark-muted text, rounded-sm.
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-space-1 whitespace-nowrap rounded-sm bg-glass-fill-strong px-space-2 py-space-1 font-body text-small text-text-on-dark-muted">
      {children}
    </span>
  );
}
