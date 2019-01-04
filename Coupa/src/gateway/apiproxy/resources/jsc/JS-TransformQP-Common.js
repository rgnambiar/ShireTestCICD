var queryParamsList = request.queryParams;

for (var queryParam in queryParamsList) {

    if (queryParam.includes(".")) {

        var val, qp, n, n1, fields;

        // Get the value of the query parameter
        val = context.getVariable("request.queryparam." + queryParam);

        qp = queryParam.split(".");

        if (qp.length > 0) {
            n = "[" + qp[1] + "]";

            if (!!qp[2]) {
                n1 = "[" + qp[2] + "]";
                n = n + n1;
            }

            // Remove the query parameter
            context.removeVariable("request.queryparam." + queryParam);

            context.setVariable("request.queryparam." + qp[0] + n, val);
        }

    }

}