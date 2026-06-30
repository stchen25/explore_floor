import type { ReactNode } from 'react';

// The sheet is split into a sticky glass header and a scrolling body, inside the page's scroll
// container (the results <main>). The header — the visible TOP of the sheet — stays pinned a constant
// gap below the nav AT ALL TIMES; the body scrolls UP UNDER it (the blur shows the content behind, the
// effect we want). While there's more content, the body fills to the viewport bottom (its rounded
// bottom sits below the fold); only at the end does the body scroll up to reveal the rounded bottom,
// which rests with a bottom gap that matches the top (the <main>'s py) and no further. The header's
// border-b is the divider; the body carries no top border so the two read as one bordered sheet.
export function ResultsPanel({
  controlBar,
  children,
}: {
  controlBar: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between gap-space-3 rounded-t-lg border border-glass-border-soft bg-glass-panel px-space-4 backdrop-blur-bar">
        {controlBar}
      </div>
      <div className="flex flex-col gap-space-5 rounded-b-lg border border-t-0 border-glass-border-soft bg-dark-panel px-space-4 py-space-5">
        {children}
      </div>
    </>
  );
}
