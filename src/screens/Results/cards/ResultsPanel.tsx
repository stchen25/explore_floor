import type { ReactNode } from 'react';

// The dark results panel chrome (D-029 Phase C): a rounded-top elevated panel with a sticky glass
// control bar (sticks just below the 64px app header) and a padded content column. Tokens only.
export function ResultsPanel({
  controlBar,
  children,
}: {
  controlBar: ReactNode;
  children: ReactNode;
}) {
  // No overflow-hidden here: a clipping ancestor would disable the control bar's position:sticky.
  // The control bar carries its own rounded-top corners so they line up with the panel instead.
  return (
    <div className="rounded-t-lg border border-glass-border-soft bg-dark-panel shadow-dark-panel">
      <div className="sticky top-16 z-10 flex h-16 items-center justify-between gap-space-3 rounded-t-lg border-b border-glass-border-soft bg-glass-panel px-space-4 backdrop-blur-bar">
        {controlBar}
      </div>
      <div className="flex flex-col gap-space-5 px-space-4 py-space-5">{children}</div>
    </div>
  );
}
