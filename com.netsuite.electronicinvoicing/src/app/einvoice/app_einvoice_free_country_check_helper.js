define([
    "N/config",
    "N/search",
    "N/runtime",
    "N/record",
    "./app_einvoice_subsidiary_pref_getter",
    "./app_einvoice_country_mapping",
], function (config, search, runtime, record, subsidiaryPrefGetter, countryMapping) {
    var COMPANY_INFO_LICENSE_COUNTRY_FIELD =
        "custrecord_psg_ei_sub_edoc_free_country";
    var COUNTRY = "country";
    var SUBSIDIARIES = "SUBSIDIARIES";
    var SUBSIDIARY = "SUBSIDIARY";
    var NAME = "name";
    var globalCompanyInfo;
    function loadCompanyInformation() {
        if (!globalCompanyInfo) {
            globalCompanyInfo = config.load({
                type: config.Type.COMPANY_INFORMATION,
            });
        }
        return globalCompanyInfo;
    }

    /* This function gets the value of the field E-Document Free country to use from Company Information page */
    function getValueOfAllowedFreeCountry() {
        var subsidiaryFieldScriptIds = [COMPANY_INFO_LICENSE_COUNTRY_FIELD];
        var parentCompanySubsidiaryId = subsidiaryPrefGetter.getParentSubsidiaryId();
        var subsidiaryPreferencesObj =
            subsidiaryPrefGetter.getSubsidiaryPreferencesFieldTexts(
                parentCompanySubsidiaryId,
                subsidiaryFieldScriptIds
            );
        return subsidiaryPreferencesObj[COMPANY_INFO_LICENSE_COUNTRY_FIELD];
    }

    function getInternalIdOfAllowedFreeCountry() {
        var subsidiaryFieldScriptIds = [COMPANY_INFO_LICENSE_COUNTRY_FIELD];
        var parentCompanySubsidiaryId = subsidiaryPrefGetter.getParentSubsidiaryId();
        var subsidiaryPreferencesObj =
            subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                parentCompanySubsidiaryId,
                subsidiaryFieldScriptIds
            );
        return subsidiaryPreferencesObj[COMPANY_INFO_LICENSE_COUNTRY_FIELD];
    }

    /* In OW accounts this function loads the subsidiary record using the internal ID of that subsidiary record as
     * parameter and then gets the value of the country field from it. */
    function getSubsidiaryCountry(subsidiaryId) {
        var SUBSIDIARY_COUNTRY = search.lookupFields({
            type: search.Type.SUBSIDIARY,
            id: subsidiaryId,
            columns: [COUNTRY],
        });
        return (
            SUBSIDIARY_COUNTRY[COUNTRY] &&
            SUBSIDIARY_COUNTRY[COUNTRY][0] &&
            SUBSIDIARY_COUNTRY[COUNTRY][0].text
        );
    }

    function isOwAccount() {
        return runtime.isFeatureInEffect(SUBSIDIARIES);
    }

    /* checks if Subsidiary's country is same EI Free country to use in OW and in SI it
        checks if the value of Country field in Company Information page is same as EI Free country to use. */
    function ifFreeCountrySameAsInTxn(subsidiaryId) {
        var isValid = false;
        var subsidiaryCountry;
        var freeCountry = getValueOfAllowedFreeCountry();
        if (isOwAccount() && subsidiaryId) {
            subsidiaryCountry = getSubsidiaryCountry(subsidiaryId);
            if (freeCountry === subsidiaryCountry) {
                isValid = true;
            }
        }
        return isValid;
    }

    /* Returns List of names of all subsidiaries associated with free country */
    function getSubsidiariesNamesAssociatedWithFreeCountry(freeCountry) {
        var subsidiariesNameList = [];
        var recordType = record.Type.SUBSIDIARY;
        var freeCountryISOCode = countryMapping.getFreeCountryISOCode(freeCountry);
        var filters = [COUNTRY, search.Operator.IS, freeCountryISOCode];
        var columns = [NAME];
        var searchObj = search.create({
            type: recordType,
            filters: filters,
            columns: columns,
        });
        searchObj.run().each(function (result) {
            subsidiariesNameList.push(result.getValue(NAME));
            return true;
        });

        return subsidiariesNameList;
    }

    // For getting all the countries for which the account has a subsidiary present
    function getCountriesNamesWhichHaveSubsidiaries() {
        var countriesNameList = [];
        var recordType = record.Type.SUBSIDIARY;
        // To maintain ascending order of countries
        var columns = [
            search.createColumn({ name: COUNTRY, sort: search.Sort.ASC }),
        ];
        var searchObj = search.create({
            type: recordType,
            columns: columns,
        });
        searchObj.run().each(function (result) {
            var country = result.getText(COUNTRY);
            if (countriesNameList.indexOf(country) === -1) {
                countriesNameList.push(country);
            }
            return true;
        });
        return countriesNameList;
    }
    // For showing and processing the correct Inbound E-Documents which are in FOR_CONVERSION and CONVERSION_FAILED status when License is Inactive
    // we need to find the subsidiary of the vendor to which a particular Inbound E-Document belong to
    function getEntitySubsidiary(entityName, entityType) {
        var ENTITY_ID = "entityid";
        var vendorSearch = search.create({
            type: entityType,
            filters: [ENTITY_ID, search.Operator.IS, entityName],
            columns: [SUBSIDIARY],
            endIndex: Infinity,
        });
        var subsidiaryName;
        vendorSearch.run().each(function (entitySearchResult) {
            subsidiaryName = entitySearchResult.getText(SUBSIDIARY);
            return true;
        });
        return subsidiaryName;
    }

    // For showing and processing the correct Inbound E-Documents which are in FOR_CONVERSION and CONVERSION_FAILED status when License is Inactive
    // we need to find the country to which the subsidiary of the vendor of a particular Inbound E-Document belong to
    function getEntitySubsidiaryCountry(subsidiaryName) {
        var entitySubsidiarySearch = search.create({
            type: SUBSIDIARY,
            filters: [NAME, search.Operator.IS, subsidiaryName],
            columns: [COUNTRY],
            endIndex: Infinity,
        });
        var countryName;
        entitySubsidiarySearch.run().each(function (vendorSearchResult) {
            countryName = vendorSearchResult.getText(COUNTRY);
            return true;
        });
        return countryName;
    }

    function getValueOfCountryInCompanyInformation() {
        var companyInfo = loadCompanyInformation();
        return companyInfo.getText(COUNTRY);
    }

    return {
        ifFreeCountrySameAsInTxn: ifFreeCountrySameAsInTxn,
        getValueOfAllowedFreeCountry: getValueOfAllowedFreeCountry,
        isOwAccount: isOwAccount,
        getSubsidiariesNamesAssociatedWithFreeCountry:
            getSubsidiariesNamesAssociatedWithFreeCountry,
        getCountriesNamesWhichHaveSubsidiaries:
            getCountriesNamesWhichHaveSubsidiaries,
        getEntitySubsidiary: getEntitySubsidiary,
        getEntitySubsidiaryCountry: getEntitySubsidiaryCountry,
        getValueOfCountryInCompanyInformation:
            getValueOfCountryInCompanyInformation,
        getInternalIdOfAllowedFreeCountry: getInternalIdOfAllowedFreeCountry,
    };
});