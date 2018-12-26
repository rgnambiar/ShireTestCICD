var express = require('express'),
	app = express(),
	path = require('path'),
	request = require('request'),
	nockHelper = require('./nock/nock-helper');

var response_xml = "<SOAP-ENV:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:pz5='http://www.PZ5XEIQ.JZ5XEQ.Request.com' xmlns:SOAP-ENV='http://schemas.xmlsoap.org/soap/envelope/'><SOAP-ENV:Body><PZ5XEIQOperationResponse xmlns='http://www.PZ5XEIQ.JZ5XER.Response.com'><billingAccountResponse><billingAccountCommon><soaTransID>01</soaTransID><serviceReturnCode>0000</serviceReturnCode><serviceReturnCodeDescription>Success</serviceReturnCodeDescription><systemDate>2018-02-19</systemDate><systemTime>09.32.06</systemTime><cicsRegionWORName>TOR</cicsRegionWORName><cicsRegionAORName>TCICSBA</cicsRegionAORName><totalElapsedTime>002.104295</totalElapsedTime><debugInfoCommon/></billingAccountCommon><integrityTimestamp>2018-02-19-09.32.06.272510</integrityTimestamp><billingAccountDetail><billingAccountDetailCommon><returnCode>0000</returnCode><returnCodeDescription>Success</returnCodeDescription><errorProgram/><errorNumber/><errorSeverity/><errorLanguage/><errorMessage/><preferenceReturnCode/><preferenceReturnMessage/><preferenceErrorProgram/><elapsedTime>002.056607</elapsedTime><debugInfo/></billingAccountDetailCommon><billingAccountDetailData><generalAccountInfo><accountNumber>6300040809</accountNumber><accountStatus>OK</accountStatus><accountStatusDesc>Active</accountStatusDesc><accountDeliveryEligibility/><accountDeliveryEligDesc/><accountCode/><accountType>Z1</accountType><accountTypeDesc>Monthly</accountTypeDesc><accountState>KY</accountState><accountCancelReasonCode/><accountCancelReasonCodeDesc/><accountBillingStatus/><dateCommenced>10-03-1970</dateCommenced><accountCancelDate>HI-DATE</accountCancelDate><effectiveDate/><accountChannelInd/><accountChannelIndDesc/><accountBrand/><accountBrandDesc/><accountFinancialDiv/><accountFinancialDivDesc/><accountInvoiceDate>10-27-2014</accountInvoiceDate></generalAccountInfo><clientData><clientType/><clientTypeDesc/><clientFirstName/><clientMiddleName/><clientLastName/><clientSuffix/><addresseeLine1/><addresseeLine2/><addresseeLine3/><clientAddressL1/><clientAddressL2/><clientAddressL3/><clientCity/><clientState/><clientZip/><country/><countryText/><county/><CASSBypassStart/><CASSBypassReason/><CASSBypassReasonDesc/><CASSSuccess/><CASSResults/><CASSBarcode/><ecn/><pbcConsentStatus/><paperlessPref/><emailAddress/><addressSystemOfRecord/><addressSystemOfRecordDesc/><bypassNCOA/></clientData><producerInformation><producerState>KY</producerState><producerNumber>0027659</producerNumber><producerName/><producerPhone/><producerServicePlusInd/></producerInformation><installmentandPayInFullinfo><installmentDate>10-20-2014</installmentDate><installmentAmount>280.43</installmentAmount><originalAccountBalance>280.43</originalAccountBalance><accountBalance/><totalUnpaidBalance/><paidDate/><currentInstallFeeAmt>0.00</currentInstallFeeAmt></installmentandPayInFullinfo><accntBalanceAndReinstateInfo><accountDueDate>11-20-2014</accountDueDate><dayOfMonthDue>20</dayOfMonthDue><no1DiaryInd/><remitAmountAll>280.43</remitAmountAll><remitAmtSel/><eftStatementIndicator/><previousBilledAmount>277.97</previousBilledAmount><prevAccountDueDate>09-20-2014</prevAccountDueDate><policyCount>004</policyCount><downPaymentAmount/><billToIndicator/></accntBalanceAndReinstateInfo><paymentInformation><paymentPlan>CM</paymentPlan><paymentPlanDesc>Monthly</paymentPlanDesc><paymentMethod>CPPEP</paymentMethod><paymentMethodDesc>EFT</paymentMethodDesc><lastPaymentDate>09-23-2014</lastPaymentDate><lastPaymentAmount>277.97</lastPaymentAmount><partialPaymentIndicator>N</partialPaymentIndicator><partialPaymentShortAmount/><currentFullPaymentAmount>1,811.71</currentFullPaymentAmount><originalFullPaymentAmount>1,811.71</originalFullPaymentAmount><previousFullPaymentAmount>795.79</previousFullPaymentAmount><policyStatusIndicator/><eftSupressIndicator/><lastPayDate2MonthBill/><lastPayDateWarn>10-25-2014</lastPayDateWarn><recurSuspendDate/><recurDraftDate/></paymentInformation><accountWarningAndMessages><accountMessageIndicator/><remittanceAmountMisc>0.00</remittanceAmountMisc><remittanceAmountFees>0.00</remittanceAmountFees><reinstatementDate/><reinstRejectInd/><accountReinstatementCounter/><accountReturnCounter/><accountReturnItemFeeInd/><accountReturnItemFeeAmt/><accountLateFeeInd/><accountLateFeeAmount/><accountLastWaiveLateFeeAmt/><accountLastWaiveLateFeeDate/><accountLateFeeEligInd/><accountWarningIndicator>N</accountWarningIndicator><ebillEnroll/><bamActionFlag/><accountLevelIndicator/><accountLevelIndicatorDesc/><nextBillEstimatedAmount/><pcAmountFlag/></accountWarningAndMessages><additionalAccountData><estimatedInstallmentFee/><accountCompanyCode>01</accountCompanyCode><accountCompanyCodeDesc>Nationwide Mutual Insurance Company</accountCompanyCodeDesc><accountLineCode>01</accountLineCode><accountSystemId>03</accountSystemId><accountProductType>CPP</accountProductType><accountPaymentAlowdInd>N</accountPaymentAlowdInd><acountPaymentNtAlwdRsn>03</acountPaymentNtAlwdRsn><acountPaymentNtAlwdRsnDesc>EFT/Bankcard Pay Method</acountPaymentNtAlwdRsnDesc><acctSchedulPymtAlowdInd>N</acctSchedulPymtAlowdInd><acctSchedulMaxPymtDateAlwd/><acctSchedulPymtNtAlwdRsn>03</acctSchedulPymtNtAlwdRsn><acctSchedulPymtNtAlwdRsnDesc>EFT/Bankcard Pay Method</acctSchedulPymtNtAlwdRsnDesc><flexConvertedAccount>N</flexConvertedAccount><flexAccountNumber/><moneyHoldFlag/><moneyHoldRejectRsnDesc/><fromAccountCanceled/><fromAccountOutstandingBalance/><toAccountOutstandingBalance/><beginSafeDueDate/><endSafeDueDate/></additionalAccountData><accountErrorFlagInfo><inAccountNumberERFG/><inAccountCodeERFG/><inAccountTypeDescERFG/><inAccountStatusERFG/><inAccountStateERFG/><inDateCommencedERFG/><inAccountCancelDateERFG/><inAccountPayMethodDescERFG/><inStatementDateERFG/><inProducerNumberERFG/><inProducerStateERFG/><inReinstRejectIndERFG/><inAccountDueDateERFG/><inSelectedDueDayERFG/><inEftStatementIndicatorERFG/><inClientFirstNameERFG/><inClientMiddleNameERFG/><inClientLastNameERFG/><inClientSuffixERFG/><inClientTypeERFG/><inClientZipERFG/><inClientCityERFG/><inClientStateERFG/><inCountryERFG/><inCountryTextERFG/><inEftConnectDateERFG/><inEFtEffectiveDateERFG/><inInstitutionERFG/><inFinancialAccountNumberERFG/><inNameOnFinancialAccountERFG/><inFinancialAccountTypeERFG/></accountErrorFlagInfo><counterData/><policyData><policyLineData><productGroupCode>A4</productGroupCode><productGroupCodeDesc>Auto</productGroupCodeDesc><policyLine><policyNumber>6316D 205082</policyNumber><displayPolicyNumber>6316D 205082</displayPolicyNumber><productType/><productTypeDesc/><policyState>KY</policyState><termMonths>06</termMonths><policyTermPremium/><monthlyPremium/><factorMonths/><policyRenewalDate/><policyAmount/><reinstamt/><reinstthrudate/><policyBalance/><policyUnpaidBalance/><cancelReason/><cancelReasonCode/><cancelReasonCodeDesc/><cancelActionCode/><cancelActionCodeDesc/><policyPCFlag/><policyStatus>OK</policyStatus><policyStatusDesc>Active</policyStatusDesc><remittanceDate/><remittanceAmount/><policyCancelDate/><collectRefundStatus/><policyWaitingRenewal/><policyPaidInFull/><reinstFlag/><reinMsgDispflag/><reinstMessage/><policyCompanyCode>01</policyCompanyCode><policyCompanyCodeDesc>Nationwide Mutual Insurance Company</policyCompanyCodeDesc><policyLineCode>01</policyLineCode><productName>AUTO</productName><policySystemId>13</policySystemId><plcyPaymentAllowedInd>N</plcyPaymentAllowedInd><plcyPaymentNtAlowedRsn>06</plcyPaymentNtAlowedRsn><plcyPaymentNtAlowedRsnDesc>Policy is not warned</plcyPaymentNtAlowedRsnDesc><plcySchedulPymtAlowdInd>N</plcySchedulPymtAlowdInd><plcySchedulMaxPymtDateAlwd/><plcySchedulPymtNtAlwdRsn>06</plcySchedulPymtNtAlwdRsn><plcySchedulPymtNtAlwdRsnDesc>Policy is not warned</plcySchedulPymtNtAlwdRsnDesc><plcyPRFlag/><collectionAmt/><snlReinstamt/><snlExpiryDt/><snlDisplayFlag/><snlReinstMessage/><insuringCompCode>008</insuringCompCode><insuringCompCodeDesc>Nationwide Property and Casualty Insurance Company</insuringCompCodeDesc><lastPayDateCancel/><policyEquityDate/><policyChannelInd/><policyChannelIndDesc/><policyBrand/><policyBrandDesc/><nocSentDate/><dateReinstated/><policyInceptionDate/><policyNonRenewalFlag/><policyTransferBookInd/></policyLine><policyErrorFlagInfo><inPolicyNumberERFG/><inDisplayPolicyNumberERFG/><inProductGroupCodeDescERFG/><inPolicyEffectDateERFG/><inPolicyDownPayERFG/><inPolicyTermPremERFG/><inPolicyTermMonthsERFG/><inPolicyRenDateERFG/><inPolicyCompanyDescERFG/><inPolicyProductCodeERFG/><inPolicyResMarketERFG/><inPolicyStateERFG/></policyErrorFlagInfo></policyLineData><policyLineData><productGroupCode>F4</productGroupCode><productGroupCodeDesc>Fire</productGroupCodeDesc><policyLine><policyNumber>6316MP217546</policyNumber><displayPolicyNumber>6316MP217546</displayPolicyNumber><productType/><productTypeDesc/><policyState>KY</policyState><termMonths>12</termMonths><policyTermPremium/><monthlyPremium/><factorMonths/><policyRenewalDate/><policyAmount/><reinstamt/><reinstthrudate/><policyBalance/><policyUnpaidBalance/><cancelReason/><cancelReasonCode/><cancelReasonCodeDesc/><cancelActionCode/><cancelActionCodeDesc/><policyPCFlag/><policyStatus>OK</policyStatus><policyStatusDesc>Active</policyStatusDesc><remittanceDate/><remittanceAmount/><policyCancelDate/><collectRefundStatus/><policyWaitingRenewal/><policyPaidInFull/><reinstFlag/><reinMsgDispflag/><reinstMessage/><policyCompanyCode>01</policyCompanyCode><policyCompanyCodeDesc>Nationwide Mutual Insurance Company</policyCompanyCodeDesc><policyLineCode>01</policyLineCode><productName>PROPERTY</productName><policySystemId>14</policySystemId><plcyPaymentAllowedInd>N</plcyPaymentAllowedInd><plcyPaymentNtAlowedRsn>06</plcyPaymentNtAlowedRsn><plcyPaymentNtAlowedRsnDesc>Policy is not warned</plcyPaymentNtAlowedRsnDesc><plcySchedulPymtAlowdInd>N</plcySchedulPymtAlowdInd><plcySchedulMaxPymtDateAlwd/><plcySchedulPymtNtAlwdRsn>06</plcySchedulPymtNtAlwdRsn><plcySchedulPymtNtAlwdRsnDesc>Policy is not warned</plcySchedulPymtNtAlwdRsnDesc><plcyPRFlag/><collectionAmt/><snlReinstamt/><snlExpiryDt/><snlDisplayFlag/><snlReinstMessage/><insuringCompCode>002</insuringCompCode><insuringCompCodeDesc>Nationwide Mutual Fire Insurance Company</insuringCompCodeDesc><lastPayDateCancel/><policyEquityDate/><policyChannelInd/><policyChannelIndDesc/><policyBrand/><policyBrandDesc/><nocSentDate/><dateReinstated/><policyInceptionDate/><policyNonRenewalFlag/><policyTransferBookInd/></policyLine><policyErrorFlagInfo><inPolicyNumberERFG/><inDisplayPolicyNumberERFG/><inProductGroupCodeDescERFG/><inPolicyEffectDateERFG/><inPolicyDownPayERFG/><inPolicyTermPremERFG/><inPolicyTermMonthsERFG/><inPolicyRenDateERFG/><inPolicyCompanyDescERFG/><inPolicyProductCodeERFG/><inPolicyResMarketERFG/><inPolicyStateERFG/></policyErrorFlagInfo></policyLineData><policyLineData><productGroupCode>A4</productGroupCode><productGroupCodeDesc>Auto</productGroupCodeDesc><policyLine><policyNumber>6316  181287</policyNumber><displayPolicyNumber>6316  181287</displayPolicyNumber><productType/><productTypeDesc/><policyState>KY</policyState><termMonths>06</termMonths><policyTermPremium/><monthlyPremium/><factorMonths/><policyRenewalDate/><policyAmount/><reinstamt/><reinstthrudate/><policyBalance/><policyUnpaidBalance/><cancelReason/><cancelReasonCode/><cancelReasonCodeDesc/><cancelActionCode/><cancelActionCodeDesc/><policyPCFlag/><policyStatus>CN</policyStatus><policyStatusDesc>Cancelled</policyStatusDesc><remittanceDate/><remittanceAmount/><policyCancelDate/><collectRefundStatus/><policyWaitingRenewal/><policyPaidInFull/><reinstFlag/><reinMsgDispflag/><reinstMessage/><policyCompanyCode>01</policyCompanyCode><policyCompanyCodeDesc>Nationwide Mutual Insurance Company</policyCompanyCodeDesc><policyLineCode>01</policyLineCode><productName>AUTO</productName><policySystemId>13</policySystemId><plcyPaymentAllowedInd>N</plcyPaymentAllowedInd><plcyPaymentNtAlowedRsn>11</plcyPaymentNtAlowedRsn><plcyPaymentNtAlowedRsnDesc>Mech reinstate not allowed</plcyPaymentNtAlowedRsnDesc><plcySchedulPymtAlowdInd>N</plcySchedulPymtAlowdInd><plcySchedulMaxPymtDateAlwd/><plcySchedulPymtNtAlwdRsn>06</plcySchedulPymtNtAlwdRsn><plcySchedulPymtNtAlwdRsnDesc>Policy is not warned</plcySchedulPymtNtAlwdRsnDesc><plcyPRFlag/><collectionAmt/><snlReinstamt/><snlExpiryDt/><snlDisplayFlag/><snlReinstMessage/><insuringCompCode>001</insuringCompCode><insuringCompCodeDesc>Nationwide Mutual Insurance Company</insuringCompCodeDesc><lastPayDateCancel/><policyEquityDate/><policyChannelInd/><policyChannelIndDesc/><policyBrand/><policyBrandDesc/><nocSentDate/><dateReinstated/><policyInceptionDate/><policyNonRenewalFlag/><policyTransferBookInd/></policyLine><policyErrorFlagInfo><inPolicyNumberERFG/><inDisplayPolicyNumberERFG/><inProductGroupCodeDescERFG/><inPolicyEffectDateERFG/><inPolicyDownPayERFG/><inPolicyTermPremERFG/><inPolicyTermMonthsERFG/><inPolicyRenDateERFG/><inPolicyCompanyDescERFG/><inPolicyProductCodeERFG/><inPolicyResMarketERFG/><inPolicyStateERFG/></policyErrorFlagInfo></policyLineData><policyLineData><productGroupCode>F4</productGroupCode><productGroupCodeDesc>Fire</productGroupCodeDesc><policyLine><policyNumber>6316PC047950</policyNumber><displayPolicyNumber>6316PC047950</displayPolicyNumber><productType/><productTypeDesc/><policyState>KY</policyState><termMonths>12</termMonths><policyTermPremium/><monthlyPremium/><factorMonths/><policyRenewalDate/><policyAmount/><reinstamt/><reinstthrudate/><policyBalance/><policyUnpaidBalance/><cancelReason/><cancelReasonCode/><cancelReasonCodeDesc>Request from insured</cancelReasonCodeDesc><cancelActionCode>68</cancelActionCode><cancelActionCodeDesc>Request from insured</cancelActionCodeDesc><policyPCFlag/><policyStatus>CN</policyStatus><policyStatusDesc>Cancelled</policyStatusDesc><remittanceDate/><remittanceAmount/><policyCancelDate/><collectRefundStatus/><policyWaitingRenewal/><policyPaidInFull/><reinstFlag/><reinMsgDispflag/><reinstMessage/><policyCompanyCode>01</policyCompanyCode><policyCompanyCodeDesc>Nationwide Mutual Insurance Company</policyCompanyCodeDesc><policyLineCode>01</policyLineCode><productName>PROPERTY</productName><policySystemId>14</policySystemId><plcyPaymentAllowedInd>N</plcyPaymentAllowedInd><plcyPaymentNtAlowedRsn>11</plcyPaymentNtAlowedRsn><plcyPaymentNtAlowedRsnDesc>Mech reinstate not allowed</plcyPaymentNtAlowedRsnDesc><plcySchedulPymtAlowdInd>N</plcySchedulPymtAlowdInd><plcySchedulMaxPymtDateAlwd/><plcySchedulPymtNtAlwdRsn>06</plcySchedulPymtNtAlwdRsn><plcySchedulPymtNtAlwdRsnDesc>Policy is not warned</plcySchedulPymtNtAlwdRsnDesc><plcyPRFlag/><collectionAmt/><snlReinstamt/><snlExpiryDt/><snlDisplayFlag/><snlReinstMessage/><insuringCompCode>002</insuringCompCode><insuringCompCodeDesc>Nationwide Mutual Fire Insurance Company</insuringCompCodeDesc><lastPayDateCancel/><policyEquityDate/><policyChannelInd/><policyChannelIndDesc/><policyBrand/><policyBrandDesc/><nocSentDate/><dateReinstated/><policyInceptionDate/><policyNonRenewalFlag/><policyTransferBookInd/></policyLine><policyErrorFlagInfo><inPolicyNumberERFG/><inDisplayPolicyNumberERFG/><inProductGroupCodeDescERFG/><inPolicyEffectDateERFG/><inPolicyDownPayERFG/><inPolicyTermPremERFG/><inPolicyTermMonthsERFG/><inPolicyRenDateERFG/><inPolicyCompanyDescERFG/><inPolicyProductCodeERFG/><inPolicyResMarketERFG/><inPolicyStateERFG/></policyErrorFlagInfo></policyLineData></policyData></billingAccountDetailData></billingAccountDetail></billingAccountResponse></PZ5XEIQOperationResponse></SOAP-ENV:Body></SOAP-ENV:Envelope> "

/**
	Step 1: nockHelper.generateMocks.
	This will generate records.js to be included in nock/artists.js
	DISABLE after including mocks into artists.js
**/
//nockHelper.generateMocks(true); //IMPORTANT: COMMENT THIS LINE AFTER CAPTURING REQUESTS.
/**
	Step 2: nockHelper.enableNock
**/
// gets executed for every request to the app
app.use(function (req, res, next) {
	"use strict";
	if(req.header('X-Enable-Nock') && req.header('X-Enable-Nock') === 'true') {
		console.log('enabling nock');
		nockHelper.enableNock(true);
	}
	else if(!req.header('X-Enable-Nock') || req.header('X-Enable-Nock') === 'false') {
		//console.log('disabling nock');
		nockHelper.enableNock(false);
	}
	next();
});

app.get('/account/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.get('/clients/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.post('/clients/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.get('/accountFinancialInfo/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.post('/accountFinancialInfo/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.get('/counters/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.post('/counters/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.get('/accountAddtionalInfo/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.post('/accountAddtionalInfo/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.get('/accountWarnings/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.post('/accountWarnings/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.get('/policies/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.post('/policies/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.get('/producerInfo/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.post('/producerInfo/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.post('/account/:account_number', function(req, res){
	"use strict";
	/*eslint no-unused-vars:0 */
	var account_number = req.params.account_number;
	res.header('Content-Type','text/xml');
	res.send (response_xml)
//	request('http://mocktarget.apigee.net/account?account_number' + account_number + '&fmt=json', function (error, response, body) {
//	  if (!error && response.statusCode === 200) {
	  	//console.log(response.headers)
//   	res.writeHead(200, {'Content-Type':'application/json;charset=utf-8',
 //   		'x-nock': response.headers['x-nock'] || 'false'});
//    	res.end(body);
//	  }
//	})
//console.log('enabling nock');
});
app.listen(9000);
