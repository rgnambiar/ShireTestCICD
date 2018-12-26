 if (typeof module !== 'undefined') {
      module.exports = buildResponse;
  } else {
       buildResponse();
  }
  
 function buildResponse() {
     var responseContext = context.getVariable("bam.uriContext");
     var accounts = {};
      accounts.accountNumber = context.getVariable("accountNumber");
      accounts.accountStatus = context.getVariable("accountStatus");
      var accountInstallmentData =  JSON.parse(context.getVariable("accountInstallmentData"));
      var accntBalanceAndReinstateInfo = JSON.parse(context.getVariable("accntBalanceAndReinstateInfo"));
      var paymentInformation = JSON.parse(context.getVariable("paymentInformation"));
      var accountCounterData = context.getVariable("accountCounterData").toString();
      print(accountCounterData);
      var response = {};
      var i;
      switch (responseContext)  {
          case "account":
              response.integrityTimestamp = context.getVariable("integrityTimeStamp");
              response.accountDetails = {}
              response.accountDetails.commonDetails = JSON.parse(context.getVariable("accountCommondata"));
              response.accountDetails.generalAccountInfo = JSON.parse(context.getVariable("accountGeneralData"));
              break;
          case "clients":
              response.integrityTimestamp = context.getVariable("integrityTimeStamp");
              response.accounts = accounts;
              response.commonDetails = JSON.parse(context.getVariable("accountCommondata"));
              response.clientData = JSON.parse(context.getVariable("accountClientData"));
              break;
          case "producerInfo":
              response.integrityTimestamp = context.getVariable("integrityTimeStamp");
              response.accounts = accounts;
              response.commonDetails = JSON.parse(context.getVariable("accountCommondata"));
              response.accountProducerData = JSON.parse(context.getVariable("accountProducerData"));
              break;
          case "accountFinancialInfo":
              response.integrityTimestamp = context.getVariable("integrityTimeStamp");
              response.accounts = accounts;
              response.commonDetails = JSON.parse(context.getVariable("accountCommondata"));
              response.accountFinancialInfo = {}
              for(i in accountInstallmentData) response.accountFinancialInfo [i] = accountInstallmentData[i];
              for(i in accntBalanceAndReinstateInfo) response.accountFinancialInfo [i] = accntBalanceAndReinstateInfo[i];
              for(i in paymentInformation) response.accountFinancialInfo [i] = paymentInformation[i];
              break;
          case "accountWarnings":
              response.integrityTimestamp = context.getVariable("integrityTimeStamp");
              response.accounts = accounts;
              response.commonDetails = JSON.parse(context.getVariable("accountCommondata"));
              response.accountWarnings = JSON.parse(context.getVariable("accountWarnings"));
              break;
          case "accountAddtionalInfo":
              response.integrityTimestamp = context.getVariable("integrityTimeStamp");
              response.accounts = accounts;
              response.commonDetails = JSON.parse(context.getVariable("accountCommondata"));
              response.accountAdditionalInfo = JSON.parse(context.getVariable("accountAdditionalInfo"));
              break;
          case "policies" :
              response.integrityTimestamp = context.getVariable("integrityTimeStamp");
              response.accounts = accounts;
              response.commonDetails = JSON.parse(context.getVariable("accountCommondata"));
              response.policyData = JSON.parse(context.getVariable("accountPolicyData"));
              break;
          case "counters" :
              response.integrityTimestamp = context.getVariable("integrityTimeStamp");
              response.accounts = accounts;
              response.commonDetails = JSON.parse(context.getVariable("accountCommondata"));
              if (accountCounterData !== null && accountCounterData.length > 0)
              {
              response.counterData = accountCounterData;
              }
              break;
         }
                 context.setVariable('body',JSON.stringify(response));

  }
