import { motion } from 'motion/react';
import type { CSSProperties } from 'react';

import type { RoleAccent } from '@/components/categoryAccent';
import { Icon } from '@/components/Icon';
import type { Job } from '@/data/types';
import { durations, easings } from '@/lib';

// One job node on the results constellation (D-029 Phase F). A circular button (star glyph) that
// rings the role center; the label sits below it (rendered by ConstellationField, since titles run
// wider than the node). The outer wrapper owns the gentle idle float so it never fights the inner
// button's hover lift (the BubbleField two-layer pattern). Active = the open job (accent fill +
// glow); dimmed = another job is open. Reduced motion drops the float, entrance, and hover.

interface ConstellationNodeProps {
  job: Job;
  accent: RoleAccent;
  /** Layout index (drives the per-node float stagger). */
  index: number;
  active: boolean;
  dimmed: boolean;
  reduce: boolean;
  /** Absolute left/top/width from the field's view → percentage mapping. */
  style: CSSProperties;
  onClick: () => void;
}

export function ConstellationNode({
  job,
  accent,
  index,
  active,
  dimmed,
  reduce,
  style,
  onClick,
}: ConstellationNodeProps) {
  return (
    <motion.div
      className="absolute"
      style={{ ...style, aspectRatio: '1 / 1' }}
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={
        reduce
          ? { opacity: dimmed ? 0.45 : 1 }
          : { opacity: dimmed ? 0.45 : 1, scale: 1, y: [0, -10, 0] }
      }
      transition={
        reduce
          ? { duration: 0 }
          : {
              opacity: { duration: durations.glide, delay: index * 0.06, ease: easings.soft },
              scale: { duration: durations.glide, delay: index * 0.06, ease: easings.soft },
              // Per-node-varied idle float — deliberately off the UI motion scale (no token home
              // for a multi-second ambient loop, like BubbleField); the easing stays on-token.
              y: { duration: 5 + index * 0.5, delay: index * 0.3, repeat: Infinity, ease: easings.soft },
            }
      }
    >
      <motion.button
        type="button"
        data-testid={`constellation-node-${job.id}`}
        onClick={onClick}
        aria-label={job.title}
        aria-pressed={active}
        className={`grid h-full w-full place-items-center rounded-full border transition-colors ${
          active ? `${accent.bg} border-transparent` : 'border-glass-border bg-glass-fill-strong'
        }`}
        // Active node gets a role-tinted glow; the offset/blur are decorative literals (no shadow
        // token for a colored node glow), mirroring BubbleField.
        style={active ? { boxShadow: `0 0 28px ${accent.glow}` } : undefined}
        whileHover={reduce ? undefined : { y: -6, scale: 1.06 }}
        transition={{ duration: durations.snap, ease: easings.soft }}
      >
        {/* Inactive glyph uses the soft tint (not the saturated accent) so it clears the 3:1
            graphical-contrast bar on the glass node fill, e.g. teal #117289 is only 2.64:1. */}
        <Icon name="star" size={30} className={active ? accent.onAccent : accent.textSoft} />
      </motion.button>
    </motion.div>
  );
}
