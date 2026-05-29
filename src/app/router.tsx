import { createBrowserRouter } from 'react-router-dom';

import { Build } from '@/screens/Build';
import { Landing } from '@/screens/Landing';
import { Results } from '@/screens/Results';
import { Sort } from '@/screens/Sort';

/** The four screens of the flow. Navigation is driven by store actions + these routes. */
export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/sort', element: <Sort /> },
  { path: '/build', element: <Build /> },
  { path: '/results', element: <Results /> },
]);
