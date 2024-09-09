Feature: Retrieving All Books

  Scenario: User with role of admin attempts to retrieve books
    Given user role "ADMIN"
    When the user tries to retrieve a list of books
    Then the response status 200

  Scenario: User with role of Non-admin attempts to retrieve books
    Given user role "USER"
    When the user tries to retrieve a list of books
    Then the response status 200
