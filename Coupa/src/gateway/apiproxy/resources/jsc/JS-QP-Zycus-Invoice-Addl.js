 

var offset = context.getVariable("request.queryparam.offset");

if (!!offset){
   context.removeVariable("request.queryparam.offset"); 
   context.setVariable("request.queryparam.offset",offset);
}

var limit = context.getVariable("private.coupa.api.zycus.invoice.limit");

context.setVariable("request.queryparam.limit",limit);
context.setVariable("request.queryparam.status","approved");