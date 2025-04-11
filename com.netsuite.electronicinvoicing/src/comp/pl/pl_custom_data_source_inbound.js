/**
 * @NApiVersion 2.x
 * @NScriptType plugintypeimpl
 * @NModuleScope Public
 */
define(["N/render"], function (nsrender) {
    /**
   * inject - This function will inject the custom data source during the inbound process
   * @param {Object} params.inboundEDocRec
   * @param {Object} params.templateRec
   * @param {Object} params.entityRec

   * @returns {Object} result
   * @returns {render.DataSource} result.alias
   * @returns {string} result.format
   * @returns {Object | Document | string} result.data
   * @returns {Object} result.result (optional)
   * @returns {Boolean} result.result.success (optional)
   * @returns {string} result.result.eiAuditTrailMsg (optional)
   */

    function inject(params) {
        // var inboundEDocRec = params.inboundEDocRec;
        // var templateRec = params.templateRec;
        // var entityRec = params.entityRec;

        //populate this object with the custom data.
        var customObj = {};
        try {
            return {
                customDataSources: [
                    {
                        format: nsrender.DataSource.OBJECT,
                        alias: "custom",
                        data: customObj,
                    },
                ],
                result: {
                    success: true,
                    eiAuditTrailMsg: "Custom Data Source executed successfully"
                },
            };
        } catch (exp) {
            return {
                result:
                {
                    success: false,
                    eiAuditTrailMsg: exp.name + ':  ' + exp.message,
                },
            };
        }
    }

    return {
        inject: inject,
    };
});
