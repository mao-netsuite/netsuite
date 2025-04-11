define(["N/email"], function (email) {
    function send(params) {
        const maximumSupportedRecipients = 10;
        var recipients = params.recipients;
        if (recipients.length > maximumSupportedRecipients) {
            for (var i = 0; i < recipients.length; i += maximumSupportedRecipients) {
                var batchRecipients = recipients.slice(i, i + maximumSupportedRecipients);
                params.recipients = batchRecipients;
                email.send(params);
            }
        } else {
            email.send(params);
        }
    }

    return {
        send: send,
    };
});
