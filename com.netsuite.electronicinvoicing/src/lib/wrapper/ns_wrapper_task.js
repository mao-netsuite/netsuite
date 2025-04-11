/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Oct 2015         ldimayuga
 *
 * @NModuleScope TargetAccount
 */

define(["N/task"], function (task) {
    /**
     * Creates a task of the given type and returns the task object.
     *
     * @param {Object} options
     * @param {string} options.taskType specifies the type of task to be created; use values from the task.TaskType enum
     * @returns {task.ScheduledScriptTask | task.MapReduceScriptTask | task.CsvImportTask | task.EntityDeduplicationTask | task.WorkflowTriggerTask}
     */

    function create(options) {
        return task.create(options);
    }

    /**
     * Check current status of a submitted task. The task to be checked is identified by its ID. Type of the returned status object is determined by the type of the task.
     *
     * @param {Object} options
     * @param {string} options.taskId
     * @returns {task.ScheduledScriptTaskStatus | task.MapReduceScriptTaskStatus | task.CsvImportTaskStatus | task.EntityDeduplicationTaskStatus | task.WorkflowTriggerTaskStatus}
     */
    function checkStatus(taskId) {
        return task.checkStatus(taskId);
    }

    return {
        create: create,
        checkStatus: checkStatus,
        TaskType: task.TaskType,
        TaskStatus: task.TaskStatus,
    };
});
