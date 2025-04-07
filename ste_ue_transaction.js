/**
 * Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
 */

/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
/**
 * @module SteUeTransaction
 */
define(function (require) {
  var UeTransactionPromptPaymentDiscount = require('../ppd/ste_ue_transaction_ppd');
  var UeTransactionCustomFields = require('../lookup/transaction_custom_fields/ste_ue_transaction_custom_fields');
  var GeneralFunctions = require('../../general/ste_general_functions');
  var ModelNexus = require('../../model/ste_model_nexus');


  var script = {
    scriptsUE: [UeTransactionCustomFields, UeTransactionPromptPaymentDiscount], // add here in case of need of adding another partial user event script

    /**
     * Function definition to be triggered before record is loaded.
     * Adds 'custpage_allnexuses' form field with an exposed variable allNexuses.
     * Hides the Tax Transaction Type field for US nexuses in VIEW mode.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {serverWidget.Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    beforeLoad: function (scriptContext) {
      script.scriptsUE.forEach(function (scriptUE) {
        if ((scriptUE.beforeLoad) && (typeof scriptUE.beforeLoad === 'function')) {
          scriptUE.beforeLoad(scriptContext);
        }
      });
    },

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    beforeSubmit: function (scriptContext) {
      script.scriptsUE.forEach(function (scriptUE) {
        if ((scriptUE.beforeSubmit) && (typeof scriptUE.beforeSubmit === 'function')) {
          scriptUE.beforeSubmit(scriptContext);
        }
      });
    },

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    afterSubmit: function (scriptContext) {
      // All the scripts currently set values related only to the VAT lookup
      var newRecord = scriptContext.newRecord;
      var nexusId = newRecord.getValue('nexus');
      if (GeneralFunctions.isEmptyValue(nexusId)) {
        return;
      }
      var nexus = new ModelNexus().getById({ nexusId: nexusId });
      if (nexus.country === 'US') {
        return;
      }

      script.scriptsUE.forEach(function (scriptUE) {
        if ((scriptUE.afterSubmit) && (typeof scriptUE.afterSubmit === 'function')) {
          scriptUE.afterSubmit(scriptContext);
        }
      });
    },
  };

  return {
    beforeLoad: script.beforeLoad,
    beforeSubmit: script.beforeSubmit,
    afterSubmit: script.afterSubmit,
    _userevent: script
  };
});
