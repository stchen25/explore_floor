import { motion, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { durations, easings } from '@/lib';
import { gsap, useGSAP } from '@/lib/gsap';
import { LandingSceneHint } from '@/scene/LandingSceneHint';
import { useSessionStore } from '@/state';

// Landing: the frame + CTA, with a soft hint of the assembly-line scene below it. Motion owns the
// content entrance (and the CTA); GSAP owns the scene's DrawSVG line-draw reveal — different
// nodes, so the two engines never touch the same property (scene-motion ownership rule).
export function Landing() {
  const navigate = useNavigate();
  const startSession = useSessionStore((s) => s.startSession);
  const reduce = !!useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Only draw the lines in when motion is welcome; reduced-motion users see them already drawn.
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.scene-draw', {
          drawSVG: 0,
          duration: durations.glide,
          stagger: 0.06,
          ease: 'power1.inOut',
        });
      });
    },
    { scope: sceneRef },
  );

  const begin = () => {
    startSession();
    navigate('/sort');
  };

  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center gap-space-6 p-space-6 text-center">
      <motion.div
        className="flex flex-col items-center gap-space-4"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.glide, ease: easings.soft }}
      >
        <p className="text-overline uppercase text-text-faint">RoboticsCareer.org</p>
        <h1 className="font-heading text-h1 text-text-strong">Explore the Floor</h1>
        <p className="max-w-sm text-body text-text-muted">
          Not sure where you&apos;d fit in robotics? Sort what you&apos;re into and we&apos;ll build
          your match.
        </p>
        <Button onClick={begin} data-testid="start-cta">
          Start sorting
        </Button>
      </motion.div>

      <div ref={sceneRef} className="w-full max-w-md" aria-hidden="true">
        <LandingSceneHint />
      </div>
    </main>
  );
}
