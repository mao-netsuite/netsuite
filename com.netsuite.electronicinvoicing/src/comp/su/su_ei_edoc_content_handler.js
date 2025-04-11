/**
 * @NApiVersion 2.1
 * @NScriptType suitelet
 */

define(["N/search", "N/error"], function (search, error) {
    var JSON_FILE_FORMAT = "json";

    var CONTENT_FIELD = "custrecord_psg_ei_inbound_content";
    var TRANSACTION_BODY_CONTENT = "custbody_psg_ei_content";
    var CONTENT_FIELD_MAP = {
        inbound: CONTENT_FIELD,
        outbound: TRANSACTION_BODY_CONTENT,
    };
    var PREVIEW = "preview";
    var DOWNLOAD = "download";

    function getEdocRecord(edocId, type, docType) {
        var edocRecord;
        if (docType) {
            edocRecord = search.lookupFields({
                type: type,
                id: edocId,
                columns: CONTENT_FIELD_MAP[docType],
            });
        }
        return edocRecord;
    }
    /*
     * Edoc Content Preview and Download SU
     * ID: customscript_ei_content_service_su
     * DEPLOYMENT: customdeploy_ei_content_service_su
     * */
    function onRequest(context) {
        var request = context.request;
        var response = context.response;
        var parameters = request.parameters;

        var edocRecord;
        var errorParams;
        var edocContent = "";

        throwErrorifReqParamsMissing(parameters);

        if (parameters.edocId) {
            edocRecord = getEdocRecord(
                parameters.edocId,
                parameters.type,
                parameters.doctype
            );

            if (!(CONTENT_FIELD_MAP[parameters.doctype] in edocRecord)) {
                errorParams = {
                    name: "EDOC_CONTENT_EMPTY",
                    message: "Edocument content is blank",
                };
                log.error(errorParams.name, errorParams.message);
                throw error.create({
                    name: errorParams.name,
                    message: errorParams.message,
                    notifyOff: true,
                });
            }

            edocContent = edocRecord[CONTENT_FIELD_MAP[parameters.doctype]];
        }

        if (parameters.command === PREVIEW && parameters.fileFormat) {
            handlePreview(parameters, edocContent, response);
        } else if (
            parameters.command === DOWNLOAD &&
            (parameters.fileName ||
                (parameters.fileFormat &&
                    parameters.type &&
                    parameters.genDate))
        ) {
            handleDownload(parameters, edocContent, response);
        } else {
            errorParams = {
                name: "INVALID_FORMAT",
                message: "Invalid Format for viewing the e-document content",
            };
            log.error(errorParams.name, errorParams.message);

            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
    }

    function throwErrorifReqParamsMissing(parameters) {
        if (!parameters.fileContent && !parameters.edocId) {
            var errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "edocId or fileContent is a required parameter for viewing the content.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
    }

    /**
     * Handles Download Functionality
     */
    function handleDownload(parameters, edocContent, response) {
        var extension;

        if (parameters.fileFormat === JSON_FILE_FORMAT) extension = ".json";
        else extension = ".xml";

        var fileName = parameters.fileName
            ? parameters.fileName
            : parameters.type + "_" + parameters.genDate + extension;

        response.setHeader({
            name: "Content-Disposition",
            value: 'attachment; filename="' + fileName + '"',
        });
        response.write(edocContent || parameters.fileContent);
    }

    /**
     * Handles Preview Functionality
     */
    function handlePreview(parameters, edocContent, response) {
        var responseContentType;

        if (parameters.fileFormat === JSON_FILE_FORMAT)
            responseContentType = "application/json";
        else responseContentType = "text/xml";

        response.setHeader({
            name: "Content-Type",
            value: responseContentType,
        });

        response.write(edocContent || parameters.fileContent);
    }

    return {
        onRequest: onRequest,
    };
});
