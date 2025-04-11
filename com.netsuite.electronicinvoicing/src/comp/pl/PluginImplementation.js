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
   */

    function inject(params) {
        var customObj = { memo: "TestCDSPlugin" };

        return {
            customDataSources: [
                {
                    format: nsrender.DataSource.JSON,
                    alias: "JSON",
                    data: customObj,
                },
            ],
        };
    }

    return {
        inject: inject,
    };
});
