define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Detalles";
    translation["email.attachment.collabel.transactiontype"] =
        "Tipo de transacción";
    translation["email.attachment.collabel.internalid"] = "ID interno";
    translation["email.attachment.collabel.vendor"] = "Proveedor";
    translation["email.conversionerrornotification.subject"] =
        "Error detectado durante la conversión del documento electrónico entrante";
    translation["email.conversionerrornotification.body"] =
        "Se detectaron errores durante la conversión del documento electrónico de entrada.<br/>Consulte el archivo adjunto para ver la lista de registros con error y sus detalles.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Nota: Si desea que otro usuario reciba las notificaciones en lugar de los administradores de su cuenta, introduzca la dirección de correo electrónico del usuario en el campo Destinatario de notificaciones de documentos electrónicos en el registro de la subsidiaria principal.";
    translation["email.table.collabel.inboundedocumentid"] =
        "ID de documento electrónico de entrada";
    translation["email.table.collabel.details"] = "Detalles";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Se encontró un error durante la verificación de licencia de la cuenta";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing en múltiples países.</br>Para procesar documentos electrónicos de forma masiva, configure País de documento electrónico de uso libre en la página de información de la empresa.";
    translation["inboundedocument.logforconversion"] =
        "El documento electrónico entrante está listo para su conversión.";
    translation["inboundedocument.logincomplete"] =
        "El documento electrónico entrante está incompleto. No se ha seleccionado ningún {FIELD}.";
    translation["inboundedocument.deletenotallowed"] =
        "No está permitido eliminar un documento electrónico entrante.";
    translation["inboundedocument.copynotallowed"] =
        "No está permitido copiar un documento electrónico entrante.";
    translation["inboundedocument.contextunsupported"] =
        "El documento electrónico entrante solo admite los contextos IU y SuiteScript.";
    translation["inboundedocument.invalidxmlfile"] =
        "El archivo XML de referencia seleccionado no es un archivo XML válido. Asegúrese de que tenga la extensión .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "El archivo PDF de referencia seleccionado no es un archivo PDF válido. Asegúrese de que tenga la extensión .pdf.";
    translation["inboundedocument.invalidxml"] =
        "El archivo XML de referencia seleccionado no es un documento XML con formato correcto.";
    translation["inboundedocument.convert.button"] = "Convertir";
    translation["inboundedocument.convert.information"] =
        "El proceso de conversión de este documento electrónico entrante está en curso.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "El proceso de conversión de este documento electrónico entrante ya está en curso.";
    translation["inboundedocument.cancel.button"] =
        "Cancelar documento electrónico";
    translation["inboundedocument.cancel.confirmation"] =
        "¿Está seguro de que desea cancelar este documento electrónico de entrada?";
    translation["inboundedocument.cancel.failed"] =
        "La cancelación falló porque el estado del registro de documento electrónico de entrada es '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "Se produjo un error durante la cancelación. Compruebe el Historial de auditoría de documentos electrónicos en la subficha Documento electrónico para obtener detalles.";
    translation["inboundedocument.cancel.complete"] =
        "Se ha cancelado el documento electrónico.";
    translation["inboundedocument.preview.button"] = "Ver XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing SuiteApp en múltiples países. Si desea convertir este documento electrónico en una transacción, comuníquese con el administrador de su cuenta para especificar un país en el campo País de documento electrónico de uso libre, en la página de información de la empresa.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing SuiteApp en varios países. Si desea convertir este documento electrónico en una transacción, comuníquese con el administrador su cuenta de NetSuite para comprar una licencia.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing SuiteApp en varios países. Si desea convertir este documento electrónico en una transacción, configure la dirección de facturación predeterminada del proveedor seleccionado.";
    translation["validationplugin.contextunsupported"] =
        "El plugin de validación de documentos electrónicos de entrada solo admite los contextos IU y SuiteScript.";
    translation["validationplugin.pluginimplementation"] =
        "Implementación del plugin de validación de documentos electrónicos de entrada";
    translation["validationplugin.pluginimplementationhelp"] =
        "Seleccione la implementación de un plugin de validación de documentos electrónicos de entrada.";
    translation["validationplugin.scriptbannermessage"] =
        "La validación de documentos electrónicos de entrada debe ser una implantación de plugins personalizados. Recree los scripts de validación existentes como nuevas implementaciones de plugins personalizados del tipo Plugin de validación de entrada.";
    translation["ei.conversion.defaulterror"] =
        "Se produjo un error durante la conversión. Compruebe el Historial de auditoría de documentos electrónicos en la subficha Documento Electrónico para obtener detalles.";
    translation["ei.conversion.inactivevendor"] =
        "No se pudo convertir este documento electrónico de entrada porque el proveedor seleccionado está inactivo. El campo Estado de documento electrónico no se ha actualizado y no se ha creado un historial de auditoría. Desmarque la casilla Inactivo en el registro del proveedor y después intente convertir el documento electrónico nuevamente.";
    translation["ei.conversion.inactivecustomer"] =
        "No se pudo convertir este documento electrónico de entrada porque el cliente seleccionado está inactivo. El campo Estado de documento electrónico no se ha actualizado y no se ha creado un historial de auditoría. Desmarque la casilla Inactivo en el registro del cliente y después intente convertir el documento electrónico nuevamente.";
    translation["ei.conversion.conversioncomplete"] =
        "Se ha convertido el documento electrónico.";
    translation["ei.conversion.conversionlogbulk"] =
        "El documento electrónico de entrada se incluyó en la conversión masiva y se convirtió en la transacción de tipo '{TYPE}' con ID interno {INTERNALID}.";
    translation["ei.conversion.conversionlog"] =
        "El documento electrónico de entrada se convirtió en la transacción de tipo '{TYPE}' con ID interno {INTERNALID}.";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Proceso de conversión masiva\nPlantilla de documento electrónico utilizada: {TEMPLATENAME}\nAlcance del error: {ERRORSCOPE}\nDetalles del error: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Plantilla de documento electrónico utilizada: {TEMPLATENAME}\nAlcance del error: {ERRORSCOPE}\nDetalles del error: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Fallo en el análisis. Compruebe la asignación de campo de documentos electrónicos de entrada.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Fallo en la conversión.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Fallo en la validación.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "La conversión falló porque el estado del registro de documento electrónico de entrada es '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "No se admiten documentos electrónicos entrantes con clientes inactivos para el proceso de conversión.";
    translation["ei.conversion.inactivevendor.converter"] =
        "No se admiten documentos electrónicos entrantes con proveedores inactivos para el proceso de conversión.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Los siguientes códigos de proveedor: {ITEMLIST}, no están asociados con ningún registro de artículos.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Los siguientes códigos/nombres de proveedor: {ITEMLIST}, no están asociados con ningún registro de artículos.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Los siguientes códigos de proveedor: {ITEMLIST}, están asociados con varios registros de artículos. Modifique los registros de artículos y asegúrese de que cada artículo tenga un código de proveedor exclusivo, por proveedor.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Los siguientes códigos/nombres de proveedor: {ITEMLIST}, están asociados con varios registros de artículos. Modifique los registros de artículos y asegúrese de que cada artículo tenga un código/nombre de proveedor exclusivo, por proveedor.";
    translation["ei.conversion.refnumnotfound"] =
        "Falta el número de referencia obligatorio en el documento electrónico entrante. Cancele este documento electrónico y envíe otro que incluya un elemento XML para el número de referencia, asignado al campo de identificación de la transacción.";
    translation["ei.conversion.refnumexists"] =
        "Ya existe una factura de proveedor con el mismo número de referencia. Cancele este documento electrónico y envíe otro con el valor del número de referencia correcto para el elemento XML asignado al campo de identificación de la transacción.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Falta el campo del código de proveedor en la plantilla del documento electrónico. Modifique la plantilla del documento electrónico o seleccione otra plantilla que incluya la asignación de campo del código de proveedor.";
    translation["ei.conversion.novendorcodevalue"] =
        "Al menos uno de los artículos no tiene ningún código de proveedor. Cancele este documento electrónico y envíe otro con el valor correcto para el elemento XML asignado al campo del código de proveedor.";
    translation["ei.conversion.vendornamenotfound"] =
        "Falta el campo del nombre del proveedor en la plantilla del documento electrónico. Modifique la plantilla del documento electrónico o seleccione otra plantilla que incluya la asignación de campo del nombre del proveedor.";
    translation["ei.conversion.novendornamevalue"] =
        "Al menos uno de los artículos no tiene ningún código/nombre de proveedor. Cancele este documento electrónico y envíe otro con el valor correcto para el elemento XML asignado al campo del código/nombre de proveedor.";
    translation["ei.conversion.sourcetransnotfound"] =
        "No se encontró el registro ({TRANSTYPE} n° {TRANSID}) en el sistema. Cancele este documento electrónico y envíe otro con el valor correcto para el elemento XML asignado al campo createdfrom.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "El registro ({TRANSTYPE} n° {TRANSID}) está asignado a otra entidad. Seleccione la entidad correcta y convierta este documento electrónico.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "El proveedor no tiene ninguna cuenta de gastos predeterminada, lo que es un requisito para convertir las facturas con gastos. Para continuar con la conversión, defina un valor en el campo Cuenta de gastos predeterminada del registro del proveedor.";
    translation["ei.conversion.nolinktopo"] =
        "El documento electrónico entrante no tiene ningún artículo o gasto incluidos en la orden de compra a la que se hace referencia. Controle el estado de la orden de compra mencionada para verificar si se puede convertir. Si se puede convertir, cancele este documento electrónico y envíe otro con el valor correcto para el elemento XML asignado al campo de la fecha de creación.";
    translation["inbound.formtitle"] =
        "Convertir documentos electrónicos de entrada";
    translation["inbound.search"] = "Buscar";
    translation["inbound.convert"] = "Convertir";
    translation["inbound.return"] = "Volver a Criterios";
    translation["inbound.vendor"] = "Proveedor";
    translation["inbound.datefrom"] = "Fecha de creación desde";
    translation["inbound.dateto"] = "Fecha de creación hasta";
    translation["inbound.vendorhelp"] =
        "Seleccione el proveedor correspondiente a los documentos electrónicos entrantes con fallos que se incluirán en el resultado de la búsqueda.";
    translation["inbound.datefromhelp"] =
        "Seleccione una fecha de inicio para definir el período de creación de los documentos electrónicos entrantes con fallos que se incluirán en el resultado de la búsqueda.";
    translation["inbound.datetohelp"] =
        "Seleccione una fecha de finalización para definir el período de creación de los documentos electrónicos entrantes con fallos que se incluirán en el resultado de la búsqueda.";
    translation["inbound.inboundedocfieldgroup"] =
        "Filtros de búsqueda de documentos electrónicos de entrada con fallos";
    translation["inbound.sublist.sublistname"] =
        "Resultados de búsqueda de documentos electrónicos de entrada con fallos";
    translation["inbound.sublist.internalid"] = "ID interno";
    translation["inbound.sublist.vendor"] = "Proveedor";
    translation["inbound.sublist.refnum"] = "Número de referencia";
    translation["inbound.sublist.ponum"] = "Número de OC";
    translation["inbound.sublist.datecreated"] = "Fecha de creación";
    translation["inbound.sublist.edoctemplate"] =
        "Plantilla de documentos electrónicos";
    translation["inbound.msg.conversionongoing"] =
        "Se está convirtiendo el documento electrónico. Recibirá un mensaje por correo electrónico cuando el proceso haya terminado.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "No puede realizar la búsqueda con los criterios seleccionados porque el proceso de conversión de documentos electrónicos entrantes ya está en curso para las transacciones comprendidas en el período ({DATECREATED_FROM}-{DATECREATED_TO}). Debe modificar los criterios de búsqueda o volver a intentarlo después de convertir este documento electrónico.";
    translation["inbound.invaliddates"] =
        "El campo Fecha de creación desde no debe ser posterior al campo Fecha de creación hasta. Modifique las fechas para que Fecha de creación desde sea anterior a Fecha de creación hasta.";
    translation["inbound.configurefreecountry"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing SuiteApp en múltiples países. Si desea convertir documentos electrónicos en forma masiva, comuníquese con el administrador de su cuenta para configurar el País de documento electrónico de uso libre en la página de información de la empresa.";
    translation["portlet.title"] = "Documentos electrónicos";
    translation["portlet.outboundforgeneration"] =
        "Documentos electrónicos de salida para generación";
    translation["portlet.outboundforsending"] =
        "Documentos electrónicos de salida para envío";
    translation["portlet.outboundwitherrors"] =
        "Documentos electrónicos de salida con errores";
    translation["portlet.outboundsendinglink"] =
        "Enviar documentos electrónicos de salida con fallos";
    translation["portlet.inboundforconversion"] =
        "Documentos electrónicos de entrada para conversión";
    translation["portlet.inboundconvertfailed"] =
        "Convertir documentos electrónicos de entrada con fallos";
    translation["portlet.inboundincomplete"] =
        "Documentos electrónicos de entrada incompletos";
    translation["portlet.inbounduploadlink"] =
        "Cargar documento electrónico de entrada";
    translation["portlet.outboundforcertification"] =
        "Documentos electrónicos de salida para certificación";
    translation["portlet.outboundcertifiedforsending"] =
        "Documentos electrónicos de salida para envío";
    translation["inbound.webservice.response.success"] =
        "El documento electrónico entrante con la ID: {ID} se creó correctamente.";
    translation["inbound.webservice.response.novendor"] =
        "No hay ningún proveedor asociado con el ID de servicio web: {IDENTIFIER}. Compruebe que el ID de servicio web sea el correcto.";
    translation["inbound.webservice.response.multiplevendor"] =
        "El documento electrónico de entrada con ID: {ID} se creó correctamente. Sin embargo, hay múltiples proveedores asociados con el ID de servicio web: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "El documento electrónico entrante está incompleto, ya que no se puede determinar la plantilla correcta. Seleccione una plantilla en el registro del documento electrónico entrante o configure el XSD en el registro de la plantilla del documento electrónico para habilitar la autoselección de plantillas.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "El documento electrónico de entrada está incompleto, ya que no se puede determinar el proveedor correcto. Seleccione un proveedor en el registro de documento electrónico de entrada o defina el ID de servicio web en el registro de proveedor asociado.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Faltan las siguientes claves: {KEYS}, que deben proporcionarse en la solicitud del servicio web.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "El cuerpo de la solicitud de servicio web debe ser un objeto o una matriz de objetos JSON con el siguiente tipo de contenido: 'aplication/json'.";
    translation["transaction.contactnoemail"] =
        "Los siguientes destinatarios de documentos electrónicos no tienen una dirección de correo electrónico en sus registros de contacto: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "No hay destinatarios de documentos electrónicos para esta transacción. Para enviar documentos electrónicos por correo electrónico, se debe agregar al menos un contacto a la lista de destinatarios del documento electrónico.";
    translation["transaction.maxrecipientexceeded"] =
        "La cantidad de destinatarios de correo electrónico que agregó excedió el límite. Puede agregar un máximo de 10 destinatarios de correo electrónico.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Solo se procesar los siguientes tipos de transacción:";
    translation["ei.prefs.formtitle"] =
        "Preferencias de documentos electrónicos";
    translation["ei.prefs.information.about.certify.skip"] =
        "El paso de certificación se omite si el método de envío de la certificación no está definido o no es aplicable a la transacción.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Facturación electrónica automática";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Tipo de automatización de documentos electrónicos";
    translation["ei.prefs.text.option.comb.disabled"] = "Deshabilitar";
    translation["ei.prefs.text.option.comb.gcs"] =
        "Generar, certificar, enviar";
    translation["ei.prefs.text.option.comb.gc"] = "Generar, certificar";
    translation["ei.prefs.text.option.comb.cs"] = "Certificar, enviar";
    translation["ei.prefs.btn.label.cancel"] = "Cancelar";
    translation["ei.prefs.btn.label.save"] = "Guardar";
    translation["ei.prefs.msg.confirm.save"] =
        "¿Desea guardar los cambios en las preferencias de los documentos electrónicos?";
    translation["ei.prefs.msg.success.save"] =
        "Las preferencias de los documentos electrónicos se guardaron correctamente.";
    translation["ei.prefs.msg.failed.save"] =
        "Las preferencias de los documentos electrónicos no se guardaron.";
    translation["ei.prefs.insufficient.permission.details"] =
        "El permiso para acceder a esta página está restringido. Para solicitar acceso, póngase en contacto con el administrador.";
    translation["ei.eip.msg.completed"] =
        "El procesamiento del documento electrónico finalizó.";
    translation["ei.eip.msg.failed"] =
        "El procesamiento del documento electrónico falló. Consulte el historial de auditoría de documentos electrónicos para obtener más detalles.";
    translation["ei.eip.msg.processing"] =
        "El documento electrónico se está procesando.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "El documento electrónico ya se está procesando.";
    translation["license.notinstalled"] =
        "NetSuite SuiteApps License Client no está disponible en su cuenta. Instale esta SuiteApp para acceder a todas las funciones de Electronic Invoicing.";
    translation["outbound.formtitle"] =
        "Enviar documentos electrónicos fallidos";
    translation["outbound.search"] = "Buscar";
    translation["outbound.send"] = "Enviar";
    translation["outbound.return"] = "Volver a Criterios";
    translation["outbound.customer"] = "Cliente";
    translation["outbound.vendor"] = "Proveedor";
    translation["outbound.subsidiary"] = "Subsidiaria";
    translation["outbound.type"] = "Tipo de transacción";
    translation["outbound.datefrom"] = "Fecha de transacción desde";
    translation["outbound.dateto"] = "Fecha de transacción hasta";
    translation["outbound.subshelp"] =
        "Seleccione una subsidiaria para mostrar solo las transacciones que pertenecen a esa subsidiaria.";
    translation["outbound.custhelp"] =
        "Seleccione un cliente para mostrar solo las transacciones que pertenecen a ese cliente. Si no se selecciona un cliente, los resultados de la búsqueda mostrarán todas las transacciones que pertenecen a la subsidiaria, sin tener en cuenta el cliente.";
    translation["outbound.vendorhelp"] =
        "Seleccione un proveedor para mostrar solo las transacciones que pertenecen a ese proveedor. Si no se selecciona un proveedor, los resultados de la búsqueda mostrarán todas las transacciones que pertenecen a la subsidiaria, sin tener en cuenta el proveedor.";
    translation["outbound.entitytypehelp"] =
        "Elija el tipo de entidad Cliente o Proveedor. Esto habilitará la lista que corresponda en el menú desplegable que aparece abajo.";
    translation["outbound.typehelp"] =
        "Seleccione uno o varios tipos de transacciones para cada documento electrónico que desea enviar. Para seleccionar múltiples tipos de transacciones, mantenga presionada la tecla Ctrl mientras los selecciona.<br /><br />Si no se selecciona ningún tipo de transacción, los resultados de búsqueda mostrarán todos los documentos electrónicos que estén listos para enviarse, independientemente del tipo de transacción.";
    translation["outbound.datefromhelp"] =
        "Para ver una lista de transacciones creadas en un período específico, seleccione una fecha para definir el inicio del período.";
    translation["outbound.datetohelp"] =
        "Para ver una lista de transacciones creadas en un período específico, seleccione una fecha para definir la finalización del período.";
    translation["outbound.entityfieldgroup"] = "Filtros de Búsqueda de entidad";
    translation["outbound.filtersfieldgroup"] =
        "Filtros de Búsqueda de transacción";
    translation["outbound.entitytypeinlinehelp"] =
        "Seleccionar tipo de entidad:";
    translation["outbound.invalidtypetitle"] =
        "Tipos de transacción no válidos";
    translation["outbound.invalidtype"] =
        "Los siguientes tipos de transacciones no se admiten en este momento: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Los siguientes tipos de transacciones no son válidos para la entidad elegida: {TRANSACTIONTYPES}. Seleccione los tipos de transacciones que correspondan para la entidad que ha elegido.";
    translation["outbound.invaliddates"] =
        "El campo Fecha de transacción desde no debe ser posterior al de Fecha de transacción hasta. Modifique las fechas para que Fecha de Transacción desde sea anterior a Fecha de Transacción hasta.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "No puede realizar la búsqueda con los criterios seleccionados porque hay un proceso de envío de documentos electrónicos que ya está en curso para las transacciones comprendidas en el período ({TRANDATE_FROM}-{TRANDATE_TO}) para la subsidiaria ({SUBSIDIARY}). Debe modificar los criterios de búsqueda o volver a intentarlo después de enviar este documento electrónico.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "No puede realizar la búsqueda con los criterios seleccionados porque hay un proceso de envío de documentos electrónicos que ya está en curso para las transacciones comprendidas en el período ({TRANDATE_FROM}-{TRANDATE_TO}). Debe modificar los criterios de búsqueda o volver a intentarlo después de enviar este documento electrónico.";
    translation["outbound.sublist.trannum"] = "Número de transacción";
    translation["outbound.sublist.trantype"] = "Tipo de transacción";
    translation["outbound.sublist.customer"] = "Cliente";
    translation["outbound.sublist.vendor"] = "Proveedor";
    translation["outbound.sublist.subsidiary"] = "Subsidiaria";
    translation["outbound.sublist.trandate"] = "Fecha de transacción";
    translation["outbound.sublist.memo"] = "Nota";
    translation["outbound.sublist.template"] = "Plantilla";
    translation["outbound.sublist.sendingmethod"] = "Método de envío";
    translation["outbound.sublist.sublistname"] =
        "Resultados de documentos electrónicos de salida fallidos a enviar";
    translation["outbound.msg.sendingongoing"] =
        "Se está enviando el documento electrónico. Recibirá un mensaje por correo electrónico cuando el proceso haya terminado.";
    translation["outbound.configurefreecountry"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing en varios países. Si desea enviar documentos electrónicos de forma masiva, comuníquese con el administrador de su cuenta para configurar el País de documento electrónico de uso libre en la página de información de la empresa.";
    translation["outbound.entitysend"] = "Enviar a entidad";
    translation["outbound.certifysend"] = "Enviar para certificación";
    translation["outbound.sendingtypehelp"] =
        "Elija Enviar a entidad o Enviar para certificación. Se enumerarán las transacciones correspondientes para envío.";
    translation["customer.noemail"] =
        "No hay ninguna dirección de correo electrónico para este cliente. Introduzca una dirección válida en el registro del cliente para permitir el envío de documentos electrónicos por correo electrónico.";
    translation["customer.contactnoemail"] =
        "Los siguientes destinatarios de documentos electrónicos no tienen una dirección de correo electrónico en sus registros de contacto: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "No hay destinatarios de documentos electrónicos para este cliente. Para enviar documentos electrónicos por correo electrónico a este cliente, se debe agregar al menos un contacto a la lista de destinatarios del documento electrónico.";
    translation["customer.arrayrequired"] =
        "La matriz de contactos es necesaria para la validación.";
    translation["customer.parameternotarray"] =
        "El parámetro de contactos no es una matriz.";
    translation["customer.maxrecipientexceeded"] =
        "Usted ha excedido la cantidad máxima de destinatarios de correo electrónico. Solo puede seleccionar un máximo de 10 destinatarios de correo electrónico.";
    translation["vendor.noemail"] =
        "No hay ninguna dirección de correo electrónico para este proveedor. Introduzca una dirección de correo electrónico válida en el registro del proveedor para permitir el envío de documentos electrónicos por correo electrónico.";
    translation["vendor.contactnoemail"] =
        "Los siguientes destinatarios de documentos electrónicos no tienen una dirección de correo electrónico en sus registros de contacto: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "No hay destinatarios de documentos electrónicos para este proveedor. Para enviar documentos electrónicos por correo electrónico a este proveedor, se debe agregar al menos un contacto a la lista de destinatarios de documentos electrónicos.";
    translation["vendor.maxrecipientexceeded"] =
        "Usted ha excedido la cantidad máxima de destinatarios de correo electrónico. Solo puede seleccionar un máximo de 10 destinatarios de correo electrónico.";
    translation["vendor.nosenders"] =
        "No hay remitentes de correo electrónico de documentos electrónicos para este proveedor. Para recibir documentos electrónicos de este proveedor por correo-E, debe introducir al menos una dirección de correo-E en la Lista de remitentes de correos electrónicos de documentos electrónicos de proveedor.";
    translation["vendor.existingsender"] =
        "La dirección de correo electrónico del remitente ya existe.";
    translation["vendor.existingdomain"] =
        "Otro proveedor ya utiliza el dominio de correo electrónico del remitente.";
    translation["vendor.existingidentifier"] =
        "Otro proveedor utiliza ya la ID del servicio web. Introduzca una ID de servicio web diferente.";
    translation["customeremailrecipient.contextunsupported"] =
        "El campo Destinatario de correo electrónico de documentos electrónicos de cliente solo admite los siguientes contextos: IU, CSV, SuiteScript y servicios web.";
    translation["vendoremailrecipient.contextunsupported"] =
        "El campo Destinatario de correo electrónico de documentos electrónicos de proveedor solo admite los siguientes contextos: IU, CSV, SuiteScript y servicios web.";
    translation["vendoremailsender.contextunsupported"] =
        "El campo Remitente de correo electrónico de documentos electrónicos de proveedor solo admite los siguientes contextos: IU, CSV, SuiteScript y servicios web.";
    translation["template.incorrectregex"] =
        "El campo REGEX contiene una expresión regular incorrecta. Se debe usar la sintaxis correcta.";
    translation["template.invalidjson"] =
        "No proporcionó contenido JSON con formato correcto en el campo Plantilla para documentos electrónicos de salida. Haga clic en Aceptar para continuar o en Cancelar para seguir en la página actual.";
    translation["template.invalidxml"] =
        "La plantilla XML contiene errores. El formato XML debe ser el correcto.";
    translation["template.templaterequired"] =
        "Falta el contenido de la plantilla para el tipo de transacción de salida seleccionado. Proporcione contenido de plantilla XML o JSON válido en el campo Documentos electrónicos de salida e inténtelo de nuevo.";
    translation["template.mappingrequired"] =
        "Seleccionó un tipo de transacción de entrada, pero falta el contenido JSON de la asignación de campo. Introduzca el contenido JSON en el campo Asignación de campo para documentos electrónicos de entrada.";
    translation["template.templateorjsonrequired"] =
        "Faltan valores de campo. Si es una transacción de salida, especifique contenido XML o JSON válido en el campo Plantilla para documentos electrónicos de salida. Si es una transacción de entrada, especifique contenido JSON en el campo Asignación de campo para documentos electrónicos de entrada.";
    translation["template.invalidxsdfile"] =
        "El archivo XSD seleccionado no es un archivo XSD válido. Asegúrese de que el archivo seleccionado tenga la extensión .xsd.";
    translation["template.contextunsupported"] =
        "La Plantilla de documentos electrónicos solo admite contextos IU y SuiteScript.";
    translation["template.supportedtranstypefldhelp"] =
        "Seleccione uno o más tipos de transacciones admitidas por esta plantilla. Para seleccionar múltiples tipos de transacciones, mantenga presionada la tecla Ctrl mientras los selecciona.<br /><br />Si no es posible seleccionar tipos de transacciones, significa que la plantilla ya está asignada a uno o más registros de transacciones del mismo tipo de transacción. Para habilitar la selección del tipo de transacción, elimine la plantilla del registro de transacción.<br /><br />También puede asignar esta plantilla a documentos electrónicos de entrada, lo que deshabilitará el campo Tipo de Transacción.";
    translation["template.eistatus"] =
        "Restringir edición de transacciones con estado de documento electrónico";
    translation["template.supportedeistatusfieldhelp"] =
        "Las transacciones con estado de documento electrónico que seleccionó no podrán editarse cuando esta plantilla esté asociada con ellas. Puede seleccionar múltiples estados para documentos electrónicos.";
    translation["template.invalidschemaordependency"] =
        "El esquema es un archivo XSD con la estructura incorrecta o el esquema dependiente no se pudo encontrar.";
    translation["template.xmldoesnotconformtoschema"] =
        "El archivo XML de la plantilla no cumple con el archivo XSD o el esquema proporcionado.";
    translation["template.xmldomexception"] =
        "La cadena XML de entrada tiene un formato incorrecto.";
    translation["template.missingreqdargument"] =
        "Falta el archivo XSD para la validación saliente.";
    translation["template.xsdvalidationexception"] =
        "Se produjo una excepción desconocida durante la validación de XSD.";
    translation["template.xsdmissingdependencyfolder"] =
        "Falta la carpeta de esquemas XSD o no es válida.";
    translation["invoice.generatebtn"] = "Generar documento electrónico";
    translation["invoice.sendbtn"] = "Enviar documento electrónico";
    translation["invoice.sendcertifybtn"] = "Certificar documento electrónico";
    translation["invoice.eipbtn"] = "Procesar documento electrónico";
    translation["invoice.loguntagged"] =
        "Se eliminó la plantilla de documento electrónico. La transacción no está etiquetada para la generación de documentos electrónicos.";
    translation["invoice.logforgenerate"] =
        "La transacción está lista para la generación de un documento electrónico.";
    translation["invoice.invalidtemplatesub"] =
        "La subsidiaria de la transacción no es válida para la plantilla de documento electrónico que se ha seleccionado. Seleccione otra plantilla de documento electrónico.";
    translation["invoice.templateremovalerror"] =
        "No está permitido eliminar la plantilla de documento electrónico enviada.";
    translation["ei.sending.currentlysending"] =
        "Se está enviando el documento electrónico. Esto puede demorar algunos minutos. No debe interrumpir el proceso al hacer clic en el botón Enviar documento electrónico nuevamente. Una vez enviado el documento electrónico, se volverá a cargar la página.";
    translation["ei.sending.notready"] =
        "Este documento electrónico no está listo para enviar. Primero debe hacer clic en Generar documento electrónico para generarlo.";
    translation["ei.sending.alreadysent"] = "Esta transacción ya se envió.";
    translation["ei.sending.norecipients"] =
        "No se puede enviar el documento electrónico porque el cliente no tiene destinatarios para documentos electrónicos. Para que se pueda enviar este documento electrónico por correo, primero es necesario seleccionar los destinatarios del documento electrónico en el registro del cliente.";
    translation["ei.sending.indivcustnoemail"] =
        "No se puede enviar el documento electrónico porque el cliente no tiene una dirección de correo electrónico. Para que se pueda enviar este documento electrónico por correo, se debe proporcionar una dirección de correo electrónico en el registro del cliente.";
    translation["ei.sending.norecipients.vendor"] =
        "No se puede enviar el documento electrónico porque el proveedor no tiene destinatarios para documentos electrónicos. Para que se pueda enviar este documento electrónico por correo, primero es necesario seleccionar los destinatarios del documento electrónico en el registro del proveedor.";
    translation["ei.sending.indivvendnoemail"] =
        "No se puede enviar el documento electrónico porque el proveedor no tiene una dirección de correo electrónico. Para que se pueda enviar este documento electrónico por correo, se debe proporcionar una dirección de correo electrónico en el registro del proveedor.";
    translation["ei.sending.invalidmethod"] =
        "Seleccione un método de envío válido para {TYPE} n° {INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Emisor: {SENDER}\nDestinatarios: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "El remitente del documento electrónico ({EMPLOYEENAME}) no tiene ninguna dirección de correo electrónico. Introduzca una dirección de correo electrónico válida en el registro del empleado.";
    translation["ei.sending.recipientnoemail"] =
        "Uno o varios destinatarios del documento electrónico asociado con esta transacción no tienen una dirección de correo electrónico. Verifique que los destinatarios de este cliente tengan direcciones de correo electrónico válidas.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Uno o varios destinatarios del documento electrónico asociado con esta transacción no tienen una dirección de correo electrónico. Verifique que los destinatarios de este proveedor tengan direcciones de correo electrónico válidas.";
    translation["ei.sending.defaulterror"] =
        "Se produjo un error durante el envío del documento electrónico. Compruebe el Historial de auditoría de documento electrónico en la subficha Documento electrónico para obtener más detalles.";
    translation["ei.sending.inactivecustomer"] =
        "No se pudo enviar el documento electrónico para esta transacción porque el cliente seleccionado está inactivo. El campo Estado de documento electrónico no se ha actualizado y no se ha creado un historial de auditoría. Desmarque la casilla Inactivo en el registro del cliente y después intente enviar el documento electrónico nuevamente.";
    translation["ei.sending.inactivevendor"] =
        "No se pudo enviar el documento electrónico para esta transacción porque el proveedor seleccionado está inactivo. El campo Estado de documento electrónico no se ha actualizado y no se ha creado un historial de auditoría. Desmarque la casilla Inactivo en el registro del proveedor y después intente enviar el documento electrónico nuevamente.";
    translation["ei.sending.msg.processcomplete"] =
        "Se ha enviado el documento electrónico.";
    translation["ei.sending.configurefreecountry"] =
        "Su cuenta debe tener una licencia activa para usar Electronic Invoicing para múltiples países. Para enviar documentos electrónicos de forma masiva a un solo país, debe seleccionar el país en el campo País de documento electrónico de uso libre en la página Información de la empresa.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Los documentos electrónicos no admiten transacciones con clientes inactivos.";
    translation["ei.sending.inactivevendor.manager"] =
        "Los documentos electrónicos no admiten transacciones con proveedores inactivos.";
    translation["ei.sending.certification.defaulterror"] =
        "Se produjo un error durante la certificación de este documento electrónico. Compruebe el Historial de auditoría de documentos electrónicos en la subficha Documentos electrónicos para obtener detalles.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "Se ha enviado el documento electrónico para su certificación.";
    translation["ei.generation.generationlogbulk"] =
        "El documento electrónico se generó en forma masiva con la plantilla de documento electrónico '{TEMPLATENAME}'.";
    translation["ei.generation.generationlog"] =
        "El documento electrónico se generó con la plantilla de documento electrónico '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "El documento electrónico y el archivo PDF se generaron en forma masiva con la plantilla de documento electrónico '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflog"] =
        "El documento electrónico y el archivo PDF se generaron con la plantilla de documento electrónico '{TEMPLATENAME}'.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "El documento electrónico se generó en forma masiva con la plantilla de documento electrónico '{TEMPLATENAME}'. Se eliminó el archivo PDF que se había generado previamente a partir de esta transacción.";
    translation["ei.generation.generationremovedpdflog"] =
        "El documento electrónico se generó con la plantilla de documento electrónico '{TEMPLATENAME}'. Se eliminó el archivo PDF que se había generado previamente a partir de esta transacción.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Proceso de generación en forma masiva\nPlantilla de documento electrónico utilizada: {TEMPLATENAME}\nDetalles del error: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Plantilla de documento electrónico utilizada: {TEMPLATENAME}\nDetalles del error: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Se produjo un error durante la generación. Compruebe el Historial de auditoría de documentos electrónicos en la subficha Documentos electrónicos para obtener detalles.";
    translation["ei.generation.inactivecustomer"] =
        "No se pudo generar un documento electrónico para esta transacción porque el cliente seleccionado está inactivo. El campo Estado de documento electrónico no se ha actualizado y no se ha creado un historial de auditoría. Desmarque la casilla Inactivo en el registro del cliente y después intente generar el documento electrónico nuevamente.";
    translation["ei.generation.inactivevendor"] =
        "No se pudo generar un documento electrónico para esta transacción porque el proveedor seleccionado está inactivo. El campo Estado de documento electrónico no se ha actualizado y no se ha creado un historial de auditoría. Desmarque la casilla Inactivo en el registro del proveedor y después intente generar el documento electrónico nuevamente.";
    translation["ei.generation.msg.processcomplete"] =
        "Se ha generado el documento electrónico.";
    translation["ei.generation.configurefreecountry"] =
        "Su cuenta debe tener una licencia activa para usar Electronic Invoicing para múltiples países. Para generar documentos electrónicos de forma masiva a un solo país, debe seleccionar el país en el campo País de documento electrónico de uso libre en la página Información de la empresa.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Los documentos electrónicos no admiten transacciones con clientes inactivos.";
    translation["ei.generation.inactivevendor.generator"] =
        "Los documentos electrónicos no admiten transacciones con proveedores inactivos.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "El documento electrónico se genera y firma digitalmente de forma correcta.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "La generación falló porque el documento electrónico resultante no es un archivo XML o JSON con formato correcto.";
    translation["notify.batchownersubject"] =
        "Envío de documentos electrónicos finalizado";
    translation["notify.batchownerbody"] =
        "Hola: <br/><br/>Terminamos de procesar su solicitud para enviar documentos electrónicos.<br/>Se enviaron {SENT} de {TOTAL}. Consulte el archivo adjunto para obtener detalles. <br/><br/>Gracias,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "Documento electrónico generado para la OC n° {PONUM}";
    translation["notify.recipientcompsubj"] =
        "Documento electrónico generado de {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "¡Saludos! <br /><br />{MESSAGE}<br />Consulte el adjunto para el documento electrónico.<br /><br />Gracias,<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Error detectado durante la generación del documento electrónico";
    translation["notify.generationerrorbody"] =
        "Se detectaron errores durante la generación del documento electrónico.<br/>Consulte el archivo adjunto para ver la lista de transacciones y los detalles de error.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Ya se ha enviado un documento electrónico para esta transacción. Si se genera un nuevo documento electrónico, se sobrescribirá el anterior. ¿Está seguro de que desea generar un nuevo documento electrónico?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "No está permitido eliminar la plantilla de documento electrónico enviada.";
    translation["transaction.msg.generate.information"] =
        "El proceso de generación de este documento electrónico está en curso.";
    translation["transaction.msg.send.information"] =
        "El proceso de envío de este documento electrónico está en curso.";
    translation["transaction.msg.send.certify.information"] =
        "El proceso de certificación de este documento electrónico está en curso.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "El proceso de generación de este documento electrónico ya está en curso.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "El proceso de envío de este documento electrónico ya está en curso.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "El proceso de certificación de este documento electrónico ya está en curso.";
    translation["transaction.msg.uncheckpdf"] =
        "Se creó un archivo PDF a partir de esta transacción durante la última generación de documentos electrónicos. Si desmarca esta casilla, se eliminará ese archivo PDF en la próxima generación de documentos electrónicos.";
    translation["transaction.msg.nofreecountry"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing en múltiples países. Si desea generar un documento electrónico para esta transacción, comuníquese con el administrador de su cuenta para especificar un país en el campo País de documento electrónico de uso libre en la página de información de la empresa.";
    translation["transaction.msg.otherbillingcountry"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing en varios países. Si desea generar un documento electrónico para esta transacción, comuníquese con el administrador de su cuenta de NetSuite para comprar una licencia.";
    translation["transaction.msg.nobillingcountry"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing en varios países. Si desea generar un documento electrónico para esta transacción, indique la dirección de facturación de la transacción.";
    translation["transaction.msg.noshippingcountry"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing en varios países. Si desea generar un documento electrónico para esta transacción, indique la dirección de envío de la transacción.";
    translation["transaction.msg.nocustomercountry"] =
        "Esta cuenta no tiene una licencia activa para usar Electronic Invoicing en varios países. Si desea generar un documento electrónico para esta transacción, indique una dirección de facturación predeterminada para el cliente de la transacción.";
    translation["transaction.msg.blockededittransaction"] =
        "La edición de la transacción está bloqueada para el estado del documento electrónico actual. Consulte la plantilla de EI adjunta.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Si se modifica el valor del campo Tipo de contenido de XML a otro diferente, se eliminarán todos los validadores de XML. ¿Está seguro de que desea cambiar el tipo de contenido?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Solo se pueden agregar validadores para el tipo de contenido XML.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Este validador ya está en la lista.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Los Validadores de plantillas de documentos electrónicos solo admiten los contextos IU y SuiteScript.";
    translation["standarddocument.default.alreadyexist"] =
        "El registro {DEFAULT_DOCUMENT_STANDARD} ya existe. No se puede crear un registro de paquete de documentos con el mismo nombre. Cambie el nombre del registro del paquete de documentos e inténtelo nuevamente.";
    translation["standarddocument.default.editnotallowed"] =
        "No está permitido editar el Nombre o la Descripción del registro {DEFAULT_DOCUMENT_STANDARD}.";
    translation["standarddocument.default.deletenotallowed"] =
        "No está permitido eliminar el registro {DEFAULT_DOCUMENT_STANDARD}.";
    translation["standarddocument.contextunsupported"] =
        "El Paquete de documentos electrónicos solo admite los contextos IU, importación CSV y SuiteScript.";
    translation["sendingmethod.default.alreadyexist"] =
        "El registro del método de envío {DEFAULT_SENDING_METHOD_NAME} ya existe. No se puede crear un registro de método de envío con el mismo nombre. Cambie el nombre del registro del método de envío e inténtelo nuevamente.";
    translation["sendingmethod.default.editnotallowed"] =
        "No está permitido editar el registro del método de envío {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.default.deletenotallowed"] =
        "No está permitido eliminar el registro del método de envío {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Se ha deshabilitado el campo Tipo de transacción porque el método de envío está asignado a uno o más registros de transacciones. Si desea editar este método de envío, elimine el método de envío del registro de transacción para que se active el campo Tipo de transacción, e inténtelo nuevamente.";
    translation["sendingmethod.contextunsupported"] =
        "El Método de envío de documentos electrónicos solo admite los contextos IU y SuiteScript.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Seleccione uno o más tipos de transacciones que admitirá este método de envío. Para seleccionar múltiples tipos de transacciones, mantenga presionada la tecla Ctrl mientras los selecciona.<br /><br />Si no es posible seleccionar uno o más tipos de transacciones, significa que el método de envío se ha asignado a uno o más registros de transacciones de ese tipo de transacción. Para habilitar la selección del tipo de transacción, primero debe eliminar el método de envío del registro de transacciones.";
    translation["sendingmethod.pluginimplementation"] =
        "Implementación del plugin de método de envío de documentos electrónicos";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Seleccione la implementación de un plugin de método de envío";
    translation["sendingmethod.scriptbannermessage"] =
        "Los métodos de envío deben ser implementaciones de plugins personalizados. Recree los scripts del método de envío existente como nuevas implementaciones de plugins personalizados del tipo &quot;Plugin de envío&quot;.";
    translation["customdatasource.pluginimplementation"] =
        "Implementación del plugin personalizado de origen de datos";
    translation["customdatasource.pluginimplementationhelp"] =
        "Seleccione la implementación del plugin personalizado de origen de datos";
    translation["digitalsignature.pluginimplementation"] =
        "Implementación del plugin de firma digital";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Seleccione una implementación de plugin. Este campo es obligatorio si desea firmar digitalmente documentos electrónicos.";
    translation["digitalsignature.identifierlabel"] =
        "Este documento electrónico está firmado digitalmente.";
    translation["digitalsignature.successlog"] =
        "El documento electrónico generado está firmado digitalmente.";
    translation["digitalsignature.failurelog"] =
        "El documento electrónico generado no está firmado digitalmente.";
    translation["digitalsignature.pluginfailedmessage"] =
        "La implementación de plugin de firma digital produjo un estado de fallo.";
    translation["digitalsignature.plugininvalidresult"] =
        "El resultado obtenido de la implementación de plugin de firma digital no es válido.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Implementación del plugin personalizado de origen de datos de entrada";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Seleccione la implementación de un plugin personalizado de origen de datos de entrada.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "El resultado de la implementación del plugin Origen de datos de entrada personalizado no es válido.";
    translation["outboundvalidation.pluginimplementation"] =
        "Implementación del plugin de validación de salida";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Seleccione la implementación del plugin de validación de documentos electrónicos de salida. Esto valida los documentos electrónicos de salida.";
    translation["outboundvalidation.successlog"] =
        "Validación de salida correcta.";
    translation["outboundvalidation.failurelog"] =
        "La validación de salida falló.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "La implementación del plugin de validación de salida devolvió un estado de fallo.";
    translation["outboundvalidation.plugininvalidresult"] =
        "El resultado de la implementación del plugin de validación de salida no es válido.";
    translation["template.msg.cannotedittransactiontype"] =
        "Se desactivó el campo Tipo de transacción porque esta plantilla ya está asignada a uno o más registros de transacciones. Si desea editar esta plantilla, elimine la plantilla del registro de transacción para que se active el campo Tipo de transacción, e inténtelo nuevamente. También puede asignar esta plantilla a documentos electrónicos de entrada, lo que deshabilitará el campo Tipo de transacción.";
    translation["template.msg.forcetocopymessage"] =
        "No puede editar la plantilla predeterminada de documento electrónico. Puede copiarla con la opción Realizar copia en Acciones, o bien, crear una nueva.";
    translation["template.msg.warningoneditmessage"] =
        "Esta es una plantilla de documento electrónico predeterminada. Los cambios realizados en ella se perderán o sobrescribirán cuando se actualice la SuiteApp.";
    translation["email.batchownernotification.subject"] =
        "Envío de documentos electrónicos finalizado";
    translation["email.batchownernotification.body"] =
        "Hola: <br/><br/>Se enviaron sus documentos electrónicos.<br/>Se enviaron {SENT} de {TOTAL}. Consulte el archivo adjunto para obtener detalles. <br/><br/>Gracias,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Conversión de documentos electrónicos finalizada";
    translation["email.batchownerconvertnotification.body"] =
        "Hola: <br/><br/>Se convirtieron sus documentos electrónicos.<br/>Se convirtieron {CONVERTED} de {TOTAL}. Consulte el archivo adjunto para obtener detalles. <br/><br/>Gracias,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "Documento electrónico generado para la OC n° {PONUM}";
    translation["email.recipientnotification.subject"] =
        "Documento electrónico de {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "Se generó el documento electrónico para {TRANTYPE} nº {TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "¡Saludos! <br /><br />Se generó el documento electrónico correspondiente a la OC nº {PONUM}.<br />Consulte el documento electrónico adjunto para obtener detalles.<br /><br />Gracias,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "¡Saludos! <br /><br />Se generó el documento electrónico para {TYPE} nº {TRANID}.<br />Consulte el documento electrónico adjunto para obtener detalles.<br /><br />Gracias,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Error detectado durante la generación del documento electrónico";
    translation["email.generationerrornotification.body"] =
        "Se detectaron errores durante la generación del documento electrónico.<br/>Consulte el archivo adjunto para ver la lista de transacciones y los detalles de error.";
    translation["email.sendingerrornotification.subject"] =
        "Error detectado durante el envío del documento electrónico";
    translation["email.sendingerrornotification.body"] =
        "Se detectaron errores durante el envío del documento electrónico.<br/>Consulte el archivo adjunto para ver la lista de transacciones y los detalles de error.";
    translation["email.webserviceerror.subject"] =
        "Notificación de servicio web de documentos electrónicos de entrada";
    translation["email.webserviceerror.body"] =
        "<p>Hola:</p><p>Se detectaron errores al procesar el documento electrónico de entrada mediante el servicio web.<br/>Consulte los siguientes detalles. </p>{DETAIL_TABLE}<p>Gracias,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Número de transacción";

    return translation;
});
