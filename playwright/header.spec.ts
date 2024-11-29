import { expect, test } from '@playwright/test';

test('header test', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Add Event' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Sports' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Athletes / Clubs' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Venues' }).first(),
  ).toBeVisible();
});
