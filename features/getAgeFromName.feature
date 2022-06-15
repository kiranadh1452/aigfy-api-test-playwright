Feature: Get age from name, country

  
  Scenario: Find age from the name only
    When the user sends a request to apify with name 'Michael'
    Then the response code should be '200'
    And the response body should contain the name 'Michael' and valid age


  Scenario: Find age from name and country
    When the user sends a request to apify with name 'Kiran' and country id 'US'
    Then the response code should be '200'
    And the response body should contain the name 'Kiran' and valid age
    And the response body should contain country id 'US'
