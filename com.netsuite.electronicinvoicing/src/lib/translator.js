/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Dec 2015         ldimayuga
 *
 * @NModuleScope TargetAccount
 */
define(["N/runtime", "N/translation"], function (
    runtime,
    translationModule
) {
    var locale;
    var LANG = "LANGUAGE";
    var TRANSLATION_COLLECTION_ID = "custcollection_ei_translations";

    function getString(code) {
        if (!locale) {
            locale = runtime.getCurrentUser().getPreference(LANG);
        }
        code = code.toLowerCase();
        code = replaceAll(code, ".", "_");

        var result = "";
        try {
            result = translationModule.get({
                collection: TRANSLATION_COLLECTION_ID,
                key: code,
                locale: locale,
            })();
        } catch (e) {
            log.error(e.name, e.message + "\n" + e.stack);
        }
        return result;
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
    }

    function getStringMap(stringArray) {
        var stringMap = {};
        for (var i = 0; i < stringArray.length; i++) {
            var key = stringArray[i];
            stringMap[key] = getString(key);
        }
        return stringMap;
    }

    function setLocale(l) {
        locale = l;
        //refresh translations for new locale
        //translation = getTranslation();
    }

    return {
        getString: getString,
        getStringMap: getStringMap,
        setLocale: setLocale,
    };
});
