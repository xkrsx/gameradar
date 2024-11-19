import { expect, test } from '@playwright/test';

test.describe('LinkCard Component', () => {
  test('should display a link with correct title and href', async ({
    page,
  }) => {
    const mockTitle = 'Test Link';
    const mockUrl = 'https://example.com';

    // Navigate to your page (assumes the component is rendered there)
    await page.goto('http://localhost:3000'); // Update this URL to match your local dev server or deployed app

    // Find the link by text and assert that the href is correct
    const linkElement = await page.locator('a.link-card-title');
    await expect(linkElement).toHaveText(mockTitle);
    await expect(linkElement).toHaveAttribute('href', mockUrl);
  });

  test('should have correct URL when rendered with another link', async ({
    page,
  }) => {
    const mockTitle = 'Another Test Link';
    const mockUrl = 'https://another-example.com';

    // Navigate to your page
    await page.goto('http://localhost:3000'); // Update this URL accordingly

    // Find the link and check its properties
    const linkElement = await page.locator('a.link-card-title');
    await expect(linkElement).toHaveText(mockTitle);
    await expect(linkElement).toHaveAttribute('href', mockUrl);
  });
});
