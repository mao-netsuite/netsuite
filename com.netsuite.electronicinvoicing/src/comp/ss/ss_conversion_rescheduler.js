/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       16 Nov 2016     esia
 *
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

define(["N/task", "../../data/dao_convert_batch"], function (task, batchDAO) {
    var SCRIPT_ID = "customscript_ei_mr_manual_convert";
    var DEPLOYMENT_ID = "customdeploy_ei_mr_manual_convert";

    function execute(context) {
        var batches = batchDAO.getBatch();

        if (batches.length > 0) {
            var mrTask = task.create({
                taskType: task.TaskType.MAP_REDUCE,
            });
            mrTask.scriptId = SCRIPT_ID;
            mrTask.deploymentId = DEPLOYMENT_ID;
            mrTask.submit();
        }
    }

    return {
        execute: execute,
    };
});
