import { setA } from '../questionSets/setA';
import type { ClassicFlow } from '../types';

// The original Phase 1 experience as a selectable flow (DATA_MODEL §17). Wraps
// set A by reference — items, rounds, copy, scoring, robot build, and the
// archetype results pipeline are completely untouched by the study flows.

export const classicFlow: ClassicFlow = {
  id: 'classic',
  kind: 'classic',
  name: 'Classic',
  landingCopy: setA.landingCopy,
  questionSet: setA,
};
