import type { FlowResultsCopy, LandingCopy } from './types';

// Copy for the standalone /select screen — the "skip the quiz" comparator for the
// industry-professional study arm. Deliberately NOT a registered flow (no steps, no
// scoring, no expectedCategoryMax), so it lives here rather than in flows/. The
// confirmation is intentionally thin per the study protocol — don't enrich it.
// Landing chrome for the comparator. It arms on the condition switcher like the study
// flows do (same tap-then-CTA rhythm for the researcher), but the CTA routes straight
// to /select — no session, no flow.
export const roleSelectLanding: LandingCopy & { switcherLabel: string } = {
  switcherLabel: 'Select',
  overline: 'RoboticsCareer.org',
  heading: 'Explore the Floor',
  description: 'Skip the quiz and pick the role that sounds most like you.',
  cta: 'Select the role',
};

export const roleSelectCopy = {
  heading: 'Which of these sounds most like you?',
  hint: 'Pick the role that fits — or open the details first.',
  selectCta: 'This is me',
  detailsCta: 'See details',
  // Rendered as `${confirmPrefix} ${roleName}`.
  confirmPrefix: 'You’re set as',
  continueCta: 'Continue',
} as const;

// Minimal sheet chrome for the select screen — the shared RoleDetailSheet renders
// these section labels. No fit radar here (no scores), but the label stays typed.
export const roleSelectSheetCopy: FlowResultsCopy['sheet'] = {
  activities: 'What you’d do',
  education: 'Education',
  titles: 'Common job titles',
  salary: 'Salary',
  fit: 'How you fit',
  addToProfile: 'Add this Role to your profile',
};
