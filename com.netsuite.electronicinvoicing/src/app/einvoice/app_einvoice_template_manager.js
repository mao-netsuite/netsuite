/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Handles processes for E-Invoice Template validations and warning/confirmation messages
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Oct 2015     mjaurigue
 *
 * @NModuleScope TargetAccount
 */

define([
    "./app_einvoice_template_validator",
    "../../lib/message_handler",
    "N/error",
    "../../lib/translator",
    "../../lib/app/app_transaction_type_map",
    "../../lib/validation_result",
], function (
    templateValidator,
    messageHandler,
    error,
    translator,
    transactionMap,
    validationResult
) {
    var GENERATOR_TEMP_FIELD = "custrecord_psg_ei_template_content";
    var PARSING_TEMP_FIELD = "custrecord_psg_ei_parsing_template";
    var CONTENT_TYPE_FIELD = "custrecord_psg_file_content_type";
    var VALIDATOR_SUBLIST = "recmachcustrecord_psg_ei_temp_validator_parent";
    var VALIDATOR_SUBLIST_REGEX_FIELD =
        "custrecord_psg_ei_temp_validator_regex";
    var VALIDATOR_SUBLIST_XPATH_FIELD =
        "custrecord_psg_ei_temp_validator_xpath";
    var TRANSACTION_TYPE_FIELD = "custrecord_psg_ei_template_trans_type";
    var SUPPORTED_TRANS_TYPE_FIELD =
        "custpage_psg_ei_template_supported_transtype";

    var EI_STATUS_FIELD = "custrecord_psg_ei_temp_edoc_status";
    var SUPPORTED_EI_STATUS_FIELD = "custpage_psg_ei_temp_ei_status_txn_block";

    var XML_CONTENT_TYPE = "1";

    var initialContentTypeValue;
    var initialValidators = [];

    var XML_CONTENT_TYPE_CHANGE_CODE = "transaction.msg.xmltypechangedconfirm";
    var VALIDATORS_FOR_XML_ONLY_CODE = "transaction.msg.xmlvalidatorsonly";
    var VALIDATOR_COMBINATION_EXISTS_CODE =
        "transaction.msg.xmlvalidatorexists";
    var OUTBOUND_TEMPLATE_REQUIRED_CODE = "template.templaterequired";
    var FIELD_MAPPING_REQUIRED_CODE = "template.mappingrequired";
    var XSD_INVALID_FILE = "template.invalidxsdfile";
    var OUTBOUND_TEMPLATE_OR_INBOUND_JSON_MAPPING_REQUIRED =
        "template.templateorjsonrequired";

    var MESSAGEMAP;

    function initializeMessageTranslationMap() {
        var messageCodes = [
            XML_CONTENT_TYPE_CHANGE_CODE,
            VALIDATORS_FOR_XML_ONLY_CODE,
            VALIDATOR_COMBINATION_EXISTS_CODE,
            OUTBOUND_TEMPLATE_REQUIRED_CODE,
            FIELD_MAPPING_REQUIRED_CODE,
            OUTBOUND_TEMPLATE_OR_INBOUND_JSON_MAPPING_REQUIRED,
            XSD_INVALID_FILE,
        ];

        var map = translator.getStringMap(messageCodes);

        MESSAGEMAP = {};
        MESSAGEMAP[XML_CONTENT_TYPE_CHANGE_CODE] =
            map[XML_CONTENT_TYPE_CHANGE_CODE] ||
            "Changing the value in the Content Type field from XML to a different type will remove all XML validators. Are you sure you want to change the content type?";
        MESSAGEMAP[VALIDATORS_FOR_XML_ONLY_CODE] =
            map[VALIDATORS_FOR_XML_ONLY_CODE] ||
            "Only validators for XML content type can be added.";
        MESSAGEMAP[VALIDATOR_COMBINATION_EXISTS_CODE] =
            map[VALIDATOR_COMBINATION_EXISTS_CODE] ||
            "This validator is already in the list.";
        MESSAGEMAP[OUTBOUND_TEMPLATE_REQUIRED_CODE] =
            map[OUTBOUND_TEMPLATE_REQUIRED_CODE] ||
            "The template content is missing for the selected outbound transaction type. Provide a valid XML or JSON template content in the Outbound E-Documents field, then try again.";
        MESSAGEMAP[FIELD_MAPPING_REQUIRED_CODE] =
            map[FIELD_MAPPING_REQUIRED_CODE] ||
            "You selected an inbound transaction type, but the JSON content of the field mapping is missing. Enter the JSON content in the Field Mapping for Inbound E-Documents field.";
        MESSAGEMAP[XSD_INVALID_FILE] =
            map[XSD_INVALID_FILE] ||
            "The selected XSD file is not a valid XSD file. Ensure that the file you select has the .xsd extension.";
        MESSAGEMAP[OUTBOUND_TEMPLATE_OR_INBOUND_JSON_MAPPING_REQUIRED] =
            map[OUTBOUND_TEMPLATE_OR_INBOUND_JSON_MAPPING_REQUIRED] ||
            "There are missing field values. For an outbound transaction, specify a valid XML or JSON content in the Template for Outbound E-Documents field. For an inbound transaction, specify the JSON content in the Field Mapping for Inbound E-Document field.";
    }

    function storeInitialRecordValues(record) {
        initialContentTypeValue = record.getValue({
            fieldId: CONTENT_TYPE_FIELD,
        });

        for (
            var i = 0;
            i < record.getLineCount({ sublistId: VALIDATOR_SUBLIST });
            i++
        ) {
            var xpathValue = record.getSublistValue({
                sublistId: VALIDATOR_SUBLIST,
                fieldId: VALIDATOR_SUBLIST_XPATH_FIELD,
                line: i,
            });
            var regexValue = record.getSublistValue({
                sublistId: VALIDATOR_SUBLIST,
                fieldId: VALIDATOR_SUBLIST_REGEX_FIELD,
                line: i,
            });
            initialValidators[i] = [xpathValue, regexValue].join("");
        }
    }

    function validateFieldChanged(context) {
        var proceed = true;
        var currentRecord = context.currentRecord;

        if (context.fieldId === CONTENT_TYPE_FIELD) {
            proceed = onContentTypeChanged(currentRecord);
        } else if (context.fieldId === SUPPORTED_TRANS_TYPE_FIELD) {
            // Set supported transaction type selected to the Transaction Type field.
            var supportedTransTypeValues = currentRecord.getValue(
                SUPPORTED_TRANS_TYPE_FIELD
            );
            currentRecord.setValue({
                fieldId: TRANSACTION_TYPE_FIELD,
                value: supportedTransTypeValues,
            });
        } else if (context.fieldId === SUPPORTED_EI_STATUS_FIELD) {
            // Set supported EI Status for transaction EDIT block to the EI_STATUS field.
            var supportedEIStatusValues = currentRecord.getValue(
                SUPPORTED_EI_STATUS_FIELD
            );
            currentRecord.setValue({
                fieldId: EI_STATUS_FIELD,
                value: supportedEIStatusValues,
            });
        }
        return proceed;
    }

    function onContentTypeChanged(currentRecord) {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }

        var proceed = true;

        var newContentType = currentRecord.getValue({
            fieldId: CONTENT_TYPE_FIELD,
        });
        var validatorCount = currentRecord.getLineCount({
            sublistId: VALIDATOR_SUBLIST,
        });

        /*If the initial Content Type = XML and is changed to a non-XML value*/
        if (
            initialContentTypeValue === XML_CONTENT_TYPE &&
            newContentType !== initialContentTypeValue &&
            validatorCount > 0
        ) {
            var message = MESSAGEMAP[XML_CONTENT_TYPE_CHANGE_CODE];

            proceed = messageHandler.showConfirmationMessage(message);

            if (!proceed) {
                currentRecord.setValue({
                    fieldId: CONTENT_TYPE_FIELD,
                    value: XML_CONTENT_TYPE,
                });
            } else {
                removeAllValidators(currentRecord);
            }
        }

        initialContentTypeValue = currentRecord.getValue({
            fieldId: CONTENT_TYPE_FIELD,
        });

        return proceed;
    }

    function removeAllValidators(record) {
        var validatorCount = record.getLineCount({
            sublistId: VALIDATOR_SUBLIST,
        });
        for (var i = 0; i < validatorCount; i++) {
            record.removeLine({ sublistId: VALIDATOR_SUBLIST, line: 0 });
        }
    }

    //intended to be used at validateLine entrypoint in client script: for the validators (XML validator, JSON validator etc)
    function validateSublist(context) {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }

        var isValid = true;
        var record = context.currentRecord;
        var sublistName = context.sublistId;
        var contentType = record.getValue({ fieldId: CONTENT_TYPE_FIELD });

        if (sublistName === VALIDATOR_SUBLIST) {
            if (contentType == XML_CONTENT_TYPE) {
                isValid = validateTemplateValidatorSublist(record);

                var regexValue = record.getCurrentSublistValue({
                    sublistId: VALIDATOR_SUBLIST,
                    fieldId: VALIDATOR_SUBLIST_REGEX_FIELD,
                });
                var xpathValue = record.getCurrentSublistValue({
                    sublistId: VALIDATOR_SUBLIST,
                    fieldId: VALIDATOR_SUBLIST_XPATH_FIELD,
                });

                var xpathRegexCombination = [xpathValue, regexValue].join("");

                var validatorInitialIndex = initialValidators.indexOf(
                    xpathRegexCombination
                );

                var currentLine = record.getCurrentSublistIndex({
                    sublistId: VALIDATOR_SUBLIST,
                });

                if (validatorInitialIndex != -1) {
                    if (validatorInitialIndex != currentLine) {
                        messageHandler.showMessage(
                            MESSAGEMAP[VALIDATOR_COMBINATION_EXISTS_CODE]
                        );
                        isValid = false;
                    }
                } else {
                    initialValidators[currentLine] = xpathRegexCombination;
                }
            } else {
                messageHandler.showMessage(
                    MESSAGEMAP[VALIDATORS_FOR_XML_ONLY_CODE]
                );
                isValid = false;
            }
        }

        return isValid;
    }

    function validateTemplateValidatorSublist(record) {
        var isValid = true;

        var regexValue = record.getCurrentSublistValue({
            sublistId: VALIDATOR_SUBLIST,
            fieldId: VALIDATOR_SUBLIST_REGEX_FIELD,
        });

        if (regexValue) {
            var regexValidationResult =
                templateValidator.isValidRegEx(regexValue);

            if (!regexValidationResult.isValid()) {
                messageHandler.showMessage(regexValidationResult.getMessage());
            }

            isValid = regexValidationResult.isValid();
        }

        return isValid;
    }

    function validateTemplateFields(record, execContext) {
        var REQUIRED_PARAM_MISSING = "REQUIRED_PARAM_MISSING";
        var RECORD_REQUIRED =
            "Record is a required parameter for validating E-Document Template.";
        var CONTEXT_REQUIRED =
            "Context is a required parameter for validating E-Document Template.";

        if (!record) {
            log.error(REQUIRED_PARAM_MISSING, RECORD_REQUIRED);
            throw error.create({
                name: REQUIRED_PARAM_MISSING,
                message: RECORD_REQUIRED,
                notifyOff: true,
            });
        }

        if (!execContext) {
            log.error(REQUIRED_PARAM_MISSING, CONTEXT_REQUIRED);
            throw error.create({
                name: REQUIRED_PARAM_MISSING,
                message: CONTEXT_REQUIRED,
                notifyOff: true,
            });
        }

        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }

        var contentValidationResult = validationResult.create();
        contentValidationResult.setValidity(true);

        var templateString = record.getValue({ fieldId: GENERATOR_TEMP_FIELD });
        var mapping = record.getValue({ fieldId: PARSING_TEMP_FIELD });
        var transactionTypes = record.getValue({
            fieldId: TRANSACTION_TYPE_FIELD,
        });

        var atleastOnePureOutboundIsPresent = false; // If user has selected atleast one transaction-type that was just Outbound type.

        for (var i = 0; i < transactionTypes.length; i++) {
            if (
                transactionMap.isValidOutboundTransactionType(
                    transactionTypes[i]
                ) &&
                !transactionMap.isValidInboundTransactionType(
                    transactionTypes[i]
                )
            ) {
                atleastOnePureOutboundIsPresent = true;
                break;
            }
        }

        if (!templateString && !mapping) {
            contentValidationResult.setValidity(false);
            contentValidationResult.setMessage(
                MESSAGEMAP[OUTBOUND_TEMPLATE_OR_INBOUND_JSON_MAPPING_REQUIRED]
            );
        } else if (!templateString && atleastOnePureOutboundIsPresent) {
            contentValidationResult.setValidity(false);
            contentValidationResult.setMessage(
                MESSAGEMAP[OUTBOUND_TEMPLATE_REQUIRED_CODE]
            );
        }

        return {
            validationResult: contentValidationResult,
            hasatleastOneOutbound: atleastOnePureOutboundIsPresent,
        };
    }

    function sublistChanged(record, sublistId, operation) {
        if (sublistId == VALIDATOR_SUBLIST) {
            if (operation == "remove") {
                var currentLine = record.getCurrentSublistIndex({
                    sublistId: VALIDATOR_SUBLIST,
                });
                initialValidators.splice(currentLine, 1);
            }
        }
    }

    return {
        storeInitialRecordValues: storeInitialRecordValues,
        validateSublist: validateSublist,
        validateFieldChanged: validateFieldChanged,
        validateTemplateFields: validateTemplateFields,
        sublistChanged: sublistChanged,
    };
});
