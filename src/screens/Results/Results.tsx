import { ResultsExperience } from './cards/ResultsExperience';

// /results renders the dark role-cards results experience (DATA_MODEL §17, D-029 Phase C/D/E:
// cards + compare + the ambient bubble map). The old light node-map (category/CategoryResults +
// NodeMap + FitNote) was deleted in Phase E, superseded by the bubble map; only FitRadar +
// RoleDetailSheet remain in category/, still used by the /select comparator.
export function Results() {
  return <ResultsExperience />;
}
