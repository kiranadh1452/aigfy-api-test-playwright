Feature: Get age from name, country

  
  Scenario: Find age from the name only
    When the user sends a request to apify with name 'Michael'
    Then the response code should be '200'
    And the response body should contain age