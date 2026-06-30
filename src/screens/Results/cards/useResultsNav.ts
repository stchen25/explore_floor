import { useState } from 'react';

// The results internal view-state machine (DATA_MODEL §17, D-029 Phase C). The five results
// screens (cards / compare / map / constellation / job) are an internal view state within
// Results, not separate routes. Phase C ships the `cards` view; compare/map are stubbed.
// Stepping to another role resets the tab + collapses the breakdown + scrolls to top (mirrors
// the mockup's prev/next behavior).

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
}

const scrollTop = () => window.scrollTo({ top: 0 });

export function useResultsNav(roleCount: number): ResultsNav {
  const [view, setViewState] = useState<ResultsView>('cards');
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const goToRole = (i: number) => {
    if (i < 0 || i >= roleCount) return;
    setRoleIndex(i);
    setActiveTab(0);
    setExpanded(false);
    scrollTop();
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
  };
}
