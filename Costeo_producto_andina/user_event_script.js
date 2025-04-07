/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * 
 * Este script agrega un botón personalizado en la vista de un artículo de inventario
 * para permitir que el usuario actualice el costo con sueldos.
 */

define(['N/ui/serverWidget', 'N/url'], function(ui, url) {
    function beforeLoad(context) {
        if (context.type !== context.UserEventType.VIEW) return;

        var form = context.form;
        var itemRecord = context.newRecord;

        var itemId = itemRecord.id;

        // Crear la URL del Suitelet que lanzará el cálculo
        var suiteletURL = url.resolveScript({
            scriptId: 'customscript_lanza_costo_suitelet',       // ID del Suitelet
            deploymentId: 'customdeploy_lanza_costo_suitelet',   // Deployment del Suitelet
            params: {
                itemid: itemId
            }
        });

        // Agregar el botón que redirige al Suitelet
        form.addButton({
            id: 'custpage_btn_actualizar_costo',
            label: 'Actualizar costo con sueldos',
            functionName: "window.location.href='" + suiteletURL + "'"
        });
    }

    return {
        beforeLoad: beforeLoad
    };
});