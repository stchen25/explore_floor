import { motion, useReducedMotion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { durations, durationsMs, easings } from '@/lib';
import { RobotPlaceholder } from '@/scene/RobotPlaceholder';
import { useSessionStore } from '@/state';

// Phase 1 build beat: a brief "building your match" moment showing the finished placeholder robot
// (ROADMAP §2.3). The cinematic GSAP build sequence — the arm snapping the last part in — is
// Phase 2; here it's a short Motion reveal, then auto-advance to results.
const BEAT_MS = durationsMs.reveal + durationsMs.glide; // ~1.4s

export function Build() {
  const navigate = useNavigate();
  const reduce = !!useReducedMotion();
  const scoreResult = useSessionStore((s) => s.state.scoreResult);

  useEffect(() => {
    // Reached without a finished sort (e.g. a refresh on /build) → start over.
    if (!scoreResult) {
      navigate('/', { replace: true });
      return;
    }
    const timer = setTimeout(() => navigate('/results'), BEAT_MS);
    return () => clearTimeout(timer);
  }, [scoreResult, navigate]);

  if (!scoreResult) return null;

  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-space-4 p-space-6 text-center">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: durations.pour, ease: easings.soft }}
      >
        <RobotPlaceholder archetype={scoreResult.primaryArchetype} size={144} />
      </motion.div>
      <h2 className="font-heading text-h3 text-text-strong">Building your match…</h2>
      <p className="text-body text-text-muted">Snapping your pieces into place.</p>
    </main>
  );
}
