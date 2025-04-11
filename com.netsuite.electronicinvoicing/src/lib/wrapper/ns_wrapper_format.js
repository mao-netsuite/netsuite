/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       21 Oct 2015     ssantiago
 *
 * @NModuleScope TargetAccount
 */
define(["N/format"], function (formatter) {
    /**
     * Parse a value from the appropriate preference format (if it exists) to its raw value.
     *
     * @param {Object} options
     * @param {string} options.value the data you wish to parse
     * @param {Type} options.type the field type i.e. DATE, CURRENCY, INTEGER
     *
     * @return {Date|string|number} If parseable, the parsed value. If not or given an invalid Type, the value passed in options.value
     *
     * @since 2015.2
     */
    /**
     * For DateTime, DateTimeTZ ONLY
     * Formats a Date object into a String in the specified timezone
     *
     * @param {Object} options
     * @param {Date} options.value the Date object to parse
     * @param {Type} options.type the field type (DATETIME or DATETIMETZ)
     * @param {Timezone} options.timezone (optional) the timezone (an Olson Value) in which the resulting string will be in. If left empty, it will default to the User Preference TIMEZONE.
     *
     * @return {String} Contains the Date/Time information as a string in the specified timezone.
     *
     * @since 2015.2
     */
    function format(options) {
        return formatter.format(options);
    }

    /**
     * Parse a value from the raw value to its appropriate preference format (if it exists)
     *
     * @param {Object} options
     * @param {Date|string|number} options.value the data you wish to format
     * @param {Type} options.type the field type i.e. DATE, CURRENCY, INTEGER
     *
     * @return {string} If formattable, the formatted value. If not or given an invalid Type, the value passed in options.value
     *
     * @since 2015.2
     */
    /**
     * For DateTime, DateTimeTZ ONLY
     * Parses a String containing the Date/Time information in the specified timezone into a Date object
     *
     * @param {Object} options
     * @param {String} options.value the String that contains the date/time information in the specified timezone.
     * @param {Type} options.type the field type (DATETIME or DATETIMETZ)
     * @param {Timezone} options.timezone (optional) the timezone (an Olson Value) in which the value represents. If left empty, it will default to the User Preference TIMEZONE.
     *
     * @return {Date} Contains a Date object in the users local app timezone relative to the passed in value/timezone parameters
     *
     * @since 2015.2
     */
    function parse(options) {
        return formatter.parse(options);
    }

    return {
        Type: formatter.Type,
        Timezone: formatter.Timezone,
        format: format,
        parse: parse,
    };
});
