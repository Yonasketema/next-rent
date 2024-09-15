Feature: posting a book

  Scenario Outline: posting a book with - invalid credentials & invalid credentials
    Given a request to create a book with a user id <userId>
    When the POST request is sent to the endpoint
    Then the response should indicate an <error> createBook
    And the response status should be <status> createBook

    Examples:
      | userId                    | status | error |
      | cm0kvyvf7000fivgc2zxsbbb8 |    201 | false |
      | cm0kvyv020005ivgc3xcybpy7 |    401 | true  |
      | cm0uvjpv5000029bi51y32ttf |    401 | true  |
