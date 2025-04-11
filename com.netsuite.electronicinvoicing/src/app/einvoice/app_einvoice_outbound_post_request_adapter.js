/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Oct 2015     ssantiago
 *
 */

define(["N/error"], function (error) {
    /**
     * Extracts the request parameters to an object
     * @param request The request object
     * @returns resultObj Resulting object from parameters
     */
    function extract(request) {
        if (!request) {
            var errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message: "Request object required for extraction.",
                notifyOff: true,
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        }

        var subsidiary = request.parameters.custpage_outbound_subs;
        var entity_type = request.parameters.custpage_outbound_e_type;
        var customer = request.parameters.custpage_outbound_cust;
        var vendor = request.parameters.custpage_outbound_vendor;
        var trantype = request.parameters.custpage_outbound_tran_type;
        var trandate_start =
            request.parameters.custpage_outbound_tran_date_start;
        var trandate_end = request.parameters.custpage_outbound_tran_date_end;
        var country = request.parameters.custpage_outbound_free_country;
        var has_license = request.parameters.custpage_outbound_has_license;
        var has_license_client =
            request.parameters.custpage_outbound_has_license_client;
        var is_result_mode = request.parameters.custpage_outbound_result_mode;
        var sendingType = request.parameters.custpage_outbound_sending_type;

        var resultObj = {};

        if (entity_type) {
            resultObj.entity_type = entity_type;
        }

        if (customer) {
            resultObj.customer = customer;
        }

        if (vendor) {
            resultObj.vendor = vendor;
        }

        if (subsidiary) {
            resultObj.subsidiary = subsidiary;
        }

        if (trantype) {
            resultObj.transaction_type = trantype;
        }

        if (trandate_start) {
            resultObj.transaction_date_start = trandate_start;
        }

        if (trandate_end) {
            resultObj.transaction_date_end = trandate_end;
        }

        if (country) {
            resultObj.country = country;
        }

        if (has_license) {
            resultObj.has_license = has_license;
        }

        if (has_license_client) {
            resultObj.has_license_client = has_license_client;
        }

        if (is_result_mode) {
            resultObj.is_result_mode = is_result_mode;
        }

        if (sendingType) {
            resultObj.sendingType = sendingType;
        }

        return resultObj;
    }

    return {
        extract: extract,
    };
});
