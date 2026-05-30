import type { Decision } from '@/data/types';

interface SortBinProps {
  decision: Decision;
  label: string;
  /** Drag-toward highlight (the card is being swiped this way). */
  active: boolean;
  onChoose: (decision: Decision) => void;
}

// One of the two sort targets: "That's me" (keep) / "Not my thing" (pass). Archetype-neutral
// per ROADMAP §2.2 — the brand-yellow highlight is global (not a role color). Sorted by tapping
// a bin or dragging the card toward it.
export function SortBin({ decision, label, active, onChoose }: SortBinProps) {
  const highlighted = active;

  return (
    <button
      type="button"
      data-testid={decision === 'keep' ? 'sort-keep' : 'sort-pass'}
      onClick={() => onChoose(decision)}
      className={[
        'flex h-40 w-40 shrink-0 flex-col items-center justify-center rounded-md border-2 p-space-3 text-center transition-colors',
        highlighted
          ? 'border-arm-yellow bg-arm-yellow/10 text-text-strong'
          : 'border-border-default bg-bg text-text-muted hover:bg-bg-section',
      ].join(' ')}
    >
      <span className="font-heading text-h5">{label}</span>
    </button>
  );
}
