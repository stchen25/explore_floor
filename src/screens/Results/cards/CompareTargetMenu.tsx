import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { ROLE_ACCENT } from '@/components/categoryAccent';
import { Icon } from '@/components/Icon';
import type { CategoryId } from '@/data/types';
import { durations, easings } from '@/lib';

// The compare-screen "Compare with {role}" dropdown (D-029 Phase D). Lists the two roles other
// than the current (left) one, each with its accent dot, name, match %, and a check on the active
// target. Picking one switches the right column. Closes on select, outside-click, or Escape.
// Motion-owned (AnimatePresence), tokenized, reduced-motion-aware.

export interface CompareTargetOption {
  /** Index into the ranking (what setCompareWith expects). */
  index: number;
  category: CategoryId;
  name: string;
  pct: number;
  current: boolean;
}

interface CompareTargetMenuProps {
  label: string; // "Compare with"
  targetName: string;
  targetCategory: CategoryId;
  options: CompareTargetOption[];
  onSelect: (index: number) => void;
  reduce: boolean;
}

export function CompareTargetMenu({
  label,
  targetName,
  targetCategory,
  options,
  onSelect,
  reduce,
}: CompareTargetMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const menuMotion = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: -6 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -6 },
    transition: { duration: reduce ? 0 : durations.snap, ease: easings.soft },
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        data-testid="compare-target-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-control-lg items-center gap-space-2 rounded-md border border-glass-border bg-glass-fill-strong px-space-3 transition-colors hover:bg-glass-fill"
      >
        <span className="font-body text-small text-text-on-dark-faint">{label}</span>
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${ROLE_ACCENT[targetCategory].bg}`} />
        <span className="font-heading text-body font-bold text-text-on-dark">{targetName}</span>
        <Icon name="chevron-d" size={20} className="text-text-on-dark-faint" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            {...menuMotion}
            role="menu"
            data-testid="compare-target-menu"
            className="absolute right-0 top-full z-30 mt-space-1 min-w-52 rounded-md border border-glass-border bg-dark-surface p-space-0 shadow-dark-card"
          >
            {options.map((opt) => (
              <button
                key={opt.category}
                type="button"
                role="menuitemradio"
                aria-checked={opt.current}
                data-testid={`compare-target-${opt.category}`}
                onClick={() => {
                  onSelect(opt.index);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-space-2 rounded-sm px-space-2 py-space-1 text-left font-heading text-body font-bold transition-colors ${
                  opt.current
                    ? 'bg-glass-fill-strong text-text-on-dark'
                    : 'text-text-on-dark hover:bg-glass-fill'
                }`}
              >
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${ROLE_ACCENT[opt.category].bg}`} />
                <span className="flex-1">{opt.name}</span>
                <span className="font-body text-small text-text-on-dark-faint tabular-nums">
                  {opt.pct}%
                </span>
                {opt.current && (
                  <Icon name="check" size={17} className={ROLE_ACCENT[opt.category].textSoft} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
