/**
 *@NApiVersion 2.x
 */
define([
    "N/error",
    "../../lib/translator"
], function (error, translator) {

    /*
     * The function validates whether the peppol id provided is in correct format or not
     * Throws error message if peppol id is not valid
     * */
    function validatePeppolId(context, peppol_id) {
        var currRecord = context.newRecord;
        var oldRecord = context.oldRecord;
        var PEPPOL_FORMAT_ERROR_CODE = "peppol_id_error_format";
        var PEPPOL_FORMAT_ERROR = "PEPPOL ID is invalid. Please enter the ID in the correct format: <country-code>:<GLN>.";

        if ( currRecord.getValue(peppol_id) &&
            (!oldRecord || (oldRecord.getValue(peppol_id) !== currRecord.getValue(peppol_id) ) )
        ) {
            var peppolId = currRecord.getValue(peppol_id);
            peppolId = peppolId.trim();

            var acceptedPeppolLength = 2;
            var checkArray = peppolId.split(":");
            // checks if the peppol id is separated by a ":" and has 2 parts
            if ( checkArray.length != acceptedPeppolLength || !checkArray[0].length || !checkArray[1].length ) {
                log.error("PEPPOL ID is invalid. Please enter the ID in the correct format", peppolId);
                var errorMsg = error.create({
                    name: "INVALID_PEPPOL_ID_FORMAT",
                    message: translator.getString(PEPPOL_FORMAT_ERROR_CODE) || PEPPOL_FORMAT_ERROR ,
                    notifyOff: true,
                });
                throw errorMsg.name + ": " + errorMsg.message
            }
        }
    }

    return {
        validatePeppolId: validatePeppolId
    };
});
