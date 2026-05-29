import { create } from 'zustand';

import { items } from '@/data/items';
import type { Decision, RoleId, SessionState } from '@/data/types';
import { assembleRobot, calculateScores, setMuted } from '@/lib';

// The single session store (DATA_MODEL §12). Store actions are the ONLY place that touches
// /src/lib — screens read state and dispatch actions, never compute. No persistence in v1:
// state lives in memory and a refresh starts fresh (intentional for the prototype).

interface SessionStore {
  state: SessionState;
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

export const useSessionStore = create<SessionStore>((set) => ({
  state: createInitialState(),

  startSession: () =>
    set({
      state: {
        ...createInitialState(),
        currentScreen: 'sort',
        currentRound: 1,
        robot: assembleRobot({}, items, null),
      },
    }),

  recordDecision: (itemId, decision) =>
    set((store) => {
      const decisions = { ...store.state.decisions, [itemId]: decision };
      return {
        state: { ...store.state, decisions, robot: assembleRobot(decisions, items, null) },
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
      const scoreResult = calculateScores(store.state.decisions, items);
      const robot = {
        ...assembleRobot(store.state.decisions, items, scoreResult.primaryArchetype),
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

  tryOnRole: (roleId) => set((store) => ({ state: { ...store.state, currentlyTryingOn: roleId } })),

  toggleSound: () =>
    set((store) => {
      const soundEnabled = !store.state.soundEnabled;
      setMuted(!soundEnabled);
      return { state: { ...store.state, soundEnabled } };
    }),

  reset: () => set({ state: createInitialState() }),
}));
