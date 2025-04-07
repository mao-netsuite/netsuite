/**
 * Busca scripst con cierto nombre
 */
require(['N/search'], function(search) {
    var scriptSearch = search.create({
        type: 'script',
        filters: [
            ['scriptid', 'contains', 'Data']
        ],
        columns: ['scriptid', 'name']
    });

    var results = scriptSearch.run().getRange({start: 0, end: 10});

    console.log("Resultados de la búsqueda:", results.map(r => ({
        id: r.getValue('scriptid'),
        name: r.getValue('name')
    })));
});


/**
 * Lista todos los scripts y sus ubicaciones
 */

require(['N/search'], function(search) {
    var scriptSearch = search.create({
        type: 'script', 
        columns: ['name', 'scriptid', 'scriptfile']
    });

    scriptSearch.run().each(function(result) {
        console.log({
            Nombre: result.getValue('name'),
            ScriptID: result.getValue('scriptid'),
            UbicaciónArchivo: result.getText('scriptfile')
        });
        return true; // Continuar con el siguiente resultado
    });
});


/**
 * Carga datos de un record que este dispoblible en el cliente
 */
require(['N/currentRecord'], function(currentRecord) {
    var transaction = currentRecord.get();
    var data = {};

    // Lista de algunos campos comunes en transacciones
    var fieldIds = [
        'id', 'tranid', 'entity', 'total', 'status', 'trandate', 
        'memo', 'currency', 'department', 'location', 'subsidiary'
    ];

    fieldIds.forEach(function(fieldId) {
        data[fieldId] = transaction.getValue({ fieldId: fieldId });
    });

    console.log('Valores de los campos:', data);
});

/**
 * Busca si el campo parent esta disponible en la transaccion
 */
require(['N/currentRecord'], function(currentRecord) {
    var transaction = currentRecord.get();
    
    // Verificar si el campo 'parent' existe antes de obtener su valor
    var parentValue = null;
    try {
        parentValue = transaction.getValue({ fieldId: 'parent' });
    } catch (e) {
        console.warn("El campo 'parent' no está disponible en este tipo de transacción.");
    }

    console.log('Valor del campo parent:', parentValue);
});

/**Cuantas transacciones toienen el campo parent dispobible */
require(['N/currentRecord'], function(currentRecord) {
    var transaction = currentRecord.get();
    console.log('Todos los campos disponibles en esta transacción:', Object.keys(transaction));
});


require(['N/search'], function(search) {
    var scriptSearch = search.create({
        type: 'script', 
        filters: [
            ['datecreated', 'onorafter', '01/03/2024'] // Intenta con 'datecreated' en lugar de 'lastmodifieddate'
        ],
        columns: [
            'scriptid',
            'name',
            'datecreated', // Cambio aquí: usar 'datecreated' en lugar de 'lastmodifieddate'
            'owner'
        ]
    });

    var results = [];
    scriptSearch.run().each(function(result) {
        results.push({
            ScriptID: result.getValue('scriptid'),
            Nombre: result.getValue('name'),
            Fecha_Creación: result.getValue('datecreated'), 
            Propietario: result.getText('owner')
        });
        return true;
    });

    console.table(results);
});

