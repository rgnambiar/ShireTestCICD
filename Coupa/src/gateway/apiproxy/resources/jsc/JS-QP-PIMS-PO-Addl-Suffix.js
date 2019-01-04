

var offset = context.getVariable("request.queryparam.offset");
var limit = context.getVariable("request.queryparam.limit");

if (!!offset){
   context.removeVariable("request.queryparam.offset"); 
   context.setVariable("request.queryparam.offset",offset);
}

if (!!limit){
   context.removeVariable("request.queryparam.limit"); 
   context.setVariable("request.queryparam.limit",limit);
}

context.setVariable("request.queryparam.status[not_eq]","closed");