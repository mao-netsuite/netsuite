/**
 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */
define([
    "../app/einvoice/app_einvoice_plugin_find_implementations",
    "N/error",
    "./validator",
    "./translator",
], function (plugin, error, Validator, translator) {
    var TRANSLATION_STRING_ID = "";
    function SendingMethodValidator() {
        Validator.call(this);
        this.MANDATORY_FIELD_MAP = [
            "name",
            "edocPackage",
            "transactionType",
            "sendingChannel",
            "eDocPluginImpl",
        ];
        this.ARRAY_FIELD_MAP = ["transactionType", "subsidiary"];
        this.INPUT_FIELD_MAP = [
            "name",
            "edocPackage",
            "edocDescription",
            "transactionType",
            "eDocPluginImpl",
            "sendingChannel",
            "isInactive",
        ];
        this.ERROR_MESSAGES["sendingPluginImplDoesNotExist"] =
            "Invalid ID for E-Document Sending Method plug-in implementation. Enter a valid ID and try again.";
        this.ERROR_MESSAGES["sendingPluginImplNotProvided"] =
            "The value for E-Document Sending Method plug-in implementation is not provided.";
        this.ERROR_MESSAGES["sendingPluginImplParameterMissing"] =
            "The parameter for E-Document Sending Method plug-in implementation is missing in this request.";
    }
    util.extend(SendingMethodValidator.prototype, Validator.prototype);
    var SENDING_PLUGIN_DEFAULT = "customscript_ei_pl_sending_plugin";
    SendingMethodValidator.prototype.validateSendingMethodInput = function (
        jsonInput
    ) {
        var isValidInput = this.validateInput(jsonInput);
        var isValidPluginImpl = this.validatePluginImpl(jsonInput);
        return isValidInput && isValidPluginImpl;
    };
    // validates if the given ID (eDocPluginImpl) exists
    SendingMethodValidator.prototype.validatePluginImpl = function (jsonInput) {
        var isValid = false;
        var type = "sendingPluginImplDoesNotExist"; //type of validation faliure.
        TRANSLATION_STRING_ID = "ei_sending_plugin_impl_does_not_exist";
        var sending_method_translation = translator.getString(
            "ei.sending.plugin.impl.does.not.exist"
        );
        var sendingMethodImplCustPageValue = "";
        if (jsonInput.hasOwnProperty("eDocPluginImpl")) {
            var implId = jsonInput["eDocPluginImpl"];
            if (implId !== "") {
                try {
                    var pluginNames = plugin.findImplementations(
                        SENDING_PLUGIN_DEFAULT
                    );
                    for (var i in pluginNames) {
                        if (
                            pluginNames[i].id.toUpperCase() ===
                            implId.toUpperCase()
                        ) {
                            isValid = true;
                            sendingMethodImplCustPageValue =
                                pluginNames[i].name;
                            jsonInput.sendingPluginCustPageField =
                                sendingMethodImplCustPageValue;
                            type = "";
                            break;
                        }
                    }
                } catch (exp) {
                    isValid = false;
                    type = "sendingPluginImplDoesNotExist";
                    sending_method_translation = translator.getString(
                        "ei.sending.plugin.impl.does.not.exist"
                    );
                    TRANSLATION_STRING_ID =
                        "ei_sending_plugin_impl_does_not_exist";
                }
            } else {
                type = "sendingPluginImplNotProvided";
                sending_method_translation = translator.getString(
                    "ei.sending.plugin.impl.not.provided"
                );
                TRANSLATION_STRING_ID = "ei_sending_plugin_impl_not_provided";
            }
        } else {
            type = "sendingPluginImplParameterMissing";
            sending_method_translation = translator.getString(
                "ei.sending.plugin.impl.parameter.missing"
            );
            TRANSLATION_STRING_ID = "ei_sending_plugin_impl_parameter_missing";
        }
        if (!isValid) {
            var errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    sending_method_translation || this.ERROR_MESSAGES[type],
                translationStringId: TRANSLATION_STRING_ID,
                translationParams: [],
            };
            throw error.create(errorParams);
        }
        return isValid;
    };
    return SendingMethodValidator;
});
