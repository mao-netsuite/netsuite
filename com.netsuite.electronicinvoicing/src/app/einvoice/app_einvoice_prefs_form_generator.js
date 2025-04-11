/**
 *@NApiVersion 2.1
 */
define([
    "N/ui/serverWidget",
    "../../lib/translator",
    "N/url",
    "N/search",
], function (serverWidget, translator, url, search) {
    const SUBSIDIARY_PREF_REC_TYPE = "customrecord_psg_ei_sub_prefs_data";
    const SUBSIDIARY_INTERNAL_ID_FLD = "custrecord_psg_ei_sub_subsidiary";
    const INTERNAL_ID = "internalid";
    const SUBSIDIARY_LINK_FIELD_PREFIX_ID = "custpage_psg_ei_sub_link_fld_";
    const SUBSIDIARY_LINK_FIELD_STYLE =
        "display: inline-block; margin: 20px 0 20px";
    const SUBSIDIARY_INSTANCES_ERROR_FIELD_ID =
        "custpage_psg_ei_sub_instances_error";
    const SUBSIDIARY_INSTANCES_ERROR_STYLE = "font-size:12px; margin: 20px 0;";
    const ROLE_LINK_FIELD_ID = "custpage_psg_ei_sub_role_link_fld";
    const ROLE_LINK_STYLE = "display: inline-block; margin: 20px 0";

    const FORM_TITLE = "Electronic Invoicing Preferences";
    const FORM_TITLE_CODE = "ei.pref_page_title";

    const SUBSIDIARY_PREFERENCES_GROUP = "custgroup_psg_ei_subsidiaries_group";
    const SUBSIDIARY_PREFERENCES_FLD_GROUP_LABEL = "Subsidiaries";
    const SUBSIDIARY_PREFERENCES_FLD_GROUP_LABEL_CODE =
        "ei_pref_subsidiary_field_group_label";
    const SUBSIDIARY_RECORD_TYPE_ACCESS_ERROR_MSG =
        "To access the e-document subsidiary preferences records, contact your account administrator.";
    const SUBSIDIARY_RECORD_TYPE_ACCESS_ERROR_MSG_CODE =
        "ei.custom_role_access_info_msg";

    const ROLE_PREFERENCES_GROUP = "custgroup_psg_ei_role_perm_group";
    const ROLE_PREFERENCES_FLD_GROUP_LABEL = "Role";
    const ROLE_PREFERENCES_FLD_GROUP_LABEL_CODE =
        "ei.pref_role_field_group_label";

    const ROLE_PREFERENCES_LINK_LABEL = "Role Preferences";
    const ROLE_PREFERENCES_LINK_LABEL_CODE = "ei_role_pref_link_label";
    const MANAGE_ROLES_HREF = "/app/setup/rolelist.nl";

    function getForm() {
        const form = serverWidget.createForm({
            title: translator.getString(FORM_TITLE_CODE) || FORM_TITLE,
        });
        // Subsidiaries Field Group
        const subsidiariesGroup = form.addFieldGroup({
            id: SUBSIDIARY_PREFERENCES_GROUP,
            label:
                translator.getString(
                    SUBSIDIARY_PREFERENCES_FLD_GROUP_LABEL_CODE
                ) || SUBSIDIARY_PREFERENCES_FLD_GROUP_LABEL,
        });
        // Role Permissions Field Group
        const rolePermGroup = form.addFieldGroup({
            id: ROLE_PREFERENCES_GROUP,
            label:
                translator.getString(ROLE_PREFERENCES_FLD_GROUP_LABEL_CODE) ||
                ROLE_PREFERENCES_FLD_GROUP_LABEL,
        });
        const START_ROW_LAYOUT = {
            layoutType: serverWidget.FieldLayoutType.STARTROW,
        };

        // To have both the field groups side to side
        subsidiariesGroup.isSingleColumn = true;
        rolePermGroup.isSingleColumn = true;

        const rolePrefLinkFldParams = {
            id: ROLE_LINK_FIELD_ID,
            type: serverWidget.FieldType.INLINEHTML,
            label: " ",
            container: ROLE_PREFERENCES_GROUP,
        };

        form
            .addField(rolePrefLinkFldParams)
            .updateLayoutType(
                START_ROW_LAYOUT
            ).defaultValue = `<a href='${MANAGE_ROLES_HREF}' style='${ROLE_LINK_STYLE}'>${
            translator.getString(ROLE_PREFERENCES_LINK_LABEL_CODE) ||
            ROLE_PREFERENCES_LINK_LABEL
        }</a>`;

        try {
            const prefInstancesQuery = search.create({
                type: SUBSIDIARY_PREF_REC_TYPE,
                columns: [
                    INTERNAL_ID,
                    search.createColumn({
                        name: SUBSIDIARY_INTERNAL_ID_FLD,
                        sort: search.Sort.ASC,
                    }),
                ],
            });

            prefInstancesQuery.run().each((result) => {
                const prefInstanceId = result.getValue(INTERNAL_ID);
                const subName = result.getText(SUBSIDIARY_INTERNAL_ID_FLD);

                const prefInstanceUrl = url.resolveRecord({
                    recordType: SUBSIDIARY_PREF_REC_TYPE,
                    recordId: prefInstanceId,
                    isEditMode: false,
                });
                const subLinkFldParams = {
                    id: SUBSIDIARY_LINK_FIELD_PREFIX_ID + prefInstanceId,
                    type: serverWidget.FieldType.INLINEHTML,
                    label: " ",
                    container: SUBSIDIARY_PREFERENCES_GROUP,
                };

                form
                    .addField(subLinkFldParams)
                    .updateLayoutType(
                        START_ROW_LAYOUT
                    ).defaultValue = `<a href='${prefInstanceUrl}' style='${SUBSIDIARY_LINK_FIELD_STYLE}'>${subName}</a>`;

                return true;
            });
        } catch (e) {
            const subErrorFldParams = {
                id: SUBSIDIARY_INSTANCES_ERROR_FIELD_ID,
                type: serverWidget.FieldType.INLINEHTML,
                label: " ",
                container: SUBSIDIARY_PREFERENCES_GROUP,
            };

            form
                .addField(subErrorFldParams)
                .updateLayoutType(
                    START_ROW_LAYOUT
                ).defaultValue = `<p style='${SUBSIDIARY_INSTANCES_ERROR_STYLE}'>${
                translator.getString(
                    SUBSIDIARY_RECORD_TYPE_ACCESS_ERROR_MSG_CODE
                ) || SUBSIDIARY_RECORD_TYPE_ACCESS_ERROR_MSG
            }`;
            log.error("error in dashboard showing subsidiary links", e);
        }

        return form;
    }

    return { getForm };
});
