import { AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { DragSortCard, DropZone, ProgressBar } from '@/components';
import type { BucketDef, BucketId } from '@/data/types';

export interface BucketSortItem {
  id: string;
  label: string;
}

interface BucketSortProps {
  /** Items to sort, in presentation order. The first un-bucketed item is the active card. */
  items: BucketSortItem[];
  /** The drop targets, left to right (SORT_BUCKETS today). */
  buckets: BucketDef[];
  reduce: boolean;
  /** Which bucket an item already sits in (read from the caller's store slice). */
  bucketOf: (id: string) => BucketId | undefined;
  /** Record one item's bucket. */
  onBucket: (id: string, bucket: BucketId) => void;
  /** Fired once, when the last item is bucketed — the caller decides what "done" means
   *  (the exam completes the flow; a narrative scene advances to the next step). */
  onComplete: () => void;
  cardTestId?: string;
  progressTestId?: string;
}

// The one-card-at-a-time, drag-or-tap-into-buckets sort, shared by the exam statement
// sort and each narrative scene (D-018). Same proven mechanic — drag the card onto a
// bucket or tap one — generic over the items and over what the buckets mean. The caller
// owns the bucket map (bucketOf/onBucket) and the completion action (onComplete), so this
// component stays presentational and identical across both flows.
export function BucketSort({
  items,
  buckets,
  reduce,
  bucketOf,
  onBucket,
  onComplete,
  cardTestId = 'sort-card',
  progressTestId = 'flow-progress',
}: BucketSortProps) {
  const remaining = items.filter((item) => !bucketOf(item.id));
  const current = remaining[0];
  const sortedCount = items.length - remaining.length;
  const allSorted = remaining.length === 0;

  const [activeBucket, setActiveBucket] = useState<BucketId | null>(null);
  const bucketRefs = useRef<Partial<Record<BucketId, HTMLButtonElement | null>>>({});
  const completed = useRef(false);

  function resolveDrop(clientX: number, clientY: number): BucketId | null {
    for (const bucket of buckets) {
      const rect = bucketRefs.current[bucket.id]?.getBoundingClientRect();
      if (
        rect &&
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        return bucket.id;
      }
    }
    return null;
  }

  function choose(bucket: BucketId) {
    if (!current) return;
    setActiveBucket(null);
    onBucket(current.id, bucket);
  }

  // The last bucketed item hands control back to the caller (advance or complete).
  useEffect(() => {
    if (allSorted && !completed.current) {
      completed.current = true;
      onComplete();
    }
  }, [allSorted, onComplete]);

  return (
    <div className="flex w-full flex-col items-center gap-space-5">
      <div className="w-full max-w-md">
        <ProgressBar value={sortedCount} total={items.length} testId={progressTestId} />
      </div>

      <div className="relative flex h-52 w-80 shrink-0 items-center justify-center">
        <AnimatePresence mode="popLayout">
          {current && (
            <DragSortCard<BucketId>
              key={current.id}
              label={current.label}
              reduce={reduce}
              testId={cardTestId}
              resolveDrop={resolveDrop}
              onHover={setActiveBucket}
              onCommit={choose}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-space-4">
        {buckets.map((bucket) => (
          <DropZone<BucketId>
            key={bucket.id}
            ref={(el) => {
              bucketRefs.current[bucket.id] = el;
            }}
            id={bucket.id}
            label={bucket.label}
            active={activeBucket === bucket.id}
            onChoose={choose}
            testId={`bucket-${bucket.id}`}
          />
        ))}
      </div>
      <p className="text-small text-text-faint">Drag the card onto a bucket — or tap one.</p>
    </div>
  );
}
