import type { StatementSortStep } from '@/data/types';
import { useSessionStore } from '@/state';

import { BucketSort } from './BucketSort';

interface StatementSortViewProps {
  step: StatementSortStep;
  reduce: boolean;
  onComplete: () => void;
}

// The exam flow's statement sort: one statement at a time into the three buckets
// ("That's me" / "Kinda me" / "Not me" — labels live in the step data, shared with the
// narrative scenes per D-018). A thin wrapper over BucketSort, reading the shared
// statementBuckets slice; 'maybe' scores MAYBE_WEIGHT (0 today) at scoring time, while
// the UI records the bucket honestly either way.
export function StatementSortView({ step, reduce, onComplete }: StatementSortViewProps) {
  const statementBuckets = useSessionStore((s) => s.state.statementBuckets);
  const recordStatement = useSessionStore((s) => s.recordStatement);

  return (
    <BucketSort
      items={step.statements}
      buckets={step.buckets}
      reduce={reduce}
      bucketOf={(id) => statementBuckets[id]}
      onBucket={recordStatement}
      onComplete={onComplete}
      cardTestId="statement-card"
      progressTestId="flow-progress"
    />
  );
}
