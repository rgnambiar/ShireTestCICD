var supplier_no = context.getVariable("request.queryparam.supplier_number");

//if (!!supplier_no){
   context.removeVariable("request.queryparam.supplier_number"); 
   context.setVariable("request.queryparam.number",supplier_no);
//}

