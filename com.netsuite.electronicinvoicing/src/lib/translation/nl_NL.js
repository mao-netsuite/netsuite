define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Details";
    translation["email.attachment.collabel.transactiontype"] =
        "Transactiesoort";
    translation["email.attachment.collabel.internalid"] = "Interne ID";
    translation["email.attachment.collabel.vendor"] = "Leverancier";
    translation["email.conversionerrornotification.subject"] =
        "Er is een fout opgetreden bij de conversie van inkomende e-documenten";
    translation["email.conversionerrornotification.body"] =
        "Er zijn fouten opgetreden tijdens de conversie van inkomende e-documenten.<br/>Zie het bijgevoegde bestand voor een overzicht van records met fouten en de bijbehorende details.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Opmerking: als u wilt dat een andere gebruiker dan uw accountbeheerders de meldingen ontvangt, geeft u het e-mailadres op van de gebruiker in het veld 'Ontvanger van e-documentmeldingen' in het bovenliggende record van de dochtermaatschappij.";
    translation["email.table.collabel.inboundedocumentid"] =
        "Inkomend e-document-ID";
    translation["email.table.collabel.details"] = "Details";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Er is een fout opgetreden tijdens het controleren van de licentie voor de account.";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Deze account heeft geen actieve licentie voor gebruik van Electronic Invoicing in meerdere landen.</br>Als u e-documenten massaal wilt verwerken, configureert u 'Land e-document voor gratis gebruik' op de pagina 'Bedrijfsgegevens'.";
    translation["inboundedocument.logforconversion"] =
        "Dit inkomende e-document is gereed om te worden geconverteerd.";
    translation["inboundedocument.logincomplete"] =
        "Het inkomende e-document is onvolledig. Er is geen {FIELD} geselecteerd.";
    translation["inboundedocument.deletenotallowed"] =
        "Het verwijderen van een inkomend e-document is niet toegestaan.";
    translation["inboundedocument.copynotallowed"] =
        "Het kopiëren van een inkomend e-document is niet toegestaan.";
    translation["inboundedocument.contextunsupported"] =
        "Inkomend e-document biedt alleen ondersteuning voor de volgende contexten: UI en SuiteScript.";
    translation["inboundedocument.invalidxmlfile"] =
        "De geselecteerde XML-bestandsreferentie is geen geldig XML-bestand. Selecteer een bestand met de extensie .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "De geselecteerde PDF-bestandsreferentie is geen geldig PDF-bestand. Selecteer een bestand met de extensie .pdf.";
    translation["inboundedocument.invalidxml"] =
        "De geselecteerde XML-bestandsreferentie is geen juist ingedeeld XML-document.";
    translation["inboundedocument.convert.button"] = "Converteren";
    translation["inboundedocument.convert.information"] =
        "De conversie van dit inkomende e-document is in uitvoering.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "De conversie van dit inkomende e-document is al in uitvoering.";
    translation["inboundedocument.cancel.button"] = "E-document annuleren";
    translation["inboundedocument.cancel.confirmation"] =
        "Wilt u dit inkomende e-document annuleren?";
    translation["inboundedocument.cancel.failed"] =
        "Annuleren is mislukt omdat '{STATUS}' de status is van het record van het inkomende e-document.";
    translation["inboundedocument.cancel.defaulterror"] =
        "Er is een fout opgetreden tijdens het annuleren. Controleer de audittrail van het e-document op het subtabblad E-document voor meer informatie.";
    translation["inboundedocument.cancel.complete"] =
        "Het e-document is geannuleerd.";
    translation["inboundedocument.preview.button"] = "XML weergeven";
    translation["inboundedocument.msg.nofreecountry"] =
        "Deze account heeft geen actieve licentie voor gebruik van de Electronic Invoicing SuiteApp in meerdere landen. Als u dit e-document wilt converteren naar een transactie, neemt u contact op met de accountbeheerder om een land op te geven in het veld 'Land e-document voor gratis gebruik' op de pagina 'Bedrijfsgegevens'.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Deze account heeft geen actieve licentie voor gebruik van de Electronic Invoicing SuiteApp in meerdere landen. Als u dit e-document wilt converteren naar een transactie, neemt u contact op met de NetSuite accountbeheerder om een licentie aan te schaffen.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Deze account heeft geen actieve licentie voor gebruik van de Electronic Invoicing SuiteApp in meerdere landen. Als u dit e-document wilt converteren naar een transactie, dan stelt u het standaardfactuuradres in van de geselecteerde leverancier.";
    translation["validationplugin.contextunsupported"] =
        "De invoegapplicatie voor validatie van inkomende e-documenten biedt alleen ondersteuning voor de volgende contexten: UI en SuiteScript.";
    translation["validationplugin.pluginimplementation"] =
        "Implementatie invoegapplicatie voor validatie van inkomende e-documenten";
    translation["validationplugin.pluginimplementationhelp"] =
        "Selecteer een implementatie voor de invoegapplicatie voor validatie van inkomende e-documenten.";
    translation["validationplugin.scriptbannermessage"] =
        "Validatie van inkomende e-documenten moet een aangepaste implementatie van de invoegapplicatie zijn. Maak van bestaande validatiescripts nieuwe aangepaste implementaties van de invoegapplicatie van het soort 'Invoegapplicatie voor validatie inkomende'.";
    translation["ei.conversion.defaulterror"] =
        "Er is een fout opgetreden tijdens conversie. Controleer de audittrail van het e-document op het subtabblad E-document voor meer informatie.";
    translation["ei.conversion.inactivevendor"] =
        "Dit inkomende e-document kan niet worden geconverteerd omdat de geselecteerde leverancier niet actief is. Het veld 'Status van e-document' is niet bijgewerkt en er is geen audittrail gemaakt. Schakel het selectievakje 'Niet actief' in de leveranciersrecord uit en converteer het e-document opnieuw.";
    translation["ei.conversion.inactivecustomer"] =
        "Dit inkomende e-document kan niet worden geconverteerd omdat de geselecteerde klant niet actief is. Het veld 'Status van e-document' is niet bijgewerkt en er is geen audittrail gemaakt. Schakel het selectievakje 'Niet actief' in de klantrecord uit en converteer het e-document opnieuw.";
    translation["ei.conversion.conversioncomplete"] =
        "Het e-document is geconverteerd.";
    translation["ei.conversion.conversionlogbulk"] =
        "Het inkomende e-document is opgenomen in de massale conversie en is geconverteerd naar de transactie met de interne ID {INTERNALID} van het soort '{TYPE}'.";
    translation["ei.conversion.conversionlog"] =
        "Het inkomende e-document is geconverteerd naar de transactie met de interne ID {INTERNALID} van het soort '{TYPE}'.";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Proces voor massaal converteren\nGebruikte e-documentsjabloon: {TEMPLATENAME}\nFoutbereik: {ERRORSCOPE}\nFoutdetails: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Gebruikte e-documentsjabloon: {TEMPLATENAME}\nFoutbereik: {ERRORSCOPE}\nFoutdetails: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Parseerfout. Controleer de veldtoewijzing voor inkomende e-documenten.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Conversiefout";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Validatiefout";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Conversie is mislukt omdat '{STATUS}' de status is van het record van het inkomende e-document.";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Inkomende e-documenten met niet-actieve klanten worden niet ondersteund voor conversies.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Inkomende e-documenten met niet-actieve leveranciers worden niet ondersteund voor conversies.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "De volgende leveranciercodes: {ITEMLIST} zijn niet gekoppeld aan enige itemrecords.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "De volgende leveranciernamen/codes: {ITEMLIST} zijn niet gekoppeld aan enige itemrecords.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "De volgende leveranciercodes: {ITEMLIST} zijn gekoppeld aan meerdere itemrecords. Wijzig de itemrecords en zorg ervoor dat de leveranciercode van elk item per leverancier uniek is.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "De volgende leveranciernamen/codes: {ITEMLIST} zijn gekoppeld aan meerdere itemrecords. Wijzig de itemrecords en zorg ervoor dat de leveranciernaam/code van elk item per leverancier uniek is.";
    translation["ei.conversion.refnumnotfound"] =
        "Het vereiste referentienummer ontbreekt in het inkomende e-document. Annuleer dit e-document en dien een ander e-document in waarin een XML-element is opgenomen voor het referentienummer, gekoppeld aan het veld Transactie-ID.";
    translation["ei.conversion.refnumexists"] =
        "Er bestaat al een leverancierfactuur met hetzelfde nummer. Annuleer dit e-document en dien een ander e-document in met de juiste referentienummerwaarde voor het XML-element dat is gekoppeld aan het veld Transactie-ID.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Het veld 'vendorcode' ontbreekt in de e-documentsjabloon. Wijzig de e-documentsjabloon of selecteer een andere sjabloon waarin de veldtoewijzing voor de veldtoewijzing 'vendorcode' is opgenomen.";
    translation["ei.conversion.novendorcodevalue"] =
        "Minimaal één van de items heeft geen leveranciercode. Annuleer dit e-document en dien een ander e-document in met de juiste waarde voor het XML-element dat is gekoppeld aan het veld Leveranciercode.";
    translation["ei.conversion.vendornamenotfound"] =
        "Het veld Leveranciernaam ontbreekt in de e-documentsjabloon. Wijzig de e-documentsjabloon of selecteer een andere sjabloon waarin de veldtoewijzing voor de leveranciernaam is opgenomen.";
    translation["ei.conversion.novendornamevalue"] =
        "Minimaal één van de items heeft geen leveranciernaam/code. Annuleer dit e-document en dien een ander e-document in met de juiste waarde voor het XML-element dat is gekoppeld aan het veld 'Leveranciernaam/code'.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Record ({TRANSTYPE} nr. {TRANSID}) is niet gevonden in het systeem. Annuleer dit e-document en dien een ander e-document in met de juiste waarde voor het XML-element dat is gekoppeld aan het veld Gemaakt vanaf.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Record ({TRANSTYPE} nr. {TRANSID}) is toegewezen aan een andere entiteit. Selecteer de juiste entiteit en converteer dit e-document.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "De leverancier heeft geen standaardonkostenrekening. Deze is vereist voor het converteren van facturen met onkosten. Als u wilt doorgaan met het converteren, geeft u een waarde op in het veld Standaardonkostenrekening in de leverancierrecord.";
    translation["ei.conversion.nolinktopo"] =
        "Het inkomende e-document bevat geen item of onkosten die zijn opgenomen in de inkooporder waarnaar wordt verwezen. Controleer de status van de inkooporder waarnaar wordt verwezen om te zien of deze kan worden geconverteerd. Als deze kan worden geconverteerd, annuleert u dit e-document en dient u een ander e-document in met de juiste waarde voor het XML-element dat is toegewezen aan het veld Gemaakt vanaf.";
    translation["inbound.formtitle"] = "Inkomende e-documenten converteren";
    translation["inbound.search"] = "Zoeken";
    translation["inbound.convert"] = "Converteren";
    translation["inbound.return"] = "Terug naar criteria";
    translation["inbound.vendor"] = "Leverancier";
    translation["inbound.datefrom"] = "Gemaakt vanaf";
    translation["inbound.dateto"] = "Gemaakt tot";
    translation["inbound.vendorhelp"] =
        "Selecteer de leverancier waarvan mislukte inkomende e-documenten worden opgenomen in de zoekresultaten.";
    translation["inbound.datefromhelp"] =
        "Selecteer een begindatum om een periode te definiëren waarbinnen mislukte inkomende e-documenten die in die periode zijn gemaakt, in de zoekresultaten worden opgenomen.";
    translation["inbound.datetohelp"] =
        "Selecteer een einddatum om een periode te definiëren waarbinnen mislukte inkomende e-documenten die in die periode zijn gemaakt, in de zoekresultaten worden opgenomen.";
    translation["inbound.inboundedocfieldgroup"] =
        "Zoekfilters voor mislukte inkomende e-documenten";
    translation["inbound.sublist.sublistname"] =
        "Resultaten van zoekopdracht naar mislukte inkomende e-documenten";
    translation["inbound.sublist.internalid"] = "Interne ID";
    translation["inbound.sublist.vendor"] = "Leverancier";
    translation["inbound.sublist.refnum"] = "Referentienr";
    translation["inbound.sublist.ponum"] = "Inkoopordernummer";
    translation["inbound.sublist.datecreated"] = "Gemaakt op";
    translation["inbound.sublist.edoctemplate"] = "E-documentsjabloon";
    translation["inbound.msg.conversionongoing"] =
        "Het e-document wordt momenteel geconverteerd. U ontvangt een e-mail wanneer het proces is voltooid.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "U kunt de zoekopdracht niet uitvoeren met de geselecteerde criteria, omdat het conversieproces voor inkomende e-documenten in de periode ({DATECREATED_FROM} - {DATECREATED_TO}) al wordt uitgevoerd. Wijzig de zoekcriteria of probeer het opnieuw nadat u dit e-document hebt geconverteerd.";
    translation["inbound.invaliddates"] =
        "'Gemaakt vanaf' mag niet later zijn dan 'Gemaakt tot'. Wijzig de datums zodat 'Gemaakt vanaf' eerder is dan 'Gemaakt tot'.";
    translation["inbound.configurefreecountry"] =
        "Deze account heeft geen actieve licentie voor gebruik van de Electronic Invoicing SuiteApp in meerdere landen. Als u e-documenten massaal wilt converteren, neemt u contact op met de accountbeheerder om 'Land e-document voor gratis gebruik' te configureren op de pagina 'Bedrijfsgegevens'.";
    translation["portlet.title"] = "Elektronische documenten";
    translation["portlet.outboundforgeneration"] =
        "Uitgaande e-documenten voor genereren";
    translation["portlet.outboundforsending"] =
        "Uitgaande e-documenten voor verzending";
    translation["portlet.outboundwitherrors"] =
        "Uitgaande e-documenten met fouten";
    translation["portlet.outboundsendinglink"] =
        "Mislukte uitgaande e-documenten verzenden";
    translation["portlet.inboundforconversion"] =
        "Inkomende e-documenten voor conversie";
    translation["portlet.inboundconvertfailed"] =
        "Mislukte inkomende e-documenten converteren";
    translation["portlet.inboundincomplete"] =
        "Onvolledige inkomende e-documenten";
    translation["portlet.inbounduploadlink"] = "Inkomend e-document uploaden";
    translation["portlet.outboundforcertification"] =
        "Uitgaande e-documenten voor certificatie";
    translation["portlet.outboundcertifiedforsending"] =
        "Uitgaande e-documenten voor verzending";
    translation["inbound.webservice.response.success"] =
        "Het inkomende e-document met de ID: {ID} is gemaakt.";
    translation["inbound.webservice.response.novendor"] =
        "Er is geen leverancier gekoppeld aan de webservice-ID: {IDENTIFIER}. Zorg ervoor dat de correcte webservice-ID wordt gebruikt.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Het inkomende e-document met de ID: {ID} is gemaakt. Er zijn echter meerdere leveranciers gekoppeld aan de webservice-ID: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Het inkomende e-document is onvolledig, aangezien de juiste sjabloon niet kan worden bepaald. Selecteer een sjabloon in de record voor inkomende e-documenten of stel het XSD-bestand in de sjabloonrecord van het e-document in om het automatisch selecteren van sjablonen in te schakelen.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Het inkomende e-document is onvolledig, aangezien de juiste leverancier niet kan worden vastgesteld. Selecteer een leverancier in de record voor inkomende e-documenten of stel de webservice-ID in de gekoppelde leverancierrecord in.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "De volgende sleutels ontbreken: {KEYS}. Deze moet worden opgegeven in de webservice-aanvraag.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "De tekst van de webserviceaanvraag moet een JSON-object of een matrix met JSON-objecten zijn die gebruikmaken van het inhoudssoort 'application/json'.";
    translation["transaction.contactnoemail"] =
        "Bij de volgende ontvangers van e-documenten is geen e-mailadres opgegeven in de contactpersoonrecord: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Voor deze transactie zijn geen ontvangers van e-documenten opgegeven. Als u per e-mail e-documenten wilt verzenden, moet u minimaal één contactpersoon toevoegen aan de lijst met ontvangers van e-documenten.";
    translation["transaction.maxrecipientexceeded"] =
        "Het aantal e-mailontvangers dat u hebt toegevoegd, overschrijdt de limiet. U kunt maximaal 10 e-mailontvangers toevoegen.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Alleen de volgende transactiesoorten worden verwerkt:";
    translation["ei.prefs.formtitle"] = "E-documentvoorkeuren";
    translation["ei.prefs.information.about.certify.skip"] =
        "De certicatiestap wordt overgeslagen als de verzendmethode voor de certificatie niet is gedefinieerd voor of niet van toepassing is op de transactie.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Automatische elektronische facturering";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Soort automatisering e-document";
    translation["ei.prefs.text.option.comb.disabled"] = "Uitschakelen";
    translation["ei.prefs.text.option.comb.gcs"] =
        "Genereren, Certificeren, Verzenden";
    translation["ei.prefs.text.option.comb.gc"] = "Genereren, Certificeren";
    translation["ei.prefs.text.option.comb.cs"] = "Certificeren, Verzenden";
    translation["ei.prefs.btn.label.cancel"] = "Annuleren";
    translation["ei.prefs.btn.label.save"] = "Opslaan";
    translation["ei.prefs.msg.confirm.save"] =
        "Wilt u de wijzigingen in 'E-documentvoorkeuren' opslaan?";
    translation["ei.prefs.msg.success.save"] =
        "De e-documentvoorkeuren zijn opgeslagen.";
    translation["ei.prefs.msg.failed.save"] =
        "Opslaan van e-documentvoorkeuren is mislukt.";
    translation["ei.prefs.insufficient.permission.details"] =
        "De toegang tot deze pagina is beperkt. Neem voor het aanvragen van toegang contact op met de beheerder.";
    translation["ei.eip.msg.completed"] =
        "Verwerking van e-document is voltooid.";
    translation["ei.eip.msg.failed"] =
        "Verwerking van e-document is mislukt. Zie 'Audittrail e-document' voor meer informatie.";
    translation["ei.eip.msg.processing"] = "Het e-document wordt verwerkt.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "Het e-document wordt al verwerkt.";
    translation["license.notinstalled"] =
        "De NetSuite SuiteApps License Client is niet beschikbaar in uw account. Installeer deze SuiteApp om toegang te krijgen tot alle functies van Electronic Invoicing.";
    translation["outbound.formtitle"] = "Mislukte e-documenten verzenden";
    translation["outbound.search"] = "Zoeken";
    translation["outbound.send"] = "Verzenden";
    translation["outbound.return"] = "Terug naar criteria";
    translation["outbound.customer"] = "Klant";
    translation["outbound.vendor"] = "Leverancier";
    translation["outbound.subsidiary"] = "Dochtermaatschappij";
    translation["outbound.type"] = "Transactiesoort";
    translation["outbound.datefrom"] = "Transactiedatum vanaf";
    translation["outbound.dateto"] = "Transactiedatum t/m";
    translation["outbound.subshelp"] =
        "Selecteer een dochtermaatschappij om alleen transacties van die dochtermaatschappij weer te geven.";
    translation["outbound.custhelp"] =
        "Selecteer een klant om alleen transacties van die klant weer te geven. Als er geen klant is geselecteerd, worden in de zoekresultaten alle transacties van de dochtermaatschappij weergegeven, ongeacht de klant.";
    translation["outbound.vendorhelp"] =
        "Selecteer een leverancier om alleen transacties van die leverancier weer te geven. Als er geen leverancier is geselecteerd, worden in de zoekresultaten alle transacties van de dochtermaatschappij weergegeven, ongeacht de leverancier.";
    translation["outbound.entitytypehelp"] =
        "Kies het entiteitsoort 'Klant' of 'Leverancier' om het volgende vervolgkeuzemenu weer te geven.";
    translation["outbound.typehelp"] =
        "Selecteer een of meer transactiesoorten voor elk e-document dat u wilt verzenden. Als u meerdere transactiesoorten wilt selecteren, houdt u de Ctrl-toets ingedrukt terwijl u elk transactiesoort selecteert.<br/><br/>Als er geen transactiesoort is geselecteerd, worden in de zoekresultaten alle e-documenten weergegeven die gereed zijn voor verzending, ongeacht het transactiesoort.";
    translation["outbound.datefromhelp"] =
        "Voor een overzicht van alle transacties die in een bepaalde periode zijn gemaakt, selecteert u de begindatum van deze periode.";
    translation["outbound.datetohelp"] =
        "Voor een overzicht van alle transacties die in een bepaalde periode zijn gemaakt, selecteert u de einddatum van deze periode.";
    translation["outbound.entityfieldgroup"] = "Zoekfilters voor entiteit";
    translation["outbound.filtersfieldgroup"] = "Zoekfilters voor transacties";
    translation["outbound.entitytypeinlinehelp"] = "Selecteer entiteitsoort:";
    translation["outbound.invalidtypetitle"] = "Ongeldige transactiesoorten";
    translation["outbound.invalidtype"] =
        "De volgende transactiesoorten worden momenteel niet ondersteund: {TRANSACTIONTYPES}.";
    translation["outbound.invalidentitytransaction"] =
        "De volgende transactiesoorten zijn niet geldig voor de gekozen entiteit: {TRANSACTIONTYPES}. Selecteer de juiste transactiesoorten voor de entiteit die u hebt gekozen.";
    translation["outbound.invaliddates"] =
        "'Transactiedatum vanaf' mag niet later zijn dan 'Transactiedatum t/m'. Wijzig de datums zodat 'Transactiedatum vanaf' eerder is dan 'Transactiedatum t/m'.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "U kunt de zoekopdracht niet uitvoeren met de geselecteerde criteria, omdat het verzendproces van e-documenten voor transacties in de periode ({TRANDATE_FROM} - {TRANDATE_TO}) al wordt uitgevoerd voor dochtermaatschappij ({SUBSIDIARY}). Wijzig de zoekcriteria of probeer het opnieuw nadat u dit e-document hebt verzonden.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "U kunt de zoekopdracht niet uitvoeren met de geselecteerde criteria, omdat het verzendproces van e-documenten voor transacties in de periode ({TRANDATE_FROM} - {TRANDATE_TO}) al wordt uitgevoerd. Wijzig de zoekcriteria of probeer het opnieuw nadat u dit e-document hebt verzonden.";
    translation["outbound.sublist.trannum"] = "Transactienummer";
    translation["outbound.sublist.trantype"] = "Transactiesoort";
    translation["outbound.sublist.customer"] = "Klant";
    translation["outbound.sublist.vendor"] = "Leverancier";
    translation["outbound.sublist.subsidiary"] = "Dochtermaatschappij";
    translation["outbound.sublist.trandate"] = "Transactiedatum";
    translation["outbound.sublist.memo"] = "Memo";
    translation["outbound.sublist.template"] = "Sjabloon";
    translation["outbound.sublist.sendingmethod"] = "Verzendmethode";
    translation["outbound.sublist.sublistname"] =
        "Resultaten van mislukte uitgaande e-documenten om te verzenden";
    translation["outbound.msg.sendingongoing"] =
        "Het e-document wordt verzonden. U ontvangt een e-mail wanneer het proces is voltooid.";
    translation["outbound.configurefreecountry"] =
        "Deze account heeft geen actieve licentie voor gebruik van Electronic Invoicing in meerdere landen. Als u e-documenten massaal wilt verzenden, neemt u contact op met de accountbeheerder om 'Land e-document voor gratis gebruik' te configureren op de pagina 'Bedrijfsgegevens'.";
    translation["outbound.entitysend"] = "Verzenden naar entiteit";
    translation["outbound.certifysend"] = "Verzenden voor certificatie";
    translation["outbound.sendingtypehelp"] =
        "Kies hetzij 'Verzenden naar entiteit' of 'Verzenden voor certificatie'. Er verschijnt een overzicht van overeenkomstige transacties voor verzending.";
    translation["customer.noemail"] =
        "Er is geen e-mailadres beschikbaar voor deze klant. Voer een geldig e-mailadres in de klantrecord in om e-documenten per e-mail te kunnen verzenden.";
    translation["customer.contactnoemail"] =
        "Voor de volgende ontvangers van e-documenten is geen e-mailadres opgegeven in het contactpersoonrecord: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Voor deze klant zijn geen ontvangers van e-documenten opgegeven. Als u per e-mail elektronische documenten wilt verzenden naar deze klant, moet u minimaal één contactpersoon toevoegen aan de lijst met ontvangers van e-documenten.";
    translation["customer.arrayrequired"] =
        "Contactpersonenmatrix vereist voor validatie.";
    translation["customer.parameternotarray"] =
        "Contactpersonenparameter is geen matrix.";
    translation["customer.maxrecipientexceeded"] =
        "U hebt het maximum aantal e-mailontvangers overschreden. Selecteer maximaal 10 e-mailontvangers.";
    translation["vendor.noemail"] =
        "Er is geen e-mailadres beschikbaar voor deze leverancier. Voer een geldig e-mailadres in het leverancierrecord in om e-documenten per e-mail te kunnen verzenden.";
    translation["vendor.contactnoemail"] =
        "Voor de volgende ontvangers van e-documenten is geen e-mailadres opgegeven in het contactpersoonrecord: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Voor deze leverancier zijn geen ontvangers van e-documenten opgegeven. Als u per e-mail elektronische documenten wilt verzenden naar deze leverancier, moet u minimaal één contactpersoon toevoegen aan de lijst met ontvangers van e-documenten.";
    translation["vendor.maxrecipientexceeded"] =
        "U hebt het maximum aantal e-mailontvangers overschreden. Selecteer maximaal 10 e-mailontvangers.";
    translation["vendor.nosenders"] =
        "Voor deze leverancier is geen afzender van e-documenten opgegeven. Er moet minimaal één e-mailadres worden ingevoerd bij 'E-mailadres van afzender/leverancier van e-documenten' om e-documenten per e-mail te ontvangen van deze leverancier.";
    translation["vendor.existingsender"] =
        "Het e-mailadres van de afzender bestaat al.";
    translation["vendor.existingdomain"] =
        "Het e-maildomein van de afzender wordt al gebruikt door een andere leverancier.";
    translation["vendor.existingidentifier"] =
        "De webservice-ID wordt al gebruikt door een andere leverancier. Voer een andere webservice-ID in.";
    translation["customeremailrecipient.contextunsupported"] =
        "'E-mailadres van ontvanger/klant van e-documenten' biedt alleen ondersteuning voor de volgende contexten: UI, csv, SuiteScript en Webservices.";
    translation["vendoremailrecipient.contextunsupported"] =
        "'E-mailadres van ontvanger/leverancier van e-documenten' biedt alleen ondersteuning voor de volgende contexten: UI, csv, SuiteScript en Webservices.";
    translation["vendoremailsender.contextunsupported"] =
        "'E-mailadres van afzender/leverancier van e-documenten' biedt alleen ondersteuning voor de volgende soorten context: UI, csv, SuiteScript en Webservices.";
    translation["template.incorrectregex"] =
        "Het veld REGEX bevat een onjuiste standaardexpressie. Gebruik de juiste syntax.";
    translation["template.invalidjson"] =
        "U hebt geen juist opgemaakte JSON opgegeven in het veld 'Sjabloon voor uitgaande e-documenten'. Klik op 'OK' om door te gaan of op 'Annuleren' om op de huidige pagina te blijven.";
    translation["template.invalidxml"] =
        "De XML-sjabloon bevat fouten. De XML-indeling moet juist zijn opgemaakt.";
    translation["template.templaterequired"] =
        "De inhoud van de sjabloon ontbreekt voor het geselecteerde uitgaande transactiesoort. Geef de geldige XML- of JSON-sjablooninhoud op in het veld 'Uitgaande e-documenten' en probeer het vervolgens opnieuw.";
    translation["template.mappingrequired"] =
        "U hebt een inkomend transactiesoort geselecteerd, maar de JSON-inhoud van de veldtoewijzing ontbreekt. Geef de JSON-inhoud op in het veld 'Veldtoewijzing voor inkomende e-documenten'.";
    translation["template.templateorjsonrequired"] =
        "Er ontbreken veldwaarden. Geef voor een uitgaande transactie geldige XML- of JSON-inhoud op in het veld 'Sjabloon voor uitgaande e-documenten'. Geef voor een inkomende transactie de JSON-inhoud op in het veld 'Veldtoewijzing voor inkomende e-documenten'.";
    translation["template.invalidxsdfile"] =
        "Het geselecteerde XSD-bestand is geen geldig XSD-bestand. Selecteer een bestand met de extensie .xsd.";
    translation["template.contextunsupported"] =
        "De e-documentsjabloon biedt alleen ondersteuning voor de volgende contexten: UI en SuiteScript.";
    translation["template.supportedtranstypefldhelp"] =
        "Selecteer een of meer transactiesoorten die moeten worden ondersteund door deze sjabloon. Als u meerdere transactiesoorten wilt selecteren, houdt u de Ctrl-toets ingedrukt terwijl u de transactiesoorten selecteert.<br/><br/>Als er geen transactiesoorten kunnen worden geselecteerd, is de sjabloon al toegewezen aan een of meer transactierecords van hetzelfde transactiesoort. Als u de selectie van een transactiesoort mogelijk wilt maken, verwijdert u de sjabloon uit het transactierecord.<br/><br/>U kunt deze sjabloon ook toewijzen aan inkomende e-documenten. Als u dit doet, wordt het veld 'Transactiesoort' uitgeschakeld.";
    translation["template.eistatus"] =
        "Beperk bewerking van transacties met e-documentstatus";
    translation["template.supportedeistatusfieldhelp"] =
        "Transacties met de door u geselecteerde e-documentstatus kunnen niet worden bewerkt als deze sjabloon hieraan is gekoppeld. U kunt meerdere e-documentstatussen selecteren.";
    translation["template.invalidschemaordependency"] =
        "Schema is een onjuist gestructureerde XSD of het afhankelijke schema kan niet worden gevonden.";
    translation["template.xmldoesnotconformtoschema"] =
        "De XML van de sjabloon voldoet niet aan de meegeleverde XSD of schema.";
    translation["template.xmldomexception"] =
        "De ingevoerde XML-reeks is verkeerd ingedeeld.";
    translation["template.missingreqdargument"] =
        "De XSD voor validatie van uitgaand verkeer ontbreekt.";
    translation["template.xsdvalidationexception"] =
        "Er is een onbekende uitzondering opgetreden tijdens XSD-validatie.";
    translation["template.xsdmissingdependencyfolder"] =
        "De map 'XSD schema' is ongeldig of ontbreekt.";
    translation["invoice.generatebtn"] = "E-document genereren";
    translation["invoice.sendbtn"] = "E-document verzenden";
    translation["invoice.sendcertifybtn"] = "E-document certificeren";
    translation["invoice.eipbtn"] = "E-document verwerken";
    translation["invoice.loguntagged"] =
        "De e-documentsjabloon is verwijderd. De transactie is niet meer getagd voor het genereren van e-documenten.";
    translation["invoice.logforgenerate"] =
        "De transactie is gereed voor het genereren van e-documenten.";
    translation["invoice.invalidtemplatesub"] =
        "De dochtermaatschappij van de transactie is niet geldig voor de geselecteerde e-documentsjabloon. Selecteer een andere e-documentsjabloon.";
    translation["invoice.templateremovalerror"] =
        "Het verwijderen van de e-documentsjabloon voor verzonden e-documenten is niet toegestaan.";
    translation["ei.sending.currentlysending"] =
        "Het e-document wordt verzonden. Dit kan een paar minuten duren. Als u opnieuw op de knop 'E-document verzenden' klikt, verstoort u het verwerkingsproces. Wanneer het e-document is verzonden, wordt de pagina opnieuw geladen.";
    translation["ei.sending.notready"] =
        "Dit e-document is nog niet gereed voor verzending. Er moet eerst een e-document gegenereerd worden door te klikken op 'E-document genereren'.";
    translation["ei.sending.alreadysent"] = "Deze transactie is al verzonden.";
    translation["ei.sending.norecipients"] =
        "Het e-document kan niet worden verzonden, omdat er geen ontvangers van e-documenten zijn opgegeven voor deze klant. Als u dit e-document wilt verzenden per e-mail, moet u eerst ontvangers van e-documenten selecteren in de klantrecord.";
    translation["ei.sending.indivcustnoemail"] =
        "Het e-document kan niet worden verzonden, omdat er geen e-mailadres is opgegeven voor de klant. Als u dit e-document wilt verzenden per e-mail, moet u eerst een e-mailadres opgeven in de klantrecord.";
    translation["ei.sending.norecipients.vendor"] =
        "Het e-document kan niet worden verzonden, omdat er geen ontvangers van e-documenten zijn opgegeven voor de leverancier. Als u dit e-document per e-mail wilt verzenden, moet u eerst ontvangers van e-documenten selecteren in de leverancierrecord.";
    translation["ei.sending.indivvendnoemail"] =
        "Het e-document kan niet worden verzonden, omdat er geen e-mailadres is opgegeven voor de leverancier. Als u dit e-document wilt verzenden per e-mail, moet u eerst een e-mailadres opgeven in de leverancierrecord.";
    translation["ei.sending.invalidmethod"] =
        "Selecteer een geldige verzendmethode voor {TYPE} nr. {INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Verzender: {SENDER}\nOntvangers: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "Er is geen e-mailadres opgegeven voor de afzender van het e-document ({EMPLOYEENAME}). Geef een geldig e-mailadres op in de werknemerrecord.";
    translation["ei.sending.recipientnoemail"] =
        "Er is geen e-mailadres opgegeven voor een of meer ontvangers van het e-document voor deze transactie. Controleer of er geldige e-mailadressen zijn opgegeven voor de ontvangers van deze klant.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Er is geen e-mailadres opgegeven voor een of meer ontvangers van het e-document voor deze transactie. Controleer of er geldige e-mailadressen zijn opgegeven voor de ontvangers van deze leverancier.";
    translation["ei.sending.defaulterror"] =
        "Er is een fout opgetreden bij het verzenden van het e-document. Controleer de audittrail van het e-document op het subtabblad E-document voor meer informatie.";
    translation["ei.sending.inactivecustomer"] =
        "Het e-document voor deze transactie kan niet verzonden worden, omdat de geselecteerde klant niet actief is. Het veld 'Status van e-document' is niet bijgewerkt en er is geen audittrail gemaakt. Schakel het selectievakje 'Niet actief' in de klantrecord uit en verzend het e-document opnieuw.";
    translation["ei.sending.inactivevendor"] =
        "Het e-document voor deze transactie kan niet verzonden worden, omdat de geselecteerde leverancier niet actief is. Het veld 'Status van e-document' is niet bijgewerkt en er is geen audittrail gemaakt. Schakel het selectievakje 'Niet actief' in de leverancierrecord uit en verzend het e-document opnieuw.";
    translation["ei.sending.msg.processcomplete"] =
        "Het e-document is verzonden.";
    translation["ei.sending.configurefreecountry"] =
        "Uw account moet een actieve licentie hebben om Electronic Invoicing in meerdere landen te kunnen gebruiken. Als u e-documenten massaal wilt verzenden naar één land, selecteert u het land in het veld 'Land e-document voor gratis gebruik' op de pagina 'Bedrijfsgegevens'.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Transacties met niet-actieve klanten worden niet ondersteund door e-documenten.";
    translation["ei.sending.inactivevendor.manager"] =
        "Transacties met niet-actieve leveranciers worden niet ondersteund door e-documenten.";
    translation["ei.sending.certification.defaulterror"] =
        "Er is een fout opgetreden bij het certificeren van het e-document. Controleer de audittrail van het e-document op het subtabblad E-document voor meer informatie.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "Het e-document is verzonden voor certificatie.";
    translation["ei.generation.generationlogbulk"] =
        "Het e-document is massaal gegenereerd op basis van de e-documentsjabloon '{TEMPLATENAME}'.";
    translation["ei.generation.generationlog"] =
        "Het e-document is gegenereerd op basis van de e-documentsjabloon '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "Het e-document en PDF-bestand zijn massaal gegenereerd op basis van de e-documentsjabloon '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflog"] =
        "Het e-document en het PDF-bestand zijn gegenereerd op basis van de e-documentsjabloon '{TEMPLATENAME}'.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "Het e-document is massaal gegenereerd op basis van de e-documentsjabloon '{TEMPLATENAME}'. Het eerder gegenereerde PDF-bestand van deze transactie is verwijderd.";
    translation["ei.generation.generationremovedpdflog"] =
        "Het e-document is gegenereerd op basis van de e-documentsjabloon '{TEMPLATENAME}'. Het eerder gegenereerde PDF-bestand van deze transactie is verwijderd.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Proces voor massaal genereren\nGebruikte e-documentsjabloon: {TEMPLATENAME}\nFoutdetails: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Gebruikte e-documentsjabloon: {TEMPLATENAME}\nFoutdetails: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Er is een fout opgetreden tijdens het genereren. Controleer de audittrail van het e-document op het subtabblad E-document voor meer informatie.";
    translation["ei.generation.inactivecustomer"] =
        "Het e-document voor deze transactie kan niet gegenereerd worden, omdat de geselecteerde klant niet actief is. Het veld 'Status van e-document' is niet bijgewerkt en er is geen audittrail gemaakt. Schakel het selectievakje 'Niet actief' in de klantrecord uit en genereer het e-document opnieuw.";
    translation["ei.generation.inactivevendor"] =
        "Het e-document voor deze transactie kan niet gegenereerd worden, omdat de geselecteerde leverancier niet actief is. Het veld 'Status van e-document' is niet bijgewerkt en er is geen audittrail gemaakt. Schakel het selectievakje 'Niet actief' in de leverancierrecord uit en genereer het e-document opnieuw.";
    translation["ei.generation.msg.processcomplete"] =
        "Het e-document is gegenereerd.";
    translation["ei.generation.configurefreecountry"] =
        "Uw account moet een actieve licentie hebben om Electronic Invoicing in meerdere landen te kunnen gebruiken. Als u e-documenten massaal wilt genereren voor één land, selecteert u het land in het veld 'Land e-document voor gratis gebruik' op de pagina 'Bedrijfsgegevens'.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Transacties met niet-actieve klanten worden niet ondersteund door e-documenten.";
    translation["ei.generation.inactivevendor.generator"] =
        "Transacties met niet-actieve leveranciers worden niet ondersteund door e-documenten.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "Het e-document is gegenereerd en digitaal ondertekend.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Genereren mislukt omdat het resulterende e-document geen juist opgemaakte XML of geen juist opgemaakte JSON is.";
    translation["notify.batchownersubject"] = "E-document verzonden";
    translation["notify.batchownerbody"] =
        "Hallo, <br/><br/>Uw aanvraag om e-documenten te verzenden is voltooid.<br/>{SENT} van de {TOTAL} zijn verzonden. Zie het bijgevoegde bestand voor meer informatie. <br/><br/>Hartelijk dank,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "E-document gegenereerd voor inkooporder nr. {PONUM}";
    translation["notify.recipientcompsubj"] =
        "E-document van {COMPANYNAME} gegenereerd";
    translation["notify.recipientbody"] =
        "Hallo, <br/><br/>{MESSAGE}<br/>Zie de bijlage voor het e-documentbestand.<br/><br/>Hartelijk dank,<br/>{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Er is een fout opgetreden bij het genereren van e-documenten";
    translation["notify.generationerrorbody"] =
        "Er zijn fouten opgetreden tijdens het genereren van e-documenten.<br/>Zie het bijgevoegde bestand voor een overzicht van transacties en foutdetails.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Er is al een e-document verzonden voor deze transactie. Als er een nieuw e-document wordt gegenereerd, wordt het vorige e-document overschreven. Wilt u een nieuw e-document genereren?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Het verwijderen van de e-documentsjabloon voor verzonden e-documenten is niet toegestaan.";
    translation["transaction.msg.generate.information"] =
        "Het genereren van dit e-document is in uitvoering.";
    translation["transaction.msg.send.information"] =
        "Het verzenden van dit e-document is in uitvoering.";
    translation["transaction.msg.send.certify.information"] =
        "De certificatie van dit e-document is in uitvoering.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Het genereren van dit e-document is al in uitvoering.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Het verzenden van dit e-document is al in uitvoering.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "De certificatie van dit e-document is al in uitvoering.";
    translation["transaction.msg.uncheckpdf"] =
        "Er is een PDF-bestand van deze transactie gemaakt tijdens de laatste keer dat het e-document is gegenereerd. Als u dit selectievakje uitschakelt, wordt het PDF-bestand verwijderd tijdens de volgende keer dat het e-document wordt gegenereerd.";
    translation["transaction.msg.nofreecountry"] =
        "Deze account heeft geen actieve licentie voor gebruik van Electronic Invoicing in meerdere landen. Als u een e-document wilt genereren voor deze transactie, neemt u contact op met de accountbeheerder om een land op te geven in het veld 'Land e-document voor gratis gebruik' op de pagina 'Bedrijfsgegevens'.";
    translation["transaction.msg.otherbillingcountry"] =
        "Deze account heeft geen actieve licentie voor gebruik van Electronic Invoicing in meerdere landen. Als u een e-document wilt genereren voor deze transactie, neemt u contact op met de NetSuite accountbeheerder om een licentie aan te schaffen.";
    translation["transaction.msg.nobillingcountry"] =
        "Deze account heeft geen actieve licentie voor gebruik van Electronic Invoicing in meerdere landen. Als u een e-document wilt genereren voor deze transactie, dan geeft u het factuuradres op voor deze transactie.";
    translation["transaction.msg.noshippingcountry"] =
        "Deze account heeft geen actieve licentie voor gebruik van Electronic Invoicing in meerdere landen. Als u een e-document wilt genereren voor deze transactie, dan geeft u het verzendadres op voor deze transactie.";
    translation["transaction.msg.nocustomercountry"] =
        "Deze account heeft geen actieve licentie voor gebruik van Electronic Invoicing in meerdere landen. Als u een e-document wilt genereren voor deze transactie, geeft u een standaardfactuuradres op voor de klant van deze transactie.";
    translation["transaction.msg.blockededittransaction"] =
        "Het bewerken van de transactie is geblokkeerd voor de huidige e-documentstatus. Stuur de bijgevoegde EF-sjabloon door.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Als de waarde in het veld Inhoudstype wordt gewijzigd van XML in een ander type, worden alle XML-validaties verwijderd. Wilt u het inhoudstype wijzigen?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Er kunnen alleen validaties voor het inhoudstype XML worden toegevoegd.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "De validatie staat al in de lijst.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Validatie van e-documentsjabloon biedt alleen ondersteuning voor de volgende contexten: UI en SuiteScript.";
    translation["standarddocument.default.alreadyexist"] =
        "De record {DEFAULT_DOCUMENT_STANDARD} bestaat al. U kunt geen documentpakketrecords met dezelfde naam maken. Geef een nieuwe naam op voor de documentpakketrecord en probeer het opnieuw.";
    translation["standarddocument.default.editnotallowed"] =
        "Het bewerken van de naam of omschrijving van de record {DEFAULT_DOCUMENT_STANDARD} is niet toegestaan.";
    translation["standarddocument.default.deletenotallowed"] =
        "Het verwijderen van de record {DEFAULT_DOCUMENT_STANDARD} is niet toegestaan.";
    translation["standarddocument.contextunsupported"] =
        "Het e-documentpakket biedt alleen ondersteuning voor de volgende contexten: UI, csv-import en SuiteScript.";
    translation["sendingmethod.default.alreadyexist"] =
        "De verzendmethoderecord {DEFAULT_SENDING_METHOD_NAME} bestaat al. U kunt geen verzendmethoderecords met dezelfde naam aanmaken. Geef een nieuwe naam op voor de verzendmethoderecord en probeer het opnieuw.";
    translation["sendingmethod.default.editnotallowed"] =
        "Het bewerken van de verzendmethoderecord {DEFAULT_SENDING_METHOD_NAME} is niet toegestaan.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Het verwijderen van de verzendmethoderecord {DEFAULT_SENDING_METHOD_NAME} is niet toegestaan.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Het veld Transactietype is uitgeschakeld omdat deze verzendmethode is toegewezen aan een of meer transactierecords. Als u deze verzendmethode wilt bewerken, moet u de verzendmethode verwijderen uit de transactierecord om het veld Transactietype in te schakelen. Probeer het vervolgens opnieuw.";
    translation["sendingmethod.contextunsupported"] =
        "Verzendmethode voor e-documenten biedt alleen ondersteuning voor de volgende contexten: UI en SuiteScript.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Selecteer een of meer transactiesoorten die moeten worden ondersteund door deze verzendmethode. Als u meerdere transactiesoorten wilt selecteren, houdt u de Ctrl-toets ingedrukt en selecteert u de transactiesoorten.<br/><br/>Als een transactiesoort niet kan worden geselecteerd, is de verzendmethode al toegewezen aan een of meer transactierecords van het betreffende transactiesoort. Als u dat transactiesoort wilt selecteren, moet u de verzendmethode eerst verwijderen uit het transactierecord.";
    translation["sendingmethod.pluginimplementation"] =
        "Plug-in-implementatie voor verzendmethode e-documenten";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Selecteer een plug-in-implementatie voor verzendmethode";
    translation["sendingmethod.scriptbannermessage"] =
        "Scripts voor verzendmethoden moeten aangepaste plug-in- implementaties zijn. Maak van bestaande scripts voor verzendmethoden nieuwe aangepaste plug-in-implementaties van het type 'Plug-in voor verzending'.";
    translation["customdatasource.pluginimplementation"] =
        "Plug-in-implementatie voor aangepaste gegevensbronnen";
    translation["customdatasource.pluginimplementationhelp"] =
        "Selecteer de plug-in-implementatie voor aangepaste gegevensbronnen";
    translation["digitalsignature.pluginimplementation"] =
        "Plug-in-implementatie voor digitale handtekening";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Selecteer een plug-in-implementatie. Dit veld is vereist als u e-documenten digitaal wilt ondertekenen.";
    translation["digitalsignature.identifierlabel"] =
        "Dit e-document is digitaal ondertekend";
    translation["digitalsignature.successlog"] =
        "Het gegenereerde e-document is digitaal ondertekend.";
    translation["digitalsignature.failurelog"] =
        "Het gegenereerde e-document is niet digitaal ondertekend.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Plug-in-implementatie voor digitale handtekening heeft een foutstatus geretourneerd.";
    translation["digitalsignature.plugininvalidresult"] =
        "Het geretourneerde resultaat van de plug-in-implementatie voor digitale handtekening is niet geldig.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Implementatie invoegtoepassing inkomende aangepaste gegevensbron";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Selecteer een implementatie invoegtoepassing inkomende aangepaste gegevensbron.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "De implementatie van de invoegapplicatie inkomende aangepaste gegevensbron is ongeldig.";
    translation["outboundvalidation.pluginimplementation"] =
        "Implementatie invoegtoepassing uitgaande validatie";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Selecteer een implementatie voor de invoegapplicatie voor validatie van uitgaande e-documenten. Hiermee worden uitgaande e-documenten gevalideerd.";
    translation["outboundvalidation.successlog"] = "Uitgaande validatie gelukt";
    translation["outboundvalidation.failurelog"] =
        "Uitgaande validatie mislukt";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Implementatie invoegtoepassing uitgaande validatie heeft een fout geretourneerd.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Het resultaat van de implementatie invoegtoepassing uitgaande validatie is ongeldig.";
    translation["template.msg.cannotedittransactiontype"] =
        "Het veld Transactietype is uitgeschakeld omdat deze sjabloon al is toegewezen aan een of meer transactierecords. Als u deze sjabloon wilt bewerken, moet u de sjabloon verwijderen uit de transactierecord om het veld Transactietype in te schakelen. Probeer het vervolgens opnieuw. U kunt deze sjabloon ook toewijzen aan inkomende e-documenten. Als u dit doet, wordt het veld Transactietype uitgeschakeld.";
    translation["template.msg.forcetocopymessage"] =
        "U kunt het standaard-e-documentsjabloon niet bewerken. U kunt het sjabloon kopiëren met de optie 'Kopie maken' in 'Acties' of u kunt een nieuw sjabloon maken.";
    translation["template.msg.warningoneditmessage"] =
        "Dit is een standaard-e-documentsjabloon. Alle wijzigingen in dit sjabloon gaan verloren of worden overschreven wanneer de SuiteApp wordt bijgewerkt.";
    translation["email.batchownernotification.subject"] =
        "E-document verzonden";
    translation["email.batchownernotification.body"] =
        "Hallo, <br/><br/>Uw e-documenten zijn verzonden.<br/>{SENT} van de {TOTAL} zijn verzonden. Zie het bijgevoegde bestand voor meer informatie. <br/><br/>Hartelijk dank,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "E-documentconversie voltooid";
    translation["email.batchownerconvertnotification.body"] =
        "Hallo, <br/><br/>Uw e-documenten zijn geconverteerd.<br/>{CONVERTED} van de {TOTAL} zijn geconverteerd. Zie het bijgevoegde bestand voor meer informatie. <br/><br/>Hartelijk dank,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "E-document gegenereerd voor inkooporder nr. {PONUM}";
    translation["email.recipientnotification.subject"] =
        "E-document van {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "E-document gegenereerd voor {TRANTYPE} nummer {TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Hallo, <br/><br/>Het e-document voor inkoopordernummer {PONUM} is gegenereerd.<br/>Zie het bijgevoegde e-documentbestand voor meer informatie.<br/><br/>Hartelijk dank,<br/>{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Hallo, <br/><br/>Het e-document voor {TYPE} nummer {TRANID} is gegenereerd.<br/>Zie het bijgevoegde e-documentbestand voor meer informatie.<br/><br/>Hartelijk dank,<br/>{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Er is een fout opgetreden bij het genereren van e-documenten";
    translation["email.generationerrornotification.body"] =
        "Er zijn fouten opgetreden tijdens het genereren van e-documenten.<br/>Zie het bijgevoegde bestand voor een overzicht van transacties en foutdetails.";
    translation["email.sendingerrornotification.subject"] =
        "Er is een fout opgetreden bij het verzenden van e-documenten";
    translation["email.sendingerrornotification.body"] =
        "Er zijn fouten opgetreden tijdens het verzenden van e-documenten.<br/>Zie het bijgevoegde bestand voor een overzicht van transacties en foutdetails.";
    translation["email.webserviceerror.subject"] =
        "Melding van de webservice voor inkomende e-documenten";
    translation["email.webserviceerror.body"] =
        "<p>Hallo,</p><p>Er zijn fouten opgetreden bij de verwerking van het inkomende e-document met de webservice.<br/>Zie de volgende informatie.</p>{DETAIL_TABLE}<p>Hartelijk dank,<br/>NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Transactienummer";

    return translation;
});
