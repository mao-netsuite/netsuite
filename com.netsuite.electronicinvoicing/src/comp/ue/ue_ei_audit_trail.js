/**
 * @NApiVersion 2.1
 * @NScriptName E-Invoicing Audit Trail UE
 * @NScriptId _ei_audittrail_ue
 * @NScriptType usereventscript
 */

define(["../../lib/translator"], function (translator) {
    function beforeSubmit(context) {
        if (context.type == context.UserEventType.DELETE) {
            var errorParamsName = "EI_CANNOT_DELETE_AUDIT_TRAIL";
            var errorParamsMessage =
                translator.getString(
                    "audittrail.msg.cannotdeleteaudittrail"
                );
            throw new Error(
                errorParamsName + ": " + errorParamsMessage
            );
        }
    }

    return {
        beforeSubmit: beforeSubmit
    }
});