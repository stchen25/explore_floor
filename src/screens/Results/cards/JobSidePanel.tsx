import { AnimatePresence, motion } from 'motion/react';

import { Icon } from '@/components/Icon';
import type {
  CategoryId,
  CategoryWeights,
  Job,
  ResultsCardsCopy,
  ResultsExploreCopy,
  RoleDetail,
} from '@/data/types';
import { durations, easings } from '@/lib';

import { fill } from './copy';
import { EducationList } from './EducationList';
import { SignalBars } from './SignalBars';
import { StatBox } from './StatBox';

// The glass left rail beside the constellation (D-029 Phase F). One shell, two bodies: on `selected`
// it shows the role summary (match label, name + %, signal bars, description, salary/education, and
// the "jobs in this path" list); on `job` it swaps to the open job's summary. The body crossfades
// via its own AnimatePresence so the constellation behind it never remounts. Header back + footer CTA
// differ per view. Tokens only.

interface JobSidePanelProps {
  view: 'selected' | 'job';
  copy: ResultsCardsCopy;
  explore: ResultsExploreCopy;
  detail: RoleDetail;
  rank: number;
  pct: number;
  jobs: Job[];
  selectedJob: number | null;
  ranking: CategoryId[];
  matchPercentages: CategoryWeights;
  reduce: boolean;
  onOpenJob: (jobIndex: number) => void;
  onBackToMap: () => void;
  onBackToConstellation: () => void;
  onRoleOverview: () => void;
  onOpenJobOverview: () => void;
}

const backRow =
  'inline-flex items-center gap-space-1 font-body text-small text-text-on-dark-muted transition-colors hover:text-text-on-dark';

export function JobSidePanel(props: JobSidePanelProps) {
  const { view, copy, explore, detail, reduce, selectedJob, jobs } = props;
  const job = selectedJob !== null ? jobs[selectedJob] : undefined;

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -6 },
    transition: { duration: reduce ? 0 : durations.snap, ease: easings.soft },
  };

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-lg border border-glass-border bg-glass-panel shadow-dark-card backdrop-blur-panel"
      data-testid="job-side-panel"
    >
      {/* header back row */}
      <div className="shrink-0 px-space-4 pt-space-4 pb-space-2">
        {view === 'selected' ? (
          <button type="button" onClick={props.onBackToMap} data-testid="job-panel-back" className={backRow}>
            <Icon name="chevron-l" size={18} />
            {explore.allPathsBack}
          </button>
        ) : (
          <button
            type="button"
            onClick={props.onBackToConstellation}
            data-testid="job-panel-back"
            className={backRow}
          >
            <Icon name="chevron-l" size={18} />
            {detail.roleName}
          </button>
        )}
      </div>

      {/* body (scrolls) */}
      <div className="min-h-0 flex-1 overflow-y-auto px-space-4 py-space-2">
        <AnimatePresence mode="wait" initial={false}>
          {view === 'selected' ? (
            <motion.div key="role-summary" {...fade}>
              <RoleSummaryBody {...props} />
            </motion.div>
          ) : (
            <motion.div key="job-summary" {...fade}>
              {job && <JobSummaryBody copy={copy} explore={explore} detail={detail} job={job} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* footer CTA */}
      <div className="shrink-0 border-t border-glass-border px-space-4 py-space-3">
        {view === 'selected' ? (
          <button
            type="button"
            onClick={props.onRoleOverview}
            data-testid="role-overview-cta"
            className="flex w-full items-center justify-center gap-space-2 rounded-md border border-glass-border bg-glass-fill-strong py-space-3 font-heading text-body font-medium text-text-on-dark transition-colors hover:bg-glass-fill"
          >
            {explore.roleOverviewCta}
            <Icon name="arrow-r" size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={props.onOpenJobOverview}
            data-testid="job-overview-cta"
            className="flex w-full items-center justify-center gap-space-2 rounded-md bg-arm-gold py-space-3 font-heading text-body font-medium text-near-black transition-colors hover:bg-arm-gold-soft"
          >
            {explore.jobOverviewCta}
            <Icon name="arrow-r" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

function RoleSummaryBody({
  copy,
  explore,
  detail,
  rank,
  pct,
  jobs,
  ranking,
  matchPercentages,
  reduce,
  onOpenJob,
}: JobSidePanelProps) {
  const matchLabel = copy.matchLabels[rank] ?? copy.matchLabels[copy.matchLabels.length - 1];
  return (
    <div className="flex flex-col gap-space-4">
      <div>
        <p className="font-body text-small text-text-on-dark-faint">{matchLabel}</p>
        <div className="mt-space-1 flex items-baseline justify-between gap-space-2">
          <h2 className="font-heading text-h4 text-text-on-dark">{detail.roleName}</h2>
          <span className="font-heading text-h4 tabular-nums text-text-on-dark">{pct}%</span>
        </div>
      </div>

      <SignalBars
        order={ranking}
        matchPercentages={matchPercentages}
        activeCategory={detail.categoryId}
        reduce={reduce}
      />

      <section>
        <h3 className="font-heading text-h5 text-text-on-dark">{copy.descriptionHeading}</h3>
        <p className="mt-space-2 font-body text-body text-text-on-dark-muted">{detail.description}</p>
      </section>

      <div className="flex flex-col gap-space-3 sm:flex-row">
        <StatBox label={copy.salaryLabel}>
          <p className="font-heading text-h5 text-text-on-dark">{detail.salaryMedian}</p>
        </StatBox>
        <StatBox label={copy.educationLabel}>
          <EducationList education={detail.education} />
        </StatBox>
      </div>

      <section>
        <div className="flex items-baseline justify-between gap-space-2">
          <h3 className="font-heading text-h5 text-text-on-dark">{explore.jobsInPathHeading}</h3>
          <span className="font-body text-small text-text-on-dark-faint">
            {fill(explore.jobsInPathCount, { n: jobs.length })}
          </span>
        </div>
        <ul className="mt-space-3 flex flex-col gap-space-2">
          {jobs.map((job, i) => (
            <li key={job.id}>
              <button
                type="button"
                data-testid={`job-list-${job.id}`}
                onClick={() => onOpenJob(i)}
                className="flex w-full items-center justify-between gap-space-2 rounded-md border border-glass-border-soft bg-glass-fill px-space-3 py-space-2 text-left font-body text-body text-text-on-dark transition-colors hover:bg-glass-fill-strong"
              >
                <span className="min-w-0 truncate">{job.title}</span>
                <Icon name="chevron-r" size={18} className="shrink-0 text-text-on-dark-faint" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function JobSummaryBody({
  copy,
  explore,
  detail,
  job,
}: {
  copy: ResultsCardsCopy;
  explore: ResultsExploreCopy;
  detail: RoleDetail;
  job: Job;
}) {
  return (
    <div className="flex flex-col gap-space-4">
      <div>
        <p className="font-body text-small text-text-on-dark-faint">
          {fill(explore.jobEyebrow, { role: detail.roleName })}
        </p>
        <h2 className="mt-space-1 font-heading text-h4 text-text-on-dark">{job.title}</h2>
      </div>

      <section>
        <h3 className="font-heading text-h5 text-text-on-dark">{copy.descriptionHeading}</h3>
        <p className="mt-space-2 font-body text-body text-text-on-dark-muted">{job.summary}</p>
      </section>

      <div className="flex flex-col gap-space-3 sm:flex-row">
        <StatBox label={copy.salaryLabel}>
          <p className="font-heading text-h5 text-text-on-dark">{job.salaryMedian ?? detail.salaryMedian}</p>
        </StatBox>
        <StatBox label={copy.educationLabel}>
          <EducationList education={job.education ?? detail.education} />
        </StatBox>
      </div>

      <section>
        <h3 className="font-heading text-h5 text-text-on-dark">{explore.responsibilitiesHeading}</h3>
        <ul className="mt-space-3 flex flex-col gap-space-2">
          {job.responsibilities.map((item) => (
            <li key={item} className="flex gap-space-2 font-body text-body text-text-on-dark-muted">
              <span className="text-text-on-dark-faint">&bull;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
