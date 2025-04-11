/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define(["N/record"], function (record) {
    var TBF_RECORD_TYPE_ID = "transactionbodycustomfield";
    var CTT_FIELD_ID = "bodycustomtransactions";

    function addCTTToTBF(tbfId, internalIdOfCTT) {
        var success = false;
        log.debug(
            "DAOTBF",
            "Initiating CTT " + internalIdOfCTT + " addition to TBF " + tbfId
        );

        try {
            var objRecord = record.load({
                type: TBF_RECORD_TYPE_ID,
                id: tbfId,
                isDynamic: false,
            });

            var existingSelection = objRecord.getValue({
                fieldId: CTT_FIELD_ID, // id of the field "Custom transaction" on Transaction Body Field
            });

            log.debug(
                "DAOTBF",
                "Existing selection of CTT in TBF " +
                    tbfId +
                    ": " +
                    existingSelection
            );

            var i = existingSelection.indexOf(internalIdOfCTT.toString());
            if (i === -1) {
                existingSelection.push(internalIdOfCTT);
                log.debug(
                    "DAOTBF",
                    "Updating these CTTs in TBF " +
                        tbfId +
                        ": " +
                        existingSelection
                );

                objRecord.setValue({
                    fieldId: CTT_FIELD_ID, // id of the field "Custom transaction" on Transaction Body Field
                    value: existingSelection, // array of Custom transaction IDs which should be selected
                });
                objRecord.save();
                success = true;
                log.debug(
                    "DAOTBF",
                    "TBF " +
                        tbfId +
                        " updated, " +
                        internalIdOfCTT +
                        " is successfully added."
                );
            } else {
                success = true; //CTT is already selected in the TBF
                log.debug(
                    "DAOTBF",
                    "CTT " +
                        internalIdOfCTT +
                        " is already selected in TBF " +
                        tbfId
                );
            }
        } catch (ex) {
            log.error(
                "DAOTBF",
                "Error during updating transaction body field: " +
                    tbfId +
                    " with " +
                    internalIdOfCTT
            );
            log.error(ex.name, ex.message + " " + ex.stack);
            throw ex;
        }
        return success;
    }

    function removeCTTFromTBF(tbfId, internalIdOfCTT) {
        var success = false;
        log.debug(
            "DAOTBF",
            "Initiating CTT " + internalIdOfCTT + " removal from TBF " + tbfId
        );

        try {
            var objRecord = record.load({
                type: TBF_RECORD_TYPE_ID,
                id: tbfId,
                isDynamic: false,
            });

            var existingSelection = objRecord.getValue({
                fieldId: CTT_FIELD_ID, // id of the field "Custom transaction" on Transaction Body Field
            });

            log.debug(
                "DAOTBF",
                "Existing selection of CTT in TBF " +
                    tbfId +
                    ": " +
                    existingSelection
            );

            var i = existingSelection.indexOf(internalIdOfCTT.toString());
            if (i >= 0) {
                // delete the value internalIdOfCTT from the array
                existingSelection.splice(i, 1);
                log.debug(
                    "DAOTBF",
                    "Updating these CTTs in TBF " +
                        tbfId +
                        ": " +
                        existingSelection
                );

                objRecord.setValue({
                    fieldId: CTT_FIELD_ID, // id of the field "Custom transaction" on Transaction Body Field
                    value: existingSelection, // array of Custom transaction IDs which should be selected
                });

                objRecord.save();
                success = true;
                log.debug(
                    "DAOTBF",
                    "TBF " +
                        tbfId +
                        " updated, " +
                        internalIdOfCTT +
                        " is successfully removed"
                );
            } else {
                success = true; //CTT is already absent in the TBF
                log.debug(
                    "DAOTBF",
                    "CTT " +
                        internalIdOfCTT +
                        " is already absent in TBF " +
                        tbfId
                );
            }
        } catch (ex) {
            log.error(
                "DAOTBF",
                "Error during removing " +
                    internalIdOfCTT +
                    " from transaction body field: " +
                    tbfId
            );
            log.error(ex.name, ex.message + " " + ex.stack);
            throw ex;
        }
        return success;
    }

    return {
        addCTTToTBF: addCTTToTBF,
        removeCTTFromTBF: removeCTTFromTBF,
    };
});
