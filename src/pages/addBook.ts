import {Page} from '@playwright/test';

export class AddBook {
    constructor(private page: Page) {
    }

    async fillBookDetails(
        title: string,
        author: string,
        genre: string,
        isbn: string,
        publicationDate: string,
        price: string
    ) {
        await this.page.locator('#title').fill(title);
        await this.page.locator('#author').fill(author);
        await this.page.locator('#genre').selectOption(genre);
        await this.page.locator('#isbn').fill(isbn);
        await this.page.locator('#publicationDate').fill(publicationDate);
        await this.page.locator('#price').fill(price);
    }

    async submit() {
        await this.page.click('button[type="submit"]');
    }

    async getValidationErrors() {
        return this.page.locator('.error-message');
    }

    async gotoAddBook() {
        // await this.page.click('text=Add Book');
        await this.page.locator('text=Add Book').click();
    }

    get errorSummary() {
        return this.page.locator('div[role="alert"]');
    }

}
