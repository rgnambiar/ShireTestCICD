
function parseJWT() {

  var jwt = context.getVariable("accesstoken.jwt");
  var realm = context.getVariable("accesstoken.realm");
  
  var validGroup = context.getVariable("LDAP-Groups");
  var validLDAPGrp = validGroup.split(';');
  
  var acct_num = context.getVariable("bam.account_number");

  var jwtPartsArray = jwt.split(".");
  var jwtHeader = jwtPartsArray[0];
  var jwtBodyBillingAccounts = jwtPartsArray[1];
  
   // decode the body part so we can access it's values
  var bodyDecoded = Base64.decode(jwtBodyBillingAccounts);
  var body = JSON.parse(bodyDecoded);
  
  var itr_acct;
  var authorizedUser = false;
 
  if(realm === 'member'){
   if (body.hasOwnProperty('agreements')) {
		for(var i=0; i<body.agreements.length; i++){
		    itr_acct = (body.agreements[i].agreement_number).replace( /\s/g, "").toUpperCase();
		    print("acct in jwt is " +itr_acct, "incoming acct is " +acct_num);
			if(itr_acct === acct_num){
			    print ("acct found ");
				authorizedUser = true;
		    	}
	    	}
        }
  }else if(realm === 'employee'){
    if (body && body.groups && body.groups.length > 0) {
		for(var j=0; j<body.groups.length; j++){
		    
		    if(validLDAPGrp.indexOf(body.groups[j]) != -1){

                print("authorized LDAP group found");
                authorizedUser = true;
                
                }
		    }
        } 
 
  }else {
      authorizedUser = false;
  }
		
	if(authorizedUser === false){
            print ("failed AAA");
            throwError('Unauthorized', "User is not authorized to access this account", 403, 'Unauthorized');
        }

}

function throwError(userMsg, developerMsg, httpStatus, reasonPhrase) {
      var messageID = context.getVariable("request.header.X-NW-Message-ID");
      
        if (typeof module == 'undefined') {
            throw new Error(JSON.stringify({
                "userMessage": userMsg,
                "developerMessage": developerMsg,
                "status": httpStatus,
                "reasonPhrase": reasonPhrase
            }));
        }
    }

if (typeof module !== 'undefined') {
  Base64 = require('./base64.js');
  module.exports = parseJWT;
} else {
  var apigeeEnv;
  parseJWT();
}