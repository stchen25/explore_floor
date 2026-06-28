import { Outlet } from 'react-router-dom';

import { AppHeader } from '@/components/AppHeader';

// The dark app shell shared across every route (D-029 / VISUAL_REARCHITECTURE.md Phase A). The quiz
// renders dark-only: the dark canvas + on-dark text default live here so each routed screen inherits
// them, with the sticky AppHeader above the Outlet.
export function AppLayout() {
  return (
    <div className="flex min-h-full flex-col bg-dark-canvas text-text-on-dark">
      <AppHeader />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
