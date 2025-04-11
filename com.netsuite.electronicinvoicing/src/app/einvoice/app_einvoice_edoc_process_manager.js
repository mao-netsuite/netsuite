/**
 *@NApiVersion 2.x
 */
define([
    "N/url",
    "N/https",
    "../../lib/constants",
    "N/record",
    "N/search",
], function (url, https, constants, record, search) {
    function EdocumentProcess(processAdapter) {
        this.adapter = processAdapter;
        this.start = function () {
            var suiteletServicesDetails =
                this.adapter.getSuiteletServiceDetails();
            try {
                suiteletServicesDetails.forEach(function (service) {
                    var success = callService(service);
                    if (!success) {
                        throw new Error(
                            JSON.stringify({
                                name: "Error in " + service.name,
                                message: "Error in " + service.deploymentId,
                            })
                        );
                    }
                });
            } catch (e) {
                log.error(
                    "EDOC_PROCESS_ERROR",
                    e.name + "\n" + e.message + "\n" + e.stack
                );
                return new EdocumentProcessResponse(false, "Failed");
            }
            return new EdocumentProcessResponse(true, "Completed");
        };
        function callService(service) {
            var avalaraMandateFldVal;
            var EDOC_STATUS_FIELD = "custbody_psg_ei_status";
            var NSEB_AVALARA_MANDATE_FIELD = "custbody_nseb_avalara_mandate";
            var INVOICE = record.Type.INVOICE;
            var CREDIT_MEMO = record.Type.CREDIT_MEMO;
            var READY_F0R_SENDING = "3";
            var SENDING_FAILED = "8";
            var tranType = service.bodyParams.transType;
            if (service.name === constants.EDOC_PROCESS.CERTIFICATION) {
                if (tranType === INVOICE || tranType === CREDIT_MEMO) {
                    var tranRec = record.load({
                        type: tranType,
                        id: service.bodyParams.transId,
                    });
                    avalaraMandateFldVal = tranRec.getValue(
                        NSEB_AVALARA_MANDATE_FIELD
                    );
                }
                if (
                    service.bodyParams.certSendingMethodId === undefined &&
                    !avalaraMandateFldVal
                ) {
                    return true;
                }
            }

            if (service.name === constants.EDOC_PROCESS.SENDING) {
                service.bodyParams.certSendingMethodId = undefined;
                var eiStatusSearch = search.lookupFields({
                    type: tranType,
                    id: service.bodyParams.transId,
                    columns: [EDOC_STATUS_FIELD],
                });
                var eiStatus = eiStatusSearch[EDOC_STATUS_FIELD][0].value;
                if (
                    !(
                        eiStatus === READY_F0R_SENDING ||
                        eiStatus === SENDING_FAILED
                    )
                ) {
                    return true;
                }
            }

            var suiteletURL = url.resolveScript({
                scriptId: service.scriptId,
                deploymentId: service.deploymentId,
                returnExternalUrl: true,
            });
            var response = https.post({
                async: false,
                url: suiteletURL,
                body: {
                    transId: service.bodyParams.transId,
                    transType: tranType,
                    certSendingMethodId: service.bodyParams.certSendingMethodId,
                    userId: service.bodyParams.userId,
                    locale: service.bodyParams.locale,
                    isAvalara: avalaraMandateFldVal ? true : false,
                },
            });

            try {
                var responseBody = JSON.parse(response.body);
                if (!responseBody.success) {
                    log.error("Error in " + service.name, responseBody.message);
                    return false;
                }
                return responseBody.success;
            } catch (e) {
                log.error(
                    "JSON Parsing error",
                    "Error in parsing response from service " +
                        service.deploymentId
                );
                log.error(e.name, e.message + "\n" + e.stack);
                return false;
            }
        }
    }
    function EdocumentProcessResponse(success, message) {
        var EIP_COMPLETE_CODE = "ei.eip.msg.completed";
        var EIP_FAILED_CODE = "ei.eip.msg.failed";
        this.success = success;
        this.message = message;
        this.data = {
            messageCode: success ? EIP_COMPLETE_CODE : EIP_FAILED_CODE,
            messageType: success ? "c" : "e",
        };
    }

    return EdocumentProcess;
});
