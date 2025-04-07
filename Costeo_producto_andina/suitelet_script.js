/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * 
 * Este Suitelet recibe el ID de un artículo desde la ficha del ítem,
 * y lanza el Scheduled Script para actualizar el costo del artículo.
 * Luego redirige al usuario nuevamente al ítem.
 */

define(['N/task', 'N/redirect', 'N/record'], function(task, redirect, record) {
    function onRequest(context) {
        var itemId = context.request.parameters.itemid;

        // Crear y lanzar el Scheduled Script, pasando el itemId como parámetro
        var scheduledScriptTask = task.create({
            taskType: task.TaskType.SCHEDULED_SCRIPT,
            scriptId: 'customscript_actualiza_costo_sched',        // ID real del Scheduled Script
            deploymentId: 'customdeploy_actualiza_costo_sched',    // Deployment del Scheduled
            params: {
                custscript_itemid_param: itemId
            }
        });

        scheduledScriptTask.submit();

        // Redirigir de nuevo a la ficha del artículo
        redirect.toRecord({
            type: record.Type.INVENTORY_ITEM,
            id: itemId
        });
    }

    return {
        onRequest: onRequest
    };
});