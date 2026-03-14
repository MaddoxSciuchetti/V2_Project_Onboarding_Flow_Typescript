import { APIRequestContext, Page, expect, test } from '@playwright/test';
import { API_BASE_URL } from './constants';
import { createWorkerFixture } from './fixtures/test-workers';
import { WorkerFixture, WorkerListItem } from './types';

const getWorkerRow = (page: Page, fullName: string) =>
  page
    .getByRole('row')
    .filter({ hasText: fullName })
    .filter({ hasText: 'Onboarding' });

const fillWorkerForm = async (page: Page, worker: WorkerFixture) => {
  await page.getByPlaceholder('Vorname').fill(worker.firstName);
  await page.getByPlaceholder('Nachname').fill(worker.lastName);
  await page.getByPlaceholder('Email').fill(worker.email);
  await page.getByPlaceholder('Geburtsdatum DD.MM.YYYY').fill(worker.birthDate);
  await page.getByPlaceholder('Adresse').fill(worker.address);
  await page
    .getByPlaceholder('Eintrittsdatum DD.MM.YYYY')
    .fill(worker.entryDate);
  await page.getByPlaceholder('Position').fill(worker.position);
};

const findWorkerId = async (
  request: APIRequestContext,
  worker: WorkerFixture
) => {
  const response = await request.get(`${API_BASE_URL}/worker/getWorkerData`, {
    failOnStatusCode: false,
  });

  if (!response.ok()) {
    return null;
  }

  const workers = (await response.json()) as WorkerListItem[];
  const createdWorker = workers.find(
    (item) =>
      item.vorname === worker.firstName && item.nachname === worker.lastName
  );

  return createdWorker?.id ?? null;
};

test.describe('Onboarding worker view journey', () => {
  test.setTimeout(90_000);

  const worker = createWorkerFixture();

  test.afterAll(async ({ request }) => {
    const workerId = await findWorkerId(request, worker);

    if (workerId === null) {
      return;
    }

    await request.delete(`${API_BASE_URL}/worker/deleteWorker/${workerId}`, {
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

    await expect(workerRow).toBeVisible();
    await workerRow.hover();

    const viewButton = workerRow.getByRole('button', { name: /Anschauen/i });
    await expect(viewButton).toBeVisible();
    await viewButton.click();

    await expect(page).toHaveURL(/\/user\/\d+/);
    await expect(
      page.locator('header').getByText(worker.fullName, { exact: true })
    ).toBeVisible();
  });
});
