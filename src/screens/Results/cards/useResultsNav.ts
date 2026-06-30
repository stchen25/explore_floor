import { useState } from 'react';

// The results internal view-state machine (DATA_MODEL §17, D-029 Phase C–F). The results screens
// (cards / compare / map / constellation / job / job-overview) are an internal view state within
// Results, not separate routes. Phase C shipped `cards`; D added `compare`; E added `map`; F adds
// the explore sub-flow: `selected` (the role's job constellation), `job` (a job overlay layered on
// the same mounted constellation), and `job-overview` (the standalone job page). Stepping to
// another role resets the tab + collapses the breakdown + scrolls to top (mockup prev/next).
//
// Compare (Phase D): a side-by-side of the current role (`roleIndex`, the left column) and a
// `compareWith` target (the right column, switchable via the dropdown — never the same role).
// Each column owns its "why you matched" expand state (`compareExpanded`), like the mockup's
// per-side `cmpExp`. Opening compare picks a sensible default target and scrolls top.
//
// Explore (Phase F): a map bubble dives into the role's `selected` constellation (NOT the cards —
// that was Phase E's interim). The constellation's "Role overview" routes to that role's `cards`
// (and marks `fromMap` so the cards still offer a way back to the map). A constellation node /
// "jobs in this path" row opens the `job` overlay (the constellation stays mounted behind it); its
// "Job overview" opens the standalone `job-overview` page.

export type ResultsView = 'cards' | 'compare' | 'map' | 'selected' | 'job' | 'job-overview';

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
  // --- map / explore (Phase E/F) ---
  /** True once the user reached the cards via the map/explore path; the cards control bar then
   *  offers a way back to the map (mirrors the mockup's `fromMap` chrome). Set by the
   *  constellation's "Role overview" (the bubble dive itself now lands on the constellation). */
  fromMap: boolean;
  // --- explore: constellation / job / job-overview (Phase F) ---
  /** Index into jobs[role] for the open job node; null on the constellation with no job open. */
  selectedJob: number | null;
  /** Dive from a map bubble into the role's job constellation (replaces the Phase E dive→cards). */
  openConstellation: (i: number) => void;
  /** Open a job node / "jobs in this path" row (index into jobs[role]) → the job overlay. */
  openJob: (jobIndex: number) => void;
  /** Job overlay footer → the standalone job-overview page. */
  openJobOverview: () => void;
  /** Job overlay header back (role name) → back to the constellation (clears the open job). */
  backToConstellation: () => void;
  /** Job-overview "Back" → the job overlay (keeps the open job). */
  backToJob: () => void;
  /** Constellation "Role overview" → that role's cards; marks fromMap so cards offer back-to-map. */
  roleOverview: () => void;
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
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
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
    selectedJob,
    openConstellation: (i) => {
      if (i < 0 || i >= roleCount) return;
      goToRole(i); // sets the role + resets tab/expand + scrolls top
      setSelectedJob(null);
      setViewState('selected');
    },
    openJob: (jobIndex) => {
      setSelectedJob(jobIndex);
      setViewState('job');
      scrollTop();
    },
    openJobOverview: () => {
      setViewState('job-overview');
      scrollTop();
    },
    backToConstellation: () => {
      setSelectedJob(null);
      setViewState('selected');
      scrollTop();
    },
    backToJob: () => {
      setViewState('job');
      scrollTop();
    },
    roleOverview: () => {
      setFromMap(true);
      setViewState('cards');
      scrollTop();
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
