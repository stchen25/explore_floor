import { motion, type PanInfo, type Variants } from 'motion/react';
import { forwardRef } from 'react';

import type { InterestItem } from '@/data/types';
import { durations, easings } from '@/lib';

interface SortCardProps {
  item: InterestItem;
  reduce: boolean;
  /** Fired continuously while dragging — offsetX lets the parent light the nearer bin. */
  onDragMove: (offsetX: number) => void;
  /** Fired on release — parent decides keep/pass from the swipe distance, else it snaps back. */
  onDragRelease: (offsetX: number) => void;
}

// The single interest card. Motion owns the drag-to-bin gesture (horizontal swipe: right =
// keep, left = pass) and the enter/exit. Exit is opacity/scale only — it must NOT animate `x`,
// which would fight `dragSnapToOrigin` on release and stall the swap under AnimatePresence.
const variants: Variants = {
  from: { opacity: 0, y: 16, scale: 0.98 },
  enter: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
};

// Reduced motion: plain crossfade, no transforms, no drag.
const reducedVariants: Variants = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

// forwardRef is required so AnimatePresence's popLayout can measure the card on exit.
export const SortCard = forwardRef<HTMLDivElement, SortCardProps>(function SortCard(
  { item, reduce, onDragMove, onDragRelease },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      data-testid="sort-card"
      variants={reduce ? reducedVariants : variants}
      initial="from"
      animate="enter"
      exit="exit"
      transition={{ duration: durations.glide, ease: easings.soft }}
      drag={reduce ? false : 'x'}
      dragSnapToOrigin
      dragElastic={0.4}
      whileDrag={{ scale: 1.03 }}
      onDrag={(_, info: PanInfo) => onDragMove(info.offset.x)}
      onDragEnd={(_, info: PanInfo) => onDragRelease(info.offset.x)}
      className="flex w-80 shrink-0 cursor-grab touch-none select-none flex-col items-center justify-center rounded-md border border-border-default bg-bg p-space-6 text-center shadow-card active:cursor-grabbing"
    >
      <span className="font-heading text-h4 text-text-strong">{item.label}</span>
    </motion.div>
  );
});
