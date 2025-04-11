/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Handle form request parameters for inbound bulk conversion for failed e-documents page.
 *
 * Version    Date            Author           Remarks
 * 1.00       09 Nov 2016     esia
 *
 */

define([], function () {
    function extractRequestParameters(request) {
        var vendor;
        var datecreated_start;
        var datecreated_end;
        var transType;
        var country;
        var has_license;
        var has_license_client;
        var result_mode;
        var entity_type;
        var customer;

        if (request) {
            entity_type = request.parameters.custpage_inbound_e_type;
            customer = request.parameters.custpage_inbound_cust;
            vendor = request.parameters.custpage_inbound_vendor;
            datecreated_start =
                request.parameters.custpage_inbound_date_created_start;
            datecreated_end =
                request.parameters.custpage_inbound_date_created_end;
            transType = request.parameters.custpage_inbound_trans_type;
            country = request.parameters.custpage_inbound_free_country;
            has_license = request.parameters.custpage_inbound_has_license;
            has_license_client =
                request.parameters.custpage_inbound_has_license_client;
            result_mode = request.parameters.custpage_inbound_result_mode;
        }

        var parameters = {};

        if (country) {
            parameters.custpage_inbound_free_country = country;
        }

        if (has_license) {
            parameters.custpage_inbound_has_license = has_license;
        }

        if (has_license_client) {
            parameters.custpage_inbound_has_license_client = has_license_client;
        }

        if (has_license_client && (country || has_license === "T")) {
            if (entity_type) {
                parameters.custpage_inbound_e_type = entity_type;
            }

            if (customer) {
                parameters.custpage_inbound_cust = customer;
            }
            if (vendor) {
                parameters.custpage_inbound_vendor = vendor;
            }

            if (datecreated_start) {
                parameters.custpage_inbound_date_created_start =
                    datecreated_start;
            }

            if (datecreated_end) {
                parameters.custpage_inbound_date_created_end = datecreated_end;
            }

            if (transType) {
                parameters.custpage_inbound_trans_type = transType;
            }

            if (result_mode) {
                parameters.custpage_inbound_result_mode = result_mode;
            }

        } else {
            parameters.custpage_inbound_result_mode = null;
        }

        return parameters;
    }

    return {
        extractRequestParameters: extractRequestParameters,
    };
});
