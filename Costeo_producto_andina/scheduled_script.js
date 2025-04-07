/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * 
 * Este script calcula un nuevo costo para los artículos inventariables sumando el costo promedio
 * más un valor simulado que representa "sueldos" (por ahora fijo en 50).
 * Si se le pasa un parámetro con el ID de un artículo, actualiza solo ese artículo.
 */

define(['N/search', 'N/record', 'N/log', 'N/runtime'], function(search, record, log, runtime) {
    function execute(context) {
        // Obtener parámetro opcional del ID del artículo (si se ejecuta desde el botón)
        var itemIdParam = runtime.getCurrentScript().getParameter({
            name: 'custscript_itemid_param'
        });

        if (itemIdParam) {
            // Si se recibe un ID, actualizar solo ese artículo
            procesarItem(parseInt(itemIdParam));
        } else {
            // Si no se recibe parámetro, actualizar todos los artículos
            var itemSearch = search.create({
                type: search.Type.INVENTORY_ITEM,
                filters: [],
                columns: ['internalid', 'averagecost']
            });

            itemSearch.run().each(function(result) {
                var itemId = parseInt(result.getValue('internalid'));
                procesarItem(itemId);
                return true;
            });
        }
    }

    // Función que actualiza el artículo con el nuevo costo
    function procesarItem(itemId) {
        try {
            var itemRecord = record.load({
                type: record.Type.INVENTORY_ITEM,
                id: itemId
            });

            var avgCost = parseFloat(itemRecord.getValue('averagecost')) || 0;
            var sueldos = getSueldosFromCuenta7(itemId); // Sueldo fijo por ahora

            var nuevoCosto = avgCost + sueldos;

            // Guardar el nuevo costo en el campo personalizado
            itemRecord.setValue({
                fieldId: 'custitem_costo_con_sueldos',
                value: nuevoCosto
            });

            itemRecord.save();
            log.debug('Item actualizado', 'ID: ' + itemId + ' - Nuevo costo: ' + nuevoCosto);
        } catch (e) {
            log.error('Error procesando item ' + itemId, e);
        }
    }

    // Función de ejemplo que retorna el valor fijo de sueldos
    function getSueldosFromCuenta7(itemId) {
        return 50.0; // Valor simulado
    }

    return {
        execute: execute
    };
});