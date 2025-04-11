/**
 * @NApiVersion 2.1
 * @NScriptType BundleInstallationScript
 * @NModuleScope TargetAccount
 */

define(["N/task"], function (task) {
    const CTT_CREATE_DEPLOYMENTS_MR_SCRIPT_ID =
        "customscript_ei_mr_ctt_dep_create";
    const CTT_CREATE_DEPLOYMENTS_MR_DEPLOYMENT_ID =
        "customdeploy_ei_mr_ctt_dep_create";
    const EI_PREF_MIGRATE_MR_SCRIPT_ID =
        "customscript_psg_ei_subsidiary_prefs_mr";
    const EI_PREF_MIGRATE_MR_DEPLOYMENT_ID =
        "customdeploy_psg_ei_subsidiary_prefs_mr";
    const EI_PREF_BUNDLE_UPDATE = "custscript_psg_ei_bundle_update";

    function afterUpdate() {
        runCttDepMrScript();
    }

    function afterInstall() {
        runEiPrefMrScript(false);
    }

    /**
     * Logs error to script execution logs based on exception from parameters
     * @param e
     */
    function logMrException(e) {
        log.error(
            "BI Error stack while executing this bundle installation script",
            e.stack
        );
        log.error(
            "Unexpected error happened while executing this bundle installation script ",
            e.message
        );
    }

    /**
     * Triggers "Update CTT Deployments MR" script
     */
    function runCttDepMrScript() {
        try {
            const cttMrTask = task.create({
                taskType: task.TaskType.MAP_REDUCE,
                scriptId: CTT_CREATE_DEPLOYMENTS_MR_SCRIPT_ID,
                deploymentId: CTT_CREATE_DEPLOYMENTS_MR_DEPLOYMENT_ID,
            });

            const cttMrTaskId = cttMrTask.submit();
            log.debug("Task Id of EI Init Bundle Installation MR", cttMrTaskId);
        } catch (e) {
            logMrException(e);
        }
    }


    /**
     * Triggers "E-Document Subsidiary Preferences MR" script along with its script parameter to distinguish between afterUpdate and afterInstall entry points
     * @param isAfterUpdate
     */
    function runEiPrefMrScript(isAfterUpdate) {
        try {
            const eiPrefMrTask = task.create({
                taskType: task.TaskType.MAP_REDUCE,
                scriptId: EI_PREF_MIGRATE_MR_SCRIPT_ID,
                deploymentId: EI_PREF_MIGRATE_MR_DEPLOYMENT_ID,
            });

            eiPrefMrTask.params = {};
            eiPrefMrTask.params[EI_PREF_BUNDLE_UPDATE] = isAfterUpdate;

            const eiPrefMrTaskId = eiPrefMrTask.submit();
            log.debug("Task Id of EI PREF MR ", eiPrefMrTaskId);
        } catch (e) {
            logMrException(e);
        }
    }

    return {
        afterUpdate: afterUpdate,
        afterInstall: afterInstall,
    };
});
