define([
    "N/query",
    "N/error",
    "../../lib/string_formatter",
    "../../lib/translator",
], function (query, error, stringFormatter, translator) {
    var ERR_CODES = {
        ENTITY_NOT_FOUND_WITH_ENTITYID: {
            NAME: "ERR_ENTITY_NOT_FOUND_WITH_ENTITYID",
            MESSAGE_TRANSLATION_CODE: "entity.not.found.with.entityid",
            MESSAGE:
                "No such vendor/customer is associated with the Entity Id: {IDENTIFIER}.",
        },
        ENTITY_NOT_FOUND_WITH_PEPPOLID: {
            NAME: "ERR_ENTITY_NOT_FOUND_WITH_PEPPOLID",
            MESSAGE_TRANSLATION_CODE: "entity.not.found.with.peppolid",
            MESSAGE:
                "No such vendor/customer is associated with the Peppol Id: {IDENTIFIER}.",
        },
        MULTIPLE_ENTITY_FOUND_WITH_PEPPOLID: {
            NAME: "ERR_MULTIPLE_ENTITY_FOUND_WITH_PEPPOLID",
            MESSAGE_TRANSLATION_CODE: "multiple.entity.found.with.peppolid",
            MESSAGE:
                "Multiple vendors/customers are associated with the same Peppol Id: {IDENTIFIER}.",
        },
    };

    /**
     *
     * @param {entityId, peppolId} options
     * @param isPurchaseType
     * @returns {id, name, package} object
     */
    function fetchEntityDetails(options, isPurchaseType) {
        var errorFound = false;
        var errorName = null;
        var errorMsg = null;
        var errorTranslatedMsg = null;
        var peppolId = options.peppolId;
        var entityId = options.entityId;
        var entityType = query.Type.CUSTOMER;
        var IDENTIFIER = null;
        if (isPurchaseType) {
            entityType = query.Type.VENDOR;
        }
        var entityQuery = query.create({
            type: entityType,
        });
        if (peppolId) {
            IDENTIFIER = peppolId;
            var peppolIdMatch = entityQuery.createCondition({
                fieldId: "custentity_psg_ei_peppol_id",
                operator: query.Operator.IS,
                values: peppolId,
            });
            entityQuery.condition = peppolIdMatch;
        } else if (entityId) {
            IDENTIFIER = entityId;
            var entityIdMatch = entityQuery.createCondition({
                fieldId: "id",
                operator: query.Operator.EQUAL,
                values: entityId,
            });
            entityQuery.condition = entityIdMatch;
        }

        entityQuery.columns = [
            entityQuery.createColumn({
                fieldId: "id",
            }),
            entityQuery.createColumn({
                fieldId: "entityid",
                alias: "name",
            }),
            entityQuery.createColumn({
                fieldId: "custentity_psg_ei_entity_edoc_standard",
                alias: "package",
            }),
        ];

        var results = entityQuery.run().asMappedResults();

        if (results.length === 0) {
            errorFound = true;
            if (entityId) {
                errorName = ERR_CODES.ENTITY_NOT_FOUND_WITH_ENTITYID.NAME;
                errorMsg = ERR_CODES.ENTITY_NOT_FOUND_WITH_ENTITYID.MESSAGE;
                errorTranslatedMsg =
                    ERR_CODES.ENTITY_NOT_FOUND_WITH_ENTITYID
                        .MESSAGE_TRANSLATION_CODE;
            } else if (peppolId) {
                errorName = ERR_CODES.ENTITY_NOT_FOUND_WITH_PEPPOLID.NAME;
                errorMsg = ERR_CODES.ENTITY_NOT_FOUND_WITH_PEPPOLID.MESSAGE;
                errorTranslatedMsg =
                    ERR_CODES.ENTITY_NOT_FOUND_WITH_PEPPOLID
                        .MESSAGE_TRANSLATION_CODE;
            }
        } else if (results.length > 1) {
            errorFound = true;
            errorName = ERR_CODES.MULTIPLE_ENTITY_FOUND_WITH_PEPPOLID.NAME;
            errorMsg = ERR_CODES.MULTIPLE_ENTITY_FOUND_WITH_PEPPOLID.MESSAGE;
            errorTranslatedMsg =
                ERR_CODES.MULTIPLE_ENTITY_FOUND_WITH_PEPPOLID
                    .MESSAGE_TRANSLATION_CODE;
        }
        
        if (errorFound) {
            stringFormatter.setString(
                translator.getString(errorTranslatedMsg) || errorMsg
            );
            stringFormatter.replaceParameters({
                IDENTIFIER: IDENTIFIER,
            });
            var errorMessage = stringFormatter.toString();
            throw error.create({
                name: errorName,
                message: errorMessage,
                notifyOff: true,
            });
        }
        log.debug(
            "mr_einvoice_nseb_inbound_converter.js: fetchEntityDetailsUsingPeppolId",
            "ended"
        );
        return results[0];
    }

    return {
        fetchEntityDetails: fetchEntityDetails,
    };
});
