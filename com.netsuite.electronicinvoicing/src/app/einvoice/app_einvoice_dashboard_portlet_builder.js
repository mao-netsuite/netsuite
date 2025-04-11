/**

 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 * otherwise make available this code.

 *

 * Module used for creating the E-Document Dashboard Portlet

 *

 * Version    Date            Author           Remarks

 * 1.00       21 Mar 2017     ssantiago

 *

 */

define([
    "N/error",

    "N/format",

    "N/url",

    "../../lib/string_formatter",
], function (error, format, url, stringFormatter) {
    // Constants

    var POSITIVE_COLOR = "#255999";

    var NEGATIVE_COLOR = "#FB451E";

    var NEUTRAL_COLOR = "#666666";

    var POSITIVE = "POSITIVE";

    var NEGATIVE = "NEGATIVE";

    var LEFT = "LEFT";

    var RIGHT = "RIGHT";

    // Global Variables

    var portletContents = [];

    var errorParams;

    /**

         * addMetric - method to add metric values to the dashboard portlet

         * @param params.title {String} Title of the metric

         * @param params.searchObj {Object} search Object

         * @param params.metricType {String} value should either be 'POSITIVE' or 'NEGATIVE'

         * @param params.section {String} value should either be 'LEFT' or 'RIGHT'

         * @returns void

         */

    function addMetric(params) {
        var requiredParams = ["title", "searchObj", "metricType", "section"];

        for (var i = 0; i < requiredParams.length; i++) {
            if (!params[requiredParams[i]]) {
                errorParams = {
                    name: "REQUIRED_PARAM_MISSING",

                    message:
                        requiredParams[i] +
                        " parameter is required when adding a metric to this dashboard.",
                };

                log.error(errorParams.name, errorParams.message);

                throw error.create({
                    name: errorParams.name,

                    message: errorParams.message,

                    notifyOff: true,
                });
            }
        }

        if ([POSITIVE, NEGATIVE].indexOf(params.metricType) === -1) {
            errorParams = {
                name: "INVALID_PARAM_VALUE",

                message:
                    "metricType parameter value should be positive/negative.",
            };

            log.error(errorParams.name, errorParams.message);

            throw error.create({
                name: errorParams.name,

                message: errorParams.message,

                notifyOff: true,
            });
        }

        if ([LEFT, RIGHT].indexOf(params.section) === -1) {
            errorParams = {
                name: "INVALID_PARAM_VALUE",

                message: "section parameter value should be left/right.",
            };

            log.error(errorParams.name, errorParams.message);

            throw error.create({
                name: errorParams.name,

                message: errorParams.message,

                notifyOff: true,
            });
        }

        var searchObj = params.searchObj;

        var searchResultCount;

        var finalSearchCount;

        try {
            var searchResults = searchObj.runPaged({
                pageSize: 1000,
            });

            searchResultCount = searchResults.count;

            finalSearchCount =
                searchResultCount > 1
                    ? getUniqueCountOfSearchResults(searchResults).length
                    : searchResultCount;

            log.debug("finalSearchCount", finalSearchCount);
        } catch (e) {
            if (e.name === "INSUFFICIENT_PERMISSION") {
                finalSearchCount = 0;
            } else {
                throw e;
            }
        }

        var metricColor =
            params.metricType === POSITIVE ? POSITIVE_COLOR : NEGATIVE_COLOR;

        var actualColor = finalSearchCount > 0 ? metricColor : NEUTRAL_COLOR;

        var searchResultFormattedCount = format.format({
            value: finalSearchCount,

            type: format.Type.INTEGER,
        });

        var linkUrl;

        if (params.linkUrl) {
            linkUrl = params.linkUrl;
        } else {
            linkUrl = url.resolveTaskLink("LIST_SEARCHRESULTS", {
                searchid: searchObj.id,
            });
        }

        var visibility;

        if (params.visibility) {
            visibility = params.visibility;
        } else visibility = "visible";

        var metricHTML =
            '<div style="padding: 1em; visibility: {VISIBILITY}"><h1 style="color: #333333; font-weight: 600; font-size: 17px;">{TITLE}</h1><a style="font-size: 20px; font-weight: 600; color: {ACTUALCOLOR}" href="{LINK}" target="_blank">{COUNT}</a></div>';

        var stringParams = {
            TITLE: params.title,

            ACTUALCOLOR: actualColor,

            COUNT: searchResultFormattedCount,

            LINK: linkUrl,

            VISIBILITY: visibility,
        };

        stringFormatter.setString(metricHTML);

        stringFormatter.replaceParameters(stringParams);

        var metric = {
            section: params.section,

            content: stringFormatter.toString(),
        };

        portletContents.push(metric);
    }

    /**

         * addLink - method to add link to the dashboard portlet

         * @param params.url {String} URL of the link

         * @param params.text {String} Text to be displayed

         * @param params.section {String} value should either be 'LEFT' or 'RIGHT'

         * @returns void

         */

    function addLink(params) {
        var requiredParams = ["url", "text", "section"];

        for (var i = 0; i < requiredParams.length; i++) {
            if (!params[requiredParams[i]]) {
                errorParams = {
                    name: "REQUIRED_PARAM_MISSING",

                    message:
                        requiredParams[i] +
                        " parameter is required when adding a link to this dashboard.",
                };

                log.error(errorParams.name, errorParams.message);

                throw error.create({
                    name: errorParams.name,

                    message: errorParams.message,

                    notifyOff: true,
                });
            }
        }

        var linkHtml =
            '<div style="border-top: 1px solid #ccc; padding: 1em;"><a href="{URL}" target="_blank">{TEXT}</a></div>';

        var stringParams = {
            URL: params.url,

            TEXT: params.text,
        };

        stringFormatter.setString(linkHtml);

        stringFormatter.replaceParameters(stringParams);

        var link = {
            section: params.section,

            content: stringFormatter.toString(),
        };

        portletContents.push(link);
    }

    function getUniqueCountOfSearchResults(searchResults) {
        var uniqueArr = [];
        searchResults.pageRanges.forEach(function (pageRange) {
            var currPage = searchResults.fetch({ index: pageRange.index });

            currPage.data.forEach(function (result) {
                if (uniqueArr.indexOf(result) === -1) {
                    uniqueArr.push(result);
                }
            });
        });

        log.debug("unique items array", uniqueArr);

        return uniqueArr;
    }

    /**

         * getHTMLContent - method to get the entire HTML of the dashboard portlet content

         * @returns {String} HTML of the portlet content

         */

    function getHTMLContent() {
        var leftContainerHtml =
            '<div style="float: left; width: 50%; text-align: center; border-right: 1px solid #ccc;">{METRICS}</div>';

        var leftItems = "";

        var rightContainerHtml =
            '<div style="float: left; width: 50%; text-align: center;">{METRICS}</div>';

        var rightItems = "";

        for (var i = 0; i < portletContents.length; i++) {
            if (portletContents[i].section === LEFT) {
                leftItems += portletContents[i].content;
            } else {
                rightItems += portletContents[i].content;
            }
        }

        stringFormatter.setString(leftContainerHtml);

        stringFormatter.replaceParameters({
            METRICS: leftItems,
        });

        var leftColumnHtml = stringFormatter.toString();

        stringFormatter.setString(rightContainerHtml);

        stringFormatter.replaceParameters({
            METRICS: rightItems,
        });

        var rightColumnHtml = stringFormatter.toString();

        var html =
            '<div id="edocumentPortletContainer">{LEFTCOLUMN}{RIGHTCOLUMN}<div style="clear: both"></div></div>';

        stringFormatter.setString(html);

        stringFormatter.replaceParameters({
            LEFTCOLUMN: leftColumnHtml,

            RIGHTCOLUMN: rightColumnHtml,
        });

        return stringFormatter.toString();
    }

    return {
        addMetric: addMetric,

        addLink: addLink,

        getHTMLContent: getHTMLContent,
    };
});
