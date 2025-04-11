/**

 *    Copyright 2016 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.

 */

/**

 * @NApiVersion 2.x

 * @NModuleScope Public

 */

define(["../lib/dao_factory", "N/search"], function (daoFactory, search) {
    var RECORD_TYPE = "customrecord_psg_ei_standards";

    var DEFAULT_PACKAGE = "Default E-Document Package";

    var FIELD_MAP = {
        name: "name",

        description: "custrecord_psg_ei_standard_desc",

        validationPlugin: "custrecord_psg_ei_standard_inboundplugin",

        hashCode: "custrecord_psg_ei_package_identifier",
    };

    var daoParams = {
        recordType: RECORD_TYPE,

        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    /**

       * Create  e-document to be passed to DAO Factory Instance

       * @param {Object} edocPackage Inbound E-Document Object

       * @returns {Integer} Record ID

       */

    function create(edocPackage) {
        return dao.create(edocPackage);
    }

    function getHashCode(str) {
        var h = 0,
            l = str.length,
            i = 0;

        if (l > 0) while (i < l) h = ((h << 5) - h + str.charCodeAt(i++)) | 0;

        return h;
    }

    function getPackageId(pacName) {
        var filters = [FIELD_MAP.name, search.Operator.IS, pacName];

        var hashCode = getHashCode(pacName);

        var columns = ["internalid", FIELD_MAP.hashCode];

        var packageId;

        var packageSearch = search.create({
            type: RECORD_TYPE,

            columns: columns,

            filters: filters,
        });

        packageSearch.run().each(function (result) {
            var hashCodeStored = Number(result.getValue(FIELD_MAP.hashCode));

            if (hashCodeStored === hashCode || pacName === DEFAULT_PACKAGE) {
                packageId = result.id;
                return false;
            }
            return true;
        });

        return packageId;
    }

    return {
        create: create,

        getPackageId: getPackageId,
    };
});
