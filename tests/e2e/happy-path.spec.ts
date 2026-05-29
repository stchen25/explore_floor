import { expect, test } from '@playwright/test';

// The Phase 0 happy path: land → sort all 24 → auto-advance through build → results with
// three role cards, and no console errors anywhere along the way.
test('landing → sort all 24 → build → results shows three role cards', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Explore the Floor' })).toBeVisible();

  await page.getByTestId('start-cta').click();
  await expect(page).toHaveURL(/\/sort$/);

  // Sort every item by clicking its "That's me" (keep) button.
  const keepButtons = page.locator('[data-testid^="keep-"]');
  await expect(keepButtons).toHaveCount(24);
  const count = await keepButtons.count();
  for (let i = 0; i < count; i++) {
    await keepButtons.nth(i).click();
  }

  // Completing the sort auto-advances to /build (1s pass-through) then /results.
  await expect(page).toHaveURL(/\/results$/, { timeout: 5000 });

  await expect(page.getByTestId('role-card')).toHaveCount(3);
  await expect(page.getByTestId('robot-placeholder')).toBeVisible();

  expect(consoleErrors, `console errors:\n${consoleErrors.join('\n')}`).toEqual([]);
});
