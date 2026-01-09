import {test, expect} from '@playwright/test';
import {Login} from '../pages/login';
import {AddBook} from '../pages/addBook';
import {InventoryPage} from '../pages/inventory';
import {expectFieldError, expectErrorSummaryContains} from '../helpers/validation';

const username = process.env.TEST_USERNAME ?? '';
const password = process.env.TEST_PASSWORD ?? '';
if (!username || !password) {
    throw new Error('Missing TEST_USERNAME or TEST_PASSWORD environment variables.');
}

const user = {
    username,
    password
};

const book = {
    title: 'Demo Testing Book',
    author: 'Senior QA Engineer',
    genre: 'Fiction',
    isbn: '1234567890',
    publicationDate: '2026-02-08',
    price: '19.99'
};

test.describe('Books Inventory Mandatory Tests', () => {

    test('Successful journey - login and add a new book', async ({page}) => {
        const login = new Login(page);
        const addBook = new AddBook(page);
        const inventory = new InventoryPage(page);

        await login.navigate();
        await login.login(user.username, user.password);

        await expect(page).toHaveURL(/\/books/);
        await expect(page.getByText('Welcome, Admin!')).toBeVisible();
        await inventory.expectLogoutVisible();

        await addBook.gotoAddBook();
        await addBook.fillBookDetails(
            book.title,
            book.author,
            book.genre,
            book.isbn,
            book.publicationDate,
            book.price
        );

        await addBook.submit();
        await inventory.expectBookDetails(book);
    });

    test('Validation error displayed when adding a book with invalid title', async ({page}) => {
        const login = new Login(page);
        const addBook = new AddBook(page);

        await login.navigate();
        await login.login(user.username, user.password);

        await addBook.gotoAddBook();

        // Fill book details with an overly long title
        await addBook.fillBookDetails(
            'My book with more than twenty characters',
            'Author Name',
            'Fiction',
            '1234567890',
            '2026-01-08',
            '19.99'
        );

        await addBook.submit();

        // Title field error and aria-invalid checked by helper
        await expectFieldError(page, 'title', 'Title cannot exceed 20 characters.');
    });

    test('Validation error when mandatory fields are empty', async ({page}) => {
        const login = new Login(page);
        const addBook = new AddBook(page);

        await login.navigate();
        await login.login(user.username, user.password);

        await addBook.gotoAddBook();
        await addBook.submit();

        const expectedErrors = [
            'Title is required.',
            'Author is required.',
            'Genre is required.',
            'ISBN is required.',
            'Publication Date is required.',
            'Price is required.'
        ];

        // Global error summary assertions via helper
        await expectErrorSummaryContains(addBook.errorSummary, expectedErrors);

        // Field-level errors via helper
        await expectFieldError(page, 'title', 'Title is required.');
        await expectFieldError(page, 'author', 'Author is required.');
        await expectFieldError(page, 'genre', 'Genre is required.');
        await expectFieldError(page, 'isbn', 'ISBN is required.');
        await expectFieldError(page, 'publicationDate', 'Publication Date is required.');
        await expectFieldError(page, 'price', 'Price is required.');
    });
});
