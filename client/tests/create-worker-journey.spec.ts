import { expect, test } from '@playwright/test';
import { API_BASE_URL } from './constants';
import { createWorkerFixture } from './fixtures/test-workers';
import {
  clickViewButton,
  fillWorkerForm,
  getWorkerRow,
} from './utils/create-worker-journey.utils';

test.describe('Onboarding worker view journey', () => {
  test.setTimeout(90_000);

  const worker = createWorkerFixture();

  test.afterAll(async ({ request }) => {
    await request.delete(`${API_BASE_URL}/test/deleteTestWorker`, {
      data: { email: worker.email },
      failOnStatusCode: false,
    });
  });

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
  });
});
