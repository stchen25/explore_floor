import { defaultFlowId, flows } from '@/data';
import type { Flow } from '@/data/types';

import { useSessionStore } from './sessionStore';

/** The active flow — kind, steps, and the copy it owns (DATA_MODEL §17).
 *  Reactive: re-renders consumers when the landing switcher changes the flow.
 *  'select' (the comparator) is a route, not a flow — its CTA never enters the
 *  flow screens, so consumers fall back to the default flow defensively. */
export function useFlow(): Flow {
  const id = useSessionStore((s) => s.flowId);
  return flows[id === 'select' ? defaultFlowId : id];
}
