import { Link } from 'react-router-dom';

import { roles } from '@/data';
import { useSessionStore } from '@/state';

// Phase 0 stub: three role cards with raw match percentages + a robot placeholder. No compare
// interaction, no pedestal, no programs list yet (those are Phase 1).

export function Results() {
  const scoreResult = useSessionStore((s) => s.state.scoreResult);
  const robot = useSessionStore((s) => s.state.robot);

  if (!scoreResult) {
    return (
      <main className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center gap-space-3 p-space-6 text-center">
        <h2 className="font-heading text-h2 text-text-strong">No results yet</h2>
        <p className="text-body text-text-muted">
          Sort your interests first and we&apos;ll match you.
        </p>
        <Link to="/" className="text-body text-arm-blue underline">
          Start the sort
        </Link>
      </main>
    );
  }

  // Show all three roles, ordered primary-first by the score ranking.
  const ordered = roles
    .slice()
    .sort(
      (a, b) =>
        scoreResult.ranking.indexOf(a.archetypeId) - scoreResult.ranking.indexOf(b.archetypeId),
    );

  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col gap-space-5 p-space-5">
      <h2 className="font-heading text-h2 text-text-strong">Your robotics matches</h2>

      <section
        className="rounded-md border border-border-default bg-bg-soft p-space-4"
        data-testid="robot-placeholder"
      >
        <h3 className="font-heading text-h5 text-text-default">Your robot</h3>
        <p className="text-small text-text-muted">
          {robot ? `${Object.keys(robot.slots).length} parts assembled` : 'No robot built'}
        </p>
      </section>

      <ul className="flex flex-col gap-space-4">
        {ordered.map((role) => {
          const pct = scoreResult.matchPercentages[role.archetypeId];
          const isPrimary = role.id === scoreResult.primaryRole;
          return (
            <li
              key={role.id}
              data-testid="role-card"
              className={`flex flex-col gap-space-2 rounded-md border bg-bg p-space-4 shadow-card ${
                isPrimary ? 'border-arm-yellow' : 'border-border-default'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-h4 text-text-strong">{role.name}</h3>
                <span className="font-heading text-h3 text-text-default">{pct}%</span>
              </div>
              <p className="text-overline text-text-faint uppercase">
                {role.archetypeName}
                {isPrimary ? ' · best match' : ''}
              </p>
              <p className="text-body text-text-muted">{role.shortDescription}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
