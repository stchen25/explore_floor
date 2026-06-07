import type { CategoryFlow } from '../types';

// The Narrative study flow (DATA_MODEL §17): five intro questions, then a
// day-in-the-life story in seven scenes. Content verbatim from the team's board —
// docs/reference/Narrative Quiz Structure Content Spec.md (Version 1).
//
// Q1–Q3 are background questions: the team intends them to shape the experience,
// but the mapping rationale is unrecovered, so they carry empty `categories` for
// now (DECISIONS D-017 open item). Adding weights later is a data edit only.
// Two choices are flagged `??` on the board and included as-is pending the team:
// "IT club" (scene 4) and "Writing code" (scene 6).

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
      id: 'n-q1',
      prompt: "Let's start with some basic questions...",
      question: 'Are you planning on going to college?',
      choices: [
        { id: 'n-q1-yes', label: 'Yes', categories: [] },
        { id: 'n-q1-no', label: 'No', categories: [], branchTo: 'n-q3' },
      ],
    },
    {
      type: 'mc',
      id: 'n-q2',
      question: 'How long?',
      choices: [
        { id: 'n-q2-short', label: 'Little as possible (1-2 years)', categories: [] },
        { id: 'n-q2-typical', label: 'Typical (4 years)', categories: [] },
        { id: 'n-q2-long', label: 'Long as possible (4+ years)', categories: [] },
        { id: 'n-q2-whatever', label: 'Whatever', categories: [] },
      ],
    },
    {
      type: 'mc',
      id: 'n-q3',
      prompt: 'Keep in mind, the median is $60,000 in the US.',
      question: 'What is the lowest salary you would feel satisfied with?',
      choices: [
        { id: 'n-q3-40', label: '$40,000', categories: [] },
        { id: 'n-q3-60', label: '$60,000', categories: [] },
        { id: 'n-q3-80', label: '$80,000+', categories: [] },
      ],
    },
    {
      type: 'mc',
      id: 'n-q4',
      prompt: 'Workers in robotics do many different things throughout the day...',
      question: 'What would you be happy spending your day doing?',
      choices: [
        { id: 'n-q4-hands', label: 'Doing hands-on work', categories: ['operate', 'repair'] },
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
        { id: 'n-q5-money', label: 'Earning a lot of money', categories: ['plan'] },
        {
          id: 'n-q5-helping',
          label: "Feeling like I'm helping people",
          categories: ['operate', 'repair'],
        },
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
        { id: 'n-s1-repair', label: 'Help my parents make breakfast', category: 'repair' },
        { id: 'n-s1-program', label: 'Write down a step-by-step to-do list', category: 'program' },
        { id: 'n-s1-operate', label: 'Walk my dog', category: 'operate' },
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
        { id: 'n-s3-operate', label: 'Building a diorama', category: 'operate' },
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
        { id: 'n-s5-repair', label: 'Helping my parents with some chores', category: 'repair' },
        { id: 'n-s5-operate', label: 'Playing with Legos', category: 'operate' },
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
        { id: 'n-s6-repair', label: 'Re-do a previous assignment', category: 'repair' },
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
        {
          id: 'n-s7-program',
          label: 'Puzzle-solving game like Portal or Outer Wilds',
          category: 'program',
        },
        { id: 'n-s7-plan', label: 'Strategy game like Civ or TFT', category: 'plan' },
        {
          id: 'n-s7-operate',
          label: 'Building game like Minecraft or Animal Crossing',
          category: 'operate',
        },
        {
          id: 'n-s7-repair',
          label: 'Simulation game like Sims or Cities Skylines',
          category: 'repair',
        },
      ],
    },
  ],
  // Q4 + Q5 (1 each, every category reachable) + 7 scenes (1 each) = 9 per category.
  expectedCategoryMax: { operate: 9, repair: 9, program: 9, plan: 9 },
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
