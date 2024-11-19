import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('img', { name: 'GameRadar Logo' })).toBeVisible();
  expect(
    page.getByRole('link', { name: 'Check all the Events' }),
  ).toBeVisible();
  expect(page.getByRole('link', { name: 'Add your own Event' })).toBeVisible();
  expect(
    page.getByRole('link', { name: 'Browse list of all Sports' }),
  ).toBeVisible();
  expect(
    page.getByRole('link', { name: 'Looking for Athletes / Clubs?' }),
  ).toBeVisible();
  expect(
    page.getByRole('link', { name: 'See events happening in each' }),
  ).toBeVisible();
});
