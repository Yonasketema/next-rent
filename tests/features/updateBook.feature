Feature: Updating a book
  # Scenario: Updating a book with valid credentials
  #   Given a valid request to update a book with id "cm0kvyy97001iivgcnvtmnnlv"
  #   And the user with id "cm0kvyv6a0009ivgcto8h4xs4" is authenticated with appropriate permissions
  #   When the PUT request is sent to the endpoint
  #   Then the book should be successfully updated
  #   And the response status should be 200
  # Scenario: Updating a book with invalid credentials
  #   Given a valid request to update a book with id "cm0kvyxpw0016ivgc75il26ot"
  #   And the user with id "cm0kvyv6a0009ivgcto8h4xs4" is not authenticated or lacks permissions
  #   When the PUT request is sent to the endpoint
  #   Then the response should indicate an error
  #   And the response status should be 401

  Scenario Outline: Updating a book with - invalid credentials & invalid credentials
    Given a request to update a book with id <bookId>
    And the user with id <userId> is authenticated
    When the PUT request is sent to the endpoint
    Then the response should indicate an <error>
    And the response status should be <status>

    Examples:
      | bookId                    | userId                    | status | error |
      | cm0kvyy97001iivgcnvtmnnlv | cm0kvyv6a0009ivgcto8h4xs4 |    200 | false |
      | cm0kvyxpw0016ivgc75il26ot | cm0kvyv6a0009ivgcto8h4xs4 |    401 | true  |
