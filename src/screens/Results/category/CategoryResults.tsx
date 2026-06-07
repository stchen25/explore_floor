import { AnimatePresence, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { roleDetails } from '@/data';
import type { CategoryId } from '@/data/types';
import { useFlow, useSessionStore } from '@/state';

import { NodeMap } from './NodeMap';
import { RoleDetailSheet } from './RoleDetailSheet';

// The shared results for the study flows (DATA_MODEL §17), per the team's two results
// wireframes. Layer 1: the node map — categories on concentric rings by match rank,
// tap one to fan out its job titles. Layer 2: tap a title for the role sheet (RC.org
// role-card content + fit radar). This screen only orchestrates: layer state, retake,
// and the dispatch between the two layers.
export function CategoryResults() {
  const navigate = useNavigate();
  const reduce = !!useReducedMotion();
  const flow = useFlow();
  const categoryResult = useSessionStore((s) => s.state.categoryResult);
  const reset = useSessionStore((s) => s.reset);

  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [openTitle, setOpenTitle] = useState<{ category: CategoryId; title: string } | null>(null);

  if (flow.kind === 'classic' || !categoryResult) {
    return (
      <main className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center gap-space-3 p-space-6 text-center">
        <h2 className="font-heading text-h2 text-text-strong">No results yet</h2>
        <p className="text-body text-text-muted">Answer the questions first and we&apos;ll match you.</p>
        <Link to="/" className="text-body text-arm-blue underline">
          Start the quiz
        </Link>
      </main>
    );
  }

  function handleRetake() {
    reset();
    navigate('/');
  }

  return (
    <main className="mx-auto flex min-h-full max-w-md flex-col items-center gap-space-4 p-space-5">
      <h2 className="font-heading text-h2 text-center text-text-strong">
        {flow.resultsCopy.heading}
      </h2>
      <p className="max-w-md text-center text-small text-text-faint">{flow.resultsCopy.mapHint}</p>

      <div className="w-full max-w-sm">
        <NodeMap
          result={categoryResult}
          centerLabel={flow.resultsCopy.centerLabel}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenTitle={(category, title) => setOpenTitle({ category, title })}
          reduce={reduce}
        />
      </div>

      <button
        type="button"
        data-testid="retake"
        onClick={handleRetake}
        className="text-small text-text-faint underline transition-colors hover:text-text-default"
      >
        {flow.resultsCopy.retake}
      </button>

      <AnimatePresence>
        {openTitle && (
          <RoleDetailSheet
            detail={roleDetails[openTitle.category]}
            jobTitle={openTitle.title}
            matchPercentages={categoryResult.matchPercentages}
            copy={flow.resultsCopy.sheet}
            reduce={reduce}
            onClose={() => setOpenTitle(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
