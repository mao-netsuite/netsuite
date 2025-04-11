/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define(["N/record", "N/search"], function (record, search) {
    /*
     * txnTypeId is the internal Id (numeric) of the transaction type.
     * internalIdOfScript is the script's internal id whose deployment is to be created on CTT txnTypeId
     * This can create both: CS deployment and UE deployment.
     */
    function createDeployment(txnTypeId, internalIdOfScript) {
        var response = {
            success: "",
            internalIdOfDeployment: "",
            message: "",
        };

        try {
            var deploymentRecord = record.create({
                type: record.Type.SCRIPT_DEPLOYMENT,
                isDynamic: true,
                defaultValues: { script: internalIdOfScript },
            });

            deploymentRecord.setValue("recordtype", txnTypeId.toUpperCase());
            deploymentRecord.setValue("allroles", true);
            deploymentRecord.setValue("status", "RELEASED");
            deploymentRecord.setValue("runasrole", 3); //Admin
            deploymentRecord.setValue("executeinwebstore", true);

            var internalIdOfDeployment = deploymentRecord.save();
            response.internalIdOfDeployment = internalIdOfDeployment;
            response.success = true;
            response.message =
                "Successfully created new deployment ID " +
                internalIdOfDeployment +
                " of script " +
                internalIdOfScript;
        } catch (e) {
            //error.name is "INVALID_FLD_VALUE" if a deployment of same script already exists on given transactiontype.
            if (e.name === "INVALID_FLD_VALUE") {
                log.debug("DAODEP", e.name + " " + e.message);
                log.debug(
                    "DAODEP",
                    "Deployment Creation skipped. A deployment of the same script id " +
                        internalIdOfScript +
                        " already exits on the target CTT id " +
                        txnTypeId +
                        "."
                );
                response.message =
                    "Deployment Creation skipped. A deployment of the same script id " +
                    internalIdOfScript +
                    " already exits on the target CTT id " +
                    txnTypeId +
                    ".";
                response.success = true;
            } else {
                log.error(e.name, e.message + " " + e.stack);
                response.success = false;
                response.message = e.name + " " + e.message + " " + e.stack;
            }
        }
        return response;
    }

    function deleteDeployment(transactionTypeIdString, internalIdOfScript) {
        var response = {
            success: false,
            message: "Deleting deployment not initiated",
        };
        try {
            var getFilters = function (scriptIntId) {
                var filters = [];
                filters.push(["script", search.Operator.IS, scriptIntId]);
                filters.push("AND");
                filters.push([
                    "recordtype",
                    search.Operator.IS,
                    transactionTypeIdString.toUpperCase(),
                ]);
                return filters;
            };
            var deploymentSearch = search.create({
                type: search.Type.SCRIPT_DEPLOYMENT,
                columns: ["internalid"],
                filters: getFilters(internalIdOfScript),
            });
            var results = deploymentSearch.run().getRange({
                start: 0,
                end: 100,
            });
            log.debug("deployment search results", results);

            if (results.length === 0) {
                response.success = true;
                response.message =
                    "No deployment of " +
                    internalIdOfScript +
                    " on " +
                    transactionTypeIdString +
                    " is pending for deletion";
            } else {
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    var idd = result.getValue("internalid");
                    log.debug("DAODEP", "Internal ID of Deployment: " + idd);
                    log.debug("DAODEP", "Going to delete Deployment: " + idd);
                    record.delete({
                        type: record.Type.SCRIPT_DEPLOYMENT,
                        id: idd,
                    });
                }
                response.success = true;
                response.message =
                    "Deleted deployment of " +
                    internalIdOfScript +
                    " on " +
                    transactionTypeIdString;
            }
        } catch (e) {
            log.error(e.name, e.message + " " + e.stack);
            response.success = false;
            response.message =
                "Error during deleting deployment of script id " +
                internalIdOfScript +
                " on CTT " +
                transactionTypeIdString;
        }

        return response;
    }

    return {
        createDeployment: createDeployment,
        deleteDeployment: deleteDeployment,
    };
});
