/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define([
    "N/url",
    "../../app/einvoice/app_einvoice_free_country_check_helper",
    "../../app/einvoice/app_einvoice_license_manager",
    "N/search",
], function (url, freeCountryCheckHelper, licenseManager, search) {
    var INTERNALID_FLD = "internalid";
    var DATE_CREATED_FLD = "created";
    var VENDOR_FLD = "custrecord_psg_ei_inbound_vendor";
    var CUSTOMER_FLD = "custrecord_psg_ei_inbound_customer";
    var TRANS_TYPE_FLD = "custrecord_psg_ei_inbound_transtype";
    var REF_NUM_FLD = "custrecord_psg_ei_inbound_refnum";
    var PO_NUM_FLD = "custrecord_psg_ei_inbound_po";
    var EDOC_VENDOR_TEMPLATE_FLD = "custrecord_psg_ei_inbound_template";
    var EDOC_CUSTOMER_TEMPLATE_FLD = "custrecord_psg_ei_inbound_temp_customer";
    var OUTBOUND_EDOC_TYPE = "outbound";
    var INBOUND_EDOC_TYPE = "inbound";
    var EDOC_TYPE = "outbound";

    /**
     * Converts search results to e-document view objects.
     */
    this.convertResultsToViews = function convertResultsToViews(
        searchObj,
        edocType
    ) {
        EDOC_TYPE = edocType;

        var rowView = function () {
            var obj = {};
            if (EDOC_TYPE === OUTBOUND_EDOC_TYPE) {
                obj = {
                    trans_number: null,
                    trans_type: null,
                    entity: null,
                    subsidiary: null,
                    transaction_date: null,
                    memo: null,
                    template: null,
                    method: null,
                };
            } else {
                obj = {
                    internalid_sub: null,
                    date_created_sub: null,
                    entity_sub: null,
                    trans_type_sub: null,
                    ref_num_sub: null,
                    po_num_sub: null,
                    edoc_template_sub: null,
                };
            }
            return obj;
        };

        var result = {};
        var transURL = "";
        var view = {};
        var viewList = [];

        if (EDOC_TYPE === INBOUND_EDOC_TYPE) {
            // This function call in next line takes search object as parameter and returns valid Inbound E-Documents to be displayed.
            var data = getInboundEDocumentValues(searchObj);
            for (var item in data) {
                result = data[item];
                transURL = getTransactionURL(result.id, result.recordType);
                view = new rowView();
                view.internalid_sub =
                    "<a href='" +
                    transURL +
                    "' target='_blank'>" +
                    result.getValue(INTERNALID_FLD) +
                    "</a>";
                view.date_created_sub = result.getValue(DATE_CREATED_FLD);
                view.entity_sub =
                    result.getText(VENDOR_FLD) || result.getText(CUSTOMER_FLD);
                view.trans_type_sub = result.getText(TRANS_TYPE_FLD);
                view.ref_num_sub = result.getValue(REF_NUM_FLD);
                view.po_num_sub = result.getValue(PO_NUM_FLD);
                view.edoc_template_sub =
                    result.getText(EDOC_VENDOR_TEMPLATE_FLD) ||
                    result.getText(EDOC_CUSTOMER_TEMPLATE_FLD);
                viewList.push(view);
            }
        } else {
            var searchResult = searchObj.runPaged({ pageSize: 1000 });
            searchResult.pageRanges.forEach(function (pageRange) {
                var currPage = searchResult.fetch({ index: pageRange.index });
                currPage.data.forEach(function (currPageResult) {
                    transURL = getTransactionURL(
                        currPageResult.id,
                        currPageResult.recordType
                    );
                    view = new rowView();
                    view.trans_number =
                        "<a href='" +
                        transURL +
                        "' target='_blank'>" +
                        currPageResult.getValue("tranid") +
                        "</a>";
                    view.trans_type = currPageResult.getText("type");
                    view.entity = currPageResult.getText("entity");
                    view.subsidiary = currPageResult.getText("subsidiary");
                    view.transaction_date = currPageResult.getValue("trandate");
                    view.memo = currPageResult.getValue("memo");
                    view.template = currPageResult.getText(
                        "custbody_psg_ei_template"
                    );
                    view.method = currPageResult.getText(
                        "custbody_psg_ei_sending_method"
                    );
                    viewList.push(view);
                });
            });
        }
        return viewList;
    };

    // When license is inactive and free country is set in CI page then we need to filter out only those
    // Inbound E-Documents which belong to those Vendors whose subsidiary belongs to the same country as free country
    function getInboundEDocumentValues(searchObj) {
        var finalResult = {};
        var allowedCountry =
            freeCountryCheckHelper.getValueOfAllowedFreeCountry();
        var finalData = [];
        var licenseInfo = licenseManager.getLicenseInfo();
        var searchResult = searchObj.runPaged({ pageSize: 1000 });
        searchResult.pageRanges.forEach(function (pageRange) {
            var currPage = searchResult.fetch({ index: pageRange.index });
            currPage.data.forEach(function (result) {
                if (
                    freeCountryCheckHelper.isOwAccount() &&
                    !licenseInfo.hasLicense
                ) {
                    var entityName = result.getText(VENDOR_FLD);
                    var entityType = search.Type.VENDOR;
                    if (!entityName) {
                        entityName = result.getText(CUSTOMER_FLD);
                        entityType = search.Type.CUSTOMER;
                    }
                    var subsidiaryName =
                        freeCountryCheckHelper.getEntitySubsidiary(
                            entityName,
                            entityType
                        );
                    var subsidiaryCountry =
                        freeCountryCheckHelper.getEntitySubsidiaryCountry(
                            subsidiaryName
                        );
                    if (allowedCountry === subsidiaryCountry) {
                        finalResult = result;
                        finalData.push(finalResult);
                    }
                } else {
                    finalData.push(result);
                }
            });
        });
        return finalData;
    }

    function getTransactionURL(id, type) {
        return url.resolveRecord({
            recordType: type,
            recordId: id,
            isEditMode: false,
        });
    }

    /**
     * Converts e-document view objects to sublist value objects.
     */
    function convertViewsToFieldValues(views) {
        var fieldValues = [];

        for (var i = 0; i < views.length; i++) {
            var v = views[i];
            var fvalues = retrieveFieldValue(v, i);
            fieldValues = fieldValues.concat(fvalues);
        }

        return fieldValues;
    }

    function retrieveFieldValue(obj, i) {
        var fieldValues = [];

        for (var att in obj) {
            var value = obj[att];
            if (value) {
                var fieldValue = {
                    id: att,
                    line: i,
                    value: value,
                };
                fieldValues.push(fieldValue);
            }
        }

        return fieldValues;
    }

    return {
        convertResultsToViews: convertResultsToViews,
        convertViewsToFieldValues: convertViewsToFieldValues,
        getInboundEDocumentValues: getInboundEDocumentValues,
    };
});
