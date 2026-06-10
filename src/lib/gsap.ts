import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins once for the whole app (scene-motion discipline: register at app start,
// never inside a component). useGSAP must be registered before use; DrawSVG powers the landing
// reveal; MotionPath powers the part-to-robot arc in Phase 2 (MorphSVG omitted — free tier).
gsap.registerPlugin(useGSAP, DrawSVGPlugin, MotionPathPlugin);

export { gsap, useGSAP };
