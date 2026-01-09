import { Page, Locator, expect } from '@playwright/test';

export async function expectFieldError(page: Page, id: string, message: string) {
    await expect(page.locator(`#${id}-error`)).toHaveText(message);
    await expect(page.locator(`#${id}`)).toHaveAttribute('aria-invalid', 'true');
}

export async function expectErrorSummaryContains(summary: Locator, errors: string[]) {
    await expect(summary).toBeVisible();
    await expect(summary).toContainText('Please correct the following errors:');
    for (const err of errors) {
        await expect(summary).toContainText(err);
    }
}
