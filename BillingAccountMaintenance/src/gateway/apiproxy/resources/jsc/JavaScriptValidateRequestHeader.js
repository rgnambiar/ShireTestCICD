var validate = {
    requestHdr: function (messageID) {
        aPrint('X-NW-Message-ID:' + messageID);
        var transationIdExists = false;
        if (messageID === null || messageID === undefined) {
            this.throwError('Bad Request', {
                "error": "Message ID request header missing",
                "action": "add X-NW-Message-ID as a request header",
                "detail": "X-NW-Message-ID must be alphanumeric (no special character)"
            },
                400, 'Bad Request');
        } else {
            if (! /^[a-zA-Z0-9-]+$/.test(messageID)) {
                // since the response type is application/json, the error context shouldn't use double quotes in the value.  Single quotes are OK.
                this.throwError('Bad Request', "X-NW-Message-ID header is invalid; must be alphanumeric optionally with dashes ('-')", 400, 'Bad Request');
            }
        }
        context.setVariable('globalMessageId', messageID);
    },

    contentTypeHdr: function (contentType) {
        if (contentType === null || contentType === undefined) {
            this.throwError('Bad Request', 'Content-Type Header is missing', '400', 'Bad Request');
        } else {
            aPrint('_contentTypeHdr: ' + contentType);
            if (contentType !== 'application/json') {
                this.throwError('Bad Request', "Content-Type Header is invalid; 'application/json' expected", 400, 'Bad Request');
            }
        }
    },

    authHdr: function (auth) {
        stubOauth = context.getVariable("request.header.X-NW-Stub-OAuth");
        env = context.getVariable("environment.name");

        if ((stubOauth != "true" || !/^(dev|test)$/.exec(env)) && auth === null || auth === undefined) {
            this.throwError('The user is not authorized to make this request', 'Access Token in request.header.Authorization is missing', '401', 'Unauthorized');
        }
    },

    throwError: function (userMsg, developerMsg, httpStatus, reasonPhrase) {
        if (typeof module == 'undefined') {
            throw new Error(JSON.stringify({
                "userMessage": userMsg,
                "developerMessage": developerMsg,
                "status": httpStatus,
                "reasonPhrase": reasonPhrase
            }));
        }
    }
}

function aPrint (str) {
    if (typeof module === 'undefined' && typeof apigeeEnv === 'undefined') {
        apigeeEnv = context.getVariable("environment.name");
    }

    if (/^(dev|test)$/.exec(apigeeEnv)) {
        print(str);
    }
}

if (typeof module !== 'undefined') {
    module.exports = validate;
} else {
    var messageID = context.getVariable("request.header.X-NW-Message-ID");
    var contentType = context.getVariable("request.header.Content-Type");
    var auth = context.getVariable("request.header.Authorization");
    var apigeeEnv;

    validate.requestHdr(messageID);
    validate.contentTypeHdr(contentType);
    validate.authHdr(auth);
}