import type { CategoryFlow, SortStatement } from '../types';

// The Exam study flow (DATA_MODEL §17): two background questions, one mapped
// multiple-choice question, then a 30-statement sort into three buckets. Content
// verbatim from the team's board — docs/reference/Narrative Quiz Structure Content
// Spec.md (Version 2). The 'maybe' bucket exists because the prior user study asked
// for one; it scores MAYBE_WEIGHT (0 for now) in lib/categoryScoring.ts.
//
// Q1–Q2 are background questions with empty `categories` for now — same D-017 open
// item as the narrative intro questions.

// Statement order is fixed here, interleaved round-robin across categories
// (operate → repair → program → plan) so no two same-category statements run
// back-to-back. Counts: operate 8 / repair 7 / program 7 / plan 8.
const statements: SortStatement[] = [
  { id: 'e-st-advising', label: 'Advising/tutoring others', category: 'operate' },
  { id: 'e-st-chair', label: 'Fixing a chair', category: 'repair' },
  { id: 'e-st-website', label: 'Building a cool website from scratch', category: 'program' },
  { id: 'e-st-events', label: 'Planning and coordinating events', category: 'plan' },
  { id: 'e-st-team-track', label: 'Ensuring that your team stays on track', category: 'operate' },
  { id: 'e-st-bike', label: 'Installing and repairing parts of a bike', category: 'repair' },
  { id: 'e-st-prototyping', label: 'Prototyping cool things', category: 'program' },
  {
    id: 'e-st-directing',
    label: 'Directing and coordinating activities of others',
    category: 'plan',
  },
  {
    id: 'e-st-detail',
    label: 'Very detail-oriented when performing a task',
    category: 'operate',
  },
  {
    id: 'e-st-car',
    label: "Checking what's wrong with your car on your own",
    category: 'repair',
  },
  { id: 'e-st-testing', label: 'Testing robotic applications', category: 'program' },
  {
    id: 'e-st-simulations',
    label: 'Running simulations and interpreting their results',
    category: 'plan',
  },
  { id: 'e-st-floor', label: 'Working at a production floor', category: 'operate' },
  {
    id: 'e-st-pc-performance',
    label: 'Optimizing performance of your PC/Laptop',
    category: 'repair',
  },
  {
    id: 'e-st-design-problems',
    label: 'Enjoy solving technical design problems',
    category: 'program',
  },
  { id: 'e-st-workflows', label: 'Designing automation workflows', category: 'plan' },
  { id: 'e-st-safety', label: 'Safety is your number one priority', category: 'operate' },
  {
    id: 'e-st-apart',
    label: 'Taking something apart to understand it',
    category: 'repair',
  },
  {
    id: 'e-st-libraries',
    label: 'Keeping up to date with new software libraries and tools',
    category: 'program',
  },
  {
    id: 'e-st-office',
    label: 'Working in a planning or engineering office',
    category: 'plan',
  },
  {
    id: 'e-st-repetitive',
    label: 'Staying focused during repetitive tasks',
    category: 'operate',
  },
  { id: 'e-st-custom-pc', label: 'Building and customizing your own PC', category: 'repair' },
  {
    id: 'e-st-languages',
    label: 'Enjoy learning different coding languages',
    category: 'program',
  },
  { id: 'e-st-leadership', label: 'Taking on leadership roles', category: 'plan' },
  {
    id: 'e-st-hands-on-track',
    label: 'Keeping your team on track during hands-on work',
    category: 'operate',
  },
  {
    id: 'e-st-debugging',
    label: "Debugging code when something isn't working",
    category: 'repair',
  },
  {
    id: 'e-st-math-logic',
    label: 'Tackling challenging math/logic problems',
    category: 'program',
  },
  {
    id: 'e-st-supply-chain',
    label: "Understanding the operations & supply chain of a product you're interested in",
    category: 'plan',
  },
  {
    id: 'e-st-observing',
    label: 'Watching closely for problems when observing an automated task',
    category: 'operate',
  },
  { id: 'e-st-data', label: 'Collecting and analyzing data', category: 'plan' },
];

export const examFlow: CategoryFlow = {
  id: 'exam',
  kind: 'exam',
  name: 'Exam',
  landingCopy: {
    overline: 'RoboticsCareer.org',
    heading: 'Explore the Floor',
    description:
      "Answer a few quick questions, sort what sounds like you, and we'll match you to real robotics careers.",
    cta: 'Start the quiz',
  },
  steps: [
    {
      type: 'mc',
      id: 'e-q1',
      question: 'Are you planning on pursuing higher education?',
      choices: [
        { id: 'e-q1-no', label: 'No', categories: [] },
        { id: 'e-q1-maybe', label: 'Maybe', categories: [] },
        { id: 'e-q1-yes', label: 'Yes', categories: [] },
      ],
    },
    {
      type: 'mc',
      id: 'e-q2',
      question: 'Do you have prior work experience in Robotics and/or tech?',
      choices: [
        { id: 'e-q2-no', label: 'No', categories: [] },
        { id: 'e-q2-maybe', label: 'Maybe', categories: [] },
        { id: 'e-q2-yes', label: 'Yes', categories: [] },
      ],
    },
    {
      type: 'mc',
      id: 'e-q3',
      question: 'When it comes to working with technology, what do you enjoy doing the most?',
      choices: [
        {
          id: 'e-q3-operate',
          label: 'Making sure the equipment runs correctly every day',
          categories: ['operate'],
        },
        {
          id: 'e-q3-repair',
          label: 'Figuring out what is broken and fixing it',
          categories: ['repair'],
        },
        {
          id: 'e-q3-program',
          label: 'Building or coding how the technology works',
          categories: ['program'],
        },
        {
          id: 'e-q3-plan',
          label: 'Deciding how the technology should be used in a larger system',
          categories: ['plan'],
        },
      ],
    },
    {
      type: 'statementSort',
      id: 'e-sort',
      statements,
      buckets: [
        { id: 'thats-me', label: "That's me" },
        { id: 'maybe', label: 'Maybe' },
        { id: 'not-me', label: 'Not me' },
      ],
    },
  ],
  // Q3 (1 each) + statements (operate 8 / repair 7 / program 7 / plan 8).
  expectedCategoryMax: { operate: 9, repair: 8, program: 8, plan: 9 },
  resultsCopy: {
    heading: 'Here’s how you match up',
    mapHint: 'The closer a role sits to the center, the more your answers match it. Tap a role to see its job titles, then tap a title to learn more.',
    centerLabel: 'Recommended titles',
    retake: 'Start over',
    sheet: {
      activities: 'Job activities',
      education: 'Education',
      titles: 'Common job titles',
      salary: 'Salary',
      fit: 'How you fit',
      addToProfile: 'Add this Role to your profile',
    },
  },
};
