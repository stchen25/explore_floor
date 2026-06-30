import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import type { BucketDef, BucketId } from '@/data/types';
import { durations, durationsMs, easings } from '@/lib';

export interface BucketSortItem {
  id: string;
  label: string;
}

interface BucketSortProps {
  /** Items to sort, in presentation order. */
  items: BucketSortItem[];
  /** Which item is active (the scene's choiceIndex, owned by the store). */
  currentIndex: number;
  /** The rating rows, top to bottom (SORT_BUCKETS today). */
  buckets: BucketDef[];
  reduce: boolean;
  /** Which bucket an item already sits in (read from the caller's store slice) — pre-lights the
   *  prior pick when a user steps Back into a choice they already rated. */
  bucketOf: (id: string) => BucketId | undefined;
  /** Record one item's bucket and advance the scene cursor (store-owned). */
  onRate: (id: string, bucket: BucketId) => void;
  cardTestId?: string;
  progressTestId?: string;
}

interface ChoiceCardProps {
  item: BucketSortItem;
  buckets: BucketDef[];
  reduce: boolean;
  /** Bucket this choice already sits in (pre-lit on a Back revisit), or undefined when fresh. */
  initialBucket?: BucketId;
  onRate: (bucket: BucketId) => void;
  cardTestId: string;
  variants: Variants;
}

// One choice as its own card: the prompt (mirroring the intro question card) over three standalone
// gold rating rows. Remounts per choice (keyed by id in the parent's AnimatePresence), so its lit +
// acted state is naturally per-choice. AnimatePresence keeps it mounted while it slides out, so the
// just-picked row stays lit through the exit (the "stays lit to show state" convention). `acted`
// disables the rows the instant one is picked, so a stray tap can't land on the still-sliding card.
function ChoiceCard({
  item,
  buckets,
  reduce,
  initialBucket,
  onRate,
  cardTestId,
  variants,
}: ChoiceCardProps) {
  const [picked, setPicked] = useState<BucketId | null>(initialBucket ?? null);
  const [acted, setActed] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(() => () => clearTimeout(timer.current ?? undefined), []);

  const choose = (bucket: BucketId) => {
    if (acted) return;
    setActed(true);
    setPicked(bucket); // light it now; it holds through the exit slide
    if (reduce) {
      onRate(bucket);
      return;
    }
    timer.current = window.setTimeout(() => onRate(bucket), durationsMs.snap);
  };

  return (
    <motion.div
      data-testid={cardTestId}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-space-4"
    >
      {/* The specific choice as its own block, mirroring the intro question card. */}
      <div className="rounded-lg border border-glass-border bg-glass-fill p-space-5">
        <p className="font-heading text-h4 text-text-on-dark">{item.label}</p>
      </div>

      {/* Standalone rating rows below it (same treatment as the intro answer rows). */}
      <div className="flex flex-col gap-space-2">
        {buckets.map((bucket) => {
          const isLit = picked === bucket.id;
          return (
            <button
              key={bucket.id}
              type="button"
              data-testid={`bucket-${bucket.id}`}
              disabled={acted}
              onClick={() => choose(bucket.id)}
              className={`w-full rounded-md border px-space-4 py-space-3 text-left font-body text-body transition-colors disabled:pointer-events-none ${
                isLit
                  ? 'border-arm-gold bg-arm-gold text-near-black'
                  : 'border-glass-border bg-glass-fill text-text-on-dark hover:border-arm-gold hover:bg-arm-gold hover:text-near-black'
              }`}
            >
              {bucket.label}
            </button>
          );
        })}
      </div>

      <p className="text-small text-text-on-dark-faint">
        Select the response that fits. Your pick advances to the next choice.
      </p>
    </motion.div>
  );
}

// The one-card-at-a-time choice rater, re-skinned dark for step 8 (D-029 Phase B). The active choice
// (the scene's store-owned choiceIndex) slides in from the right; rating it slides it out left as the
// next slides in. Stepping Back into a rated choice pre-lights it via `bucketOf`, re-pickable.
// Click-only — the drag path (DragSortCard / DropZone) is left dormant by design (D-029 rule 4).
export function BucketSort({
  items,
  currentIndex,
  buckets,
  reduce,
  bucketOf,
  onRate,
  cardTestId = 'sort-card',
  progressTestId = 'choice-progress',
}: BucketSortProps) {
  const current = items[currentIndex];

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
        Choice {Math.min(currentIndex + 1, items.length)} of {items.length}
      </p>

      {/* overflow-hidden clips the choice card's horizontal slide (in +130 / out -90) to this
          column. Known tradeoff (D-029 Phase B): it also clips the LEFT/RIGHT edges of the gold
          focus ring on the rating rows inside (top/bottom stay visible, so focus is still legible).
          Resolve in Phase G (responsive/a11y) — e.g. clip only during the transition, or pad the
          inner track — rather than dropping the clip (which would let the exiting card bleed). */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {current && (
            <ChoiceCard
              key={current.id}
              item={current}
              buckets={buckets}
              reduce={reduce}
              initialBucket={bucketOf(current.id)}
              onRate={(bucket) => onRate(current.id, bucket)}
              cardTestId={cardTestId}
              variants={variants}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
