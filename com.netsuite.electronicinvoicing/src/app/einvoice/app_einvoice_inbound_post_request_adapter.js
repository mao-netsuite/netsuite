/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Handle request parameters and return an object encapsulating all parameters.
 *
 * Version    Date            Author           Remarks
 * 1.00       10 Nov 2016     esia
 *
 */

define(["N/error"], function (error) {
    /**
     * Extracts the request parameters to an object
     *
     * @param request The request object
     *
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

        var vendor = request.parameters.custpage_inbound_vendor;
        var entity_type = request.parameters.custpage_inbound_e_type;
        var customer = request.parameters.custpage_inbound_cust;
        var datecreated_start =
            request.parameters.custpage_inbound_date_created_start;
        var datecreated_end =
            request.parameters.custpage_inbound_date_created_end;
        var transType = request.parameters.custpage_inbound_trans_type;
        var country = request.parameters.custpage_inbound_free_country;
        var has_license = request.parameters.custpage_inbound_has_license;
        var has_license_client =
            request.parameters.custpage_inbound_has_license_client;
        var is_result_mode = request.parameters.custpage_inbound_result_mode;

        var resultObj = {};

        if (vendor) {
            resultObj.vendor = vendor;
        }

        if (entity_type) {
            resultObj.entity_type = entity_type;
        }

        if (customer) {
            resultObj.customer = customer;
        }

        if (datecreated_start) {
            resultObj.date_created_start = datecreated_start;
        }

        if (datecreated_end) {
            resultObj.date_created_end = datecreated_end;
        }

        if (transType) {
            resultObj.trans_type = transType;
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

        return resultObj;
    }

    return {
        extract: extract,
    };
});
