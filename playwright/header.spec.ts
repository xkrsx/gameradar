import { expect, test } from '@playwright/test';

test('header test', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
  expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
  expect(page.getByRole('link', { name: 'Add Event' }).first()).toBeVisible();
  expect(page.getByRole('link', { name: 'Sports' }).first()).toBeVisible();
  expect(
    page.getByRole('link', { name: 'Athletes / Clubs' }).first(),
  ).toBeVisible();
  expect(page.getByRole('link', { name: 'Venues' }).first()).toBeVisible();
});
