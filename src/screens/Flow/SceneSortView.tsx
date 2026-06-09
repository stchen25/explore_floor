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
  /** Fired when all four choices are bucketed — advance to the next step (or finish). */
  onDone: () => void;
}

// A narrative scene as a sort (D-018): the story setup and the ask, then the scene's
// four choices sorted one card at a time into That's me / Kinda me / Not me — the exam's
// mechanic, scoped to one scene and wrapped in story framing. Choice buckets reuse the
// shared statementBuckets store slice (keyed by choice id), so scoring reads them exactly
// like statement buckets. When the fourth choice lands, onDone walks the flow forward.
export function SceneSortView({
  step,
  sceneNumber,
  sceneTotal,
  reduce,
  onDone,
}: SceneSortViewProps) {
  const statementBuckets = useSessionStore((s) => s.state.statementBuckets);
  const recordStatement = useSessionStore((s) => s.recordStatement);

  return (
    <div className="flex w-full flex-col items-center gap-space-5 text-center">
      <div className="flex max-w-md flex-col gap-space-2">
        <p className="text-small uppercase tracking-wide text-text-faint">
          Scene {sceneNumber} of {sceneTotal}
        </p>
        <p className="text-body text-text-muted">{step.prompt}</p>
        <h2 className="font-heading text-h3 text-text-strong">{step.question}</h2>
      </div>

      <BucketSort
        items={step.choices}
        buckets={SORT_BUCKETS}
        reduce={reduce}
        bucketOf={(id) => statementBuckets[id]}
        onBucket={recordStatement}
        onComplete={onDone}
        cardTestId="scene-card"
        progressTestId="scene-progress"
      />
    </div>
  );
}
