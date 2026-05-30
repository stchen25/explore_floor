import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/router';

export function App() {
  // Opt into v7's startTransition state-update wrapping now to silence the dev future-flag warning.
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}
