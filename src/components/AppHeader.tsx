import { Icon } from './Icon';

// The dark app shell header (D-029 / VISUAL_REARCHITECTURE.md Phase A). A sticky bar shared across
// every route: the RC wordmark, an inert search affordance (chrome only — no backend/search per the
// repo scope), and a generic account stub (no auth). Honest fidelity to ARM's My Match chrome
// without faking function.
export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-space-3 border-b border-glass-border bg-glass-panel px-space-4 backdrop-blur-bar">
      <a
        href="#/"
        aria-label="RoboticsCareer.org home"
        className="flex items-center gap-space-1 no-underline"
      >
        <span className="grid h-8 w-8 place-items-center rounded-sm bg-arm-gold font-heading text-small font-bold text-near-black">
          RC
        </span>
        <span className="hidden font-heading text-small font-bold text-text-on-dark sm:inline">
          RoboticsCareer<span className="text-text-on-dark-faint">.org</span>
        </span>
      </a>

      {/* Inert search affordance — present for fidelity, non-interactive (no backend per scope). */}
      <div
        aria-hidden="true"
        className="ml-space-2 hidden h-9 max-w-md flex-1 items-center gap-space-1 rounded-full border border-glass-border bg-glass-fill px-space-3 text-text-on-dark-faint sm:flex"
      >
        <Icon name="search" size={18} />
        <span className="text-small">Search roles, jobs, and programs</span>
      </div>

      {/* Account stub — no auth; a generic pill for chrome fidelity. */}
      <div className="ml-auto flex items-center gap-space-1 rounded-full border border-glass-border bg-glass-fill py-space-0 pl-space-0 pr-space-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-arm-gold text-near-black">
          <Icon name="user" size={16} />
        </span>
        <span className="text-small text-text-on-dark-muted">Guest</span>
      </div>
    </header>
  );
}
