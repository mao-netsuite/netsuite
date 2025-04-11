/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Portlet Script for Electronic Invoicing Dashboard Portlet
 *
 * Version    Date            Author           Remarks
 * 1.00       15 Mar 2017     ssantiago
 *
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */

define([
    "N/search",
    "N/url",
    "../../lib/translator",
    "../../app/einvoice/app_einvoice_dashboard_portlet_builder",
], function (search, url, translator, portletBuilder) {
    // Constants
    var CONVERSION_FAILED = "14";
    var POSITIVE = "POSITIVE";
    var NEGATIVE = "NEGATIVE";
    var LEFT = "LEFT";
    var RIGHT = "RIGHT";

    function render(params) {
        params.portlet.title = translator.getString("portlet.title");

        constructLeftColumn();
        constructRightColumn();

        params.portlet.html = portletBuilder.getHTMLContent();
    }

    /**
     * constructLeftColumn - method that adds objects to the left side of the portlet
     * @returns void
     */
    function constructLeftColumn() {
        var labelForSending = translator.getString(
            "portlet.outboundforsending"
        );

        // Add For Generation Metric
        var forGenerationSearch = search.load({
            id: "customsearch_edoc_for_generation",
        });
        portletBuilder.addMetric({
            title: translator.getString("portlet.outboundforgeneration"),
            searchObj: forGenerationSearch,
            metricType: POSITIVE,
            section: LEFT,
        });

        //Add For Certification Metric only if there is at-least one Sending Method with For Certification enabled.

        if (checkSendCertificationEnabled()) {
            var forCertificationSearch = search.load({
                id: "customsearch_edoc_for_certification",
            });

            portletBuilder.addMetric({
                title: translator.getString("portlet.outboundforcertification"),
                searchObj: forCertificationSearch,
                metricType: POSITIVE,
                section: LEFT,
            });

            //Change the label of Sending Certified document
            labelForSending = translator.getString(
                "portlet.outboundcertifiedforsending"
            );
        }

        // Add For Sending Metric
        var forSendingSearch = search.load({
            id: "customsearch_edoc_for_sending",
        });
        portletBuilder.addMetric({
            title: labelForSending,
            searchObj: forSendingSearch,
            metricType: POSITIVE,
            section: LEFT,
        });

        // Add Outbound Errors Metric
        var outboundErrorSearch = search.load({
            id: "customsearch_edoc_with_errors",
        });
        portletBuilder.addMetric({
            title: translator.getString("portlet.outboundwitherrors"),
            searchObj: outboundErrorSearch,
            metricType: NEGATIVE,
            section: LEFT,
        });

        // Add Outbound Sending Link
        var sendingSuiteletURL = url.resolveScript({
            scriptId: "customscript_ei_outbound_form_su",
            deploymentId: "customdeploy_ei_outbound_form_su",
        });
        portletBuilder.addLink({
            url: sendingSuiteletURL,
            text: translator.getString("portlet.outboundsendinglink"),
            section: LEFT,
        });
    }

    /**
     * constructRightColumn - method that adds objects to the right side of the portlet
     * @returns void
     */
    function constructRightColumn() {
        // Add For Conversion Metric
        var forConversionSearch = search.load({
            id: "customsearch_edoc_inbound_for_conversion",
        });
        portletBuilder.addMetric({
            title: translator.getString("portlet.inboundforconversion"),
            searchObj: forConversionSearch,
            metricType: POSITIVE,
            section: RIGHT,
        });

        // Add Conversion Failed Metric
        var statusFilter = search.createFilter({
            name: "custrecord_psg_ei_inbound_status",
            operator: search.Operator.IS,
            values: CONVERSION_FAILED,
        });
        var conversionFailedSearch = search.create({
            type: "customrecord_psg_ei_inbound_edoc",
            filters: [statusFilter],
        });
        var conversionSuiteletUrl = url.resolveScript({
            scriptId: "customscript_ei_inbound_form_su",
            deploymentId: "customdeploy_ei_inbound_form_su",
        });
        portletBuilder.addMetric({
            title: translator.getString("portlet.inboundconvertfailed"),
            searchObj: conversionFailedSearch,
            metricType: NEGATIVE,
            section: RIGHT,
            linkUrl: conversionSuiteletUrl,
        });

        // Add For Incomplete Metric
        var inboundIncompleteSearch = search.load({
            id: "customsearch_edoc_inbound_incomplete",
        });
        portletBuilder.addMetric({
            title: translator.getString("portlet.inboundincomplete"),
            searchObj: inboundIncompleteSearch,
            metricType: NEGATIVE,
            section: RIGHT,
        });

        /**
         * Following snippet adds a invisible metric in right column so that the LEFT and RIGHT columns look balanced in case when LEFT column has "Outbound E-Documents for Certification"  metric
         */
        if (checkSendCertificationEnabled()) {
            var randomSearch = search.load({
                id: "customsearch_edoc_inbound_incomplete",
            });
            portletBuilder.addMetric({
                title: translator.getString("portlet.inboundincomplete"),
                searchObj: randomSearch,
                metricType: NEGATIVE,
                section: RIGHT,
                visibility: "hidden",
            });
        }

        // Add Manual Upload Link
        var manualUploadInboundURL = url.resolveRecord({
            recordType: "customrecord_psg_ei_inbound_edoc",
        });
        portletBuilder.addLink({
            url: manualUploadInboundURL,
            text: translator.getString("portlet.inbounduploadlink"),
            section: RIGHT,
        });
    }

    function checkSendCertificationEnabled() {
        var forCertificationSearchCheck = search.load({
            id: "customsearch_ei_sending_methods_certific",
        });

        try {
            return (
                forCertificationSearchCheck.runPaged({
                    pageSize: 10,
                }).count > 0
            );
        } catch (e) {
            if (e.name === "INSUFFICIENT_PERMISSION") {
                return false;
            } else {
                throw e;
            }
        }
    }

    return {
        render: render,
    };
});
