// Screener appetite levels + fit-line copy for the results "fit check" (D-020).
//
// The initial screener questions in each flow gauge how much school / pay the user is
// after: 0 = least, 1 = some, 2 = most. lib/screenerFit.ts derives that appetite from the
// answers and compares it to the matched role's ladder (roleDetails educationLevel /
// payLevel) to show an always-on fit line. This is content — tune the levels and copy
// here without touching the fit logic.

/** Per-answer appetite level for the single-question axes. Narrative education combines
 *  Q1 ("going to college?") with Q2 ("how long?") — that combination lives in
 *  screenerFit.ts, which reads the Q2 levels below. */
export const SCREENER_LEVELS: Record<string, 0 | 1 | 2> = {
  // Exam — "Are you planning on pursuing higher education?" Being open to it ("Maybe")
  // counts as full appetite, same as Yes (D-019): "not planning" vs "open to it".
  'e-q1-no': 0,
  'e-q1-maybe': 2,
  'e-q1-yes': 2,
  // Narrative — "How long?" (only reached when Q1 = Yes)
  'n-q2-short': 1, // 1-2 years
  'n-q2-typical': 2, // 4 years
  'n-q2-long': 2, // 4+ years
  'n-q2-whatever': 1, // noncommittal
  // Narrative — "What is the lowest salary you would feel satisfied with?"
  'n-q3-40': 0,
  'n-q3-60': 1,
  'n-q3-80': 2,
};

export interface ScreenerCopy {
  heading: string;
  /** {role} = role name, {education} = the role's education string. */
  educationFits: string;
  educationShort: string;
  /** {role} = role name, {salary} = the role's salary string. */
  payFits: string;
  payShort: string;
}

export const SCREENER_COPY: ScreenerCopy = {
  heading: 'How it lines up',
  educationFits: '{role} roles fit the schooling you’re open to ({education}).',
  educationShort:
    'Heads up — {role} roles usually need {education}, more school than you mentioned. Worth weighing as you explore this path.',
  payFits: '{role} pay ({salary}) lands in the range you’re after.',
  payShort:
    'Heads up — {role} pay ({salary}) sits below the range you mentioned. Higher-tier roles reach further.',
};
