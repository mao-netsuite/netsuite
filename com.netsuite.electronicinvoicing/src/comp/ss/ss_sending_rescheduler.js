/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       23 Mar 2016     aalcabasa
 *
 * @NApiVersion 2.1
 * @NScriptName E-Document Sending Rescheduler
 * @NScriptId _ei_sending_rescheduler
 * @NScriptType ScheduledScript
 *
 */
define(["N/task", "../../data/dao_einvoice_batch"], function (task, batchDAO) {
    var SCRIPT_ID = "customscript_ei_mr_einv_sending";
    var DEPLOYMENT_ID = "customdeploy_ei_mr_einv_sending";

    /**
     *
     * */
    function execute(context) {
        var batches = batchDAO.getBatch();

        if (batches.length > 0) {
            var nextBatch = batches[0];
            var batchId = nextBatch.id;
            var batchOwner = nextBatch.getValue("owner");

            var mrTask = task.create({
                taskType: task.TaskType.MAP_REDUCE,
            });
            mrTask.scriptId = SCRIPT_ID;
            mrTask.deploymentId = DEPLOYMENT_ID;
            mrTask.params = {
                custscript_ei_sending_batch_id: batchId,
                custscript_ei_sending_batch_owner: batchOwner,
            };
            mrTask.submit();
        }
    }

    return {
        execute: execute,
    };
});
