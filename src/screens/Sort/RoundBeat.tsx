import { motion } from 'motion/react';

import { durations, easings } from '@/lib';

interface RoundBeatProps {
  copy: string;
  reduce: boolean;
}

// A brief, non-blocking beat shown when a new round begins (ROADMAP §2.2). Copy comes from
// rounds.ts and is intentionally theme-free (PRD §5.2). Motion-owned fade; reduced-motion safe.
export function RoundBeat({ copy, reduce }: RoundBeatProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-space-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? durations.instant : durations.snap, ease: easings.soft }}
    >
      <p className="rounded-md bg-overlay px-space-5 py-space-3 text-center font-heading text-h5 text-white shadow-elev-2">
        {copy}
      </p>
    </motion.div>
  );
}
