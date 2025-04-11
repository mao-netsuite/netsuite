/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       20 Oct 2015     mjaurigue
 *
 */

define([], function () {
    function extractRequestParameters(request) {
        var subsidiary;
        var entity_type;
        var customer;
        var vendor;
        var trantype;
        var trandate_start;
        var trandate_end;
        var country;
        var has_license;
        var has_license_client;
        var result_mode;
        var sendingType;

        if (request) {
            subsidiary = request.parameters.custpage_outbound_subs;
            entity_type = request.parameters.custpage_outbound_e_type;
            customer = request.parameters.custpage_outbound_cust;
            vendor = request.parameters.custpage_outbound_vendor;
            trantype = request.parameters.custpage_outbound_tran_type;
            trandate_start =
                request.parameters.custpage_outbound_tran_date_start;
            trandate_end = request.parameters.custpage_outbound_tran_date_end;
            country = request.parameters.custpage_outbound_free_country;
            has_license = request.parameters.custpage_outbound_has_license;
            has_license_client =
                request.parameters.custpage_outbound_has_license_client;
            result_mode = request.parameters.custpage_outbound_result_mode;
            sendingType = request.parameters.custpage_outbound_sending_type;
        }

        var parameters = {};

        if (country) {
            parameters.custpage_outbound_free_country = country;
        }

        if (has_license) {
            parameters.custpage_outbound_has_license = has_license;
        }

        if (has_license_client) {
            parameters.custpage_outbound_has_license_client =
                has_license_client;
        }

        if (has_license_client && (country || has_license === "T")) {
            if (entity_type) {
                parameters.custpage_outbound_e_type = entity_type;
            }

            if (subsidiary) {
                parameters.custpage_outbound_subs = subsidiary;
            }

            if (customer) {
                parameters.custpage_outbound_cust = customer;
            }

            if (vendor) {
                parameters.custpage_outbound_vendor = vendor;
            }

            if (trantype) {
                parameters.custpage_outbound_tran_type = trantype;
            }

            if (trandate_start) {
                parameters.custpage_outbound_tran_date_start = trandate_start;
            }

            if (trandate_end) {
                parameters.custpage_outbound_tran_date_end = trandate_end;
            }

            if (result_mode) {
                parameters.custpage_outbound_result_mode = result_mode;
            }
            if (sendingType) {
                parameters.custpage_outbound_sending_type = sendingType;
            }
        } else {
            parameters.custpage_outbound_result_mode = null;
        }

        return parameters;
    }

    return {
        extractRequestParameters: extractRequestParameters,
    };
});
