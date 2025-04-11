/**
 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */
define([
    "N/error",
    "../lib/app/app_transaction_type_map",
    "N/runtime",
    "./translator",
    "./string_formatter",
], function (error, transactionMap, runtime, translator, stringFormatter) {
    var CUSTOM_TRANSACTION = "CUSTOMTRANSACTIONS";

    function Validator() {
        this.MANDATORY_FIELD_MAP = [];
        this.ARRAY_FIELD_MAP = [];
        this.VALID_TRANSACTIONS =
            transactionMap.getValidPayloadTransactionIDs();
        this.VALID_TRANSACTION_TYPES =
            transactionMap.getValidPayloadTransactionTypes();
        this.TRANSACTIONS = "transactionType";
        this.PACKAGE_FIELD_MAP = "edocPackage";
        this.CTT_NOT_ENABLED =
            "The Custom Transactions feature is not enabled in your account. Enable the feature from Setup > Company > Enable Features, and then try again.";
        this.EI_PARAMETER_VALIDATION = "Invalid input parameter.";
        this.EI_MISSING_PARAMETER =
            "Input parameters are missing in the JSON file.";
        this.EI_EMPTY_PARAMETER =
            "Mandatory parameters {FIELDS} value is missing. Enter the missing values in the parameter and then try again.";
        this.DEFAULT_PACKAGE = "Default E-Document Package";
        this.ERROR_MESSAGES = {
            mandatory: "The mandatory fields must be present in json input.",
            arrayType:
                "Enter a valid Array value in the {FIELDS} field and then try again.",
            xmlType: "The xml is not well formed.",
            transaction:
                "The given transaction {{1}} is not a valid inbound or outbound transaction.",
            package:
                "The Default E-Document Package record already exists. You cannot create a document package record with the same name. Rename your document package record and try again.",
            parameterNotPresent:
                "Enter the mandatory values in the missing {FIELDS} parameters and then try again.",
        };
    }

    Validator.prototype.allFieldsPresent = function (jsonInput) {
        var isValid = true;
        var type = "parameterNotPresent";
        var fieldsNotPresent = [];
        for (var field in this.INPUT_FIELD_MAP) {
            if (!jsonInput.hasOwnProperty(this.INPUT_FIELD_MAP[field])) {
                isValid = false;
                fieldsNotPresent.push(this.INPUT_FIELD_MAP[field]);
            }
        }
        if (!isValid) {
            var ei_paramter_not_present_translation = translator.getString(
                "ei.parameter.not.present"
            );
            var params1 = {
                1: fieldsNotPresent.toString(),
            };
            stringFormatter.setString(ei_paramter_not_present_translation);
            stringFormatter.replaceParameters(params1);
            ei_paramter_not_present_translation = stringFormatter.toString();
            var errorParams = {
                name: "EI_MISSING_PARAMETER",
                message:
                    ei_paramter_not_present_translation ||
                    (
                        this.EI_MISSING_PARAMETER +
                        " " +
                        this.ERROR_MESSAGES[type]
                    ).replace("FIELDS", fieldsNotPresent.toString()),
                translationStringId: "ei_parameter_not_present",
                translationParams: [fieldsNotPresent.toString()],
            };
            throw error.create(errorParams);
        }
        return isValid;
    };

    /* To check if CUSTOM TRANSACTIONS is enabled or not in target account */
    function isCTTEnabledForThisAccount() {
        return runtime.isFeatureInEffect({
            feature: CUSTOM_TRANSACTION,
        });
    }

    /* This will return false if any custom transaction
   type is being send in JSON payload and the CTT feature is not enabled.
*/
    Validator.prototype.cttValidationCheck = function (jsonInput) {
        var isValid = true;
        if (jsonInput.hasOwnProperty(this.TRANSACTIONS)) {
            var tranIds = jsonInput[this.TRANSACTIONS];
            var tranIdsType = typeof tranIds;
            switch (tranIdsType) {
                case "object":
                    for (var i in tranIds) {
                        if (tranIds[i].indexOf("custom") != -1) {
                            if (!isCTTEnabledForThisAccount()) {
                                isValid = false;
                                break;
                            }
                        }
                    }
                    break;
                case "string":
                    if (transactionMap.isCustomTransactionType(tranIds)) {
                        if (!isCTTEnabledForThisAccount()) {
                            isValid = false;
                        }
                    }
                    break;
            }
        }
        if (!isValid) {
            var errorParams = {
                name: "EI_CTT_NOT_ENABLED",
                message:
                    translator.getString("ei.ctt.not.enabled") ||
                    this.CTT_NOT_ENABLED,
                translationStringId: "ei_ctt_not_enabled",
                translationParams: [],
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        }
        return isValid;
    };

    Validator.prototype.isMandatory = function (jsonInput) {
        var isValid = true;
        var emptyField = [];
        for (var field in this.MANDATORY_FIELD_MAP) {
            if (jsonInput.hasOwnProperty(this.MANDATORY_FIELD_MAP[field])) {
                var fieldVal = jsonInput[this.MANDATORY_FIELD_MAP[field]];
                var fieldType = typeof fieldVal;
                switch (fieldType) {
                    case "string":
                        if (fieldVal.trim() === "") {
                            isValid = false;
                            emptyField.push(this.MANDATORY_FIELD_MAP[field]);
                        }
                        break;
                    case "object":
                        if (fieldVal.length === 0) {
                            isValid = false;
                            emptyField.push(this.MANDATORY_FIELD_MAP[field]);
                        }
                        break;
                }
            }
        }
        if (!isValid) {
            var ei_empty_parameter_translation =
                translator.getString("ei.empty.parameter");
            var params1 = {
                1: emptyField.toString(),
            };
            stringFormatter.setString(ei_empty_parameter_translation);
            stringFormatter.replaceParameters(params1);
            ei_empty_parameter_translation = stringFormatter.toString();
            var errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    ei_empty_parameter_translation ||
                    this.EI_EMPTY_PARAMETER.replace(
                        "FIELDS",
                        emptyField.toString()
                    ),
                translationStringId: "ei_empty_parameter",
                translationParams: [emptyField.toString()],
            };
            throw error.create(errorParams);
        }
        return isValid;
    };

    Validator.prototype.isArrayField = function (jsonInput) {
        var isValid = true;
        var type = "arrayType";
        var arrayFields = [];
        for (var field in this.ARRAY_FIELD_MAP) {
            if (jsonInput.hasOwnProperty(this.ARRAY_FIELD_MAP[field])) {
                if (!Array.isArray(jsonInput[this.ARRAY_FIELD_MAP[field]])) {
                    isValid = false;
                    arrayFields.push(this.ARRAY_FIELD_MAP[field]);
                }
            }
        }
        if (!isValid) {
            var ei_array_type_translation = translator.getString(
                "ei.array.type.validation"
            );
            var params1 = {
                1: arrayFields.toString(),
            };
            stringFormatter.setString(ei_array_type_translation);
            stringFormatter.replaceParameters(params1);
            ei_array_type_translation = stringFormatter.toString();
            var errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    ei_array_type_translation ||
                    (
                        this.EI_PARAMETER_VALIDATION +
                        " " +
                        this.ERROR_MESSAGES[type]
                    ).replace("FIELDS", arrayFields.toString()),
                translationStringId: "ei_array_type_validation",
                translationParams: [arrayFields.toString()],
            };
            throw error.create(errorParams);
        }
        return isValid;
    };

    Validator.prototype.hasValidPackageName = function (jsonInput) {
        var isValid = true;
        if (jsonInput.hasOwnProperty(this.PACKAGE_FIELD_MAP)) {
            //can contain validations for package name.
        }
        return isValid;
    };

    Validator.prototype.hasValidTransactions = function (jsonInput) {
        var isValid = true;
        var type = "transaction";
        var trans = [];
        if (jsonInput.hasOwnProperty(this.TRANSACTIONS)) {
            var tranIds = jsonInput[this.TRANSACTIONS];
            var tranIdsType = typeof tranIds;
            switch (tranIdsType) {
                case "object":
                    for (var i in tranIds) {
                        if (
                            this.VALID_TRANSACTIONS.indexOf(tranIds[i]) === -1
                        ) {
                            isValid = false;
                            trans.push(tranIds[i]);
                        }
                    }
                    break;
                case "string":
                    if (
                        this.VALID_TRANSACTION_TYPES.indexOf(
                            tranIds.toLowerCase()
                        ) === -1
                    ) {
                        isValid = false;
                        trans.push(tranIds);
                    }
                    break;
            }
        }
        if (!isValid) {
            var ei_transaction_translation = translator.getString(
                "ei.transaction.validation"
            );
            var params1 = {
                1: trans.toString(),
            };
            stringFormatter.setString(ei_transaction_translation);
            stringFormatter.replaceParameters(params1);
            ei_transaction_translation = stringFormatter.toString();
            var errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    ei_transaction_translation ||
                    (
                        this.EI_PARAMETER_VALIDATION +
                        " " +
                        this.ERROR_MESSAGES[type]
                    ).replace("FIELDS", trans.toString()),
                translationStringId: "ei_transaction_validation",
                translationParams: [trans.toString()],
            };
            throw error.create(errorParams);
        }
        return isValid;
    };

    Validator.prototype.validateInput = function (jsonInput) {
        var hasCTTValidationCheckPassed = this.cttValidationCheck(jsonInput);
        var areAllFieldsPresent = this.allFieldsPresent(jsonInput);
        var hasMandatoryField = this.isMandatory(jsonInput);
        var hasArrayField = this.isArrayField(jsonInput);
        var hasPackageNameValid = this.hasValidPackageName(jsonInput);
        var hasTransactionValid = this.hasValidTransactions(jsonInput);
        return (
            hasCTTValidationCheckPassed &&
            areAllFieldsPresent &&
            hasMandatoryField &&
            hasArrayField &&
            hasPackageNameValid &&
            hasTransactionValid
        );
    };

    Validator.prototype.validateTransResponseInput = function (jsonInput) {
        var areAllFieldsPresent = this.allFieldsPresent(jsonInput);
        var hasMandatoryField = this.isMandatory(jsonInput);
        var hasArrayField = this.isArrayField(jsonInput);
        var hasTransactionValid = this.hasValidTransactions(jsonInput);
        return (
            areAllFieldsPresent &&
            hasMandatoryField &&
            hasArrayField &&
            hasTransactionValid
        );
    };

    return Validator;
});
