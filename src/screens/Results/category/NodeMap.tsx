import { AnimatePresence, motion } from 'motion/react';

import { ROLE_ACCENT } from '@/components/categoryAccent';
import { roleDetails } from '@/data';
import type { CategoryId, CategoryResult } from '@/data/types';
import { durations, easings, fanPoints, type Point } from '@/lib';

interface NodeMapProps {
  result: CategoryResult;
  /** The centered/front category — its job titles branch off; the other three sit behind. */
  activeCategory: CategoryId;
  /** Swap a behind-node into the center. */
  onSelectCategory: (category: CategoryId) => void;
  onOpenTitle: (category: CategoryId, title: string) => void;
  reduce: boolean;
}

// The category map, rebuilt as a simple node graph (D-017 redesign — the concentric orbital
// rings read as "funky"). The top-matched category sits front and center; the other three sit
// behind it (arced above, faded). Tapping a behind-node swaps it into the center (Motion
// `layout` animates the move). The active category's recommended job titles branch off the
// front (arced below) on thin connector lines; tapping one opens the role sheet. Obsidian-graph
// plain: small nodes, hairline links, a restrained category tint on the active node. Circles are
// anchored exactly on their geometry points; labels float above/below so they never shift the
// node (and the connector lines always meet the dots).

const VIEW = 900;
const CENTER: Point = { x: VIEW / 2, y: VIEW / 2 };
const ALT_DISTANCE = 275;
const ALT_SPREAD = 115; // tight upper arc, clear of the downward title cone
const TITLE_DISTANCE = 310;

const pct = (value: number) => `${(value / VIEW) * 100}%`;

export function NodeMap({
  result,
  activeCategory,
  onSelectCategory,
  onOpenTitle,
  reduce,
}: NodeMapProps) {
  const others = result.ranking.filter((category) => category !== activeCategory);
  const altPositions = fanPoints(CENTER, -90, others.length, ALT_DISTANCE, ALT_SPREAD);

  const titles = roleDetails[activeCategory].commonJobTitles;
  const titleSpread = Math.min(160, Math.max(70, (titles.length - 1) * 38));
  const titlePositions = fanPoints(CENTER, 90, titles.length, TITLE_DISTANCE, titleSpread);

  // Stable slot per category so Motion `layout` animates the swap rather than cross-fading.
  const positionFor = (category: CategoryId): Point =>
    category === activeCategory ? CENTER : altPositions[others.indexOf(category)];

  const transition = reduce ? { duration: 0 } : { duration: durations.glide, ease: easings.soft };

  return (
    <div className="relative aspect-square w-full overflow-visible" data-testid="node-map">
      <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.g
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : durations.snap }}
          >
            {titlePositions.map((point, i) => (
              <line
                key={titles[i]}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={point.x}
                y2={point.y}
                className="stroke-border-default"
                strokeWidth={2}
              />
            ))}
          </motion.g>
        </AnimatePresence>
      </svg>

      {/* Category nodes — active front-and-center, the rest behind. `layout` animates swaps. */}
      {result.ranking.map((category) => {
        const position = positionFor(category);
        const active = category === activeCategory;
        return (
          <motion.button
            key={category}
            type="button"
            layout
            transition={transition}
            data-testid={`category-node-${category}`}
            aria-pressed={active}
            aria-label={`${roleDetails[category].roleName} ${result.matchPercentages[category]}%`}
            onClick={() => !active && onSelectCategory(category)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: pct(position.x), top: pct(position.y), zIndex: active ? 3 : 2 }}
          >
            {active ? (
              // The active node carries only its % (named in the page heading) — no external
              // label to collide with the behind-nodes arced just above it.
              <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-near-black bg-bg-section shadow-card">
                <span
                  className={`font-heading text-h4 ${ROLE_ACCENT[category].text}`}
                  data-testid={`category-pct-${category}`}
                >
                  {result.matchPercentages[category]}%
                </span>
              </span>
            ) : (
              <>
                <span className="block h-16 w-16 rounded-full border-2 border-border-default bg-bg opacity-70 shadow-card transition-opacity hover:opacity-100" />
                <span className="absolute left-1/2 top-full mt-space-1 flex w-28 -translate-x-1/2 flex-col items-center leading-tight">
                  <span className="font-heading text-small text-text-muted">
                    {roleDetails[category].roleName}
                  </span>
                  <span className="text-small text-text-faint" data-testid={`category-pct-${category}`}>
                    {result.matchPercentages[category]}%
                  </span>
                </span>
              </>
            )}
          </motion.button>
        );
      })}

      {/* Job-title nodes — branch off the front of the active category. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : durations.snap }}
        >
          {titlePositions.map((point, i) => (
            <motion.button
              key={titles[i]}
              type="button"
              data-testid="title-node"
              onClick={() => onOpenTitle(activeCategory, titles[i])}
              initial={reduce ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: durations.snap, ease: easings.soft, delay: reduce ? 0 : i * 0.04 }}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(point.x), top: pct(point.y), zIndex: 1 }}
            >
              {/* A real button-sized target (≥48px), not a dot — obvious it's tappable. */}
              <span className="block h-14 w-14 rounded-full border-2 border-border-default bg-bg shadow-card transition-colors group-hover:bg-bg-section" />
              <span className="absolute left-1/2 top-full mt-space-1 flex w-28 -translate-x-1/2 justify-center text-center text-small leading-tight text-text-default">
                {titles[i]}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
