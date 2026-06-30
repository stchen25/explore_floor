import { useState } from 'react';

// The results internal view-state machine (DATA_MODEL §17, D-029 Phase C/D). The five results
// screens (cards / compare / map / constellation / job) are an internal view state within
// Results, not separate routes. Phase C shipped the `cards` view; Phase D adds `compare`; `map`
// is still stubbed (Phase E). Stepping to another role resets the tab + collapses the breakdown
// + scrolls to top (mirrors the mockup's prev/next behavior).
//
// Compare (Phase D): a side-by-side of the current role (`roleIndex`, the left column) and a
// `compareWith` target (the right column, switchable via the dropdown — never the same role).
// Each column owns its "why you matched" expand state (`compareExpanded`), like the mockup's
// per-side `cmpExp`. Opening compare picks a sensible default target and scrolls top.

export type ResultsView = 'cards' | 'compare' | 'map';

export interface ResultsNav {
  view: ResultsView;
  setView: (v: ResultsView) => void;
  roleIndex: number;
  prev: () => void;
  next: () => void;
  atStart: boolean;
  atEnd: boolean;
  activeTab: number;
  setActiveTab: (t: number) => void;
  expanded: boolean;
  toggleExpanded: () => void;
  // --- map (Phase E) ---
  /** True once the user dove into a role from the bubble map; the cards control bar then offers
   *  a way back to the map (mirrors the mockup's `fromMap` chrome). */
  fromMap: boolean;
  /** Jump straight to a ranked role's cards from a map bubble (sets the role + marks fromMap). */
  diveToRole: (i: number) => void;
  // --- compare ---
  /** The right-column role index (never equal to roleIndex). */
  compareWith: number;
  /** Switch into the compare view with a sensible default target. */
  openCompare: () => void;
  /** Pick a new compare target (the dropdown). Ignores out-of-range / self picks. */
  setCompareWith: (i: number) => void;
  /** Per-column "why you matched" expand: [left, right]. */
  compareExpanded: [boolean, boolean];
  toggleCompareSide: (side: 0 | 1) => void;
}

const scrollTop = () => window.scrollTo({ top: 0 });

export function useResultsNav(roleCount: number): ResultsNav {
  const [view, setViewState] = useState<ResultsView>('cards');
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [fromMap, setFromMap] = useState(false);
  const [compareWith, setCompareWithState] = useState(roleCount > 1 ? 1 : 0);
  const [compareExpanded, setCompareExpanded] = useState<[boolean, boolean]>([false, false]);

  const goToRole = (i: number) => {
    if (i < 0 || i >= roleCount) return;
    setRoleIndex(i);
    setActiveTab(0);
    setExpanded(false);
    scrollTop();
  };

  // The next role after `current`, wrapping to the first non-current role; never `current`.
  const defaultTarget = (current: number) => {
    if (current + 1 < roleCount) return current + 1;
    return current > 0 ? 0 : Math.min(1, roleCount - 1);
  };

  return {
    view,
    setView: (v) => {
      setViewState(v);
      scrollTop();
    },
    roleIndex,
    prev: () => goToRole(roleIndex - 1),
    next: () => goToRole(roleIndex + 1),
    atStart: roleIndex === 0,
    atEnd: roleIndex === roleCount - 1,
    activeTab,
    setActiveTab,
    expanded,
    toggleExpanded: () => setExpanded((e) => !e),
    fromMap,
    diveToRole: (i) => {
      if (i < 0 || i >= roleCount) return;
      goToRole(i);
      setFromMap(true);
      setViewState('cards');
    },
    compareWith,
    openCompare: () => {
      setCompareWithState((t) => (t === roleIndex ? defaultTarget(roleIndex) : t));
      setCompareExpanded([false, false]);
      setViewState('compare');
      scrollTop();
    },
    setCompareWith: (i) => {
      if (i < 0 || i >= roleCount || i === roleIndex) return;
      setCompareWithState(i);
    },
    compareExpanded,
    toggleCompareSide: (side) =>
      setCompareExpanded((prev) => {
        const out: [boolean, boolean] = [prev[0], prev[1]];
        out[side] = !out[side];
        return out;
      }),
  };
}
