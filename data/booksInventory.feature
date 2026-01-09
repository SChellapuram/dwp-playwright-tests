Feature: Books Inventory Application - Test Cases
  As a librarian
  I want to manage books in the inventory
  So that the system works correctly and errors are handled

  # Mandatory Test Cases

  Scenario: Successful journey - login and add a new book
    Given I am logged in as a valid user
    And I am on the Books Inventory page
    When I click "Add Book"
    And I fill in "Title", "Author", and "ISBN" fields
    And I click "Save"
    Then I should see the new book listed in the inventory

  Scenario: Validation error when mandatory fields are empty
    Given I am logged in as a valid user
    And I am on the Add Book page
    When I click "Save" without entering mandatory fields
    Then I should see an error message for each required field


  # Optional / Additional Test Cases

  Scenario: Edit an existing book
    Given a book exists in the inventory
    When I click "Edit" on the book
    And I change the "Title" field
    And I click "Save"
    Then the updated title should be visible in the inventory

  Scenario: Delete a book from the inventory
    Given a book exists in the inventory
    When I click "Delete" on the book
    And I confirm deletion
    Then the book should no longer appear in the inventory

  Scenario: Add a book with optional fields blank
    Given I am logged in as a valid user
    And I am on the Add Book page
    When I fill in only mandatory fields
    And I click "Save"
    Then the book should be added successfully
    And optional fields should be empty

  Scenario: Search for a book
    Given multiple books exist in the inventory
    When I enter a search term in the search bar
    Then only books matching the search term should be displayed

  Scenario: Sort books by title
    Given multiple books exist in the inventory
    When I click "Sort by Title"
    Then the books should be displayed in alphabetical order

  Scenario: Pagination of book list
    Given more than 10 books exist in the inventory
    When I navigate to the next page
    Then the next set of books should be displayed

  Scenario: Duplicate ISBN error
    Given a book exists in the inventory
    When I try to add another book with the same ISBN
    And I click "Save"
    Then I should see an error message indicating "ISBN already exists"

  Scenario: Verify all fields on the homepage
    Given I am logged in as a valid user
    And I am on the Books Inventory homepage
    Then I should see the following fields visible:
      | Title                  |
      | Author                 |
      | ISBN                   |
      | Description (optional) |
      | Add Book button        |
      | Search bar             |
      | Sort options           |
