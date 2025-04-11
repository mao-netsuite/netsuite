define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Dettagli";
    translation["email.attachment.collabel.transactiontype"] =
        "Tipo di transazione";
    translation["email.attachment.collabel.internalid"] = "ID interno";
    translation["email.attachment.collabel.vendor"] = "Fornitore";
    translation["email.conversionerrornotification.subject"] =
        "Errore durante la conversione del documento elettronico in entrata";
    translation["email.conversionerrornotification.body"] =
        "Si sono verificati errori durante la conversione del documento elettronico in entrata.<br/>L'elenco dei record con errori e i relativi dettagli sono disponibili nel file allegato.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Nota: se si desidera che le notifiche vengano inviate a un utente diverso dagli amministratori dell'account, inserire l'indirizzo e-mail dell'utente nel campo Destinatario notifiche e-mail all'interno del record società controllata padre.";
    translation["email.table.collabel.inboundedocumentid"] =
        "ID documento elettronico in entrata";
    translation["email.table.collabel.details"] = "Dettagli";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Rilevato errore durante il controllo della licenza dell'account";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo di Electronic Invoicing in più paesi.</br>Per elaborare documenti elettronici in massa, configurare il campo Paese documenti elettronici a uso gratuito nella pagina delle informazioni sulla società.";
    translation["inboundedocument.logforconversion"] =
        "Il documento elettronico in entrata è pronto per la conversione.";
    translation["inboundedocument.logincomplete"] =
        "Il documento elettronico in entrata è incompleto. Nessun {FIELD} selezionato.";
    translation["inboundedocument.deletenotallowed"] =
        "Non è consentito eliminare un documento elettronico in entrata.";
    translation["inboundedocument.copynotallowed"] =
        "Non è consentito copiare un documento elettronico in entrata.";
    translation["inboundedocument.contextunsupported"] =
        "Il documento elettronico in entrata supporta solo i contesti di interfaccia utente e SuiteScript.";
    translation["inboundedocument.invalidxmlfile"] =
        "Il file XML di riferimento selezionato non è un file XML valido. Verificare che il file selezionato abbia l'estensione .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "Il file PDF di riferimento selezionato non è un file PDF valido. Verificare che il file selezionato abbia l'estensione .pdf.";
    translation["inboundedocument.invalidxml"] =
        "Il file XML di riferimento selezionato non è un documento XML ben formato.";
    translation["inboundedocument.convert.button"] = "Converti";
    translation["inboundedocument.convert.information"] =
        "La conversione di questo documento elettronico in entrata è in corso.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "La conversione di questo documento elettronico in entrata è già in corso.";
    translation["inboundedocument.cancel.button"] =
        "Annulla documento elettronico";
    translation["inboundedocument.cancel.confirmation"] =
        "Annullare questo documento elettronico in entrata?";
    translation["inboundedocument.cancel.failed"] =
        "Annullamento non riuscito perché lo stato del record documento elettronico in entrata è '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "Si è verificato un errore durante l'annullamento. Per i dettagli controllare l'audit trail dei documenti elettronici nella scheda secondaria Documento elettronico.";
    translation["inboundedocument.cancel.complete"] =
        "Il documento elettronico è stato annullato.";
    translation["inboundedocument.preview.button"] = "Visualizza XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo della SuiteApp Electronic Invoicing in più paesi. Per convertire questo documento elettronico in una transazione, contattare l'amministratore dell'account affinché specifichi un paese nel campo Paese documenti elettronici a uso gratuito nella pagina delle informazioni sulla società.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo della SuiteApp di fatturazione elettronica in più paesi. Per convertire questo documento elettronico in una transazione, contattare il responsabile dell'account NetSuite per l'acquisto di una licenza.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo della SuiteApp di fatturazione elettronica in più paesi. Per convertire questo documento elettronico in una transazione, impostare l'indirizzo di fatturazione predefinito del fornitore selezionato.";
    translation["validationplugin.contextunsupported"] =
        "Il plugin convalida documenti elettronici in entrata supporta solo i contesti di interfaccia utente e SuiteScript.";
    translation["validationplugin.pluginimplementation"] =
        "Implementazione plugin di convalida dei documenti elettronici in entrata";
    translation["validationplugin.pluginimplementationhelp"] =
        "Selezionare un'implementazione del plugin di convalida dei documenti elettronici in entrata.";
    translation["validationplugin.scriptbannermessage"] =
        "La convalida dei documenti elettronici in entrata deve avvenire tramite implementazioni di plugin personalizzate. Ricreare gli script di convalida esistenti sotto forma di nuove implementazioni di plugin personalizzate del tipo &quot;plugin di convalida in entrata&quot;";
    translation["ei.conversion.defaulterror"] =
        "Si è verificato un errore durante la conversione. Per i dettagli controllare l'audit trail dei documenti elettronici nella scheda secondaria Documento elettronico.";
    translation["ei.conversion.inactivevendor"] =
        "Impossibile convertire questo documento elettronico in entrata perché il fornitore selezionato è inattivo. Il campo Stato del documento elettronico non è stato aggiornato e non è stato creato un audit trail. Deselezionare la casella Inattivo nel record fornitore, quindi provare a convertire di nuovo il documento elettronico.";
    translation["ei.conversion.inactivecustomer"] =
        "Impossibile convertire questo documento elettronico in entrata perché il cliente selezionato è inattivo. Il campo Stato del documento elettronico non è stato aggiornato e non è stato creato un audit trail. Deselezionare la casella Inattivo nel record cliente, quindi provare a convertire di nuovo il documento elettronico.";
    translation["ei.conversion.conversioncomplete"] =
        "Il documento elettronico è stato convertito.";
    translation["ei.conversion.conversionlogbulk"] =
        "Il documento elettronico in entrata è stato incluso nella conversione di massa ed è stato convertito nella transazione con ID interno {INTERNALID} di tipo '{TYPE}'.";
    translation["ei.conversion.conversionlog"] =
        "Il documento elettronico in entrata è stato convertito nella transazione con ID interno {INTERNALID} di tipo '{TYPE}'";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Processo di conversione di massa\nModello di documento elettronico utilizzato: {TEMPLATENAME}\nAmbito errore: {ERRORSCOPE}\nDettagli errore: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Modello di documento elettronico utilizzato: {TEMPLATENAME}\nAmbito errore: {ERRORSCOPE}\nDettagli errore: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Errore di analisi. Controllare il mapping di campo per i documenti elettronici in entrata.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Errore di conversione.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Errore di convalida.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Conversione non riuscita perché lo stato del record documento elettronico in entrata è '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "I documenti elettronici in entrata con clienti inattivi non sono supportati per la conversione.";
    translation["ei.conversion.inactivevendor.converter"] =
        "I documenti elettronici in entrata con fornitori inattivi non sono supportati per la conversione.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "I seguenti codici fornitore: {ITEMLIST} non sono associati ad alcun record articolo.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "I seguenti nomi/codici fornitore: {ITEMLIST} non sono associati ad alcun record articolo.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "I seguenti codici fornitore: {ITEMLIST} sono associati a più record articolo. Modificare i record articolo e verificare che i codici fornitore siano univoci per ogni articolo di ciascun fornitore.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "I seguenti nomi/codici fornitore: {ITEMLIST} sono associati a più record articolo. Modificare i record articolo e verificare che i nomi/codici fornitore siano univoci per ogni articolo di ciascun fornitore.";
    translation["ei.conversion.refnumnotfound"] =
        "Nel documento elettronico in entrata manca il numero di riferimento richiesto. Annullare questo documento elettronico e sottometterne un altro che includa un elemento XML per il numero di riferimento, mappato al campo tranid.";
    translation["ei.conversion.refnumexists"] =
        "Esiste già una fattura fornitore con lo stesso numero di riferimento. Annullare questo documento elettronico e sottometterne un altro con il numero di riferimento corretto per l'elemento XML mappato al campo tranid.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Nel modello del documento elettronico manca il campo vendorcode. Modificare il modello di documento elettronico o selezionarne un altro che includa il mapping al campo vendorcode.";
    translation["ei.conversion.novendorcodevalue"] =
        "Almeno uno degli articoli non dispone di un codice fornitore. Annullare questo documento elettronico e sottometterne un altro con il valore corretto per l'elemento XML mappato al campo del codice fornitore.";
    translation["ei.conversion.vendornamenotfound"] =
        "Nel modello di documento elettronico manca il campo vendorname. Modificare il modello di documento elettronico o selezionarne un altro che includa il mapping al campo vendorname.";
    translation["ei.conversion.novendornamevalue"] =
        "Almeno uno degli articoli non dispone di un nome/codice fornitore. Annullare questo documento elettronico e sottometterne un altro con il valore corretto per l'elemento XML mappato al campo del nome/codice fornitore.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Impossibile trovare il record ({TRANSTYPE} n. {TRANSID}) nel sistema. Annullare questo documento elettronico e sottometterne un altro con il valore corretto per l'elemento XML mappato al campo createdfrom.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Il record ({TRANSTYPE} n. {TRANSID}) è assegnato a un'altra entità. Selezionare l'entità corretta e convertire questo documento elettronico.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Il fornitore non dispone di un conto spese predefinito, necessario per convertire le fatture con spese. Per procedere con la conversione, impostare un valore nel campo Conto spese predefinito nel record fornitore.";
    translation["ei.conversion.nolinktopo"] =
        "Il documento elettronico in entrata non dispone di articoli o spese inclusi nell'ordine di acquisto di riferimento. Controllare dallo stato dell'ordine di acquisto di riferimento se può essere convertito. In caso affermativo, annullare questo documento elettronico e sottometterne un altro con il valore corretto per l'elemento XML mappato al campo createdfrom.";
    translation["inbound.formtitle"] =
        "Converti documenti elettronici in entrata";
    translation["inbound.search"] = "Cerca";
    translation["inbound.convert"] = "Converti";
    translation["inbound.return"] = "Torna ai criteri";
    translation["inbound.vendor"] = "Fornitore";
    translation["inbound.datefrom"] = "Data creazione - Da";
    translation["inbound.dateto"] = "Data creazione - A";
    translation["inbound.vendorhelp"] =
        "Selezionare il fornitore i cui documenti elettronici in entrata non riusciti verranno inclusi nei risultati della ricerca.";
    translation["inbound.datefromhelp"] =
        "Selezionare una data iniziale per definire il periodo di creazione al quale devono appartenere i documenti elettronici in entrata non riusciti per essere inclusi nei risultati della ricerca.";
    translation["inbound.datetohelp"] =
        "Selezionare una data finale per definire il periodo di creazione al quale devono appartenere i documenti elettronici in entrata non riusciti per essere inclusi nei risultati della ricerca.";
    translation["inbound.inboundedocfieldgroup"] =
        "Filtri di ricerca documenti elettronici in entrata non riusciti";
    translation["inbound.sublist.sublistname"] =
        "Risultati della ricerca documenti elettronici in entrata non riusciti";
    translation["inbound.sublist.internalid"] = "ID interno";
    translation["inbound.sublist.vendor"] = "Fornitore";
    translation["inbound.sublist.refnum"] = "Numero di riferimento";
    translation["inbound.sublist.ponum"] = "Numero ordine di acquisto";
    translation["inbound.sublist.datecreated"] = "Data creazione";
    translation["inbound.sublist.edoctemplate"] =
        "Modello di documento elettronico";
    translation["inbound.msg.conversionongoing"] =
        "Il documento elettronico è in fase di conversione. L'utente riceverà un'e-mail al termine del processo.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Impossibile eseguire la ricerca con i criteri selezionati perché la conversione di documenti elettronici in entrata è già in corso per l'intervallo di date ({DATECREATED_FROM} - {DATECREATED_TO}). Modificare i criteri di ricerca o riprovare dopo la conversione di questo documento elettronico.";
    translation["inbound.invaliddates"] =
        "La data di inizio creazione deve essere antecedente alla data di fine. Modificare le date in modo che la data di inizio creazione sia antecedente a quella di fine.";
    translation["inbound.configurefreecountry"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo della SuiteApp Electronic Invoicing in più paesi. Per eseguire la conversione di massa dei documenti elettronici, contattare l'amministratore dell'account affinché configuri il campo Paese documenti elettronici a uso gratuito nella pagina delle informazioni sulla società.";
    translation["portlet.title"] = "Documenti elettronici";
    translation["portlet.outboundforgeneration"] =
        "Documenti elettronici in uscita da generare";
    translation["portlet.outboundforsending"] =
        "Documenti elettronici in uscita da inviare";
    translation["portlet.outboundwitherrors"] =
        "Documenti elettronici in uscita con errori";
    translation["portlet.outboundsendinglink"] =
        "Invia documenti elettronici in uscita non riusciti";
    translation["portlet.inboundforconversion"] =
        "Documenti elettronici in entrata da convertire";
    translation["portlet.inboundconvertfailed"] =
        "Converti documenti elettronici in entrata non riusciti";
    translation["portlet.inboundincomplete"] =
        "Documenti elettronici in entrata incompleti";
    translation["portlet.inbounduploadlink"] =
        "Carica documento elettronico in entrata";
    translation["portlet.outboundforcertification"] =
        "Documenti elettronici in uscita da certificare";
    translation["portlet.outboundcertifiedforsending"] =
        "Documenti elettronici in uscita da inviare";
    translation["inbound.webservice.response.success"] =
        "Il documento elettronico in entrata con ID {ID} è stato creato.";
    translation["inbound.webservice.response.novendor"] =
        "Nessun fornitore associato all'ID servizio Web {IDENTIFIER}. Verificare che sia stato usato l'ID servizio Web corretto.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Il documento elettronico in entrata con ID {ID} è stato creato. Tuttavia, all'ID servizio Web {IDENTIFIER} sono associati più fornitori.";
    translation["inbound.webservice.error.templateerror"] =
        "Il documento elettronico in entrata è incompleto perché non è stato possibile determinare il modello corretto. Selezionare un modello nel record documento elettronico in entrata oppure configurare il file XSD nel record modello di documento elettronico per abilitare la selezione automatica.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Il documento elettronico in entrata è incompleto perché non è stato possibile determinare il fornitore corretto. Selezionare un fornitore nel record documento elettronico in entrata oppure impostare l'ID servizio Web nel record fornitore associato.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Mancano le chiavi seguenti: {KEYS} che devono essere specificate nella richiesta di servizio Web.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Il corpo della richiesta di servizio Web deve essere un oggetto JSON o un array di oggetti JSON con il tipo di contenuto 'application/json'.";
    translation["transaction.contactnoemail"] =
        "I seguenti destinatari di documenti elettronici non hanno un indirizzo e-mail nei rispettivi record contatto: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Non ci sono destinatari di documenti elettronici per questa transazione. Per inviare i documenti elettronici tramite e-mail, è necessario aggiungere almeno un contatto all'elenco dei destinatari di documenti elettronici.";
    translation["transaction.maxrecipientexceeded"] =
        "Il numero di destinatari di e-mail aggiunti supera il limite consentito. È consentito aggiungere un massimo di 10 destinatari.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Vengono elaborati solo i seguenti tipi di transazione:";
    translation["ei.prefs.formtitle"] = "Preferenze documento elettronico";
    translation["ei.prefs.information.about.certify.skip"] =
        "Il passo di certificazione viene saltato se il metodo di invio della certificazione non è definito o applicabile per la transazione.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Fatturazione elettronica automatica";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Tipo di automazione documento elettronico";
    translation["ei.prefs.text.option.comb.disabled"] = "Disabilita";
    translation["ei.prefs.text.option.comb.gcs"] = "Genera, Certifica, Invia";
    translation["ei.prefs.text.option.comb.gc"] = "Genera, Certifica";
    translation["ei.prefs.text.option.comb.cs"] = "Genera, Invia";
    translation["ei.prefs.btn.label.cancel"] = "Annulla";
    translation["ei.prefs.btn.label.save"] = "Salva";
    translation["ei.prefs.msg.confirm.save"] =
        "Salvare le modifiche apportate alle preferenze del documento elettronico?";
    translation["ei.prefs.msg.success.save"] =
        "Salvataggio delle preferenze del documento elettronico riuscito.";
    translation["ei.prefs.msg.failed.save"] =
        "Salvataggio delle preferenze del documento elettronico non riuscito.";
    translation["ei.prefs.insufficient.permission.details"] =
        "L'autorizzazione per l'accesso a questa pagina è limitata. Per richiedere l'accesso contattare l'amministratore.";
    translation["ei.eip.msg.completed"] =
        "Elaborazione del documento elettronico completata.";
    translation["ei.eip.msg.failed"] =
        "Elaborazione del documento elettronico non riuscita. Per ulteriori dettagli, vedere l'audit trail del documento elettronico.";
    translation["ei.eip.msg.processing"] =
        "Il documento elettronico è in fase di elaborazione.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "Il documento elettronico è già in fase di elaborazione.";
    translation["license.notinstalled"] =
        "Il client delle licenze per le SuiteApp NetSuite non è disponibile in questo account. Installare la SuiteApp per accedere a tutte le funzioni di fatturazione elettronica.";
    translation["outbound.formtitle"] =
        "Invia documenti elettronici non riusciti";
    translation["outbound.search"] = "Cerca";
    translation["outbound.send"] = "Invia";
    translation["outbound.return"] = "Torna ai criteri";
    translation["outbound.customer"] = "Cliente";
    translation["outbound.vendor"] = "Fornitore";
    translation["outbound.subsidiary"] = "Società controllata";
    translation["outbound.type"] = "Tipo di transazione";
    translation["outbound.datefrom"] = "Data transazione - Da";
    translation["outbound.dateto"] = "Data transazione - A";
    translation["outbound.subshelp"] =
        "Selezionare una società controllata per visualizzare solo le transazioni che le appartengono.";
    translation["outbound.custhelp"] =
        "Selezionare un cliente per visualizzare solo le transazioni che gli appartengono. Se non si seleziona alcun cliente, la ricerca restituisce tutte le transazioni appartenenti alla società controllata, indipendentemente dal cliente.";
    translation["outbound.vendorhelp"] =
        "Selezionare un fornitore per visualizzare solo le transazioni che gli appartengono. Se non si seleziona alcun fornitore, la ricerca restituisce tutte le transazioni appartenenti alla società controllata, indipendentemente dal fornitore.";
    translation["outbound.entitytypehelp"] =
        "Scegliere il tipo di entità Cliente o Fornitore. Verrà abilitato il corrispondente elenco a discesa in basso.";
    translation["outbound.typehelp"] =
        "Selezionare uno o più tipi di transazione per ogni documento elettronico da inviare. Per selezionare più tipi di transazione, tenere premuto il tasto Ctrl mentre si selezionano i singoli tipi.<br /><br />Se non si seleziona alcun tipo di transazione, la ricerca restituisce tutti i documenti elettronici pronti per l'invio, indipendentemente dal tipo di transazione.";
    translation["outbound.datefromhelp"] =
        "Per visualizzare l'elenco delle transazioni create in uno specifico intervallo di date, selezionare una data per definire l'inizio dell'intervallo di date.";
    translation["outbound.datetohelp"] =
        "Per visualizzare l'elenco delle transazioni create in uno specifico intervallo di date, selezionare una data per definire la fine dell'intervallo di date.";
    translation["outbound.entityfieldgroup"] = "Filtri ricerca entità";
    translation["outbound.filtersfieldgroup"] = "Filtri ricerca transazioni";
    translation["outbound.entitytypeinlinehelp"] = "Seleziona tipo di entità:";
    translation["outbound.invalidtypetitle"] = "Tipi di transazione non validi";
    translation["outbound.invalidtype"] =
        "I seguenti tipi di transazione non sono supportati al momento: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "I seguenti tipi di transazione non sono validi per l'entità scelta: {TRANSACTIONTYPES}. Selezionare i tipi di transazione appropriati per l'entità scelta.";
    translation["outbound.invaliddates"] =
        "La data di inizio della transazione deve essere antecedente alla data di fine. Modificare le date in modo che la data di inizio della transazione sia antecedente a quella di fine.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Impossibile eseguire la ricerca con i criteri selezionati perché l'invio di documenti elettronici è già in corso per le transazioni comprese nell'intervallo di date ({TRANDATE_FROM} - {TRANDATE_TO}) per la società controllata ({SUBSIDIARY}). Modificare i criteri di ricerca o riprovare dopo l'invio di questo documento elettronico.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Impossibile eseguire la ricerca con i criteri selezionati perché l'invio di documenti elettronici è già in corso per le transazioni comprese nell'intervallo di date ({TRANDATE_FROM} - {TRANDATE_TO}). Modificare i criteri di ricerca o riprovare dopo l'invio di questo documento elettronico.";
    translation["outbound.sublist.trannum"] = "Numero transazione";
    translation["outbound.sublist.trantype"] = "Tipo di transazione";
    translation["outbound.sublist.customer"] = "Cliente";
    translation["outbound.sublist.vendor"] = "Fornitore";
    translation["outbound.sublist.subsidiary"] = "Società controllata";
    translation["outbound.sublist.trandate"] = "Data transazione";
    translation["outbound.sublist.memo"] = "Promemoria";
    translation["outbound.sublist.template"] = "Modello";
    translation["outbound.sublist.sendingmethod"] = "Metodo di invio";
    translation["outbound.sublist.sublistname"] =
        "Risultati dei documenti elettronici in uscita non riusciti da inviare";
    translation["outbound.msg.sendingongoing"] =
        "Il documento elettronico è in fase di invio. L'utente riceverà un'e-mail al termine del processo.";
    translation["outbound.configurefreecountry"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo della fatturazione elettronica in più paesi. Per eseguire l'invio di massa di documenti elettronici, contattare l'amministratore dell'account affinché configuri il campo Paese documenti elettronici a uso gratuito nella pagina delle informazioni sulla società.";
    translation["outbound.entitysend"] = "Invia a entità";
    translation["outbound.certifysend"] = "Invia per certificazione";
    translation["outbound.sendingtypehelp"] =
        "Scegliere Invia a entità o Invia per certificazione. Verranno elencate le corrispondenti transazioni per l'invio.";
    translation["customer.noemail"] =
        "Non esiste un indirizzo e-mail per questo cliente. Inserire un indirizzo e-mail valido nel record cliente per abilitare l'invio di documenti elettronici tramite e-mail.";
    translation["customer.contactnoemail"] =
        "I seguenti destinatari di documenti elettronici non hanno un indirizzo e-mail nei rispettivi record contatto: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Non ci sono destinatari di documenti elettronici per questo cliente. Per inviare i documenti elettronici tramite e-mail a questo cliente, è necessario aggiungere almeno un contatto all'elenco dei destinatari di documenti elettronici.";
    translation["customer.arrayrequired"] =
        "Array contatti richiesto per convalida.";
    translation["customer.parameternotarray"] =
        "Il parametro contatti non è un array.";
    translation["customer.maxrecipientexceeded"] =
        "È stato superato il numero massimo di destinatari di e-mail. Selezionare al massimo 10 destinatari di e-mail.";
    translation["vendor.noemail"] =
        "Non esiste un indirizzo e-mail per questo fornitore. Inserire un indirizzo e-mail valido nel record fornitore per abilitare l'invio di documenti elettronici tramite e-mail.";
    translation["vendor.contactnoemail"] =
        "I seguenti destinatari di documenti elettronici non hanno un indirizzo e-mail nei rispettivi record contatto: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Non ci sono destinatari di documenti elettronici per questo fornitore. Per inviare i documenti elettronici tramite e-mail a questo fornitore, è necessario aggiungere almeno un contatto all'elenco dei destinatari di documenti elettronici.";
    translation["vendor.maxrecipientexceeded"] =
        "È stato superato il numero massimo di destinatari di e-mail. Selezionare al massimo 10 destinatari di e-mail.";
    translation["vendor.nosenders"] =
        "Non esiste un mittente e-mail di documenti elettronici per questo fornitore. Per ricevere i documenti elettronici tramite e-mail da questo fornitore, è necessario inserire almeno un indirizzo e-mail nell'elenco Mittente e-mail documento elettronico fornitore.";
    translation["vendor.existingsender"] =
        "L'indirizzo e-mail del mittente esiste già.";
    translation["vendor.existingdomain"] =
        "Il dominio e-mail del mittente è già utilizzato da un altro fornitore.";
    translation["vendor.existingidentifier"] =
        "L'ID servizio Web è già utilizzato da un altro fornitore. Inserire un altro ID servizio Web.";
    translation["customeremailrecipient.contextunsupported"] =
        "Per Destinatario e-mail documento elettronico cliente sono supportati solo i seguenti contesti: interfaccia utente, file CSV, SuiteScript e servizi Web.";
    translation["vendoremailrecipient.contextunsupported"] =
        "Per Destinatario e-mail documento elettronico fornitore sono supportati solo i seguenti contesti: interfaccia utente, file CSV, SuiteScript e servizi Web.";
    translation["vendoremailsender.contextunsupported"] =
        "Per Mittente e-mail documento elettronico fornitore sono supportati solo i seguenti contesti: interfaccia utente, file CSV, SuiteScript e servizi Web.";
    translation["template.incorrectregex"] =
        "Il campo REGEX contiene un'espressione regolare non corretta. Utilizzare la sintassi corretta.";
    translation["template.invalidjson"] =
        "Non è stato specificato un formato JSON corretto nel campo Modello per documenti elettronici in uscita. Fare clic su OK per continuare o su Annulla per restare nella pagina corrente.";
    translation["template.invalidxml"] =
        "Il modello XML contiene errori. Il formato XML deve essere corretto.";
    translation["template.templaterequired"] =
        "Manca il contenuto del modello per il tipo di transazione in uscita selezionato. Specificare un contenuto XML o JSON valido nel campo Documenti elettronici in uscita, quindi riprovare.";
    translation["template.mappingrequired"] =
        "È stato selezionato un tipo di transazione in entrata, ma manca il contenuto JSON del mapping di campo. Inserire il contenuto JSON nel campo Mapping dei campi per i documenti elettronici in entrata.";
    translation["template.templateorjsonrequired"] =
        "Mancano i valori di alcuni campi. Per una transazione in uscita, specificare un contenuto XML o JSON valido nel campo Modello per documenti elettronici in uscita. Per una transazione in entrata, specificare il contenuto JSON nel campo Mapping dei campi per i documenti elettronici in entrata.";
    translation["template.invalidxsdfile"] =
        "Il file XSD selezionato non è valido. Verificare che il file selezionato abbia l'estensione .xsd.";
    translation["template.contextunsupported"] =
        "Il modello di documento elettronico supporta solo i contesti di interfaccia utente e SuiteScript.";
    translation["template.supportedtranstypefldhelp"] =
        "Selezionare uno o più tipi di transazione che il modello dovrà supportare. Per selezionare più tipi di transazione, tenere premuto il tasto Ctrl mentre si selezionano i tipi.<br /><br />Se non è possibile selezionare i tipi di transazione, significa che il modello è già stato assegnato a uno o più record transazione dello stesso tipo. Per attivare la selezione del tipo di transazione, rimuovere il modello dal record transazione.<br /><br />È possibile assegnare questo modello anche a documenti elettronici in entrata; in tal caso, il campo Tipo di transazione risulta disattivato.";
    translation["template.eistatus"] =
        "Limita modifica transazioni con stato documento elettronico";
    translation["template.supportedeistatusfieldhelp"] =
        "Le transazioni con lo stato documento elettronico selezionato dall'utente non saranno modificabili se associate a questo modello. È possibile selezionare più stati documento elettronico.";
    translation["template.invalidschemaordependency"] =
        "Lo schema è un file XSD non strutturato correttamente oppure non è possibile trovare lo schema dipendente.";
    translation["template.xmldoesnotconformtoschema"] =
        "Il file XML del modello non è conforme al file XSD o allo schema fornito.";
    translation["template.xmldomexception"] =
        "Il formato della stringa XML di input non è corretto.";
    translation["template.missingreqdargument"] =
        "Manca il file XSD per la convalida in uscita.";
    translation["template.xsdvalidationexception"] =
        "Si è verificata un’eccezione sconosciuta durante la convalida del file XSD.";
    translation["template.xsdmissingdependencyfolder"] =
        "La cartella dello schema XSD manca o non è valida.";
    translation["invoice.generatebtn"] = "Genera documento elettronico";
    translation["invoice.sendbtn"] = "Invia documento elettronico";
    translation["invoice.sendcertifybtn"] = "Certifica documento elettronico";
    translation["invoice.eipbtn"] = "Elabora documento elettronico";
    translation["invoice.loguntagged"] =
        "Il modello di documento elettronico è stato rimosso. La transazione non è contrassegnata per la generazione di documenti elettronici.";
    translation["invoice.logforgenerate"] =
        "La transazione è pronta per la generazione di documenti elettronici.";
    translation["invoice.invalidtemplatesub"] =
        "La società controllata della transazione non è valida per il modello di documento elettronico selezionato. Selezionare un modello di documento elettronico diverso.";
    translation["invoice.templateremovalerror"] =
        "Non è consentito rimuovere il modello di documento elettronico per i documenti elettronici inviati.";
    translation["ei.sending.currentlysending"] =
        "Il documento elettronico è in fase di invio. L'operazione potrebbe richiedere alcuni minuti. Non interrompere l'elaborazione facendo nuovamente clic sul pulsante Invia documento elettronico. Dopo l'invio del documento elettronico, la pagina verrà ricaricata.";
    translation["ei.sending.notready"] =
        "Questo documento elettronico non è pronto per l'invio. È necessario fare prima clic su Genera documento elettronico per generare un documento elettronico.";
    translation["ei.sending.alreadysent"] =
        "Questa transazione è già stata inviata.";
    translation["ei.sending.norecipients"] =
        "Impossibile inviare il documento elettronico perché al cliente non sono associati destinatari di documenti elettronici. Per poter inviare questo documento elettronico tramite e-mail è necessario selezionare i destinatari di documenti elettronici nel record cliente.";
    translation["ei.sending.indivcustnoemail"] =
        "Impossibile inviare il documento elettronico perché il cliente non ha un indirizzo e-mail. Per poter inviare questo documento elettronico tramite e-mail è necessario specificare un indirizzo e-mail nel record cliente.";
    translation["ei.sending.norecipients.vendor"] =
        "Impossibile inviare il documento elettronico perché al fornitore non sono associati destinatari di documenti elettronici. Per poter inviare questo documento elettronico tramite e-mail è necessario selezionare i destinatari di documenti elettronici nel record fornitore.";
    translation["ei.sending.indivvendnoemail"] =
        "Impossibile inviare il documento elettronico perché il fornitore non ha un indirizzo e-mail. Per poter inviare questo documento elettronico tramite e-mail è necessario specificare un indirizzo e-mail nel record fornitore.";
    translation["ei.sending.invalidmethod"] =
        "Selezionare un metodo di invio valido per {TYPE} n. {INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Mittente: {SENDER}\nDestinatari: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "Il mittente di documenti elettronici ({EMPLOYEENAME}) non dispone di un indirizzo e-mail. Inserire un indirizzo e-mail valido nel record dipendente.";
    translation["ei.sending.recipientnoemail"] =
        "Uno o più destinatari del documento elettronico associato a questa transazione non hanno un indirizzo e-mail. Verificare che i destinatari di questo cliente abbiano indirizzi e-mail validi.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Uno o più destinatari del documento elettronico associato a questa transazione non hanno un indirizzo e-mail. Verificare che i destinatari di questo fornitore abbiano indirizzi e-mail validi.";
    translation["ei.sending.defaulterror"] =
        "Si è verificato un errore durante l'invio del documento elettronico. Per i dettagli controllare l'audit trail dei documenti elettronici nella scheda secondaria Documento elettronico.";
    translation["ei.sending.inactivecustomer"] =
        "Impossibile inviare il documento elettronico per questa transazione perché il cliente selezionato è inattivo. Lo stato del documento elettronico non è stato aggiornato e non è stato creato un audit trail. Deselezionare la casella Inattivo nel record cliente, quindi provare a inviare di nuovo il documento elettronico.";
    translation["ei.sending.inactivevendor"] =
        "Impossibile inviare il documento elettronico per questa transazione perché il fornitore selezionato è inattivo. Il campo Stato del documento elettronico non è stato aggiornato e non è stato creato un audit trail. Deselezionare la casella Inattivo nel record fornitore, quindi provare a inviare di nuovo il documento elettronico.";
    translation["ei.sending.msg.processcomplete"] =
        "Il documento elettronico è stato inviato.";
    translation["ei.sending.configurefreecountry"] =
        "L'account deve avere una licenza attiva per utilizzare Electronic Invoicing per più paesi. Per inviare documenti elettronici in massa a un solo paese, è necessario selezionare il paese dal campo Paese documenti elettronici a uso gratuito nella pagina delle informazioni sulla società.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Le transazioni con clienti inattivi non sono supportate dai documenti elettronici.";
    translation["ei.sending.inactivevendor.manager"] =
        "Le transazioni con fornitori inattivi non sono supportate dai documenti elettronici.";
    translation["ei.sending.certification.defaulterror"] =
        "Si è verificato un errore durante la certificazione del documento elettronico. Per i dettagli controllare l'audit trail dei documenti elettronici nella scheda secondaria Documento elettronico.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "Il documento elettronico è stato inviato per la certificazione.";
    translation["ei.generation.generationlogbulk"] =
        "Il documento elettronico è stato generato in massa utilizzando il modello di documento elettronico '{TEMPLATENAME}'.";
    translation["ei.generation.generationlog"] =
        "Il documento elettronico è stato generato utilizzando il modello di documento elettronico '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "Il documento elettronico e il file PDF sono stati generati in massa utilizzando il modello di documento elettronico '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflog"] =
        "Il documento elettronico e il file PDF sono stati generati utilizzando il modello di documento elettronico '{TEMPLATENAME}'.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "Il documento elettronico è stato generato in massa utilizzando il modello di documento elettronico '{TEMPLATENAME}'. Il file PDF di questa transazione generato in precedenza è stato eliminato.";
    translation["ei.generation.generationremovedpdflog"] =
        "Il documento elettronico è stato generato utilizzando il modello di documento elettronico '{TEMPLATENAME}'. Il file PDF di questa transazione generato in precedenza è stato eliminato.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Processo di generazione di massa\nModello di documento elettronico utilizzato: {TEMPLATENAME}\nDettagli errore: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Modello di documento elettronico utilizzato: {TEMPLATENAME}\nDettagli errore: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Si è verificato un errore durante la generazione. Per i dettagli controllare l'audit trail dei documenti elettronici nella scheda secondaria Documento elettronico.";
    translation["ei.generation.inactivecustomer"] =
        "Impossibile generare un documento elettronico per questa transazione perché il cliente selezionato è inattivo. Il campo Stato del documento elettronico non è stato aggiornato e non è stato creato un audit trail. Deselezionare la casella Inattivo nel record cliente, quindi provare a generare di nuovo il documento elettronico.";
    translation["ei.generation.inactivevendor"] =
        "Impossibile generare un documento elettronico per questa transazione perché il fornitore selezionato è inattivo. Il campo Stato del documento elettronico non è stato aggiornato e non è stato creato un audit trail. Deselezionare la casella Inattivo nel record fornitore, quindi provare a generare di nuovo il documento elettronico.";
    translation["ei.generation.msg.processcomplete"] =
        "Il documento elettronico è stato generato.";
    translation["ei.generation.configurefreecountry"] =
        "L'account deve avere una licenza attiva per utilizzare Electronic Invoicing per più paesi. Per generare documenti elettronici in massa per un solo paese, è necessario selezionare il paese dal campo Paese documenti elettronici a uso gratuito nella pagina delle informazioni sulla società.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Le transazioni con clienti inattivi non sono supportate dai documenti elettronici.";
    translation["ei.generation.inactivevendor.generator"] =
        "Le transazioni con fornitori inattivi non sono supportate dai documenti elettronici.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "Il documento elettronico è stato generato e la firma digitale è stata apposta.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Generazione non riuscita. Il documento elettronico risultante non è un file XML né JSON ben formato.";
    translation["notify.batchownersubject"] =
        "Invio documenti elettronici completato";
    translation["notify.batchownerbody"] =
        "Salve, <br/><br/>la richiesta di invio di documenti elettronici è conclusa.<br/>Sono stati inviati {SENT} di {TOTAL} documenti elettronici. I dettagli sono disponibili nel file allegato. <br/><br/>Grazie,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "Documento elettronico generato per OdA n. {PONUM}";
    translation["notify.recipientcompsubj"] =
        "Documento elettronico generato da {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Salve! <br /><br />{MESSAGE}<br />Per il documento elettronico, vedere il file allegato.<br /><br />Grazie,<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Errore durante la generazione dei documenti elettronici";
    translation["notify.generationerrorbody"] =
        "Si sono verificati errori durante la generazione del documento elettronico.<br/>L'elenco delle transazioni e i dettagli degli errori sono disponibili nel file allegato.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Un documento elettronico è stato già inviato per questa transazione. La generazione di un nuovo documento elettronico sovrascrive il precedente documento elettronico. Generare un nuovo documento elettronico?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Non è consentito rimuovere il modello di documento elettronico per i documenti elettronici inviati.";
    translation["transaction.msg.generate.information"] =
        "La generazione di questo documento elettronico è in corso.";
    translation["transaction.msg.send.information"] =
        "L'invio di questo documento elettronico è in corso.";
    translation["transaction.msg.send.certify.information"] =
        "La certificazione di questo documento elettronico è in corso.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "La generazione di questo documento elettronico è già in corso.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "L'invio di questo documento elettronico è già in corso.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "La certificazione di questo documento elettronico è già in corso.";
    translation["transaction.msg.uncheckpdf"] =
        "Durante la generazione dell'ultimo documento elettronico è stato creato un file PDF di questa transazione. Se si deseleziona questa casella, il file PDF verrà eliminato durante la generazione del prossimo documento elettronico.";
    translation["transaction.msg.nofreecountry"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo della fatturazione elettronica in più paesi. Per generare un documento elettronico per questa transazione, contattare l'amministratore dell'account affinché specifichi un paese nel campo Paese documenti elettronici a uso gratuito nella pagina delle informazioni sulla società.";
    translation["transaction.msg.otherbillingcountry"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo della fatturazione elettronica in più paesi. Per generare un documento elettronico per questa transazione, contattare il responsabile dell'account NetSuite per l'acquisto di una licenza.";
    translation["transaction.msg.nobillingcountry"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo della fatturazione elettronica in più paesi. Per generare un documento elettronico per questa transazione, indicare l'indirizzo di fatturazione per la transazione.";
    translation["transaction.msg.noshippingcountry"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo della fatturazione elettronica in più paesi. Per generare un documento elettronico per questa transazione, indicare l'indirizzo di spedizione per la transazione.";
    translation["transaction.msg.nocustomercountry"] =
        "Questo account non dispone di una licenza attiva per l'utilizzo della fatturazione elettronica in più paesi. Per generare un documento elettronico per questa transazione, indicare un indirizzo di fatturazione predefinito per il cliente di questa transazione.";
    translation["transaction.msg.blockededittransaction"] =
        "La modifica della transazione è bloccata a causa dello stato corrente del documento elettronico. Fare riferimento al modello di fattura elettronica allegato.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Modificando il valore nel campo Tipo di contenuto da XML a un tipo diverso si rimuoveranno tutti i programmi di convalida XML. Modificare il tipo di contenuto?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Possono essere aggiunti solo programmi di convalida per il tipo di contenuto XML.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Questo programma di convalida è già nell'elenco.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "I programmi di convalida del modello di documento elettronico supportano solo i contesti di interfaccia utente e SuiteScript.";
    translation["standarddocument.default.alreadyexist"] =
        "Il record {DEFAULT_DOCUMENT_STANDARD} esiste già. Non è possibile creare un record pacchetto di documenti con lo stesso nome. Rinominare il record pacchetto di documenti e riprovare.";
    translation["standarddocument.default.editnotallowed"] =
        "Non è consentito modificare il nome o la descrizione del record {DEFAULT_DOCUMENT_STANDARD}.";
    translation["standarddocument.default.deletenotallowed"] =
        "Non è consentito eliminare il record {DEFAULT_DOCUMENT_STANDARD}.";
    translation["standarddocument.contextunsupported"] =
        "Il pacchetto di documenti elettronici supporta solo i contesti di interfaccia utente, importazione CSV e SuiteScript.";
    translation["sendingmethod.default.alreadyexist"] =
        "Il record metodo di invio {DEFAULT_SENDING_METHOD_NAME} esiste già. Non è possibile creare un record metodo di invio con lo stesso nome. Rinominare il record metodo di invio e riprovare.";
    translation["sendingmethod.default.editnotallowed"] =
        "Non è consentito modificare il record metodo di invio {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Non è consentito eliminare il record metodo di invio {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Il campo Tipo di transazione è stato disabilitato poiché questo metodo di invio è assegnato a uno o più record transazione. Per modificare il metodo di invio, rimuoverlo dal record transazione per abilitare il campo Tipo di transazione e riprovare.";
    translation["sendingmethod.contextunsupported"] =
        "Il metodo di invio di documenti elettronici supporta solo i contesti di interfaccia utente e SuiteScript.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Selezionare uno o più tipi di transazione che il metodo di invio dovrà supportare. Per selezionare più tipi di transazione, tenere premuto il tasto Ctrl mentre si selezionano i tipi di transazione.<br /><br />Se non è possibile selezionare uno o più tipi di transazione, significa che il metodo di invio è stato assegnato a uno o più record transazione di quel tipo di transazione. Per abilitare la selezione del tipo di transazione, rimuovere il metodo di invio dal record transazione.";
    translation["sendingmethod.pluginimplementation"] =
        "Implementazione plugin metodo di invio documenti elettronici";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Selezionare un'implementazione del plugin metodo di invio";
    translation["sendingmethod.scriptbannermessage"] =
        "I metodi di invio devono essere implementazioni plugin personalizzate. Ricreare gli script dei metodi di invio esistenti sotto forma di nuove implementazioni plugin personalizzate del tipo &quot;Plugin di invio&quot;.";
    translation["customdatasource.pluginimplementation"] =
        "Implementazione plugin origine dati personalizzata";
    translation["customdatasource.pluginimplementationhelp"] =
        "Selezionare l'implementazione del plugin origine dati personalizzata";
    translation["digitalsignature.pluginimplementation"] =
        "Implementazione plugin firma digitale";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Selezionare un’implementazione del plugin. Il campo è obbligatorio se si desidera apporre una firma digitale ai documenti elettronici.";
    translation["digitalsignature.identifierlabel"] =
        "Questo documento elettronico è firmato digitalmente";
    translation["digitalsignature.successlog"] =
        "Il documento elettronico generato è firmato digitalmente.";
    translation["digitalsignature.failurelog"] =
        "Il documento elettronico generato non è firmato digitalmente.";
    translation["digitalsignature.pluginfailedmessage"] =
        "L'implementazione del plugin firma digitale ha restituito uno stato di errore.";
    translation["digitalsignature.plugininvalidresult"] =
        "Il risultato restituito dall’implementazione del plugin firma digitale non è valido.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Implementazione plugin origine dati in entrata personalizzata";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Selezionare un'implementazione del plugin origine dati in entrata personalizzata.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Il risultato dell'implementazione del plugin Origine dati personalizzati in entrata non è valido.";
    translation["outboundvalidation.pluginimplementation"] =
        "Implementazione plugin convalida in uscita";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Selezionare un'implementazione del plugin convalida dei documenti elettronici in uscita. Vengono così convalidati i documenti elettronici in uscita.";
    translation["outboundvalidation.successlog"] =
        "Convalida in uscita riuscita.";
    translation["outboundvalidation.failurelog"] =
        "Convalida in uscita non riuscita.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "L'implementazione del plugin convalida in uscita ha restituito uno stato di errore.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Il risultato dell'implementazione del plugin convalida in uscita non è valido.";
    translation["template.msg.cannotedittransactiontype"] =
        "Il campo Tipo di transazione è stato disabilitato poiché questo modello è già assegnato a uno o più record transazione. Per modificare il modello, rimuoverlo dal record transazione per abilitare il campo Tipo di transazione e riprovare. Questo modello può essere assegnato anche a documenti elettronici in entrata; in questo caso, il campo Tipo di transazione viene disabilitato.";
    translation["template.msg.forcetocopymessage"] =
        "Impossibile modificare il modello predefinito di documento elettronico. È possibile copiarlo utilizzando l'opzione Crea copia da Azioni o crearne uno nuovo.";
    translation["template.msg.warningoneditmessage"] =
        "Questo è un modello predefinito di documento elettronico. Tutte le modifiche apportate a questo modello andranno perse o saranno sovrascritte all'aggiornamento della SuiteApp.";
    translation["email.batchownernotification.subject"] =
        "Invio documenti elettronici completato";
    translation["email.batchownernotification.body"] =
        "Salve, <br/><br/>l'invio dei documenti elettronici è stato completato.<br/>Sono stati inviati {SENT} di {TOTAL} documenti. I dettagli sono disponibili nel file allegato. <br/><br/>Grazie,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Conversione documenti elettronici completata";
    translation["email.batchownerconvertnotification.body"] =
        "Salve, <br/><br/>la conversione dei documenti elettronici è stata completata.<br/>Sono stati convertiti {CONVERTED} di {TOTAL} documenti. I dettagli sono disponibili nel file allegato. <br/><br/>Grazie,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "Documento elettronico generato per OdA n. {PONUM}";
    translation["email.recipientnotification.subject"] =
        "Documento elettronico di {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "Documento elettronico generato per {TRANTYPE} n. {TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Salve! <br /><br />Il documento elettronico per l'ordine d'acquisto n. {PONUM} è stato generato.<br />I dettagli sono disponibili nel file del documento elettronico allegato.<br /><br />Grazie,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Salve! <br /><br />Il documento elettronico per {TYPE} n. {TRANID} è stato generato.<br />I dettagli sono disponibili nel file del documento elettronico allegato.<br /><br />Grazie,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Errore durante la generazione dei documenti elettronici";
    translation["email.generationerrornotification.body"] =
        "Si sono verificati errori durante la generazione del documento elettronico.<br/>L'elenco delle transazioni e i dettagli degli errori sono disponibili nel file allegato.";
    translation["email.sendingerrornotification.subject"] =
        "Errore durante l'invio dei documenti elettronici";
    translation["email.sendingerrornotification.body"] =
        "Si sono verificati errori durante l'invio del documento elettronico.<br/>L'elenco delle transazioni e i dettagli degli errori sono disponibili nel file allegato.";
    translation["email.webserviceerror.subject"] =
        "Notifica servizio Web documenti elettronici in entrata";
    translation["email.webserviceerror.body"] =
        "<p>Salve,</p><p>si sono verificati errori durante l'elaborazione del documento elettronico in entrata mediante servizio Web.<br/>I dettagli sono disponibili di seguito.</p>{DETAIL_TABLE}<p>Grazie,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Numero transazione";

    return translation;
});
