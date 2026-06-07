import { create } from 'zustand';

import { defaultSetId, questionSets } from '@/data';
import type { Decision, QuestionSetId, RoleId, SessionState } from '@/data/types';
import { assembleRobot, calculateScores, setMuted } from '@/lib';

// The single session store (DATA_MODEL §12). Store actions are the ONLY place that touches
// /src/lib — screens read state and dispatch actions, never compute. No persistence in v1:
// state lives in memory and a refresh starts fresh (intentional for the prototype).
//
// `questionSetId` (the A/B language-test condition, DATA_MODEL §16) deliberately lives NEXT TO
// `state`, not inside it: `reset()` replaces only `state`, so the researcher's chosen set
// survives "Start over" between participants. Items are resolved via `get()` INSIDE each
// action so a set switched on Landing is honored — never capture them at factory time.

interface SessionStore {
  state: SessionState;
  questionSetId: QuestionSetId;
  selectQuestionSet: (id: QuestionSetId) => void;
  startSession: () => void;
  recordDecision: (itemId: string, decision: Decision) => void;
  advanceRound: () => void;
  completeSorting: () => void; // triggers scoring, finalizes the robot
  tryOnRole: (roleId: RoleId) => void;
  toggleSound: () => void;
  reset: () => void;
}

const createInitialState = (): SessionState => ({
  currentScreen: 'landing',
  currentRound: 0,
  decisions: {},
  scoreResult: null,
  robot: null,
  currentlyTryingOn: null,
  soundEnabled: false,
});

export const useSessionStore = create<SessionStore>((set, get) => {
  const activeItems = () => questionSets[get().questionSetId].items;

  return {
    state: createInitialState(),
    questionSetId: defaultSetId,

    selectQuestionSet: (id) => set({ questionSetId: id }),

    startSession: () =>
      set({
        state: {
          ...createInitialState(),
          currentScreen: 'sort',
          currentRound: 1,
          robot: assembleRobot({}, activeItems(), null),
        },
      }),

    recordDecision: (itemId, decision) =>
      set((store) => {
        const decisions = { ...store.state.decisions, [itemId]: decision };
        return {
          state: { ...store.state, decisions, robot: assembleRobot(decisions, activeItems(), null) },
        };
      }),

    advanceRound: () =>
      set((store) => ({
        state: {
          ...store.state,
          currentRound: Math.min(store.state.currentRound + 1, 4) as SessionState['currentRound'],
        },
      })),

    completeSorting: () =>
      set((store) => {
        const scoreResult = calculateScores(store.state.decisions, activeItems());
        const robot = {
          ...assembleRobot(store.state.decisions, activeItems(), scoreResult.primaryArchetype),
          isFinalized: true,
        };
        return {
          state: {
            ...store.state,
            scoreResult,
            robot,
            currentlyTryingOn: scoreResult.primaryRole,
            currentRound: 4,
            currentScreen: 'build',
          },
        };
      }),

    tryOnRole: (roleId) =>
      set((store) => ({ state: { ...store.state, currentlyTryingOn: roleId } })),

    toggleSound: () =>
      set((store) => {
        const soundEnabled = !store.state.soundEnabled;
        setMuted(!soundEnabled);
        return { state: { ...store.state, soundEnabled } };
      }),

    // Replaces only `state` — questionSetId is intentionally preserved (see header comment).
    reset: () => set({ state: createInitialState() }),
  };
});
