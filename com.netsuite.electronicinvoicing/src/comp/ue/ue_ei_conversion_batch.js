/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * This function is for the user event of the E-Invoice Conversion Batch Record. This is for converting e-documents associated
 * with a batch.
 *
 * Version    Date            Author           Remarks
 * 1.00       16 Nov 2016     esia
 *
 * @NApiVersion 2.1
 * @NScriptType usereventscript
 */

define(["N/task"], function (task) {
    var MR_SCRIPT_ID = "customscript_ei_mr_manual_convert";
    var MR_DEPLOY_ID = "customdeploy_ei_mr_manual_convert";

    function afterSubmit(context) {
        if (context.type == context.UserEventType.CREATE) {
            var ssTask = task.create({ taskType: task.TaskType.MAP_REDUCE });
            ssTask.scriptId = MR_SCRIPT_ID;
            ssTask.deploymentId = MR_DEPLOY_ID;

            try {
                ssTask.submit();
            } catch (e) {
                //silent logging. expected error here is the concurrent run of SS when the status is still 'Pending'
                log.audit(
                    "EI_BATCH_UE",
                    "Concurrent run detected. Details: " + e.stack
                );
            }
        }
    }

    return {
        afterSubmit: afterSubmit,
    };
});
