define(["./main_constants"], function (mainConstants) {
    var SCRIPTS = mainConstants.SCRIPTS;
    var scriptDeployments = {};

    scriptDeployments[SCRIPTS.GENERATE_TRANSACTION_RESPONSE] = {
        DEFAULT_DEPLOYMENT: "customdeploy_psg_ei_generate_trans_resp",
    };

    scriptDeployments[SCRIPTS.SEND_TRANSACTION_RESPONSE] = {
        DEFAULT_DEPLOYMENT: "customdeploy_psg_ei_send_trans_res_su",
    };

    scriptDeployments[SCRIPTS.PREVIEW_DOWNLOAD] = {
        DEFAULT_DEPLOYMENT: "customdeploy_ei_content_service_su",
    };

    return scriptDeployments;
});
