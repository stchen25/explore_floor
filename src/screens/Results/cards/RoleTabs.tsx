import type { ResultsCardsCopy, RoleDetail } from '@/data/types';

import { RoleTabRole } from './RoleTabRole';
import { RoleTabSkills } from './RoleTabSkills';

// The two-tab switcher on the role card (D-029 Phase C). Tab 0 "The role", Tab 1 "Skills, path &
// next steps". Underline-style tabs; tokens only.
interface RoleTabsProps {
  copy: ResultsCardsCopy;
  detail: RoleDetail;
  activeTab: number;
  onTab: (t: number) => void;
}

export function RoleTabs({ copy, detail, activeTab, onTab }: RoleTabsProps) {
  const tabs = [copy.roleTab, copy.skillsTab];

  return (
    <div data-testid="role-tabs">
      <div className="flex gap-space-5 border-b border-glass-border" role="tablist">
        {tabs.map((label, i) => {
          const active = activeTab === i;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onTab(i)}
              data-testid={`role-tab-${i}`}
              className={`-mb-px border-b-2 pb-space-3 font-heading text-body font-bold transition-colors ${
                active
                  ? 'border-text-on-dark text-text-on-dark'
                  : 'border-transparent text-text-on-dark-faint hover:text-text-on-dark-muted'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {activeTab === 0 ? (
        <RoleTabRole copy={copy} detail={detail} />
      ) : (
        <RoleTabSkills copy={copy} detail={detail} />
      )}
    </div>
  );
}
