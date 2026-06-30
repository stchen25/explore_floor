import { Icon, type IconName } from '@/components/Icon';
import type { BridgeProgram, BridgeProgramIcon } from '@/data/types';

// One "How to bridge the gap" training-program row (Tab 2). Neutral glass row with a leading
// icon box, the program title + school, and a (non-functional, chrome-only) bookmark affordance.
// Tokens only (D-029).

const PROGRAM_ICON: Record<BridgeProgramIcon, IconName> = {
  mechatronics: 'precision',
  systems: 'hub',
  certification: 'verified',
  controls: 'settings',
};

export function BridgeProgramRow({ program }: { program: BridgeProgram }) {
  return (
    <div className="flex items-center gap-space-3 rounded-md border border-glass-border-soft bg-glass-fill p-space-3 transition-colors hover:bg-glass-fill-strong">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-glass-border-soft bg-glass-fill-strong">
        <Icon name={PROGRAM_ICON[program.icon]} size={24} className="text-text-on-dark-muted" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-body font-bold text-text-on-dark">{program.title}</p>
        <p className="font-body text-small text-text-on-dark-faint">{program.school}</p>
      </div>
      <Icon name="bookmark" size={22} className="text-text-on-dark-faint" />
    </div>
  );
}
