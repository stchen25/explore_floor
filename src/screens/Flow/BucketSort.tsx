import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';

import type { BucketDef, BucketId } from '@/data/types';
import { durations, easings } from '@/lib';

export interface BucketSortItem {
  id: string;
  label: string;
}

interface BucketSortProps {
  /** Items to sort, in presentation order. The first un-bucketed item is the active card. */
  items: BucketSortItem[];
  /** The rating rows, top to bottom (SORT_BUCKETS today). */
  buckets: BucketDef[];
  reduce: boolean;
  /** Which bucket an item already sits in (read from the caller's store slice). */
  bucketOf: (id: string) => BucketId | undefined;
  /** Record one item's bucket. */
  onBucket: (id: string, bucket: BucketId) => void;
  /** Fired once, when the last item is bucketed — the caller decides what "done" means
   *  (a narrative scene advances to the next step). */
  onComplete: () => void;
  cardTestId?: string;
  progressTestId?: string;
}

// The one-card-at-a-time choice rater, re-skinned dark for step 8 (D-029 Phase B). Each choice
// slides in from the right as a unit: its prompt as its OWN card (mirroring the intro question
// card) above three standalone gold rating rows (That's me / Kinda me / Not me, D-018) — the
// prompt is not boxed in with the rows. Tapping a row buckets the choice (gold fill, dark ink),
// the unit slides out left, and the next slides in. Generic over the items and over what the
// buckets mean, so it stays presentational; the caller owns the bucket map (bucketOf/onBucket)
// and what "done" means (onComplete). Click-only — the drag path (DragSortCard / DropZone) is
// left dormant by design (D-029 rule 4), revivable later.
export function BucketSort({
  items,
  buckets,
  reduce,
  bucketOf,
  onBucket,
  onComplete,
  cardTestId = 'sort-card',
  progressTestId = 'choice-progress',
}: BucketSortProps) {
  const remaining = items.filter((item) => !bucketOf(item.id));
  const current = remaining[0];
  const sortedCount = items.length - remaining.length;
  const allSorted = remaining.length === 0;

  // Guards a stray second tap on the card still sliding out (its rows stay hit-testable through
  // the exit) from re-bucketing an already-decided choice. Resets implicitly: the next card has a
  // different id, so the guard lets it through.
  const committedId = useRef<string | null>(null);

  function choose(bucket: BucketId) {
    if (!current || committedId.current === current.id) return;
    committedId.current = current.id;
    onBucket(current.id, bucket);
  }

  // The last bucketed item hands control back to the caller (advance or complete).
  const completed = useRef(false);
  useEffect(() => {
    if (allSorted && !completed.current) {
      completed.current = true;
      onComplete();
    }
  }, [allSorted, onComplete]);

  const reducedFade = { duration: durations.snap, ease: easings.soft };
  const variants = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: 130 },
    animate: reduce
      ? { opacity: 1, transition: reducedFade }
      : { opacity: 1, x: 0, transition: { duration: durations.glide, ease: easings.soft } },
    exit: reduce
      ? { opacity: 0, transition: reducedFade }
      : { opacity: 0, x: -90, transition: { duration: durations.snap, ease: easings.soft } },
  };

  return (
    <div className="flex w-full flex-col gap-space-3">
      <p className="text-small text-text-on-dark-faint" data-testid={progressTestId}>
        {current ? `Choice ${sortedCount + 1} of ${items.length}` : `${items.length} of ${items.length}`}
      </p>

      {/* overflow-hidden clips the choice card's horizontal slide (in +130 / out -90) to this
          column. Known tradeoff (D-029 Phase B): it also clips the LEFT/RIGHT edges of the gold
          focus ring on the rating rows inside (top/bottom stay visible, so focus is still legible).
          Resolve in Phase G (responsive/a11y) — e.g. clip only during the transition, or pad the
          inner track — rather than dropping the clip (which would let the exiting card bleed). */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              data-testid={cardTestId}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-space-4"
            >
              {/* The specific choice as its own block, mirroring the intro question card. */}
              <div className="rounded-lg border border-glass-border bg-glass-fill p-space-5">
                <p className="font-heading text-h4 text-text-on-dark">{current.label}</p>
              </div>

              {/* Standalone rating rows below it (same treatment as the intro answer rows). */}
              <div className="flex flex-col gap-space-2">
                {buckets.map((bucket) => (
                  <button
                    key={bucket.id}
                    type="button"
                    data-testid={`bucket-${bucket.id}`}
                    onClick={() => choose(bucket.id)}
                    className="w-full rounded-md border border-glass-border bg-glass-fill px-space-4 py-space-3 text-left font-body text-body text-text-on-dark transition-colors hover:border-arm-gold hover:bg-arm-gold hover:text-near-black"
                  >
                    {bucket.label}
                  </button>
                ))}
              </div>

              <p className="text-small text-text-on-dark-faint">
                Select the response that fits. Your pick advances to the next choice.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
