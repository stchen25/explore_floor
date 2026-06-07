import { expect, test } from '@playwright/test';

// The A/B research instrument (DATA_MODEL §16): flipping the landing switcher to Set B swaps
// the whole content bundle — interest cards, bin labels, results copy — and the flow still
// completes. Set B is currently a '[B]'-marked placeholder clone of Set A (landing copy is
// deliberately unmarked — the switcher itself shows the condition), which is exactly what these
// assertions lean on. Also proves the selection survives "Start over" (the researcher should
// not have to re-pick the condition between participants).
test('switching to Set B swaps the content bundle, completes the flow, and survives retake', async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Explore the Floor' })).toBeVisible();

  // Flip the condition — the switcher shows Set B selected (landing copy stays unmarked).
  await page.getByTestId('qset-b').click();
  await expect(page.getByTestId('qset-b')).toHaveAttribute('aria-pressed', 'true');

  await page.getByTestId('start-cta').click();
  await expect(page).toHaveURL(/\/sort$/);

  // Cards and bin labels come from Set B.
  await expect(page.getByTestId('sort-card')).toContainText('[B]');
  await expect(page.getByTestId('sort-keep')).toContainText('[B]');

  const keepBin = page.getByTestId('sort-keep');
  const progress = page.getByTestId('sort-progress');
  for (let i = 1; i <= 23; i++) {
    await keepBin.click();
    await expect(progress).toHaveText(`${i} of 24 sorted`);
  }
  await keepBin.click();
  await expect(page).toHaveURL(/\/results$/, { timeout: 7000 });

  // Results copy comes from Set B; the shared role cards still render.
  await expect(page.getByRole('heading', { name: '[B] Here’s how you match' })).toBeVisible();
  await expect(page.locator('[data-testid^="role-card-"]')).toHaveCount(3);

  // "Start over" returns to Landing with Set B still selected (reset-survival).
  await page.getByTestId('retake').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId('qset-b')).toHaveAttribute('aria-pressed', 'true');

  expect(consoleErrors, `console errors:\n${consoleErrors.join('\n')}`).toEqual([]);
});
