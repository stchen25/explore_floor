import { expect, test } from '@playwright/test';

import { narrativeFlow } from '../../src/data/flows/narrativeFlow';
import { calculateCategoryScores } from '../../src/lib/categoryScoring';

// The Narrative study flow (DATA_MODEL §17): switch the condition on Landing, answer the
// intro questions (taking the Q1 "No" branch — Q2 must be skipped), tap through all seven
// scenes picking the program choice every time, and land on the category results with
// percentages that match the scoring engine. Retake keeps the condition selected.

// The exact path this spec walks, scripted against the live data.
const answers: Record<string, string> = {
  'n-q1': 'n-q1-no', // branches over n-q2
  'n-q3': 'n-q3-60',
  'n-q4': 'n-q4-typing',
  'n-q5': 'n-q5-solving',
  'n-s1': 'n-s1-program',
  'n-s2': 'n-s2-program',
  'n-s3': 'n-s3-program',
  'n-s4': 'n-s4-program',
  'n-s5': 'n-s5-program',
  'n-s6': 'n-s6-program',
  'n-s7': 'n-s7-program',
};

const labelFor = (stepId: string): string => {
  const step = narrativeFlow.steps.find((s) => s.id === stepId);
  if (!step || step.type === 'statementSort') throw new Error(`bad step ${stepId}`);
  const choice = step.choices.find((c) => c.id === answers[stepId]);
  if (!choice) throw new Error(`bad choice for ${stepId}`);
  return choice.label;
};

test('narrative: branch over Q2, tap through all scenes, results match the engine, condition survives retake', async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  await page.goto('/');
  await page.getByTestId('flow-narrative').click();
  await expect(page.getByTestId('flow-narrative')).toHaveAttribute('aria-pressed', 'true');

  await page.getByTestId('start-cta').click();
  await expect(page).toHaveURL(/\/flow$/);

  // Intro questions. Q1 = No branches straight to Q3 — Q2 ("How long?") must never appear.
  await expect(page.getByRole('heading', { name: 'Are you planning on going to college?' })).toBeVisible();
  await page.getByRole('button', { name: labelFor('n-q1'), exact: true }).click();
  await expect(page.getByRole('heading', { name: 'How long?' })).not.toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'What is the lowest salary you would feel satisfied with?' }),
  ).toBeVisible();
  await page.getByRole('button', { name: labelFor('n-q3'), exact: true }).click();
  await page.getByRole('button', { name: labelFor('n-q4'), exact: true }).click();
  await page.getByRole('button', { name: labelFor('n-q5'), exact: true }).click();

  // Seven scenes: the scene card is tappable (the drag has its own zone), one pick each.
  for (const sceneId of ['n-s1', 'n-s2', 'n-s3', 'n-s4', 'n-s5', 'n-s6', 'n-s7']) {
    await expect(page.getByTestId('scene-zone')).toBeVisible();
    await page.getByTestId('scene-card').filter({ hasText: labelFor(sceneId) }).click();
  }

  // Category results: the node graph. The top match (program → Specialist) is named at the top
  // and starts front-and-center; displayed percentages equal the engine's read of the answers.
  await expect(page).toHaveURL(/\/results$/, { timeout: 7000 });
  const expected = calculateCategoryScores(narrativeFlow, answers, {});
  expect(expected.primaryCategory).toBe('program'); // every scene pick was program
  await expect(page.getByRole('heading', { name: 'Specialist' })).toBeVisible();
  for (const category of ['operate', 'repair', 'program', 'plan'] as const) {
    await expect(page.getByTestId(`category-pct-${category}`)).toHaveText(
      `${expected.matchPercentages[category]}%`,
    );
  }

  // The active category's job titles branch off the front — tap one for the role sheet
  // (RC.org content + fit radar), then close it.
  await page.getByTestId('title-node').filter({ hasText: 'Robotics Specialist' }).click();
  await expect(page.getByTestId('role-sheet')).toBeVisible();
  await expect(page.getByTestId('role-sheet')).toContainText('Specialist');
  await expect(page.getByTestId('role-sheet')).toContainText('national median $105,000/yr');
  await expect(page.getByTestId('fit-radar')).toBeVisible();
  await page.getByTestId('sheet-close').click();
  await expect(page.getByTestId('role-sheet')).not.toBeVisible();

  // Tapping a behind-node swaps it into the center: the heading and its branched titles update.
  await page.getByTestId('category-node-repair').click();
  await expect(page.getByRole('heading', { name: 'Technician' })).toBeVisible();
  await expect(page.getByTestId('title-node').filter({ hasText: 'Automation Technician' })).toBeVisible();

  // "Start over" returns to Landing with the condition still selected (reset-survival).
  await page.getByTestId('retake').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId('flow-narrative')).toHaveAttribute('aria-pressed', 'true');

  expect(consoleErrors, `console errors:\n${consoleErrors.join('\n')}`).toEqual([]);
});
