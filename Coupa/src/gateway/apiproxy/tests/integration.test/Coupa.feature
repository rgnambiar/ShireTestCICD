Feature: As a Coupa API consumer, I want to get Coupa Detils
	
	Scenario: The Coupa API should respond with 200
     Given I set headers to
      | name          	     | value            |
      | X-API-KEY	     |akGCWyEVNehTc9dFQ1olLr6YlgFAZFeG|
      | X-APIGEE-CLIENT-NAME |ZYCUS_LATAMPO|
      | Content-Type  	     | application/xml |

		When I GET /purchase_orders?po_number=12
		Then response code should be 200
		Then response body should contain Success
    
