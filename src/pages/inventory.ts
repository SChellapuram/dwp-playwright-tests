import {Page, Locator, expect} from '@playwright/test';

export class InventoryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    bookRow(title: string): Locator {
        return this.page.locator('tr', {hasText: title});
    }

    async expectBookDetails(book: {
        title: string;
        author: string;
        genre: string;
        isbn: string;
        publicationDate: string;
        price: string;
    }) {
        const row = this.bookRow(book.title);
        await expect(row.locator('td').nth(0)).toHaveText(book.title);
        await expect(row.locator('td').nth(1)).toHaveText(book.author);
        await expect(row.locator('td').nth(2)).toHaveText(book.genre);
        await expect(row.locator('td').nth(3)).toHaveText(book.isbn);
        await expect(row.locator('td').nth(4)).toHaveText('08/02/2026');
        await expect(row.locator('td').nth(5)).toHaveText('£' + book.price);
    }

    /**
     * Assert the "Log Out" button is visible on the inventory page.
     */
    async expectLogoutVisible(): Promise<void> {
        await expect(this.page.getByRole('button', {name: 'Log Out'})).toBeVisible();
    }
}
