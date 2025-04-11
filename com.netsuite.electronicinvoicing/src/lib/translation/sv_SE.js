define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Detaljer";
    translation["email.attachment.collabel.transactiontype"] =
        "Transaktionstyp";
    translation["email.attachment.collabel.internalid"] = "Internt id";
    translation["email.attachment.collabel.vendor"] = "Leverantör";
    translation["email.conversionerrornotification.subject"] =
        "Ett fel inträffade vid konvertering av inkommande e-dokument";
    translation["email.conversionerrornotification.body"] =
        "Fel inträffade när inkommande e-dokument skulle konverteras.<br/>Se bifogad fil för listan över poster med fel och detaljer.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Obs! Om du vill att en annan användare ska ta emot meddelandena istället för dina kontoadministratörer ska du ange användarens e-postadress i fältet Mottagare av e-dokumentmeddelanden i posten för det överordnade dotterbolaget.";
    translation["email.table.collabel.inboundedocumentid"] =
        "Id för inkommande e-dokument";
    translation["email.table.collabel.details"] = "Detaljer";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Ett fel påträffades vid licenskontroll av kontot.";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Kontot saknar aktiv licens för användning av elektronisk fakturering i flera länder. </br>För massbearbetning av e-dokument konfigurerar du funktionen E-dokument - land för gratis användning på företagets informationssida.";
    translation["inboundedocument.logforconversion"] =
        "Det inkommande e-dokumentet är klart för konvertering.";
    translation["inboundedocument.logincomplete"] =
        "Det inkommande e-dokumentet är ofullständigt. Inget {FIELD} valdes.";
    translation["inboundedocument.deletenotallowed"] =
        "Du får inte ta bort ett inkommande e-dokument.";
    translation["inboundedocument.copynotallowed"] =
        "Du får inte kopiera ett inkommande e-dokument.";
    translation["inboundedocument.contextunsupported"] =
        "Inkommande e-dokument stöder endast kontexterna UI och SuiteScript.";
    translation["inboundedocument.invalidxmlfile"] =
        "Den valda XML-filreferensen är inte en giltig XML-fil. Kontrollera att filen du väljer har tillägget .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "Den valda PDF-filreferensen är inte en giltig PDF-fil. Kontrollera att filen du väljer har tillägget .pdf.";
    translation["inboundedocument.invalidxml"] =
        "Den valda XML-filreferensen är inte ett korrekt formaterat XML-dokument.";
    translation["inboundedocument.convert.button"] = "Konvertera";
    translation["inboundedocument.convert.information"] =
        "Konvertering av det här inkommande e-dokumentet pågår.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Konvertering av det här inkommande e-dokumentet pågår redan.";
    translation["inboundedocument.cancel.button"] = "Annullera e-dokument";
    translation["inboundedocument.cancel.confirmation"] =
        "Vill du verkligen annullera det inkommande e-dokumentet?";
    translation["inboundedocument.cancel.failed"] =
        "Annulleringen misslyckades eftersom statusen på den inkommande e-dokumentposten är {STATUS}";
    translation["inboundedocument.cancel.defaulterror"] =
        "Ett fel inträffade vid annullering. Kontrollera e-dokumentets historik på underfliken E-dokument för detaljer.";
    translation["inboundedocument.cancel.complete"] =
        "E-dokumentet har annullerats.";
    translation["inboundedocument.preview.button"] = "Visa XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "Kontot saknar aktiv licens för användning av Electronic Invoicing SuiteApp i flera länder. För att konvertera e-dokumentet till en transaktion måste din kontoadministratör specificera ett land i funktionen E-dokument - land för gratis användning på företagets informationssida.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Kontot saknar aktiv licens för användning av Electronic Invoicing SuiteApp i flera länder. För att konvertera ett e-dokument till en transaktion, kontakta din NetSuite-kontorepresentant för att köpa en licens.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Kontot saknar aktiv licens för användning av Electronic Invoicing SuiteApp i flera länder. Om du vill konvertera e-dokumentet till en transaktion, ställer du in den valda leverantörens standardfaktureringsadress.";
    translation["validationplugin.contextunsupported"] =
        "Insticksprogram för validering av inkommande e-dokument stöder endast kontexterna UI och SuiteScript.";
    translation["validationplugin.pluginimplementation"] =
        "Implementering av insticksprogram för validering av inkommande e-dokument";
    translation["validationplugin.pluginimplementationhelp"] =
        "Välj en implementering av insticksprogram för validering av inkommande e-dokument.";
    translation["validationplugin.scriptbannermessage"] =
        "Validering av inkommande e-dokument ska vara implementeringar av anpassade insticksprogram. Återskapa befintliga valideringsskript som implementeringar av nya anpassade insticksprogram av typen Insticksprogram för validering av inkommande.";
    translation["ei.conversion.defaulterror"] =
        "Ett fel inträffade under konverteringen. Kontrollera e-dokumentets historik på underfliken E-dokument för detaljer.";
    translation["ei.conversion.inactivevendor"] =
        "Det inkommande e-dokumentet kan inte konverteras eftersom den valda leverantören är inaktiv. Fältet E-dokumentstatus har inte uppdaterats och ingen historik har skapats. Avmarkera kryssrutan Inaktiv i leverantörsposten och försök sedan konvertera e-dokumentet igen.";
    translation["ei.conversion.inactivecustomer"] =
        "Det inkommande e-dokumentet kan inte konverteras eftersom den valda kunden är inaktiv. Fältet E-dokumentstatus har inte uppdaterats och ingen historik har skapats. Avmarkera kryssrutan Inaktiv i kundposten och försök sedan konvertera e-dokumentet igen.";
    translation["ei.conversion.conversioncomplete"] =
        "E-dokumentet har konverterats.";
    translation["ei.conversion.conversionlogbulk"] =
        "Det inkommande e-dokumentet ingick i masskonverteringen och konverterades till transaktionen med internt id: {INTERNALID} av typ: {TYPE}.";
    translation["ei.conversion.conversionlog"] =
        "Det inkommande e-dokumentet konverterades till transaktionen med internt id: {INTERNALID} av typ: {TYPE}";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Masskonverteringsprocess\nAnvänd e-dokumentmall: {TEMPLATENAME}\nFelomfattning: {ERRORSCOPE}\nFeldetaljer: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Använd e-dokumentmall: {TEMPLATENAME}\nFelomfattning: {ERRORSCOPE}\nFeldetaljer: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Parsningsfel. Kontrollera fältmappningen för inkommande e-dokument.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Konverteringsfel.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Valideringsfel.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Konverteringen misslyckades eftersom statusen på den inkommande e-dokumentposten är {STATUS}";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Inkommande e-dokument med inaktiva kunder stöds inte för konvertering.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Inkommande e-dokument med inaktiva leverantörer stöds inte för konvertering.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Följande leverantörskoder: {ITEMLIST}, är inte associerade med någon artikelpost.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Följande leverantörsnamn/-koder: {ITEMLIST}, är inte associerade med någon artikelpost.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Följande leverantörskoder: {ITEMLIST}, är associerade med flera artikelposter. Ändra artikelposterna och se till att leverantörskoderna är unika för varje artikel per leverantör.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Följande leverantörsnamn/-koder: {ITEMLIST}, är associerade med flera artikelposter. Ändra artikelposterna och se till att leverantörsnamnen/-koderna är unika för varje artikel per leverantör.";
    translation["ei.conversion.refnumnotfound"] =
        "Det obligatoriska referensnumret saknas i det inkommande e-dokumentet. Annullera detta e-dokument och skicka ett annat e-dokument som innehåller ett XML-element för referensnumret, mappat till tranid-fältet.";
    translation["ei.conversion.refnumexists"] =
        "En leverantörsfaktura med samma referensnummer finns redan. Annullera detta e-dokument och skicka ett annat e-dokument med rätt referensnummer för det XML-element som är mappat till tranid-fältet.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Fältet vendorcode saknas i e-dokumentmallen. Ändra e-dokumentmallen eller välj en annan mall som innehåller mappning av vendorcode-fältet.";
    translation["ei.conversion.novendorcodevalue"] =
        "Minst en av artiklarna saknar leverantörskod. Annullera detta e-dokument och skicka ett annat e-dokument med rätt värde för det XML-element som är mappat till fältet för leverantörskod.";
    translation["ei.conversion.vendornamenotfound"] =
        "Fältet vendorname saknas i e-dokumentmallen. Ändra e-dokumentmallen eller välj en annan mall som innehåller mappning av vendorname-fältet.";
    translation["ei.conversion.novendornamevalue"] =
        "Minst en av artiklarna saknar leverantörsnamn/-kod. Annullera detta e-dokument och skicka ett annat e-dokument med rätt värde för det XML-element som är mappat till fältet för leverantörsnamn/-kod.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Posten ({TRANSTYPE} med nr {TRANSID}) hittades inte i systemet. Annullera e-dokumentet och skicka ett annat e-dokument med rätt värde för det XML-element som är mappat till createdfrom-fältet.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Posten ({TRANSTYPE} med nr {TRANSID}) är tilldelad en annan enhet. Välj rätt enhet och konvertera detta e-dokument.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Leverantören har inget standardomkostnadskonto, vilket krävs för att konvertera leverantörsfakturor med utgifter. För att fortsätta med konverteringen anger du ett värde i fältet Standardomkostnadskonto i leverantörsposten.";
    translation["ei.conversion.nolinktopo"] =
        "Det inkommande e-dokumentet har ingen artikel eller kostnad som ingår i den refererade inköpsordern. Kontrollera statusen på den refererade inköpsordern om den kan konverteras. Om den kan konverteras ska du annullera e-dokumentet och skicka ett annat e-dokument med rätt värde för det XML-element som är mappat till createdfrom-fältet.";
    translation["inbound.formtitle"] = "Konvertera inkommande e-dokument";
    translation["inbound.search"] = "Sök";
    translation["inbound.convert"] = "Konvertera";
    translation["inbound.return"] = "Tillbaka till kriterier";
    translation["inbound.vendor"] = "Leverantör";
    translation["inbound.datefrom"] = "Skapad den, från";
    translation["inbound.dateto"] = "Skapad den, till";
    translation["inbound.vendorhelp"] =
        "Välj den leverantör vars felaktiga inkommande e-dokument ska ingå i sökresultatet.";
    translation["inbound.datefromhelp"] =
        "Välj ett startdatum för att definiera en period inom vilken felaktigt skapade inkommande e-dokument kommer att inkluderas i sökresultatet.";
    translation["inbound.datetohelp"] =
        "Välj ett slutdatum för att definiera en period inom vilken felaktigt skapade inkommande e-dokument kommer att inkluderas i sökresultatet.";
    translation["inbound.inboundedocfieldgroup"] =
        "Sökfilter för felaktigt inkommande e-dokument";
    translation["inbound.sublist.sublistname"] =
        "Resultat av sökning efter felaktigt inkommande e-dokument";
    translation["inbound.sublist.internalid"] = "Internt id";
    translation["inbound.sublist.vendor"] = "Leverantör";
    translation["inbound.sublist.refnum"] = "Referensnummer";
    translation["inbound.sublist.ponum"] = "Ordernr";
    translation["inbound.sublist.datecreated"] = "Skapad den";
    translation["inbound.sublist.edoctemplate"] = "E-dokumentmall";
    translation["inbound.msg.conversionongoing"] =
        "E-dokumentet konverteras. Du kommer att få ett e-postmeddelande när processen är slutförd.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Du kan inte utföra sökningen med de valda kriterierna eftersom konverteringen av det inkommande e-dokumentet redan pågår för datumintervallet ({DATECREATED_FROM} - {DATECREATED_TO}). Du måste ändra dina sökkriterier eller försöka igen när e-dokumentet har konverterats.";
    translation["inbound.invaliddates"] =
        "Från-datum får inte infalla efter till-datum. Ändra datumen så att från-datumet infaller före till-datumet.";
    translation["inbound.configurefreecountry"] =
        "Kontot saknar aktiv licens för användning av Electronic Invoicing SuiteApp i flera länder. För masskonvertering av e-dokument ska du kontakta din kontoadministratör för att konfigurera funktionen E-dokument - land för gratis användning på företagets informationssida.";
    translation["portlet.title"] = "Elektroniska dokument";
    translation["portlet.outboundforgeneration"] =
        "Utgående e-dokument för generering";
    translation["portlet.outboundforsending"] =
        "Utgående e-dokument för sändning";
    translation["portlet.outboundwitherrors"] = "Utgående e-dokument med fel";
    translation["portlet.outboundsendinglink"] =
        "Skicka misslyckade utgående e-dokument";
    translation["portlet.inboundforconversion"] =
        "Inkommande e-dokument för konvertering";
    translation["portlet.inboundconvertfailed"] =
        "Inkommande e-dokument med misslyckad konvertering";
    translation["portlet.inboundincomplete"] =
        "Ofullständiga inkommande e-dokument";
    translation["portlet.inbounduploadlink"] =
        "Ladda upp inkommande e-dokument";
    translation["portlet.outboundforcertification"] =
        "Utgående e-dokument för certifiering";
    translation["portlet.outboundcertifiedforsending"] =
        "Utgående e-dokument för sändning";
    translation["inbound.webservice.response.success"] =
        "Det inkommande e-dokumentet med id: {ID} har skapats.";
    translation["inbound.webservice.response.novendor"] =
        "Ingen leverantör är associerad med detta webbtjänst-id: {IDENTIFIER}. Se till att rätt webbtjänst-id används.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Det inkommande e-dokumentet med id: {ID} har skapats. Dock har flera leverantörer associerats med webbtjänst-id: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Det inkommande e-dokumentet är ofullständigt eftersom rätt mall inte kan identifieras. Välj antingen en mall i inkommande e-dokumentpost eller ställ in XSD i e-dokumentmallposten till att aktivera autoval av mall.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Det inkommande e-dokumentet är ofullständigt eftersom rätt leverantör inte kan identifieras. Välj en leverantör i den inkommande e-dokumentposten eller ställ in webbtjänst-id i den associerade leverantörsposten.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Följande nycklar saknas: {KEYS}. Du måste tillhandahålla dessa i din webbtjänstbegäran.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Textdelen i din webbtjänstbegäran måste vara ett JSON-objekt eller en uppställning av JSON-objekt med innehållstypen: 'application/json'.";
    translation["transaction.contactnoemail"] =
        "Följande e-dokumentmottagare saknar e-postadress i sina kontaktuppgifter: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Det finns inga e-dokumentmottagare för den här transaktionen. För att skicka e-dokument via e-post måste minst en kontakt läggas till i listan över e-dokumentmottagare.";
    translation["transaction.maxrecipientexceeded"] =
        "Antalet e-postmottagare du har lagt till överskrider gränsen. Du kan lägga till högst 10 e-postmottagare.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Endast följande transaktionstyper bearbetas:";
    translation["ei.prefs.formtitle"] = "Preferenser för e-dokument";
    translation["ei.prefs.information.about.certify.skip"] =
        "Certifieringssteget hoppas över om sändningsmetoden för certifiering inte har definierats för eller inte är tillämpligt för transaktionen.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Automatisk elektronisk fakturering";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Automatiseringstyp för e-dokument";
    translation["ei.prefs.text.option.comb.disabled"] = "Avaktivera";
    translation["ei.prefs.text.option.comb.gcs"] =
        "Generera, certifiera, skicka";
    translation["ei.prefs.text.option.comb.gc"] = "Generera, certifiera";
    translation["ei.prefs.text.option.comb.cs"] = "Certifiera, skicka";
    translation["ei.prefs.btn.label.cancel"] = "Avbryt";
    translation["ei.prefs.btn.label.save"] = "Spara";
    translation["ei.prefs.msg.confirm.save"] =
        "Vill du spara ändringarna av preferenserna för e-dokument?";
    translation["ei.prefs.msg.success.save"] =
        "Preferenserna för e-dokument har sparats.";
    translation["ei.prefs.msg.failed.save"] =
        "Preferenserna för e-dokument sparades inte.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Åtkomstbehörighet för den här sidan är begränsad. Kontakta administratören för att begära åtkomst.";
    translation["ei.eip.msg.completed"] =
        "Bearbetning av e-dokument har slutförts.";
    translation["ei.eip.msg.failed"] =
        "E-dokumentet bearbetades inte. Mer information finns i historiken över e-dokument.";
    translation["ei.eip.msg.processing"] = "E-dokumentet bearbetas.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "E-dokumentet bearbetas redan.";
    translation["license.notinstalled"] =
        "NetSuite SuiteApps License Client är inte tillgänglig i ditt konto. Installera denna SuiteApp för åtkomst till alla funktioner för elektronisk fakturering.";
    translation["outbound.formtitle"] = "Skicka misslyckade e-dokument";
    translation["outbound.search"] = "Sök";
    translation["outbound.send"] = "Skicka";
    translation["outbound.return"] = "Tillbaka till kriterier";
    translation["outbound.customer"] = "Kund";
    translation["outbound.vendor"] = "Leverantör";
    translation["outbound.subsidiary"] = "Dotterbolag";
    translation["outbound.type"] = "Transaktionstyp";
    translation["outbound.datefrom"] = "Från transaktionsdatum";
    translation["outbound.dateto"] = "Till transaktionsdatum";
    translation["outbound.subshelp"] =
        "Välj ett dotterbolag för att bara visa de transaktioner som tillhör dotterbolaget.";
    translation["outbound.custhelp"] =
        "Välj en kund för att visa endast de transaktioner som tillhör den kunden. Om ingen kund väljs kommer sökresultaten att visa alla transaktioner som tillhör dotterbolaget, oavsett kund.";
    translation["outbound.vendorhelp"] =
        "Välj en leverantör för att visa endast de transaktioner som tillhör den leverantören. Om ingen leverantör väljs kommer sökresultaten att visa alla transaktioner som tillhör dotterbolaget, oavsett leverantör.";
    translation["outbound.entitytypehelp"] =
        "Välj antingen enhetstypen Kund eller Leverantör. Detta aktiverar motsvarande listruta nedan.";
    translation["outbound.typehelp"] =
        "Välj en eller flera transaktionstyper för varje e-dokument du vill skicka. Om du vill välja flera transaktionstyper håller du ned Ctrl-tangenten medan du väljer varje transaktionstyp.<br /><br />Om du inte väljer någon transaktionstyp kommer sökresultaten visa alla e-dokument som är klara att skickas, oavsett transaktionstyp.";
    translation["outbound.datefromhelp"] =
        "Om du vill se en lista över de transaktioner som skapades inom ett specifikt datumintervall väljer du ett datum i början av datumintervallet.";
    translation["outbound.datetohelp"] =
        "Om du vill se en lista över de transaktioner som skapades inom ett specifikt datumintervall väljer du ett datum i slutet av datumintervallet.";
    translation["outbound.entityfieldgroup"] = "Sökfilter för enhet";
    translation["outbound.filtersfieldgroup"] = "Sökfilter för transaktion";
    translation["outbound.entitytypeinlinehelp"] = "Välj enhetstyp:";
    translation["outbound.invalidtypetitle"] = "Ogiltiga transaktionstyper";
    translation["outbound.invalidtype"] =
        "Följande transaktionstyper stöds inte för närvarande: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Följande transaktionstyper är inte giltiga för den valda enheten: {TRANSACTIONTYPES}. Välj lämpliga transaktionstyper för den enhet du har valt.";
    translation["outbound.invaliddates"] =
        "Transaktionens från-datum måste infalla före eller på transaktionens till-datum. Ändra datumen så att transaktionens från-datum infaller före transaktionens till-datum.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Du kan inte utföra sökningen med de valda kriterierna eftersom e-dokumentsändningen redan pågår för transaktioner inom datumintervallet ({TRANDATE_FROM} - {TRANDATE_TO}) för dotterbolaget ({SUBSIDIARY}). Du måste ändra sökkriterierna eller försöka igen när e-dokumentet har skickats.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Du kan inte utföra sökningen med de valda kriterierna eftersom e-dokumentsändningen redan pågår för transaktioner inom datumintervallet ({TRANDATE_FROM} - {TRANDATE_TO}). Du måste ändra sökkriterierna eller försöka igen när e-dokumentet har skickats.";
    translation["outbound.sublist.trannum"] = "Transaktionsnummer";
    translation["outbound.sublist.trantype"] = "Transaktionstyp";
    translation["outbound.sublist.customer"] = "Kund";
    translation["outbound.sublist.vendor"] = "Leverantör";
    translation["outbound.sublist.subsidiary"] = "Dotterbolag";
    translation["outbound.sublist.trandate"] = "Transaktionsdatum";
    translation["outbound.sublist.memo"] = "Anteckning";
    translation["outbound.sublist.template"] = "Mall";
    translation["outbound.sublist.sendingmethod"] = "Sändningsmetod";
    translation["outbound.sublist.sublistname"] =
        "Resultat av felaktiga utgående e-dokument som ska skickas";
    translation["outbound.msg.sendingongoing"] =
        "E-dokumentet skickas. Du kommer att få ett e-postmeddelande när processen är slutförd.";
    translation["outbound.configurefreecountry"] =
        "Kontot saknar aktiv licens för användning av elektronisk fakturering i flera länder. För massutskick av e-dokument måste din kontoadministratör konfigurera funktionen E-dokument - land för gratis användning på företagets informationssida.";
    translation["outbound.entitysend"] = "Skicka till enhet";
    translation["outbound.certifysend"] = "Skicka för certifiering";
    translation["outbound.sendingtypehelp"] =
        "Välj antingen Skicka till enhet eller Skicka för certifiering. Motsvarande transaktioner för sändning listas.";
    translation["customer.noemail"] =
        "Det finns ingen e-postadress för den här kunden. Ange en giltig e-postadress i kundposten för att möjliggöra sändning av e-dokument via e-post.";
    translation["customer.contactnoemail"] =
        "Följande e-dokumentmottagare saknar e-postadress i sina kontaktuppgifter: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Det finns inga e-dokumentmottagare för den här kunden. För att skicka elektroniska dokument via e-post till den här kunden måste minst en kontakt läggas till i listan över e-dokumentmottagare.";
    translation["customer.arrayrequired"] =
        "En uppställning av kontaktpersoner krävs för validering.";
    translation["customer.parameternotarray"] =
        "Parametern kontaktpersoner är inte en uppställning.";
    translation["customer.maxrecipientexceeded"] =
        "Du har överskridit det högsta antalet e-postmottagare. Välj högst 10 e-postmottagare.";
    translation["vendor.noemail"] =
        "Det finns ingen e-postadress för den här leverantören. Ange en giltig e-postadress i leverantörsposten för att möjliggöra sändning av e-dokument via e-post.";
    translation["vendor.contactnoemail"] =
        "Följande e-dokumentmottagare saknar e-postadress i sina kontaktuppgifter: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Det finns inga e-dokumentmottagare för den här leverantören. För att skicka elektroniska dokument via e-post till den här leverantören måste minst en kontakt läggas till i listan över e-dokumentmottagare.";
    translation["vendor.maxrecipientexceeded"] =
        "Du har överskridit det högsta antalet e-postmottagare. Välj högst 10 e-postmottagare.";
    translation["vendor.nosenders"] =
        "Det finns ingen e-postavsändare av e-dokument för denna leverantör. För att ta emot e-dokument via e-post från den här leverantören, måste du ange minst en e-postadress i listan E-postavsändare av e-dokument från leverantör.";
    translation["vendor.existingsender"] =
        "Avsändarens e-postadress finns redan.";
    translation["vendor.existingdomain"] =
        "E-postdomänen för avsändaren används redan av en annan leverantör.";
    translation["vendor.existingidentifier"] =
        "Detta webbtjänst-id används redan av en annan leverantör. Ange ett annat webbtjänst-id.";
    translation["customeremailrecipient.contextunsupported"] =
        "E-postmottagare av e-dokument för kund stöder endast följande kontexter: UI, csv, SuiteScript och webbtjänster.";
    translation["vendoremailrecipient.contextunsupported"] =
        "E-postmottagare av e-dokument för leverantör stöder endast följande kontexter: UI, csv, SuiteScript och webbtjänster.";
    translation["vendoremailsender.contextunsupported"] =
        "E-postavsändare av e-dokument för leverantör stöder endast följande kontexter: UI, csv, SuiteScript och webbtjänster.";
    translation["template.incorrectregex"] =
        "REGEX-fältet innehåller ett felaktigt reguljärt uttryck. Korrekt syntax måste användas.";
    translation["template.invalidjson"] =
        "Du har angett JSON med fel format i fältet Mall för utgående e-dokument. Klicka på OK för att fortsätta eller på Avbryt för att stanna på den aktuella sidan.";
    translation["template.invalidxml"] =
        "XML-mallen innehåller fel. XML-formatet måste vara korrekt formaterat.";
    translation["template.templaterequired"] =
        "Mallinnehåll saknas för den valda utgående transaktionstypen. Ange giltigt XML- eller JSON-mallinnehåll i fältet Utgående e-dokument och försök sedan igen.";
    translation["template.mappingrequired"] =
        "Du har valt en inkommande transaktionstyp, men JSON-innehållet i fältmappningen saknas. Ange JSON-innehållet i fältet Fältmappning för inkommande e-dokument.";
    translation["template.templateorjsonrequired"] =
        "Fältvärden saknas. Ange giltigt XML- eller JSON-innehåll i fältet Mall för utgående e-dokument för en utgående transaktion. Ange JSON-innehåll i fältet Fältmappning för inkommande e-dokument för en inkommande transaktion.";
    translation["template.invalidxsdfile"] =
        "Den valda XSD-filen är inte en giltig XSD-fil. Kontrollera att filen du väljer har tillägget .xsd.";
    translation["template.contextunsupported"] =
        "E-dokumentmallen stöder endast kontexterna UI och SuiteScript.";
    translation["template.supportedtranstypefldhelp"] =
        "Välj en eller flera transaktionstyper som ska stödjas av mallen. För att välja flera transaktionstyper, tryck och håll ned Ctrl-tangenten när du väljer transaktionstyperna.<br /><br />Om transaktionstyper inte kan väljas betyder det att mallen redan är tilldelad till en eller flera transaktionsposter av samma transaktionstyp. För att aktivera val av transaktionstyp ska du ta bort mallen från transaktionsposten.<br /><br />Du kan även tilldela den här mallen till inkommande e-dokument vilket därmed avaktiverar fältet Transaktionstyp.";
    translation["template.eistatus"] =
        "Begränsa redigering av transaktioner med e-dokumentstatus";
    translation["template.supportedeistatusfieldhelp"] =
        "Transaktioner med den e-dokumentstatus som du valde kommer inte att kunna redigeras när denna mall associeras med dem. Du kan välja flera e-dokumentstatusvärden.";
    translation["template.invalidschemaordependency"] =
        "Schemat är en felaktigt strukturerad XSD eller så kan det beroende schemat inte hittas.";
    translation["template.xmldoesnotconformtoschema"] =
        "Mallens XML överensstämmer inte med angiven XSD eller angivet schema.";
    translation["template.xmldomexception"] =
        "XML-strängen för inmatning är felaktigt utformad.";
    translation["template.missingreqdargument"] =
        "XSD för utgående validering saknas.";
    translation["template.xsdvalidationexception"] =
        "Okänd avvikelse inträffade under XSD-validering.";
    translation["template.xsdmissingdependencyfolder"] =
        "Mappen för XSD-schema är ogiltig eller saknas.";
    translation["invoice.generatebtn"] = "Generera e-dokument";
    translation["invoice.sendbtn"] = "Skicka e-dokument";
    translation["invoice.sendcertifybtn"] = "Certifiera e-dokument";
    translation["invoice.eipbtn"] = "Bearbeta e-dokument";
    translation["invoice.loguntagged"] =
        "E-dokumentmallen har tagits bort. Transaktionen är inte markerad för generering av e-dokument.";
    translation["invoice.logforgenerate"] =
        "Transaktionen är klar för generering av e-dokument.";
    translation["invoice.invalidtemplatesub"] =
        "Dotterbolaget till transaktionen är inte giltigt för den valda e-dokumentmallen. Välj en annan e-dokumentmall.";
    translation["invoice.templateremovalerror"] =
        "Du får inte ta bort e-dokumentmallen för e-dokument som har skickats.";
    translation["ei.sending.currentlysending"] =
        "E-dokumentet skickas. Den här processen kan ta några minuter att slutföra. Du får inte avbryta bearbetningen genom att klicka på knappen Skicka e-dokument igen. Efter att e-dokumentet har skickats kommer sidan att laddas om.";
    translation["ei.sending.notready"] =
        "E-dokumentet är inte redo att skickas. Du måste först klicka på Generera e-dokument och generera ett e-dokument.";
    translation["ei.sending.alreadysent"] = "Transaktionen har redan skickats.";
    translation["ei.sending.norecipients"] =
        "E-dokumentet kan inte skickas eftersom kunden inte har några e-dokumentmottagare. Innan du kan skicka det här e-dokumentet via e-post måste e-dokumentmottagare först väljas i kundposten.";
    translation["ei.sending.indivcustnoemail"] =
        "E-dokumentet kan inte skickas eftersom kunden inte har någon e-postadress. Innan du kan skicka det här e-dokumentet via e-post, måste en e-postadress anges i kundposten.";
    translation["ei.sending.norecipients.vendor"] =
        "E-dokumentet kan inte skickas eftersom leverantören inte har några e-dokumentmottagare. Innan du kan skicka det här e-dokumentet via e-post måste e-dokumentmottagare först väljas i leverantörsposten.";
    translation["ei.sending.indivvendnoemail"] =
        "E-dokumentet kan inte skickas eftersom leverantören inte har någon e-postadress. Innan du kan skicka det här e-dokumentet via e-post, måste en e-postadress anges i leverantörsposten.";
    translation["ei.sending.invalidmethod"] =
        "Välj en giltig sändningsmetod för {TYPE} med nr {INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Avsändare: {SENDER}\nMottagare: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "E-dokumentets avsändare ({EMPLOYEENAME}) har ingen e-postadress. Ange en giltig e-postadress i anställningsposten.";
    translation["ei.sending.recipientnoemail"] =
        "En eller flera mottagare av det e-dokument som är associerat med transaktionen saknar e-postadress. Kontrollera att kundens mottagare har giltiga e-postadresser.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "En eller flera mottagare av det e-dokument som är associerat med transaktionen saknar e-postadress. Kontrollera att leverantörens mottagare har giltiga e-postadresser.";
    translation["ei.sending.defaulterror"] =
        "Ett fel inträffade när e-dokumentet skickades. Kontrollera e-dokumentets historik på underfliken E-dokument för detaljer.";
    translation["ei.sending.inactivecustomer"] =
        "E-dokumentet kunde inte skickas för transaktionen eftersom den valda kunden är inaktiv. Fältet E-dokumentstatus har inte uppdaterats och ingen historik har skapats. Avmarkera kryssrutan Inaktiv i kundposten och försök sedan skicka e-dokumentet igen.";
    translation["ei.sending.inactivevendor"] =
        "E-dokumentet kan inte skickas för transaktionen eftersom den valda leverantören är inaktiv. Fältet E-dokumentstatus har inte uppdaterats och ingen historik har skapats. Avmarkera kryssrutan Inaktiv i leverantörsposten och försök sedan skicka e-dokumentet igen.";
    translation["ei.sending.msg.processcomplete"] =
        "E-dokumentet har skickats.";
    translation["ei.sending.configurefreecountry"] =
        "Kontot måste ha en aktiv licens för användning av elektronisk fakturering för flera länder. För massutskick av e-dokument för ett enskilt land måste du välja landet i fältet E-dokument - land för gratis användning på företagets informationssida.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Transaktioner med inaktiva kunder stöds inte av e-dokument.";
    translation["ei.sending.inactivevendor.manager"] =
        "Transaktioner med inaktiva leverantörer stöds inte av e-dokument.";
    translation["ei.sending.certification.defaulterror"] =
        "Ett fel inträffade vid certifiering av e-dokumentet. Kontrollera e-dokumentets historik på underfliken E-dokument för detaljer.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "E-dokumentet har skickats för certifiering.";
    translation["ei.generation.generationlogbulk"] =
        "E-dokumentet har massgenererats med e-dokumentmallen {TEMPLATENAME}.";
    translation["ei.generation.generationlog"] =
        "E-dokumentet genererades med e-dokumentmallen {TEMPLATENAME}.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "E-dokumentet och PDF-filen har massgenererats med e-dokumentmallen {TEMPLATENAME}.";
    translation["ei.generation.generationwithpdflog"] =
        "E-dokumentet och PDF-filen genererades med e-dokumentmallen {TEMPLATENAME}.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "E-dokumentet har massgenererats med e-dokumentmallen {TEMPLATENAME}. Den tidigare genererade PDF-filen för denna transaktion har tagits bort.";
    translation["ei.generation.generationremovedpdflog"] =
        "E-dokumentet genererades med e-dokumentmallen {TEMPLATENAME}. Den tidigare genererade PDF-filen för denna transaktion har tagits bort.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Massgenereringsprocess\nAnvänd e-dokumentmall: {TEMPLATENAME}\nFeldetaljer: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Använd e-dokumentmall: {TEMPLATENAME}\nFeldetaljer: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Ett fel inträffade under genereringen. Kontrollera e-dokumentets historik på underfliken E-dokument för detaljer.";
    translation["ei.generation.inactivecustomer"] =
        "Inget e-dokument kunde genereras för transaktionen eftersom den valda kunden är inaktiv. Fältet E-dokumentstatus har inte uppdaterats och ingen historik har skapats. Avmarkera kryssrutan Inaktiv i kundposten och försök sedan generera e-dokumentet igen.";
    translation["ei.generation.inactivevendor"] =
        "Inget e-dokument kunde genereras för transaktionen eftersom den valda leverantören är inaktiv. Fältet E-dokumentstatus har inte uppdaterats och ingen historik har skapats. Avmarkera kryssrutan Inaktiv i leverantörsposten och försök sedan generera e-dokumentet igen.";
    translation["ei.generation.msg.processcomplete"] =
        "E-dokumentet har genererats.";
    translation["ei.generation.configurefreecountry"] =
        "Kontot måste ha en aktiv licens för användning av elektronisk fakturering för flera länder. För massgenerering av e-dokument för ett enskilt land måste du välja landet i fältet E-dokument - land för gratis användning på företagets informationssida.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Transaktioner med inaktiva kunder stöds inte av e-dokument.";
    translation["ei.generation.inactivevendor.generator"] =
        "Transaktioner med inaktiva leverantörer stöds inte av e-dokument.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "E-dokumentet genereras och signeras digitalt.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Genereringen misslyckades eftersom resulterande e-dokument innehåller XML eller JSON med fel format.";
    translation["notify.batchownersubject"] = "E-dokumentet har skickats";
    translation["notify.batchownerbody"] =
        "Hej! <br/><br/>Din begäran om att skicka e-dokument har slutförts.<br/>{SENT} av {TOTAL} skickades. Se bifogad fil för mer information. <br/><br/>Tack!<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "E-dokument har genererats för ordernr {PONUM}";
    translation["notify.recipientcompsubj"] =
        "E-dokument har genererats från {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Hej! <br /><br />{MESSAGE}<br />E-dokumentfilen har bifogats.<br /><br />Tack!<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Ett fel inträffade när e-dokument skulle genereras";
    translation["notify.generationerrorbody"] =
        "Fel inträffade när e-dokument skulle genereras.<br/>Den bifogade filen innehåller en lista över transaktioner och feldetaljer.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Ett e-dokument har redan skickats för denna transaktion. Om du genererar ett nytt e-dokument skrivs det föregående e-dokumentet över. Vill du verkligen generera ett nytt e-dokument?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Du får inte ta bort e-dokumentmallen för e-dokument som har skickats.";
    translation["transaction.msg.generate.information"] =
        "Generering av detta e-dokument pågår.";
    translation["transaction.msg.send.information"] =
        "Sändning av detta e-dokument pågår.";
    translation["transaction.msg.send.certify.information"] =
        "Certifiering av detta e-dokument pågår.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Generering av detta e-dokument pågår redan.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Sändning av detta e-dokument pågår redan.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Certifiering av detta e-dokument pågår redan.";
    translation["transaction.msg.uncheckpdf"] =
        "En PDF-fil för denna transaktion skapades under den senaste e-dokumentgenereringen. Om du avmarkerar kryssrutan tas PDF-filen bort i nästa e-dokumentgenerering.";
    translation["transaction.msg.nofreecountry"] =
        "Kontot saknar aktiv licens för användning av elektronisk fakturering i flera länder. För att generera ett e-dokument för den här transaktionen måste din kontoadministratör specificera ett land i funktionen E-dokument - land för gratis användning på företagets informationssida.";
    translation["transaction.msg.otherbillingcountry"] =
        "Kontot saknar aktiv licens för användning av elektronisk fakturering i flera länder. Kontakta din NetSuite-kontorepresentant för att köpa en licens om du vill generera ett e-dokument för transaktionen.";
    translation["transaction.msg.nobillingcountry"] =
        "Kontot saknar aktiv licens för användning av elektronisk fakturering i flera länder. Ange faktureringsadressen för den här transaktionen om du vill generera ett e-dokument för transaktionen.";
    translation["transaction.msg.noshippingcountry"] =
        "Kontot saknar aktiv licens för användning av elektronisk fakturering i flera länder. Ange leveransadressen för den här transaktionen om du vill generera ett e-dokument för transaktionen.";
    translation["transaction.msg.nocustomercountry"] =
        "Kontot saknar aktiv licens för användning av elektronisk fakturering i flera länder. Ange standardadressen för fakturering för transaktionens kund om du vill generera ett e-dokument för transaktionen.";
    translation["transaction.msg.blockededittransaction"] =
        "Redigering av transaktionen har blockerats för aktuell e-dokumentstatus. Se den bifogade EI-mallen.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Om du ändrar värdet i fältet Innehållstyp från XML till en annan typ kommer alla XML-validerare att tas bort. Vill du verkligen ändra innehållstypen?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Du kan endast lägga till validerare av innehåll av typen XML.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Valideraren finns redan i listan.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Validerare av e-dokumentmallar stöder endast kontexterna UI och SuiteScript.";
    translation["standarddocument.default.alreadyexist"] =
        "Denna post för {DEFAULT_DOCUMENT_STANDARD} finns redan. Du kan inte skapa en dokumentpaketpost med samma namn. Ändra namn på dokumentpaketposten och försök igen.";
    translation["standarddocument.default.editnotallowed"] =
        "Du får inte redigera namnet på eller beskrivningen av posten {DEFAULT_DOCUMENT_STANDARD}.";
    translation["standarddocument.default.deletenotallowed"] =
        "Du får inte ta bort posten {DEFAULT_DOCUMENT_STANDARD}.";
    translation["standarddocument.contextunsupported"] =
        "E-dokumentpaketet stöder endast kontexterna UI, csv-import och SuiteScript.";
    translation["sendingmethod.default.alreadyexist"] =
        "Sändningsmetodposten {DEFAULT_SENDING_METHOD_NAME} finns redan. Du kan inte skapa en sändningsmetodpost med samma namn. Ändra namn på sändningsmetodposten och försök igen.";
    translation["sendingmethod.default.editnotallowed"] =
        "Du får inte redigera sändningsmetodposten {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Du får inte ta bort sändningsmetodposten {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Fältet Transaktionstyp har avaktiverats eftersom denna sändningsmetod har tilldelats till en eller flera transaktionsposter. Om du vill redigera denna sändningsmetod tar du bort sändningsmetoden från transaktionsposten för att aktivera fältet Transaktionstyp och försöker igen.";
    translation["sendingmethod.contextunsupported"] =
        "E-dokumentens sändningsmetod stöder endast kontexterna UI och SuiteScript.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Välj en eller flera transaktionstyper som ska stödjas av denna sändningsmetod. För att välja flera transaktionstyper, tryck och håll ned Ctrl-tangenten när du väljer transaktionstyperna.<br /><br />Om en eller flera transaktionstyper inte kan väljas har sändningsmetoden tilldelats en eller flera transaktionsposter av den transaktionstypen. Du måste först ta bort sändningsmetoden från transaktionsposten för att möjliggöra val av transaktionstyp.";
    translation["sendingmethod.pluginimplementation"] =
        "Implementering av insticksprogram för sändningsmetod för e-dokument";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Välj en implementering av insticksprogram för sändningsmetod";
    translation["sendingmethod.scriptbannermessage"] =
        "Sändningsmetoder ska vara implementeringar av anpassade insticksprogram. Återskapa befintliga sändningsmetodskript som implementeringar av nya anpassade insticksprogram av typen &quot;Insticksprogram för sändning&quot;.";
    translation["customdatasource.pluginimplementation"] =
        "Implementering av insticksprogram för anpassad datakälla";
    translation["customdatasource.pluginimplementationhelp"] =
        "Välj implementering av insticksprogram för anpassad datakälla";
    translation["digitalsignature.pluginimplementation"] =
        "Implementering av insticksprogram för digital signatur";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Välj en implementering av insticksprogram. Det här fältet är obligatoriskt om du vill signera e-dokument digitalt.";
    translation["digitalsignature.identifierlabel"] =
        "E-dokumentet signeras digitalt";
    translation["digitalsignature.successlog"] =
        "Det genererade e-dokumentet är digitalt signerat.";
    translation["digitalsignature.failurelog"] =
        "Det genererade e-dokumentet är inte digitalt signerat.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Implementering av insticksprogram för digital signatur returnerade statusen Misslyckades.";
    translation["digitalsignature.plugininvalidresult"] =
        "Resultatet som returneras från implementeringen av insticksprogrammet för digital signatur är inte giltigt.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Implementering av insticksprogram för inkommande anpassad datakälla";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Välj en implementering av insticksprogram för inkommande anpassad datakälla.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Resultatet av implementering av insticksprogram för inkommande anpassad datakälla är ogiltigt.";
    translation["outboundvalidation.pluginimplementation"] =
        "Implementering av insticksprogram för validering av utgående";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Välj en implementering av insticksprogram för validering av utgående e-dokument. Åtgärden innebär att utgående e-dokument valideras.";
    translation["outboundvalidation.successlog"] =
        "Validering av utgående har utförts.";
    translation["outboundvalidation.failurelog"] =
        "Validering av utgående misslyckades.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Implementeringen av insticksprogrammet för validering av utgående returnerade felstatus.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Resultatet av implementeringen av insticksprogrammet för validering av utgående är ogiltigt.";
    translation["template.msg.cannotedittransactiontype"] =
        "Fältet Transaktionstyp har avaktiverats eftersom den här mallen redan har tilldelats till en eller flera transaktionsposter. Om du vill redigera den här mallen ska du ta bort mallen från transaktionsposten för att aktivera fältet Transaktionstyp och försöka igen. Du kan även tilldela den här mallen till inkommande e-dokument vilket därmed avaktiverar fältet Transaktionstyp.";
    translation["template.msg.forcetocopymessage"] =
        "Du kan inte redigera standardmallen för e-dokument. Du kan antingen kopiera den med hjälp av alternativet Skapa kopia från Åtgärder eller skapa en ny.";
    translation["template.msg.warningoneditmessage"] =
        "Detta är en standardmall för e-dokument. Ändringar som görs av mallen förloras eller skrivs över när SuiteAppen uppdateras.";
    translation["email.batchownernotification.subject"] =
        "E-dokumentet har skickats";
    translation["email.batchownernotification.body"] =
        "Hej! <br/><br/>Dina e-dokument har skickats.<br/>{SENT} av {TOTAL} skickades. Se bifogad fil för mer information. <br/><br/>Tack!<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Konvertering av e-dokument har slutförts";
    translation["email.batchownerconvertnotification.body"] =
        "Hej! <br/><br/>Dina e-dokument har konverterats.<br/>{CONVERTED} av {TOTAL} konverterades. Se bifogad fil för mer information. <br/><br/>Tack!<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "E-dokument har genererats för ordernr {PONUM}";
    translation["email.recipientnotification.subject"] =
        "E-dokument från {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "E-dokument har genererats för typen {TRANTYPE} med nr {TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Hej! <br /><br />E-dokumentet för ordernr {PONUM} har genererats.<br />Fler detaljer finns i bifogad e-dokumentfil.<br /><br />Tack!<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Hej! <br /><br />E-dokumentet för {TYPE} med nr {TRANID} har genererats.<br />Fler detaljer finns i bifogad e-dokumentfil.<br /><br />Tack!<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Ett fel inträffade när e-dokument skulle genereras";
    translation["email.generationerrornotification.body"] =
        "Fel inträffade när e-dokument skulle genereras.<br/>Den bifogade filen innehåller en lista över transaktioner och feldetaljer.";
    translation["email.sendingerrornotification.subject"] =
        "Ett fel inträffade när e-dokumentet skulle skickas";
    translation["email.sendingerrornotification.body"] =
        "Fel inträffade när e-dokument skulle skickas.<br/>Den bifogade filen innehåller en lista över transaktioner och feldetaljer.";
    translation["email.webserviceerror.subject"] =
        "Webbtjänstmeddelande om inkommande e-dokument";
    translation["email.webserviceerror.body"] =
        "<p>Hej!</p><p>Fel inträffade vid bearbetning av det inkommande e-dokumentet via webbtjänsten.<br/>Se följande detaljer.</p>{DETAIL_TABLE}<p>Tack!<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Transaktionsnummer";

    return translation;
});
