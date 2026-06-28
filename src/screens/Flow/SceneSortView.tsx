import { useState } from 'react';

import { Button } from '@/components';
import { SORT_BUCKETS } from '@/data/flows/buckets';
import type { SceneStep } from '@/data/types';
import { useSessionStore } from '@/state';

import { BucketSort } from './BucketSort';

interface SceneSortViewProps {
  step: SceneStep;
  /** 1-based position among the flow's scenes, for the "Scene N of M" cue. */
  sceneNumber: number;
  sceneTotal: number;
  reduce: boolean;
  /** Fired when all three choices are bucketed — advance to the next step (or finish). */
  onDone: () => void;
}

// A narrative scene as a sort (D-018), re-skinned dark for step 8 (D-029 Phase B): the mockup's
// two-beat. First a glass scene-context card (the scenario + the ask) with a gold Continue;
// pressing it reveals the per-choice rating cards (one at a time, sorted into the three buckets).
// The context card stays put through the rating so the scenario is always in view. Choice buckets
// reuse the shared statementBuckets store slice (keyed by choice id), so scoring reads them
// exactly like statement buckets. When the last choice lands, onDone walks the flow forward.
//
// `revealed` resets per scene because the runner keys the step card by id, remounting this view.
export function SceneSortView({
  step,
  sceneNumber,
  sceneTotal,
  reduce,
  onDone,
}: SceneSortViewProps) {
  const [revealed, setRevealed] = useState(false);
  const statementBuckets = useSessionStore((s) => s.state.statementBuckets);
  const recordStatement = useSessionStore((s) => s.recordStatement);

  return (
    <div className="flex w-full flex-col gap-space-5">
      <div className="flex flex-col gap-space-3 rounded-lg border border-glass-border bg-glass-fill p-space-5">
        <p className="text-small text-text-on-dark-faint" data-testid="scene-progress">
          Scene {sceneNumber} of {sceneTotal}
        </p>
        <div className="border-t border-glass-border-soft" />
        <p className="text-body text-text-on-dark-muted">{step.prompt}</p>
        <h2 className="font-heading text-h3 text-text-on-dark">{step.question}</h2>
      </div>

      {revealed ? (
        <BucketSort
          items={step.choices}
          buckets={SORT_BUCKETS}
          reduce={reduce}
          bucketOf={(id) => statementBuckets[id]}
          onBucket={recordStatement}
          onComplete={onDone}
          cardTestId="scene-card"
        />
      ) : (
        <div className="flex justify-center">
          <Button data-testid="scene-continue" onClick={() => setRevealed(true)}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
