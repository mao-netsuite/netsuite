/**
 *@NApiVersion 2.x
 */
define([], function () {
    function EdocService(scriptId, deploymentId, name, bodyParams) {
        this.scriptId = scriptId;
        this.deploymentId = deploymentId;
        this.name = name;
        this.bodyParams = bodyParams;
    }

    return EdocService;
});
