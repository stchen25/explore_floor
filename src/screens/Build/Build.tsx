import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { durations, durationsMs } from '@/lib';
import { gsap, useGSAP } from '@/lib/gsap';
import { Robot } from '@/scene/robot/Robot';
import { useSessionStore } from '@/state';

// Phase 2 build beat: a short cinematic moment before results. GSAP orchestrates:
// 1. Robot scales in from slightly below (entrance).
// 2. A glow ring pulses once (ta-da moment).
// 3. The robot does a small vertical bounce (idle).
// 4. Auto-advances to /results after the beat completes.
const BEAT_MS = durationsMs.reveal + durationsMs.pour + 600; // ~2.1 s

export function Build() {
  const navigate = useNavigate();
  const reduce = !!useReducedMotion();
  const robot = useSessionStore((s) => s.state.robot);
  const scoreResult = useSessionStore((s) => s.state.scoreResult);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scoreResult) {
      navigate('/', { replace: true });
      return;
    }
    const timer = setTimeout(() => navigate('/results'), BEAT_MS);
    return () => clearTimeout(timer);
  }, [scoreResult, navigate]);

  useGSAP(
    () => {
      if (!scoreResult || reduce) return;
      const tl = gsap.timeline();
      // 1. Entrance: robot rises in
      tl.from('.robot-build-figure', {
        y: 20,
        opacity: 0,
        scale: 0.85,
        duration: durations.pour,
        ease: 'back.out(1.4)',
      });
      // 2. Glow pulse
      tl.fromTo(
        '.build-glow',
        { scale: 0.6, opacity: 0 },
        { scale: 1.3, opacity: 0.55, duration: durations.glide * 0.7, ease: 'power2.out' },
        '-=0.1',
      ).to('.build-glow', {
        scale: 1,
        opacity: 0,
        duration: durations.glide * 0.5,
        ease: 'power2.in',
      });
      // 3. Idle bounce
      tl.to('.robot-build-figure', {
        y: -6,
        duration: 0.25,
        ease: 'power1.out',
        yoyo: true,
        repeat: 1,
      });
    },
    { scope: containerRef, dependencies: [scoreResult, reduce] },
  );

  if (!scoreResult) return null;

  const archetype = scoreResult.primaryArchetype;

  // Pick glow color from archetype token
  const glowColor =
    archetype === 'builder' ? '#F56A00' : archetype === 'innovator' ? '#38A5EE' : '#117289';

  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-space-4 p-space-6 text-center">
      <div ref={containerRef} className="relative flex flex-col items-center gap-space-4">
        {/* Glow ring (GSAP animates this) */}
        <svg
          className="build-glow pointer-events-none absolute"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          aria-hidden="true"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0 }}
        >
          <circle cx="100" cy="100" r="90" fill={glowColor} opacity="0.3" />
          <circle cx="100" cy="100" r="70" fill={glowColor} opacity="0.2" />
          <circle cx="100" cy="100" r="50" fill={glowColor} opacity="0.15" />
        </svg>

        {/* Robot figure */}
        <div className="robot-build-figure">
          <Robot robotState={robot} archetype={archetype} size={160} />
        </div>
      </div>

      <h2 className="font-heading text-h3 text-text-strong">Built for you.</h2>
      <p className="text-body text-text-muted">Snapping your last pieces into place.</p>
    </main>
  );
}
