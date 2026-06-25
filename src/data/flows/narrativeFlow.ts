import type { CategoryFlow } from '../types';

// The Narrative study flow (DATA_MODEL §17): six intro questions, then a
// day-in-the-life story in seven scenes. Content verbatim from the team's board —
// docs/reference/Narrative Quiz Structure Content Spec.md (Version 1, V3 language pass).
//
// Q0 (experience) is an unscored background question (routing parked for later).
// Education (Q1 "college?" + Q2 "how long?") and salary (Q3) now nudge the score on
// the role tier ladder — one point each — mirroring the exam's intro screeners so the
// two instruments stop disagreeing by construction (DECISIONS D-023, parallels D-019):
// level 0 (no college / $40k) → operate, level 1 (1-2 yrs / $60k) → repair,
// level 2 (4+ yrs / $80k+) → program + plan. Q2 "Whatever" stays unscored. These tags
// are a parallel signal to the screener fit line (flows/screeners.ts), kept consistent
// with its levels but not merged. Q4 and Q5 each map exactly one choice per category
// (V3). The two previously `??`-flagged scene choices, "IT club" (scene 4) and
// "Writing code" (scene 6), are now settled.

export const narrativeFlow: CategoryFlow = {
  id: 'narrative',
  kind: 'narrative',
  name: 'Narrative',
  landingCopy: {
    overline: 'RoboticsCareer.org',
    heading: 'Explore the Floor',
    description:
      "Walk through a day in your life, make some choices, and we'll match you to real robotics careers.",
    cta: 'Start the story',
  },
  steps: [
    {
      type: 'mc',
      id: 'n-q0',
      prompt: "Let's start with some basic questions...",
      question: 'Do you have any experience in this field?',
      choices: [
        { id: 'n-q0-yes', label: 'Yes', categories: [] },
        { id: 'n-q0-no', label: 'No', categories: [] },
      ],
    },
    {
      type: 'mc',
      id: 'n-q1',
      question: 'Are you planning on going to college?',
      choices: [
        { id: 'n-q1-yes', label: 'Yes', categories: [] }, // education defers to Q2
        { id: 'n-q1-no', label: 'No', categories: ['operate'], branchTo: 'n-q3' }, // level 0
      ],
    },
    {
      type: 'mc',
      id: 'n-q2',
      question: 'How long?',
      choices: [
        { id: 'n-q2-short', label: 'Little as possible (1-2 years)', categories: ['repair'] }, // level 1
        { id: 'n-q2-typical', label: 'Typical (4 years)', categories: ['program', 'plan'] }, // level 2
        { id: 'n-q2-long', label: 'Long as possible (4+ years)', categories: ['program', 'plan'] }, // level 2
        { id: 'n-q2-whatever', label: 'Whatever', categories: [] }, // noncommittal — unscored (D-023)
      ],
    },
    {
      type: 'mc',
      id: 'n-q3',
      prompt: 'Keep in mind, the median is $60,000 in the US.',
      question: 'What is the lowest salary you would feel satisfied with?',
      choices: [
        { id: 'n-q3-40', label: '$40,000', categories: ['operate'] }, // level 0
        { id: 'n-q3-60', label: '$60,000', categories: ['repair'] }, // level 1
        { id: 'n-q3-80', label: '$80,000+', categories: ['program', 'plan'] }, // level 2
      ],
    },
    {
      type: 'mc',
      id: 'n-q4',
      prompt: 'Workers in robotics do many different things throughout the day...',
      question: 'What would you be happy spending your day doing?',
      choices: [
        { id: 'n-q4-hands', label: 'Doing hands-on work', categories: ['operate'] },
        {
          id: 'n-q4-maintain',
          label: 'Making sure that things are working correctly',
          categories: ['repair'],
        },
        { id: 'n-q4-typing', label: 'Typing on a computer', categories: ['program'] },
        { id: 'n-q4-leading', label: 'Leading others', categories: ['plan'] },
      ],
    },
    {
      type: 'mc',
      id: 'n-q5',
      prompt: 'Okay, one last thing. What will bring you fulfillment?',
      question: 'What do you think will bring you the most happiness?',
      choices: [
        { id: 'n-q5-inspiring', label: 'Inspiring others', categories: ['plan'] },
        {
          id: 'n-q5-helping',
          label: "Feeling like I'm helping people",
          categories: ['repair'],
        },
        { id: 'n-q5-building', label: 'Building', categories: ['operate'] },
        { id: 'n-q5-solving', label: 'Solving difficult problems', categories: ['program'] },
      ],
    },
    {
      type: 'scene',
      id: 'n-s1',
      prompt:
        "Alright, let's get started. Your alarm goes off in the morning. You're getting ready for your first day of school.",
      question: 'How do you start the day?',
      choices: [
        {
          id: 'n-s1-plan',
          label: 'Get dressed in the outfit I planned the night before',
          category: 'plan',
        },
        { id: 'n-s1-repair', label: 'Helping a younger sibling get ready', category: 'repair' },
        { id: 'n-s1-program', label: 'Write down a step-by-step to-do list', category: 'program' },
        { id: 'n-s1-operate', label: 'Make breakfast for myself', category: 'operate' },
      ],
    },
    {
      type: 'scene',
      id: 'n-s2',
      prompt: 'You arrive at school, but have some time to kill.',
      question: 'What do you want to check out in that time?',
      choices: [
        { id: 'n-s2-operate', label: 'Take a look at the shop class', category: 'operate' },
        { id: 'n-s2-program', label: 'Explore the computer lab', category: 'program' },
        {
          id: 'n-s2-plan',
          label: 'Meet with my friends to make some afterschool plans',
          category: 'plan',
        },
        { id: 'n-s2-repair', label: 'Double-check my homework', category: 'repair' },
      ],
    },
    {
      type: 'scene',
      id: 'n-s3',
      prompt:
        'The bell rings so you head to class. Your teacher hands you a handout of all the assignments for that year.',
      question: 'What are you most excited for?',
      choices: [
        { id: 'n-s3-plan', label: 'Taking the lead on a group project', category: 'plan' },
        { id: 'n-s3-operate', label: 'Building a 3D model', category: 'operate' },
        { id: 'n-s3-repair', label: 'Being a tutor to a younger student', category: 'repair' },
        {
          id: 'n-s3-program',
          label: 'Solving some difficult math problems',
          category: 'program',
        },
      ],
    },
    {
      type: 'scene',
      id: 'n-s4',
      prompt: "It's lunch time! You usually spend this time with the club you are a part of.",
      question: 'Where will you be?',
      choices: [
        { id: 'n-s4-operate', label: 'Shop club', category: 'operate' },
        { id: 'n-s4-program', label: 'Computer science club', category: 'program' },
        { id: 'n-s4-plan', label: 'Debate club', category: 'plan' },
        { id: 'n-s4-repair', label: 'IT club', category: 'repair' },
      ],
    },
    {
      type: 'scene',
      id: 'n-s5',
      prompt: "You're back home after a long day of school.",
      question: 'What are you doing around the house?',
      choices: [
        { id: 'n-s5-program', label: 'Coding a game', category: 'program' },
        { id: 'n-s5-repair', label: 'Fix your bike', category: 'repair' },
        { id: 'n-s5-operate', label: 'Assemble a bird house', category: 'operate' },
        { id: 'n-s5-plan', label: 'Planning the rest of my week', category: 'plan' },
      ],
    },
    {
      type: 'scene',
      id: 'n-s6',
      prompt: 'You have to do some homework.',
      question: 'Which assignment would you want to complete the most?',
      choices: [
        { id: 'n-s6-plan', label: 'Working on my presentation', category: 'plan' },
        { id: 'n-s6-repair', label: 'Editing an essay', category: 'repair' },
        { id: 'n-s6-program', label: 'Writing code', category: 'program' },
        { id: 'n-s6-operate', label: 'Make 10 posters for a club event', category: 'operate' },
      ],
    },
    {
      type: 'scene',
      id: 'n-s7',
      prompt: 'You finally have some time to relax. You decide to play a video game.',
      question: 'What are you playing?',
      choices: [
        { id: 'n-s7-program', label: 'Puzzle-solving game', category: 'program' },
        { id: 'n-s7-plan', label: 'Strategy game', category: 'plan' },
        { id: 'n-s7-operate', label: 'Building game', category: 'operate' },
        { id: 'n-s7-repair', label: 'Simulation games', category: 'repair' },
      ],
    },
  ],
  // Intro (+2 each: operate from Q1+Q3, repair/program/plan from Q2+Q3) + Q4 + Q5 (1 each)
  // + 7 scenes (1 each) = 11 per category. computeCategoryMax sums each step's per-category
  // presence over all steps, so the Q1/Q2 branch split doesn't change the ceiling.
  expectedCategoryMax: { operate: 11, repair: 11, program: 11, plan: 11 },
  resultsCopy: {
    heading: 'Here’s how your day matches up',
    mapHint: 'Tap another role to bring it front and center, then tap a job title to learn more.',
    centerLabel: 'Your top match',
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
