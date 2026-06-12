import { createHashRouter } from 'react-router-dom';

import { Build } from '@/screens/Build';
import { FlowRunner } from '@/screens/Flow';
import { Landing } from '@/screens/Landing';
import { Results } from '@/screens/Results';
import { RoleSelect } from '@/screens/Select';
import { Sort } from '@/screens/Sort';

/** Navigation is driven by store actions + these routes. /sort and /build belong to the
 *  classic flow; /flow is the step runner for the study flows; /results dispatches by kind.
 *  /select is the standalone "skip the quiz" comparator — not a registered flow, no session state.
 *  HashRouter (not browser history) so static GitHub Pages hosting survives refresh and
 *  deep links under the /explore_floor/ subpath without server-side rewrites. */
export const router = createHashRouter([
  { path: '/', element: <Landing /> },
  { path: '/sort', element: <Sort /> },
  { path: '/flow', element: <FlowRunner /> },
  { path: '/build', element: <Build /> },
  { path: '/results', element: <Results /> },
  { path: '/select', element: <RoleSelect /> },
]);
