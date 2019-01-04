 
var apiKeyHeaderName = context.getVariable("private.coupa.api.apikey.header");
context.setVariable('request.header.' + apiKeyHeaderName, context.getVariable("private.coupa.api.apikey.value")); 

var targetURL=context.getVariable("private.coupa.api.endpoint");
// get the path suffix
var pathSuffix = context.getVariable("proxy.pathsuffix");
// get Query string 
var queryString = context.getVariable("request.querystring");

context.setVariable("target.url", targetURL + pathSuffix +"?"+ queryString );
