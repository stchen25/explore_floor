import type { QuestionSet, QuestionSetId } from '../types';
import { setA } from './setA';
import { setB } from './setB';

// The question-set registry (DATA_MODEL §16). The store resolves the active set's items
// through this map; the landing switcher and the per-set data-integrity tests iterate the
// ordered list. Adding a set = author the file, register it here, done.

export const questionSets: Record<QuestionSetId, QuestionSet> = { a: setA, b: setB };

export const defaultSetId: QuestionSetId = 'a';

/** Ordered list — drives the landing switcher segments and `describe.each` in tests. */
export const questionSetList: QuestionSet[] = [setA, setB];
