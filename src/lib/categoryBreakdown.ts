import { SCREENER_STEP_IDS } from '@/data/flows/screeners';
import type { BucketId, CategoryFlow, CategoryId } from '@/data/types';
import { CATEGORIES } from '@/data/types';

import { walkPath } from './categoryScoring';

// Score provenance for the results "why you matched" read (DATA_MODEL §17). Pure, and walks
// the SAME branch-aware path as calculateCategoryScores, so the labels it surfaces are
// exactly the items that moved each role's raw score. Wired into the results role card's
// "Why you matched" breakdown (Phase C).
//
// The breakdown splits a role's signals two ways, matching the mockup's "How they connected":
//   - OPENERS  — the screener steps (education Q1/Q2 + pay Q3, see SCREENER_STEP_IDS). At most
//                two per role; the school/pay angle.
//   - MOMENTS  — the interest MCs (Q4/Q5) + the seven scenes. The "What you chose" chips.
// openerCount + momentCount === earnedCount, and earnedCount + passedCount === totalCount
// (totalCount is the role's achievable max on the path = the "of 11"). `maybe` choices are
// reported separately — they earn nothing today (MAYBE_WEIGHT = 0) but are worth showing as
// "on the fence", and they still count toward passedCount (not pointed).

export interface CategoryContribution {
  category: CategoryId;
  /** Labels of every item that added to this role's raw score (openers + moments). */
  earned: string[];
  /** Labels marked 'maybe' for this role (scored 0 now; shown as on-the-fence). */
  maybe: string[];
  earnedCount: number;
  /** This role's achievable max on the path taken (the "of N" denominator). */
  totalCount: number;
  /** Earned from the screener steps (school/pay), 0–2. The "N openers" pill. */
  openerCount: number;
  /** Earned labels from the interest MCs + scenes — the "What you chose" chips. */
  momentLabels: string[];
  momentCount: number;
  /** Moment options this role offered that the user didn't take (scene "Not me" / unrated,
   *  or an interest MC where another role's choice was picked) — the "What you passed on"
   *  examples. */
  passedLabels: string[];
  /** totalCount - earnedCount: how many of this role's moments didn't point here. */
  passedCount: number;
}

export type CategoryContributions = Record<CategoryId, CategoryContribution>;

const isScreenerStep = (stepId: string): boolean => SCREENER_STEP_IDS.includes(stepId);

export function categoryContributions(
  flow: CategoryFlow,
  answers: Record<string, string>,
  statementBuckets: Record<string, BucketId>,
): CategoryContributions {
  const out = {} as CategoryContributions;
  for (const category of CATEGORIES) {
    out[category] = {
      category,
      earned: [],
      maybe: [],
      earnedCount: 0,
      totalCount: 0,
      openerCount: 0,
      momentLabels: [],
      momentCount: 0,
      passedLabels: [],
      passedCount: 0,
    };
  }

  for (const step of walkPath(flow.steps, answers)) {
    const isOpener = isScreenerStep(step.id);
    switch (step.type) {
      case 'mc': {
        const chosen = step.choices.find((choice) => choice.id === answers[step.id]);
        const chosenCategories = new Set(chosen?.categories ?? []);
        const stepCategories = new Set(step.choices.flatMap((c) => c.categories));
        for (const category of stepCategories) {
          out[category].totalCount += 1;
          if (chosenCategories.has(category)) {
            out[category].earned.push(chosen!.label);
            out[category].earnedCount += 1;
            if (isOpener) {
              out[category].openerCount += 1;
            } else {
              out[category].momentLabels.push(chosen!.label);
              out[category].momentCount += 1;
            }
          } else if (!isOpener) {
            // The role had an option at this interest step but the user picked another.
            const roleChoice = step.choices.find((c) => c.categories.includes(category));
            if (roleChoice) out[category].passedLabels.push(roleChoice.label);
          }
        }
        break;
      }
      case 'scene':
        // Each scene choice is bucketed (D-018): "That's me" earns (a moment), "Kinda me"
        // ('maybe') is on-the-fence, "Not me"/unanswered is passed-on.
        for (const choice of step.choices) {
          const entry = out[choice.category];
          entry.totalCount += 1;
          const bucket = statementBuckets[choice.id];
          if (bucket === 'thats-me') {
            entry.earned.push(choice.label);
            entry.earnedCount += 1;
            entry.momentLabels.push(choice.label);
            entry.momentCount += 1;
          } else if (bucket === 'maybe') {
            entry.maybe.push(choice.label);
          } else {
            entry.passedLabels.push(choice.label);
          }
        }
        break;
    }
  }

  for (const category of CATEGORIES) {
    out[category].passedCount = out[category].totalCount - out[category].earnedCount;
  }

  return out;
}
