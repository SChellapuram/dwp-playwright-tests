import {Page} from '@playwright/test';

export class Login {
    constructor(private page: Page) {
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async login(username: string, password: string) {
        await this.page.fill('input[id="username"]', username);
        await this.page.fill('input[id="password"]', password);
        await this.page.click('button[type="submit"]');
        await this.page.waitForURL('/books');
    }
}
