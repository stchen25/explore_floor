import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';

import { Icon } from '@/components/Icon';
import type { ResultsCardsCopy, RoleDetail } from '@/data/types';
import { durations, easings } from '@/lib';
import type { CategoryContribution } from '@/lib/categoryBreakdown';
import { type ChipFit,fitChips } from '@/lib/chipFit';
import type { FitLine } from '@/lib/screenerFit';

import { Chip } from './Chip';
import { countLabel, fill } from './copy';

// The hero's "Why you matched" provenance (D-029 Phase C). Collapsed: a one-line plain read of
// where the match % comes from + a couple of answer chips. Expanded (inline, no navigation): the
// 01/02/03 breakdown — what you chose, how the school/pay openers + the scene/interest moments
// connected, what it all means — plus "what you passed on". Wired to the (now-live) categoryBreakdown
// engine + screenerFit; copy is data (FlowResultsCopy.cards). Reduced-motion: instant crossfade.

interface WhyYouMatchedProps {
  copy: ResultsCardsCopy;
  detail: RoleDetail;
  contribution: CategoryContribution;
  fitLines: FitLine[];
  pct: number;
  isTopMatch: boolean;
  expanded: boolean;
  reduce: boolean;
  onToggle: () => void;
}

export function WhyYouMatched({
  copy,
  detail,
  contribution,
  fitLines,
  pct,
  isTopMatch,
  expanded,
  reduce,
  onToggle,
}: WhyYouMatchedProps) {
  const role = detail.roleName;
  const moreThanAny = isTopMatch ? copy.moreThanAny : '';
  const heading = fill(copy.whyHeading, { role });

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -6 },
    transition: { duration: reduce ? 0 : durations.snap, ease: easings.soft },
  };

  const passed = contribution.passedLabels;
  const passedExamples =
    passed.length >= 2 ? fill(copy.passedExample, { a: passed[0], b: passed[1] }) : '';

  return (
    <div data-testid="why-matched">
      <h3 className="font-heading text-h5 text-text-on-dark">{heading}</h3>

      <AnimatePresence mode="wait" initial={false}>
        {expanded ? (
          <motion.div key="expanded" {...fade} className="mt-space-4 flex flex-col gap-space-4">
            {contribution.momentLabels.length > 0 && (
              <Section marker="01" label={copy.chosenLabel}>
                <div className="flex flex-wrap gap-space-1">
                  {contribution.momentLabels.map((label, i) => (
                    <Chip key={`${label}-${i}`}>{label}</Chip>
                  ))}
                </div>
              </Section>
            )}

            <Section marker="02" label={copy.connectLabel}>
              <div className="flex flex-col gap-space-3">
                <ConnectRow
                  pill={
                    contribution.openerCount > 0
                      ? countLabel(contribution.openerCount, copy.openerNoun)
                      : copy.openersLabel
                  }
                >
                  {fitLines.map((line) => (
                    <p key={line.axis}>{line.text}</p>
                  ))}
                </ConnectRow>
                {contribution.momentCount > 0 && (
                  <ConnectRow pill={countLabel(contribution.momentCount, copy.momentNoun)}>
                    <p>{detail.whyMomentsText}</p>
                  </ConnectRow>
                )}
              </div>
            </Section>

            <Section marker="03" label={copy.meaningLabel}>
              <p className="font-body text-body text-text-on-dark-muted">
                {fill(copy.meaningText, {
                  total: contribution.totalCount,
                  pointed: contribution.earnedCount,
                  role,
                  moreThanAny,
                  pct,
                })}
              </p>
            </Section>

            <div className="border-t border-glass-border-soft pt-space-3">
              <p className="flex items-center gap-space-1 font-body text-small font-medium text-text-on-dark-faint">
                <Icon name="split" size={15} />
                {copy.passedLabel} ({fill(copy.passedCountLabel, {
                  passed: contribution.passedCount,
                  total: contribution.totalCount,
                })})
              </p>
              <p className="mt-space-2 font-body text-body text-text-on-dark-muted">
                {fill(copy.passedText, {
                  passed: contribution.passedCount,
                  total: contribution.totalCount,
                  role,
                  pct,
                  passedExamples,
                })}
              </p>
            </div>

            <button
              type="button"
              onClick={onToggle}
              data-testid="why-toggle"
              className="flex items-center gap-space-0 self-start font-heading text-small font-bold text-text-on-dark-faint transition-opacity hover:opacity-70"
            >
              {copy.hideBreakdown}
              <Icon name="chevron-u" size={18} />
            </button>
          </motion.div>
        ) : (
          <motion.div key="collapsed" {...fade}>
            <p className="mt-space-2 font-body text-body text-text-on-dark-muted">
              {fill(copy.collapsedLine, {
                total: contribution.totalCount,
                pointed: contribution.earnedCount,
                role,
                moreThanAny,
                pct,
              })}
            </p>
            <CollapsedChips
              // A touch more char budget than the default so two short chips usually show, capped
              // at two so the row stays one line even in the narrower compare column.
              fit={fitChips(contribution.momentLabels, { maxChars: 40, maxCount: 2 })}
              moreAnswers={copy.moreAnswers}
            />
            <div className="mt-space-3 flex justify-end">
              <button
                type="button"
                onClick={onToggle}
                data-testid="why-toggle"
                className="flex items-center gap-space-0 font-heading text-small font-bold text-text-on-dark transition-opacity hover:opacity-70"
              >
                {copy.seeBreakdown}
                <Icon name="chevron-d" size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Collapsed answer chips on one line: the chips fitChips picked, then a protected "+N more"
// tail. `flex` (not flex-wrap) + overflow-hidden keep the row to a single line even when a long
// label would otherwise wrap it; the tail is shrink-0 so it never gets clipped.
function CollapsedChips({ fit, moreAnswers }: { fit: ChipFit; moreAnswers: string }) {
  return (
    <div className="mt-space-3 flex min-w-0 items-center gap-space-1 overflow-hidden">
      {fit.shown.map((label, i) => (
        <Chip key={`${label}-${i}`}>{label}</Chip>
      ))}
      {fit.more > 0 && (
        <span className="shrink-0 whitespace-nowrap font-body text-small text-text-on-dark-faint">
          {fill(moreAnswers, { n: fit.more })}
        </span>
      )}
    </div>
  );
}

function Section({
  marker,
  label,
  children,
}: {
  marker: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-space-3">
      <span className="w-6 shrink-0 font-heading text-small font-bold text-text-on-dark">
        {marker}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-heading text-body font-bold text-text-on-dark">{label}</p>
        <div className="mt-space-2">{children}</div>
      </div>
    </div>
  );
}

function ConnectRow({ pill, children }: { pill: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-space-2">
      <span className="inline-flex min-w-24 shrink-0 items-center justify-center rounded-sm bg-glass-fill-strong px-space-2 py-space-1 text-center font-body text-small text-text-on-dark-muted">
        {pill}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-space-1 font-body text-body text-text-on-dark-muted">
        {children}
      </div>
    </div>
  );
}
