import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { items } from '@/data';
import { useSessionStore } from '@/state';

// Phase 0 stub: a plain grid of all 24 items with Keep/Pass buttons — no conveyor, no drag,
// no rounds (those are Phase 1/2). Once every item is decided, finalize and advance.

export function Sort() {
  const navigate = useNavigate();
  const decisions = useSessionStore((s) => s.state.decisions);
  const recordDecision = useSessionStore((s) => s.recordDecision);
  const completeSorting = useSessionStore((s) => s.completeSorting);

  const decidedCount = items.filter((item) => decisions[item.id]).length;
  const allDecided = decidedCount === items.length;
  const advanced = useRef(false);

  useEffect(() => {
    if (allDecided && !advanced.current) {
      advanced.current = true;
      completeSorting();
      navigate('/build');
    }
  }, [allDecided, completeSorting, navigate]);

  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col gap-space-4 p-space-5">
      <header className="flex items-baseline justify-between">
        <h2 className="font-heading text-h2 text-text-strong">Sort what you&apos;re into</h2>
        <p className="text-small text-text-muted" data-testid="sort-progress">
          {decidedCount} / {items.length} sorted
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-space-3 sm:grid-cols-2">
        {items.map((item) => {
          const decision = decisions[item.id];
          return (
            <li
              key={item.id}
              className="flex flex-col gap-space-2 rounded-md border border-border-default bg-bg p-space-3 shadow-card"
            >
              <span className="text-body text-text-default">{item.label}</span>
              <div className="flex gap-space-2">
                <Button
                  variant={decision === 'keep' ? 'primary' : 'neutral'}
                  onClick={() => recordDecision(item.id, 'keep')}
                  aria-pressed={decision === 'keep'}
                  data-testid={`keep-${item.id}`}
                >
                  That&apos;s me
                </Button>
                <Button
                  variant={decision === 'pass' ? 'primary' : 'neutral'}
                  onClick={() => recordDecision(item.id, 'pass')}
                  aria-pressed={decision === 'pass'}
                  data-testid={`pass-${item.id}`}
                >
                  Not my thing
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
