/**
 * @NApiVersion 2.1
 * @NScriptType BundleInstallationScript
 */
define(["N/task"], function (task) {
    function afterUpdate(params) {
        runMrScript();
    }

    function runMrScript() {
        try {
            const MR_SCRIPT_ID = "customscript_ei_mr_update_templates_2";
            const MR_DEPLOYMENT_ID = "customdeploy_ei_mr_update_templates_sm";

            var mrTask = task.create({
                taskType: task.TaskType.MAP_REDUCE,
                scriptId: MR_SCRIPT_ID,
                deploymentId: MR_DEPLOYMENT_ID,
            });

            var mrTaskId;
            try {
                mrTaskId = mrTask.submit();
            } catch (e) {
                log.error("Exception while submitting MR task.", e);
            }

            if (mrTaskId) {
                var taskStatus = task.checkStatus(mrTaskId);

                if (taskStatus !== task.TaskStatus.COMPLETE) {
                    return false;
                }
            }
        } catch (e) {
            log.error(
                "Something bad happened while creating or submitting the mapReduceTask in bundle installation script."
            );
        }

        return true;
    }

    return {
        afterUpdate: afterUpdate,
    };
});
