import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Register GSAP plugins once for the whole app (scene-motion discipline: register at app start,
// never inside a component). useGSAP must be registered before use; DrawSVG powers the Phase 1
// landing reveal. MorphSVG + MotionPath join in Phase 2 for the conveyor and part-to-robot arcs.
gsap.registerPlugin(useGSAP, DrawSVGPlugin);

export { gsap, useGSAP };
