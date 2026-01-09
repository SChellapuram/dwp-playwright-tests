
# Books Inventory Application – Test Automation

## Overview

This project contains automated tests for the **Books Inventory Application**.
The goal is to validate the application against business requirements, focusing on:

* **User authentication** (login)
* **Book management** (add, edit, delete)
* **Validation and error handling** for invalid input

Tests are implemented using **Playwright** with **TypeScript**, following a **Page Object Model (POM)** structure.

---

## Tech Stack

* **Language:** TypeScript
* **Test Framework:** Playwright Test
* **Test Type:** UI end-to-end testing
* **Browsers Tested:** Chromium (Chrome), optional Firefox & WebKit

---

## Test Scope

The test suite covers:

* Authorized user login
* Navigation to the Books Inventory page
* Happy-path user journey: **login → add book**
* Validation of mandatory fields and error messages
* Optional scenarios: edit, delete, search, sort, pagination, homepage field verification

---

## Mandatory User Journeys (Automation Covered)

* Login with valid credentials
* Add a new book with valid data 
* Verify the book appears in the list
* Verify error messages are displayed to the user when adding a book with invalid data.

Feature file: [`booksInventory.feature`](data/booksInventory.feature)

---

## Optional User Scenarios (note: added test cases only for demonstration)

* Edit an existing book
* Delete a book
* Search and sort functionality
* Pagination verification
* Verify all fields on the homepage

Feature file: [`booksInventory.feature`](data/booksInventory.feature)

---

## Validation Coverage

* Attempt to add a book with missing or invalid data
* Verify appropriate error messages are displayed
* Ensure invalid books are not added to the inventory

---

## Environment Configuration

Environment-specific values are stored in a `.env` file:

```env
BASE_URL=https://frontendui-librarysystem.onrender.com
TEST_USER_USERNAME=xxxx
TEST_USER_PASSWORD=xxxx
```

* `BASE_URL` is used for navigation
* Test user credentials are used for login
* Loaded via `dotenv` in `playwright.config.ts` and test files

**Tip:** You can create separate `.env` files for different environments (dev, staging, prod) and load them dynamically.

---

## Assumptions

* Single **admin user** role for testing
* Tests rely on **Playwright auto-waits** for slower API responses
* Base URL and credentials are valid and accessible

---

## Known Gaps / Observations

* No role-based access control beyond admin
* No confirmation messages after add/edit/delete actions
* Validation rules are not fully documented
* Logout functionality is not working as expected
---

## Project Structure

```
dwp-playwright-tests/
├── src/
│   ├── tests/               # All test specs
│   ├── pages/               # Page Objects (POM)
│   └── helpers/             # Reusable utilities/assertions
├── data/                    # Test data (optional but useful)
├── playwright.config.ts     # Playwright config
├── package.json             # Scripts and dependencies
├── tsconfig.json            # TS config
├── .env                     # Environment variables
└── README.md                # How to install/run tests
```

---

## How to Run Tests

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

3. Run all tests:

```bash
npx playwright test
```

4. Run tests **headed** (browser visible):

```bash
npx playwright test --headed
```

5. View **HTML test report**:

```bash
npx playwright show-report
```

---

## Notes

* Tests use **Page Object Model** for maintainability and reusability
* Base URL and credentials are configurable via `.env`
* Tests are **parallelizable** and include **traces, screenshots, and videos** on failures
* All mandatory and optional journeys are clearly documented

---