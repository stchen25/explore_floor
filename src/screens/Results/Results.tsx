import { ResultsExperience } from './cards/ResultsExperience';

// /results renders the dark role-cards results experience (DATA_MODEL §17, D-029 Phase C). The
// older node-map (category/CategoryResults + NodeMap) is kept on disk but no longer the headline;
// its FitRadar + RoleDetailSheet stay in use by the /select comparator.
export function Results() {
  return <ResultsExperience />;
}
