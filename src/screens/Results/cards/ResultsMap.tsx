import { Icon } from '@/components/Icon';
import type { CategoryId, CategoryWeights, ResultsMapCopy } from '@/data/types';

import { AmbientField } from './AmbientField';
import { BubbleField } from './BubbleField';

// The ambient bubble map (D-029 Phase E) — screen 5 of the mockup's results system. A full-bleed
// dark canvas: a decorative AmbientField behind, a glass "your results" intro card, and the three
// roles as match-%-sized bubbles you tap to dive into a role's cards. Full-bleed by design, so it
// renders OUTSIDE the rounded results panel (ResultsExperience relaxes the <main> for this view).

interface ResultsMapProps {
  copy: ResultsMapCopy;
  ranking: CategoryId[];
  matchPercentages: CategoryWeights;
  reduce: boolean;
  /** Dive into the role at this rank index. */
  onDive: (rank: number) => void;
  /** Return to the role cards. */
  onBack: () => void;
}

export function ResultsMap({ copy, ranking, matchPercentages, reduce, onDive, onBack }: ResultsMapProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" data-testid="results-map">
      <AmbientField reduce={reduce} />

      <div className="relative z-10 flex h-full flex-col px-space-3 py-space-4">
        <div className="flex">
          <button
            type="button"
            onClick={onBack}
            data-testid="map-back"
            className="inline-flex h-9 items-center gap-space-1 rounded-full border border-glass-border bg-glass-fill px-space-3 font-body text-body text-text-on-dark backdrop-blur-bar transition-colors hover:bg-glass-fill-strong"
          >
            <Icon name="chevron-l" size={18} />
            {copy.back}
          </button>
        </div>

        <div className="mx-auto mt-space-4 w-full max-w-map-card rounded-lg border border-glass-border bg-glass-fill-strong px-space-5 py-space-4 text-center shadow-dark-card backdrop-blur-panel">
          <h1 className="font-heading text-h3 text-text-on-dark">{copy.title}</h1>
          <div className="my-space-3 h-px bg-glass-border" />
          <p className="font-body text-body text-text-on-dark-muted">{copy.intro}</p>
          <p className="mt-space-1 font-body text-body text-text-on-dark-faint">{copy.hint}</p>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center py-space-3">
          <BubbleField
            ranking={ranking}
            matchPercentages={matchPercentages}
            reduce={reduce}
            onDive={onDive}
          />
        </div>
      </div>
    </div>
  );
}
