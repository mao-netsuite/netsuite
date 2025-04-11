/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Oct 2015     mjaurigue
 *
 * @NModuleScope TargetAccount
 *
 */

define(["N/search"], function (search) {
    /**
     * Creates a new search. The search can be modified and run as an ad-hoc search, without saving it. Alternatively,
     * calling Search.save() will save the search to the database, so it can be reused later in the UI or using search.load().
     * @param {Object} options the options object
     * @param {string} options.type the record internal ID of the record type you are searching
     * @param {search.Filter | search.Filter[] | Object[]} options.filters (optional) a single filter object or an array of filter objects or a search filter expression
     * @param {search.Column | string | array of (search.Column | string)} options.columns (optional) a single search.Column or string or an array that contains elements of the two types
     * @param {string} options.title (optional) name of the search (when saved)
     * @param {string} options.id (optional) customer ID of the search (when saved), it's a string starting with 'customsearch'
     * @returns {search.Search} the created search
     * @throws {error.SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
     * @throws {error.SuiteScriptError} SSS_INVALID_SRCH_FILTER_EXPR when filters parameter is not a valid filter, array of filters or filter expression
     * @throws {error.SuiteScriptError} SSS_INVALID_SRCH_COLUMN when columns parameter is not a valid column, string, or array of the two
     * @since 2015.2
     */
    function create(obj) {
        if (obj.hasOwnProperty("async") && obj.async === true) {
            delete obj.async;
            var callback = function onResolve(resolve) {
                return resolve;
            };
            var errorCallback = function onReject(reject) {
                return reject;
            };
            if (obj.hasOwnProperty("callback")) {
                callback = obj.callback;
                delete obj.callback;
            }
            if (obj.hasOwnProperty("errorCallback")) {
                errorCallback = obj.errorCallback;
                delete obj.errorCallback;
            }
            return search.create
                .promise(obj)
                .then(callback)
                .catch(errorCallback);
        } else return new Search(obj);
    }

    /**
     * Loads an existing saved search. The saved search could have been created using the UI, or created using search.create()
     * in conjunction with Search.save().
     * @governance 5 units
     * @param {Object} options the options object
     * @param {string} options.id the customer ID or internal ID of the search
     * @returns {search.Search} the loaded search
     * @throws {error.SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
     * @throws {error.SuiteScriptError} INVALID_SEARCH when a search with the given ID is not found
     * @since 2015.2
     */
    function load(obj) {
        return new Search(obj);
    }

    /**
     * A wrapper for the NetSuite Search Object as well as the options parameter
     * This class contains the getIterator method which returns
     * an Iterator object with next and hasNext methods
     *
     * @param {Object} options - The same object to be used for N.search
     * */
    function Search(obj) {
        for (var i in obj) {
            this[i] = obj[i];
        }

        this.getSearchObject = function () {
            if (this.hasOwnProperty("id")) {
                return search.load(this);
            } else {
                return search.create(this);
            }
        };

        this.getIterator = function () {
            return new Iterator(this);
        };

        this.run = function () {
            var nsSearch = this.getSearchObject();
            return nsSearch.run();
        };
    }

    /**
     * A wrapped version of the NetSuite Search Results Object.
     * This class contains the next and hasNext methods
     * This class is made only for the retrieval of data and cannot be used with a range
     * The user should set the range in the Search object instead
     *
     * @param {Object} search - The NetSuite Search object
     * */
    function Iterator(search) {
        var PAGE_SIZE = 1000;

        var nsSearch = search.getSearchObject();
        var pagedSearch = nsSearch.runPaged({ pageSize: PAGE_SIZE });
        var currentPageIndex = 0;
        var currentPage = null;
        var currentIndex = 0;

        function getNextPage() {
            currentPageIndex++;
            currentIndex = 0;
            currentPage = pagedSearch.fetch({ index: currentPageIndex });
        }

        this.hasNext = function () {
            if (pagedSearch.count <= 0) {
                return false;
            }

            if (!currentPage) {
                currentPage = pagedSearch.fetch({ index: currentPageIndex });
            }

            if (
                currentIndex === currentPage.data.length &&
                !currentPage.isLast
            ) {
                getNextPage();
            }

            return currentPage.data[currentIndex] !== undefined;
        };

        this.next = function () {
            var result = currentPage.data[currentIndex];
            currentIndex++;
            return result;
        };

        this.getCount = function () {
            return pagedSearch.count;
        };
    }

    function createFilter(obj) {
        return search.createFilter(obj);
    }

    function createColumn(obj) {
        return search.createColumn(obj);
    }

    /**
     * Performs a search for one or more body fields on a record. This function supports joined-field lookups.
     * Note that the notation for joined fields is: join_id.field_name
     * @governance 1 unit
     * @param {Object} options the options object
     * @param {string} options.type the record internal ID of the record type you are searching
     * @param {string} options.id the internalId of the record
     * @param {string | string[]} options.columns array of column/field names to look up, or a single column/field name
     * @returns {Object} search results in the form of key/value pairs; example:
     * {
     * foo: 'bar',
     * name.join: 'othervalue',
     * select: [{
     * value: '123',
     * text: 'Some UI text'
     * }],
     * multiselect1: [],
     * multiselect2: [{
     * value: '3',
     * text: 'Green'
     * },{
     * value: '5',
     * text: 'Pinkish yellow'
     * }]
     * }
     * @throws {error.SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
     * @since 2015.2
     */
    function lookupFields(options) {
        if (options.hasOwnProperty("async") && options.async === true) {
            delete options.async;
            var callback = function onResolve(resolve) {
                return resolve;
            };
            var errorCallback = function onRejected(reject) {
                return reject;
            };
            if (options.hasOwnProperty("callback")) {
                callback = options.callback;
                delete options.callback;
            }
            if (options.hasOwnProperty("errorCallback")) {
                errorCallback = options.errorCallback;
                delete options.errorCallback;
            }
            return search.lookupFields
                .promise(options)
                .then(callback)
                .catch(errorCallback);
        } else return search.lookupFields(options);
    }

    return {
        create: create,
        load: load,
        createFilter: createFilter,
        Type: search.Type,
        Operator: search.Operator,
        Summary: search.Summary,
        Sort: search.Sort,
        createColumn: createColumn,
        lookupFields: lookupFields,
    };
});
