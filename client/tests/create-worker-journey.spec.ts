import { expect, test } from '@playwright/test';
import { createWorkerFixture } from './fixtures/test-workers';
import {
  clickViewButton,
  fillWorkerForm,
  getWorkerRow,
} from './utils/create-worker-journey.utils';

test.describe('Onboarding worker view journey', () => {
  test.setTimeout(90_000);

  const worker = createWorkerFixture();

  test('creates an onboarding worker, opens the worker view, and shows the worker name in the page header', async ({
    page,
  }) => {
    await page.goto('/worker-lifycycle');
    await expect(page).toHaveURL(/\/worker-lifycycle$/);

    await page.getByRole('button', { name: /Handwerker hinzufügen/i }).click();
    await page.locator('label', { hasText: 'Onboarding' }).click();

    await expect(
      page.getByRole('heading', { name: /Eingabe Onboarding/i })
    ).toBeVisible();

    await fillWorkerForm(page, worker);
    await page.getByRole('button', { name: /^Hinzufügen$/i }).click();

    const workerRow = getWorkerRow(page, worker.fullName);

    await clickViewButton(page, workerRow);

    await expect(
      page.locator('header').getByText(worker.fullName, { exact: true })
    ).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/worker-lifycycle$/);

    const createdWorkerRow = getWorkerRow(page, worker.fullName);
    await expect(createdWorkerRow).toBeVisible();

    const actionsTrigger = createdWorkerRow.getByRole('button', {
      name: /Löschen Aktionen öffnen/i,
    });
    await expect(actionsTrigger).toBeVisible();
    await actionsTrigger.click();

    const deleteMenuItem = page.getByRole('menuitem', { name: /Löschen/i });
    await expect(deleteMenuItem).toBeVisible();
    await deleteMenuItem.click();

    await expect(createdWorkerRow).not.toBeVisible();
  });
});
