Feature: As a Billing Account Maintenance API consumer, I want to get Account Detils
	
	#This test can be run against the mock and the real backend use the X-Enable-Nock to true
	Scenario: The Billing Account Maintenance API should respond with 200
     Given I set headers to
      | name          | value            |
      | Authorization | Bearer XXX       |
      | X-Enable-Nock | true             |
      | X-NW-Message-ID |BillingAccountMaintenanceTestTR1|
      | client_id     | DSsHVtKiYbOnosJ21GIxKnzGdn8R7Art|
      | Content-Type  | application/json |

		When I GET /account/6300040809
		Then response code should be 200
    Then response body should be valid json
    Then response body should contain Success
	Scenario: The Billing Account Maintenance API should respond with 200
     Given I set headers to
      | name          | value            |
      | Authorization | Bearer XXX       |
      | X-Enable-Nock | true             |
      | X-NW-Message-ID |BillingAccountMaintenanceTestTR1|
      | client_id     | DSsHVtKiYbOnosJ21GIxKnzGdn8R7Art|
      | Content-Type  | application/json |
		When I GET /clients/6300040809
		Then response code should be 200
    Then response body should be valid json
    Then response body should contain Success
	Scenario: The Billing Account Maintenance API should respond with 200
     Given I set headers to
      | name          | value            |
      | Authorization | Bearer XXX       |
      | X-Enable-Nock | true             |
      | client_id     | DSsHVtKiYbOnosJ21GIxKnzGdn8R7Art|
      | X-NW-Message-ID |BillingAccountMaintenanceTestTR1|
      | Content-Type  | application/json |
		When I GET /clients/6300040809
		Then response code should be 200
    Then response body should be valid json
    Then response body should contain Success
	Scenario: The Billing Account Maintenance API should respond with 200
     Given I set headers to
      | name          | value            |
      | Authorization | Bearer XXX       |
      | X-Enable-Nock | true             |
      | X-NW-Message-ID |BillingAccountMaintenanceTestTR1|
      | client_id     | DSsHVtKiYbOnosJ21GIxKnzGdn8R7Art|
      | Content-Type  | application/json |
		When I GET /producerInfo/6300040809
		Then response code should be 200
    Then response body should be valid json
    Then response body should contain Success
	Scenario: The Billing Account Maintenance API should respond with 200
     Given I set headers to
      | name          | value            |
      | Authorization | Bearer XXX       |
      | X-Enable-Nock | true             |
      | X-NW-Message-ID |BillingAccountMaintenanceTestTR1|
      | client_id     | DSsHVtKiYbOnosJ21GIxKnzGdn8R7Art|
      | Content-Type  | application/json |
		When I GET /accountFinancialInfo/6300040809
		Then response code should be 200
    Then response body should be valid json
    Then response body should contain Success
	Scenario: The Billing Account Maintenance API should respond with 200
     Given I set headers to
      | name          | value            |
      | Authorization | Bearer XXX       |
      | X-Enable-Nock | true             |
      | client_id     | DSsHVtKiYbOnosJ21GIxKnzGdn8R7Art|
      | X-NW-Message-ID |BillingAccountMaintenanceTestTR1|
      | Content-Type  | application/json |
		When I GET /accountAddtionalInfo/6300040809
		Then response code should be 200
    Then response body should be valid json
    Then response body should contain Success
	Scenario: The Billing Account Maintenance API should respond with 200
     Given I set headers to
      | name          | value            |
      | Authorization | Bearer XXX       |
      | X-Enable-Nock | true             |
      | X-NW-Message-ID |BillingAccountMaintenanceTestTR1|
      | client_id     | DSsHVtKiYbOnosJ21GIxKnzGdn8R7Art|
      | Content-Type  | application/json |
		When I GET /policies/6300040809
		Then response code should be 200
    Then response body should be valid json
    Then response body should contain Success
	Scenario: The Billing Account Maintenance API should respond with 200
     Given I set headers to
      | name          | value            |
      | Authorization | Bearer XXX       |
      | X-Enable-Nock | true             |
      | X-NW-Message-ID |BillingAccountMaintenanceTestTR1|
      | client_id     | DSsHVtKiYbOnosJ21GIxKnzGdn8R7Art|
      | Content-Type  | application/json |
		When I GET /accountWarnings/6300040809
		Then response code should be 200
    Then response body should be valid json
    Then response body should contain Success
