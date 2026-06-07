import { questionSets } from '@/data';
import type { QuestionSet } from '@/data/types';

import { useSessionStore } from './sessionStore';

/** The active question set — items + all the copy it owns (DATA_MODEL §16).
 *  Reactive: re-renders consumers when the landing switcher changes the set. */
export function useQuestionSet(): QuestionSet {
  const id = useSessionStore((s) => s.questionSetId);
  return questionSets[id];
}
