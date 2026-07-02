import { Icon } from '@/components/Icon';
import { roleDetails } from '@/data';
import type { CategoryId, CategoryWeights, ResultsCardsCopy } from '@/data/types';
import { compareRecommendation } from '@/lib';
import type { CategoryContributions } from '@/lib/categoryBreakdown';
import { screenerFitLines, type ScreenerProfile } from '@/lib/screenerFit';

import { CompareColumn } from './CompareColumn';
import { CompareTargetMenu, type CompareTargetOption } from './CompareTargetMenu';
import { fill } from './copy';
import { ResultsPanel } from './ResultsPanel';
import type { ResultsNav } from './useResultsNav';

// The compare view (D-029 Phase D): the current role (left) set side by side with a switchable
// target (right). Faithful to the mockup's compare screen — a "Back to {role}" pill + a "Compare
// with {role}" dropdown over two role columns — plus one soft, non-verdict recommendation line
// (Caelan's call) that leads with fit but foregrounds the lower-barrier role when the two are close.
// Reuses the Phase C pieces; desktop two-column, stacking under md.

interface CompareViewProps {
  copy: ResultsCardsCopy;
  ranking: CategoryId[];
  matchPercentages: CategoryWeights;
  contributions: CategoryContributions;
  profile: ScreenerProfile;
  nav: ResultsNav;
  reduce: boolean;
}

export function CompareView({
  copy,
  ranking,
  matchPercentages,
  contributions,
  profile,
  nav,
  reduce,
}: CompareViewProps) {
  const left = ranking[nav.roleIndex];
  const right = ranking[nav.compareWith];
  const leftDetail = roleDetails[left];
  const rightDetail = roleDetails[right];
  const pctLeft = matchPercentages[left];
  const pctRight = matchPercentages[right];
  const name = (c: CategoryId) => roleDetails[c].roleName;

  const rec = compareRecommendation(left, right, pctLeft, pctRight);
  let recText: string;
  if (rec.variant === 'closeLowerBarrier' && rec.lowerBarrier && rec.growToward) {
    recText = fill(copy.recommendation.closeLowerBarrier, {
      lowBarrier: name(rec.lowerBarrier),
      growToward: name(rec.growToward),
    });
  } else if (rec.variant === 'clearWinner') {
    recText = fill(copy.recommendation.clearWinner, { high: name(rec.leaned), low: name(rec.other) });
  } else {
    recText = fill(copy.recommendation.closeEqualBarrier, { high: name(rec.leaned) });
  }

  const options: CompareTargetOption[] = ranking
    .map((category, index) => ({ category, index }))
    .filter(({ index }) => index !== nav.roleIndex)
    .map(({ category, index }) => ({
      index,
      category,
      name: roleDetails[category].roleName,
      pct: matchPercentages[category],
      current: index === nav.compareWith,
    }));

  const controlBar = (
    <>
      <button
        type="button"
        data-testid="compare-back"
        onClick={() => nav.setView('cards')}
        className="inline-flex h-control-lg items-center gap-space-1 rounded-full border border-glass-border px-space-3 font-body text-body text-text-on-dark transition-colors hover:bg-glass-fill"
      >
        <Icon name="arrow-l" size={19} />
        {fill(copy.backToRole, { role: leftDetail.roleName })}
      </button>
      <CompareTargetMenu
        label={copy.compareWithLabel}
        targetName={rightDetail.roleName}
        targetCategory={right}
        options={options}
        onSelect={nav.setCompareWith}
        reduce={reduce}
      />
    </>
  );

  return (
    <ResultsPanel controlBar={controlBar}>
      <div
        className="rounded-lg border border-glass-border-soft bg-glass-fill p-space-4"
        data-testid="compare-recommendation"
      >
        <p className="flex items-center gap-space-1 font-heading text-small font-bold text-text-on-dark-faint">
          <Icon name="route" size={16} />
          {copy.recommendationLabel}
        </p>
        <p className="mt-space-2 font-body text-body text-text-on-dark-muted">{recText}</p>
      </div>

      <div
        className="flex flex-col gap-space-5 md:flex-row md:gap-space-5"
        data-testid="compare-columns"
      >
        <div className="min-w-0 flex-1 md:border-r md:border-glass-border-soft md:pr-space-5">
          <CompareColumn
            copy={copy}
            detail={leftDetail}
            ranking={ranking}
            matchPercentages={matchPercentages}
            pct={pctLeft}
            rank={nav.roleIndex}
            contribution={contributions[left]}
            fitLines={screenerFitLines(left, profile)}
            isTopMatch={nav.roleIndex === 0}
            expanded={nav.compareExpanded[0]}
            reduce={reduce}
            onToggle={() => nav.toggleCompareSide(0)}
          />
        </div>
        <div className="min-w-0 flex-1">
          <CompareColumn
            copy={copy}
            detail={rightDetail}
            ranking={ranking}
            matchPercentages={matchPercentages}
            pct={pctRight}
            rank={nav.compareWith}
            contribution={contributions[right]}
            fitLines={screenerFitLines(right, profile)}
            isTopMatch={nav.compareWith === 0}
            expanded={nav.compareExpanded[1]}
            reduce={reduce}
            onToggle={() => nav.toggleCompareSide(1)}
          />
        </div>
      </div>
    </ResultsPanel>
  );
}
