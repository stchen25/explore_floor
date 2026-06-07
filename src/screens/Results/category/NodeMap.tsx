import { AnimatePresence, motion } from 'motion/react';

import { roleDetails } from '@/data';
import type { CategoryId, CategoryResult } from '@/data/types';
import { CATEGORIES } from '@/data/types';
import { CATEGORY_ANGLES, durations, easings, polarPoint, ringRadius } from '@/lib';

interface NodeMapProps {
  result: CategoryResult;
  centerLabel: string;
  selectedCategory: CategoryId | null;
  onSelectCategory: (category: CategoryId | null) => void;
  onOpenTitle: (category: CategoryId, title: string) => void;
  reduce: boolean;
}

// Layer 1 of the category results (the team's results wireframe 1): four concentric
// rings; each category node sits on the ring of its match rank — innermost is the
// best match. Clicking a category reveals its common job titles in a tray below the
// map; clicking a title opens the role sheet (Layer 2). The wireframe scatters title
// nodes around the category on the canvas — with 3-5 wide titles per category that
// collides on the outer rings, so the tray keeps the study build legible; revisit
// the scatter with the team in a polish pass. Geometry is pure (lib/nodeLayout); the
// SVG only draws rings — nodes and title pills are positioned HTML buttons, so text
// wraps and keyboards work. Neutral styling by design: the study presentation stays
// minimal.

const VIEW = 900; // SVG viewBox units
const CENTER = VIEW / 2;
const RING_INNER = 130;
const RING_GAP = 62;

/** SVG-space point → percentage offsets for absolutely-positioned HTML. */
const toPercent = (value: number) => `${((CENTER + value) / VIEW) * 100}%`;

export function NodeMap({
  result,
  centerLabel,
  selectedCategory,
  onSelectCategory,
  onOpenTitle,
  reduce,
}: NodeMapProps) {
  const nodePosition = (category: CategoryId) => {
    const rank = result.ranking.indexOf(category);
    return polarPoint(ringRadius(rank, RING_INNER, RING_GAP), CATEGORY_ANGLES[category]);
  };

  return (
    <div className="flex w-full flex-col items-center gap-space-3">
      <div className="relative aspect-square w-full" data-testid="node-map">
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((rank) => (
            <circle
              key={rank}
              cx={CENTER}
              cy={CENTER}
              r={ringRadius(rank, RING_INNER, RING_GAP)}
              className="fill-none stroke-border-default"
              strokeWidth={2}
            />
          ))}
        </svg>

        <p className="absolute left-1/2 top-1/2 w-28 -translate-x-1/2 -translate-y-1/2 text-center text-overline uppercase text-text-faint">
          {centerLabel}
        </p>

        {CATEGORIES.map((category) => {
          const position = nodePosition(category);
          const active = category === selectedCategory;
          return (
            <button
              key={category}
              type="button"
              data-testid={`category-node-${category}`}
              onClick={() => onSelectCategory(active ? null : category)}
              className={[
                'absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 text-center shadow-card transition-colors',
                active
                  ? 'border-near-black bg-bg-section text-text-strong'
                  : 'border-border-default bg-bg text-text-default hover:bg-bg-section',
              ].join(' ')}
              style={{ left: toPercent(position.x), top: toPercent(position.y) }}
            >
              <span className="font-heading text-small font-bold">
                {roleDetails[category].roleName}
              </span>
              <span className="text-small text-text-muted" data-testid={`category-pct-${category}`}>
                {result.matchPercentages[category]}%
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={selectedCategory}
            className="flex flex-col items-center gap-space-2"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.snap, ease: easings.soft }}
            data-testid="title-tray"
          >
            <p className="text-overline uppercase text-text-faint">
              {roleDetails[selectedCategory].roleName} job titles
            </p>
            <div className="flex max-w-md flex-wrap items-center justify-center gap-space-2">
              {roleDetails[selectedCategory].commonJobTitles.map((title, index) => (
                <motion.button
                  key={title}
                  type="button"
                  data-testid="title-node"
                  onClick={() => onOpenTitle(selectedCategory, title)}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  transition={{
                    duration: durations.snap,
                    ease: easings.soft,
                    delay: reduce ? 0 : index * 0.05,
                  }}
                  className="rounded-full border border-border-default bg-bg px-space-3 py-space-1 text-small text-text-default shadow-card transition-colors hover:bg-bg-section"
                >
                  {title}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
