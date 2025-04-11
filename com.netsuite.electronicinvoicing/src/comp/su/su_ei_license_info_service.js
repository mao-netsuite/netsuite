/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       15 Apr 2016     mjaurigue
 *
 * @NApiVersion 2.1
 * @NScriptName E-Invoice License Info Service SU
 * @NScriptId _ei_license_info_service_su
 * @NScriptType Suitelet
 * @NModuleScope TargetAccount
 */

define([
    "../../app/einvoice/app_einvoice_license_manager",
    "../../app/einvoice/app_einvoice_subsidiary_pref_getter",
], function (licenseManager, subsidiaryPrefGetter) {
    var FREE_COUNTRY_FIELD = "custrecord_psg_ei_sub_edoc_free_country";
    function retrieveLicenseInfo(context) {
        var licenseInfo = licenseManager.getLicenseInfo();

        var freeCountry = getFreeCountry();
        licenseInfo.freeCountry = freeCountry;

        var response = context.response;
        response.write(JSON.stringify(licenseInfo));
    }

    function getFreeCountry() {
        var subsidiaryFieldScriptIds = [FREE_COUNTRY_FIELD];
        var parentCompanySubsidiaryId = subsidiaryPrefGetter.getParentSubsidiaryId();
        var subsidiaryPreferencesObj =
            subsidiaryPrefGetter.getSubsidiaryPreferencesFieldTexts(
                parentCompanySubsidiaryId,
                subsidiaryFieldScriptIds
            );
        return subsidiaryPreferencesObj[FREE_COUNTRY_FIELD];
    }

    return {
        onRequest: retrieveLicenseInfo,
    };
});
