define(["../../lib/utils"], function (utils) {
    var CUSTOM_STANDARD = "customstandard";
    var STANDARD = "Standard";
    var GENERATION_CHECK_BOX = "custrecord_permission_generation";
    var SENDING_CHECK_BOX = "custrecord_permission_sending";
    var CERTIFICATION_CHECK_BOX = "custrecord_permission_certification";
    var GET_NETWORK_STATUS_CHECK_BOX = "custrecord_permission_network_status";

    function getPermissions(roleId) {
        var permissions = {
            hasGenerationAccess: false,
            hasSendingAccess: false,
            hasCertificationAccess: false,
            hasGetNetworkStatusAccess: false,
        };

        if (!roleId) return JSON.stringify(permissions);

        var results = utils.getRoleLookupResult(roleId, [
            CUSTOM_STANDARD,
            GENERATION_CHECK_BOX,
            CERTIFICATION_CHECK_BOX,
            SENDING_CHECK_BOX,
            GET_NETWORK_STATUS_CHECK_BOX,
        ]);
        if (!results) return JSON.stringify(permissions);

        var isStandardRole = results[CUSTOM_STANDARD] === STANDARD;

        // non-custom roles have permission to perform Edoc processes.
        if (isStandardRole) {
            return JSON.stringify({
                hasGenerationAccess: true,
                hasSendingAccess: true,
                hasCertificationAccess: true,
                hasGetNetworkStatusAccess: true,
            });
        }

        permissions.hasGenerationAccess =
            results[GENERATION_CHECK_BOX] || false;
        permissions.hasSendingAccess = results[SENDING_CHECK_BOX] || false;
        permissions.hasCertificationAccess =
            results[CERTIFICATION_CHECK_BOX] || false;
        permissions.hasGetNetworkStatusAccess =
            results[GET_NETWORK_STATUS_CHECK_BOX] || false;

        return JSON.stringify(permissions);
    }

    return {
        getPermissions: getPermissions,
    };
});
