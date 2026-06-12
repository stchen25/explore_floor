import { AnimatePresence, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { roleDetails, roleSelectCopy, roleSelectSheetCopy } from '@/data';
import type { CategoryId } from '@/data/types';
import { CATEGORIES } from '@/data/types';
import { RoleDetailSheet } from '@/screens/Results/category/RoleDetailSheet';

// The "skip the quiz" comparator for the industry-professional study arm (researcher-launched
// from Landing). Four role cards in ladder order — pick one outright, or open the shared role
// sheet first (no fit radar: there are no scores here). Selecting lands on a deliberately thin
// confirmation; that thinness is the protocol's point, don't enrich it. Not a registered flow —
// no session state, no scoring, no analytics; local state resets on navigation.
export function RoleSelect() {
  const navigate = useNavigate();
  const reduce = !!useReducedMotion();

  const [selected, setSelected] = useState<CategoryId | null>(null);
  const [openDetail, setOpenDetail] = useState<CategoryId | null>(null);

  if (selected) {
    return (
      <main className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center gap-space-4 p-space-6 text-center">
        <h2 className="font-heading text-h2 text-text-strong" data-testid="select-confirm">
          {roleSelectCopy.confirmPrefix} {roleDetails[selected].roleName}
        </h2>
        <Button data-testid="select-continue" onClick={() => navigate('/')}>
          {roleSelectCopy.continueCta}
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-full max-w-md flex-col items-center gap-space-4 p-space-5">
      <div className="flex flex-col items-center gap-space-1 text-center">
        <h2 className="font-heading text-h2 text-text-strong">{roleSelectCopy.heading}</h2>
        <p className="text-small text-text-faint">{roleSelectCopy.hint}</p>
      </div>

      <div className="flex w-full flex-col gap-space-3">
        {CATEGORIES.map((category) => {
          const detail = roleDetails[category];
          return (
            <div
              key={category}
              data-testid={`select-card-${category}`}
              className="flex flex-col gap-space-3 rounded-md border border-border-default bg-bg px-space-4 py-space-3"
            >
              <div className="flex flex-col gap-space-1">
                <h3 className="font-heading text-h5 text-text-strong">{detail.roleName}</h3>
                <p className="text-small text-text-default">{detail.description}</p>
              </div>
              <div className="flex items-center gap-space-4">
                <Button
                  variant="neutral"
                  data-testid={`select-role-${category}`}
                  onClick={() => setSelected(category)}
                >
                  {roleSelectCopy.selectCta}
                </Button>
                <button
                  type="button"
                  data-testid={`select-details-${category}`}
                  onClick={() => setOpenDetail(category)}
                  className="text-small text-text-faint underline transition-colors hover:text-text-default"
                >
                  {roleSelectCopy.detailsCta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {openDetail && (
          <RoleDetailSheet
            detail={roleDetails[openDetail]}
            copy={roleSelectSheetCopy}
            reduce={reduce}
            onClose={() => setOpenDetail(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
