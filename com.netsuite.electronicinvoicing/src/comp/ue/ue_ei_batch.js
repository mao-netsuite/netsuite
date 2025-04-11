/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 *
 * This function is for the user event of the E-Invoice Batch Record. This is for sending the e-invoices associated
 * with a batch.
 *
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Oct 2015         ldimayuga
 *
 *
 * @NApiVersion 2.1
 * @NScriptName E-Invoicing Batch UE
 * @NScriptId _ei_batch_ue
 * @NScriptType usereventscript
 */

define(["N/task", "N/record"], function (task, record) {
    var MR_SCRIPT_ID = "customscript_ei_mr_einv_sending";
    var MR_DEPLOY_ID = "customdeploy_ei_mr_einv_sending";

    var RECORD_TYPE = "customrecord_psg_ei_sending_batch";

    function afterSubmit(context) {
        if (context.type == context.UserEventType.CREATE) {
            var newRecord = context.newRecord;
            var batchId = newRecord.id;

            var batchRecord = record.load({
                type: RECORD_TYPE,
                id: batchId,
            });

            var batchOwner = batchRecord.getValue("owner");

            var ssTask = task.create({ taskType: task.TaskType.MAP_REDUCE });
            ssTask.scriptId = MR_SCRIPT_ID;
            ssTask.deploymentId = MR_DEPLOY_ID;
            ssTask.params = {
                custscript_ei_sending_batch_id: batchId,
                custscript_ei_sending_batch_owner: batchOwner,
            };

            try {
                ssTask.submit();
            } catch (e) {
                log.error(e.name, e.message + "\n" + e.stack);
            }
        }
    }

    return {
        afterSubmit: afterSubmit,
    };
});
