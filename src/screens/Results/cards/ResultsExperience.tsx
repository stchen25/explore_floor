import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { Icon } from '@/components/Icon';
import { roleDetails } from '@/data';
import { durations, easings } from '@/lib';
import { categoryContributions } from '@/lib/categoryBreakdown';
import { deriveScreenerProfile, screenerFitLines } from '@/lib/screenerFit';
import { useFlow, useSessionStore } from '@/state';

import { ResultsPanel } from './ResultsPanel';
import { RoleHero } from './RoleHero';
import { RoleTabs } from './RoleTabs';
import { useResultsNav } from './useResultsNav';

// The dark results experience (DATA_MODEL §17, D-029 Phase C). Reads the scored result from the
// store (never recomputes) and renders the headline role-cards screen: a panel with a sticky
// control bar, the role hero (match %, signal bars, "why you matched"), and the role tabs, with
// prev/next stepping through the ranked roles. The Compare and Map control-bar actions switch an
// internal view; those screens land in Phases D/E, so they show a "coming next" stub for now.
export function ResultsExperience() {
  const navigate = useNavigate();
  const reduce = !!useReducedMotion();
  const flow = useFlow();
  const categoryResult = useSessionStore((s) => s.state.categoryResult);
  const answers = useSessionStore((s) => s.state.answers);
  const statementBuckets = useSessionStore((s) => s.state.statementBuckets);
  const reset = useSessionStore((s) => s.reset);
  const nav = useResultsNav(categoryResult?.ranking.length ?? 0);

  if (!categoryResult) {
    return (
      <main className="mx-auto flex min-h-full max-w-md flex-col items-center justify-center gap-space-3 p-space-6 text-center">
        <h2 className="font-heading text-h3 text-text-on-dark">No results yet</h2>
        <p className="font-body text-body text-text-on-dark-muted">
          Answer the questions first and we&rsquo;ll match you.
        </p>
        <Link to="/" className="font-body text-body text-arm-gold underline">
          Start the quiz
        </Link>
      </main>
    );
  }

  const cards = flow.resultsCopy.cards;
  const ranking = categoryResult.ranking;
  const role = ranking[nav.roleIndex];
  const detail = roleDetails[role];
  const pct = categoryResult.matchPercentages[role];
  const contribution = categoryContributions(flow, answers, statementBuckets)[role];
  const fitLines = screenerFitLines(role, deriveScreenerProfile(flow.id, answers));

  const handleRetake = () => {
    reset();
    navigate('/');
  };

  const fade = {
    initial: reduce ? false : { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: reduce ? 0 : durations.snap, ease: easings.soft },
  };

  const pill =
    'inline-flex h-9 items-center gap-space-1 rounded-full border border-glass-border px-space-3 font-body text-body text-text-on-dark transition-colors hover:bg-glass-fill';

  const controlBar = (
    <>
      <button type="button" onClick={() => nav.setView('compare')} data-testid="open-compare" className={pill}>
        <Icon name="compare" size={19} />
        {cards.compareCta}
      </button>
      {nav.atEnd ? (
        <button
          type="button"
          onClick={() => nav.setView('map')}
          data-testid="open-map"
          className="inline-flex h-9 items-center gap-space-1 rounded-full bg-arm-gold px-space-4 font-body text-body font-medium text-near-black transition-colors hover:bg-arm-gold-soft"
        >
          {cards.exploreCta}
          <Icon name="arrow-r" size={18} />
        </button>
      ) : (
        <button type="button" onClick={() => nav.setView('map')} data-testid="open-map" className={pill}>
          {cards.mapCta}
          <Icon name="arrow-r" size={18} />
        </button>
      )}
    </>
  );

  return (
    <main className="mx-auto w-full max-w-lg px-space-4 py-space-5" data-testid="results">
      <AnimatePresence mode="wait" initial={false}>
        {nav.view === 'cards' ? (
          <motion.div key="cards" {...fade}>
            <ResultsPanel controlBar={controlBar}>
              <RoleHero
                copy={cards}
                detail={detail}
                rank={nav.roleIndex}
                roleCount={ranking.length}
                ranking={ranking}
                matchPercentages={categoryResult.matchPercentages}
                pct={pct}
                contribution={contribution}
                fitLines={fitLines}
                isTopMatch={nav.roleIndex === 0}
                expanded={nav.expanded}
                reduce={reduce}
                onToggle={nav.toggleExpanded}
                onPrev={nav.prev}
                onNext={nav.next}
                atStart={nav.atStart}
                atEnd={nav.atEnd}
              />
              <div className="mx-auto w-full max-w-results">
                <RoleTabs
                  copy={cards}
                  detail={detail}
                  activeTab={nav.activeTab}
                  onTab={nav.setActiveTab}
                />
              </div>
              <div className="mx-auto flex w-full max-w-results justify-center pt-space-2">
                <button
                  type="button"
                  data-testid="retake"
                  onClick={handleRetake}
                  className="font-body text-small text-text-on-dark-faint underline transition-colors hover:text-text-on-dark"
                >
                  {flow.resultsCopy.retake}
                </button>
              </div>
            </ResultsPanel>
          </motion.div>
        ) : (
          <motion.div key="stub" {...fade}>
            <ResultsPanel
              controlBar={
                <button
                  type="button"
                  onClick={() => nav.setView('cards')}
                  data-testid="stub-back"
                  className={pill}
                >
                  <Icon name="chevron-l" size={18} />
                  Back to your matches
                </button>
              }
            >
              <div
                className="flex flex-col items-center gap-space-3 py-space-6 text-center"
                data-testid="results-stub"
              >
                <h2 className="font-heading text-h4 text-text-on-dark">
                  {nav.view === 'compare' ? cards.compareCta : 'Results map'}
                </h2>
                <p className="font-body text-body text-text-on-dark-muted">
                  This is coming in the next pass.
                </p>
                <Button onClick={() => nav.setView('cards')}>Back to your matches</Button>
              </div>
            </ResultsPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
