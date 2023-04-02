Feature: Google Search
  
  Scenario: Search for a keyword
    Given I am on the Google homepage
    When I search for "puppies"
    Then I should see search results for "puppies"
